import { useContext } from 'react';
import ClipsContext from './ClipsContext';

export default function useClips () {
	const context = useContext(ClipsContext);
	if (!context) throw new Error('useClips must be used within a ClipsProvider');
	return context;
}