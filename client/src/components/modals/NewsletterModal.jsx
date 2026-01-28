import { useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { FaXmark } from 'react-icons/fa6';

const API_URL = import.meta.env.VITE_API_URL;

export default function NewsletterModal({ isOpen, onClose }) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email) return toast.error('Email is required');
		if (!/\S+@\S+\.\S+/.test(email)) return toast.error('Invalid email');

		setLoading(true);
		const toastId = toast.loading('Subscribing...');

		try {
			const response = await fetch(`${API_URL}/gmail/add`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			const data = await response.json();
			if (data?.message === 'You already subscribed to our newsletter') {
				return toast(data.message, { id: toastId } )
			}

			if (!response.ok) throw new Error('Subscription failed');

			toast.success('Subscribed successfully!', { id: toastId });
			setEmail('');
			onClose();
		} catch (err) {
			toast.error(err.message, { id: toastId });
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			overlayClassName='bg-primary/80 flex items-center justify-center fixed inset-0 z-50'
			className='w-11/12 max-w-md bg-primary text-white p-6 rounded-lg relative outline-none rounded-xl border border-white/5'
		>
			<button
				onClick={onClose}
				className=' text-white text-xl font-bold absolute top-3 right-3 hover:text-gray-300 '
			>
				
                <FaXmark />

			</button>

			<h2 className='text-2xl font-semibold font-open-sans mb-2'>Stay updated ⚽</h2>

			<p className='text-gray-300 mb-6 text-sm font-open-sans'>Get notified when new clips  are there.</p>

			<form onSubmit={handleSubmit} className='flex flex-col gap-3' noValidate>

				<input
					type='email'
					placeholder='Enter your email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='font-open-sans px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>

				<button
					type='submit'
					disabled={loading}
					className={`px-4 py-2 rounded-md font-semibold font-open-sans transition ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
				>

					{loading ? 'Please wait...' : 'Subscribe'}
				
                </button>

			</form>
            
		</Modal>
	);
}