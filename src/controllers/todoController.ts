import { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(__dirname, '../data/todos.json');

const readTodos = (): Todo[] => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeTodos = (todos: Todo[]) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

export const getTodos = (req: Request, res: Response) => {
  res.json(readTodos());
};

export const createTodo = (req: Request, res: Response) => {
  const { title, dueDate } = req.body;
  const newTodo: Todo = {
    id: uuidv4(),
    title,
    dueDate,
    completed: false,
  };
  const todos = readTodos();
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

export const updateTodo = (req: Request, res: Response) => {
  const { id, title, dueDate } = req.body;
  const todos = readTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  todos[index].title = title;
  todos[index].dueDate = dueDate;
  writeTodos(todos);
  res.json(todos[index]);
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const todos = readTodos();
  const updated = todos.filter((t) => t.id !== id);
  writeTodos(updated);
  res.json({ message: 'Deleted successfully' });
};

export const markComplete = (req: Request, res: Response) => {
  const { id } = req.params;
  const todos = readTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  todos[index].completed = true;
  writeTodos(todos);
  res.json(todos[index]);
};
