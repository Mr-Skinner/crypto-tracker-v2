import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { CoinProvider } from "@/utils/coinContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <CoinProvider>
        <Component {...pageProps} />
      </CoinProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
