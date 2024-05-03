"use client";
import { Breadcrumbs } from "@mui/material";
import React from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function BreadcrumbsNav() {
  const pathname = usePathname();

  const paths = pathname.split("/").filter((path) => path);

  return (
    <Breadcrumbs
      component="nav"
      aria-label="breadcrumbs"
      separator={<ChevronRightRoundedIcon fontSize="small" />}
    >
      <Link
        underline="none"
        href="#some-link"
        aria-label="Home"
      >
        <FontAwesomeIcon icon={faHome} />
      </Link>
      {/* <Link
        underline="hover"
        color="neutral"
        href="#some-link"
        fontSize={12}
        fontWeight={500}
      >
        Dashboard
      </Link> */}
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        return isLast ? (
          <Typography fontWeight={500} fontSize={14} key={index}>
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </Typography>
        ) : (
          <Link
            key={path}
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            <Typography fontWeight={500} fontSize={14}>
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
