import { createContext } from "react";
import { ConfigStateTypes } from "@/types/ConfigType";

export const ConfigContext = createContext<ConfigStateTypes>({
    config: {},
    setConfig: () => { },
    graphables: []
});