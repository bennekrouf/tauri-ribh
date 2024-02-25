import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '20%', // Starts from 20% from the top to take 80% of the height
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: '100%', // Takes full width
  height: '80%', // Takes 80% of the screen height
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto', // Adds scroll if content exceeds modal height
};

const ReusableModal = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default ReusableModal;
