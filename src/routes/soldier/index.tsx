import { component$ } from "@qwik.dev/core";
import AllUiComponents from "~/components/all-ui-components/all-ui-components";
import { QwikifiedSoldier } from "~/components/qwikified-soldier/qwikified-soldier";

export default component$(() => {
  return (
    <>
      <AllUiComponents />
      <div style={{ height: "100vh", width: "100vw" }} />
      <QwikifiedSoldier />
    </>
  );
});
