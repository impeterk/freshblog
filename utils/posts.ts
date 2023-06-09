import { extract } from "$std/encoding/front_matter/any.ts";

export interface Post {
  id: string;
  title: string;
  publishat: Date;
  snippet: string;
  content: string;
}

export async function loadPost(id: string): Promise<Post | null> {
  let text;
  try {
    text = await Deno.readTextFile(`./data/posts/${id}.md`);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    throw err;
  }
  const { attrs, body } = extract(text);
  const params = attrs as Record<string, string>;
  const publishat = new Date(params.publishAt);
  return {
    id,
    title: params.title,
    publishat,
    snippet: params.snippet,
    content: body,
  };
}

export async function listPosts(): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir("./data/posts")) {
    const id = entry.name.slice(0, -3);
    promises.push(loadPost(id));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishat.getTime() - a.publishat.getTime());
  return posts as Post[];
}

