import { h } from "preact";
import { tw } from "twind";
import { listPosts, Post } from "../utils/posts.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
      <div class={tw`p-4 mx-auto mt-4 max-w-screen-md`}>
        <h1 class={tw`text-5xl mt-12 font-bold`}>Peter's Blog</h1>
        <ul class={tw`mt-8`}>
          {posts.map((post) => <PostEntry post={post} />)}
        </ul>
      </div>
    </>
  );
}

function PostEntry(props: { post: Post }) {
  const post = props.post;
  return (
    <li>
      <h2 class={tw`text-2xl text-red`}>{post.title}</h2>
    </li>
  );
}
