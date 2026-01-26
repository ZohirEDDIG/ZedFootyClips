import { Routes as RRRoutes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Clips from '../pages/Clips';

export default function Routes () {
    return (
        <RRRoutes>

            <Route path='/' element={<Home />} />
            <Route path='/clips' element={<Clips />} />
          
        </RRRoutes>
    );
}