import { component$, useStore } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";

import Logo from "~/components/atoms/Logo";
import ToggleTheme from "~/components/core/ToggleTheme";
import ToggleMenu from "~/components/core/ToggleMenu";

export default component$(() => {
  const store = useStore({
    isScrolling: false,
  });

  const { menu } = useContent();

  console.log(menu);

  return (
    <header
      class={`sticky top-0 z-40 flex-none mx-auto w-full transition-all${
        store.isScrolling
          ? " md:bg-white/90 md:backdrop-blur-sm dark:md:bg-slate-900/90 bg-white dark:bg-slate-900"
          : ""
      }`}
      id="header"
      window:onScroll$={() => {
        if (!store.isScrolling && window.scrollY >= 10) {
          store.isScrolling = true;
        } else if (store.isScrolling && window.scrollY < 10) {
          store.isScrolling = false;
        }
      }}
    >
      <div class="py-3 px-3 mx-auto w-full md:flex md:justify-between max-w-6xl md:px-4">
        <div class="flex justify-between">
          <a class="flex items-center" href={"/"}>
            <Logo />
          </a>
          <div class="flex items-center md:hidden">
            <ToggleTheme iconClass="w-6 h-6" />
            <ToggleMenu iconClass="w-6 h-6" />
          </div>
        </div>
        <div class="md:self-center flex items-center mb-4 md:mb-0 ml-4">
          <nav
            class="items-center w-full md:w-auto hidden md:flex text-gray-500 dark:text-slate-200 h-[calc(100vh-100px)] md:h-auto overflow-y-auto md:overflow-visible pr-4"
            aria-label="Main navigation"
          ></nav>

          <div class="hidden items-center md:flex">
            <ToggleTheme iconClass="w-6 h-6" />
            <a
              href="https://github.com/onwidget/qwind"
              aria-label="Qwind Github"
              class="ml-3 btn btn-primary w-full h-10 px-5 shadow-none text-base"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </header>
  );
});
