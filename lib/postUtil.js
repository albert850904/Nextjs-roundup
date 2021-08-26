import fs from "fs";
import path from "path";

// read md 然後parse 成meta 跟 jsx
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

export function getPostsFileName() {
  const files = fs.readdirSync(postsDir); // array of filename
  return files;
}

export function getPostData(postId) {
  const postSlug = postId.replace(/\.md$/, ""); // removes the file extention
  const filePath = path.join(postsDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent); // data = meta-data, content = markup content
  const postData = {
    slug: postSlug,
    ...data,
    detailedContent: content,
  };

  return postData;
}

export function getAllPosts() {
  const files = getPostsFileName();
  const allPosts = files.map((post) => getPostData(post)); // map 會建立新array
  const sortedPosts = allPosts.sort((a, b) => a.date - b.date);
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPost = allPosts.filter((post) => post.isFeatured);
  return featuredPost;
}
