import { useEffect, useState } from "react";
import Navbar from "../components/navEdit";
import { Color } from "../components/pallete";
import { BsFillPatchCheckFill } from "react-icons/bs";
import axios from "axios";

const Add = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(4);
  const [bg, setBg] = useState("white");
  const [isSaved, setIsSaved] = useState(false);
  const randomizeBg = () => {
    setIndex(index !== 4 ? index + 1 : 0);
    setBg(Color.list[index]);
  };

  useEffect(() => {
    randomizeBg();
  }, []);

  const handleSubmit = async () => {
    let dateString = convertDate();
    const data = {
      title: title || "untitled",
      content,
      date: dateString,
      bg,
    };
    try {
      await axios.post("/api/note", data);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
      console.log("BERHASIL POST");
    } catch (error) {
      console.log(error);
      console.log("GAGAL POST");
    }
  };
  return (
    <div className={`p-6 ${Color.pallete[bg]}`}>
      <Navbar
        randomize={() => randomizeBg()}
        submit={() => handleSubmit()}
        transparent={bg !== "white"}
      />
      <form className="flex flex-col [&>*]:border-0 pt-24 xs:pt-0">
        <div className="flex justify-center ">
          <div
            className={`${
              isSaved ? "flex" : "hidden"
            } absolute flex-row items-center gap-2 text-slate-800 bg-white w-min px-6 py-3 rounded-xl font-bold shadow-lg shadow-slate-500/10`}
            style={{ animation: "slideDown .2s" }}
          >
            <BsFillPatchCheckFill className="fill-green-500" />
            <p>Saved</p>
          </div>
        </div>
        <input
          type="text"
          name="title"
          id="title"
          className="text-5xl font-bold text-slate-800 tracking-wide focus:ring-0 overflow-auto bg-transparent"
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          type="textarea"
          name="content"
          id="content"
          className="text-2xl min-h-screen antialiased font-medium text-slate-800 focus:ring-0 leading-10 bg-transparent"
          placeholder="Write your notes here..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </form>
    </div>
  );
};

export const convertDate = () => {
  const bulan = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Desember",
  ];
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  return bulan[month] + " " + day;
};

export default Add;
