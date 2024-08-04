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
        <section className="ml-80 px-5 md:px-12 mt-24 ">
          <Outlet />
        </section>
      </section>
    </main>
  );
}

export default Template;
