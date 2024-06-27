import { TransactionTotalResponse, TransformedData, TransformedDataForCategory } from "pages/home/Home/store/HomeTypes";

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const suffix = getDaySuffix(day);

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

export const formatCurrency = (amount: number, currency: string): string => {
    const roundedAmount = Math.round(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roundedAmount);
};
  
export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};


export const transformData = (transactionTotal:TransactionTotalResponse): TransformedData[] => {
    return Object.keys(transactionTotal).map((key) => ({
        transaction_type: capitalizeFirstLetter(key),
        amount: transactionTotal[key as keyof TransactionTotalResponse]
    }));
}

export const transformDataForTransactions = (data: { [category: string]: number }): TransformedData[] => {
    return Object.entries(data).map(([category, amount]) => ({
        transaction_type: category,
        amount
    }));
}