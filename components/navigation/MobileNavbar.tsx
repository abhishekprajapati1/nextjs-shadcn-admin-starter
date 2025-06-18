"use client";
import Logo from "./Logo";
import SearchPanel from "./SearchPanel";
import SideMenu from "./SideMenu";

const MobileNavbar = () => {
  return (
    <div className="sticky top-0 z-50 h-16 bg-white flex items-center justify-between gap-4 container w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200">
      <SearchPanel />
      <Logo />
      <SideMenu />
    </div>
  );
};
export default MobileNavbar;
