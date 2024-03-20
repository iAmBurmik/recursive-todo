import React, { FC } from 'react';
import styles from './SidebarHeader.module.css';
import { Link } from 'react-router-dom';

interface ISidebarHeaderProps {
  modalToggler: () => void;
}

const SidebarHeader: FC<ISidebarHeaderProps> = ({ modalToggler }) => {
  return (
    <div className={styles.header}>
      <Link to={'/'}>
        <h3>Recursive Todo List</h3>
      </Link>
      <svg
        onClick={modalToggler}
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
  );
};

export default SidebarHeader;
