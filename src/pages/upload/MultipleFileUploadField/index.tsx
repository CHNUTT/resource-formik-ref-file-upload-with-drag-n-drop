import { Grid } from '@material-ui/core';
import { useField } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import SingleFileUploadWithProgress from '../SingleFileUploadWithProgress';

export interface UploadableFile {
	file: File;
	errors: FileError[];
	url?: string;
}

const MultipleFileUploadField = ({ name }: { name: string }) => {
	const [_, __, helpers] = useField(name);

	const [files, setFiles] = useState<UploadableFile[]>([]);

	const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
		const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
		setFiles((cur) => [...cur, ...mappedAcc, ...rejFiles]);
	}, []);

	useEffect(() => {
		helpers.setValue(files);
		helpers.setTouched(true);
	}, [files]);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const onDelete = (file: File) => {
		setFiles((curr) => curr.filter((fw) => fw.file !== file));
	};

	const onUpload = (file: File, url: string) => {
		setFiles((curr) =>
			curr.map((fw) => {
				if (fw.file === file) {
					return { ...fw, url };
				}
				return fw;
			})
		);
	};

	return (
		<>
			<Grid item>
				<div {...getRootProps()}>
					<input {...getInputProps()} />
					<p>Drag 'n' Drop some files here, or click to select files</p>
				</div>
			</Grid>

			<pre>{JSON.stringify(files, null, 4)}</pre>

			{files.map((fileWrapper, index) => (
				<SingleFileUploadWithProgress
					key={index}
					file={fileWrapper.file}
					onDelete={onDelete}
					onUpload={onUpload}
				/>
			))}
		</>
	);
};

export default MultipleFileUploadField;
