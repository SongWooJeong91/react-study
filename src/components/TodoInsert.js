import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
	const [value, setValue] = useState('');
	const onChange = useCallback((e) => {
		setValue(e.target.value);
	}, []);
	const onSubmit = useCallback(
		(e) => {
			onInsert(value);
			setValue('');
			e.preventDefault();
		},
		[onInsert, value]
	);
	return (
		// form과 onSubmit 이벤트를 사용한 이유?
		// => onSubmit 이벤트의 경우 input에서 Enter를 눌렀을 때도 발생한다.
		// => 반면 버튼에 onClick을 사용했다면 input에서 onKeyPress 이벤트를 통해
		//    Enter를 감지하는 로직을 따로 작성해야 한다.
		<form className="TodoInsert" onSubmit={onSubmit}>
			<input
				placeholder="할 일을 입력하세요"
				value={value}
				onChange={onChange}
			/>
			<button type="submit">
				<MdAdd />
			</button>
		</form>
	);
};

export default TodoInsert;
