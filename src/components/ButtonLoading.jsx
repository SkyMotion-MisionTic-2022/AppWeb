import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading = ({ disabled, loading, text,  onClick = () => {} }) => {
    return (
        <button
            data-testid='button-loading'
            onClick={onClick}
            disabled={disabled}
            type='submit'
            className='bg-indigo-600 text-white font-bold text-lg py-2 px-1  rounded-xl hover:bg-indigo-500 shadow-md my-1 disabled:opacity-50 disabled:bg-gray-700'
        >
            {loading ? <ReactLoading data-testid="loading-in-button" type='spin' height={30} width={30} /> : text}
        </button>
    );
};

export default ButtonLoading;
