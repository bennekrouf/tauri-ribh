import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Button, Container, Grid, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import theme from './theme';

import ConfigModal from './ConfigModal';
import Header from './Header';
import Lesson from './lesson/Lesson';
import Exercise from './exercise/Exercise';
import { UserState, initialState } from '../models/UserState';
import { useFetchUser } from '../hooks/useFetchUser';

import useFetchLessons from '../hooks/useFetchLessons';
import useFetchExercises from '../hooks/useFetchExercises';
import useFetchChapterStats from '../hooks/useFetchChapterStats';
import useFetchVerseStats from '../hooks/useFetchVerseStats';
import useCurrentScreen from '../hooks/useCurrentScreen';
import useHandleSignOut from '../hooks/useHandleSignOut';

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 15,
    margin: '10px auto',
    width: '80%',
  },
  menuIcon: {
    marginRight: 10,
  },
  view: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 0,
  },
  // menuButton: {
  //   backgroundColor: '#f0f0f0',
  //   borderRadius: 20,
  //   padding: theme.spacing(1.5),
  //   marginVertical: theme.spacing(1),
  //   width: '80%',
  // },
  // menuIcon: {
  //   marginRight: theme.spacing(1),
  // },
  menuText: {
    fontSize: 18,
  },
}));

const HomeScreen = () => {
  const classes = useStyles(theme);

  const handleButtonClick = () => {
    setSelectedOption('Exercise');
  };

  const [selectedOption, setSelectedOption] = useState('');
  const [userState, setUserState, loading] = useFetchUser<UserState>(initialState);
  const { lesson, isLoading: lessonLoading, error: lessonError } = useFetchLessons(userState?.selectedChapter);
  const { exercises, isLoading: exerciseLoading, error: exerciseError } = useFetchExercises();

  const { chapterStats, isChapterStatsLoading } = useFetchChapterStats();
  const { verseStats, isVerseStatsLoading,  } = useFetchVerseStats();
 
  const [currentPage, setCurrentPage] = useState('Lesson');
  const [isModalVisible, setModalVisible] = useState(false);
  const [pingResult, setPingResult] = useState('');

  const selectExercise = () => {
    setSelectedOption(prevOption => prevOption === 'Exercise' ? 'Lesson' : 'Exercise');
  };
  
  useCurrentScreen();
  useHandleSignOut();

  const fetchPingResult = async () => {
    try {
      const response = await fetch(`${process.env.DOMAIN}/ping`);
      const result = await response.text();
      setPingResult(result);
    } catch (error) {
      setPingResult(`Error: ${error}`);
    }
  };

  const showPopup = async () => {
    await fetchPingResult();
    setModalVisible(true);
  };

  if (loading) {
    return (
      <Box className={classes.centeredContainer}>
        <img src={require('../../assets/mayologo.jpg').default} alt="logo" className={classes.logo} />
      </Box>);
  }
  
  let content:any;
  switch (selectedOption) {
    case 'Lesson':
      content = <Lesson
        selectedChapter={userState?.selectedChapter}
        lesson={lesson}
        isLoading={lessonLoading}
        error={lessonError}
      />;
      break;
    case 'Exercise':
      content = <Exercise
        exercises={exercises}
        isLoading={exerciseLoading}
        error={exerciseError}
      />;
      break;
    default:
      content = (
        <Container>
          <Button
            className={classes.menuButton}
            onClick={showPopup}>
            <Typography className={classes.menuText}>Configuration state</Typography>
          </Button>

            {/* <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => setSelectedOption('Lesson')}>
            <FontAwesomeIcon icon={faBook} size={24} style={styles.menuIcon} />
            <Text style={styles.menuText}>Lesson</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => setSelectedOption('Exercise')}>
            <FontAwesomeIcon icon={faGraduationCap} size={24} style={styles.menuIcon} />
            <Text style={styles.menuText}>Exercises</Text>
          </TouchableOpacity> */}

          <Button 
                variant="contained"
                className={classes.menuButton} 
                onClick={handleButtonClick}
          >
            <FontAwesomeIcon icon={faGraduationCap} size={24} className={classes.menuIcon} />
            <span className={classes.menuText}>Exercises</span>
          </Button>

          <ConfigModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            domain={process.env.DOMAIN}
            pingResult={pingResult}
          />
        </Container>
      );
  }

  // Calculate the totals
  const totalGoodAnswers = Array.isArray(userState?.answerStats) ? userState?.answerStats.reduce((acc, stat) => acc + stat.g, 0) : 0;
  const totalWrongAnswers = Array.isArray(userState) ? userState?.answerStats.reduce((acc, stat) => acc + stat.w, 0) : 0;
  
  return (
    <Box className={classes.view}>
      <Header
        userState={userState} 
        setUserState={setUserState}
        loading={loading}
        count={exercises?.length | 0}
        goodCount={totalGoodAnswers}
        wrongCount={totalWrongAnswers}
        onSelectExercise={selectExercise}
      />

      {content}
    </Box>
  );
};

export default HomeScreen;
