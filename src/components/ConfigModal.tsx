import ReusableModal from './ReusableModal';
import { Box, Typography, Button } from '@mui/material';

const ConfigModal = ({ isVisible, onClose, domain, pingResult }) => {
  return (
    <ReusableModal open={isVisible} handleClose={onClose}>
      <Box sx={styles.centeredView}>
        <Box sx={styles.modalView}>
          <Typography sx={styles.modalText}>Config Domain:</Typography>
          <Typography sx={styles.modalText}>{domain}</Typography>
          <Typography sx={styles.modalText}>Ping Result:</Typography>
          <Typography sx={styles.modalText}>{pingResult}</Typography>
          <Button 
            sx={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onClick={onClose}>
            <Typography sx={styles.textStyle}>Close</Typography>
          </Button>
        </Box>
      </Box>
    </ReusableModal>
  );
};

const styles = {
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Adjust based on your modal content
  },
  modalView: {
    m: '20px', // shorthand for margin
    backgroundColor: 'white',
    borderRadius: '20px',
    p: '35px', // shorthand for padding
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
    textAlign: 'center',
  },
  modalText: {
    mb: '15px', // shorthand for marginBottom
  },
  openButton: {
    mt: '15px', // shorthand for marginTop
    borderRadius: '20px',
    p: '10px 20px', // shorthand for padding
    color: 'white',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
  }
};

export default ConfigModal;
