import { Switch } from "@qds.dev/ui";
import { component$ } from "@qwik.dev/core";

export default component$(() => {
  return (
    <Switch.Root class="switch-root">
      <Switch.Trigger class="switch-trigger">
        <Switch.Thumb class="switch-thumb" />
      </Switch.Trigger>
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch.Root>
  );
});
