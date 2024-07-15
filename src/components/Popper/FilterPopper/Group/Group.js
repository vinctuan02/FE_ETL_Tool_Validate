import React from 'react'
import TableComponent from '../../../Tables/TableComponent/TableComponent';
import './Group.scss'

const Group = () => {
    const data = [
        { value: 'A', count: 5 },
        { value: 'B', count: 8 },
        { value: 'C', count: 3 },
        // ...Thêm các đối tượng khác tương ứng với dữ liệu của bạn
    ];

    return (
        <div className='container-group'>
            <div>
                <label>Filed: </label>
                <input className='input' />
            </div>
            <TableComponent
                data={data}
                hasBorder={true}
            />
        </div>
    )
}

export default Group
