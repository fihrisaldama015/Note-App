import Link from "next/link";
import { AiOutlineLeft, AiOutlineSave } from "react-icons/ai";

const Navbar = (props) => {
  return (
    <div
      className={`flex px-3 pb-6 xs:pb-12 pt-6 items-center justify-between flex-row xs:relative fixed top-0 left-0 w-full xs:shadow-none shadow-xl shadow-slate-300/10 ${props.bg}
      }`}
    >
      {props.title && (
        <h1 className="text-5xl font-medium text-slate-900 tracking-wide mb-3 xs:mb-0">
          {props.title || ""}
        </h1>
      )}
      <Link href="/">
        <div className="bg-blue-700/10 p-3 rounded-full text-xl font-medium hover:cursor-pointer hover:bg-blue-700/40 transition-all">
          <AiOutlineLeft size={30} />
        </div>
      </Link>
      <div
        onClick={() => props.randomize()}
        className="bg-blue-700/10 py-3 px-6 rounded-full font-medium hover:cursor-pointer"
      >
        Theme
      </div>
      <div
        className="bg-blue-700/10 py-3 xs:px-12 px-3 rounded-full text-xl font-medium hover:cursor-pointer hover:bg-blue-700/40 transition-all"
        onClick={() => props.submit()}
      >
        <AiOutlineSave size={30} />
      </div>
    </div>
  );
};
export default Navbar;
