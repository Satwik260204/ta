import React from "react";
import "./FacultyInfo.css";
import { Upload } from "react-feather";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { Typography } from "@mui/material";
import CheckModal from "../../Components/CheckModal";
import { motion } from "framer-motion";
import InstructionFac from "./InstructionFac";

function FacultyInfo() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  const [chkOpen, setChkOpen] = useState(false);

  const changeChkModalHandler = (opt) => {
    setChkOpen(opt);
  };

  const handleDownloadFile = () => {
    try {
      const link = document.createElement("a");
      link.href = "http://localhost:4000/file/Faculty.xlsx";
      link.setAttribute("download", `Faculty.xlsx`);

      document.body.appendChild(link);

      link.click();

      link.parentNode.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDataHandler = async () => {
    setChkOpen(false);
    setOpen(true);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    try {
      const res = await axios.delete("http://localhost:4000/faculty/all", {
        headers: headers,
      });
      console.log(res);
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setOpen(false);
  };

  const saveFileHandler = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleFileChange = async (e) => {
    setOpen(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      authorization: `${token}`,
    };
    try {
      const res = await axios.post("http://localhost:4000/faculty", formData, {
        headers: headers,
      });
      setOpen(false);
      console.log(res.data);
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // console.log(res);
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpen(false);
    }
  };
  return (
    <motion.div
      className="faculty__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* <h2>Faculty</h2> */}
      <InstructionFac></InstructionFac>

      <label className="faculty__file">
        <Upload />
        Select File
        <input type="file" onChange={saveFileHandler}></input>
        {fileName && <p>| {fileName}</p>}
      </label>
      <div className="btn__div">
        <Button
          variant="contained"
          onClick={handleFileChange}
          sx={{ marginTop: 2, backgroundColor: "#3F51B5" }}
        >
          Upload
        </Button>
        <Button
          variant="contained"
          onClick={handleDownloadFile}
          sx={{ marginTop: 2, backgroundColor: "#3F51B5" }}
        >
          Download
        </Button>
        {secureLocalStorage.getItem("role") == "super_admin" && (
          <Button
            variant="contained"
            color="error"
            onClick={() => setChkOpen(true)}
            sx={{ marginTop: 2 }}
          >
            Delete All
          </Button>
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {/* <CircularProgress color="inherit" /> */}
        <div className="modal__plane">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#3F51B5", "#3F51B5", "#3F51B5", "#3F51B5", "#3F51B5"]}
          />
          <Typography variant="h4" sx={{ color: "#BFBFBF" }}>
            Waiting for Response...
          </Typography>
        </div>
      </Backdrop>
      <CheckModal
        chkOpen={chkOpen}
        changeChkModalHandler={changeChkModalHandler}
        str="Delete all Faculty Data?"
        deleteDataHandler={deleteDataHandler}
      ></CheckModal>
    </motion.div>
  );
}

export default FacultyInfo;