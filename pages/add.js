import { useEffect, useRef, useState } from "react";
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
  const [savedOnce, setsavedOnce] = useState(false);
  const [id, setId] = useState();
  const [height, setHeight] = useState(300);
  const [heightTitle, setHeightTitle] = useState(60);
  const ref = useRef(null);
  const refTitle = useRef(null);

  const randomizeBg = () => {
    setIndex(index !== 4 ? index + 1 : 0);
    setBg(Color.list[index]);
  };

  useEffect(() => {
    randomizeBg();
  }, []);

  useEffect(() => {
    let time = setTimeout(() => {
      isSaved && setsavedOnce(true);
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, [isSaved]);

  useEffect(() => {
    if (content) {
      const element = ref.current;
      // console.log(element.scrollHeight, "useEffect() 1");
      setHeight(element.scrollHeight);
    }
  }, [content]);

  useEffect(() => {
    if (title) {
      const element = refTitle.current;
      // console.log(element.scrollHeight, "useEffect() 2");
      setHeightTitle(element.scrollHeight);
    }
  }, [title]);

  const handleSubmit = async () => {
    let dateString = convertDate();
    const data = {
      title: title || "untitled",
      content,
      date: dateString,
      bg,
    };
    try {
      if (savedOnce) {
        const updatedData = await axios.patch(`/api/note/${id}`, data);
        // console.log(updatedData);
      } else {
        const savedData = await axios.post("/api/note", data);
        // console.log(savedData.data._id);
        setId(savedData.data._id);
      }
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
      // console.log("BERHASIL POST");
    } catch (error) {
      console.log(error);
      // console.log("GAGAL POST");
    }
  };
  return (
    <div className={`p-6 ${Color.pallete[bg]}`}>
      <Navbar
        randomize={() => randomizeBg()}
        submit={() => handleSubmit()}
        bg={`${Color.pallete[bg]}`}
      />
      <form className="flex flex-col [&>*]:border-0 pt-24 xs:pt-0 min-h-screen">
        <div className="flex justify-center ">
          <div
            className={`${
              isSaved ? "flex" : "hidden"
            } absolute flex-row items-center gap-2 text-slate-800 bg-white w-min px-6 py-3 rounded-xl font-bold shadow-lg shadow-slate-500/10`}
            style={{ animation: "slideDown .2s" }}
          >
            <div className="translate-x-[-0.5em] flex flex-row items-center gap-2">
              <BsFillPatchCheckFill className="fill-green-500" />
              {savedOnce ? <p>Updated</p> : <p>Saved</p>}
            </div>
          </div>
        </div>
        <textarea
          type="textarea"
          name="title"
          id="title"
          style={{ height: `${heightTitle}px`, resize: "none" }}
          ref={refTitle}
          className="text-5xl font-bold text-slate-800 tracking-wide focus:ring-0 overflow-auto bg-transparent"
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></textarea>
        <textarea
          type="textarea"
          name="content"
          id="content"
          style={{ height: `${height}px`, resize: "none" }}
          ref={ref}
          className="text-2xl antialiased font-medium text-slate-800 focus:ring-0 leading-10 bg-transparent"
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
