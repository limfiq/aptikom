/**
 * Export data to CSV file
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the CSV file
 * @param {Array} columns - Optional array of column definitions { key, label }
 */
export function exportToCSV(data, filename, columns = null) {
    if (!data || data.length === 0) {
        console.warn('No data to export');
        return;
    }

    // If columns not provided, use all keys from first object
    const headers = columns
        ? columns
        : Object.keys(data[0]).map(key => ({ key, label: key }));

    // Create CSV header
    const csvHeader = headers.map(col => col.label).join(',');

    // Create CSV rows
    const csvRows = data.map(row => {
        return headers.map(col => {
            const value = row[col.key];

            // Handle different data types
            if (value === null || value === undefined) {
                return '';
            }

            // Escape quotes and wrap in quotes if contains comma or newline
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }

            return stringValue;
        }).join(',');
    });

    // Combine header and rows
    const csv = [csvHeader, ...csvRows].join('\n');

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Format date for CSV export
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDateForCSV(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

/**
 * Format boolean for CSV export
 * @param {boolean} value
 * @returns {string}
 */
export function formatBooleanForCSV(value) {
    return value ? 'Yes' : 'No';
}
