import { db } from "./utils/firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          return setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  //write
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      todo,
      uuid,
    });

    setTodo("");
  };

  //update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      todo,
      uuid: tempUuid,
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };

  return (
    <div className="text-2xl font-bold text-center ">
      <input
        value={todo}
        className="bg-orange-600 border-black"
        type="text"
        onChange={handleTodoChange}
      />
      {isEdit ? (
        <div className="">
          <button className="bg-stone-500" onClick={handleSubmitChange}>
            submit change
          </button>
          <button className="bg-blue-500 m-2" onClick={() => setIsEdit(false)}>
            X
          </button>
        </div>
      ) : (
        <button className="bg-stone-500" onClick={writeToDatabase}>
          submit
        </button>
      )}

      {todos.map((todo, index) => (
        <div className="flex justify-center items-center gap-6" key={index}>
          <h1 className="bg-rose-500">{todo.todo}</h1>
          <button className="bg-green-500" onClick={() => handleUpdate(todo)}>
            update
          </button>
          <button className="bg-amber-500" onClick={() => handleDelete(todo)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
