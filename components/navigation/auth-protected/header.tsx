"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IWrapper } from "@/lib/types";
import { ChevronLeft, SendToBack, StepBack, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps extends IWrapper {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}
const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  children,
}) => {
  const router = useRouter();

  return (
    <div className="container py-2 flex justify-between items-center mb-8">
      <div className="flex items-start gap-2">
        <Button
          onClick={() => (onBack ? onBack() : router.back())}
          variant="ghost"
          size="icon"
        >
          <ChevronLeft className="size-8" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
};
export default Header;
