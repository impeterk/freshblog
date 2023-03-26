import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "../utils/state.ts";
import { setCookie } from "$std/http/cookie.ts";
export const handler: Handlers<State, State> = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
  async POST(req) {
    const form = await req.formData();
    const locale = form.get("locale");
    const headers = new Headers({
      Location: "/settings",
    });
    if (typeof locale === "string") {
      setCookie(headers, {
        name: "locale",
        value: locale,
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return new Response("", {
      status: 303,
      headers,
    });
  },
};

export default function SettingsPage(props: PageProps<State>) {
  const { locales } = props.data;
  return (
    <div class="px-4 mx-auto max-w-screen-md">
      <h1 class="text-5xl mt-12 font-bold">Settings</h1>
      <p class="mt-8 ">
        Your current locales are: <b>{locales[0]}</b>
      </p>
      <form method="post" class="mt-4 space-x-2">
        <label htmlFor="locale">Locale</label>
        <input type="text" name="locale" id="locale" class="border px-2 py-1" />
        <button
          type="submit"
          class="p-2 bg-sky(500 hover:700 disabled:200) text-zinc-300 font-medium rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
