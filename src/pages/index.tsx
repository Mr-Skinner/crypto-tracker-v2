import Head from 'next/head'
import Banner from '@/components/Banner/Banner';
import CoinCatalogue from '@/components/Catalogue/CoinCatalogue';

export default function Home() {
  return (
    <>
      <Head>
        <title>CryptoTracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="h-[100vh] flex flex-col">
        <Banner/>
        <CoinCatalogue/>
      </div>
    </>
  )
}
