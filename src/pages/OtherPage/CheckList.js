import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';

const items = [
  'Select your problem',
  'Select your solutions',
  'Tell us about your budget',
  'Purchase your solutions',
  'Complete your order',
];

function Checklist() {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <Checkbox checked={index < 3} />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
}

export default Checklist;
