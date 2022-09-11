import React from 'react';
import Nav from '../components/Nav/Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<header>
				<Nav />
			</header>
			<Outlet />
		</>
	);
};

export default Layout;
