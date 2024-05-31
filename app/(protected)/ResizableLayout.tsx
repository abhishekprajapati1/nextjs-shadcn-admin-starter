'use client';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { TooltipProvider } from '@/components/ui/tooltip';
import { IWrapper } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import { setCookie } from 'cookies-next';
import { Nav } from './Nav';
import { sidebar_menus } from '@/lib/list';
import HospoTribeIcon from '@/components/icons/HospoTribeIcon';
import { Separator } from '@/components/ui/separator';

interface ResizableLayoutProps extends IWrapper {
    defaultCollapsed?: boolean;
    sidebarDefaultSize: number;
}

const ResizableLayout: React.FC<ResizableLayoutProps> = ({ children, defaultCollapsed, sidebarDefaultSize }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)


    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction='horizontal'
                className="h-full items-stretch overflow-auto"
            >
                <ResizablePanel
                    defaultSize={sidebarDefaultSize}
                    collapsedSize={4}
                    collapsible
                    minSize={15}
                    maxSize={20}
                    onCollapse={() => {
                        setIsCollapsed(true);
                        setCookie("react-resizable-panels:collapsed", JSON.stringify(true));
                    }}
                    onExpand={() => {
                        setIsCollapsed(false);
                        setCookie("react-resizable-panels:collapsed", JSON.stringify(false));
                    }}
                    className={cn(
                        isCollapsed &&
                        "min-w-[50px] transition-all duration-300 ease-in-out"
                    )}
                >
                    <div
                        className={cn(
                            "flex h-16 items-center",
                            isCollapsed ? "h-[52px] justify-center" : "px-5"
                        )}
                    >
                        <strong>{isCollapsed ? <HospoTribeIcon className='size-6' /> : "HospoTribe"}</strong>
                    </div>
                    <Separator />
                    <Nav
                        isCollapsed={Boolean(isCollapsed)}
                        links={sidebar_menus}
                    />

                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    className="overflow-auto h-full w-full"
                    style={{ overflow: "auto" }}
                >
                    {children}
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}

export default ResizableLayout