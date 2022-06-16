import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
	margin-right: auto;
	margin-left: auto;
	margin-top: 4rem;
	width: 512px;
	border-radius: 4px;
	overflow: hidden;
`;

const TodoTiltle = styled.div`
	height: 60px;
	line-height: 60px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	background-color: tomato;
`;

const Contents = styled.div`
	background-color: #fff;
`;

const TodoTemplate = ({ children }) => {
	return (
		<TodoTemplateBlock>
			<TodoTiltle>일정 관리</TodoTiltle>
			<Contents>{children}</Contents>
		</TodoTemplateBlock>
	);
};

export default TodoTemplate;
