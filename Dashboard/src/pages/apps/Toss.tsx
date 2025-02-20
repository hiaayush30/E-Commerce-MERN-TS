import { useState } from "react";
import heads from "../../assets/heads.png";
import tails from "../../assets/tails.png";

const Toss = () => {
    const [position, setPosition] = useState<"heads" | "tails">("heads");
    const [flipping, setFlipping] = useState(false);

    const flipCoin = () => {
        if (flipping) return;

        setFlipping(true);

        setTimeout(() => {
            const newPosition = Math.random() > 0.5 ? "heads" : "tails";
            setPosition(newPosition);
            setFlipping(false);
        }, 1000);
    };

    return (
        <div className="relative bg-gradient-to-b from-blue-900 to-blue-300 min-h-screen flex flex-col justify-center items-center">
            <h1 className="absolute top-3 left-5 px-3 py-5 text-2xl font-semibold text-white">Toss</h1>
            <div
                className={`relative h-64 w-64 flex justify-center items-center transition-transform duration-1000 ${flipping ? "animate-flip" : ""
                    }`}
                onClick={flipCoin}
            >
                <img src={position === "heads" ? heads : tails}
                    className={`absolute drop-shadow-xl`} />
            </div>
            {!flipping &&
                <span className="text-2xl mt-4">{position.toUpperCase()}</span>
            }
        </div>
    );
};

export default Toss;
