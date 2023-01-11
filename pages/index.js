import Head from "next/head";
import Navbar from "../components/nav";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "../components/card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import axios from "axios";

export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.BASE_URL}/api/note`);
  const data = await res.data;
  return {
    props: { data },
  };
}

export default function Home({ data }) {
  const [note, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    data ? setIsLoading(false) : null;
  }, [data]);

  const deleteNote = async (idNote) => {
    await axios.delete(`/api/note/${idNote}`);
    getAllNote();
  };

  return (
    <div className="p-6 md:px-16 xs:px-9 bg-blue-50/10">
      <Head>
        <title>Note App | Fihrisaldama015</title>
        <meta
          name="description"
          content="Note App, created with Next.js 12. fihrisaldama015 on github"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar title="Notes" />
      {isLoading === false ? (
        <div
          className="grid xs:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 md:gap-6 pt-36 xs:pt-0 auto-rows-max grid-flow-row min-h-[70vh]"
          style={{ animation: "popup .5s,slideDown .3s" }}
        >
          {data.map((note, id) => (
            <Card
              bg={note.bg}
              title={note.title}
              key={id}
              date={note.updated_at}
              dateString={note.date}
              delete={() => deleteNote(note._id)}
              to={`/view/${note._id}`}
            >
              {note.content}
            </Card>
          ))}
        </div>
      ) : (
        <span className="flex items-center justify-center h-[90vh]">
          <AiOutlineLoading3Quarters
            className="animate-spin fill-blue-500 m-3"
            size={25}
          />
          <h1 className="font-normal text-slate-600 text-xl ">
            Loading your notes...
          </h1>
        </span>
      )}
      <footer className="flex gap-3 items-center justify-center mt-32">
        <a
          href="https://github.com/fihrisaldama015/Note-App"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub size={25} className="fill-slate-800" />
        </a>
        <div className="text-slate-600 text-sm">
          <p className="font-medium ">Muhamad Fihris Aldama</p>
          <p className="font-light ">&copy;2022. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
