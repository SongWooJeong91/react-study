import React from 'react';
import {
	MdCheckBoxOutlineBlank,
	MdCheckBox,
	MdIndeterminateCheckBox,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
	const { id, text, checked } = todo;
	return (
		<div className="TodoListItem-virtualized" style={style}>
			<div className="TodoListItem">
				<div
					className={cn('checkbox', { checked })}
					onClick={() => {
						onToggle(id);
					}}
				>
					{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
					<div className="text">{text}</div>
				</div>
				<div className="remove" onClick={() => onRemove(id)}>
					<MdIndeterminateCheckBox />
				</div>
			</div>
		</div>
	);
};

// React.memo
// 컴포넌트의 props가 바뀌지 않았다면, 리렌더링 하지 않도록 설정하여
// 함수형 컴포넌트의 리렌더링 성능을 최적화해 줄 수 있다.
// todo, onRemove, onToggle이 바뀌지 않으면 리렌더링 하지 않는다.
export default React.memo(TodoListItem);
