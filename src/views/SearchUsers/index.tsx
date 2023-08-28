import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import requests from '../../api/requests';
import SearchIcon from '../../assets/icons/search.svg';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import NoItemsFound from '../../components/NoItemsFound';
import Reveal from '../../components/Reveal';
import { IUser } from '../../types/types';
import UserResult from './components/UserResult';

const SearchUsers: React.FC = () => {
	const [searchInput, setSearchInput] = useState<string>('');
	const [users, setUsers] = useState<IUser[]>();
	const [loading, setLoading] = useState<boolean>(false);

	const searchInputRef = useRef<string>('');
	const loadingRef = useRef<boolean>(false);

	const fetchUsers = async (searchInput: string): Promise<void> => {
		try {
			const response = await requests.users.searchUsers({
				keyword: searchInput,
				limit: 10,
				page: 1,
			});

			if (response.data.success && response.data.data) {
				setUsers(response.data.data.users);
			}
		} catch (error) {
			console.log('An error occurred while trying to search for users: ', error);
			setUsers(undefined);
		}
	};

	let debounceTimeout: NodeJS.Timeout;

	const debounce = (callback: () => void, delay: number) => {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(callback, delay);
	};

	const handleInputChange = async (newValue: string): Promise<void> => {
		setSearchInput(newValue);
		searchInputRef.current = newValue;

		if (newValue.trim().length <= 3) {
			setUsers(undefined);
			setLoading(false);
			loadingRef.current = false;
			return;
		}

		if (loadingRef.current) return;
		setLoading(true);
		loadingRef.current = true;

		debounce(() => {
			fetchUsers(newValue).finally(() => {
				setLoading(false);
				loadingRef.current = false;

				// If the value changed while fetching, fetch again
				if (newValue !== searchInputRef.current && newValue.trim().length > 3) {
					handleInputChange(searchInputRef.current);
				}
			});
		}, 1000);
	};

	return (
		<div
			className={classNames(
				'flex flex-col items-center pt-12 pb-20 duration-300 ease-in-out max-w-3xl mx-auto mt-28',
				searchInput.trim().length > 3 ? 'space-y-8' : 'space-y-20 sm:space-y-32',
			)}
		>
			<Reveal width="100%" animation="fade">
				<h1 className="text-3xl text-center font-bellefair">Search for a user</h1>
			</Reveal>

			<Reveal width="100%" animation="slide-bottom" delay={0.05}>
				<div className="flex flex-row items-center py-2">
					<LazyLoadImage
						className="w-5 h-5 mb-3 mr-3"
						src={SearchIcon}
						effect="opacity"
						alt="Search icon"
					/>

					<Input
						type="search"
						id="search"
						name="search"
						placeholder="Search..."
						value={searchInput}
						onChange={handleInputChange}
					/>
				</div>
			</Reveal>

			{loading && <Loading />}

			{users && (
				<div className="flex flex-col w-full space-y-8">
					{users.map(user => (
						<Reveal key={user.id} width="100%" animation="slide-right" delay={0.05}>
							<UserResult user={user} />
						</Reveal>
					))}
				</div>
			)}

			{!loading && !users && searchInput.trim().length > 3 && (
				<NoItemsFound
					warning="No users found for the given keyword."
					message="Try searching for something else."
				/>
			)}
		</div>
	);
};

export default SearchUsers;
