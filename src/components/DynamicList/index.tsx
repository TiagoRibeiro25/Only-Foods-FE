import React from 'react';
import Input from '../Input';
import Reveal from '../Reveal';

export interface Item {
	id: string;
	value: string;
}

interface DynamicListProps {
	type: string;
	list: Item[];
	updateList: (list: Item[]) => void;
}

const DynamicList: React.FC<DynamicListProps> = ({ type, list, updateList }) => {
	const handleItemChange = (id: string, newValue: string) => {
		// Update the list with the new value
		const newList = list.map(listItem => {
			return listItem.id === id ? { id: listItem.id, value: newValue } : listItem;
		});

		// Check if there are any empty items in the list and remove them
		const updatedList = newList.filter(item => item.value.trim() !== '');

		// If the last item in the list is not empty, add a new empty item
		if (updatedList[updatedList.length - 1]?.value.trim() !== '') {
			updatedList.push({
				id: (parseInt(updatedList[updatedList.length - 1]?.id || '0') + 1).toString(),
				value: '',
			});
		}

		updateList(updatedList);
	};

	return (
		<ul className="mt-3 space-y-3 text-gray-500 list-disc list-inside">
			{list.map(item => (
				<Reveal key={item.id} width="100%" animation="slide-right" delay={0.2}>
					<Input
						id={`dynamic-list-item-${type}-${item.id}`}
						type="text"
						className="mt-2"
						name={type}
						placeholder={type + ' ' + (list.indexOf(item) + 1)}
						value={item.value}
						onChange={(newValue: string) => handleItemChange(item.id, newValue)}
					/>
				</Reveal>
			))}
		</ul>
	);
};

export default DynamicList;
