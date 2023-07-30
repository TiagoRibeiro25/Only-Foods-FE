import { useState } from 'react';
import Reveal from '../../components/Reveal';
import Select from '../../components/Select';
import NewThoughtForm from './components/NewThoughtForm';

type Filter = 'recent' | 'popular' | 'following';

const options = [
	{ text: 'Recent', value: 'recent' },
	{ text: 'Most Popular', value: 'popular' },
	{ text: 'Following', value: 'following' },
];

const Feed = () => {
	const [filter, setFilter] = useState<Filter>('recent');

	return (
		<div className="flex flex-col items-center max-w-3xl mx-auto mt-28">
			<Reveal width="100%" animation="slide-top" delay={0.05}>
				<NewThoughtForm onSubmit={() => console.log('New Thought Submitted!')} />
			</Reveal>

			{/* Filter Thoughts */}
			<Reveal width="100%" animation="slide-right" delay={0.05}>
				<div className="flex justify-end w-full mt-6">
					<div className="w-40">
						<Select
							id="filter-thoughts"
							labelText="Filter Thoughts"
							options={options}
							value={filter}
							onChange={e => setFilter(e.target.value as Filter)}
						/>
					</div>
				</div>
			</Reveal>
		</div>
	);
};

export default Feed;
