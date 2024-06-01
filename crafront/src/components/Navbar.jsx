import React from 'react'
import "./Navbar.scss"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box } from '@mui/material';

const Navbar = () => {
  return (
    <div className='NavabarContainer' >
      <Box sx={{ display: 'flex', alignItems: 'center' , width:"100%", justifyContent:"space-between", padding:"0 40px",
      }} >
        <AddRoundedIcon/>
        <AccountCircleRoundedIcon/>
      </Box>
    </div>
  )
}

export default Navbar