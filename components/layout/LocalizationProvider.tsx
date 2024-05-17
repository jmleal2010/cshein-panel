"use client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

type TimeProviderProps = {
  children: React.ReactNode;
};

export default function TimeProvider({ children }: TimeProviderProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {children}
    </LocalizationProvider>
  );
}
