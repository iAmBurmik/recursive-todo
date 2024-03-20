import React, { FC } from 'react';
import styles from './Sidebar.module.css';
import TodosList from '../Todos/TodosList';
import SidebarHeader from './SidebarHeader';

interface ISidebarProps {
  modalToggler: () => void;
}

const Sidebar: FC<ISidebarProps> = ({ modalToggler }) => {
  return (
    <aside className={styles.sidebar}>
      <SidebarHeader modalToggler={modalToggler} />
      <TodosList />
    </aside>
  );
};

export default Sidebar;
