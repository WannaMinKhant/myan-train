import React from 'react'
import MaterialSideBar from './MaterialSideBar';
const Layout = ({ children }) => {
  return (
    <>
      <div className='flex w-full h-screen select-none'>
        <div className='z-30'>
          <MaterialSideBar />
        </div>
        <div className='flex-1 mt-20 mx-4 w-full scrollbar-hide overflow-auto'>
          {
            children
          }

        </div>
        <div className='flex flex-row h-16 w-full absolute top-0 left-0 z-0 justify-end'>
          {/* <MaterialNavBar /> */}
        </div>

      </div>
    </>
  )
}

export default Layout