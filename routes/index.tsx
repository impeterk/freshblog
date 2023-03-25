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
      <div class="p-4 mx-auto mt-4 max-w-screen-md">
        <h1 class="text-5xl mt-12 font-bold">Peter's Blog</h1>
        <ul class="mt-8">
          {posts.map((post) => <PostEntry post={post} />)}
        </ul>
      </div>
    </>
  );
}
function PostEntry(props: { post: Post }) {
  const post = props.post;
  return (
    <li class="border-t py-4 hover:bg-gradient-to-r from-zinc-100 to-sky-100 rounded">
      <a class="flex gap-4 ml-8" href={`/blog/${post.id}`}>
        <p class="text-base">
          {post.publishat.toLocaleDateString()}
        </p>
        <div>
          <h2 class="text-2xl text-sky-800">{post.title}</h2>
          <p class="italic text-zinc-600">{post.snippet}</p>
        </div>
      </a>
    </li>
  );
}
