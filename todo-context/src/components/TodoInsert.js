import React, { useState } from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import TodosContext from '../contexts/todo';
import { useRef } from 'react';
import { useContext } from 'react';

const TodoInsertBlock = styled.form`
	display: flex;
	background: #495057;
`;

const TodoInput = styled.input`
	border: none;
	outline: none;
	background-color: #495057;
	font-size: 18px;
	line-height: 1.5;
	padding: 6px;
	color: #fff;
	&::placeholder {
		color: #dee2e6;
	}
	flex: 1;
`;

const InsertBtn = styled.button`
	background: none;
	border: none;
	outline: none;
	background-color: #868e96;
	font-size: 20px;
	line-height: 1.5;
	color: #fff;
	display: flex;
	align-items: center;
	padding-left: 12px;
	padding-right: 12px;
	cursor: pointer;
	&:hover {
		background: #adb5bd;
	}
`;

const TodoInsert = () => {
	const { state, actions } = useContext(TodosContext);
	const [value, setValue] = useState('');

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const nextId = useRef(3);

	const onSubmit = (e) => {
		e.preventDefault();
		const todo = {
			id: nextId.current,
			text: value,
			checked: false,
		};
		actions.setTodos(state.concat(todo));
		setValue('');
		nextId.current++;
	};

	return (
		<TodoInsertBlock onSubmit={onSubmit}>
			<TodoInput
				placeholder="할 일을 입력해주세요."
				onChange={onChange}
				value={value}
			/>
			<InsertBtn type="submit">
				<MdAdd />
			</InsertBtn>
		</TodoInsertBlock>
	);
};

export default TodoInsert;
