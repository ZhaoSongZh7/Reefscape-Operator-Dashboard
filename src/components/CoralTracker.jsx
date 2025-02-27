import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";

export default function CoralTracker({ levelTwoArray, setLevelTwoArray, levelThreeArray, setLevelThreeArray,
    levelFourArray, setLevelFourArray, currentLevel, setCurrentLevel, useLocalStorage}) {

	let [levelOneCount, setLevelOneCount] = useLocalStorage("levelOneCount", 0);

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
			{getSelectedCount(4 - index) != 12 ? 
			<Button onClick={() => {
                setCurrentLevel(4 - index);
            }} key={index} sx={{ width: "500px", height: "23vh", fontSize: "50px", borderRadius:"10px", borderColor: "black", border: 1}}>
              {getSelectedCount(4 - index)}
            </Button>
			: <Button onClick={() => {
                setCurrentLevel(4 - index);
            }} key={index} sx={{ width: "500px", height: "23vh", fontSize: "50px", borderRadius:"10px", bgcolor: "red", color: "white", border: 1}}>
              DONE!
            </Button>}
          </Grid>
        ))}
		<Grid container justifyContent={"space-around"}>
			<Grid position={"relative"}>
				<Box sx={{ width: "100%", height: "100%", fontWeight: "bold", color: "green", fontSize: "50px", fontFamily: "Roboto", position: "absolute", top: "35%"}}>{levelOneCount}</Box>
				<Button onClick={() => {if (levelOneCount != 0) {setLevelOneCount(--levelOneCount)}}} sx={{ width: "250px", height: "100%", fontWeight: "bold", color: "green", fontSize: "50px", borderRadius:"10px 0 0 10px", borderColor: "black", border: 1, borderRight: 0 }}>
					-
				</Button>
				<Button onClick={() => setLevelOneCount(++levelOneCount)} sx={{ width: "250px", height: "100%", fontWeight: "bold", color: "green", fontSize: "50px", borderRadius:"0 10px 10px 0", borderColor: "black", border: 1, borderLeft: 0 }}>
					+
				</Button>
			</Grid>
		</Grid>
      </Grid>
    </>
  );
}
