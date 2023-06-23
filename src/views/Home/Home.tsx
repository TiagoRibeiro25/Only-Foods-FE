import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLocation } from 'react-router-dom';
import DiscussionIcon from '../../assets/icons/discussion.svg';
import GroupIcon from '../../assets/icons/group.svg';
import RecipeIcon from '../../assets/icons/recipe.svg';
import ThoughtIcon from '../../assets/icons/thought.svg';
import CustomizeIllustration from '../../assets/imgs/home_customize_picture.png';
import AuthIllustration from '../../assets/imgs/home_picture.png';
import SocialIllustration from '../../assets/imgs/home_social_picture.png';
import TransparencyIllustration from '../../assets/imgs/home_transparency_picture.png';
import CustomizeIllustrationPlaceholder from '../../assets/imgs/placeholders/home_customize_picture_loading.webp';
import AuthIllustrationPlaceholder from '../../assets/imgs/placeholders/home_picture_loading.webp';
import SocialIllustrationPlaceholder from '../../assets/imgs/placeholders/home_social_picture_loading.webp';
import TransparencyIllustrationPlaceholder from '../../assets/imgs/placeholders/home_transparency_picture_loading.webp';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const Home = () => {
	const location = useLocation();

	const renderForm = () => {
		const query = new URLSearchParams(location.search);
		const formType = query.get('form');

		switch (formType) {
			case 'register':
				return <RegisterForm />;
			case 'forgotPassword':
				return <ForgotPasswordForm />;
			default:
				return <LoginForm />;
		}
	};

	return (
		<>
			<h1 className="font-bellefair text-4xl text-center mb-2 mt-36">
				Discover, Connect, and Share the Joy of Food!
			</h1>
			<p className="text-center">
				Unleash your culinary genius, explore new flavors, and inspire others. Join Social
				Eat to share your recipes, discover endless possibilities, and connect with fellow
				food enthusiasts. Let your creativity shine in the kitchen!
			</p>
			<div className="flex flex-col md:mt-10 md:flex-row">
				<div className="w-full md:w-1/2 mb-8 md:mb-0 flex items-center justify-center">
					<LazyLoadImage
						src={AuthIllustration}
						placeholderSrc={AuthIllustrationPlaceholder}
						effect="opacity"
						alt="Home Illustration"
						className="hidden md:block mx-auto"
						width="auto"
						height="auto"
					/>
				</div>
				<div className="w-full md:w-1/2 pl-0 md:pl-10">{renderForm()}</div>
			</div>
			<h2 className="font-bellefair text-4xl text-center mb-2 mt-28">
				Foodie Community. Connection & Culinary Delights
			</h2>
			<p className="text-center">
				Unleash your culinary genius, explore new flavors, and inspire others. Join Social
				Eat to share your recipes, discover endless possibilities, and connect with fellow
				food enthusiasts. Let your creativity shine in the kitchen!
			</p>
			<div className="flex flex-col mt-16 mb-10">
				<div className="flex flex-col-reverse md:flex-row">
					<div className="w-full md:w-1/2 flex flex-col items-center justify-center md:pr-10 md:mt-0 mt-10">
						<h3 className="font-bellefair w-full text-4xl text-start mb-2">
							Integrity &amp; Confidentiality
						</h3>
						<p>
							Unleash your culinary genius, explore new flavors, and inspire others. Join
							Social Eat to share your recipes, discover endless possibilities, and
							connect with fellow food enthusiasts. Let your creativity shine in the
							kitchen!
						</p>
					</div>
					<div className="w-full md:w-1/2 md:mt-0 mt-10 flex items-center justify-center">
						<LazyLoadImage
							src={TransparencyIllustration}
							placeholderSrc={TransparencyIllustrationPlaceholder}
							effect="opacity"
							alt="Home Illustration"
							width="auto"
							height="auto"
						/>
					</div>
				</div>
				<div className="flex flex-col md:flex-row mt-20">
					<div className="w-full md:w-1/2 md:mt-0 mt-10 flex items-center justify-center">
						<LazyLoadImage
							src={SocialIllustration}
							placeholderSrc={SocialIllustrationPlaceholder}
							effect="opacity"
							alt="Home Illustration"
							width="auto"
							height="auto"
						/>
					</div>
					<div className="w-full md:w-1/2 flex flex-col items-center justify-center md:pr-10">
						<h3 className="font-bellefair w-full text-4xl text-start mb-2">
							Explore &amp; Savor
						</h3>
						<p>
							At Social Eat, we're passionate about bringing food enthusiasts together.
							Our platform is designed to create a vibrant community where food lovers can
							connect, share their culinary adventures, and savor the joys of good food.
							From discovering mouthwatering recipes to engaging in lively discussions, we
							offer a space to explore diverse flavors, seek inspiration, and celebrate
							the culinary arts. Join us and embark on a delightful journey of culinary
							discovery with fellow foodies from around the world.
						</p>
					</div>
				</div>
				<div className="flex flex-col-reverse md:flex-row mt-16">
					<div className="w-full md:w-1/2 flex flex-col items-center justify-center md:pr-10 md:mt-0 mt-10">
						<h3 className="font-bellefair w-full text-4xl text-start mb-2">
							Personalize &amp; Connect
						</h3>
						<p>
							At Social Eat, we believe in providing you with a personalized space that
							revolves around your love for food. Say goodbye to generic platforms! Join
							our vibrant community where you can create your own culinary haven.
							Customize your profile, share your favorite recipes, showcase your food
							creations, and connect with fellow food enthusiasts. With Social Eat, it's
							all about you and your unique culinary journey. Embrace the flavors, share
							your passion, and make lasting connections within our foodie community.
						</p>
					</div>
					<div className="w-full md:w-1/2 md:mt-0 mt-10 flex items-center justify-center">
						<LazyLoadImage
							src={CustomizeIllustration}
							placeholderSrc={CustomizeIllustrationPlaceholder}
							effect="opacity"
							alt="Home Illustration"
							width="auto"
							height="auto"
						/>
					</div>
				</div>
			</div>
			<h2 className="font-bellefair text-4xl text-center mb-2 mt-28">
				Discover a World of Culinary Possibilities
			</h2>
			<p className="text-center">
				Embark on a gastronomic adventure with Social Eat. Our platform is packed with a
				range of exciting features designed to enhance your foodie experience.
			</p>
			<div className="flex flex-col mt-16 mb-10">
				<div className="flex md:flex-row flex-col">
					<div className="w-full md:w-1/2 flex flex-col items-center justify-center md:pr-5 md:mt-0 mt-10">
						<div className="h-26 flex items-center justify-center">
							<LazyLoadImage
								src={ThoughtIcon}
								effect="opacity"
								alt="Thought Icon"
								width={100}
								height={100}
							/>
						</div>
						<h3 className="font-bellefair text-3xl text-center mt-6 mb-2">
							Share your current thoughts
						</h3>
						<p className="text-center">
							Share your current food thoughts, cravings, and experiences with our
							food-loving community. From restaurant discoveries to homemade delights, let
							your culinary moments shine.
						</p>
					</div>
					<div className="w-full md:w-1/2 flex flex-col items-center justify-center md:pl-5 md:mt-0 mt-28">
						<div className="h-26 flex items-center justify-center">
							<LazyLoadImage
								src={RecipeIcon}
								effect="opacity"
								alt="Recipe Icon"
								width={75}
								height={75}
							/>
						</div>
						<h3 className="font-bellefair text-3xl text-center mt-6 mb-2">
							Delightful Recipes Unleashed
						</h3>
						<p className="text-center">
							Unleash your culinary creativity by sharing your favorite recipes with the
							Social Eat community. From treasured family secrets to innovative
							experiments, inspire and be inspired by fellow food lovers.
						</p>
					</div>
				</div>
				<div className="flex md:flex-row flex-col mt-16">
					<div className="w-full md:w-1/2 flex flex-col items-center justify-center md:pr-5 md:mt-0 mt-10">
						<div className="h-26 flex items-center justify-center">
							<LazyLoadImage
								src={DiscussionIcon}
								effect="opacity"
								alt="Discussion Icon"
								width={80}
								height={80}
							/>
						</div>
						<h3 className="font-bellefair text-3xl text-center mt-6 mb-2">
							Engage in Flavorful Conversations
						</h3>
						<p className="text-center">
							Join lively food discussions on our platform. Share insights, exchange
							opinions, and discover new perspectives on all things culinary, from
							techniques to trends.
						</p>
					</div>
					<div className="w-full md:w-1/2 flex flex-col items-center justify-center md:pl-5 md:mt-0 mt-28">
						<div className="h-26 flex items-center justify-center">
							<LazyLoadImage
								src={GroupIcon}
								effect="opacity"
								alt="Group Icon"
								width={100}
								height={100}
							/>
						</div>
						<h3 className="font-bellefair text-3xl text-center mt-6 mb-2">
							Unite with Foodie Communities
						</h3>
						<p className="text-center">
							Connect with like-minded food enthusiasts through groups. Share, learn, and
							explore together with fellow culinary enthusiasts.
						</p>
					</div>
				</div>
			</div>
			<div className="w-full flex items-center justify-center mt-36 mb-16">
				<button
					type="button"
					className="font-bellefair text-3xl rounded-md border-2 border-black sm:px-16 px-3 py-6 hover:scale-105 transition-transform duration-300 ease-in-out"
					onClick={() => window.scrollTo(0, 0)}
				>
					Join the Social Eat Community
				</button>
			</div>
		</>
	);
};

export default Home;
