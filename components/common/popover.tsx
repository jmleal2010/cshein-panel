import { Popover as MUIPopover } from "@mui/material";
import React from "react";

type PopoverProps = {
  
  open: boolean;
  children: React.ReactNode;
};

export function Popover({ id, open,children, ...other }: PopoverProps & any) {
    const { anchorEl, onClose } = other;
    
  return (
    <MUIPopover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      disableRestoreFocus
      onClose={onClose}
    >
      {children}
    </MUIPopover>
  );
}
