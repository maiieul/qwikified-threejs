import { Popover } from "@qds.dev/ui";
import { component$, useSignal } from "@qwik.dev/core";

export default component$(() => {
  const isRendered = useSignal(false);

  return (
    <>
      <button type="button" onClick$={() => (isRendered.value = true)}>
        Render Popover
      </button>
      <Popover.Root>
        <Popover.Trigger class="popover-trigger">Open Popover</Popover.Trigger>
        <Popover.Content class="popover-content">Popover Panel</Popover.Content>
      </Popover.Root>
      <p>isRendered: {isRendered.value ? "true" : "false"}</p>
    </>
  );
});
