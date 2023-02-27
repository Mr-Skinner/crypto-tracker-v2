import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import fetchCoins from '@/utils/fetchCoins';
import { useCoin } from '@/utils/coinContext';

function CoinCatalogue() {
    const { activeCurrency } = useCoin();
    const { data: coins, error, isError, isLoading } = useQuery(['coins', activeCurrency], () => fetchCoins(activeCurrency))

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error!</div>
    }

    console.log("Coins:",coins);

    return (
        <section className="p-4 dark:bg-zinc-800 bg-gray-100 h-full w-full">
            Coins go here!
        </section>
    )
}

export default CoinCatalogue