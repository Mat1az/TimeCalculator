import React from 'react';

const Button = ({children, onClick, color = 'bg-white'}) => {
    return (
        <button
            onClick={onClick}
            className={`py-3.5 px-4 m-1 md:py-4 md:m-2 hover:-translate-y-1 hover:scale-110 rounded-3xl drop-shadow-md transition ease-out duration-300 ${color} hover:bg-rose-100 text-gray-500 font-bold hover:text-gray-700`}>
            {children}
        </button>
    );
}

export default Button;