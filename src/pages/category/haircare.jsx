import React from "react";
import Banner from "@/contact/banner";
import Wrapper from "@/layout/wrapper";
import ContactForm from "@/contact/contact-form";
import Layout from "@/layout/layout";
import SEO from "@/components/seo";
import HairCare from "@/categories/haircare";
const ContactUs = () => {
  return (
    <>
      <Wrapper>
      <Layout>
      <SEO  pageTitle="Hair Care Products" />
      <HairCare />
     </Layout>
     </Wrapper>
    </> 
  );
};

export default ContactUs;