import {listPosts} from "./posts.ts"
Deno.test("list posts", async () => {

    const posts = await listPosts()
    console.log(posts)
})