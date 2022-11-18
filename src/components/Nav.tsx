import React from "react";
import NavItem from "./NavItem";
import '../style/Nav.scss';



const Nav: React.FC = () => {
    return (
        <nav className="nav flex-column">
            <div className="nav__head flex-row flex-space-between">
                <div className='nav__head__organisation flex-row flex-align-center'>
                    <div className='nav__head__organisation__brand'></div>
                    <h3 className='nav__head__organisation__name'>Acme</h3>
                </div>
                <div className='nav__head__organisation__user'>
                    <img className='nav__head__organisation__user__avatar' src="assets/images/user_avatar.png" alt="organisation logo" />
                </div>
            </div>
            <ul className='nav__list nav__list--main'>
                <li>
                    <NavItem
                        target="#"
                        label="Search"
                        icon="magnifying-glass"
                    />
                </li>
                <li>
                    <NavItem
                        target="#"
                        label="Notifications"
                        icon="bell"
                        notification={3}
                    />
                </li>
                <li>
                    <NavItem
                        target="#"
                        label="Documents"
                        icon="file"
                    />
                </li>
                <li>
                    <NavItem
                        target="#"
                        label="Analytics"
                        icon="chart-bar"
                    />
                </li>
                <li>
                    <NavItem
                        target="#"
                        label="Settings"
                        icon="gear"
                    />
                </li>
            </ul>
            <ul className='nav__list nav__list--second'>
                <li className='nav__list nav__list--second__title noHover'>Boards</li>
                <li>
                    <NavItem
                        target="#"
                        label="Product"
                        icon="lightbulb"
                    />
                </li>
                <li>
                    <NavItem
                        target="#"
                        label="Design"
                        icon="palette"
                    />
                </li>
                <li>
                    <NavItem
                        target="#"
                        label="Engineering"
                        icon="computer"
                    />
                </li>
                <li>
                    <NavItem
                        target="#"
                        label="Marketing"
                        icon="sack-dollar"
                    />
                </li>
            </ul>
        </nav>
    );
}
export default Nav