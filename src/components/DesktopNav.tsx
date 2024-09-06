import { useParams } from "react-router-dom";
import useGetSurvey from "../lib/useGetSurvey";

//components
import NavItem from "./NavItem";

//icons
import { RiHome5Fill } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { IoMedal, IoLeaf, IoCalculator, IoSettings } from "react-icons/io5";

function DesktopNav({}) {
  const { userId } = useParams();
  const { survey } = useGetSurvey();
  return (
    <>
      <section className="hidden fixed top-24 left-0 pl-16 lg:flex shadow-md">
        <nav className={`w-64 h-screen p-5`}>
          <NavItem text={"home"} path={`/${userId}/home`} Icon={RiHome5Fill} />
          <NavItem
            text={"estimate"}
            path={
              survey && survey?.totalEmission
                ? `/${userId}/estimate`
                : `/${userId}/survey`
            }
            Icon={IoCalculator}
          />
          <NavItem
            text={"track"}
            path={`/${userId}/track`}
            Icon={AiFillDashboard}
          />

          <NavItem text={"act"} path={`/${userId}/act`} Icon={IoMedal} />
          <NavItem
            text={"campaign"}
            path={`/${userId}/campaign`}
            Icon={IoLeaf}
          />
          <NavItem
            text={"settings"}
            path={`/${userId}/settings`}
            Icon={IoSettings}
          />
        </nav>
      </section>
    </>
  );
}

export default DesktopNav;
