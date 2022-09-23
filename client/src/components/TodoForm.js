import React, {useState} from 'react';
import axios from 'axios';

const TodoForm = () => {
	const BASE_URL = `http://localhost:5001`;
	const [title, setTitle] = useState('');

	const handleOnChange = e => {
		setTitle(e.currentTarget.value);
	};

	const submitData = async () => {
		try {
			const result = await axios.post(
				`${BASE_URL}/api/add`,
				{
					data: title,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			console.log(result.data);

			console.log('submit successful');
		} catch (err) {
			console.log('failed to submit');
			console.error(err.response.data || err.message);
		}
	};

	const onSubmit = async e => {
		e.preventDefault();
		await submitData();
		setTitle('');
	};
	return (
		<form onSubmit={onSubmit}>
			<label htmlFor='title'>Title: </label> <br />
			<input type='text' id='title' value={title} onChange={handleOnChange} name='title' />
			<button type='submit'>Click Me</button>
		</form>
	);
};

export default TodoForm;
