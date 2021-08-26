import Image from "next/image";
import dynamic from "next/dynamic";
// 整包import 太大了
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// 輕量化
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import PostHeader from "./PostHeader";
import classes from "./PostContent.module.css";
import ReactMarkdown from "react-markdown";
// const ReactMarkdown = dynamic(() => import("react-markdown"));

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

function PostContent(props) {
  const { postData } = props;
  const imagePath = `/images/posts/${postData.slug}/${postData.image}`;

  const customRenderers = {
    // markdown 會回傳一個image object 裏面都有資訊了
    // img(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${postData.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    // 因為next image(有用div包著的)，會被編譯到p裏面(但是div不可以當作是p的child)
    // 所以要把整個p換成div
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        // image in the paragraph
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${postData.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here

      return (
        <SyntaxHighlighter
          language={language}
          children={children}
          style={atomDark}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={postData.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>
        {postData.detailedContent}
      </ReactMarkdown>
    </article>
  );
}

export default PostContent;
