import { FaDownload, FaHeart } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { likeClip, unlikeClip } from '../../apis/clips';
import useClips from '../../contexts/clips/useClips';

const API_URL = import.meta.env.VITE_API_URL;

export default function Clip({ clip }) {
	const { setClips, setLikedClips, likedClips } = useClips();

	const isClipLiked = likedClips.includes(clip._id);

	const likeClipMutation = useMutation({
		mutationFn: () => likeClip(clip._id),
		onMutate: () => {
			setClips((prev) =>
				prev.map((p) =>
					p._id === clip._id ? { ...p, likes: p.likes + 1 } : p,
				),
			);
			setLikedClips((prev) => [...prev, clip._id]);
		},
		onSuccess: () => {
			toast.success('Clip liked!');
		},

		onError: () => {
			toast.error('Something went wrong');
			setClips((prev) =>
				prev.map((p) =>
					p._id === clip._id ? { ...p, likes: p.likes - 1 } : p,
				),
			);
			setLikedClips((prev) => prev.filter((id) => id !== clip._id));
		},
	});

	const unlikeClipMutation = useMutation({
		mutationFn: () => unlikeClip(clip._id),
		onMutate: () => {
			setClips((prev) =>
				prev.map((p) =>
					p._id === clip._id ? { ...p, likes: p.likes - 1 } : p,
				),
			);
			setLikedClips((prev) => prev.filter((id) => id !== clip._id));
		},
		onSuccess: () => {
			toast.success('Clip unliked!');
		},
		onError: () => {
			toast.error('Something went wrong');
			setClips((prev) =>
				prev.map((p) =>
					p._id === clip._id ? { ...p, likes: p.likes + 1 } : p,
				),
			);
			setLikedClips((prev) => [...prev, clip._id]);
		},
	});

    const downloadClipMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`${API_URL}/clips/${clip._id}/download`);
            if (!res.ok) throw new Error('Download failed');
           	return res.blob();
        },

		onMutate: () => {
			toast.loading(
				'Please wait, your clip is being downloaded in the background!',
				{ id: 'download-clip' }
			);
		},

        onSuccess: (blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${clip.description}.mp4`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            toast.success('Clip downloaded successfully!', {
				id: 'download-clip' 
			});

            setClips((prev) =>
                prev.map((p) =>
                p._id === clip._id
                    ? { ...p, downloads: p.downloads + 1 }
                    : p
                )
            );
        },

        onError: (error) => {
            console.error(error);
            toast.error('Download failed!', {
				id: 'download-clip',
			});
        },
    });

	return (
		<div className='bg-primary p-4 rounded-xl border border-white/5 flex flex-col gap-y-3 shadow-lg'>

			<div className='rounded-xl overflow-hidden'>

				<video
					src={clip.clip}
					poster={clip.poster}
					controls
					controlsList='nodownload'
					className='aspect-video w-full'
				/>

			</div>

			<p className='text-gray-200 text-sm font-open-sans line-clamp-1'>{clip.description}</p>

			<div className='flex items-center justify-between mt-2'>

			<button
				type='button'
				disabled={likeClipMutation.isPending || unlikeClipMutation.isPending}
				onClick={() => isClipLiked ? unlikeClipMutation.mutate() : likeClipMutation.mutate()}
				className={`text-sm px-3 py-1.5  flex items-center gap-x-2 rounded-full transition-all 
					${isClipLiked ? 'bg-pink-500/15 text-pink-400' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
			>

				{isClipLiked ? <FaHeart /> : <FaRegHeart />}

				<span className='text-xs font-open-sans'>{clip.likes}</span>

			</button>

			<button
				type='button'
				onClick={() => downloadClipMutation.mutate()}
				className='bg-white/5 text-gray-300 text-sm px-3 py-1.5 rounded-full flex items-center gap-x-2 hover:bg-white/10 transition-all'
			>

				<FaDownload />

				<span className='text-xs font-open-sans'>{clip.downloads}</span>

			</button>

		</div>

	</div>

	);
};