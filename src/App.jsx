import { db } from "./utils/firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./App.css";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { ToastContainer } from "react-toastify";
import { notify } from "./utils/customToastify";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [select, setSelect] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [ID, setID] = useState("");

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
    console.log("writeToDatabase çalışıyor");
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
    notify('added to table');
  };

  const handleSubmitChange = (e) => {
    console.log("handleSubmitChange çalışıyor");
    e.preventDefault();
    console.log(ID);
    update(ref(db, `/${ID}`), {
      name,
      phone,
      select,
    });

    setName("");
    setPhone(0);
    setIsEdit(false);
    notify('updated');
  };

  // console.log(contacts);

  //update
  const handleUpdate = (item) => {
    console.log("update works");
    setName(item.name);
    setPhone(item.phone);
    setSelect(item.select);
    setID(item.uuid);
    setIsEdit(true);
  };

  // delete
  const handleDelete = (item) => {
    console.log(item.uuid);
    remove(ref(db, `/${item.uuid}`));
    notify('deleted');
  };

  return (
    <div className="grid gap-4 mt-10 lg:grid-cols-2 lg:gap-12 text-2xl font-bold text-center h-3/5">
      <Form
        contacts={contacts}
        writeToDatabase={writeToDatabase}
        isEdit={isEdit}
        handleSubmitChange={handleSubmitChange}
        setName={setName}
        setPhone={setPhone}
        setSelect={setSelect}
        name={name}
        phone={phone}
        select={select}
      />
      <div className="contacts">
        <Table
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          contacts={contacts}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
