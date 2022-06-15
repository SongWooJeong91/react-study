import React, { useCallback, useReducer, useRef, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// 성능 최적화
// 느려지는 원인 분석
// 1. 자신이 전달받은 props가 변경될 때
// 2. 자신의 state가 바뀔 때
// 3. 부모 컴포넌트가 리렌더링될 때
// 4. forceUpdate 함수가 실행될 때

// 랙을 경험할 수 있도록 많은 데이터를 랜더링
function createBulkTodos() {
	const array = [];
	for (let i = 1; i <= 2500; i++) {
		array.push({
			id: i,
			text: `할 일 ${i}`,
			checked: false,
		});
	}
	return array;
}

// useState의 함수형 업데이트 대신, useReducer를 사용해도 onToggle, onRemove가 새로워 지는 문제를 해결할 수 있다.
function todoReducer(todos, action) {
	switch (action.type) {
		case 'INSERT': // 새로추가
			// {type:'INSERT", todo:{id:1, text:'todo', checked:false}}
			return todos.concat(action.todo);
		case 'REMOVE': // 제거
			return todos.filter((todo) => todo.id !== action.id);
		case 'TOGGLE':
			return todos.map((todo) =>
				todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
			);
		default:
			return todos;
	}
}

const App = () => {
	// useState의 기본값에 함수를 넣어주었다.
	// useState(createBulkTodos()) => 리렌더링될 때마다 createBulkTodos 함수가 호출
	// useState(createBulkTodos) => 파라미터를 함수 형태로 넣어주면 컴포넌트가 처음 렌더링 될 때만
	// createBulkTodos 함수가 실행
	// const [todos, setTodos] = useState(createBulkTodos);

	// useReducer를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어줘야 한다.
	// 하지만 두번째에는 undefined를 넣고, 세 번째 파라미터에 초기 상태를 만들어 주는 createBulkTodos를 넣어주면
	// 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수가 호출된다.
	const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

	// useRef를 사용하는 이유?
	// => id 값은 렌더링되는 정보가 아니기 떄문이다.
	// => id 값은 화면에 보이지도 않고, 이 값이 바뀐다고 해서 컴포넌트가
	//    리렌더링 될 필요도 없다. 단순히 새로운 항목을 만들 때 참조되는 값이기 때문이다.
	const nextId = useRef(4);

	const onInsert = useCallback((text) => {
		const todo = {
			id: nextId,
			text,
			checked: false,
		};
		// setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신,
		// 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣을 수 있다.
		// setTodos((todos) => todos.concat(todo));
		// 어떻게 업데이트할지 정의해 주는 업데이트 함수를 넣어주면
		// 두 번째 파라미터로 넣는 배열에 [todos]를 넣지 않아도 된다.

		dispatch({ type: 'INSERT', todo });
		nextId.current += 1;
	}, []);

	const onRemove = useCallback((id) => {
		// setTodos((todos) => todos.filter((todo) => todo.id !== id));
		dispatch({ type: 'REMOVE', id });
	}, []);

	const onToggle = useCallback((id) => {
		// setTodos((todos) =>
		// 	todos.map((todo) =>
		// 		// 특정 id를 가지고 있는 객체의 checked 값을 반전
		// 		todo.id === id ? { ...todo, checked: !todo.checked } : todo
		// 	)
		// );
		dispatch({ type: 'TOGGLE', id });
	}, []);
	return (
		<TodoTemplate>
			<TodoInsert onInsert={onInsert} />
			<TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
		</TodoTemplate>
	);
};

export default App;
