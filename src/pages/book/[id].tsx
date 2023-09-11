import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Book } from "../../../types";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id;
  return {
    props: {
      id: id,
    },
  };
}

interface BookProps {
  id: string;
}
export default function Book({ id }: BookProps): JSX.Element {
  const [bookData, setBookData] = useState<Book[]>();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await response.json();
      setBookData(data);
      // console.log(id);
      // console.log(data);
      console.log(bookData);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>{bookData.author}</h1>
    </div>
  );
}
