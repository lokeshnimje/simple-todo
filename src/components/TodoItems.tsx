import React from "react";
import moment from 'moment';
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import Tooltip from "./Tooltip";

const styles = {
    iconStyle: {
        fontSize: "20px",
        color: "#017BFE",
        cursor: "pointer",
    },
    listStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        margin:' 10px 0',
        padding: '10px',
        borderRadius: '5px',
    },
    
}
interface Item {
  text: string;
  id: number;
  completed: boolean;
}
type TodoList = { 
  task: Item, 
  handleMarkDone: (id: number) => void,
  handleDeleteTodo: (id: number) => void, 
  handleEditTodo: (id: number) => void,
};

function TodoItems({ 
    task, 
    handleMarkDone,
    handleDeleteTodo, 
    handleEditTodo,
 }: TodoList): React.ReactElement {
  return (
    <li style={styles.listStyle}>
      <span
        onClick={() => handleMarkDone(task.id)}
        style={{ textDecoration: task.completed ? "line-through" : "none", cursor:'pointer' }}>
        {task.text}
      </span>
      <span
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip text={`Created at: ${moment(task.id).format('MMMM Do, h:mm:ss a')}`}>
            <AiOutlineInfoCircle style={styles.iconStyle} />
        </Tooltip>
        <Tooltip text={'Edit'}>
            <AiOutlineEdit style={styles.iconStyle}  onClick={() => handleEditTodo(task.id)}  />
        </Tooltip>
        <Tooltip text={'Delete'}>
            <AiOutlineDelete style={styles.iconStyle} onClick={() => handleDeleteTodo(task.id)} />
        </Tooltip>
      </span>
    </li>
  );
}

export default TodoItems;
