import { component$ } from "@qwik.dev/core";
import Joke from "~/components/dx/jokes";

export { useJokeLoader } from "~/components/dx/jokes";

export default component$(() => {
  return <Joke />;
});
