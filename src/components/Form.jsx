const Form = ({ name, phone, select , setName, setPhone, setSelect, handleSubmitChange, isEdit, writeToDatabase}) => {
    return ( 
        <div className="addContactForm">
            {/* { console.log(isEdit) } */}
            
      { isEdit ? (<form
        className="addContact border-2 border-indigo-500 flex flex-col items-center justify-center gap-8"
        // onSubmit={handleAddContactSubmit}
        onSubmit={handleSubmitChange}
      >
        <input
          className="bg-orange-600/50 border-black border-2 rounded-sm"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          className="bg-black/50 border-orange-600 border-2 text-white rounded-sm "
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <select
          className="bg-orange-600/50 cursor-pointer w-80 border-black border-2 rounded-sm"
          onChange={(e) => setSelect(e.target.value)}
          value={select}
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
          Update
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
          onChange={(e) => setSelect(e.target.value)}
          value={select}
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
      
        </div>
     );
}
 
export default Form;