import React from 'react'
import './HeaderComponent.scss'

const Header = () => {
    return (
        <div className='container-header-component'>
            <input className='search' type="text" placeholder="Search..." />
            <div className='container-header-icon'>
                <i className='bx bx-bell'></i>
                <i className='bx bx-user-circle'></i>
                <i className="bx bx-menu"></i>
            </div>
        </div>
    )
}

export default Header
