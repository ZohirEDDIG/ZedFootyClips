import { FaSearch } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';
import useClips from '../../contexts/clips/useClips';

export default function SearchAndSort () {
    const { search, handleSortChange } = useClips();

    return (
        <div className='flex flex-col md:flex-row justify-between items-center gap-y-4'>

            <div className='bg-tertiary text-white p-2 border border-gray-400 flex items-center gap-x-2 transition purple-drop-shadow'>

                <button type='button' className='flex justify-center items-center'>
                    
                    <FaSearch />
                
                </button>

                <input 
                    type='text' 
                    placeholder='Search' 
                    onChange={(e) => search(e.target.value)} 
                    className='text-white  placeholder:text-white  font-open-sans placeholder:font-semibold flex-1 focus:outline-none' />

                <button type='button' className='w-6 h-6 border border-gray-400 rounded-md flex justify-center items-center'>/</button>

            </div>

            <div className='relative'>

                <BiChevronDown  className='text-4xl text-gray-400 absolute right-2 top-0 z-10' />
                
                <select 
                    name='sort-by' 
                    id='sort-by'
                    onChange={(e) => handleSortChange(e.target.value)} 
                    className='w-50 sort-option appearance-none'
                >

                    <option value='' className='sort-option'>Sort By</option>

                    <option value='most-likes' className='sort-option'>Most Likes</option>

                    <option  value='most-downloads' className='sort-option'>Most Downloads</option>

                </select>
            
            </div>

        </div>
    );
}