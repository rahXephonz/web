import { component$, useStore, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import type { DocumentHead } from "@builder.io/qwik-city";

import { fetchPosts } from "~/utils/posts";
import { SITE } from "~/config.mjs";

export default component$(() => {
  const store = useStore({
    posts: [],
  });

  useTask$(async () => {
    if (isServer) {
      const posts = await fetchPosts();
      store.posts = posts.map((post: any) => ({ ...post }));
    }
  });

  return (
    <section class="px-6 sm:px-6 py-12 sm:py-16 lg:py-20 mx-auto max-w-3xl">
      <header>
        <h1 class="text-center text-4xl md:text-5xl font-bold leading-tighter tracking-tighter mb-8 md:mb-16 font-heading">
          Blog
        </h1>
      </header>
      <ul></ul>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Blog — Qwind",
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};
