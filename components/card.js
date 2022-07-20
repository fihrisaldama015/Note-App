import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineEllipsis,
  AiOutlineDelete,
  AiOutlinePushpin,
  AiOutlineClose,
} from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Color } from "./pallete";
import { convertDate } from "../pages/add";

const Card = (props) => {
  const [isShow, setShow] = useState(false);
  const [tanggal, setTanggal] = useState("");

  const dateNow = new Date().getDate();
  const date = parseInt(props.date.substring(8, 10));
  const jam = (parseInt(props.date.substring(11, 13)) + 24 + 7) % 24;
  useEffect(() => {
    if (jam <= 7) date++;
    if (dateNow === date) {
      setTanggal("Today");
    } else if (dateNow - date === 1) {
      setTanggal("Yesterday");
    } else {
      setTanggal(props.dateString);
    }
  }, []);

  const handleSelect = (selected) => {
    if (selected === "add") {
      console.log("add");
      setShow(false);
    } else if (selected === "delete") {
      try {
        props.delete();
      } catch (error) {
        console.log(error.message);
      }
      setShow(false);
    }
  };

  const bg = Color.pallete[props.bg];
  const titleColor = props.bg !== "white" ? "text-slate-800" : "text-slate-800";
  const textColor =
    props.bg !== "white" ? "text-slate-900/70" : "text-slate-500";
  return (
    <div
      className={`shadow-lg shadow-slate-500/10 hover:cursor-pointer max-w-full rounded-xl p-6 ring-1 ring-slate-500/10 ${bg}`}
    >
      <div className="bg-red-500 flex justify-end">
        {/* 3 Dot */}
        <div
          className="absolute transition-all bg-slate-50 hover:bg-slate-100 shadow-md rounded-full p-1"
          onClick={() => setShow(!isShow)}
        >
          {!isShow ? (
            <AiOutlineEllipsis size={25} />
          ) : (
            <IoMdClose size={25} className="fill-slate-500" />
          )}
        </div>
        {/* Dropdown */}
        <div
          className={`absolute bg-white right-[7] rounded-lg [&>*]:p-3 [&>*]:pr-6 [&>*]:rounded-lg shadow-lg shadow-blue-300/20 mt-12 ${
            !isShow && "hidden"
          }`}
          style={{ animation: "popup .2s" }}
        >
          <div
            className="flex-row flex items-center gap-2 text-yellow-600 font-medium tracking-wide hover:bg-yellow-50"
            onClick={() => handleSelect("add")}
          >
            <AiOutlinePushpin size={20} />
            <p>Pin</p>
          </div>
          <div
            className="flex-row flex items-center gap-2 text-red-500 font-medium tracking-wide hover:bg-red-50"
            onClick={() => handleSelect("delete")}
          >
            <AiOutlineDelete size={20} className="fill-red-500" />
            <p>Delete</p>
          </div>
        </div>
      </div>
      <Link href={props.to || "/"}>
        <div>
          <h1
            className={`text-2xl font-bold antialiased mb-4 tracking-wide overflow-hidden max-w-[80%] text-ellipsis ${titleColor}`}
          >
            {props.title || "Title"}
          </h1>
          <pre
            className={`font-medium font-sans text-lg max-h-[11ch]  text-ellipsis overflow-hidden max-w-full ${textColor}`}
          >
            {props.children}
          </pre>
          <div className={`text-xs font-normal mt-4 ${textColor}`}>
            {tanggal}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
