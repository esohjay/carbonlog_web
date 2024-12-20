import React, { useContext, useReducer, createContext } from "react";

import { ActionReducer } from "../reducers/action";
import { ActionsAction, ActionState } from "../../types/action";

interface ActionContextProps {
  state: ActionState;
  dispatch: React.Dispatch<ActionsAction>;
}

const ActionContext = createContext<ActionContextProps | undefined>(undefined);

const initialState: ActionState = {
  actionAdded: false,
  actionFetched: false,
  action: null,
  loggedAction: null,
  actionList: null,
  actionError: null,
  addingAction: false,
  fetchingAction: false,
  myActions: null,
  myActionsFetched: false,
  adminAction: null,
  adminActionAdded: false,
};
const ActionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(ActionReducer, initialState);
  return (
    <ActionContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useActionContext = () => {
  const context = useContext(ActionContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { ActionContext, ActionProvider };
