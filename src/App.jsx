import { useState, useEffect, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import { styled } from "@mui/material/styles";
import viteLogo from "/vite.svg";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import axios from "axios";

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

  // const sendDataToServer = async () => {
  //   try {
  //     const response = await axios.post("http://127.0.0.1:5000/update", {
  //       levelTwoArray,
  //       levelThreeArray,
  //       levelFourArray,
  //     });

  //     console.log("Response from server:", response.data);
  //   } catch (error) {
  //     console.error("Error sending data to server:", error);
  //   }
  // };

  function getDataFromServer() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/networktabledata",
    })
      .then((response) => {
        console.log("Full response from server:", response); // Log entire response
        console.log("Response data:", response.data.ds_time); // Log just the data
        console.log("Response data:", response.data.is_connected); // Log just the data

        const res = response.data
        setDsTime(res.ds_time)
        setIsConnected(res.is_connected)

      }).catch((error) => {
        console.log(error)
      })
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "40px",
    fontFamily: "Roboto",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const [levelTwoArray, setLevelTwoArray] = useLocalStorage("levelTwoArray", [false, false, false, false, false, false, false, false, false, false, false, false]);
  const [levelThreeArray, setLevelThreeArray] = useLocalStorage("levelThreeArray", [false, false, false, false, false, false, false, false, false, false, false, false]);
  const [levelFourArray, setLevelFourArray] = useLocalStorage("levelFourArray", [false, false, false, false, false, false, false, false, false, false, false, false]);
  const [coOpArray, setCoOpArray] = useLocalStorage("coOpArray", [false, false, false, false]);

  const [algaeArray, setAlgaeArray] = useLocalStorage("algaeArray", [false, false, false, false, false, false]);

  const [currentLevel, setCurrentLevel] = useLocalStorage("currentLevel", 4);

  const [dsTime, setDsTime] = useLocalStorage("dsTime", -1);
  const [isConnected, setIsConnected] = useLocalStorage("isConnected", false);

  const sendDataToServer = useCallback(async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/update", {
        levelTwoArray,
        levelThreeArray,
        levelFourArray,
      });

      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  }, [levelTwoArray, levelThreeArray, levelFourArray]);

  useEffect(() => {
    sendDataToServer();

    const interval = setInterval(() => {
      sendDataToServer();
      getDataFromServer(); // Call your function every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup when component unmounts
  }, [sendDataToServer]);

  return (
    <>
      <Box sx={{ height: "100vh", width: "100vw" }}>
        <Grid
          sx={{ height: "100%" }}
          container
          spacing={2}
          alignItems={"center"}
        >
          <CoralTracker
            useLocalStorage={useLocalStorage}
            levelTwoArray={levelTwoArray}
            setLevelTwoArray={setLevelTwoArray}
            levelThreeArray={levelThreeArray}
            setLevelThreeArray={setLevelThreeArray}
            levelFourArray={levelFourArray}
            setLevelFourArray={setLevelFourArray}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            coOpArray={coOpArray}
            setCoOpArray={setCoOpArray}
          />
          <Grid
            sx={{ height: "100%" }}
            size={7}
            container
            spacing={2}
            direction={"column"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Grid size={8}>
              <Reef
                levelTwoArray={levelTwoArray}
                setLevelTwoArray={setLevelTwoArray}
                levelThreeArray={levelThreeArray}
                setLevelThreeArray={setLevelThreeArray}
                levelFourArray={levelFourArray}
                setLevelFourArray={setLevelFourArray}
                currentLevel={currentLevel}
                setCurrentLevel={setCurrentLevel}
                algaeArray={algaeArray}
                setAlgaeArray={setAlgaeArray}
                coOpArray={coOpArray}
                setCoOpArray={setCoOpArray}
              />
            </Grid>
          </Grid>
        </Grid>
        <Item
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            userSelect: "none"
          }}
        >
          CURRENT LEVEL: {currentLevel}
        </Item>
        <Box sx={{ position: "absolute", top: "60px", right: "20px", userSelect: "none" }}>
          <CoOp useLocalStorage={useLocalStorage}
            Item={Item}
            levelTwoArray={levelTwoArray}
            levelThreeArray={levelThreeArray}
            levelFourArray={levelFourArray}
            coOpArray={coOpArray}
            setCoOpArray={setCoOpArray} />
        </Box>
        <Box sx={{ position: "absolute", bottom: "20px", right: "30px", width: "690px", display: 'flex', justifyContent: "space-between", userSelect: "none" }}>
          <Item sx={{ fontSize: "30px" }}>DS Time: {dsTime}</Item>
          <Item sx={{ fontSize: "30px" }}>Field Connected: {isConnected ? "YES" : "NO"}</Item>
        </Box>
      </Box>
    </>
  );
}

export default App;
