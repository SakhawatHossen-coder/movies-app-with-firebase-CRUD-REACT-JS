import React from "react";
import Hero from "../components/Hero";
import Movies from "../components/Movies";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* Movies section */}
      <Movies />
    </div>
  );
};

export default Home;
