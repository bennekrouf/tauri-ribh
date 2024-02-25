import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Box, CircularProgress } from '@mui/material';
// import { MayoSettingsModal } from 'mayo-settings';
import theme from './theme';
import { useNavigate } from 'react-router-dom';

import { handleLogout } from '../storage/handleLogout';

import LabelsSelector from '../modals/SourateConfiguration/LabelsSelector';
import SouratesSelector from '../modals/SourateSelector/SouratesSelector';
import SourateBox from './SourateBox';
import labels from '../modals/SourateConfiguration/labels.json';
import { useChapters } from '../hooks/useFetchSourates';
import { onSourateSelect } from '../utils/onSourateSelect';
import { CurrentScreenContext } from '../hooks/CurrentScreenContext';
import { RootStackParamList } from '../models/RootStackParamList';

import { useCurrentIndexFromStorage } from '../hooks/useCurrentIndexFromStorage';
import { useInitialSettings } from '../hooks/useInitialSettings';
import { useSelectedChapterFromStorage } from '../hooks/useSelectedSourateFromStorage';
import { HeaderProps } from '../models/HeaderProps';
import { useVerifiedUser } from '../hooks/useVerifiedUser';
import { writeToStore } from '../hooks/writeToStore';

const souratesModal = 'souratesModal', settingsModal = 'settingsModal';

const Header: React.FC<HeaderProps> = ({ 
  userState, setUserState, loading, count, goodCount, wrongCount, onSelectExercise,
}) => {
  const classes = useStyles();

  const { currentScreen } = useContext(CurrentScreenContext);
  const user = useVerifiedUser();
  
  const isExerciseScreen = currentScreen === 'Exercise';
  const isLessonScreen = currentScreen === 'Lesson';
  const isHomeScreen = currentScreen === 'Home';

  const displaySelectedChapter = !isHomeScreen && !isExerciseScreen && isLessonScreen;
  const displayProgress = !isHomeScreen && !isExerciseScreen && !isLessonScreen;
  
  const { openModal, closeModal } = useMayoSettings();
  const {sourates, triggerChapterFetch, isSourateLoading} = useChapters();
  const selectedChapter = useSelectedChapterFromStorage();
  const [currentPage, setCurrentPage] = useState('Lesson');
  const selectedSourates = useInitialSettings();

  const handleLabelPress = async (sourate: {no: number | undefined}) => {
    closeModal(souratesModal);
    if (sourate.no) {
      setUserState({...userState, selectedChapter: sourate.no});
      try {
        await writeToStore('selectedChapter', sourate.no.toString());
      } catch (error) {
        console.log('Error saving selectedChapter:', error);
      }
    }
  };
  
  useCurrentIndexFromStorage();

  const handleTogglePage = () => {
    if (currentScreen === 'Exercise') {
      setCurrentPage('Lesson');
      onTogglePage('Lesson');
    } else {
      setCurrentPage('Exercise');
      onTogglePage('Exercise');
    }
  };

  const onTogglePage = (page:string) => {
    const navigate = useNavigate();
    if (page === 'Exercise') {
      navigate('/Lesson');
    } else {
      navigate('/Exercise');
    }
  };
  
  if (loading) {
    return (
      <Box className={classes.centeredContainer}>
        <CircularProgress /> {/* Or any loading indicator component */}
      </Box>
    );
  }


  const answeredCount = goodCount + wrongCount;
  const totalProgress = count > 0 ? (answeredCount / count) : 0;
  const goodFlex = totalProgress > 0 ? (goodCount / answeredCount) : 0;
  const wrongFlex = totalProgress > 0 ? (wrongCount / answeredCount) : 0;


  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className={classes.headerContainer}>
        {/* Toggle button */}
        <IconButton
          onClick={onSelectExercise}
          className={classes.roundedButton}
        >
         <FontAwesomeIcon
          icon={faBook}
          size="lg"  // Or any other valid size: "xs", "sm", "lg", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x", or undefined
          className={classes.iconStyle}
        />
        </IconButton>

        {/* Selected chapter box */}
        {/* Display counts */}
        {/* Progress bar */}

        {/* Settings button */}
        <IconButton
          onClick={() => openModal(settingsModal)}
          className={classes.settingsIcon}
        >
          <FontAwesomeIcon icon={faCog} size="lg" />
        </IconButton>
      </div>
      <div className={classes.headerSeparator} />

      {/* Settings modal */}
      {/* Select Sourates modal */}
    </div>
  );
};

//   return (
//     <View style={{ backgroundColor: 'white' }}>
//       <View style={styles.headerContainer}>
//         {/* <View style={styles.placeholderBox}></View> */}

//         <TouchableOpacity 
//           onPress={onSelectExercise}
//           style={[styles.toggleButton, styles.roundedButton]}
//         >
//           <FontAwesomeIcon 
//             icon={isExerciseScreen ?  faGraduationCap:faBook} 
//             size={20} 
//             style={styles.iconStyle} 
//           />
//         </TouchableOpacity>

//         {displaySelectedChapter && (
//           <TouchableOpacity onPress={() => openModal(souratesModal)}>
//             <SourateBox chapterNo={userState.selectedChapter}/>
//           </TouchableOpacity>
//         )}

//         {/* Header Box for the counts
//           <View style={styles.headerBox}>
//             <Text style={styles.headerText}>G{goodCount} W{wrongCount} T{count}</Text>
//           </View> 
//         */}

//         {/* {displayProgress && (
//           <View style={styles.progressBarContainer}>
//            <ProgressBar totalProgress={totalProgress} goodProgress={goodCount} />
//           </View>
//         )} */}

//         {/* TouchableOpacity for the settings button */}
//         <TouchableOpacity onPress={() => openModal(settingsModal)}>
//           <FontAwesomeIcon icon={faCog} size={24} style={[styles.settingsIcon, styles.roundedButton]} />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.headerSeparator} />

//       {/* MayoSettingsModal for Settings */}
//       <MayoSettingsModal
//         id={settingsModal}
//         onClose={() => closeModal(settingsModal)}
//         onLogout={handleLogout}
//         config={{
//           headerTitle: 'Settings',
//           logoutButtonText: 'Logout',
//           showFooter: true,
//           // displayName: user.displayName,
//           // photoURL: user.photoURL
//         }}>
//         <LabelsSelector
//           labels={labels}
//           selectedSourates={userState?.ranges}
//           onSourateSelect={onSourateSelect}
//           userState={userState}
//           setUserState={setUserState}
//           triggerChapterFetch={triggerChapterFetch}
//         />
//       </MayoSettingsModal>

//       {/* MayoSettingsModal for Selecting Sourates */}
//       <MayoSettingsModal
//         id={souratesModal}
//         onClose={() => closeModal(souratesModal)}
//         config={{
//           headerTitle: 'Select Sourate',
//         }}>
//         <SouratesSelector handleLabelPress={handleLabelPress} sourates={sourates} />
//       </MayoSettingsModal>
//     </View>
//   );
// };

export default Header;

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Adjust as needed
  },
  logo: {
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    borderRadius: 5, // Adjust as needed
  },
  roundedButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
  },
  iconStyle: {
    marginRight: theme.spacing(1),
  },
  progressBarContainer: {
    height: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  settingsIcon: {
    color: '#000',
    padding: theme.spacing(2),
  },
  // centeredContainer: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#FFF',
  // },
  headerText: {
    fontWeight: 'bold',
  },
  placeholderBox: {
    flex: 0.2,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
  },
  headerSeparator: {
    height: 1,
    backgroundColor: 'grey',
    boxShadow: theme.shadows[5],
  },
  toggleButton: {
    padding: theme.spacing(1),
  },
}));
