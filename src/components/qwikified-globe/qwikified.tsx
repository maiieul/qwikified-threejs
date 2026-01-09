import { component$, useSignal, useVisibleTask$ } from "@qwik.dev/core";

export const Qwikified = component$(() => {
  const loaded = useSignal(false);
  const Component = useSignal<any>(null);

  useVisibleTask$(() => {
    import("./qwikified-globe").then((mod) => {
      Component.value = mod.QwikifiedGlobe;
      loaded.value = true;
    });
  });

  if (!loaded.value || !Component.value) {
    return <div>Loading 3D scene...</div>;
  }

  const ReactComponent = Component.value;
  return <ReactComponent />;
});
