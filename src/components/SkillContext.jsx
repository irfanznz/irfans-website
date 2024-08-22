import React, { createContext, useState } from 'react';

const SkillContext = createContext();

const SkillProvider = ({ children }) => {
    const [skillDesc, setSkillDesc] = useState("");

    return (
        <SkillContext.Provider value={{ skillDesc, setSkillDesc }}>
            {children}
        </SkillContext.Provider>
    );
};

export { SkillContext, SkillProvider };