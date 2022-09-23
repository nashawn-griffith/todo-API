import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import TodoForm from './TodoForm';

const List = () => {
	const [todoData, setTodoData] = useState([]);
	const BASE_URL = `http://localhost:5001`;

	//fetch data for component
	const getTodos = async () => {
		try {
			const result = await axios.get(`${BASE_URL}/api/lists`);
			const Items = result.data.body;
			setTodoData(Items);
		} catch (err) {
			console.log('Something went wrong fetching data from backend');
			console.log(err.response?.data || err.message);
		}
	};
	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			<TodoForm />
			<h1>Todo Items</h1>
			<ul>
				{todoData.length > 0 ? (
					todoData.map(item => <ListItem key={item._id} data={{title: item.title, status: item.status}} />)
				) : (
					<p>no Items found</p>
				)}
			</ul>
		</div>
	);
};

export default List;
