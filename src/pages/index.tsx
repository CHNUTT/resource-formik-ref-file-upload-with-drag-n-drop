import { Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import MultipleFileUploadField from './upload/MultipleFileUploadField';

export default function Home() {
	return (
		<Card>
			<CardContent>
				<Formik initialValues={{}} onSubmit={() => {}}>
					{({ values, errors }) => (
						<Form>
							<MultipleFileUploadField />
							<pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
						</Form>
					)}
				</Formik>
			</CardContent>
		</Card>
	);
}
