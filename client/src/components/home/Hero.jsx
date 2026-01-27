import { Link } from 'react-router-dom';
import { IoMdFootball } from 'react-icons/io';
import useClips from '../../contexts/clips/useClips';

export default function Hero () {
    const { getClipsQuery } = useClips();

    return (
        <main className='w-screen h-[calc(100dvh-112px)] sm:h-[calc(100dvh-72px)]'>

            <div className='w-full h-full container mx-auto p-4 flex flex-col lg:flex-row items-center justify-center gap-x-30 gap-y-6'>

                <div className='flex flex-col gap-y-6 max-lg:order-2'>

                    <h1 className='text-white text-2xl sm:text-4xl text-center font-bold'>
                        
                        <span className='text-orange-400 text-center'>High Quality</span> Clips for Editors
                        
                    </h1>

                    <p className='max-w-150 text-gray-400 text-lg sm:text-xl text-center'>
                        
                        <span className='inline-flex items-center group'>ZedF<IoMdFootball className='text-sm group-hover:animate-spin' /><IoMdFootball className='text-sm group-hover:animate-spin' />tyClips</span>
                                            
                        {" "} is a <span className='text-orange-400'>curated</span> platform providing <span className='text-pink-400'>high-quality</span> 
                        
                        {" "} football clips, ready for editing and content creation.

                    </p>

                    <Link to='/clips' className='w-fit bg-secondary text-white sm:text-xl px-2 py-1.5 mx-auto rounded-lg transition hover:bg-secondary/50'>
                        
                        Explore Clips
                    
                    </Link>

                </div>

                <div className='relative'>

                    <img src='/TV.png' alt='TV' className='max-w-80 sm:max-w-100' />

                    {
                        getClipsQuery.isPending 

                        ?   <img 
                                src='/poster.png' 
                                alt='Poster' 
                                className='w-52 sm:w-65 absolute z-10 top-9 left-8 sm:top-11.25 sm:left-9.5' 
                            />

                        
                        :  getClipsQuery.isSuccess 
                        
                        
                        ?   <video 
                                src={getClipsQuery.data.data.clips[0].clip} 
                                poster={getClipsQuery.data.data.clips[0].poster} 
                                controls 
                                controlsList='nodownload'  
                                className='w-52 sm:w-65 absolute z-10 top-9 left-8 sm:top-11.25 sm:left-9.5' 
                            />
                        
                        :   getClipsQuery.isError 
                        
                        ?   <img 
                                src='/poster.png' 
                                alt='Poster' 
                                className='w-52 sm:w-65 absolute z-10 top-9 left-8 sm:top-11.25 sm:left-9.5' 
                            />

                        : null
                        
                    }

                </div>

            </div>

        </main>
    );
}