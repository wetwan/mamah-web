import Category from "@/components/category";
import H2 from "@/components/h2";
import Hero from "@/components/hero";
import ProductItem from "@/components/productItem";
import Promo from "@/components/promo";
import axios from "axios";

import React from "react";

const Home = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}product/all`
  );

  const { products } = data;

  return (
    <div>
      <Hero />
      <div className=" px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mt-20">
        <H2
          text="new fashion"
          className="mx-auto mb-5 flex flex-col items-center"
        />
        <ProductItem products={products.slice(0, 4)} />
      </div>
      <div className=" px-4  mt-20">
        <H2
          text="shop category"
          className="mx-auto mb-5 flex flex-col items-center"
        />
        <Category />
      </div>
      <div className=" px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mt-20 ">
        <H2
          text="shop popular "
          className="mx-auto mb-5 flex flex-col items-center "
        />
        <ProductItem
          products={[...products].sort(() => Math.random() - 0.5).slice(0, 4)}
        />
      </div>
      <div className=" px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mt-20">
        <H2
          text="shop promo! "
          className="mx-auto mb-5 flex flex-col items-center"
        />
        <Promo />
      </div>
    </div>
  );
};

export default Home;
