import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
	// react-virtualized를 사용한 렌더링 최적화 - 낭비되는 자원을 아낄 수 있다.
	// => react-virtualized를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는
	//    렌더링하지 않고 크기만 차지하게끔 할 수 있다.
	//    그리고 스크롤 되면 해당 스크롤 위치에서 보여 줘야 할 컴포넌트를 자연스럽게 렌더링 시킨다.
	const rowRenderer = useCallback(
		({ index, key, style }) => {
			const todo = todos[index];
			return (
				<TodoListItem
					todo={todo}
					key={key}
					onRemove={onRemove}
					onToggle={onToggle}
					style={style}
				/>
			);
		},
		[onRemove, onToggle, todos]
	);
	return (
		// <div className="TodoList">
		// 	{todos.map((todo) => (
		// 		<TodoListItem
		// 			todo={todo}
		// 			key={todo.id}
		// 			onRemove={onRemove}
		// 			onToggle={onToggle}
		// 		/>
		// 	))}
		// </div>
		<List
			className="TodoList"
			width={512} // 전체 크기
			height={341} // 전체 높이
			rowCount={todos.length} // 항목 개수
			rowHeight={57} // 항목 높이
			rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
			list={todos} // 배열
			style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
		/>
	);
};

export default React.memo(TodoList);
