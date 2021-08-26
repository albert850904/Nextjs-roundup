import Head from "next/head";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../lib/postUtil";

function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>Lambo Posts</title>
        <meta name="description" content="Posts List about Lambo" />
      </Head>
      <AllPosts postsList={props.postsList} />
    </>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      postsList: allPosts,
    },
    revalidate: 30 * 60,
  };
}

export default AllPostsPage;
