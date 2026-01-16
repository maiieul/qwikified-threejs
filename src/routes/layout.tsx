import { component$, Slot } from "@qwik.dev/core";
import { RequestHandler } from "@qwik.dev/router/middleware/request-handler";

export const onRequest: RequestHandler = ({ cacheControl }) => {
  return cacheControl({ public: true, maxAge: 1200 });
};

export default component$(() => {
  return (
    <>
      <Slot />
    </>
  );
});
