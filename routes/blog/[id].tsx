import { h } from "preact";
import { tw } from "twind";
import { Post } from "../../utils/posts.ts";
const post: Post = {
  id: "Hello",
  title: "Hello world",
  publishat: new Date(),
  snippet: "hardocded post",
  content: "hello from fresh",
};
export default function Home() {
  return (
    <>
      <div class={tw`p-4 mx-auto mt-4 max-w-screen-md`}>
        <p class={tw`mt-8`}>
          {post.publishat.toLocaleDateString()}
        </p>
        <h1 class={tw`text-5xl mt-4 font-bold`}>{post.title}</h1>
        <div class={tw`mt-12`}>
          {post.content}
        </div>
      </div>
    </>
  );
}
