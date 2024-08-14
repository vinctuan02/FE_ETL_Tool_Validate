import React from 'react'
import './HeaderComponent.scss'
import { Button } from '@mui/material'
import { GridSearchIcon } from '@mui/x-data-grid'

const Header = () => {
    return (
        <div className='container-header-component'>
            <div className='header-left'>
                <Button className='button-custom'>Notes <i className='bx bxs-chevron-down'></i></Button>
                <Button className='button-custom'>QUERY SQL <i className='bx bxs-chevron-down'></i></Button>
            </div>
            <div className='header-right'>
                <div className='search-container'>
                    <GridSearchIcon className='search-icon' />
                    <input className='search' type="text" placeholder="Search..." />
                </div>
                <div style={{ display: "flex", alignItems: 'center' }}>
                    {/* <div>
                    <Button>Option <i className='bx bxs-chevron-down'></i></Button>
                </div>
                <div>
                    <Button>Option <i className='bx bxs-chevron-down'></i></Button>
                </div>
                <div>
                    <Button>Option <i className='bx bxs-chevron-down'></i></Button>
                </div> */}
                    {/* <div>
                    <Button>Option <i className='bx bxs-chevron-down'></i></Button>
                </div> */}
                    <div className='container-header-icon'>
                        <i className='bx bx-bell'></i>
                        <i className='bx bx-user-circle'></i>
                        <i className="bx bx-menu"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
