const API_BASE = import.meta.env.VITE_API_URL || '';

import { mapCommentFromApi } from '../../../enteties/comment/';

export async function createComment(postId, content) {
	const response = await fetch(`${API_BASE}/api/posts/${postId}/comments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ content }),
		credentials: 'include'
	});

	const data = await response.json().catch(() => ({}));

	if (!response.ok) 
	{
		throw new Error(data.message || `Failed to create comment: ${response.status}`);
	}

	return mapCommentFromApi(data);
}