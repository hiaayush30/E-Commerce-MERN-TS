

export interface OrderItemType{
    _id:string;
    name:string;
    photo:string;
    price:number;
    quantity:number;
}

export interface OrderType{
    name:string;
    address:string;
    pincode:number;
    city:string;
    state:string;
    country:string;
    status:'processing'|'shipped'|'delivered',
    subtotal:number;
    discount:number;
    shippingCharges:number;
    tax:number;
    total:number;
    orderItems:OrderItemType[],
    _id:string;
}