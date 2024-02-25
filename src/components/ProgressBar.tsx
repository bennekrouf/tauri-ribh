import React from 'react';
import { Box } from '@mui/material';

interface ProgressBarProps {
    totalProgress: number; // Assume this is a fraction (0 to 1)
    goodProgress: number; // Also a fraction of the totalProgress
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalProgress, goodProgress }) => {
    const wrongProgress = totalProgress - goodProgress;

    return (
        <Box sx={{
            height: '20px',
            width: '100%',
            borderWidth: '1px',
            borderColor: '#000',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
        }}>
            {/* Good Progress */}
            <Box sx={{
                flex: goodProgress,
                backgroundColor: 'green',
            }} />
            {/* Wrong Progress */}
            <Box sx={{
                flex: wrongProgress,
                backgroundColor: 'red',
            }} />
            {/* Remaining Progress */}
            <Box sx={{
                flex: 1 - totalProgress,
                backgroundColor: 'transparent',
            }} />
        </Box>
    );
};

export default ProgressBar;
