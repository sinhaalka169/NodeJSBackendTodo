import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  markComplete,
} from '../controllers/todoController';
import { validateTodo } from '../middleware/validateTodo';
import { authenticate } from '../middleware/auth';
import { signUp, login } from '../controllers/authController';

const router = express.Router();

router.get('/todos', authenticate, getTodos);
router.post('/todos', authenticate, validateTodo, createTodo);
router.put('/todos', validateTodo, updateTodo);
router.delete('/todos/:id', deleteTodo);
router.patch('/todos/:id/complete', markComplete);
router.post('/signup', signUp);
router.post('/login', login);

export default router;
