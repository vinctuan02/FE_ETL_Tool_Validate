import React from 'react'
import './TableData.scss'

const TableData = (props) => {

    // const { data } = props

    // if (!data || !data.length) {
    //     return (<div>Dữ liệu không hợp lệ</div>);
    // }

    const data = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    ];

    const keys = Object.keys(data[0])

    return (
        <div className='container-table-data'>
            <table className='table-data'>
                <thead>
                    <tr>
                        {
                            keys.map((key, index) => {
                                return <th key={key + index}>{key}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, index) => {
                            return (
                                <tr key={row + index}>
                                    {
                                        keys.map((key, index) => {
                                            return (
                                                <td key={key + index}>{row[key]}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableData
