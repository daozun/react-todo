import "./index.css"
import { Radio } from 'antd';
import { useStore, clearAll, setActiveFlag, filterTodoList } from "../store";

export default function Footer() {
    const { todoList, activeList, completedList, activeFlag } = useStore();

    const changeRadio = (e) => {
        setActiveFlag(e.target.value);
        filterTodoList(e.target.value);
    }

    const Active = () => {
        if(activeFlag === "Active") {
            return (
              <span>
                {activeList.length} items left
              </span>
            )
        } else if(activeFlag === "Completed") {
            return (
              <span>
                {completedList.length} items left
              </span>
            )
        } else {
            return (
              <span>
                {todoList.length} items left
              </span>
            )
        }
    }

    return (
        <footer className="footer">
            <div>
                <Active />
            </div>
            <div>
                <Radio.Group defaultValue={activeFlag} size="small" onChange={(e) => changeRadio(e)}>
                    <Radio.Button value="All">All</Radio.Button>
                    <Radio.Button value="Active">Active</Radio.Button>
                    <Radio.Button value="Completed">Completed</Radio.Button>
                </Radio.Group>
            </div>
            <div className="clear-all" onClick={() => clearAll()}>
                { todoList.filter(item => item.completed).length > 0 && activeFlag !== "Active" ? '清除全部' : <p></p>}
            </div>
        </footer>
    )
}