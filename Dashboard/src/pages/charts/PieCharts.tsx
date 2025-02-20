import { BarChart, DoughnutChart, PieChart } from "../../components/Charts"

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

function PieCharts() {
    return (
        <div className='h-screen overflow-y-auto'>
            <h1 className="text-2xl font-semibold p-5">Pie and Doughnut Charts</h1>
            <section className="mx-auto w-[80%] bg-slate-100 p-2 rounded-md flex flex-col justify-center items-center">
                <div className="h-[80%]">
                    <PieChart data={[10, 15, 10]} bgColor={['red', 'maroon', 'crimson']} labels={["processing", "shipped", "delivered"]} offset={[10, 10, 50]} />
                </div>
                <h2 className="text-xl text-center my-3">ORDER FULFILLMENT RATIO</h2>
            </section>
            <section className="mx-auto my-5 pt-5 w-[80%] bg-slate-100 p-2 rounded-md flex flex-col justify-center items-center">
                <div className="h-[80%]">
                    <DoughnutChart data={[10, 15, 10]} cutout={'70%'} bgColor={['hsl(150,50%,50%)', 'hsl(150,50%,70%)', 'hsl(150,50%,30%)']} offset={[0,0,20]} labels={["dairy", "apparels", "food"]}/>
                </div>
                <h2 className="text-xl text-center my-3">PRODUCT CATEGORY RATIO</h2>
            </section>
            <section className="mx-auto my-5 pt-5 w-[80%] bg-slate-100 p-2 rounded-md flex flex-col justify-center items-center">
                <div className="h-[80%]">
                    <DoughnutChart data={[10, 15, 10,25,20]} legends={false} bgColor={['hsl(110,80%,40%)', 'hsl(19,80%,40%)', 'hsl(69,80%,40%)','hsl(300,80%,40%)','hsl(53,80%,40%)']} offset={[20,30,20,30,20]} 
                    labels={["net margin", "marketing cost", "discount","burnt","production"]}/>
                </div>
                <h2 className="text-xl text-center my-3">REVENUE DISTRIBUTION</h2>
            </section>
        </div>
    )
}

export default PieCharts
