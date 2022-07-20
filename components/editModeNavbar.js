import Navbar from "./nav";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineSave } from "react-icons/ai";
const EditModeNavbar = () => {
  return (
    <Navbar>
      <div className="bg-blue-700/10 p-3 rounded-full text-xl font-medium hover:cursor-pointer hover:bg-blue-700/40 transition-all">
        <Link href="/">
          <AiOutlineLeft size={30} />
        </Link>
      </div>
      <div className="bg-blue-700/10 py-3 px-12 rounded-full text-xl font-medium hover:cursor-pointer hover:bg-blue-700/40 transition-all">
        <AiOutlineSave size={30} />
      </div>
    </Navbar>
  );
};

export default EditModeNavbar;
