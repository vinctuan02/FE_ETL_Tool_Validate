import React, { useState } from 'react';

const CheckboxList = () => {
    const [checkedItems, setCheckedItems] = useState({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems({ ...checkedItems, [name]: checked });
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    name="item1"
                    checked={checkedItems.item1}
                    onChange={handleCheckboxChange}
                />
                Table
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    name="item2"
                    checked={checkedItems.item2}
                    onChange={handleCheckboxChange}
                />
                Table
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    name="item3"
                    checked={checkedItems.item3}
                    onChange={handleCheckboxChange}
                />
                Table
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    name="item4"
                    checked={checkedItems.item4}
                    onChange={handleCheckboxChange}
                />
                Table
            </label>
        </div>
    );
};

export default CheckboxList;
