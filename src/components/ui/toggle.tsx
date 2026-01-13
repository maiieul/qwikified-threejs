import { Lucide, Toggle } from "@qds.dev/ui";
import { component$ } from "@qwik.dev/core";

export default component$(() => {
  return (
    <Toggle.Root class="toggle-root" aria-label="Toggle Bold">
      <Lucide.Bold />
    </Toggle.Root>
  );
});
