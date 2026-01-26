import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import r2 from '../libs/r2.js';
import Clip from '../models/clip.model.js';
import sanitizeFilename from '../helpers/sanitizeFilename.js';
import { Readable } from 'stream';

export async function getClips (_, res) {
	try {
		const clips = await Clip.find().sort({ createdAt: -1 });

		const clipsWithSignedUrls = await Promise.all(
      		clips.map(async (clip) => {
				const videoUrl = await getSignedUrl(
					r2, 
					new GetObjectCommand({
						Bucket: process.env.R2_BUCKET,
						Key: clip.clip,
					}),
					{ expiresIn: 60 }
				);

				const posterUrl = await getSignedUrl(
					r2,
					new GetObjectCommand({
						Bucket: process.env.R2_BUCKET,
						Key: clip.poster,
					}),
          			{ expiresIn: 60 }
        		);

				return {
					_id: clip._id,
					description: clip.description,
					likes: clip.likes,
					downloads: clip.downloads,
					rating: clip.rating,
					clip: videoUrl,
					poster: posterUrl,
				};

	    	})
		);

		return res.status(200).json({clips: clipsWithSignedUrls});
	} catch (error) {
		console.error('Failed to fetch clips:', error);
		return res.status(500).json({ error: 'Failed to fetch clips' });
	}
}

export async function updateClip (req, res) {
	try {
		const { clipId } = req.params;
		const { action } = req.query;

		let update;

		switch (action) {
		case 'like':
			update = { $inc: { likes: 1 } };
			break;

		case 'unlike':
			update = { $inc: { likes: -1 } };
			break;

		default:
			return res.status(400).json({ error: 'Invalid action' });
		}

        await Clip.findByIdAndUpdate(clipId, update, { new: true });

		return res.status(200).json({ message: 'Clip updated successuflly' });
	} catch (error) {
		console.error('Failed to like clip:', error);
		return res.status(500).json({ error: 'Failed to update clip' });
	}
}

export async function downloadClip (req, res) {
	try {
		const { clipId } = req.params;

		const clip = await Clip.findById(clipId);
    	if (!clip) return res.status(404).json({ message: 'Clip not found' });

		clip.downloads = (clip.downloads || 0) + 1;
		await clip.save();

		const signedUrl = await getSignedUrl(
			r2,
			new GetObjectCommand({
				Bucket: process.env.R2_BUCKET,
				Key: clip.clip,
			}),
			{ expiresIn: 60 }
		);

		const response = await fetch(signedUrl);
    	if (!response.ok) throw new Error('Failed to fetch clip from bucket');


		const safeName = sanitizeFilename(clip.description || 'clip');

		res.setHeader('Content-Disposition', `attachment; filename="${safeName}.mp4"`);
		res.setHeader('Content-Type', 'video/mp4');

        const nodeStream = Readable.fromWeb(response.body);
        nodeStream.pipe(res);
	} catch (error) {
		console.error('Failed to download clip:', error);
		return res.status(500).json({ error: 'Failed to download clip' });
	}
}