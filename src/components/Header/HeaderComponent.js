import React from 'react'
import './HeaderComponent.scss'

const Header = () => {
    return (
        <div className='container-header-component'>
            <input className='search' type="text" placeholder="Search..." />
            <div className='container-header-icon'>
                <i className='bx bx-adjust'></i>
                <i className='bx bxs-user-circle person-icon'></i>
                <i className="bx bx-cog setting-icon"></i>
            </div>
        </div>
    )
}

export default Header
