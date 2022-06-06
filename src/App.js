import React, { useCallback, useRef, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
	const [todos, setTodos] = useState([
		{
			id: 1,
			text: '리액트의 기초 알아보기',
			checked: true,
		},
		{
			id: 2,
			text: '컴포넌트 스타일링 해보기',
			checked: true,
		},
		{
			id: 3,
			text: '일정 관리 앱 만들어 보기',
			checked: false,
		},
	]);
	// useRef를 사용하는 이유?
	// => id 값은 렌더링되는 정보가 아니기 떄문이다.
	// => id 값은 화면에 보이지도 않고, 이 값이 바뀐다고 해서 컴포넌트가
	//    리렌더링 될 필요도 없다. 단순히 새로운 항목을 만들 때 참조되는 값이기 때문이다.
	const nextId = useRef(4);

	const onInsert = useCallback(
		(text) => {
			const todo = {
				id: nextId,
				text,
				checked: false,
			};
			setTodos(todos.concat(todo));
			nextId.current += 1;
		},
		[todos]
	);

	const onRemove = useCallback(
		(id) => {
			setTodos(todos.filter((todo) => todo.id !== id));
		},
		[todos]
	);

	const onToggle = useCallback(
		(id) => {
			setTodos(
				todos.map((todo) =>
					// 특정 id를 가지고 있는 객체의 checked 값을 반전
					todo.id === id ? { ...todo, checked: !todo.checked } : todo
				)
			);
		},
		[todos]
	);
	return (
		<TodoTemplate>
			<TodoInsert onInsert={onInsert} />
			<TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
		</TodoTemplate>
	);
};

export default App;
