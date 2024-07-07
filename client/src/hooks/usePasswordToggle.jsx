import React, { useState } from 'react';

const usePasswordToggle = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(prevVisible => !prevVisible);
    };

    const icon = visible 
        ? <i className="ri-eye-off-fill" onClick={toggleVisibility}></i>
        : <i className="ri-eye-fill" onClick={toggleVisibility}></i>;

    const inputType = visible ? "text" : "password";

    return [inputType, icon];
};

export default usePasswordToggle;
