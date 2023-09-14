import React from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sales from "../components/Sale";
import Products from "../components/Products";

const Sale = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Sales />
      <Products/>
      <Footer/>
    </div>
  );
};

export default Sale;
