// import { useDarkMode } from "../context/DarkModeContext";

import Link from "next/link";

export default function Header() {
  const menuItems = [
    { text: "sign up", url: "/register" },
    { text: "login", url: "/login" },
  ];

  // const darkModeContext = useDarkMode();

  // if (!darkModeContext) {
  //   throw new Error("useDarkMode must be used within a DarkModeProvider");
  // }

  // const { darkMode, toggleDarkMode } = darkModeContext;
  return (
    <nav className="container relative mx-auto py-6">
      <div className="flex items-center justify-between space-x-20 my-6">
        <div className="">This is placeholder</div>
        <div className="hidden items-center space-x-10 text-slate-900 md:flex dark:text-white">
          {menuItems.map((item, index) => (
            <button
              className={`uppercase  hover:text-blue-500 ${
                item.text === "login"
                  ? "px-8 py-2 text-white bg-blue-500 border-2 border-blue-500 rounded-lg shadow-md hover:text-blue-500 hover:bg-white dark:hover:text-white dark:hover:bg-slate-800"
                  : ""
              }`}
              key={index}
            >
              <Link href={item.url}>{item.text}</Link>
            </button>
          ))}
          {/* 
          <button
            onClick={toggleDarkMode}
            className={`text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2 5 `}
          >
            <svg
              id="theme-toggle-dark-icon"
              className={`w-5 h-5 ${darkMode ? "hidden" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              id="theme-toggle-light-icon"
              className={`w-5 h-5 ${darkMode ? "" : "hidden"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button> */}
        </div>
      </div>
    </nav>
  );
}
