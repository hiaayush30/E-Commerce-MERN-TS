import { Request, Response } from "express";
import Coupon from "../models/coupon.model";
import { stripe } from "../services/stripe.service";
import Order from "../models/order.model";

export const createCheckoutSession = async (req: Request, res: Response): Promise<any> => {
    try {
        const { products, couponCode } = req.body;
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(403).json({ message: 'products required' });
        }
        let totalAmount = 0;
        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100)  //in cents
            totalAmount += amount * product.quantity;
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: amount
                }
            }
        });
        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, userId: req.user?._id, isActive: true });
            if (coupon) {
                totalAmount -= Math.round(totalAmount * couponCode.discountPercentage / 100);
            }
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FE_DOMAIN}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FE_DOMAIN}/purchase-cancel`,
            discounts: coupon ? [{
                coupon: await createStripeCoupon(coupon.discountPercentage)
            }] : [],
            metadata: { //for us to use later
                userId: String(req.user?._id),
                couponCode: couponCode || "",
                products: JSON.stringify(
                    products.map(p => ({
                        id: p._id,
                        quantity: p.quantity,
                        proce: p.price
                    }))
                )
            }
        })
        //creating this for the user for next purchase
        if (totalAmount >= 20000) { //cents  
            await createNewCoupon(req.user?._id as string);
        }
        res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 })
    } catch (error) {
        console.log('error in createCheckoutSession:' + error);
        return res.status(500).json({
            message: 'error in creating checkout session'
        })
    }
}

//basically creates a one time use coupon
const createStripeCoupon = async (discountPercent: number) => {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercent,
        duration: 'once'
    });
    return coupon.id;
}

const createNewCoupon = async (userId: string) => {
    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId
    })
    await newCoupon.save();
    return newCoupon;
}


type productType = {
    _id: string;
    price: number;
    quantity: number;
}
export const checkoutSuccess = async (req: Request, res: Response): Promise<any> => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) {
            return res.status(403).json({
                message: 'invalid request - sessionId required'
            })
        }
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session) {
            return res.status(404).json({
                message: 'session not found'
            })
        }
        else {
            if (session.payment_status === "paid") {
                if (session?.metadata?.couponCode) {
                    await Coupon.findOneAndUpdate({
                        code: session.metadata.couponCode,
                        userId: session.metadata?.userId
                    }, { isActive: false })
                }

                //create a new order
                if (!session.metadata) throw new Error('session.metadata is null'); //fix ts errors
                const products = JSON.parse(session.metadata?.products);
                const newOrder = await Order.create({
                    user: session?.metadata?.userId,
                    products: products.map((p: productType) => ({
                        product: p._id,
                        quantity: p.quantity,
                        price: p.price
                    })),
                    totalAmount:session.amount_total ?  session.amount_total / 100 : 0,
                    stripeSessionId:sessionId
                })
                res.status(200).json({
                    message:'payment successful,order created and coupon deactivated if used',
                    orderId:newOrder._id
                })
            }
        }
    } catch (error) {
        console.log('checkoutSuccess error:' + error);
        return res.status(500).json({
            message: 'error in checking success of session'
        })
    }
}