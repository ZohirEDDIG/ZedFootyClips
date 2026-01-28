import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';

import './index.css';

const queryClient = new QueryClient();

const toastStyle  = { background: '#2a2e35', color: '#fff', fontFamily: 'Open Sans' };

createRoot(document.getElementById('root')).render(
	<StrictMode>
        <BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
				<Toaster
					toastOptions={{ 
						style: toastStyle
					}}
				/>
			</QueryClientProvider>
        </BrowserRouter>
	</StrictMode>,
);