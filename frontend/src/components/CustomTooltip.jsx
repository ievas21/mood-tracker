// src/components/CustomTooltip.jsx

import React from "react";
import { Tooltip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    maxWidth: 300,
    fontSize: '1rem',
    backgroundColor: 'rgb(207, 223, 212)',
    color: 'black',
  },
});

function CustomToolTip() {
  const longText = `Scores close to 100% indicate high model confidence. Green means the model thinks it's positive, red is negative, orange is neutral or unclear.`;

  return (
    <CustomWidthTooltip title={longText}>
      <Button 
      sx={{ m: 1 }} 
      style = {{fontSize:'1rem', 
                color: 'black', 
                backgroundColor: 'rgba(159, 188, 169, 1)',
                fontFamily: 'Josefin Sans',
                cursor: 'pointer',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                minWidth: '0',
                transition: 'background-color 0.3s ease',
                marginLeft: '0.75rem'
            }}>?
      </Button>
    </CustomWidthTooltip>
  );
}

export default CustomToolTip;