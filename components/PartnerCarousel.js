'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PartnerCarousel({ partners }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setVisibleItems(2);
            else if (window.innerWidth < 1024) setVisibleItems(3);
            else setVisibleItems(5);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (partners.length <= visibleItems) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [partners.length, visibleItems]);

    if (!partners || partners.length === 0) return null;

    return (
        <div className="relative overflow-hidden w-full py-8">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
                    width: `${(partners.length / visibleItems) * 100}%`
                }}
            >
                {/* Double the partners to create seamless infinite loop effect if needed, 
            but for simple carousel we just map them. 
            Ideally for infinite loop we need a more complex setup or a library.
            For now, we will just slide through them.
        */}
                {partners.concat(partners).map((partner, index) => (
                    <div
                        key={`${partner.id}-${index}`}
                        className="flex-shrink-0 px-4 flex items-center justify-center"
                        style={{ width: `${100 / (partners.length * 2 / (partners.length / visibleItems))}%` }}
                    // Simplified width calculation: 100% / number of items in the container
                    // Actually simpler: 
                    // The container width is (partners.length / visibleItems) * 100 %.
                    // Each item should be 1/partners.length of that container? 
                    // Let's rely on flex basis or explicit width.
                    >
                        <div className="w-full flex justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                            {partner.logo ? (
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-16 w-auto object-contain max-w-[150px]"
                                    title={partner.name}
                                />
                            ) : (
                                <span className="text-gray-400 font-semibold">{partner.name}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
