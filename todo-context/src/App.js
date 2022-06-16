import React, { createContext, useContext } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';
import TodosContext, { TodosProvider } from './contexts/todo';

const App = () => {
	return (
		<TodosProvider>
			<TodoTemplate>
				<TodoInsert />
				<TodoList />
			</TodoTemplate>
		</TodosProvider>
	);
};

export default App;
