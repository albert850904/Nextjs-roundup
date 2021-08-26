import PostsGrid from "../posts/PostsGrid";
import classes from "./FeaturedPosts.module.css";

function FeaturedPosts(props) {
  const { postsList } = props;

  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid postsList={postsList} />
    </section>
  );
}

export default FeaturedPosts;
