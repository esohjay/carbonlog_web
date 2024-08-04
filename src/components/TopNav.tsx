import Image from "./Image";
import Logo from "../assets/logo.png";
import TextAbbrevavtion from "./TextAbbrevation";

export default function TopNav() {
  return (
    <nav className="w-full flex justify-between items-center px-5 md:px-20 shadow py-2 md:fixed md:left-0 md:top-0">
      <Image
        path={Logo}
        height="h-[50px] md:h-[80px]"
        width="w-[120px] md:w-[180px]"
      />
      <div className="flex items-center gap-x-2">
        <p className="text-sm md:text-lg font-medium text-mainColor">
          Hello, Olu
        </p>
        <TextAbbrevavtion
          text="Olu Dara"
          size="h-[40px] md:h-[55px] w-[40px] md:w-[55px]"
          textSize="text-sm md:text-xl"
        />
      </div>
    </nav>
  );
}
