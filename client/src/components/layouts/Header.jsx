import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdFootball } from 'react-icons/io';
import NewsletterModal from '../modals/NewsletterModal';

export default function Header () {
    const [open, setOpen] = useState(false);
    
    return (
        <header>

            <div className='container mx-auto p-4 flex flex-col sm:flex-row justify-between items-center gap-y-3'>

                <Link to='/' className='text-white text-2xl sm:text-4xl font-bold flex items-center group'>
                    
                    ZedF
                    
                    <IoMdFootball className='text-sm group-hover:animate-spin' />
                    
                    <IoMdFootball className='text-sm group-hover:animate-spin' />
                    
                    tyClips.
                    
                </Link>

                <div className='flex items-center gap-x-4'>

                    <Link to='/clips' className='text-secondary text-xl sm:text-2xl px-2 border-2 border-secondary rounded-xl transition green-drop-shadow'>
                    
                        Clips
                    
                    </Link>

                    <div className='relative group'>

                        <button 
                            type='button'
                            onClick={() => setOpen(true)}
                            className='bg-white text-black text-xl sm:text-2xl px-2 py-1 transition hover:scale-105'
                            
                            >

                            Join  our Newsletter

                        </button>

                        <span className='w-full h-full bg-black absolute top-2 left-2 -z-10'></span>
                
                    </div>
                
                </div>

                <NewsletterModal isOpen={open} onClose={() => setOpen(false)} />
            
            </div>

        </header>
    );
};