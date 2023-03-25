import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <div class="min-h-screen flex flex-col justify-center items-center ">
      <p class="text-3xl text-sky-800">404 not found: {url.pathname}</p>
      <button class="m-4 bg-coolGray-200 rounded-md border p-4 border-sky-700 hover:(shadow-lg shadow-sky-500/50)">
        <a href="/">return to home</a>
      </button>
    </div>
  );
}
