export const formatCurrency = (value: string) => {
  const numericValue = parseFloat(value.replace("$", ""));
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericValue);
};
