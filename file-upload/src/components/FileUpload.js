import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const FileUploadBlock = styled.div`
	margin-right: auto;
	margin-left: auto;
	margin-top: 2rem;
	width: 600px;
	height: 500px;
	border: 1px solid #e9e9e9;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	padding: 2rem;

	h1 {
		font-size: 1.5rem;
		color: #595959;
	}
	.img__box {
		width: 500px;
		height: 400px;
		/* border: 1px solid #e9e9e9; */
		margin-bottom: 2rem;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
	input {
		display: none;
	}
	.img__choice {
		font-size: 1rem;
		padding: 10px 20px;
		background-color: #a6a6a6;

		color: #fff;
	}

	button {
		border: none;
		outline: none;
		background-color: tomato;
		color: #fff;
		padding: 10px 20px;
		font-size: 1rem;
		margin-left: 40px;
	}
`;
// commit
const FileUpload = () => {
	// file을 서버에 전송하기 위해 state에 저장
	const [files, setFiles] = useState('');

	const onLoadFile = (e) => {
		const file = e.target.files;
		console.log('file 값 확인 : ', file);
		setFiles(file);
	};

	const handleCLick = (e) => {
		// FormData 객체에 append(key, value) 또는 append(key, value, filename)으로 파일값을 추가해서 전송
		const formdata = new FormData();
		formdata.append('uploadImage', files[0]); // 한 개의 파일을 선택하더라도 event.target.files는 배열 형태

		// head에 content-type을 multipart/form-dat로 명시해 주어야 서버에서 적절하게 파싱할 수 있다.
		const config = {
			Headers: {
				'content-type': 'multipart/form-data',
			},
		};
		axios.post('api', formdata, config);
	};
	useEffect(() => {
		preview();
		return () => preview();
	});

	const preview = () => {
		if (!files) return false;
		const imgEl = document.querySelector('.img__box');
		const reader = new FileReader();
		reader.onload = () =>
			(imgEl.style.backgroundImage = `url(${reader.result})`);
		console.log('reader 확인 : ', reader);
		reader.readAsDataURL(files[0]);
	};

	return (
		<FileUploadBlock>
			<h1>이미지 업로드</h1>
			<div className="img__box"></div>
			<form>
				<input type="file" id="imgae" accept="img/*" onChange={onLoadFile} />
				<label htmlFor="imgae" className="img__choice">
					파일 선택하기
				</label>
				<button onClick={handleCLick}>저장하기</button>
			</form>
		</FileUploadBlock>
	);
};

export default FileUpload;
