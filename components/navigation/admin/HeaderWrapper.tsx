import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IWrapper } from "@/lib/types";
import { cn } from "@/lib/utils";
interface HeaderProps {
  title?: string;
  tagline?: string;
  children?: React.ReactNode;
  className?: string;
}
const HeaderWrapper: React.FC<HeaderProps> = ({
  children,
  title,
  tagline,
  className = "",
}) => {
  return (
    <header
      className={cn(
        "flex h-16 px-6 shrink-0 bg-white items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        className,
      )}
    >
      <div className="flex flex-grow items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {title && <span>{title}</span>}
        {tagline && (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span>{tagline}</span>
          </>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0 flex items-center gap-2">{children}</div>
      )}
    </header>
  );
};

export default HeaderWrapper;
