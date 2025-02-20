import { useEffect, useRef, useState } from "react"

const Stopwatch = () => {
    const [count, setCount] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const interval = useRef<number | null>(null);
    const handleStart = () => {
        if (interval.current) clearInterval(interval.current);
        interval.current = setInterval(() => {
            setCount(count => count + 1);
        }, 1000)
    }
    useEffect(() => {
        setSeconds(seconds => count%60);
        setMinutes(seconds => Math.floor(count / 60));
        setHours(seconds => Math.floor(count / 3600));
    }, [count, setCount])
    return (
        <div className="bg-gradient-to-b from-blue-900 to-blue-300">
            <h1 className="absolute text-slate-200 text-2xl font-semibold my-5 mx-3">Stopwatch</h1>
            <div className="flex flex-col items-center h-screen justify-center">
                <div className="flex gap-2 text-[160px] max-lg:text-8xl max-sm:text-6xl">
                    <div>{hours < 10 && '0'}{hours}</div>:
                    <div>{minutes < 10 && '0'}{minutes}</div>:
                    <div>{seconds < 10 && '0'}{seconds}</div>
                </div>
                <div className="flex gap-2 items-center my-6 bg-slate-200 p-3 rounded-lg">
                    <button className="p-1 hover:bg-blue-300 bg-blue-400 text-white rounded-md cursor-pointer"
                        onClick={handleStart}>Start</button>
                    <button className="p-1 hover:bg-blue-300 bg-blue-400 text-white rounded-md cursor-pointer"
                        onClick={() => interval.current && clearInterval(interval.current)}>Stop</button>
                    <button
                        className="p-1 bg-blue-400 hover:bg-blue-300 text-white rounded-md cursor-pointer"
                        onClick={() => {
                            setCount(0);
                            if (interval.current) clearInterval(interval.current);
                        }}
                    >Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Stopwatch
