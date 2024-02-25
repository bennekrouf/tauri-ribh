import { useEffect } from 'react';
import { useVerifiedUser } from '../hooks/useVerifiedUser';

import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  centeredContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: '100vh', // Ensure the container takes the full viewport height
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
});

// import { signInFirebase } from 'mayo-firestore-write';
// import { UserContext, UserContextType } from 'mayo-firebase-auth';

// import { handleLogout } from '../storage/handleLogout';
// import firebaseConfig from '../../fireBaseConfig.json';
const navigate = useNavigate();
const classes = useStyles();

const InitialScreen = () => {
  const user = useVerifiedUser()
  
  useEffect(() => {
    // Navigate based on user state
    if (user) {
      navigate('/home');
    } else {
      navigate('/signin');
    }
  }, [user, history]);

  return (
    <div className={classes.centeredContainer}>
      <img src={require('../../assets/mayologo.jpg').default} className={classes.logo} alt="Mayo Logo" />
    </div>
  );
};

export default InitialScreen;
