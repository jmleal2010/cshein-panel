"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Paper,
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Popover,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UserCard from "@/components/pages/users/UserCard";

const WAIT_BETWEEN_CHANGE = 1000;

interface User {
  fullName: string;
  email: string;
  phone: string;
  verified: boolean;
}

export default function Table({
  rows,
  totalPages,
  columns,
  currentPage,
  rowIcon: IconComponent,
  popover,
}: {
  rows: any;
  totalPages: number;
  columns: any[];
  currentPage: number;
  rowIcon: any;
  popover?: boolean;
}) {
  /*States*/
  const [open, setOpen] = React.useState(false);
  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mousePosition, setMousePosition] = React.useState({ left: 0, top: 0 });
  const [actualUser, setActualUser] = React.useState<User | undefined>(
    undefined
  );
  //const [showPopover, setShowPopover] = React.useState(false);
  const popoverRef: any = React.useRef(null);

  /* Hooks */
  const pathname = usePathname();
  const router = useRouter();

  /*Functions*/
  const onViewOrder = (id: string) => {
    console.log(pathname)
    if (pathname === "/users/drivers") {
      router.push(`/users/${id}`);
    } else router.push(`${pathname}/${id}`);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [formData, setFormData] = React.useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para enviar el formulario
    console.log(formData);
  };
  const hadleMouseOverTableRow = (e: any) => {
    setMousePosition({ left: e.clientX + 20, top: e.clientY + 30 });
  };
  const hidePopover = () => {
    if (popoverRef.current) {
      popoverRef.current.classList.remove("showPopover");
      popoverRef.current.classList.add("hidePopover");
    }
  };
  const showPopover = () => {
    if (popoverRef.current) {
      popoverRef.current.classList.remove("hidePopover");
      popoverRef.current.classList.add("showPopover");
    }
  };

  return (
    <React.Fragment>
      <div>
        <TableContainer component={Paper} style={{ marginTop: 25 }}>
          <MTable sx={{ minWidth: 650 }} aria-label="order table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    align="center"
                    key={index}
                    sx={{
                      pb: 2,
                      pt: 1,
                    }}
                  >
                    <Typography
                      component="span"
                      fontWeight={700}
                      color="#6b7280"
                      variant="caption"
                    >
                      {column.title}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              onMouseEnter={showPopover}
              onMouseLeave={hidePopover}
              onMouseOver={(e) => hadleMouseOverTableRow(e)}
            >
              {rows.map((row: any, index: number) => (
                <TableRow
                  onMouseEnter={() => {
                    setActualUser(row);
                  }}
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((column, index) => (
                    <TableCell
                      align="center"
                      key={index}
                      sx={{
                        py: 0.3,
                        px: 0,
                      }}
                    >
                      {column.type === "date" ? (
                        moment(row[column.field]).format(column.format)
                      ) : column.field === "status" ? (
                        <Button>{row[column.field]}</Button>
                      ) : column.type === "string" ? (
                        <Typography sx={{ color: "black", fontSize: "1em" }}>
                          {column.field
                            .split(".")
                            .reduce((acc: any[], part: any) => acc[part], row)}
                        </Typography>
                      ) : column.type === "boolean" ? (
                        row[column.field] ? (
                          <CheckIcon color="success" />
                        ) : (
                          <CloseIcon color="error" />
                        )
                      ) : null}
                    </TableCell>
                  ))}
                  <TableCell
                    align="center"
                    onMouseEnter={hidePopover} //setShowPopover(false)
                    onMouseLeave={showPopover} //setShowPopover(true)
                  >
                    <IconButton onClick={() => onViewOrder(row.id)}>
                      <IconComponent />
                    </IconButton>
                    {/* <IconButton onClick={handleOpen}>
                      <FontAwesomeIcon size="xs" icon={faPencil} />
                    </IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MTable>
        </TableContainer>
      </div>

      {popover && (
        <div
          // onMouseEnter={showPopover}
          // onMouseLeave={hidePopover}
          // className="showPopover"

          ref={popoverRef}
          style={{
            pointerEvents: "none",
            color: "black",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            display: "block",
            // zIndex: 9999,
            overflow: "hidden",
            transform: `translate(${mousePosition.left}px, ${mousePosition.top}px)`,
            transition: `transform .15s ease-out, opacity .4s ease-out`,
          }}
        >
          <UserCard user={actualUser} />
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="Name"
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <OutlinedInput
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                label="Last Name"
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {formData.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={true}>Password is required</FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      {/* {popover && (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
            position: "fixed", // Asegúrate de que el Popover esté posicionado de manera fija
            left: mousePosition.X - 15, // Establece la posición horizontal basada en la coordenada X del mouse
            top: mousePosition.Y - 19, // Establece la posición vertical basada en la coordenada Y del mouse
            zIndex: 9999, // Asegúrate de que el Popover esté por encima de otros elementos
          }}
          open={popoverOpen}
          anchorEl={myDivRef.current}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <UserCard user={actualUser} />
        </Popover>
      )}

      <div
        ref={myDivRef}
        style ={{ position: "absolute", top: 0, left: 0 }}
      ></div> */}
    </React.Fragment>
  );
}
