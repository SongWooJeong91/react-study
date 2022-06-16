import React from 'react';
import styled from 'styled-components';
import {
	MdOutlineCheckBoxOutlineBlank,
	MdOutlineCheckBox,
	MdOutlineDoNotDisturbOn,
} from 'react-icons/md';
import { useContext } from 'react';
import TodosContext from '../contexts/todo';

const TodoListItemBlock = styled.div`
	display: flex;
	padding: 10px 4px;
`;

const CheckBox = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	svg {
		font-size: 30px;
	}
	flex: 1;
`;

const CheckBoxText = styled.div`
	margin-left: 4px;
`;

const TodoRemove = styled.button`
	display: flex;
	align-items: center;
	border: none;
	outline: none;
	background: none;
	font-size: 26px;
	color: tomato;
	cursor: pointer;
`;

const TodoListItem = ({ todo }) => {
	const { state, actions } = useContext(TodosContext);
	const { id, text, checked } = todo;

	const onToggle = (id) => {
		actions.setTodos(
			state.map((todo) =>
				todo.id === id ? { ...todo, checked: !todo.checked } : todo
			)
		);
	};

	const onRemove = (id) => {
		actions.setTodos(state.filter((todo) => todo.id !== id));
	};

	return (
		<TodoListItemBlock>
			<CheckBox
				onClick={(e) => {
					e.preventDefault();
					onToggle(id);
				}}
			>
				{checked ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
				<CheckBoxText>{text}</CheckBoxText>
			</CheckBox>
			<TodoRemove
				onClick={(e) => {
					e.preventDefault();
					onRemove(id);
				}}
			>
				<MdOutlineDoNotDisturbOn />
			</TodoRemove>
		</TodoListItemBlock>
	);
};

export default TodoListItem;
