import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost, Post } from "../../utils/posts.ts";

export const handler: Handlers<Post> = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function BlogPost(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <div class="p-4 mx-auto mt-4 max-w-screen-md">
        <p class="mt-8">
          {post.publishat.toLocaleDateString()}
        </p>
        <h1 class="text-5xl mt-4 font-bold">{post.title}</h1>
        <div class="mt-12">
          {post.snippet}
          {post.content}
        </div>
      </div>
    </>
  );
}
