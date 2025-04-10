import { Box, Button } from '@mui/material';
import React from 'react';

export default function CoralTracker({
    levelOneCount,
    setLevelOneCount,
    levelTwoArray,
    levelThreeArray,
    levelFourArray,
    currentLevel,
    setCurrentLevel,
}) {
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
            {Array.from(Array(3)).map((_, index) => (
                <Button
                    key={index}
                    onClick={() => {
                        setCurrentLevel(4 - index);
                    }}
                    sx={{
                        flex: 1,
                        fontSize: '50px',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        borderColor: 'black',
                        border:
                            currentLevel === 4 - index ||
                            getSelectedCount(4 - index) == 12
                                ? 0
                                : 2,
                        color:
                            currentLevel === 4 - index ||
                            getSelectedCount(4 - index) == 12
                                ? 'white'
                                : 'dodgeyblue',
                        bgcolor:
                            getSelectedCount(4 - index) == 12
                                ? 'limegreen'
                                : currentLevel === 4 - index
                                ? 'dodgerblue'
                                : 'transparent',
                    }}
                >
                    {getSelectedCount(4 - index) === 12
                        ? 'ALL DONE!'
                        : getSelectedCount(4 - index) >= 7
                        ? `${getSelectedCount(4 - index)} ✅`
                        : getSelectedCount(4 - index)}
                </Button>
            ))}
            <Box
                position={'relative'}
                sx={{ display: 'flex', flex: 1, userSelect: 'none' }}
            >
                <Box
                    sx={{
                        fontWeight: 'bold',
                        color: 'limegreen',
                        fontSize: '50px',
                        fontFamily: 'Roboto',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {levelOneCount >= 7 ? `${levelOneCount} ✅` : levelOneCount}
                </Box>
                <Button
                    onClick={() => {
                        if (levelOneCount != 0) {
                            setLevelOneCount(--levelOneCount);
                        }
                    }}
                    sx={{
                        flex: 0.5,
                        fontWeight: 'bold',
                        color: 'limegreen',
                        fontSize: '50px',
                        borderRadius: '10px 0px 0px 10px',
                        border: 2,
                        borderRight: 0,
                    }}
                >
                    -
                </Button>
                <Button
                    onClick={() => {
                        setLevelOneCount(++levelOneCount);
                    }}
                    sx={{
                        flex: 0.5,
                        fontSize: '50px',
                        fontWeight: 'bold',
                        color: 'limegreen',
                        borderRadius: '0px 10px 10px 0px',
                        border: 2,
                        borderLeft: 0,
                    }}
                >
                    +
                </Button>
            </Box>
            {/* <Grid container justifyContent={"space-around"}>
          <Grid position={"relative"}>
            <Box sx={{ width: "100%", height: "100%", fontWeight: "bold", color: "limegreen", fontSize: "50px", fontFamily: "Roboto", position: "absolute", top: "35%" }}>{levelOneCount}</Box>
            <Button onClick={() => { if (levelOneCount != 0) { setLevelOneCount(--levelOneCount) } }} sx={{ width: "200px", height: "100%", fontWeight: "bold", color: "limegreen", fontSize: "50px", borderRadius: "10px 0 0 10px", borderColor: "black", border: 1, borderRight: 0 }}>
              -
            </Button>
            <Button onClick={() => { setLevelOneCount(++levelOneCount) }} sx={{ width: "200px", height: "100%", fontWeight: "bold", color: "limegreen", fontSize: "50px", borderRadius: "0 10px 10px 0", borderColor: "black", border: 1, borderLeft: 0 }}>
              +
            </Button>
          </Grid>
        </Grid> */}
        </>
    );
}
