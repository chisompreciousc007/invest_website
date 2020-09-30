import React from "react";
import Footer from "./Footer";
import Header from "./MainHeader";

export default function MainPageHOC(props) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
