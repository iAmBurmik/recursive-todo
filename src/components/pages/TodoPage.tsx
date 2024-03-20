import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { chandeDescription, chandeTitle } from '../../store/todoSlice';
import styles from './TodoPage.module.css';
import { recursionSearch } from '../utils/utils';

type TodoParams = {
  id: string;
};

const TodoPage: FC = () => {
  const param = useParams<TodoParams>();
  const todoList = useAppSelector((state) => state.todos.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (param.id) {
      const todo = recursionSearch(param.id, todoList);
      if (todo) {
        setInputTitle(todo?.title || '');
        setInputDescription(todo?.description || '');
        setTodoId(todo.id);
      }
    }
  }, [param.id, todoList]);

  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputDescription, setInputDescription] = useState<string>('');
  const [todoId, setTodoId] = useState<string>('');

  const [titleIsEditing, setTitleIsEditing] = useState<boolean>(false);
  const [descriptionIsEditing, setDescriptionIsEditing] =
    useState<boolean>(false);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const changeDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputDescription(event.target.value);
  };

  const stopEditingTitle = (event: React.FocusEvent<HTMLInputElement>) => {
    dispatch(chandeTitle({ id: todoId, title: inputTitle }));
    setTitleIsEditing(false);
  };

  const stopEditingDescription = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    dispatch(chandeDescription({ id: todoId, description: inputDescription }));
    setDescriptionIsEditing(false);
  };

  return (
    <div className={styles['todo-page']}>
      <div className="wrapper">
        <div
          className={styles['input-section']}
          onDoubleClick={() => setTitleIsEditing(true)}
        >
          {titleIsEditing ? (
            <input
              className={styles.titleInput}
              type="text"
              value={inputTitle}
              onChange={changeTitleHandler}
              onBlur={stopEditingTitle}
              autoFocus
            />
          ) : (
            <h1>{inputTitle}</h1>
          )}
        </div>
        <div
          className={styles['area-section']}
          onDoubleClick={() => setDescriptionIsEditing(true)}
        >
          {descriptionIsEditing ? (
            <textarea
              className={styles.descriptionInput}
              value={inputDescription}
              onChange={changeDescriptionHandler}
              onBlur={stopEditingDescription}
              autoFocus
            />
          ) : (
            <p>{inputDescription}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
