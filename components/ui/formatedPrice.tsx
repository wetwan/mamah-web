

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocalPrice } from "@/src/hooks/useLocalPrice";

// Format price with symbol
const formatPrice = (
  price: number,
  rate: number,
  symbol: string,
  currency: string
) => {
  const converted = price * rate;

  // Format based on currency
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);

  return `${symbol}${formatted}`;
};

export const ProductPrice = ({ price }: { price: number }) => {
  const { data: exchangeData, isLoading, error } = useLocalPrice();
  // const { data: exchangeData, isLoading, error } = useLocalPrice(1);

  // Loading state
  if (isLoading) {
    return (
      <span className="text-[#7971ea] font-medium capitalize animate-pulse">
        ₦{price.toFixed(2)}
      </span>
    );
  }

  if (error || !exchangeData || exchangeData.currency === "NGN") {
    return (
      <span className="text-[#7971ea] font-medium capitalize">
        ₦{price.toFixed(2)}
      </span>
    );
  }
  const convertedPrice = formatPrice(
    price,
    exchangeData.rate,
    exchangeData.symbol,
    exchangeData.currency
  );

  console.log(convertedPrice);

  return <>{convertedPrice}</>;
};
