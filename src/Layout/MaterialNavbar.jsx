import React, { useEffect, useState } from "react";
import  MyDrawer  from "../Components/MyDrawer";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import mr from '../image/images.jpeg'

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link:"/account"
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    link:"/account"
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    link:"/logout"
  },
];

function ProfileMenu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = localStorage.getItem('auth');
  if(!auth){
    navigate("/login");
  }
//   const [ logout, result] = useLogOutMutation();

  const user = JSON.parse(localStorage.getItem('user'));

  const closeMenu = async(url) =>{ 
    
    setIsMenuOpen(false)
    if(url == "/logout"){

      const body = {
         id: user.id,
      }
      
    //   await logout(body);
      localStorage.clear();
      navigate("/login");
    }
    else{ 
      navigate('/account')
    };
};

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src={mr}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon,link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={()=> closeMenu(link)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

const MaterialNavBar = () => {
  const navigate = useNavigate();
  const [drawerState, setDrawerState] = useState(false);
  const shop = JSON.parse(localStorage.getItem('shopdetails'));
  const location = useLocation()

  useEffect(()=>{
    setDrawerState(false)
    const auth = localStorage.getItem('auth');
    if(!auth || !shop){
      navigate("/login");
    }
  },[location])

  return (
    <Navbar className="flex-1 w-screen h-16 mr-4 lg:pl-6" fullWidth>
     <MyDrawer drawerState={drawerState} closeDrawer={()=>setDrawerState(!drawerState)}/>
      <div className="flex items-start justify-between text-blue-gray-900">
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={()=> setDrawerState(!drawerState)}
          className="p-2 bg-gray-200"
        >
          <Bars3Icon className="h-6 w-6" />
        </IconButton>
        <div className="flex flex-row items-center ">
          <ProfileMenu />
        </div>
        
      </div>
    </Navbar>
  );
};

export default MaterialNavBar;
