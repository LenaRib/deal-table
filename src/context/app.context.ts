import React from "react";

const defaultContext = {
    settings: {},
    appVersion: 0,
    getCurrentUser: () => {},
    initAppSettings: async (): Promise<boolean> => { return true; },
    setAppSettings: async (key: string, data: any): Promise<boolean> => { return true; },
    updateComplete: () => {},
    access: (key: string) => {},
    setHeaderVisibility: (state: boolean) => {}
};

export const AppContext = React.createContext(defaultContext);