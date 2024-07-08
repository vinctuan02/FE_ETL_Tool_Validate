import React from 'react';

const SelectComponent = (props) => {

    const { data } = props

    const options = [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
        { value: '3', label: 'Three' }
    ];

    return (
        <select className="form-select" aria-label="Default select example">
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectComponent;
