import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';
import ReduxPage from './pages/ReduxPage';
import ReduxToolkitPage from './pages/ReduxToolkitPage';
import RTKqueryPage from './pages/RTKqueryPage';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path='redux' element={<ReduxPage />} />
					<Route path='reduxToolkit' element={<ReduxToolkitPage />} />
					<Route path='RTKquery' element={<RTKqueryPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
