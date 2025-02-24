import React, { useState } from "react";
import reef from "../assets/reef.png";
import coral from "../assets/coral.png";
import algae from "../assets/algae.png"; // Add algae image

import { Box, Button } from "@mui/material";

export default function Reef({
  levelTwoArray,
  setLevelTwoArray,
  levelThreeArray,
  setLevelThreeArray,
  levelFourArray,
  setLevelFourArray,
  currentLevel,
  setCurrentLevel,
  algaeArray,
  setAlgaeArray,
}) {
  const coralRadius = 400; // Distance of corals from center
  const algaeRadius = 200; // Algae closer to center

  // Custom angles for coral (aligned with purple branches)
  const coralAngles = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];

  // Custom angles for algae (aligned with hexagon sides)
  const algaeAngles = [0, 60, 120, 180, 240, 300];

  // Function to handle coral click
  const handleCoralClick = (index) => {
    let updatedLevelArray;
    let updatedCount;

    // Update the correct level array based on currentLevel
    if (currentLevel === 2) {
      updatedLevelArray = [...levelTwoArray];
      updatedLevelArray[index] = !updatedLevelArray[index];
      setLevelTwoArray(updatedLevelArray);
      updatedCount = updatedLevelArray.filter((selected) => selected).length;
    } else if (currentLevel === 3) {
      updatedLevelArray = [...levelThreeArray];
      updatedLevelArray[index] = !updatedLevelArray[index];
      setLevelThreeArray(updatedLevelArray);
      updatedCount = updatedLevelArray.filter((selected) => selected).length;
    } else if (currentLevel === 4) {
      updatedLevelArray = [...levelFourArray];
      updatedLevelArray[index] = !updatedLevelArray[index];
      setLevelFourArray(updatedLevelArray);
      updatedCount = updatedLevelArray.filter((selected) => selected).length;
    }

    // Update the count or display the selected corals in the CoralTracker
    console.log(`${updatedCount} corals selected on level ${currentLevel}`);
  };

  const handleAlgaeClick = (index) => {
    let updatedLevelArray;

    updatedLevelArray = [...algaeArray];
    updatedLevelArray[index] = !updatedLevelArray[index];
    setAlgaeArray(updatedLevelArray);
  };

  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Hexagonal Reef */}
      <img src={reef} width={"300vh"} style={{ position: "relative" }} />

      {/* Coral Positions */}
      {coralAngles.map((angle, index) => {
        const radian = angle * (Math.PI / 180); // Convert degrees to radians
        const x = Math.cos(radian) * coralRadius;
        const y = Math.sin(radian) * coralRadius;

        const isSelected =
          currentLevel === 2
            ? levelTwoArray[index]
            : currentLevel === 3
            ? levelThreeArray[index]
            : levelFourArray[index];

        return (
          <Button
            key={`coral-${index}`}
            onClick={() => handleCoralClick(index)}
            sx={{
              borderRadius: "50%",
              position: "absolute",
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: "translate(-50%, -50%)",
              bgcolor: isSelected ? "red" : "green",
            }}
          >
            <img src={coral} width={100} height={100} />
          </Button>
        );
      })}

      {/* Algae Positions */}
      {algaeAngles.map((angle, index) => {
        const radian = angle * (Math.PI / 180); // Convert degrees to radians
        const x = Math.cos(radian) * algaeRadius;
        const y = Math.sin(radian) * algaeRadius;

        return (
          <Button
            key={`algae-${index}`}
            onClick={() => handleAlgaeClick(index)}
            sx={{
              borderRadius: "50%",
              position: "absolute",
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: "translate(-50%, -50%)",
              bgcolor: algaeArray[index] ? "red" : "green",
            }}
          >
            <img src={algae} width={90} height={90} />
          </Button>
        );
      })}
    </Box>
  );
}
