import React from 'react';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { array, object, string } from 'yup';
import MultipleFileUploadField from './upload/MultipleFileUploadField';

export default function Home() {
	return (
		<Card>
			<CardContent>
				<Formik
					initialValues={{ files: [] }}
					validationSchema={object({
						files: array(object({ url: string().required() })),
					})}
					onSubmit={(values) => {
						console.log('values', values);
						return new Promise((res) => setTimeout(res, 2000));
					}}
				>
					{({ values, errors }) => (
						<Form>
							<Grid container spacing={2} direction='column'>
								<MultipleFileUploadField name='files' />
								<Grid item>
									<Button type='submit'>Submit</Button>
								</Grid>
							</Grid>
							<pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
						</Form>
					)}
				</Formik>
			</CardContent>
		</Card>
	);
}
