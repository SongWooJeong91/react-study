import React, { createContext, useState } from 'react';

const TodosContext = createContext({
	state: [
		{ id: 1, text: '강아지 산책하기', checked: true },
		{ id: 2, text: 'Context API 공부하기', checked: false },
	],
	actions: { setTodos: () => {} },
});

const TodosProvider = ({ children }) => {
	const [todos, setTodos] = useState([
		{ id: 1, text: '강아지 산책하기', checked: true },
		{ id: 2, text: 'Context API 공부하기', checked: false },
	]);
	const value = {
		state: todos,
		actions: { setTodos },
	};
	return (
		<TodosContext.Provider value={value}>{children}</TodosContext.Provider>
	);
};

const { Consumer: TodosConsumer } = TodosContext;

export { TodosProvider, TodosConsumer };

export default TodosContext;
