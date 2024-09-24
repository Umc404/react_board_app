import React from 'react';
import BoardList from './BoardList';
// import { Link } from 'react-router-dom';

const BoardHome = () => {

    return (
        <div className='boardHome'>
            {/* <h3>React boardList page</h3> */}
            {/* <hr /> */}
            <BoardList />
        </div>
    );
};
export default BoardHome;