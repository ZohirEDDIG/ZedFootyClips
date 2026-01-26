import ClipsProvider from './contexts/clips/ClipsProvider';
import Routes from './routes/Routes';

export default function App () {
	return (
		<ClipsProvider>

			<Routes />;

		</ClipsProvider>
	);
}