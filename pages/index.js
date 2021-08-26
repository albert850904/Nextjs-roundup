import Head from "next/head";
import Hero from "../components/homepage/Hero";
import FeaturedPosts from "../components/homepage/FeaturedPosts";
import { getFeaturedPosts } from "../lib/postUtil";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Lambo Paradise</title>
        <meta name="description" content="I post about cars" />
      </Head>
      <Hero />
      <FeaturedPosts postsList={props.featuredPosts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      featuredPosts,
    },
  };
}

export default HomePage;
