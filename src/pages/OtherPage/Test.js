import React from 'react';
import CreatableSelect from 'react-select/creatable';

const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' },
    { value: 'yellow', label: 'Yellow' },
];

const CustomSelect = () => (
    <CreatableSelect isClearable options={colourOptions} />
);

export default CustomSelect;