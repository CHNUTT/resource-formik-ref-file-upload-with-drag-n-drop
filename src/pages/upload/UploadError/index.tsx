import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { LinearProgress, Typography } from '@material-ui/core';
import { FileError } from 'react-dropzone';
import FileHeader from '../FileHeader';

export interface UploadErrorProps {
	file: File;
	onDelete: (file: File) => void;
	errors: FileError[];
}

const ErrorLinearProgress = withStyles((theme) =>
	createStyles({
		bar: {
			backgroundColor: theme.palette.error.main,
		},
	})
)(LinearProgress);

const UploadError = ({ file, onDelete, errors }: UploadErrorProps) => {
	return (
		<>
			<FileHeader file={file} onDelete={onDelete} />
			<ErrorLinearProgress variant='determinate' value={100} />
			{errors.map((error, idx) => (
				<Typography key={idx} color='error'>
					{error.message}
				</Typography>
			))}
		</>
	);
};

export default UploadError;
