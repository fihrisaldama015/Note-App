import Link from "next/link";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

const Navbar = (props) => {
  return (
    <div className="flex z-10 px-3 pb-3 xs:pb-12 pt-6 items-center justify-between flex-col xs:flex-row xs:relative fixed bg-white xs:bg-blue-50/10 top-0 left-0 w-full xs:shadow-none shadow-xl shadow-slate-300/10 rounded-xl">
      {props.title && (
        <h1 className="text-5xl font-medium text-slate-900 tracking-wide mb-3 xs:mb-0">
          {props.title || ""}
        </h1>
      )}
      <div className="flex flex-row gap-2">
        <div className="bg-blue-700/10 p-3 rounded-full text-xl font-medium">
          <AiOutlineSearch className="fill-blue-900 xs:w-[30px] xs:h-[30px] w-[20px] h-[20px]" />
        </div>
        <Link href="/add">
          <div className="bg-blue-700/10 px-12 py-3 rounded-full text-xl font-medium hover:bg-blue-700/40 hover:cursor-pointer">
            <AiOutlinePlus className="fill-blue-900 xs:w-[30px] xs:h-[30px] w-[20px] h-[20px]" />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
