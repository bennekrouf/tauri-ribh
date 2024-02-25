import { styled } from '@mui/system';
import { Radio, FormControlLabel } from '@mui/material';
import { green, red } from '@mui/material/colors';

const CustomRadioButton = ({ text, selected, onPress, serviceFailed, serviceValid }) => {
  const isSelectedAndValid = selected && serviceValid;
  const isSelectedAndFailed = selected && serviceFailed;

  // Custom styles
  const CustomFormControlLabel = styled(FormControlLabel)({
    margin: '20px 0',
    borderRadius: '5px',
    padding: '10px',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: isSelectedAndFailed
      ? red[500]
      : isSelectedAndValid
      ? green[500]
      : 'transparent', // Use MUI color system
    '& .MuiTypography-root': { // Apply custom styles for text
      fontFamily: 'ScheherazadeNew-Regular',
      fontSize: '18px',
      marginLeft: '10px', // Adjust spacing between text and radio button
      textAlign: 'right',
    },
  });

  return (
    <CustomFormControlLabel
      control={
        <Radio
          checked={selected}
          onChange={onPress}
          name="custom-radio-button"
          color="default" // You can change this as needed
          style={{ color: selected ? (serviceValid ? green[500] : red[500]) : '#000' }} // Change color based on validation
        />
      }
      label={text}
    />
  );
};

export default CustomRadioButton;
