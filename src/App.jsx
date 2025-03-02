import { useState, useEffect, useCallback } from 'react';
import reactLogo from './assets/react.svg';
import { styled } from '@mui/material/styles';
import viteLogo from '/vite.svg';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import axios from 'axios';

import './App.css';
import { Box } from '@mui/material';
import CoralTracker from './components/CoralTracker';
import Reef from './components/Reef';
import CoOp from './components/CoOp';

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

    function getDataFromServer() {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5000/networktabledata',
        })
            .then((response) => {
                console.log('Full response from server:', response); // Log entire response
                console.log('Response data:', response.data.ds_time); // Log just the data
                console.log('Response data:', response.data.is_connected); // Log just the data

                const res = response.data;

                const calculatedMinutes = Math.floor(
                    Math.max(0, res.ds_time) / 60
                );
                const calculatedSeconds = Math.floor(
                    Math.max(0, res.ds_time) % 60
                );
                setDsMinutes(calculatedMinutes);
                setDsSeconds(calculatedSeconds);
                setIsFieldConnected(res.is_connected);

                if (response.status === 200) {
                    setIsServerConnected(true);
                } else {
                    setIsServerConnected(false);
                }
            })
            .catch((error) => {
                setIsServerConnected(false);
                console.log(error);
            });
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '40px',
        fontFamily: 'Roboto',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    const [levelOneCount, setLevelOneCount] = useLocalStorage(
        'levelOneCount',
        0
    );
    const [levelTwoArray, setLevelTwoArray] = useLocalStorage('levelTwoArray', [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [levelThreeArray, setLevelThreeArray] = useLocalStorage(
        'levelThreeArray',
        [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]
    );
    const [levelFourArray, setLevelFourArray] = useLocalStorage(
        'levelFourArray',
        [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]
    );
    const [coOpArray, setCoOpArray] = useLocalStorage('coOpArray', [
        false,
        false,
        false,
        false,
    ]);
    const [dsMinutes, setDsMinutes] = useLocalStorage('dsMinutes', 0);
    const [dsSeconds, setDsSeconds] = useLocalStorage('dsSeconds', 0);

    const [algaeArray, setAlgaeArray] = useLocalStorage('algaeArray', [
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

    const [currentLevel, setCurrentLevel] = useLocalStorage('currentLevel', 4);

    const [isFieldConnected, setIsFieldConnected] = useLocalStorage(
        'isConnected',
        false
    );
    const [isServerConnected, setIsServerConnected] = useLocalStorage(
        'isServerConnected',
        false
    );

    const sendDataToServer = useCallback(async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/update', {
                levelTwoArray,
                levelThreeArray,
                levelFourArray,
                algaeArray,
            });

            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    }, [levelTwoArray, levelThreeArray, levelFourArray, algaeArray]);

    useEffect(() => {
        sendDataToServer();

        const interval = setInterval(() => {
            sendDataToServer();
            getDataFromServer();
        }, 200);

        return () => clearInterval(interval); // Cleanup when component unmounts
    }, [sendDataToServer]);

    const resetStates = () => {
        setLevelOneCount(0);
        setLevelTwoArray([
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]);
        setLevelThreeArray([
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]);
        setLevelFourArray([
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]);
        setAlgaeArray([false, false, false, false, false, false]);
    };

    return (
        <>
            <Box
                sx={{
                    height: 'calc(100vh - 40px)',
                    width: 'calc(100vw - 40px)',
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0 auto',
                    paddingTop: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flex: 0.4,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        rowGap: '20px',
                    }}
                >
                    <CoralTracker
                        useLocalStorage={useLocalStorage}
                        levelOneCount={levelOneCount}
                        setLevelOneCount={setLevelOneCount}
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
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        position: 'relative',
                        flexDirection: 'column',
                    }}
                >
                    <Item
                        sx={{
                            fontSize: '40px',
                            border: 1,
                            padding: '12px 22px',
                            color:
                                dsMinutes <= 0 && dsSeconds <= 20
                                    ? 'white'
                                    : dsMinutes < 1
                                    ? 'black'
                                    : 'white',
                            bgcolor:
                                dsMinutes <= 0 && dsSeconds <= 20
                                    ? 'crimson'
                                    : dsMinutes < 1
                                    ? 'yellow'
                                    : 'green',
                            userSelect: 'none',
                        }}
                    >
                        DS Time: {dsMinutes}m {dsSeconds}s
                    </Item>
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
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flex: 0.25,
                        flexDirection: 'column',
                    }}
                >
                    <Item
                        sx={{
                            userSelect: 'none',
                            border: 1,
                            marginBottom: '10px',
                        }}
                    >
                        <Box sx={{ padding: '8px' }}>
                            Current Level: {currentLevel}
                        </Box>
                    </Item>
                    <CoOp
                        useLocalStorage={useLocalStorage}
                        Item={Item}
                        levelTwoArray={levelTwoArray}
                        levelThreeArray={levelThreeArray}
                        levelFourArray={levelFourArray}
                        coOpArray={coOpArray}
                        setCoOpArray={setCoOpArray}
                    />
                    <Box sx={{ flex: 1 }}></Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '10px',
                            userSelect: 'none',
                        }}
                    >
                        <Button
                            onClick={resetStates}
                            sx={{
                                fontSize: '25px',
                                border: 1,
                                borderColor: 'dodgeyblue',
                            }}
                        >
                            Clear
                        </Button>
                        <Item
                            sx={{
                                fontSize: '25px',
                                color: 'white',
                                bgcolor: isServerConnected
                                    ? 'limegreen'
                                    : 'crimson',
                                padding: '12px 0px',
                            }}
                        >
                            Server Connected: {isServerConnected ? 'YES' : 'NO'}
                        </Item>
                        <Item
                            sx={{
                                fontSize: '25px',
                                color: 'white',
                                bgcolor: isFieldConnected
                                    ? 'limegreen'
                                    : 'crimson',
                                padding: '12px 0px',
                            }}
                        >
                            Field Connected: {isFieldConnected ? 'YES' : 'NO'}
                        </Item>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default App;
