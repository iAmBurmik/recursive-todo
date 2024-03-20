import React, { FC } from 'react';
import styles from './MainPage.module.css';
import { useAppSelector } from '../../hooks/hook';
import { countTasks } from '../utils/utils';

const MainPage: FC = () => {
  const list = useAppSelector((state) => state.todos.list);
  const totalCount = countTasks(list);

  return (
    <main className={styles['main-page']}>
      <div className="wrapper">
        <h1>
          Total Todo's: <span className={styles.green}>{totalCount}</span>
        </h1>
        <p>Select any task for more information and double click to edit.</p>
      </div>
    </main>
  );
};

export default MainPage;
