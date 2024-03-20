import { FC } from 'react';

import styles from './ModalWindow.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { addDescription, addTitle } from '../../store/inputSlice';
import Button from './Button';

interface ModalProps {
  children: JSX.Element | JSX.Element[];
  modalToggler: () => void;
}

const ModalWindow: FC<ModalProps> = ({ children, modalToggler }) => {
  const dispatch = useAppDispatch();
  const input = useAppSelector((state) => state.input);

  return (
    <div className={styles.blackout}>
      <div className={`${styles.flexColumn} ${styles.controls}`}>
        <div className={styles.flexColumn}>
          <input
            placeholder="Назва..."
            value={input.title}
            onChange={(e) => dispatch(addTitle(e.target.value))}
          />
          <textarea
            placeholder="Опис..."
            value={input.description}
            onChange={(e) => dispatch(addDescription(e.target.value))}
          />
        </div>
        {children}
        <Button
          className={styles.close}
          btnText="close window"
          onClick={modalToggler}
        />
      </div>
    </div>
  );
};

export default ModalWindow;
