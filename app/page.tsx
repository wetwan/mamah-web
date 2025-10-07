import Category from "@/components/category";
import H2 from "@/components/h2";
import Hero from "@/components/hero";
import ProductItem from "@/components/productItem";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className=" px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mt-20">
        <H2 text="new fashion" className="mx-auto mb-5" />
        <ProductItem />
      </div>
      <div className=" px-4  mt-20">
        <H2 text="shop category" className="mx-auto mb-5" />
        <Category />
      </div>
      <div className=" px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mt-20">
        <H2 text="shop popular " className="mx-auto mb-5" />
        <ProductItem />
      </div>
    </div>
  );
};

export default Home;
