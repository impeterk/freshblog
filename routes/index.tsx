import { h } from "preact";
import { tw } from "twind";

export default function Home() {
  return (
    <>
      <p class={tw`p-4 mx-auto max-w-screen-md`}>Hello world</p>
    </>
  );
}
