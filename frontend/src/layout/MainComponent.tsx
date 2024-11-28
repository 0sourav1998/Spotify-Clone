import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";
import { useSelector } from "react-redux";
import { RootState } from "@/main";
import { useEffect, useState } from "react";

const MainComponent = () => {
  const { switchToChat } = useSelector((state: RootState) => state.chat);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col" style={{ height: '85vh' }}>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-[85vh] overflow-hidden flex-1 flex md:p-2 p-1"
      >
        <AudioPlayer />
        {isMobile && switchToChat ? (
          <ResizablePanel
            defaultSize={20}
            minSize={10}
            maxSize={30}
            collapsedSize={0}
          >
            <RightSidebar />
          </ResizablePanel>
        ) : (
          <ResizablePanel
            defaultSize={20}
            minSize={10}
            maxSize={30}
            className="mr-1"
          >
            <LeftSidebar />
          </ResizablePanel>
        )}
        <ResizableHandle />
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={20}
          minSize={10}
          maxSize={30}
          collapsedSize={0}
          className="hidden lg:block"
        >
          <p className="text-white">
            <RightSidebar />
          </p>
        </ResizablePanel>
      </ResizablePanelGroup>
      <PlaybackControls />
    </div>
  );
};

export default MainComponent;
