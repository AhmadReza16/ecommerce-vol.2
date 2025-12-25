
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatCurrency = (
  amount: number | string,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(amount));
};

export const truncateText = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
};
