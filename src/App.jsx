import { useState, useEffect } from "react";
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
  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
  }

  const [levelTwoArray, setLevelTwoArray] = useLocalStorage('levelTwoArray', [false, false, false, false, false, false, false, false, false, false, false, false]);
  const [levelThreeArray, setLevelThreeArray] = useLocalStorage('levelThreeArray', [false, false, false, false, false, false, false, false, false, false, false, false]);
  const [levelFourArray, setLevelFourArray] = useLocalStorage('levelFourArray', [false, false, false, false, false, false, false, false, false, false, false, false]);
  const [algaeArray, setAlgaeArray] = useLocalStorage('algaeArray', [false, false, false, false, false, false]);

  const [currentLevel, setCurrentLevel] = useLocalStorage('currentLevel', 4);

  return (
    <>
      <Box sx={{ height: '100vh', width: '100vw'}}>
        <Grid sx={{ height: '100%'}} container spacing={2} alignItems={"center"}>
          <CoralTracker useLocalStorage={useLocalStorage} levelTwoArray={levelTwoArray} setLevelTwoArray={setLevelTwoArray} levelThreeArray={levelThreeArray} setLevelThreeArray={setLevelThreeArray}
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
        <Box sx={{position: "absolute", top: "60px", right: "20px"}}>
          <CoOp useLocalStorage={useLocalStorage} />
        </Box>
      </Box>
    </>
  );
}

export default App;
