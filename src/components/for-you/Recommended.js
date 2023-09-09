import React, { useEffect, useState } from "react";

export default function Recommended() {
  const [booksData, setBooksData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `  https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended
        `
      );
      const data = await response.json();
      setBooksData(data);
    }
    fetchData();
  }, []);
  console.log(booksData);
  return (
    <div className="mx-auto">
      <h1 className="font-bold text-xl mb-2 mt-2">Recommended for you</h1>
      <h3 className="text-l  mt-2"> We'll think you'll like these</h3>
      <div className="overflow-x-scroll flex">
        {booksData.map((book) => (
          <img src={book.imageLink} className="w-[200px]" />
        ))}
      </div>
    </div>
  );
}
