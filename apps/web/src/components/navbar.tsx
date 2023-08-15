import React, { FC, ReactNode } from "react";
import Link from "next/link";
import { User2 } from "lucide-react";

type NavbarProps = {
  children: ReactNode;
};

export const NavbarComponent: FC<NavbarProps> = ({ children }): JSX.Element => {
  return (
    <>
      <header
        className=" z-50 flex w-full flex-wrap bg-accent py-3 text-sm text-accent-foreground sm:flex-nowrap
       sm:justify-start sm:py-0">
        <nav
          className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global">
          <div className="flex items-center justify-between">
            <a
              className="flex-none text-xl font-semibold text-white"
              href="#"
              aria-label="Brand">
              Retro Tool
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-md border p-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation">
                <svg
                  className="hs-collapse-open:hidden h-4 w-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden h-4 w-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block">
            <div className="mt-5 flex flex-col gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-x-7 sm:gap-y-0 sm:pl-7">
              <Link
                className="font-semibold text-gray-400 hover:text-gray-500 sm:py-6"
                href="main/workspace"
                aria-current="page">
                Workspace
              </Link>

              <Link
                className="font-semibold text-gray-400 hover:text-gray-500 sm:py-6"
                href="main/example-action-plans"
                aria-current="page">
                Example Action Plans
              </Link>

              <Link
                className="flex items-center gap-x-2 font-semibold text-gray-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 sm:my-6 sm:border-l sm:border-gray-300 sm:pl-6"
                href="auth/sign-in">
                <User2 />
                Log in
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {children}
    </>
  );
};
