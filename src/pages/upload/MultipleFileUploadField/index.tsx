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

	return;
	<>
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<p>Drag 'n' Drop some files here, or click to select files</p>
		</div>
		{/* {files.map((fileWrapper) => (
			<SingleFileUploadWithProgress file={fileWrapper.file} />
		))} */}
	</>;
};

export default MultipleFileUploadField;
