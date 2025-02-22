import  { useState, useEffect } from "react";
import { ThreeDCardDemo } from "../Card/Card";
import { LampDemo } from "./../Bg/Bg";

export default function Home() {
  
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "mmorpg";
  });

  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#020618] min-h-screen">
      <div className="w-full">
        <LampDemo />

        <div className="flex justify-center flex-wrap text-center rounded-md shadow-xs gap-2 mt-5" role="group">
          {["mmorpg", "shooter", "sailing", "permadeath", "superhero", "pixel"].map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`px-4 cursor-pointer uppercase py-2 text-sm font-medium border border-gray-900 transition duration-300 ease-in-out
                  ${
                    selectedCategory === category
                      ? "bg-gray-800 text-[#15B8D3]"
                      : "bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white"
                  } 
                  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-800`}
              >
                {category}
              </button>
            )
          )}
        </div>

        <form className="max-w-md mx-auto mt-7" onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Games, Category..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="w-full p-24">
        <ThreeDCardDemo selectedCategory={selectedCategory} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
