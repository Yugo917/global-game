import { createContext, useContext } from "react";
import { IGlobalGameApiV1 } from "../../../clients/v1/GlobalGameApiV1";

export const GlobalGameApiV1Context = createContext<IGlobalGameApiV1>({} as any);

export const useGlobalGameApiV1 = () => useContext<IGlobalGameApiV1>(GlobalGameApiV1Context);
