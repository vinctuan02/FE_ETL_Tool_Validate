import React from 'react';
import { Slider, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['50', '100', '150', '200', '250', '300'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

function SlidersAndGraphs() {
  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        Slider
      </Typography>
      <Slider defaultValue={30} aria-labelledby="discrete-slider" valueLabelDisplay="auto" step={10} marks min={10} max={110} />
      <Bar data={data} />
    </div>
  );
}

export default SlidersAndGraphs;
