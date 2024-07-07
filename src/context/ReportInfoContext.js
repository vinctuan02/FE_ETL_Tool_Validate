import { createContext, useState } from "react";

export const ReportInfoContext = createContext({})

export const ReportProvider = ({ children }) => {

    const value = {
    }

    return <ReportInfoContext.Provider value={value}>
        {children}
    </ReportInfoContext.Provider>
}