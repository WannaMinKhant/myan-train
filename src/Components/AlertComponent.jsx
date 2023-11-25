import React from 'react'
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const AlertComponent = ({result,open,handleClose}) => {
  return (
    <div>
      <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            { result.isSuccess ? (
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
                variant={"filled"}
              >
               Success!
              </Alert>
              ) : result.error?.data.message == null ? (
                <div>
                </div>
              ) : ( <Alert
                onClose={handleClose}
                severity="error"
                variant={"filled"}
                sx={{ width: "100%" }}
              >
                { result.error?.data.message }
              </Alert>)
            }
          </Snackbar>
        </Stack>
    </div>
  )
}

export default AlertComponent
