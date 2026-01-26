import { Link } from 'react-router-dom';
import { IoMdFootball } from 'react-icons/io';

export default function Header () {
    return (
        <header>

            <div className='container mx-auto p-4 flex justify-between items-center gap-x-4'>

                <Link to='/' className='text-white text-2xl sm:text-4xl font-bold flex items-center group'>
                    
                    ZedF
                    
                    <IoMdFootball className='text-sm group-hover:animate-spin' />
                    
                    <IoMdFootball className='text-sm group-hover:animate-spin' />
                    
                    tyClips.
                    
                </Link>


                <Link to='/clips' className='text-secondary text-xl sm:text-2xl px-2 border-2 border-secondary rounded-xl transition green-drop-shadow'>
                
                    Clips
                
                </Link>
            
            </div>

        </header>
    );
};