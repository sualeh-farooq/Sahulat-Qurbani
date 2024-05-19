import React from "react";
import Banner from "@/contact/banner";
import Wrapper from "@/layout/wrapper";
// import Qurb from "@/contact/contact-form";
import QurbaniForm from "@/contact/qurbani-form";
import Layout from "@/layout/layout";
import SEO from "@/components/seo";

const ContactUs = () => {
  return (
    <>
      <Wrapper>
      <Layout>
      <SEO  pageTitle="Online Qurbani Booking Form" />
      <QurbaniForm />
     </Layout>
     </Wrapper>
    </> 
  );
};

export default ContactUs;
