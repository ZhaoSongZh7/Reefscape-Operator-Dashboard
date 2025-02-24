import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import notCoop from "../assets/not-coop.png";
import coOp from "../assets/coop.png";

export default function CoOp({ useLocalStorage={useLocalStorage} }) {
  const [coopertition, setCoopertition] = useLocalStorage("Coopertition", false)
  
  const handleCoopClick = () => {
    setCoopertition(!coopertition);
  }

  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{ width: 250, fontWeight: "bold", fontSize: "2vw", fontFamily: "Roboto", position: "absolute", top: "10px", right: "30px"}}>
          CO-OP: {coopertition ? "YES" : "NO"}
          <Button onClick={handleCoopClick} sx={{bgcolor: coopertition ? "dodgerblue" : "yellow", width: "10vw", height: "20vh", borderRadius: "20%"}}>
          <img width={"120vw"} height={"120vh"} src={coopertition ? coOp : notCoop}/>
        </Button>
        </Box>
      </Box>
    </>
  )
}
