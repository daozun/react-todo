import ListGroup from 'react-bootstrap/ListGroup';
import { Checkbox, Input } from 'antd';
import { useState } from 'react';
import { deleteTodoList, setTodoList, useStore, setIsCheckBox, setTodo } from '../store';

export default function TodoItem() { 
    const { activeFlag, todoList, activeList, completedList } = useStore();
    const [ value, setValue ] = useState('');

    const DeleteWord = ({ completed, id }) => {
        if(completed) {
            return(
                <span className="delete-word" onClick={() => deleteTodoList(id)} >
                删除
              </span>
            )
        }
    }

    const TodoItem = (todo) => {
        if(todo.isCheckBox) {
            return(
                <span>
                    <Checkbox checked={todo.completed} onChange={() => setTodoList(todo.id)}>
                    <span className={todo.completed ? 'line-through' : ''}>
                        {todo.text}
                        </span>
                    </Checkbox>
                    <DeleteWord completed={todo.completed} id={todo.id}  />
                </span>
            )
        } else {
            return(
                <Input defaultValue={value} onChange={(e) => setValue(e.target.value)} onBlur={() => { handleBlur(todo.id) }} />
            )
        }
    }

    const handleBlur = (id) => {
        setTodo(id, value);
    }

    const handleDbClick = (todo) => {
        setValue(todo.text);
        setIsCheckBox(todo.id, false);
    }

    let list = [];

    if(activeFlag === 'Active') {
        list = activeList;
    } else if(activeFlag === 'Completed') {
        list = completedList;
    } else {
        list = todoList
    }

    const todoItems = list.map((todo) => (
        <ListGroup.Item className="todo-item" key={todo.id} onDoubleClick={() => handleDbClick(todo)}>
            {TodoItem(todo)}
        </ListGroup.Item>
    ));

    return (
        <div>
            {todoItems}
        </div>
    )
}