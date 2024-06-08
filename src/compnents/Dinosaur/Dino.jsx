// src/components/Dino.js
import React from 'react';
import './Dino.css';

const Dino = ({ jump }) => {
    return (
        <div className={`dino ${jump ? 'jump' : ''}`}></div>
    );
};

export default Dino;
