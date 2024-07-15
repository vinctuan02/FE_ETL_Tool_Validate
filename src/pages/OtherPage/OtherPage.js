import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';

// Dữ liệu giả lập danh sách bảng từ db1 và db2
const db1Tables = ['users', 'orders', 'products'];
const db2Tables = ['customers', 'orders', 'inventory'];

const OtherPage = () => {
  const [selectedPairs, setSelectedPairs] = useState([]);

  const handleCheckboxChange = (tableName, isChecked) => {
    if (isChecked) {
      // Nếu bảng đã được chọn, thêm vào danh sách selectedPairs
      setSelectedPairs([...selectedPairs, { db1: tableName, db2: null }]);
    } else {
      // Nếu bảng bị bỏ chọn, loại bỏ khỏi danh sách selectedPairs
      const updatedPairs = selectedPairs.filter(pair => pair.db1 !== tableName);
      setSelectedPairs(updatedPairs);
    }
  };

  const handleSecondCheckboxChange = (tableName, isChecked) => {
    const updatedPairs = selectedPairs.map(pair => {
      if (pair.db1 === tableName) {
        return { ...pair, db2: isChecked ? tableName : null };
      }
      return pair;
    });
    setSelectedPairs(updatedPairs);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6">Select Table Pairs</Typography>
      <Box>
        <Typography variant="subtitle1">Database 1 Tables:</Typography>
        <FormGroup>
          {db1Tables.map((table) => (
            <FormControlLabel
              key={table}
              control={<Checkbox checked={selectedPairs.some(pair => pair.db1 === table)} onChange={(e) => handleCheckboxChange(table, e.target.checked)} />}
              label={table}
            />
          ))}
        </FormGroup>
      </Box>
      <Box>
        <Typography variant="subtitle1">Database 2 Tables:</Typography>
        <FormGroup>
          {db2Tables.map((table) => (
            <FormControlLabel
              key={table}
              control={<Checkbox checked={selectedPairs.some(pair => pair.db2 === table)} onChange={(e) => handleSecondCheckboxChange(table, e.target.checked)} />}
              label={table}
            />
          ))}
        </FormGroup>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Selected Table Pairs:</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {selectedPairs.map((pair, index) => (
            <Typography key={index}>
              {pair.db1} - {pair.db2 || 'Select second table'}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OtherPage;
