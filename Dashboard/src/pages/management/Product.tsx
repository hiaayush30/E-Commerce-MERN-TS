import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const product = {
    name: 'shoes',
    price: 1000,
    stock: 3,
    photo: 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/963bd9d0-1196-46e8-a6ac-f52824e3bb42/NIKE+AIR+MAX+IMPACT+4.png'
  }
  
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [photo, setPhoto] = useState<string>(product.photo);
  const [updatedName,setUpdatedName]=useState<string>(product.name);
  const [updatedPrice,setUpdatedPrice]=useState<number>(product.price);
  const [updatedstock,setUpdatedStock]=useState<number>(product.stock);
  const [updatedPhoto,setUpdatedPhoto]=useState<string>(product.photo);

  const changeImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file: File = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result == 'string') setUpdatedPhoto(reader.result);
      }
    }
  }
  const submitHandler=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setName(updatedName);
        setPhoto(updatedPhoto);
        setStock(updatedstock);
        setPrice(updatedPrice);
  }
  return (
    <article className="flex justify-center items-center min-h-screen w-full">
      <section className="relative max-lg:hidden rounded-lg scrollbar-hide h-[85vh] flex flex-col justify-center items-center overflow-auto mx-5 w-[50%] px-5 bg-slate-100">
        <h3 className="absolute text-green top-2 right-2">{stock} available</h3>
        <div className="absolute top-2 left-2">ID:{id}</div>
        <div className="h-[70vh] object-contain overflow-hidden"><img className="m-0 h-full object-contain object-center" src={photo} /></div>
        <h1 className="text-xl font-semibold">{name}</h1>
        <h3 className="text-2xl font-semibold">${price}</h3>
      </section>
      <form onSubmit={submitHandler}
      className="shadow-xl m-3 bg-slate-100 rounded-md p-5 min-w-[40%] flex flex-col gap-5 max-h-[90vh] overflow-auto">
        <h2 className="text-center text-xl font-bold my-2 bg-blue-200 rounded-lg p-3">MANAGE PRODUCT</h2>
        <div className="flex flex-col items-start gap-2">
          <label className="pl-1">Name</label>
          <input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} className="p-1 outline-none"
            type='text' placeholder="name of the product" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="pl-1">Price</label>
          <input min={0} value={updatedPrice} onChange={(e) => setUpdatedPrice(Number(e.target.value))} className="p-1 outline-none"
            type='number' placeholder="price" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="pl-1">Stock</label>
          <input min={0} value={updatedstock} onChange={(e) => setUpdatedStock(Number(e.target.value))} className="p-1 outline-none"
            type='number' placeholder="stock" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="pl-1">Photo</label>
          <input onChange={changeImageHandler}
            className="p-1 cursor-pointer outline-none rounded-lg bg-slate-200"
            type='file' accept="image/*" placeholder="image" />
        </div>
        {
          updatedPhoto && <img className="h-40 mx-auto" src={updatedPhoto} />
        }
        <button type="submit" className="bg-blue-400 p-1 text-slate-100 rounded-lg hover:bg-blue-300 cursor-pointer">UPDATE</button>
      </form>
    </article>
  )
}

export default Product
