import { useState } from "preact/hooks";

const localeFmt = new Intl.DisplayNames("en", { type: "language" });
const date = new Date();
export default function LocaleSelector() {
  const [locale, setLocale] = useState("");

  let language: string | undefined = undefined;
  let timeSample: string | undefined = undefined;
  if (locale) {
    try {
      const clientLocale = new Intl.Locale(locale);
      language = localeFmt.of(clientLocale.language);
      const clientDate = new Intl.DateTimeFormat(locale, { dateStyle: "full" });
      timeSample = clientDate.format(date);
    } catch {
      // I will deal with this later maybe
    }
  }
  return (
    <form method="post" class="mt-4 space-x-2">
      <label htmlFor="locale">Locale</label>
      <input
        type="text"
        name="locale"
        id="locale"
        class="border px-2 py-1"
        value={locale}
        onInput={(e) => setLocale(e.currentTarget.value)}
      />
      <button
        type="submit"
        class="p-2 bg-sky(500 hover:700 disabled:200) text-zinc-300 font-medium rounded"
      >
        Save
      </button>
      {language && timeSample && (
        <dl class="mt-4 text-lg">
          <dd class="font-bold">language</dd>
          <dt class="m-2 text-zinc-600 font-medium italic">{language}</dt>
          <dd class="font-bold text-lg">Time sample</dd>
          <dt class="m-2 text-zinc-600 font-medium italic">{timeSample}</dt>
        </dl>
      )}
    </form>
  );
}
