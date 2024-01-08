import React from 'react'
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const WarnningComponent = ({result,open,handleClose}) => {
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
                   result.msg
                  </Alert>
                  ) : result.warning ? (
                    <Alert
                    onClose={handleClose}
                    severity="warning"
                    variant={"filled"}
                    sx={{ width: "100%" }}
                  >
                    { result.msg }
                  </Alert>
                  ) : ( <Alert
                    onClose={handleClose}
                    severity="error"
                    variant={"filled"}
                    sx={{ width: "100%" }}
                  >
                    { result.msg }
                  </Alert>)
                }
              </Snackbar>
            </Stack>
        </div>
      )
}

export default WarnningComponent
