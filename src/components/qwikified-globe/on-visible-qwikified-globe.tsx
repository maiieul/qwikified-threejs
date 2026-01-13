import { component$, useSignal, useVisibleTask$ } from "@qwik.dev/core";

export default component$(() => {
  const loaded = useSignal(false);
  const Component = useSignal<any>(null);

  useVisibleTask$(() => {
    import("~/components/qwikified-globe/qwikified-globe-hollow").then(
      (mod) => {
        Component.value = mod.QwikifiedGlobeHollow;
        loaded.value = true;
      }
    );
  });

  if (!loaded.value || !Component.value) {
    return <div>Loading 3D scene...</div>;
  }

  const ReactComponent = Component.value;
  return (
    <>
      <ReactComponent />
    </>
  );
});
