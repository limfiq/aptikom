'use client';
import { useEffect, useState, useRef } from 'react';

export default function CountUpNumber({ end, duration = 2000, suffix = '' }) {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) observer.unobserve(countRef.current);
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let start = 0;
        // Extract number from string if needed, currently assumes end is passed as number or string number
        const endNum = parseInt(end.toString().replace(/\D/g, ''));
        if (start === endNum) return;

        let totalDuration = duration;
        let incrementTime = (totalDuration / endNum) * 1000;

        // Fallback for very large numbers to avoid blocking UI
        if (totalDuration / endNum < 10) {
            // Just animate steps
            const stepTime = 20; // 20ms
            const steps = totalDuration / stepTime;
            const increment = Math.ceil(endNum / steps);

            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= endNum) {
                    setCount(endNum);
                    clearInterval(timer);
                } else {
                    setCount(current);
                }
            }, stepTime);
            return () => clearInterval(timer);
        } else {
            // Linear increment
            let timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === endNum) clearInterval(timer);
            }, totalDuration / endNum);
            return () => clearInterval(timer);
        }

    }, [end, duration, hasStarted]);

    return <span ref={countRef}>{count}{suffix}</span>;
}
