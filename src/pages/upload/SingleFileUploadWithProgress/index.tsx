import React, { useEffect, useState } from 'react';

interface ISingleFileUploadWithProgressProps {
	file: File;
}

const uploadFile = (file: File, onProgress: (percentage: number) => void) => {
	const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
	const key = 'docs_upload_example_us_preset';

	return new Promise((res, rej) => {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url);

		xhr.onload = () => {
			const resp = JSON.parse(xhr.responseText);
			res(resp.secure_url);
		};

		xhr.onerror = (evt) => rej(evt);

		xhr.upload.onprogress = (event) => {
			if (event.lengthComputable) {
				const percentage = (event.loaded / event.total) * 100;
				onProgress(Math.round(percentage));
			}
		};

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', key);
		xhr.send(formData);
	});
};

const SingleFileUploadWithProgress = ({
	file,
}: ISingleFileUploadWithProgressProps) => {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		const upload = async () => {
			const url = await uploadFile(file, setProgress);
			console.log('url', url);
		};
		upload();
	}, []);

	return <div>SFU - {progress}</div>;
};

export default SingleFileUploadWithProgress;
