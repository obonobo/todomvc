import { Todo } from "./TodoStore";

const listKey = "todos";

const saveList = (list: Todo[]): void => {
  localStorage.setItem(listKey, JSON.stringify(list));
};

const getList = (): Todo[] => {
  const list = localStorage.getItem(listKey);
  if (list === null) return [];
  return JSON.parse(list);
};

export { saveList, getList };
