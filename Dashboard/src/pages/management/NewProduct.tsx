import { ChangeEvent, useState } from "react"

const NewProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [photo, setPhoto] = useState<string>("");
  const changeImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    // e.target.files[0] is a File object, which includes metadata like:
    // name (file name)
    // size (in bytes)
    // type (MIME type, e.g., image/png)
    // lastModified (timestamp)
    //  Since raw binary data isn't human-readable, we convert it into a Base64 string to: ✔ Embed it in HTML (<img src="data:image/png;base64,..." />)
    // ✔ Store it in local storage or a database
    // ✔ Send it in an API request
    if (!e.target.files?.[0]) return;
    const file: File = e.target.files[0];
    const reader = new FileReader();
    // FileReader is a built-in JavaScript API used to read file contents.
    if (file) {
      reader.readAsDataURL(file);
      // reader.readAsDataURL(file) converts the file into a Base64 string, which is useful for displaying images in <img> tags without uploading them to a server.
      // reader.result contains the Base64 string of the file.
      reader.onloadend = () => { //onloadend triggers when the file reading is finished.
        if (typeof reader.result == 'string') setPhoto(reader.result);
      }
    }
  }
  return (
    <article className="flex justify-center items-center min-h-screen">
      <form className="shadow-xl m-3 bg-slate-100 rounded-md p-5 min-w-[40%] flex flex-col gap-5">
        <h2 className="text-xl font-semibold my-2 bg-blue-200 rounded-lg p-3">New Product</h2>
        <div className="flex flex-col items-start gap-2">
          <label className="pl-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="p-1 outline-none"
            type='text' placeholder="name of the product" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="pl-1">Price</label>
          <input value={price} onChange={(e) => setPrice(Number(e.target.value))} className="p-1 outline-none"
            type='number' placeholder="price" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="pl-1">Stock</label>
          <input value={stock} onChange={(e) => setStock(Number(e.target.value))} className="p-1 outline-none"
            type='number' placeholder="stock" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="pl-1">Photo</label>
          <input onChange={changeImageHandler}
            className="p-1 cursor-pointer outline-none rounded-lg bg-slate-200"
            type='file' accept="image/*" placeholder="image" />
        </div>
        {
          photo && <img className="h-40 mx-auto" src={photo} />
        }
        <button type="submit" className="bg-blue-400 p-1 text-slate-100 rounded-lg hover:bg-blue-300 cursor-pointer">Add Product</button>
      </form>
    </article>
  )
}

export default NewProduct
