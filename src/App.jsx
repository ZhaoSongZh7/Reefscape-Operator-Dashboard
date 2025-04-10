import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { Box } from '@mui/material';
import './App.css';
import CoOp from './components/CoOp';
import CoralTracker from './components/CoralTracker';
import Reef from './components/Reef';
import { SimpleDialog } from './components/SimpleDialogue';

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

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };

        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    const [override, setOverride] = useState(false);

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
        boxShadow: 'none',
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

    const [coopertition, setCoopertition] = useLocalStorage(
        'Coopertition',
        false
    );

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

    const [open, setOpen] = useLocalStorage('resetDialog', false);

    const sendDataToServer = useCallback(async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/update', {
                levelTwoArray,
                levelThreeArray,
                levelFourArray,
                algaeArray,
                override,
            });

            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    }, [levelTwoArray, levelThreeArray, levelFourArray, algaeArray, override]);

    const obtainedCoralRP = () => {
        let levelsDone = 0;
        if (levelFourArray.filter((e) => e).length >= 7) {
            levelsDone += 1;
        }
        if (levelThreeArray.filter((e) => e).length >= 7) {
            levelsDone += 1;
        }
        if (levelTwoArray.filter((e) => e).length >= 7) {
            levelsDone += 1;
        }
        if (levelOneCount >= 7) {
            levelsDone += 1;
        }

        if (coopertition && levelsDone >= 3) {
            return true;
        } else if (levelsDone === 4) {
            return true;
        }
        return false;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        setCoopertition(false);
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
                        userSelect: 'none',
                    }}
                >
                    <Item
                        sx={{
                            border: 2,
                        }}
                    >
                        <Box
                            sx={{
                                padding: '8px 15px 8px 15px',
                                fontSize: '55px',
                            }}
                        >
                            Current Level: {currentLevel}
                        </Box>
                    </Item>
                    <CoralTracker
                        levelOneCount={levelOneCount}
                        setLevelOneCount={setLevelOneCount}
                        levelTwoArray={levelTwoArray}
                        levelThreeArray={levelThreeArray}
                        levelFourArray={levelFourArray}
                        currentLevel={currentLevel}
                        setCurrentLevel={setCurrentLevel}
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
                        algaeArray={algaeArray}
                        setAlgaeArray={setAlgaeArray}
                    />
                    <Button
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            fontSize: '40px',
                            border: override
                                ? '2px solid crimson'
                                : '2px solid dodgerblue',
                            backgroundColor: override
                                ? 'crimson'
                                : 'transparent',
                            color: override ? 'white' : 'dodgerblue',
                        }}
                        onTouchStart={() => {
                            setOverride(true);
                        }}
                        onTouchEnd={() => {
                            setOverride(false);
                        }}
                    >
                        Override
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flex: 0.25,
                        flexDirection: 'column',
                        userSelect: 'none',
                        justifyContent: 'space-between',
                    }}
                >
                    <Item
                        sx={{
                            width: '100%',
                            bgcolor: obtainedCoralRP()
                                ? 'limegreen'
                                : 'crimson',
                            color: 'white',
                            minHeight: '210px'
                        }}
                    >
                        <Box sx={{ padding: '8px', fontSize: '45px' }}>
                            Obtained Coral RP: <br></br>
                            {obtainedCoralRP() ? 'YES' : 'NO'}
                        </Box>
                    </Item>
                    <CoOp Item={Item} coopertition={coopertition} setCoopertition={setCoopertition} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '10px',
                        }}
                    >
                        <Button
                            variant='outlined'
                            onClick={handleClickOpen}
                            sx={{
                                fontSize: '25px',
                                border: 2,
                                borderColor: 'dodgeyblue',
                            }}
                        >
                            Reset
                        </Button>
                        <SimpleDialog
                            open={open}
                            close={handleClose}
                            resetStates={resetStates}
                        />
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
