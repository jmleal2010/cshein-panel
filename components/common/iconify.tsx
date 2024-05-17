"use client";
import PropTypes from "prop-types";
import { Component, forwardRef } from "react";
import { Icon } from "@iconify/react";

import Box from "@mui/material/Box";

// ----------------------------------------------------------------------
type IconifyProps = {
  icon: string;
  width?: number;
  sx?: object;
};

const Iconify = forwardRef(function Iconify(
  { icon, width = 20, sx, ...other }: IconifyProps & any,
  ref
) {
  return (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  );
});
export default Iconify;
