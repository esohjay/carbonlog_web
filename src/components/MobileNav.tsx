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
  const { state } = useAuthContext();
  return (
    <div
      className={`fixed bottom-0 left-0 w-full place-items-center block lg:hidden`}
    >
      <nav className="z-20 flex  justify-around gap-4 border-t border-gray-200 bg-white p-2.5 shadow-lg backdrop-blur-2xl fixed bottom-0  h-[75px]  w-full rounded-t-xl border">
        <NavLink
          to={`/${state.user?.uid}/home`}
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === `/${state.user?.uid}/home` ? (
            <RiHome5Fill />
          ) : (
            <RiHome5Line />
          )}
          <small
            className={`text-center text-xs ${
              pathname === `/${state.user?.uid}/home`
                ? "font-bold"
                : "font-medium"
            } `}
          >
            Home
          </small>
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
          <small
            className={`text-center text-xs ${
              pathname === `/${state.user?.uid}/track`
                ? "font-bold"
                : "font-medium"
            } `}
          >
            Track
          </small>
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
          <small
            className={`text-center text-xs ${
              pathname === `/${state.user?.uid}/act`
                ? "font-bold"
                : "font-medium"
            } `}
          >
            Act
          </small>
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
          <small
            className={`text-center text-xs ${
              pathname === `/${state.user?.uid}/campaign`
                ? "font-bold"
                : "font-medium"
            } `}
          >
            Campaign
          </small>
        </NavLink>
        <NavLink
          to={`/${state.user?.uid}/settings`}
          className={({ isActive }) =>
            isActive
              ? "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-mainColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === `/${state.user?.uid}/settings` ? (
            <IoSettings />
          ) : (
            <IoSettingsOutline />
          )}
          <small
            className={`text-center text-xs ${
              pathname === `/${state.user?.uid}/settings`
                ? "font-bold"
                : "font-medium"
            } `}
          >
            Settings
          </small>
        </NavLink>
      </nav>
    </div>
  );
}

export default Nav;
