import React, { FC } from 'react';
import styles from './TodosList.module.css';
import { useAppSelector } from '../../hooks/hook';
import TodoItem from './TodoItem';

const TodosList: FC = () => {
  const todosList = useAppSelector((state) => state.todos.list);

  return (
    <div className={styles.list}>
      {todosList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodosList;
