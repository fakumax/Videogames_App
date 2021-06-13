import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//------VALIDATE FUNCTION -----

export function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!/^[ a-zA-Z0-9_-]{3,10}$/.test(input.name)) {
      errors.name = 'Name is invalid';
    }
    if (!input.description) {
      errors.description = 'Description is required';
    } else if (!/^[ 1-9_]{1,4}$/.test(input.description)) {
      errors.description = 'Description is invalid';
    }
    if (!input.release) {
      errors.release = 'Release is required';
    } else if (!/^[ 1-9_]{1,4}$/.test(input.release)) {
      errors.release = 'Release is invalid';
    }
    if (!input.rating) {
      errors.rating = 'Rating is required';
    } else if (!/^[ 1-9_]{1,4}$/.test(input.rating)) {
      errors.rating = 'Rating is invalid';
    }
    
  
    return errors;
  }


const Form = () => {
    return (
        <div>
            <h1>form1</h1>
        </div>
    );
};

export default Form;