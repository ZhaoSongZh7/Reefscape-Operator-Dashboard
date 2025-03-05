import { Box, Button } from '@mui/material';
import React from 'react';
import coOp from '../assets/coop.png';
import notCoop from '../assets/not-coop.png';

export default function CoOp({
    Item,
    coopertition,
    setCoopertition,
}) {
    const handleCoopClick = () => {
        setCoopertition(!coopertition);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
                alignItems: 'center',
            }}
        >
            <Item
                sx={{
                    width: '100%',
                    bgcolor: coopertition ? 'limegreen' : 'crimson',
                    color: 'white',
                    minHeight: '145px'
                }}
            >
                <Box sx={{ padding: '8px', fontSize: '45px' }}>
                    CO-OP: <br></br>{coopertition ? 'YES' : 'NO'}
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
