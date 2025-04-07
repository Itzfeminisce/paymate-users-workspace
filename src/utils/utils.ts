export const formatCurrency = (amount: number, currency?: string) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currency || 'NGN',
        minimumFractionDigits: 2,
    }).format(amount);
};

export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};
