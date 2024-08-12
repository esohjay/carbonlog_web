import { TbHomeEco } from "react-icons/tb";
import { useLocation, NavLink } from "react-router-dom";
import { AiOutlineDashboard, AiFillDashboard } from "react-icons/ai";
import {
  IoMedal,
  IoMedalOutline,
  IoLeaf,
  IoLeafOutline,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";

function Nav() {
  const pathname = useLocation().pathname;
  console.log(pathname);
  return (
    <div
      className={`fixed bottom-0 left-0 w-full place-items-center block lg:hidden`}
    >
      <nav className="z-20 flex  justify-around gap-4 border-t border-gray-200 bg-white p-2.5 shadow-lg backdrop-blur-2xl fixed bottom-0  min-h-[auto]  w-full rounded-t-xl border">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          <TbHomeEco />
          <small className="text-center text-xs font-medium"> Home </small>
        </NavLink>
        <NavLink
          to="/sgsgs/track"
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === "/track" ? <AiFillDashboard /> : <AiOutlineDashboard />}
          <small className="text-center text-xs font-medium">Track</small>
        </NavLink>

        <NavLink
          to="/act"
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === "/act" ? <IoMedal /> : <IoMedalOutline />}
          <small className="text-center text-xs font-medium"> Act </small>
        </NavLink>
        <NavLink
          to="/campaign"
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === "/campaign" ? <IoLeaf /> : <IoLeafOutline />}
          <small className="text-center text-xs font-medium"> Campaign </small>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === "/settings" ? <IoSettings /> : <IoSettingsOutline />}
          <small className="text-center text-xs font-medium"> Settings </small>
        </NavLink>
      </nav>
    </div>
  );
}

export default Nav;
