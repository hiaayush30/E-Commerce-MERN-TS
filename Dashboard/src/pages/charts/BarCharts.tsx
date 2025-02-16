import { BarChart } from "../../components/Charts"

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

function BarCharts() {
    return (
        <div className='h-screen overflow-y-auto'>
            <h1 className="text-2xl font-semibold p-5">Bar Charts</h1>
            <section className="mx-auto w-[80%] bg-slate-100 p-2 rounded-md">
                <BarChart
                    data_1={[200, 444, 323, 556, 778, 445, 990]}
                    data_2={[300, 144, 433, 655, 237, 755, 190]}
                    bgColor1={'hsl(260,50%,30%)'}
                    bgColor2={'hsl(260,90%,70%)'}
                    title_1="Products"
                    title_2="Users"
                />
                <h2 className="text-xl text-center my-3">TOP SELLING PRODUCTS & TOP CUSTOMERS</h2>
            </section>
            <section className="mx-auto w-[80%] my-10 bg-slate-100 p-2 rounded-md">
                <BarChart horizontal
                    data_1={[200, 444, 323, 556, 778, 445, 990,330,500,640,300,800]}
                    data_2={[]}
                    bgColor1={'hsl(260,50%,30%)'}
                    bgColor2={''}
                    title_1="Orders"
                    title_2=""
                    labels={months}
                />
                <h2 className="text-xl text-center my-3">ORDERS THROUGHOUT THE YEAR</h2>
            </section>
        </div>
    )
}

export default BarCharts
