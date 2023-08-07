import React from 'react'
import { Box, Typography } from '@mui/material'
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
export const Add = () => {
  return (
    <div>
      <Box display="flex" flexDirection={"column"} width="100%" height={"100%"}
      marginTop={10}>
        <Box display={"flex"} margin={"auto"} padding={2}>
        <Typography variant='h4' fontFamily={"dancing scrpit"}>
          Add your Travel Experience
        </Typography>
        <ModeOfTravelIcon/>
        </Box>
      </Box>
    </div>
  )
}
