import React from "react";
import '../style/NavItem.scss';
import 'font-awesome/css/font-awesome.min.css';



type NavItemProps = {
    target: string;
    label: string;
    icon: string;
    notification?: number;
}

const NavItem: React.FC<NavItemProps> = (props) => {

    const { target, label, icon, notification } = props;

    return (
        <div className='navItem flex-row flex-align-center' data-target={target}>
            <i className={`navItem__icon fa-solid fa-${icon} `}></i>
            <p className='navItem__label'>{label}</p>
            {notification && <div className='navItem__notification'>{notification}</div>}
        </div>
    );
}
export default NavItem