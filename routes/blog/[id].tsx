import { h } from "preact";
import { tw } from "twind";
import { Handlers, PageProps } from "$fresh/server.ts"
import { Post, loadPost } from "../../utils/posts.ts";

export const handler: Handlers<Post> = {
  async GET(req, ctx) {
    const id = ctx.params.id
    const post = await loadPost(id)
    if (!post) {
      return new Response("Post not found", {status: 404})
    }
    return ctx.render(post);
  }
}

export default function BlogPost(props: PageProps<Post>) {
  const post = props.data
  return (
    <>
      <div class={tw`p-4 mx-auto mt-4 max-w-screen-md`}>
        <p class={tw`mt-8`}>
          {post.publishat.toLocaleDateString()}
        </p>
        <h1 class={tw`text-5xl mt-4 font-bold`}>{post.title}</h1>
        <div class={tw`mt-12`}>
          {post.snippet}
          {post.content}
        </div>
      </div>
    </>
  );
}
