import { createContext, useContext } from "react";
import { IGlobalGameClient } from "../../../clients/v2/GlobalGameClient";

export const GlobalGameClientContext = createContext<IGlobalGameClient>({} as any);

export const useGlobalGameClient = () => useContext<IGlobalGameClient>(GlobalGameClientContext);
