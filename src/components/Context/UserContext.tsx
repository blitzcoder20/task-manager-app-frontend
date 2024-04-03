import { createContext } from "react";
import { UserContextT } from "../../types";

export const UserContext = createContext<UserContextT>(null)