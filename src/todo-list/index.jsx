import "./index.css";
import ListGroup from 'react-bootstrap/ListGroup';
import TodoItem from './todo-item';
import { Input } from 'antd';
import { useState } from 'react';
import { addTodoList } from "../store";

export default function TodoList() {
    const [inputValue, setInputValue] = useState(''); 

    const handleAddTodoList = (e) => {
        addTodoList(e)
        setInputValue('');
    }

    return (
        <div className="todo-list">
            <Input placeholder="enter键添加" 
                onPressEnter={(e) => handleAddTodoList(e)} 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}  size="large"
            />
            <ListGroup className="list-group">
                <TodoItem />
            </ListGroup>
        </div>
    )
}