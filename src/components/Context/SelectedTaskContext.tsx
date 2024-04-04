import { createContext } from "react";
import { SelectedTaskContextT } from "../../types";

export const SelectedTaskContext = createContext<SelectedTaskContextT>(null);
