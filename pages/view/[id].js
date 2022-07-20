import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navEdit";
import { convertDate } from "../add";
import { Color } from "../../components/pallete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";

const ViewDetail = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(4);
  const [date, setDate] = useState("");
  const [bg, setBg] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [height, setHeight] = useState(300);
  const [heightTitle, setHeightTitle] = useState(60);
  const ref = useRef(null);
  const refTitle = useRef(null);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const getNoteById = async () => {
      const res = await axios.get(`/api/note/${id}`);
      const data = await res.data;
      setTitle(data.title === "untitled" ? "" : data.title);
      setContent(data.content);
      setBg(data.bg);
      randomizeBg(data.bg);
      setDate(data.date);
      return data;
    };
    getNoteById();
  }, [id]);

  useEffect(() => {
    if (content) {
      const element = ref.current;
      // console.log(element.scrollHeight, "useEffect()");
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

  const randomizeBg = (param) => {
    if (!bg) {
      setBg(param);
    } else {
      setIndex(index !== 4 ? index + 1 : 0);
      setBg(Color.list[index]);
    }
  };

  const updateNote = async () => {
    try {
      const request = {
        title: title || "untitled",
        content,
        bg,
        date: convertDate(),
      };
      const updatedNote = await axios.patch(`/api/note/${id}`, request);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
      return updatedNote;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`p-6 ${Color.pallete[bg]}`}>
      <Navbar
        submit={() => updateNote()}
        randomize={() => randomizeBg()}
        bg={`${Color.pallete[bg]}`}
      />
      {bg ? (
        <form
          className="flex flex-col [&>*]:border-0  pt-24 xs:pt-0 min-h-screen"
          style={{ animation: "popup 0.3s" }}
        >
          <div className="flex justify-center ">
            <div
              className={`
            ${isSaved ? "flex" : "hidden"}
            absolute  text-slate-800 bg-slate-50 w-min px-6 py-3 rounded-xl font-bold shadow-lg shadow-slate-500/30`}
              style={{
                animation: "slideDown .2s",
              }}
            >
              <div className="translate-x-[-0.5em] flex flex-row items-center gap-2">
                <BsFillPatchCheckFill className="fill-green-500" />
                <p>Updated</p>
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
          />
          <div className="px-3 mt-6">
            <p className="text-slate-600 tracking-widest font-normal">{date}</p>
          </div>
          <textarea
            type="textarea"
            name="content"
            id="content"
            className={`text-2xl antialiased font-medium text-slate-800 focus:ring-0 leading-10 bg-transparent`}
            ref={ref}
            style={{ height: `${height}px`, resize: "none" }}
            placeholder="Write your notes here..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={height ? content : "loading..."}
          ></textarea>
        </form>
      ) : (
        <span className="flex items-center justify-center h-[90vh]">
          {/* <svg className="animate-spin"> */}
          <AiOutlineLoading3Quarters
            className="animate-spin fill-blue-500 m-3"
            size={25}
          />
          {/* </svg> */}
          <h1 className="font-normal text-slate-600 text-xl ">
            Loading your notes...
          </h1>
        </span>
      )}
    </div>
  );
};

export default ViewDetail;
