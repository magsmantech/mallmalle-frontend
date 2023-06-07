import type { NextPage } from "next";
import Details from './../../components/Details'
import Head from "next/head";

const ProductDetails: NextPage = () => {




  return (
    <>
      <Head>
  
      {/* Tell the browser to never restore the scroll position on load */}
      <script
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration = "manual"`,
        }}
      />



    </Head>
      <Details />
    </>
  );
};
export default ProductDetails;