import React, { useEffect, useState } from 'react'
import './FormInputJDBC.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import { createConnection, getCountRecordTables, testConnection } from '../../services/ReportService';
import { toast } from 'react-toastify';
import TableSelect from '../Tables/TableSelect/TableSelect';


const FormInputJDBC = (props) => {

    const { changeSelectSchema, handleSelect } = props

    const [typeDatabase, setTypeDatabase] = useState()
    const [host, setHost] = useState('10.10.11.149')
    const [user, setUser] = useState('root')
    const [password, setPassword] = useState('oracle_4U')
    const [jdbc, setJDBC] = useState()

    const [allNameDB, setAllNameDB] = useState([])
    const [selectedOption, setSelectedOption] = useState('');

    const [nameAndRecordTables, setNameAndRecordTables] = useState([])
    const [nameAndRecordTables_notEmpty, setNameAndRecordTables_notEmpty] = useState([])

    const [isHideEmptyTables, setIsHideEmptyTable] = useState(true)

    const handleOnChangeInput = (event, key) => {
        if (key === 'type_database') {
            setTypeDatabase(event.target.value)
        }
        if (key === 'host') {
            setHost(event.target.value)
        }
        if (key === 'user') {
            setUser(event.target.value)
        }
        if (key === 'password') {
            setPassword(event.target.value)
        }
        if (key === 'jdbc') {
            setJDBC(event.target.value)
        }
    }

    const handleTestConnection = async () => {
        const config = {
            host: host,
            user: user,
            password: password
        }
        const res = await testConnection(config)
        if (res && res.errCode === 0) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }

    const handleFinish = async () => {
        const config = {
            host: host,
            user: user,
            password: password
        }
        const res = await createConnection(config)
        if (res && res.errCode === 0) {
            toast.success(res.message)
            if (res.allNameDB.length > 0) {
                setAllNameDB(res.allNameDB)
            }
        } else {
            toast.error(res.message)
        }
    }

    const handleChangeSelectSchema = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        changeSelectSchema(selectedValue)
    };



    useEffect(() => {
        if (selectedOption) {
            fetchAllNameTable()
        }
    }, [selectedOption])

    const fetchAllNameTable = async () => {
        const res = await getCountRecordTables({ nameDB: selectedOption })
        const result = res.data
        setNameAndRecordTables(result)
        const arrFilter = []
        result.map((item, index) => {
            if (item.table_rows > 0) {
                arrFilter.push(item)
            }
        })

        setNameAndRecordTables_notEmpty(arrFilter)
    }

    const handleHideEmptyTables = () => {
        setIsHideEmptyTable(!isHideEmptyTables)
    }


    return (

        <div className='container-input-jdbc'>
            <div className='input-jdbc'>
                <div className='row r1'>
                    <div className='col-md-6 label-input'>
                        <label>Type Database</label>
                        <input
                            onChange={(event) => handleOnChangeInput(event, 'type_database')}
                            value={typeDatabase}
                            placeholder='MariaDB'
                        ></input>
                    </div>
                    <div className='col-md-6 label-input'>
                        <label>Host</label>
                        <input placeholder='10.10.10.149'
                            onChange={(event) => handleOnChangeInput(event, 'host')}
                            value={host}
                        ></input>
                    </div>
                </div>
                <div className='row r2'>
                    <div className='col-md-6 label-input'>
                        <label>User</label>
                        <input placeholder='User'
                            onChange={(event) => handleOnChangeInput(event, 'user')}
                            value={user}
                        ></input>
                    </div>
                    <div className='col-md-6 label-input'>
                        <label>Password</label>
                        <input placeholder='password'
                            onChange={(event) => handleOnChangeInput(event, 'password')}
                            value={password}
                        ></input>
                    </div>
                </div>
                <div className='row r3'>
                    <div className='col-md-12 label-input'>
                        <label>JDBC</label>
                        <input placeholder='jdbc:mariadb://localhost:3306/'
                            onChange={(event) => handleOnChangeInput(event, 'jdbc')}
                            value={jdbc}
                        ></input>
                    </div>
                </div>
                <div className='row r4'>
                    <div className='col-md-8 left'>
                        <Button
                            // variant='outlined'
                            color='primary'
                            onClick={handleTestConnection}
                        >Test Connection</Button>
                    </div>
                    <div className='col-md-4 right'>
                        <Button>Cancel</Button>
                        <Button
                            variant='contained'
                            color='success'
                            onClick={handleFinish}
                        >Finish</Button>
                    </div>
                </div>
            </div>
            {
                allNameDB && allNameDB.length > 0 &&
                <div className='database'>
                    <div className='row r1'>
                        <div className='label-select'>
                            {/* <label htmlFor="exampleSelect">List Databases</label> */}
                            <select
                                id="exampleSelect"
                                name="options"
                                value={selectedOption}
                                onChange={handleChangeSelectSchema}
                            >
                                <option value="" disabled>Select a database</option>
                                {
                                    allNameDB.map((item, index) => {
                                        return <option key={item + index} value={item.Database}>{item.Database}</option>
                                    })
                                }
                            </select>
                            <div className='hide-empty-table'>
                                <input
                                    type="checkbox"
                                    onChange={handleHideEmptyTables}
                                    checked={isHideEmptyTables}
                                />
                                <label>Hide empty tables</label>
                            </div>
                        </div>
                    </div>
                    <div className='row r2'>
                        {
                            nameAndRecordTables && nameAndRecordTables.length > 0 &&
                            < TableSelect
                                data={
                                    isHideEmptyTables === true ? nameAndRecordTables_notEmpty : nameAndRecordTables
                                }
                                handleSelect={handleSelect}
                            />
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default FormInputJDBC
