'use client';
import { useState } from 'react';

export default function Pagination({ totalItems, itemsPerPage = 10, currentPage: initialPage = 1, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            onPageChange?.(newPage);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            onPageChange?.(newPage);
        }
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="text-sm text-gray-500">
                Menampilkan {startItem}-{endItem} dari {totalItems} data
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                    Sebelumnya
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                    Selanjutnya
                </button>
            </div>
        </div>
    );
}
