import React from 'react'
import './HeaderComponent.scss'

const Header = () => {
    return (
        <div className='container-header-component'>
            <input className='search' type="text" placeholder="Search..." />
            <div className='container-header-icon'>
                <i className="fa-solid fa-circle-half-stroke"></i>
                <i className="fa-regular fa-circle-user"></i>
                <i className="fa-solid fa-bars"></i>
            </div>
        </div>
    )
}

export default Header
