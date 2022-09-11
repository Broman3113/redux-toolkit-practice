import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Nav.module.scss';

const Nav = () => {
	return (
		<nav className={classes.Nav}>
			<NavLink
				className={({ isActive }) => (isActive ? classes.active : null)}
				to='/'
			>
				Home
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? classes.active : null)}
				to='/redux'
			>
				Classic Redux
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? classes.active : null)}
				to='/reduxToolkit'
			>
				Redux ToolKit
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? classes.active : null)}
				to='/RTKquery'
			>
				RTKquery
			</NavLink>
		</nav>
	);
};

export default Nav;
