import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend,PointElement,LineElement,Filler);


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface BarChartProps {
    horizontal?: boolean;
    data_1: Array<number>;
    data_2: Array<number>;
    title_1: string;
    title_2: string;
    bgColor1: string;
    bgColor2: string;
    labels?: string[];
}

export function BarChart(
    { bgColor1,
        bgColor2,
        data_1,
        data_2,
        title_1,
        title_2,
        horizontal = false,
        labels = months }: BarChartProps) {
    const options: ChartOptions<"bar"> = {
        responsive: true,
        indexAxis: horizontal ? 'y' : 'x',
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: false,
                // text: 'Chart.js Bar Chart',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const data: ChartData<"bar", number[], string> = {
        labels,
        datasets: [
            {
                label: title_1,
                data: data_1,
                backgroundColor: bgColor1,
                barThickness: 'flex',
                barPercentage: 1,
                categoryPercentage: 0.4
            },
            {
                label: title_2,
                data: data_2,
                backgroundColor: bgColor2,
                barThickness: 'flex',
                barPercentage: 1,
                categoryPercentage: 0.4
            },
        ],
    };
    return <Bar width={horizontal ? '200%':''} options={options} data={data} />;
}


interface DoughnutChartProps {
    data: Array<number>;
    bgColor: string[];
    labels: string[];
    cutout?:number|string, //nothing in center of pie
    legends?:boolean;
    offset?:number|number[]
}
export function DoughnutChart({ labels,data,legends=true,bgColor,cutout,offset=0 }: DoughnutChartProps) {
    const doughnutData: ChartData<'doughnut', number[], string> = {
        labels,
        datasets: [
            {
                data,
                backgroundColor:bgColor,
                borderWidth:0,
                offset,
            }
        ]
    }
    const doughnutOptions: ChartOptions<'doughnut'> = {
         responsive:true,
         plugins:{
            legend:{
                display:legends,
                position:'bottom',
                labels:{
                    padding:40
                }
            }
         },
         cutout
    }
    return <Doughnut data={doughnutData} options={doughnutOptions} />;
}

interface PieChartProps {
    data: Array<number>;
    bgColor: string[];
    labels: string[];
    offset?:number[]
}

export function PieChart({ labels,data,bgColor,offset }: PieChartProps) {
    const pieData: ChartData<'pie', number[], string> = {
        labels,
        datasets: [
            {
                data,
                backgroundColor:bgColor,
                borderWidth:1,
                offset,
            }
        ]
    }
    const pieOptions: ChartOptions<'pie'> = {
         responsive:true,
         plugins:{
            legend:{
                display:false,
                // position:'bottom',
                // labels:{
                //     padding:40
                // }
            }
         },
         offset
    }
    return <Pie data={pieData} options={pieOptions} />;
}

interface LineChartProps {
    label:string;
    data: Array<number>;
    bgColor: string;
    borderColor:string;
    labels?: string[];
}

export function LineChart(
    { 
        bgColor,
        data,
        label,
        borderColor,
        labels = months }: LineChartProps) {
    const lineChartOptions: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
                // text: 'Chart.js Bar Chart',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const lineChartData: ChartData<"line", number[], string> = {
        labels,
        datasets: [
            {
                fill:true,
                label,
                data,
                backgroundColor: bgColor,
                borderColor,
            }
        ],
    };
    return <Line options={lineChartOptions} data={lineChartData} />;
}
