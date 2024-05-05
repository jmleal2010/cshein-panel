"use client";
import { Breadcrumbs, Button } from "@mui/material";
import React from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { routes } from "@/utils/consts";

export default function BreadcrumbsNav() {
  const pathname = usePathname();

  const paths = pathname.split("/").filter((path) => path);

  const getPath = (index: number) => {
    let path = "";
    for (let i = 0; i < index; i++) {
      path += `/${paths[i]}/${paths[i+1]}`;
    }
    return path;
  };

  return (
    <Breadcrumbs
      component="nav"
      aria-label="breadcrumbs"
      separator={<ChevronRightRoundedIcon fontSize="small" />}
    >
      <Button aria-label="Home" LinkComponent={Link} href={routes.dashboard}>
        <FontAwesomeIcon icon={faHome} color="#0369a1" />
      </Button>

      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        return isLast ? (
          <Typography fontWeight={500} fontSize={14} key={index}>
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </Typography>
        ) : (
            <Button
              LinkComponent={Link}
            key={path}
              href={getPath(index)}
              style={{textTransform: "none"}}
          >
            <Typography fontWeight={500} fontSize={14}>
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Typography>
          </Button>
        );
      })}
    </Breadcrumbs>
  );
}
