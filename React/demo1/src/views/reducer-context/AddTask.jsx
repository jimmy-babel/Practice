import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TasksContext.jsx';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  return (
    <>
      <h2>AddTask.jsx</h2>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text||"reducer-context",
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;
