import { useParams } from "react-router-dom";

//components
import NavItem from "./NavItem";

//icons
import { VscTasklist } from "react-icons/vsc";
import { IoReceiptOutline } from "react-icons/io5";
import { MdTimer, MdOutlineEventBusy } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";

function DesktopNav({}) {
  const { id } = useParams();

  return (
    <>
      <section className="hidden fixed top-24 left-0 pl-16 lg:flex shadow-md">
        <nav className={`w-64 h-screen p-5`}>
          <NavItem
            text={"timesheet"}
            path={`/vms/${id}/timesheet`}
            Icon={MdTimer}
          />
          <NavItem
            text={"leave"}
            path={`/vms/${id}/leave`}
            Icon={MdOutlineEventBusy}
          />

          <NavItem text={"tasks"} path={`/vms/${id}/task`} Icon={VscTasklist} />
          <NavItem
            text={"expenses"}
            path={`/vms/${id}/expenses`}
            Icon={IoReceiptOutline}
          />
          <NavItem
            text={"knowledge base"}
            path={`/vms/${id}/knowledge-base`}
            Icon={FaBookReader}
          />
        </nav>
      </section>
    </>
  );
}

export default DesktopNav;
