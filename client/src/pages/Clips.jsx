import { IoMdFootball } from 'react-icons/io';
import useClips from '../contexts/clips/useClips';
import Header from '../components/layouts/Header';
import Intro from '../components/clips/Intro';
import SearchAndSort from '../components/clips/SearchAndSort';
import Clip from '../components/clips/Clip';

export default function Clips () {
    const { getClipsQuery, clips } = useClips();

	return (
		<>
			<Header />

            <main className='w-screen  min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-72px)]'>

                <div className='w-full h-full container mx-auto p-4 flex flex-col gap-y-12'>

                    <Intro />

                    <SearchAndSort />

                    {
                        getClipsQuery.isPending 

                        ?   <div className='text-gray-400 text-4xl font-bold flex justify-center items-center animate-pulse'>

                                L<IoMdFootball className='text-xl animate-spin' />ading...

                            </div>

                        :  getClipsQuery.isSuccess

                        ?   (
                            
                            clips.length === 0 
                            
                            ?    <p className='text-gray-400 text-base sm:text-2xl font-bold font-open-sans text-center'>

                                No clips found 

                            </p>

                            :   <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

                                    {

                                        
                                        clips.map((clip) => (

                                            <Clip key={clip._id} clip={clip}  />

                                        ))
                                    } 

                                </div>
                        )

                        

                        
                        :   getClipsQuery.isError

                        ?   <p className='text-gray-400 text-base sm:text-2xl font-open-sans  font-bold text-center'>

                                Error: Something went wrong. Please refrsh the page or try again later.

                            </p>

                        : null

                    }

                </div>

            </main>

		</>
	);
}