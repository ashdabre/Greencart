import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from '../components/Slider'; 
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import VerticalTiles from "../components/VerticalTiles";
import translate from '../pages/translate';
const Home = () => {
  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <translate />
      <Wrapper />
      <VerticalTiles
        animationDelay={1} // Delay before the animation starts
        animationDuration={0.5} // Duration of the animation
        minTileWidth={32}
        stagger={0.05}
        tileClassName="vertical-tiles" // Ensure this matches your CSS
      >
        <div className="flex h-full w-full items-center justify-center bg-zinc-800 p-24">
          <p className="text-2xl font-extrabold text-white">
            Welcome to our amazing website!
          </p>
        </div>
      </VerticalTiles>
      <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
