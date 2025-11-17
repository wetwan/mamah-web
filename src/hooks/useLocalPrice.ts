import { useQuery } from "@tanstack/react-query";
import axios from "axios";



interface PriceResponse {
    country: string;
    currency: string;
    symbol: string;
    raw: number;
    formatted: string;
    originalPrice: number;
    originalCurrency: string;
    exchangeRate: number;
    success: boolean;
}

interface ExchangeRateResponse {
    success: boolean;
    country: string;
    currency: string;
    symbol: string;
    rate: number;
    baseCurrency: string;
    timestamp: string;
}

interface BatchPriceResponse {
    success: boolean;
    country: string;
    currency: string;
    symbol: string;
    exchangeRate: number;
    originalCurrency: string;
    prices: {
        original: number;
        converted: number;
        formatted: string;
    }[];
    count: number;
}


export const useLocalPrice = (price: number | null | undefined) => {


    return useQuery<PriceResponse>({
        queryKey: ["local-price", price],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}get-price/${price}`);
            return res.data;
        },
        enabled: !!price && price > 0,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 2,
        retry: 2,
        retryDelay: 3000,
    });
};

export const useBatchPrices = (prices: number[]) => {

    return useQuery<BatchPriceResponse>({

        queryKey: ["batch-prices", prices],

        queryFn: async () => {
            if (!prices || prices.length === 0) {
                throw new Error("Prices array is required");
            }

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}get-prices`,
                { prices }
            );
            return res.data;
        },

        enabled: !!prices && prices.length > 0,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 2,
        retry: 2,
    });
};


export const useExchangeRate = () => {
    return useQuery<ExchangeRateResponse>({
        queryKey: ["exchange-rate"],
        queryFn: async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}exchange-rate`
                );
                return res.data;
            } catch (error) {
                console.error("Failed to fetch exchange rate:", error);
                // Return NGN as fallback
                return {
                    success: true,
                    country: "NG",
                    currency: "NGN",
                    symbol: "₦",
                    rate: 1,
                    baseCurrency: "NGN",
                    timestamp: new Date().toISOString(),
                };
            }
        },
        staleTime: 1000 * 60 * 60, // 1 hour
        gcTime: 1000 * 60 * 60 * 2, // 2 hours
        retry: 2,
    });
};

/**
 * Utility function to convert price client-side
 * Use with useExchangeRate for best performance
 */
export const convertPrice = (
    price: number,
    exchangeRate: number,
    symbol: string
): string => {
    const converted = price * exchangeRate;

    const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(converted);

    return `${symbol}${formatted}`;
};


export const formatPriceWithSymbol = (
    price: number,
    rate: number,
    symbol: string
): { formatted: string; raw: number } => {
    const raw = price * rate;
    const formatted = convertPrice(price, rate, symbol);

    return { formatted, raw };
};