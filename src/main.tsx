import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Providers from './contextProviders/index.tsx';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './css/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Providers>
			<App />
		</Providers>
	</React.StrictMode>,
);
