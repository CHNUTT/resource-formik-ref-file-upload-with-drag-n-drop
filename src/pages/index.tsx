import { Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import MultipleFileUploadField from './upload/MultipleFileUploadField';

export default function Home() {
	return (
		<Card>
			<CardContent>
				<Formik initialValues={{ files: [] }} onSubmit={() => {}}>
					{({ values, errors }) => (
						<Form>
							<Grid container spacing={2} direction='column'>
								<MultipleFileUploadField name='files' />
							</Grid>
							<pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
						</Form>
					)}
				</Formik>
			</CardContent>
		</Card>
	);
}
