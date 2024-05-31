"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { IconInterface } from "@/lib/types"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"


export interface IMenuLink {
    title: string
    href?: string
    icon: React.FC<IconInterface>
    variant: "default" | "ghost"
}


interface NavProps {
    isCollapsed: boolean
    links: IMenuLink[]
}

export function Nav({ links, isCollapsed }: NavProps) {
    return (
        <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={link.href || "#"}
                                    className={cn(
                                        buttonVariants({ variant: link.variant, size: "icon" }),
                                        "h-9 w-9",
                                        link.variant === "default" &&
                                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                    )}
                                >
                                    <link.icon className="size-6" />
                                    <span className="sr-only">{link.title}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-4">
                                {link.title}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link
                            key={index}
                            href={link.href || "#"}
                            className={cn(
                                buttonVariants({ variant: link.variant, size: "sm" }),
                                link.variant === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                "justify-start"
                            )}
                        >
                            <link.icon className="mr-2 size-6" />
                            {link.title}
                        </Link>
                    )
                )}
            </nav>
        </div>
    )
}