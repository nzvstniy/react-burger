import { useState, useEffect } from 'react';
import styles from './pending-order.module.css';
import Lottie from "lottie-react";
import animationData from './orderWaiting.json'
const PendingOrder = () => {
    const [seconds, setSeconds] = useState(15);
    const lottieStyle = {
        height: 300,
        width: 300,
    }
    useEffect(() => {
        if (seconds === 0) return;

        const interval = setInterval(() => {
            setSeconds(seconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <>
            <Lottie
                animationData={animationData}
                loop={true}
                style={lottieStyle}
                autoplay={true}
            />

        </>
    );
};

export default PendingOrder;