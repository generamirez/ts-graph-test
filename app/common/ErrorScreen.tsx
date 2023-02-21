import { Alert, Grid } from '@mui/material'
import React from 'react'

function ErrorScreen() {
    return (
        <Grid container justifyContent='center'>
           <Alert severity="error">Something went wrong</Alert>
        </Grid>
    )
}

export default ErrorScreen
