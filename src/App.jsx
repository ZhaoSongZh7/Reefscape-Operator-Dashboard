import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { styled } from "@mui/material/styles";
import viteLogo from "/vite.svg";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';


import "./App.css";
import { Box } from "@mui/material";
import CoralTracker from "./components/CoralTracker";
import Reef from "./components/Reef";
import CoOp from "./components/CoOp";

function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const [levelTwoArray, setLevelTwoArray] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);
  const [levelThreeArray, setLevelThreeArray] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);
  const [levelFourArray, setLevelFourArray] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);
  const [algaeArray, setAlgaeArray] = useState([false, false, false, false, false, false]);


  const [currentLevel, setCurrentLevel] = useState(4);

  return (
    <>
      <Box sx={{ height: '100vh', width: '100vw'}}>
        <Grid sx={{ height: '100%'}} container spacing={2} alignItems={"center"}>
          <CoralTracker levelTwoArray={levelTwoArray} setLevelTwoArray={setLevelTwoArray} levelThreeArray={levelThreeArray} setLevelThreeArray={setLevelThreeArray}
              levelFourArray={levelFourArray} setLevelFourArray={setLevelFourArray} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel}/>
          <Grid sx={{ height: '100%'}} size={8} container spacing={2} direction={"column"} justifyContent={"space-around"} alignItems={"center"}>
            <Grid size={8}>
              <Reef levelTwoArray={levelTwoArray} setLevelTwoArray={setLevelTwoArray} levelThreeArray={levelThreeArray} setLevelThreeArray={setLevelThreeArray}
              levelFourArray={levelFourArray} setLevelFourArray={setLevelFourArray} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} algaeArray={algaeArray} setAlgaeArray={setAlgaeArray}/>
            </Grid>
            {/* <Grid size={2}>
              <CoOp />
            </Grid> */}
          </Grid>
        </Grid>
        <Box sx={{fontWeight: "bold", fontSize: "2vw", fontFamily: "Roboto", position: "absolute", top: "10px", right: "10px"}}>
          CURRENT LEVEL: {currentLevel}
        </Box>
      </Box>
    </>
  );
}

export default App;
