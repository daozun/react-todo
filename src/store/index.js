import { create } from 'zustand'

export const useStore = create(() => ({
    todoList:[
        { id: 1, text: 'WBG', completed: false, isCheckBox: true },
        { id: 2, text: 'JDG', completed: false, isCheckBox: true },
        { id: 3, text: 'LNG', completed: false, isCheckBox: true },
        { id: 4, text: 'BLG', completed: false, isCheckBox: true },
    ],
    activeList: [],
    completedList: [],
    activeFlag: "All",
}))

export const deleteTodoList = (id) => useStore.setState((state) => {
    const todoList = state.todoList.filter((item) => item.id !== id);
    
    const activeList = todoList.filter((todo) => !todo.completed);
    const completedList = todoList.filter((todo) => todo.completed);

    return {
        ...state,
        todoList: todoList,
        activeList: activeList,
        completedList: completedList
    }
})

export const addTodoList = (e) => useStore.setState((state) => {
    if (e.keyCode === 13 && e.target.value.trim() !== '') {     
        state.todoList.push({
            id: Math.random(),
            text: e.target.value,
            completed: false,
            isCheckBox: true
        })
    }

    const activeList = state.todoList.filter((todo) => !todo.completed);
    const completedList = state.todoList.filter((todo) => todo.completed);

    return {
        ...state,
        todoList: state.todoList,
        activeList: activeList,
        completedList: completedList
    }
})

export const setTodoList = (id) => useStore.setState((state) => {
    state.todoList.forEach((item) => {
        if (item.id === id) {
            item.completed = !item.completed
        }
    })

    const activeList = state.todoList.filter((todo) => !todo.completed);
    const completedList = state.todoList.filter((todo) => todo.completed);

    return {
        ...state,
        todoList: state.todoList,
        activeList: activeList,
        completedList: completedList
    }
})

export const clearAll = () => useStore.setState((state) => {
    const todoList = state.todoList.filter((item) => !item.completed);

    const activeList = state.todoList.filter((todo) => !todo.completed);
    const completedList = state.todoList.filter((todo) => todo.completed);

    return {
        ...state,
        todoList: todoList,
        activeList: activeList,
        completedList: completedList
    }
})

export const setActiveFlag = (value) => useStore.setState((state) => {
    return {
        ...state,
        activeFlag: value
    }
})

export const filterTodoList = (value) => useStore.setState((state) => {
    let activeList = [];
    let completedList = [];

    if(value === "Active") {
        activeList = state.todoList.filter((item) => !item.completed);
    } else if (value === "Completed") {
        completedList = state.todoList.filter((item) => item.completed);
    } else {
        activeList = [];
        completedList = [];
    }

    return {
        ...state,
        todoList: state.todoList,
        activeList: activeList,
        completedList: completedList,        
        completed: completedList.length,
    }
})

export const setIsCheckBox = (id, value) => useStore.setState((state) => {
    state.todoList.forEach((item) => {
        if (item.id === id) {
            item.isCheckBox = value;
        }
    })

    return {
        ...state,
        todoList: state.todoList,
    }
})

export const setTodo = (id, value) => useStore.setState((state) => {
    state.todoList.forEach((item) => {
        if (item.id === id) {
            item.text = value;
        }

        item.isCheckBox = true;
    })

    return {
        ...state,
        todoList: state.todoList,
    }
})