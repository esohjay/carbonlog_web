import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";

type PropType = {
  Icon: IconType;
  path: string;
  text: string;
};

function NavItem({ Icon, path, text }: PropType) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "bg-primaryLight text-mainColor  font-medium border-l-4  border-l-mainColor rounded-lg block"
          : "bg-transparent text-mainColor block font-medium hover:text-white hover:bg-mainColor"
      }
    >
      <div className="flex p-2 gap-x-3 items-center  rounded-lg group">
        <button className="text-lg group-hover:font-bold ">{<Icon />}</button>

        <p className="capitalize group-hover:font-bold text-sm">{text}</p>
      </div>
    </NavLink>
  );
}

export default NavItem;
