import React, { useState } from 'react';
import reef from '../assets/reef.png';
import coral from '../assets/coral.png';
import algae from '../assets/algae.png';

import { Box, Button } from '@mui/material';

export default function Reef({
    levelTwoArray,
    setLevelTwoArray,
    levelThreeArray,
    setLevelThreeArray,
    levelFourArray,
    setLevelFourArray,
    currentLevel,
    algaeArray,
    setAlgaeArray,
}) {
    const coralRadius = 350; // Distance of corals from center
    const algaeRadius = 170; // Algae closer to center

    // Custom angles for coral (aligned with purple branches)
    // const coralAngles = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];
    const coralAngles = [
        105, 75, 45, 15, 345, 315, 285, 255, 225, 195, 165, 135,
    ];

    // Custom angles for algae (aligned with hexagon sides)
    // const algaeAngles = [330, 270, 210, 150, 90, 30];
    const algaeAngles = [90, 30, 330, 270, 210, 150];

    let levelTwoAlgae = false;

    // Function to handle coral click
    const handleCoralClick = (index) => {
        let updatedLevelArray;
        let updatedCount;

        // Update the correct level array based on currentLevel
        if (currentLevel === 2) {
            updatedLevelArray = [...levelTwoArray];
            updatedLevelArray[index] = !updatedLevelArray[index];
            setLevelTwoArray(updatedLevelArray);
            updatedCount = updatedLevelArray.filter(
                (selected) => selected
            ).length;
        } else if (currentLevel === 3) {
            updatedLevelArray = [...levelThreeArray];
            updatedLevelArray[index] = !updatedLevelArray[index];
            setLevelThreeArray(updatedLevelArray);
            updatedCount = updatedLevelArray.filter(
                (selected) => selected
            ).length;
        } else if (currentLevel === 4) {
            updatedLevelArray = [...levelFourArray];
            updatedLevelArray[index] = !updatedLevelArray[index];
            setLevelFourArray(updatedLevelArray);
            updatedCount = updatedLevelArray.filter(
                (selected) => selected
            ).length;
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
        <>
            {/* Hexagonal Reef */}
            <img
                src={reef}
                width={'90%'}
                style={{
                    transform: 'rotate(90deg)',
                    userSelect: 'none',
                    objectFit: 'contain',
                    margin: '0 auto',
                    maxHeight: 'calc(100vh - 175px)',
                }}
            />
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
                            borderRadius: '50%',
                            position: 'absolute',
                            top: `calc(50% + ${y}px)`,
                            left: `calc(50% + ${x}px)`,
                            transform: 'translate(-50%, -50%)',
                            border: 2,
                            borderColor: 'black',
                            bgcolor: isSelected ? 'crimson' : 'limegreen',
                        }}
                    >
                        <img src={coral} width={110} height={110} />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '90px',
                                color: 'black' 
                            }}
                        >
                            {isSelected ? 'X' : ''}
                        </Box>
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
                            borderRadius: '50%',
                            position: 'absolute',
                            top: `calc(51% + ${y}px)`,
                            left: `calc(50% + ${x}px)`,
                            transform: 'translate(-50%, -50%)',
                            border: 2,
                            borderColor: 'black',
                            bgcolor: algaeArray[index]
                                ? 'crimson'
                                : 'limegreen',
                        }}
                    >
                        <img
                            src={algae}
                            width={index % 2 == 0 ? 120 : 100}
                            height={index % 2 == 0 ? 120 : 100}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '90px',
                                color: 'black' 
                            }}
                        >
                            {algaeArray[index] ? 'X' : ''}
                        </Box>
                    </Button>
                );
            })}
        </>
    );
}
