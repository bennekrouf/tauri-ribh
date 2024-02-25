import { useEffect } from 'react';
import { Logger } from 'mayo-logger';
import { useNavigate } from 'react-router-dom';

const useHandleSignOut = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const onSignedOut = async () => {
      Logger.info('User signed out. Navigating to SignIn.', null, { tag: 'useHandleSignOut' });
      navigate('SignIn');
    };


    return () => {
      Logger.info('Cleanup: Removing signedOut event listener.', null, { tag: 'useHandleSignOut' });
    };
  }, []);
};

export default useHandleSignOut;
