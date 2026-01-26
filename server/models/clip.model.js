import { Schema, model } from 'mongoose';

const ClipSchema = Schema(
	{
		poster: { type: String, required: true },
		clip: { type: String, required: true },
		description: { type: String, required: true },
		likes: { type: Number, default: 0 },
		downloads: { type: Number, default: 0 },
	},
	{ timestamps: true },
);

export default model('Clip', ClipSchema);