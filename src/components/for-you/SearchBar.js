import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from "react";
import { debounce } from "lodash"; // npmYou'll need the lodash library for debounce
import classNames from "classnames";
import Link from "next/link";

export default function SearchBar() {
  const performSearch = async (search) => {
    try {
      // Implement your search logic here and set the search results
      // For example, make an API call to fetch search results
      const response =
        await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}
      `);
      const data = await response.json();
      setSearchResults(data);
      console.log(searchResults);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = debounce((text) => {
    performSearch(text);
  }, 500); // Adjust the debounce delay as needed (e.g., 500 milliseconds)

  // Handle input changes
  const handleInputChange = (event) => {
    const text = event.target.value;
    setSearchTerm(text);
    debouncedSearch(text); // Call the debounced search function
  };

  //allow for search bar to show books underneath
  return (
    <div className="bg-[#fff] border-b border-[#e1e7ea] h-[80px] z-1">
      <div className="flex items-center justify-between px-[32px] max-w-[1070px] mx-auto h-[100%]">
        <figure></figure>
        <div className="relative flex gap-[24px] max-w-[350px] w-[100%] mr-[10px]">
          <div className="flex items-center w-[100%]">
            <input
              className="items-center w-[600px] h-[40px] px-[16px] bg-[#f1f6f4] color-[#042330] rounded-[8px] border-[#e1e7ea] "
              type="text-value"
              placeholder="Search for books"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <div className="absolute right-0 border-l-[2px] border-[#e1e7ea] p-[10px] cursor-pointer">
              <AiOutlineSearch className="w-[40px]" />
            </div>
          </div>
          {searchResults != "" && (
            <div className="absolute top-[70px] bg-white border border-[#e1e7ea] p-[16px] flex flex-col max-w-[440px] shadow-my-box-shadow gap-10 w-[100%]">
              {searchResults.map((book, index) => {
                const isLastElement = index === searchResults.length - 1;

                // Define the classes for the element
                const elementClasses = classNames(
                  "flex pb-5", // Always apply these classes
                  {
                    "border-b border-b-gray-500": !isLastElement, // Apply these if it's the last element
                  }
                );
                return (
                  <Link href={`/book/${book.id}`}>
                    <div className={elementClasses}>
                      <img src={book.imageLink} className="w-[100px] "></img>
                      <div className="text-[15px]">
                        <h4>{book.title}</h4>
                        <h4 className="font-thin">{book.author}</h4>
                        {/* <h4>{book.author}</h4> */}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
