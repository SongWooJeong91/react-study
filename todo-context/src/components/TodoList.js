import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import TodosContext from '../contexts/todo';
import TodoListItem from './TodoListItem';

const TodoListBlock = styled.div`
	min-height: 300px;
	max-height: 400px;
	overflow-y: auto;
`;

const TodoList = () => {
	const { state } = useContext(TodosContext);
	return (
		<TodoListBlock>
			{state.map((todo) => (
				<TodoListItem key={todo.id} todo={todo} />
			))}
		</TodoListBlock>
	);
};

export default TodoList;
