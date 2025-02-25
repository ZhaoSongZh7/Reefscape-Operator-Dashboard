import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import notCoop from "../assets/not-coop.png";
import coOp from "../assets/coop.png";

export default function CoOp({ useLocalStorage, Item}) {
  const [coopertition, setCoopertition] = useLocalStorage("Coopertition", false)
  
  const handleCoopClick = () => {
    setCoopertition(!coopertition);
  }

  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{ width: 250, fontWeight: "bold", fontSize: "40px", fontFamily: "Roboto", position: "absolute", top: "35px", right: "30px"}}>
          <Item sx={{fontWeight: "bold", fontSize: "40px", fontFamily: "Roboto", marginBottom: '20px'}}>CO-OP: {coopertition ? "YES" : "NO"}</Item>
          <Button onClick={handleCoopClick} sx={{bgcolor: coopertition ? "dodgerblue" : "yellow", width: "170px", height: "170px", borderRadius: "20%"}}>
            <img width={"170px"} height={"170px"} src={coopertition ? coOp : notCoop}/>
        </Button>
        </Box>
      </Box>
    </>
  )
}
