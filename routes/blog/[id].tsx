import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost, Post } from "../../utils/posts.ts";
import { CSS, render } from "https://deno.land/x/gfm/mod.ts";

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
  const html = render(post.content);
  const dateFmt = new Intl.DateTimeFormat("sk-SK", { dateStyle: "full" });
  return (
    <>
      <div class="p-4 mx-auto mt-4 max-w-screen-md">
        <p class="mt-8">
          {dateFmt.format(post.publishat)}
        </p>
        <h1 class="text-5xl mt-4 font-bold">{post.title}</h1>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />{" "}
        <div
          class="mt-12 markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
