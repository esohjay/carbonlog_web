import {
  MdOutlineExplore,
  MdExplore,
  MdBookmarks,
  MdOutlineBookmarks,
} from "react-icons/md";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { TbHomeEco } from "react-icons/tb";
import { useLocation, NavLink } from "react-router-dom";

function Nav() {
  const pathname = useLocation().pathname;
  return (
    <div className={`fixed bottom-0 left-0 w-full place-items-center block`}>
      <nav className="z-20 flex max-w-lg justify-around gap-4 border-t border-gray-200 bg-gray-100 p-2.5 shadow-lg backdrop-blur-lg fixed bottom-0  min-h-[auto]  w-full rounded-lg border">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-altColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-secondaryColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          <TbHomeEco />
          <small className="text-center text-xs font-medium"> Home </small>
        </NavLink>
        <NavLink
          to="/places"
          className={({ isActive }) =>
            isActive
              ? "text-altColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-secondaryColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === "/places" ? <MdExplore /> : <MdOutlineExplore />}
          <small className="text-center text-xs font-medium"> Explore </small>
        </NavLink>
        {/* <NavLink
          to="/search"
          className={` ${
            pathname === "/search" ? "text-altColor" : "text-secondaryColor"
          } flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 `}
        >
          <RiSearchLine />
          <small className="text-center text-xs font-medium"> Search </small>
        </NavLink> */}

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            isActive
              ? "text-altColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-secondaryColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === "/saved" ? <MdBookmarks /> : <MdOutlineBookmarks />}
          <small className="text-center text-xs font-medium"> Saved </small>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "text-altColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
              : "text-secondaryColor flex aspect-square text-2xl  flex-col items-center justify-center gap-y-1 "
          }
        >
          {pathname === "/settings" ? <FaUserCircle /> : <FaRegUserCircle />}
          <small className="text-center text-xs font-medium"> Settings </small>
        </NavLink>
      </nav>
    </div>
  );
}

export default Nav;
