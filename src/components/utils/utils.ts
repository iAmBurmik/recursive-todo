import { ITodo } from '../types/types';

type SubTaskAddingProps = (id: string, array: ITodo[], task: ITodo) => ITodo[];

type RecursionProps = (id: string, array: ITodo[]) => ITodo[];

type SearchProps = (id: string, array: ITodo[]) => ITodo | null;

type CompleteTogglerProps = (array: ITodo[], state: boolean) => ITodo[];

type CountTasksProps = (array: ITodo[]) => number;

type ChangeTitleProps = (id: string, title: string, array: ITodo[]) => ITodo[];

type ChangeDescriptionProps = (
  id: string,
  description: string,
  array: ITodo[]
) => ITodo[];

export const subTaskAdding: SubTaskAddingProps = (id, array, task) => {
  return array.reduce((arr: ITodo[], item) => {
    if (item.id === id) {
      item.subtasks.push(task);
      arr.push(item);
    } else {
      arr.push({ ...item, subtasks: subTaskAdding(id, item.subtasks, task) });
    }

    return arr;
  }, []);
};

export const recursionFilter: RecursionProps = (id, array) => {
  return array.reduce((arr: ITodo[], item) => {
    if (item.id !== id) {
      arr.push({ ...item, subtasks: recursionFilter(id, item.subtasks) });
    }

    return arr;
  }, []);
};

export const recursionSearch: SearchProps = (id, array) => {
  for (let item of array) {
    if (item.id === id) {
      return item;
    }

    const subItem = recursionSearch(id, item.subtasks);

    if (subItem) {
      return subItem;
    }
  }

  return null;
};

export const recursionCompleteToggler: RecursionProps = (id, array) => {
  return array.reduce((arr: ITodo[], item) => {
    if (item.id !== id) {
      arr.push({
        ...item,
        subtasks: recursionCompleteToggler(id, item.subtasks),
      });
    } else {
      arr.push({
        ...item,
        completed: !item.completed,
        subtasks: subTasksCompleteToggler(item.subtasks, !item.completed),
      });
    }

    return arr;
  }, []);
};

export const subTasksCompleteToggler: CompleteTogglerProps = (array, state) => {
  return array.reduce((arr: ITodo[], item) => {
    arr.push({
      ...item,
      completed: state,
      subtasks: subTasksCompleteToggler(item.subtasks, state),
    });

    return arr;
  }, []);
};

export const countTasks: CountTasksProps = (array) => {
  let count = 0;

  function countRecursively(tasks: ITodo[]) {
    for (const task of tasks) {
      count++;
      countRecursively(task.subtasks);
    }
  }

  countRecursively(array);
  return count;
};

export const changeTodoTitle: ChangeTitleProps = (id, title, array) => {
  return array.map((item) => {
    if (item.id === id) {
      return { ...item, title };
    } else if (item.subtasks.length > 0) {
      return { ...item, subtasks: changeTodoTitle(id, title, item.subtasks) };
    }
    return item;
  });
};

export const changeTodoDescription: ChangeDescriptionProps = (
  id,
  description,
  array
) => {
  return array.map((item) => {
    if (item.id === id) {
      return { ...item, description };
    } else if (item.subtasks.length > 0) {
      return {
        ...item,
        subtasks: changeTodoDescription(id, description, item.subtasks),
      };
    }
    return item;
  });
};
