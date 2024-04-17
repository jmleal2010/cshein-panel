// const [resetPassword, {loading, error}] = useMutation(RESET_PASSWORD_MUTATION, {
// const [email, setEmail] = useState("");
//   variables: {
//     input: {
//       email,
//     },
//   },
// });
// const [email, setEmail] = useState("");
//   variables: {
//     input: {
//       email,
//     },
//   },
// });

"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useFormState } from "react-dom";
import { loginUser, restablishUserPassword } from "@/lib/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Alert, AlertTitle } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPassword() {
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(
    restablishUserPassword,
    initialState
  );
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
      flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
      Sign in
        </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }} action={formAction}>
        <TextField
          margin="normal"
            required
            fullWidth
              id="email"
            label="Email Address"  name="email"
              autoComplete="email"
              autoFocus
              />

          {state?.message && (
              <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
            {state.message}
              </Alert>
                )}

            <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
          >
            send email
                    </Button>
                    <Grid container>
                    <Grid item>
              <Link href="#" variant="body2">
                {"Go back to Login"}
              </Link>
            </Grid>
            </Grid>
          </Box>
        </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
