import { isMobileDevice } from "@/lib/server";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const Navigation = () => {
  const isMobile = isMobileDevice();

  if (isMobile) {
    return <MobileNavbar />;
  }

  return <DesktopNavbar />;
};

export default Navigation;
