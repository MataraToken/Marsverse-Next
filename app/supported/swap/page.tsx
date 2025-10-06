"use client"
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import TokenSelectModal from "@/components/modal/TokenSelectModal";

function Swap() {
    WebApp.BackButton.hide();
    useEffect(() => {
        (async () => {
          const WebApp = (await import("@twa-dev/sdk")).default;
          WebApp.ready();
        })();
      }, []);
    const [fromToken, setFromToken] = useState("TON");
    const [toToken, setToToken] = useState("MAT");
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tokenSelectionMode, setTokenSelectionMode] = useState<'from' | 'to'>('from');

    const handleSwap = () => {
        // Handle swap logic here
        console.log("Swapping", fromAmount, fromToken, "to", toAmount, toToken);
    };

    const openModal = (mode: 'from' | 'to') => {
        setTokenSelectionMode(mode);
        setIsModalOpen(true);
    }

    const handleSelectToken = (token: string) => {
        if (tokenSelectionMode === 'from') {
            setFromToken(token);
        } else {
            setToToken(token);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center text-white p-4">
                <div className="w-full max-w-md bg-[#011620] rounded-lg shadow-lg p-4">
                    <h1 className="text-2xl font-bold text-center mb-6">Swap</h1>

                    <div className="bg-[#000F15] p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">From</span>
                            <button onClick={() => openModal('from')} className="flex items-center bg-[#02354C] rounded-full px-3 py-1 text-sm font-semibold">
                                {fromToken} <FaChevronDown className="ml-2" />
                            </button>
                        </div>
                        <input
                            type="number"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            placeholder="0.0"
                            className="w-full bg-transparent text-3xl font-bold focus:outline-none"
                        />
                    </div>

                    <div className="bg-[#000F15] p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">To</span>
                            <button onClick={() => openModal('to')} className="flex items-center bg-[#02354C] rounded-full px-3 py-1 text-sm font-semibold">
                                {toToken} <FaChevronDown className="ml-2" />
                            </button>
                        </div>
                        <input
                            type="number"
                            value={toAmount}
                            onChange={(e) => setToAmount(e.target.value)}
                            placeholder="0.0"
                            className="w-full bg-transparent text-3xl font-bold focus:outline-none"
                        />
                    </div>

                    <button
                        onClick={handleSwap}
                        className="w-full btn text-black font-bold py-3 rounded-lg text-lg"
                    >
                        Swap
                    </button>
                </div>
            </div>
            <TokenSelectModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onSelectToken={handleSelectToken}
            />
        </>
    );
}

export default Swap;