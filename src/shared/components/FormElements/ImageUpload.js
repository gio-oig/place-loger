import React, { useRef, useState } from 'react';
import Button from './Button';

import './ImageUpload.css';

const ImageUpload = (props) => {
	const inputRef = useRef();
	const [file, setFile] = useState();
	const [isValid, setIsValid] = useState();

	const pickimageHandler = () => {
		inputRef.current.click();
	};

	const pickedHandler = (e) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (e.target.files && e.taget.files.length === 1) {
			pickedFile = e.taget.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
		}
	};

	return (
		<div className="form-control">
			<input
				id={props.id}
				ref={inputRef}
				style={{ display: 'none' }}
				type="file"
				onChange={pickedHandler}
			/>
			<div className={`image-upload ${props.center && 'center'}`}>
				<div className="image-upload__preview">
					<img src="" alt="preview" />
				</div>
				<Button type="button" onClick={pickimageHandler}>
					PICK IMAGE
				</Button>
			</div>
		</div>
	);
};

export default ImageUpload;
