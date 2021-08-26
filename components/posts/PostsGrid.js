import PostsItem from "./PostsItem";
import classes from "./PostsGrid.module.css";

function PostsGrid(props) {
  const { postsList } = props;
  return (
    <ul className={classes.grid}>
      {Array.isArray(postsList) &&
        postsList.map((post) => <PostsItem key={post.slug} post={post} />)}
    </ul>
  );
}

export default PostsGrid;
