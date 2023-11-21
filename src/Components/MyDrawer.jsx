import React from "react";
import Drawer from "@mui/material/Drawer";
import MaterialSideBar from "../Layout/MaterialSideBar"

const MyDrawer = ({ drawerState, closeDrawer }) => {
  return (
    <div>
      <Drawer
        anchor={"left"}
        open={drawerState}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            backgroundColor:"#1b2c3e",
          },
        }}
      >
        <MaterialSideBar />
      </Drawer>
    </div>
  );
};

export default MyDrawer;
