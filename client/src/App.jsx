import Modal from 'react-modal';
import ClipsProvider from './contexts/clips/ClipsProvider';
import Routes from './routes/Routes';

Modal.setAppElement('#root');

export default function App () {
	return (
		<ClipsProvider>

			<Routes />

		</ClipsProvider>
	);
}