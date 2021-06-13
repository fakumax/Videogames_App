import React from 'react';
import {Link} from 'react-router-dom';
//----------Icons----------
import { VscArrowLeft } from 'react-icons/vsc';
//-------------------------
const Back = () => {
  return (
    <>
      <Link to='/home' className ='link-back'>
        <VscArrowLeft className='icon-back' />
      </Link>
    </>
  );
};

export default Back;