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
		<div className='bg-tertiary p-4 rounded-md flex flex-col gap-y-3'>

			<video
				src={clip.clip}
				poster={clip.poster}
				controls
				controlsList='nodownload'
				className='aspect-video w-full'
			/>

			<p className='text-white line-clamp-1'>{clip.description}</p>

			<div className='flex items-center gap-x-4'>

                <div className='flex items-center gap-x-2'>

                    <button 
                        type='button' 
                        disabled={likeClipMutation.isPending || unlikeClipMutation.isPending}
                        onClick={() => isClipLiked ? unlikeClipMutation.mutate() : likeClipMutation.mutate()}
                        className='text-pink-400 text-xl cursor-pointer select-none transition hover:opacity-50'
                    >

                        { isClipLiked ? <FaHeart /> : <FaRegHeart /> }

                    </button>
                    
                    <span className='text-gray-400 text-xs'>{clip.likes}</span>

                </div>

                <div className='flex items-center gap-x-2'>

                    <button 
                        type='button' 
                        onClick={() => downloadClipMutation.mutate()}
                        className='text-cyan-300 text-xl cursor-pointer select-none transition hover:opacity-50'
                    >

					<FaDownload />

                    </button>
                    
                    <span className='text-gray-400 text-xs'>{clip.downloads}</span>

                </div>
				
			</div>

		</div>
	);
}