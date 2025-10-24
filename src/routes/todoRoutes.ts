import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  markComplete,
} from '../controllers/todoController';
import { validateTodo } from '../middleware/validateTodo';

const router = express.Router();

router.get('/todos', getTodos);
router.post('/todos', validateTodo, createTodo);
router.put('/todos', validateTodo, updateTodo);
router.delete('/todos/:id', deleteTodo);
router.patch('/todos/:id/complete', markComplete);

export default router;
