import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState, useEffect} from "react";

export default function CoralTracker({ levelTwoArray, setLevelTwoArray, levelThreeArray, setLevelThreeArray,
    levelFourArray, setLevelFourArray, currentLevel, setCurrentLevel, useLocalStorage, coOpArray,
    setCoOpArray}) {

	let [levelOneCount, setLevelOneCount] = useLocalStorage("levelOneCount", 0);

  const updateCoOpArray = (array, level) => {
    setCoOpArray(prevArray => {
      const updatedArray = [...prevArray];
      updatedArray[level - 1] = level === 1 ? levelOneCount >= 5 : array.filter(selected => selected).length >= 5;
      return updatedArray;
    });
  }

  const getSelectedCount = (level) => {
    if (level === 2) {
      return levelTwoArray.filter((selected) => selected).length;
    } else if (level === 3) {
      return levelThreeArray.filter((selected) => selected).length;
    } else if (level === 4) {
      return levelFourArray.filter((selected) => selected).length;
    }
    return 0;
  };

  useEffect(() => {
    updateCoOpArray(levelTwoArray, 2);
  }, [levelTwoArray]);
  
  useEffect(() => {
    updateCoOpArray(levelThreeArray, 3);
  }, [levelThreeArray]);
  
  useEffect(() => {
    updateCoOpArray(levelFourArray, 4);
  }, [levelFourArray]);
  
  useEffect(() => {
    updateCoOpArray(coOpArray, 1);
  }, [levelOneCount]);


  return (
    <>
      <Grid
        item
        size={3}
        container
        direction="column"
        justifyContent={"space-around"}
		rowGap={2}
      >
        {Array.from(Array(3)).map((_, index) => (
          <Grid item xs key={index} sx={{ flex: 1, height: "300px" }}>
			<Button onClick={() => {
                setCurrentLevel(4 - index);
            }} key={index} sx={{ width: "500px", height: "23vh", fontSize: "50px", borderRadius:"10px", borderColor: "black", border: 1, 
              color: (currentLevel === 4 - index || getSelectedCount(4 - index) == 12) ? "white" : "black", 
              bgcolor: getSelectedCount(4 - index) == 12 ? "green" : currentLevel === 4 - index ? "dodgerblue" : "white"}}>
              {getSelectedCount(4 - index) !== 12 ? getSelectedCount(4 - index) : "DONE!"}
            </Button>
          </Grid>
        ))}
		<Grid container justifyContent={"space-around"}>
			<Grid position={"relative"}>
				<Box sx={{ width: "100%", height: "100%", fontWeight: "bold", color: "green", fontSize: "50px", fontFamily: "Roboto", position: "absolute", top: "35%"}}>{levelOneCount}</Box>
				<Button onClick={() => {if (levelOneCount != 0) {setLevelOneCount(--levelOneCount)}}} sx={{ width: "250px", height: "100%", fontWeight: "bold", color: "green", fontSize: "50px", borderRadius:"10px 0 0 10px", borderColor: "black", border: 1, borderRight: 0 }}>
					-
				</Button>
				<Button onClick={() => {setLevelOneCount(++levelOneCount)}} sx={{ width: "250px", height: "100%", fontWeight: "bold", color: "green", fontSize: "50px", borderRadius:"0 10px 10px 0", borderColor: "black", border: 1, borderLeft: 0 }}>
					+
				</Button>
			</Grid>
		</Grid>
      </Grid>
    </>
  );
}
