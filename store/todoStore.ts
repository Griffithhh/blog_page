import { create } from 'zustand';

type Todo = {
  title: string;
  description: string;
};

type TodoState = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (index: number) => void;
  clearTodos: () => void;
};

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (index) =>
    set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
  clearTodos: () => set({ todos: [] }),
}));
