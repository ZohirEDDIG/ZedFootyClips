import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function getClips () {
	return axios.get(`${API_URL}/clips`);
}

export function likeClip (clipId) {
	return fetch(`${API_URL}/clips/${clipId}/update?action=like`, {
		method: 'PATCH',
	});
}

export function unlikeClip (clipId) {
	return fetch(`${API_URL}/clips/${clipId}/update?action=unlike`, {
		method: 'PATCH',
	});
}