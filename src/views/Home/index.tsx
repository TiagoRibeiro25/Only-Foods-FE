import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import DiscussionIcon from '../../assets/icons/discussion.svg';
import GroupIcon from '../../assets/icons/group.svg';
import HamburgerIcon from '../../assets/icons/hamburger.svg';
import PizzaIcon from '../../assets/icons/pizza.svg';
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
import Reveal from '../../components/Reveal';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const Home = () => {
	const location = useLocation();

	const renderForm = (): React.JSX.Element => {
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
			<h1 className="mt-24 mb-2 text-4xl text-center font-bellefair sm:mt-36">
				Discover, Connect, and Share the Joy of Food!
			</h1>
			<p className="text-center">
				Unleash your culinary genius, explore new flavors, and inspire others. Join Only
				Foods to share your recipes, discover endless possibilities, and connect with
				fellow food enthusiasts. Let your creativity shine in the kitchen!
			</p>
			<div className="flex flex-col md:mt-10 md:flex-row">
				<div className="flex items-center justify-center w-full mb-8 md:w-1/2 md:mb-0">
					<LazyLoadImage
						src={AuthIllustration}
						placeholderSrc={AuthIllustrationPlaceholder}
						effect="opacity"
						alt="Home Illustration"
						className="hidden mx-auto md:block"
						width="auto"
						height="auto"
					/>
				</div>
				<div className="w-full pl-0 md:w-1/2 md:pl-10">
					<Reveal width="100%" animation="slide-bottom" delay={0.05} duration={0.5}>
						{renderForm()}
					</Reveal>
				</div>
			</div>
			<Reveal width="100%" animation="slide-bottom">
				<h2 className="mb-2 text-4xl text-center font-bellefair mt-28">
					Foodie Community. Connection & Culinary Delights
				</h2>
				<p className="text-center">
					Unleash your culinary genius, explore new flavors, and inspire others. Join Only
					Foods to share your recipes, discover endless possibilities, and connect with
					fellow food enthusiasts. Let your creativity shine in the kitchen!
				</p>
			</Reveal>
			<div className="flex flex-col mt-16 mb-10">
				<Reveal width="100%" animation="slide-right">
					<div className="flex flex-col-reverse md:flex-row">
						<div className="flex flex-col items-center justify-center w-full mt-10 md:w-1/2 md:pr-10 md:mt-0">
							<h3 className="w-full mb-2 text-4xl font-bellefair text-start">
								Integrity &amp; Confidentiality
							</h3>
							<p>
								Unleash your culinary genius, explore new flavors, and inspire others.
								Join Only Foods to share your recipes, discover endless possibilities, and
								connect with fellow food enthusiasts. Let your creativity shine in the
								kitchen!
							</p>
						</div>
						<div className="flex items-center justify-center w-full mt-10 md:w-1/2 md:mt-0">
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
				</Reveal>
				<Reveal width="100%" animation="slide-left">
					<div className="flex flex-col mt-20 md:flex-row">
						<div className="flex items-center justify-center w-full mt-10 md:w-1/2 md:mt-0">
							<LazyLoadImage
								src={SocialIllustration}
								placeholderSrc={SocialIllustrationPlaceholder}
								effect="opacity"
								alt="Home Illustration"
								width="auto"
								height="auto"
							/>
						</div>
						<div className="flex flex-col items-center justify-center w-full md:w-1/2 md:pr-10">
							<h3 className="w-full mb-2 text-4xl font-bellefair text-start">
								Explore &amp; Savor
							</h3>
							<p>
								At Only Foods, we're passionate about bringing food enthusiasts together.
								Our platform is designed to create a vibrant community where food lovers
								can connect, share their culinary adventures, and savor the joys of good
								food. From discovering mouthwatering recipes to engaging in lively
								discussions, we offer a space to explore diverse flavors, seek
								inspiration, and celebrate the culinary arts. Join us and embark on a
								delightful journey of culinary discovery with fellow foodies from around
								the world.
							</p>
						</div>
					</div>
				</Reveal>

				<Reveal width="100%" animation="slide-right">
					<div className="flex flex-col-reverse mt-16 md:flex-row">
						<div className="flex flex-col items-center justify-center w-full mt-10 md:w-1/2 md:pr-10 md:mt-0">
							<h3 className="w-full mb-2 text-4xl font-bellefair text-start">
								Personalize &amp; Connect
							</h3>
							<p>
								At Only Foods, we believe in providing you with a personalized space that
								revolves around your love for food. Say goodbye to generic platforms! Join
								our vibrant community where you can create your own culinary haven.
								Customize your profile, share your favorite recipes, showcase your food
								creations, and connect with fellow food enthusiasts. With Only Foods, it's
								all about you and your unique culinary journey. Embrace the flavors, share
								your passion, and make lasting connections within our foodie community.
							</p>
						</div>
						<div className="flex items-center justify-center w-full mt-10 md:w-1/2 md:mt-0">
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
				</Reveal>
			</div>
			<Reveal width="100%" animation="slide-bottom">
				<h2 className="mb-2 text-4xl text-center font-bellefair mt-28">
					Discover a World of Culinary Possibilities
				</h2>
				<p className="text-center">
					Embark on a gastronomic adventure with Only Foods. Our platform is packed with a
					range of exciting features designed to enhance your foodie experience.
				</p>
			</Reveal>
			<div className="flex flex-col mt-16 mb-10">
				<div className="flex flex-col md:flex-row">
					<div className="flex flex-col items-center justify-center w-full mt-10 md:w-1/2 md:pr-5 md:mt-0">
						<Reveal animation="slide-left">
							<div className="flex items-center justify-center h-26">
								<LazyLoadImage
									src={ThoughtIcon}
									effect="opacity"
									alt="Thought Icon"
									width={100}
									height={100}
								/>
							</div>
							<h3 className="mt-6 mb-2 text-3xl text-center font-bellefair">
								Share your current thoughts
							</h3>
							<p className="text-center">
								Share your current food thoughts, cravings, and experiences with our
								food-loving community. From restaurant discoveries to homemade delights,
								let your culinary moments shine.
							</p>
						</Reveal>
					</div>
					<div className="flex flex-col items-center justify-center w-full md:w-1/2 md:pl-5 md:mt-0 mt-28">
						<Reveal animation="slide-right">
							<div className="flex items-center justify-center h-26">
								<LazyLoadImage
									src={RecipeIcon}
									effect="opacity"
									alt="Recipe Icon"
									width={75}
									height={75}
								/>
							</div>
							<h3 className="mt-6 mb-2 text-3xl text-center font-bellefair">
								Delightful Recipes Unleashed
							</h3>
							<p className="text-center">
								Unleash your culinary creativity by sharing your favorite recipes with the
								Only Foods community. From treasured family secrets to innovative
								experiments, inspire and be inspired by fellow food lovers.
							</p>
						</Reveal>
					</div>
				</div>
				<div className="flex flex-col mt-16 md:flex-row">
					<div className="flex flex-col items-center justify-center w-full mt-10 md:w-1/2 md:pr-5 md:mt-0">
						<Reveal animation="slide-left">
							<div className="flex items-center justify-center h-26">
								<LazyLoadImage
									src={DiscussionIcon}
									effect="opacity"
									alt="Discussion Icon"
									width={80}
									height={80}
								/>
							</div>
							<h3 className="mt-6 mb-2 text-3xl text-center font-bellefair">
								Engage in Flavorful Conversations
							</h3>
							<p className="text-center">
								Join lively food discussions on our platform. Share insights, exchange
								opinions, and discover new perspectives on all things culinary, from
								techniques to trends.
							</p>
						</Reveal>
					</div>
					<div className="flex flex-col items-center justify-center w-full md:w-1/2 md:pl-5 md:mt-0 mt-28">
						<Reveal animation="slide-right">
							<div className="flex items-center justify-center h-26">
								<LazyLoadImage
									src={GroupIcon}
									effect="opacity"
									alt="Group Icon"
									width={100}
									height={100}
								/>
							</div>
							<h3 className="mt-6 mb-2 text-3xl text-center font-bellefair">
								Unite with Foodie Communities
							</h3>
							<p className="text-center">
								Share, learn, and explore together with fellow culinary enthusiasts.
							</p>
						</Reveal>
					</div>
				</div>
			</div>
			<Reveal width="100%" animation="slide-bottom">
				<div className="flex items-center justify-center w-full mb-10 mt-28 sm:mb-16 sm:mt-36">
					<Link
						to="/explore"
						type="button"
						className="flex items-center px-4 py-6 text-2xl transition-transform duration-300 ease-in-out border-2 border-black rounded-md sm:text-3xl font-bellefair sm:px-16 sm:hover:scale-105"
					>
						<LazyLoadImage
							src={PizzaIcon}
							effect="opacity"
							alt="Pizza Icon"
							width={45}
							height={45}
							className="inline-block pt-1 scale-75 sm:scale-100 animate-bounce"
						/>
						<span className="text-center sm:mx-4">Start Exploring Now</span>
						<LazyLoadImage
							src={HamburgerIcon}
							effect="opacity"
							alt="Pizza Icon"
							width={45}
							height={45}
							className="inline-block pt-1 scale-75 sm:scale-100 animate-bounce"
						/>
					</Link>
				</div>
			</Reveal>
		</>
	);
};

export default Home;
