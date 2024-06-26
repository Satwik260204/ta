import React from "react";
import { Button } from "@mui/material";
import { Backdrop } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import { Typography } from "@mui/material";


const CheckModal = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.chkOpen}
    >
      {/* <CircularProgress color="inherit" /> */}
      <div className="modal__plane">
        <Typography
          variant="h4"
          sx={{ color: "#BFBFBF", textAlign: "center", padding: "8px" }}
        >
          {props.str}
        </Typography>
        <div className="btn__div">
          <Button
            variant="contained"
            onClick={() => props.deleteDataHandler()}
            sx={{ marginTop: 2, backgroundColor: "#3F51B5" }}
          >
            CONFIRM
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => props.changeChkModalHandler(false)}
            sx={{ marginTop: 2 }}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </Backdrop>
  );
};

export default CheckModal;
