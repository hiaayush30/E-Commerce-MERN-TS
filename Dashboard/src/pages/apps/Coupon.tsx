import { useEffect, useRef, useState } from "react"

const Coupon = () => {
    const [size, setSize] = useState(8);
    const [text, setText] = useState('');
    const [hasNumbers, setHasNumbers] = useState(false);
    const [hasChars, setHasChars] = useState(true);
    const [hasSymbols, setHasSymbols] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        if (!resultRef.current) return;
        await window.navigator.clipboard.writeText(resultRef.current.innerText);
        setCopied(true);
    }
    useEffect(() => {
        if (!resultRef.current) return;
        if (copied) {
            resultRef.current.innerText = 'COPIED'
            resultRef.current.style.backgroundColor = "black";
            resultRef.current.style.color = "white";
        }
    }, [copied, setCopied])


    const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allNumbers = "1234567890";
    const allSymbols = "!@#$%^&*()";
    const handleGenerate = () => {
        if (!resultRef.current) return;
        setCopied(false);

        const coupon = [];
        const randomSize = size - text.split('').length;
        if (randomSize < 1) return alert('select larger number of characters');
        coupon.push(text);

        const options = [];
        if (hasChars) options.push(...allLetters.split(''));
        if (hasNumbers) options.push(...allNumbers.split(''));
        if (hasSymbols) options.push(...allSymbols.split(''));

        for (let i = 1; i <= randomSize; i++) {
              const index=Math.floor(Math.random()*options.length);
              coupon.push(options[index]);
        }

        resultRef.current.style.padding = "5px"
        resultRef.current.innerText = coupon.join('');
    }
    return (
        <div className="relative flex justify-center items-center h-screen bg-gradient-to-b from-blue-800 to-blue-300">
            <h1 className="absolute top-3 left-3 text-slate-200 text-2xl font-semibold my-5 mx-3">Coupon</h1>
            <section className="scale-125 bg-slate-200 p-3 rounded-lg flex flex-col">
                <div className="flex pt-5">
                    <input onChange={(e) => setText(e.target.value)}
                        className="p-1 outline-none"
                        type="text" placeholder="Text to include" />
                    <input onChange={(e) => setSize(Number(e.target.value))}
                        value={size} className="p-1 outline-none"
                        min={4} max={20}
                        type="number" />
                </div>
                <fieldset className="flex items-center px-3 gap-3 py-3 border-1 m-2 my-4 rounded-md">
                    <legend>Include</legend>
                    <div>
                        <input type="checkbox"
                            onChange={(e) => setHasNumbers(e.target.checked)}></input>
                        <label>Numbers</label>
                    </div>
                    <div>
                        <input onChange={(e) => setHasChars(e.target.checked)}
                            type="checkbox"></input>
                        <label>Characters</label>
                    </div>
                    <div>
                        <input onChange={(e) => setHasSymbols(e.target.checked)}
                            type="checkbox"></input>
                        <label>Symbols</label>
                    </div>
                </fieldset>
                <button onClick={handleGenerate}
                    className="bg-blue-400 p-1 rounded-md text-white hover:bg-blue-300 cursor-pointer">Generate</button>
                <div ref={resultRef} onClick={handleCopy}
                    className={`my-1 rounded-md text-center hover:bg-slate-800 hover:text-slate-200 cursor-grab`}
                ></div>
            </section>
        </div>
    )
}

export default Coupon