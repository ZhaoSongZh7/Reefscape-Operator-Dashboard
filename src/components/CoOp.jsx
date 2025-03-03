import { Box, Button, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import notCoop from '../assets/not-coop.png';
import coOp from '../assets/coop.png';

export default function CoOp({
    useLocalStorage,
    Item,
    coOpArray,
    setCoOpArray,
    levelTwoArray,
    levelThreeArray,
    levelFourArray,
}) {
    const [coopertition, setCoopertition] = useLocalStorage(
        'Coopertition',
        false
    );

    const handleCoopClick = () => {
        setCoopertition(!coopertition);
    };

    const obtainedCoralRP = () => {
        let levelsDone = coOpArray.filter((selected) => selected).length;

        if (coopertition && levelsDone >= 3) {
            return true;
        } else if (levelsDone === 4) {
            return true;
        }
        return false;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
                alignItems: 'end',
                flex: 1,
            }}
        >
            <Item
                sx={{
                    width: '100%',
                    bgcolor: coopertition ? 'limegreen' : 'crimson',
                    color: 'white',
                }}
            >
                <Box sx={{ padding: '8px', fontSize: '60px' }}>
                    CO-OP: {coopertition ? 'YES' : 'NO'}
                </Box>
            </Item>
            <Item
                sx={{
                    width: '100%',
                    bgcolor: obtainedCoralRP() ? 'limegreen' : 'crimson',
                    color: 'white',
                }}
            >
                <Box sx={{ padding: '8px' }}>
                    Obtained Coral RP: {obtainedCoralRP() ? 'YES' : 'NO'}
                </Box>
            </Item>
            <Button
                onClick={handleCoopClick}
                sx={{
                    bgcolor: coopertition ? 'dodgerblue' : 'yellow',
                    width: '250px',
                    height: '250px',
                    borderRadius: '8px',
                }}
            >
                <img
                    width={'230px'}
                    height={'230px'}
                    src={coopertition ? coOp : notCoop}
                />
            </Button>
        </Box>
    );
}
