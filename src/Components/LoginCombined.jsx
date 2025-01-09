import React from 'react'
import BackgroundPattern from './BackgroundPattern'
import Login from '../Pages/LoginPage'

import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider


function LoginCombined() {
  return (
    <div>
        <BackgroundPattern/>
        
        <SnackbarProvider maxSnack={3}> {/* You can set the number of visible snackbars */}

        <Login/>

        </SnackbarProvider>

      
    </div>
  )
}

export default LoginCombined
