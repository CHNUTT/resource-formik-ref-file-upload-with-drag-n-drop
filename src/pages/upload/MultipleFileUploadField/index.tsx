import { Grid } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import SingleFileUploadWithProgress from '../SingleFileUploadWithProgress';

export interface UploadableFile {
	file: File;
	errors: FileError[];
}

const MultipleFileUploadField = () => {
	const [files, setFiles] = useState<UploadableFile[]>([]);

	const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
		const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
		setFiles((cur) => [...cur, ...mappedAcc, ...rejFiles]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const onDelete = (file: File) => {
		setFiles((curr) => curr.filter((fw) => fw.file !== file));
	};

	return (
		<>
			<Grid item>
				<div {...getRootProps()}>
					<input {...getInputProps()} />
					<p>Drag 'n' Drop some files here, or click to select files</p>
				</div>
			</Grid>
			{files.map((fileWrapper, index) => (
				<SingleFileUploadWithProgress
					key={index}
					file={fileWrapper.file}
					onDelete={onDelete}
				/>
			))}
		</>
	);
};

export default MultipleFileUploadField;
