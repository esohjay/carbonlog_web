import MobileNav from "../components/MobileNav";
import { Outlet } from "react-router-dom";
import DesktopNav from "../components/DesktopNav";
import TopNav from "../components/TopNav";

function Template() {
  return (
    <main className="flex justify-center bg-primaryLight">
      {/* <MobileNav />
       */}
      <section className={`bg-white w-full `}>
        <TopNav />
        <DesktopNav />
        <section className="lg:ml-80 px-5 lg:pr-20 mt-[72px] lg:mt-[88px] mb-[95px] lg:mb-[10px] ">
          <Outlet />
          <MobileNav />
        </section>
      </section>
    </main>
  );
}

export default Template;
