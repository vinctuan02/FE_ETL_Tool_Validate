import React, { useContext, useEffect, useState } from 'react';
import './SelectComponent.scss'

const SelectComponent = (props) => {
    const { data, handleChangeSelect } = props

    return (
        <select className="form-select"
            aria-label="Default select example"
            onChange={(event) => handleChangeSelect(event)}
        >
            {data && data.map((item, index) => (
                <option key={index} value={JSON.stringify(item.value)}>
                    {item.label}
                </option>
            ))}
        </select>
    );
};

export default SelectComponent;
