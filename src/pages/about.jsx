// import FooterFour from "@/layout/footer/footer-4";
// import HeaderTwo from "@/layout/header/header-two";
import React from "react";
import Wrapper from "@/layout/wrapper";
import Layout from "@/layout/layout";
import SEO from "@/components/seo";
import About from "@/components/about";
import NavTab from "@/about/tab";
import Categories from "@/common/categories";
import Packaging from "@/components/packaging";

const AboutUs = () => {
  return (
    <>
      <Wrapper>
      <Layout>
      <SEO  pageTitle="About Us" />
      <About />
      {/* <NavTab /> */}
      {/* <Categories /> */}
      <Packaging />
     </Layout>
     </Wrapper>
    </> 
  );
};

export default AboutUs;
