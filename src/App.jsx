import { db } from "./utils/firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [select, setSelect] = useState();
  const [singleContact, setSingleContact] = useState({
    name: "",
    phone: 0,
    select: "",
  });
  const [contacts, setContacts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  // const handleAddContactSubmit = (e) => {
  // console.log(singleContact);
  // console.log(name);
  // console.log(phone);
  // console.log(select);
  // e.preventDefault();
  // };

  // read
  useEffect(() => {
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
  }, []);

  //write
  const writeToDatabase = (e) => {
    console.log(singleContact);
    e.preventDefault();
    setSingleContact({ ...singleContact, name, phone, select });
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      singleContact,
      uuid,
    });

    setName("");
    setPhone(0);
  };

  // console.log(contacts);

  //update
  // const handleUpdate = (name, phone, select) => {
  //   setIsEdit(true);
  //   setTempUuid(singleContact.uuid);
  //   setName(name.name);
  //   setPhone(phone.phone);
  //   setSelect(select.select);
  // };

  // const handleSubmitChange = () => {
  //   update(ref(db, `/${tempUuid}`), {
  //     singleContact,
  //     uuid: tempUuid,
  //   });

  //   setName("");
  //   setIsEdit(false);
  // };

  // delete
  const handleDelete = (singleContact) => {
    remove(ref(db, `/${singleContact.uuid}`));
  };

  return (
    <div className="grid gap-4 mt-10 lg:grid-cols-2 lg:gap-12 text-2xl font-bold text-center h-3/5">
      <form
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
        >
          <option defaultChecked>select an option</option>
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
      </form>
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
            {contacts?.map((item, index) => {
              console.log(item);
              return (
                <tr className="tableRows" key={index}>
                  <td>{item.singleContact.name}</td>
                  <td>{item.singleContact.phone}</td>
                  <td>{item.singleContact.select}</td>
                  <td>
                    <button
                      className="bg-amber-500 text-xs px-4 w-20 rounded-sm"
                      onClick={() => handleDelete(singleContact)}
                    >
                      delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-green-500 text-xs px-4 w-20 rounded-sm"
                      // onClick={() => handleUpdate(singleContact)}
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
