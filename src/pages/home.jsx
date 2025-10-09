import React from "react";
import Hero from "../components/Hero";
import SliderHome from "../components/SliderHome";
import ScrollGrid from "../components/scrollGrid";
import GradientLine from "../components/GradientLine";

export default function Home() {
  return (
    <div className=" text-white px-4 md:px-12 py-8">
      <Hero />
         <div className="my-4">
        <GradientLine />
      </div>
      <SliderHome />
         <div className="my-4">
        <GradientLine />
      </div>
      <ScrollGrid endpoint={'post'}/>
    </div>
  );
}
