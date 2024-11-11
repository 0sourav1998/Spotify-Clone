import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import React from 'react'
import { Outlet } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';

const MainComponent = () => {
    const isMobile= false ;
  return (
    <div className='h-screen bg-black'>
        <ResizablePanelGroup direction='horizontal' className='h-full overflow-hidden flex-1 flex p-2'>
            <ResizablePanel defaultSize={20} minSize={isMobile? 0 : 10} maxSize={30}>
               <LeftSidebar/>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                <Outlet/>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20} minSize={isMobile? 0 : 10} maxSize={25} collapsedSize={0}>
               <p className='text-white'>Right Sidebar</p>
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default MainComponent