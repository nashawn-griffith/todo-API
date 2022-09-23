import React from 'react';

const ListItem = ({data: {title, status}}) => {
	return (
		<li>
			<p>{`Title: ${title}`}</p>
			<p>{`Status: ${status}`}</p>
		</li>
	);
};

export default ListItem;
