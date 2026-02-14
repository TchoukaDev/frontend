"use client";

import { useState, useEffect } from "react";
import { RiseLoader } from "react-spinners";

export default function InitialLoader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleLoad = () => setIsVisible(false);

        if (document.readyState === "complete") {
            handleLoad()
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, [])

    if (!isVisible) return null;

    return (
        <div className="flex justify-center items-center h-screen">
            <RiseLoader size={30} color="#008dda" />
        </div>
    )
}