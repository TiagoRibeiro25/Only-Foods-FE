import { useState } from 'react';
import AddImages from '../../components/AddImages';
import Input from '../../components/Input';
import Reveal from '../../components/Reveal';
import Textarea from '../../components/Textarea';
import { Base64Img } from '../../types/types';

const AddRecipe: React.FC = () => {
	const [images, setImages] = useState<Base64Img[]>([]);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	return (
		<div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
			<Reveal width="100%" animation="slide-right" delay={0.05}>
				<h1 className="w-full mt-3 text-3xl font-bellefair">Create a New Recipe</h1>
			</Reveal>

			<form className="w-full my-10">
				<Reveal width="100%" animation="slide-right" delay={0.2}>
					<h2 className="mb-3 text-2xl font-bellefair">Images</h2>
				</Reveal>
				<AddImages images={images} setImages={setImages} />

				<Reveal width="100%" animation="slide-bottom" delay={0.2}>
					<Input
						className="mt-12"
						type="text"
						id="title"
						name="title"
						value={title}
						onChange={e => setTitle(e)}
						placeholder="Recipe Title"
						autoComplete="New Recipe Title"
						required
					/>
				</Reveal>

				<Reveal width="100%" animation="slide-right" delay={0.2}>
					<h2 className="mt-12 mb-3 text-2xl font-bellefair">Description</h2>
				</Reveal>
				<Reveal width="100%" animation="slide-bottom" delay={0.2}>
					<Textarea
						className="p-3 text-sm border-gray-300 rounded-md focus:border-gray-300"
						name="description"
						id="description"
						placeholder="Enter a description for your recipe (optional)"
						autoComplete="New Recipe Description"
						resizable
						onChange={e => setDescription(e)}
					>
						{description}
					</Textarea>
				</Reveal>
			</form>
		</div>
	);
};

export default AddRecipe;
