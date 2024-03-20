import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import MainPage from './components/pages/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './components/pages/TodoPage';
import ModalWindow from './components/ui/ModalWindow';
import Button from './components/ui/Button';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/todoSlice';
import { useAppSelector } from './hooks/hook';
import { clearFields } from './store/inputSlice';

function App() {
  const [isModalShown, setIsModalShown] = useState(false);
  const dispatch = useDispatch();
  const input = useAppSelector((state) => state.input);

  function modalWindowToggler() {
    setIsModalShown((prevModalState) => !prevModalState);
  }

  const addTodoHandler = () => {
    if (input.title.length > 0) {
      dispatch(
        addTodo({
          title: input.title as string,
          text: input.description as string,
        })
      );
      dispatch(clearFields());
    }
  };

  return (
    <Router>
      <div className="App">
        {isModalShown && (
          <ModalWindow modalToggler={modalWindowToggler}>
            <Button btnText="add todo" onClick={addTodoHandler} />
          </ModalWindow>
        )}
        <Sidebar modalToggler={modalWindowToggler} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<TodoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
