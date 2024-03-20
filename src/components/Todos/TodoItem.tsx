import React, { FC, useEffect, useState } from 'react';
import { ITodo } from '../types/types';
import ModalWindow from '../ui/ModalWindow';
import Button from '../ui/Button';
import styles from './TodoItem.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { addSubTodo, changeComplete, removeTodo } from '../../store/todoSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearFields } from '../../store/inputSlice';

interface ITodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<ITodoItemProps> = ({ todo }) => {
  const { id, completed, subtasks } = todo;
  const [isModalShown, setIsModalShown] = useState(false);
  const [isSubTasksShown, setIsSubTasksShown] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const input = useAppSelector((state) => state.input);

  useEffect(() => {
    const isSubTasksShownLocalStorage = localStorage.getItem(
      `subtasksShown_${id}`
    );
    if (isSubTasksShownLocalStorage) {
      setIsSubTasksShown(JSON.parse(isSubTasksShownLocalStorage));
    }
  }, [id]);

  function modalWindowToggler() {
    setIsModalShown((prevModalState) => !prevModalState);
  }

  function subTasksToggler() {
    const newIsSubTasksShown = !isSubTasksShown;
    setIsSubTasksShown(newIsSubTasksShown);

    localStorage.setItem(
      `subtasksShown_${id}`,
      JSON.stringify(newIsSubTasksShown)
    );
  }

  const addTodoHandler = () => {
    if (input.title.length > 0) {
      dispatch(
        addSubTodo({
          id: id,
          title: input.title as string,
          text: input.description as string,
        })
      );
      dispatch(clearFields());
    }
  };

  const deleteTodoHandler = () => {
    dispatch(removeTodo(id));

    if (id === location.pathname.slice(1)) {
      navigate('/');
    }
  };

  return (
    <>
      {isModalShown && (
        <ModalWindow modalToggler={modalWindowToggler}>
          <Button btnText="add todo" onClick={addTodoHandler} />
        </ModalWindow>
      )}
      <div className={styles.todoItem}>
        {subtasks.length > 0 && (
          <span
            className={`${isSubTasksShown ? styles.rotare : ''} ${
              styles.subTaskShower
            }`}
            onClick={subTasksToggler}
          >
            &#62;
          </span>
        )}
        <h3
          className={`${styles.title} ${
            subtasks.length === 0 && styles['margin-left']
          }`}
        >
          <p onClick={() => navigate(`/${todo.id}`)}>{todo.title}</p>
        </h3>
        <svg
          className={styles.new}
          onClick={modalWindowToggler}
          aria-hidden="true"
          data-prefix="fas"
          data-icon="plus"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
          ></path>
        </svg>
        <div className={styles.completeChanger}>
          {!completed ? (
            <svg
              className={styles.uncompleted}
              onClick={() => dispatch(changeComplete(id))}
              aria-hidden="true"
              data-prefix="far"
              data-icon="circle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
            >
              <path
                fill="currentColor"
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
              ></path>
            </svg>
          ) : (
            <svg
              className={styles.completed}
              onClick={() => dispatch(changeComplete(id))}
              aria-hidden="true"
              data-prefix="fas"
              data-icon="check"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
            >
              <path
                fill="currentColor"
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
              ></path>
            </svg>
          )}
        </div>
        <svg
          className={styles.delete}
          onClick={deleteTodoHandler}
          aria-hidden="true"
          data-prefix="fas"
          data-icon="plus"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
          ></path>
        </svg>
      </div>
      {subtasks.length > 0 && (
        <div className={isSubTasksShown ? styles.subTasks : styles.hide}>
          {subtasks.map((subtask) => (
            <TodoItem key={subtask.id} todo={subtask} />
          ))}
        </div>
      )}
    </>
  );
};

export default TodoItem;
