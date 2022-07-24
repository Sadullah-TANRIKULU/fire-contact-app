import { db } from "./utils/firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [select, setSelect] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  // read
  useEffect(() => {
    try {
      onValue(ref(db), (snapshot) => {
        setContacts([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((singleContact) => {
            return setContacts((initialEmptyArray) => [
              ...initialEmptyArray,
              singleContact,
            ]);
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  //write
  
  
  const writeToDatabase = (e) => {
    e.preventDefault();
    
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      name,
      phone,
      select,
      uuid,
    });
    
    setName("");
    setPhone(0);
  };

  const handleSubmitChange = (item) => {
    item.preventDefault();
    update(ref(db, `/${item.uuid}`));

    setName("");
    setPhone(0);
    setIsEdit(false);
  };

  // console.log(contacts);

  //update
  const handleUpdate = (item) => {
    setName(item.name);
    setPhone(item.phone);
    setSelect(item.select);
    setIsEdit(true)
  };

  

  // delete
  const handleDelete = (item) => {
    // console.log(item.uuid);
    remove(ref(db, `/${item.uuid}`));
  };

  return (
    <div className="grid gap-4 mt-10 lg:grid-cols-2 lg:gap-12 text-2xl font-bold text-center h-3/5">
      { console.log(isEdit) }
      { isEdit ? (<form
        className="addContact border-2 border-indigo-500 flex flex-col items-center justify-center gap-8"
        // onSubmit={handleAddContactSubmit}
        onSubmit={handleSubmitChange}
      >
        <input
          value={name}
          className="bg-orange-600/50 border-black border-2 rounded-sm"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={phone}
          className="bg-black/50 border-orange-600 border-2 text-white rounded-sm "
          type="number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          className="bg-orange-600/50 cursor-pointer w-80 border-black border-2 rounded-sm"
          onClick={(e) => setSelect(e.target.value)}
          value={select}
          readOnly
        >
          <option >select an option</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="LGBTQ+">LGBTQ+</option>
          <option value="no comment">no comment</option>
        </select>
        <button
          type="submit"
          className="bg-green-700 px-4 w-40 rounded-sm"

          // onClick={handleSubmitChange}
        >
          Add
        </button>
      </form>) 
      : (<form
        className="addContact border-2 border-indigo-500 flex flex-col items-center justify-center gap-8"
        // onSubmit={handleAddContactSubmit}
        onSubmit={writeToDatabase}
      >
        <input
          value={name}
          className="bg-orange-600/50 border-black border-2 rounded-sm"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={phone}
          className="bg-black/50 border-orange-600 border-2 text-white rounded-sm "
          type="number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          className="bg-orange-600/50 cursor-pointer w-80 border-black border-2 rounded-sm"
          onClick={(e) => setSelect(e.target.value)}
          value={select}
          readOnly
        >
          <option >select an option</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="LGBTQ+">LGBTQ+</option>
          <option value="no comment">no comment</option>
        </select>
        <button
          type="submit"
          className="bg-green-700 px-4 w-40 rounded-sm"

          // onClick={handleSubmitChange}
        >
          Add
        </button>
      </form>) }
      
      <div className="contacts">
        <table className="table-fixed text-sm">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((item) => {
              // console.log(item);
              return (
                <tr className="tableRows" key={item.uuid}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.select}</td>
                  <td>
                    <button
                      className="bg-amber-500 text-xs px-4 w-20 rounded-sm"
                      onClick={() => handleDelete(item)}
                    >
                      delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-green-500 text-xs px-4 w-20 rounded-sm"
                      onClick={() => handleUpdate(item)}
                    >
                      update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
