import { Grid, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FileHeader from '../FileHeader';
import { uploadFile } from '../services/uploadFile';

interface ISingleFileUploadWithProgressProps {
	file: File;
	onDelete: (file: File) => void;
	onUpload: (file: File, url: string) => void;
}

const SingleFileUploadWithProgress = ({
	file,
	onDelete,
	onUpload,
}: ISingleFileUploadWithProgressProps) => {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		const upload = async () => {
			const url = await uploadFile(file, setProgress);
			onUpload(file, url);
		};
		upload();
	}, []);

	return (
		<Grid item>
			<FileHeader file={file} onDelete={onDelete} />
			<LinearProgress variant='determinate' value={progress} />
		</Grid>
	);
};

export default SingleFileUploadWithProgress;
