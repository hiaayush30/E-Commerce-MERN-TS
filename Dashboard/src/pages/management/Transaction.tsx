import { useState } from "react"
import { OrderItemType, OrderType } from "../../types"
import { Link } from "react-router-dom"

const img = 'https://images.jdmagicbox.com/quickquotes/images_main/nike-mens-footwear-30-07-2021-125-239796572-77ypi.png'
const orderItems: OrderItemType[] = [
  {
    name: 'JBL speaker',
    photo: img,
    _id: '1',
    price: 2000,
    quantity: 2,
  },
  {
    name: 'JBL speaker',
    photo: img,
    _id: '1',
    price: 2000,
    quantity: 2,
  }
]
const Transaction = () => {
  const [order, setOrder] = useState<OrderType>({
    name: 'Aayush Jha',
    _id: '0',
    address: 'Cairns House',
    city: 'Pune',
    country: 'India',
    discount: 10,
    orderItems,
    pincode: 411028,
    shippingCharges: 20,
    state: "Maharashtra",
    status: 'processing',
    subtotal: orderItems.reduce((prev, order) => order.price + prev, 0),
    tax: 30,
    total: 5000
  })
  const handleClick = () => {
    setOrder(order => ({
      ...order,
      status: order.status == 'processing' ? 'shipped' : 'delivered'
    }))
  }
  return (
    <div className="flex max-lg:flex-col justify-center items-center gap-5 h-screen">
      <section className="lg:h-[80vh] max-lg:w-[80%] w-[40%] overflow-auto bg-slate-100 rounded-md shadow-xl p-5">
        <h1 className="text-center text-2xl">ORDER ITEMS</h1>
        <div>
          {order.orderItems.map(item => {
            return <div className="flex gap-2 justify-between rounded-md items-center w-full h-16">
              <div className="flex items-center gap-1">
                <Link to={'/product/' + item._id}>
                  <img className="h-14 rounded-lg object-center object-contain" src={item.photo} />
                </Link>
                <h2>{item.name}</h2>
              </div>
              <div>${item.price} X {item.quantity} = ${item.price * item.quantity}</div>
            </div>
          })}
        </div>
      </section>
      <section className="flex max-lg:w-[80%] flex-col gap-5 lg:h-[80vh] w-[40%] overflow-auto bg-slate-100 rounded-md shadow-xl p-5">
        <h1 className="text-center text-2xl">ORDER INFO</h1>
        <div>
          <h2 className="font-semibold text-xl">User Info</h2>
          <div className="mt-1 break-words">Name:{order.name}</div>
          <div className="my-1 break-words"
          >Address:{order.address},{order.city},{order.country},{order.pincode}</div>
        </div>
        <div>
          <h2 className="font-semibold text-xl">Amount Info</h2>
          <div>Subtotal:{order.subtotal}</div>
          <div>Shipping Charges:{order.shippingCharges}</div>
          <div>Tax:{order.tax}</div>
          <div>Discount:{order.discount}</div>
          <div>Total:{order.total}</div>
        </div>
        <div>
          <h2 className="font-semibold text-xl">Status Info</h2>
          <div>Status:<span className={`${order.status == 'shipped' && 'text-green'} ${order.status == 'processing' && 'text-red-500'} ${order.status == 'delivered' && 'text-blue-500'}`}>
            {order.status}</span></div>
        </div>
        {
          order.status !== 'delivered' && <button onClick={handleClick}
            className="text-lg cursor-pointer hover:bg-blue-300 text-white bg-blue-400 p-1 rounded-md"
          >Process Status</button>
        }
      </section>
    </div>
  )
}

export default Transaction
