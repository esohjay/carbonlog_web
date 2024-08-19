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
import { RiHome5Fill, RiHome5Line } from "react-icons/ri";
import { useAuthContext } from "../context/providers/auth";

function Nav() {
  const pathname = useLocation().pathname;
  console.log(pathname);
  const { state } = useAuthContext();
  console.log(state);
  return (
    <div
      className={`fixed bottom-0 left-0 w-full place-items-center block lg:hidden`}
    >
      <nav className="z-20 flex  justify-around gap-4 border-t border-gray-200 bg-white p-2.5 shadow-lg backdrop-blur-2xl fixed bottom-0  h-[75px]  w-full rounded-t-xl border">
        <NavLink
          to={`/${state.user?.uid}`}
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === `/${state.user?.uid}` ? (
            <RiHome5Fill />
          ) : (
            <RiHome5Line />
          )}
          <small className="text-center text-xs font-medium"> Home </small>
        </NavLink>
        <NavLink
          to={`/${state.user?.uid}/track`}
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === `/${state.user?.uid}/track` ? (
            <AiFillDashboard />
          ) : (
            <AiOutlineDashboard />
          )}
          <small className="text-center text-xs font-medium">Track</small>
        </NavLink>

        <NavLink
          to={`/${state.user?.uid}/act`}
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === `/${state.user?.uid}/act` ? (
            <IoMedal />
          ) : (
            <IoMedalOutline />
          )}
          <small className="text-center text-xs font-medium"> Act </small>
        </NavLink>
        <NavLink
          to={`/${state.user?.uid}/campaign`}
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === `/${state.user?.uid}/campaign` ? (
            <IoLeaf />
          ) : (
            <IoLeafOutline />
          )}
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
