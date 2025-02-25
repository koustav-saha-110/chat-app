import React from 'react';
import { MessageCircle, Search } from 'lucide-react';
import { BiHome, BiUser } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {

    // Globals
    const classes = 'w-5 h-5';
    const items = [
        {
            name: 'Home',
            icon: <BiHome className={classes} />,
            path: '/'
        },
        {
            name: 'Search',
            icon: <Search className={classes} />,
            path: '/search'
        },
        {
            name: 'Messages',
            icon: <MessageCircle className={classes} />,
            path: '/messages'
        },
        {
            name: 'Profile',
            icon: <BiUser className={classes} />,
            path: '/profile'
        }
    ];

    return (
        <React.Fragment>
            <nav className='h-[9%] w-full flex items-center justify-around border-t'>
                {
                    items.map((d, index) => (
                        <NavLink key={index} to={d.path} className={(e) => e.isActive ? 'text-blue-500 text-xs flex flex-col items-center' : 'text-xs flex flex-col items-center'}>
                            {d.icon}
                            {d.name}
                        </NavLink>
                    ))
                }
            </nav>
        </React.Fragment>
    );
}

export default NavMenu;
