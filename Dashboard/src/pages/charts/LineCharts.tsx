import { LineChart } from "../../components/Charts"
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
function LineCharts() {
  return (
    <div className="h-screen overflow-y-auto">
      <h1 className="text-2xl font-semibold p-5">Line Charts</h1>
      <section className="mx-auto my-5 w-[80%] bg-slate-100 p-2 rounded-md">
        <LineChart
          borderColor="rgb(53,162,255)" label="revenue"
          data={[200, 444, 323, 556, 778, 445, 990,660,532,100,800,1000]}
          bgColor="rgb(53,162,255,0.5)"
          labels={months}
        />
        <h2 className="text-xl text-center my-3">ACTIVE USERS</h2>
      </section>
      <section className="mx-auto my-5 w-[80%] bg-slate-100 p-2 rounded-md">
        <LineChart
          borderColor="rgb(253,102,105)" label="products"
          data={[200, 444, 323, 556, 778, 445, 990,660,532,100,800,1000]}
          bgColor="rgb(253,102,105,0.5)"
          labels={months}
        />
        <h2 className="text-xl text-center my-3">TOTAL PRODUCTS (SKU)</h2>
      </section>
      <section className="mx-auto my-5 w-[80%] bg-slate-100 p-2 rounded-md">
        <LineChart
          borderColor="hsl(129,80%,40%)" label="discount"
          data={[200, 444, 323, 556, 778, 445, 990,660,532,100,800,1000]}
          bgColor="hsl(129,80%,40%,0.4)"
          labels={months}
        />
        <h2 className="text-xl text-center my-3">DISCOUNT ALLOTED</h2>
      </section>
      <section className="mx-auto w-[80%] bg-slate-100 p-2 rounded-md">
        <LineChart
          borderColor="rgb(153,162,255)" label="yo"
          data={[200, 444, 323, 556, 778, 445, 990,660,532,100,800,1000]}
          bgColor="rgb(153,162,255,0.5)"
          labels={months}
        />
        <h2 className="text-xl text-center my-3">TOTAL REVENUE</h2>
      </section>
    </div>
  )
}

export default LineCharts
