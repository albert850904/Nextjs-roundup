import Head from "next/head";
import PostContent from "../../components/posts/postsDetail/PostContent";
import { getPostData, getPostsFileName } from "../../lib/postUtil";

function PostDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.postData?.title}</title>
        <meta name="description" content={props.postData?.detailedContent} />
      </Head>
      <PostContent postData={props.postData} />
    </>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postDetail = getPostData(slug);

  return {
    props: {
      postData: postDetail,
    },
    revalidate: 600, // 10 min 拿一次新的detail
  };
}

export function getStaticPaths() {
  const fileNames = getPostsFileName();
  const slugs = fileNames.map((file) => file.replace(/\.md$/, ""));

  return {
    // 抽掉params中舊的slug
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
