import Image from "./Image";
import Logo from "../assets/logo.png";
import TextAbbrevavtion from "./TextAbbrevation";
import useGetProfile from "../lib/useGetProfile";

export default function TopNav() {
  const { profile } = useGetProfile();
  return (
    <nav className="w-full flex bg-white z-30 justify-between h-16 lg:h-20 items-center px-5 lg:px-20 shadow py-2 fixed left-0 top-0">
      <Image
        path={Logo}
        height="h-[50px] lg:h-[80px]"
        width="w-[120px] lg:w-[180px]"
      />
      <div className="flex items-center gap-x-2">
        <p className="text-sm lg:text-lg font-medium text-mainColor">
          Hi, {profile?.firstName}
        </p>
        {profile && (
          <TextAbbrevavtion
            text={profile?.fullName}
            size="h-[40px] lg:h-[55px] w-[40px] lg:w-[55px]"
            textSize="text-sm lg:text-xl"
          />
        )}
      </div>
    </nav>
  );
}
