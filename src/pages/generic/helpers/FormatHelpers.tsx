export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const suffix = getDaySuffix(day); // Function to get day suffix, e.g., 'st', 'nd', 'rd', 'th'

    return `${day}${suffix} ${month} ${year}`;
};

const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};

export const formatCurrency = (amount: number): string => {
    const currency = localStorage.getItem('currency') ?? 'INR';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
};
  