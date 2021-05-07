/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-classes-per-file */

import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { getList, saveList } from "./LocalStorageAccess";
import TodoStore, { Todo } from "./TodoStore";

type TodoAction = {
  type: "create" | "update" | "delete" | "manipulate";
  item?: Todo;
  manipulation?: (store: TodoStore) => TodoStore;
};

const actions: {
  [method: string]: (state: TodoStore, action: TodoAction) => TodoStore;
} = {
  create: (state: TodoStore, action: TodoAction) =>
    action.item
      ? state
          .mutate()
          .handle((list) => list.concat([state.next({ ...action.item })]))
          .freeze()
      : state,

  delete: (state: TodoStore, action: TodoAction) =>
    action.item
      ? state
          .mutate()
          .handle((list) =>
            list.filter(
              (item) =>
                !(
                  ("id" in action.item ? action.item.id === item.id : true) &&
                  ("text" in action.item
                    ? action.item.text === item.text
                    : true) &&
                  ("completed" in action.item
                    ? action.item.completed === item.completed
                    : true)
                )
            )
          )
          .freeze()
      : state,

  update: (state: TodoStore, action: TodoAction) =>
    action.item
      ? state
          .mutate()
          .handle((list) =>
            list.map((item) =>
              item.id === action.item.id ? action.item : item
            )
          )
          .freeze()
      : state,

  manipulate: (state: TodoStore, action: TodoAction) =>
    action.manipulation ? action.manipulation(state) : state,
};

const reducer = (state: TodoStore, action: TodoAction): TodoStore => {
  const newState =
    action.type in actions ? actions[action.type](state, action) : state;

  saveList(newState.all);
  return newState;
};

const StoreContext = createContext<{
  store: TodoStore;
  dispatch: Dispatch<TodoAction>;
}>({
  store: new TodoStore(),
  dispatch: () => null,
});

const StoreContextProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [store, dispatch] = useReducer(reducer, null, () => TodoStore.of());
  const contextPackage = useMemo(() => ({ store, dispatch }), [
    store,
    dispatch,
  ]);

  // Initialize with the contents of localStorage
  useEffect(
    () =>
      dispatch({
        type: "manipulate",
        manipulation: () => TodoStore.of(...getList()),
      }),
    []
  );

  return (
    <StoreContext.Provider value={contextPackage}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContextProvider, StoreContext };
export type { TodoAction };
