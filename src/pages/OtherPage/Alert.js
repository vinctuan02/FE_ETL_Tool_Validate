import React from 'react';
import { Alert } from '@mui/material';

function Alerts() {
  return (
    <div>
      <Alert severity="info">First need select your problem.</Alert>
      <Alert severity="error">Your order isn't completed.</Alert>
      <Alert severity="success">Your order completed.</Alert>
    </div>
  );
}

export default Alerts;
