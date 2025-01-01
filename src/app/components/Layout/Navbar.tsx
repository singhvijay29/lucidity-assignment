import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserRole } from "../../redux/slices/uiSlice";
import { RootState } from "../../redux/store";
import { Switch } from "@mui/material";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: RootState) => state.ui.isAdmin);

  return (
    <div>
      <div className="flex items-center gap-1 w-full justify-end">
        <div>admin</div>
        <Switch
          checked={!isAdmin}
          onChange={() => dispatch(toggleUserRole())}
          color="default"
          sx={{
            "& .MuiSwitch-track": {
              backgroundColor: "#9e9e9e !important",
            },
          }}
        />
        <div>user</div>
      </div>
      <div className="text-[36px] mb-4">Inventory stats</div>
    </div>
  );
};

export default Navbar;
