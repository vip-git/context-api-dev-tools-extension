import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodosContextProvider } from './contexts/TodosContext';

const App = () => {
   const mainStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		alignSelf: 'center',
		height: '100vh',
	};

   const imgStyle: React.CSSProperties = {
	   maxHeight: 200,
   };
	
  return (
		<TodosContextProvider>
			<div id={'main'} style={mainStyle}>
				<img src={require('./logo.svg')} alt={'react-logo'} style={imgStyle} />
				<TodoForm />
				<TodoList />
			</div>
		</TodosContextProvider>
	);
};

export default App;
