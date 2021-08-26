import Head from "next/head";
import ContactForm from "../components/contact/contactForm";

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Lambo Jesus</title>
        <meta name="description" content="Contact me for more" />
      </Head>
      <ContactForm />
    </>
  );
}

export default ContactPage;
