/* eslint-disable max-classes-per-file */
type Todo = {
  id?: number;
  text?: string;
  completed?: boolean;
};

class TodoStore {
  static Mutator = class TodoMutator {
    private current: Todo[];

    constructor(todos: Todo[] = []) {
      this.current = todos;
    }

    get todos(): Todo[] {
      return [...this.current];
    }

    handle(manipulate: (current: Todo[]) => Todo[]): TodoMutator {
      this.current = manipulate(this.current);
      return this;
    }

    freeze(): TodoStore {
      return new TodoStore(this.current);
    }
  };

  private todos: Todo[];

  constructor(items: Todo[] = []) {
    this.todos = items ?? [];
  }

  static of(...items: Todo[]): TodoStore {
    return new TodoStore(items);
  }

  static mutate(previous: TodoStore) {
    return new TodoStore.Mutator(previous.todos);
  }

  mutate() {
    return TodoStore.mutate(this);
  }

  get all(): Todo[] {
    return [...this.todos];
  }

  get length(): number {
    return this.todos.length;
  }

  paginate(pageSize = 5): Todo[][] {
    return this.todos.reduce(
      (p, c) =>
        p[p.length - 1].length >= pageSize
          ? p.concat([[c]])
          : p.slice(0, p.length - 1).concat([p[p.length - 1].concat([c])]),
      [[]]
    );
  }

  next({ text, completed }: { text?: string; completed?: boolean }): Todo {
    return {
      text,
      completed,
      id: this.todos.reduce((p, c) => Math.max(p, c.id), Number.MIN_VALUE) + 1,
    };
  }

  filter(on: (value: Todo, index: number, array: Todo[]) => boolean): Todo[] {
    return this.todos.filter(on);
  }
}

export default TodoStore;
export type { Todo };
