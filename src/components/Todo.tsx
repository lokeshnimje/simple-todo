import { useState } from "react";
import TodoItems from "./TodoItems";
import { FaUndo, FaDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import Tooltip from "./Tooltip";

interface item {
  text: string;
  id: number;
  completed: boolean;
}
const headers = [
    { label: "Id", key: "id" },
    { label: "Task", key: "text" },
    { label: "Completed", key: "completed" }
  ];
function Todo() {
  const [inputvalue, setInputValue] = useState<string>("");
  const [todoData, setTodoData] = useState<item[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [todoId, setTodoId] = useState<number>(0);
  const [bin, setBin] = useState<item[]>([]);
  const [undoOperation, setUndoOperation] = useState<string[]>([])
  const handleInput = (val: string) => {
    setInputValue(val);
  };

  const handleAdd = () => {
    if (isEdit) {
      todoData.map((el: item) => {
        if (el.id == todoId) {
          el.text = inputvalue;
        }
      });
      setTodoData(todoData);
      setIsEdit(false);
      setTodoId(0);
      setUndoOperation([...undoOperation, 'edit'])
    } else {
      const payload: item = {
        text: inputvalue,
        id: Date.now(),
        completed: false,
      };
      setTodoData([...todoData, payload]);

      setUndoOperation([...undoOperation, 'add'])
    }
    setInputValue("");
  };
  const handleMarkDone = (id: number) => {
    todoData.map((el: item) => {
      if (el.id == id) {
        el.completed = !el.completed;
      }
    });
    setTodoData(todoData);
    setUndoOperation([...undoOperation, 'mark'])

  };
  const handleDeleteTodo = (id: number) => {
    setBin(todoData);
    const newData = todoData.filter((el: item) => el.id != id);
    setTodoData(newData);
    setInputValue("");
    setIsEdit(false);
    setUndoOperation([...undoOperation, 'delete'])
  };
  const handleEditTodo = (id: number) => {
    const todoObject = todoData.find((el: item) => el.id == id);
    setInputValue(todoObject ? todoObject.text : "");
    setIsEdit(true);
    setTodoId(id);
  };
  const handleUndo = () => {
    console.log(' undo press');
    setTodoData([...bin]);
    setBin([])
    undoOperation.pop()
    setUndoOperation(undoOperation);
  }
  return (
    <div className="todo-container">
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
             <Tooltip text={'Undo Delete'}>

            <button onClick={() => handleUndo()} className="undoIcon">
                <FaUndo style={{color: bin.length > 0 ?'#017BFE' : '#C6C7CA'}}/>
            </button>
            </Tooltip>
            <Tooltip text={'Download CSV'}>

            <button className="undoIcon" >
                <CSVLink data={todoData} headers={headers} target='_blank'>
                    <FaDownload  style={{ color: todoData.length > 0 ?'#017BFE' : '#C6C7CA'}}/>
                </CSVLink>
            </button>
            </Tooltip>
        </div>
      <h2>Todo App</h2>
      <input
        type="text"
        value={inputvalue}
        placeholder="Add item in your list..."
        onChange={(e) => handleInput(e.target.value)}
      />
      <button
        className="addButton"
        onClick={() =>
          !inputvalue ? alert("please enter item in input field") : handleAdd()
        }
      >
        {isEdit ? "Edit" : "Add"}
      </button>
      <ul>
        {todoData &&
          todoData.map((todo: item) => {
            return (
              <TodoItems
                key={todo.id}
                task={todo}
                handleMarkDone={handleMarkDone}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default Todo;
