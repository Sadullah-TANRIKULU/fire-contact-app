const Form = ({
  name,
  phone,
  select,
  setName,
  setPhone,
  setSelect,
  handleSubmitChange,
  isEdit,
  writeToDatabase,
}) => {
  return (
    <div className="addContactForm flex flex-col justify-center items-center bg-stone-200 p-4 rounded-sm ">
      <h1 className="text-center cursor-pointer my-8 ">
        {" "}
        &lt;David Moses <span className="text-green-500">Design/&gt;</span>{" "}
      </h1>
      {isEdit ? (
        <form
          className="addContact flex flex-col items-center justify-center gap-8"
          // onSubmit={handleAddContactSubmit}
          onSubmit={handleSubmitChange}
        >
          <input
            className="bg-amber-500/50 rounded-sm w-11/12"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            className="bg-amber-500/50 rounded-sm w-11/12 "
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <select
            className="bg-amber-500/50 rounded-sm cursor-pointer w-11/12"
            onChange={(e) => setSelect(e.target.value)}
            value={select}
          >
            <option>select an option</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="LGBTQ+">LGBTQ+</option>
            <option value="no comment">no comment</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 w-1/2 rounded-sm"

            // onClick={handleSubmitChange}
          >
            Update
          </button>
        </form>
      ) : (
        <form
          className="addContact flex flex-col items-center justify-center gap-8"
          // onSubmit={handleAddContactSubmit}
          onSubmit={writeToDatabase}
        >
          <input
            value={name}
            className="bg-amber-500/50 rounded-sm w-11/12"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={phone}
            className="bg-amber-500/50 rounded-sm w-11/12"
            type="number"
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            className="bg-amber-500/50 rounded-sm cursor-pointer w-11/12"
            onChange={(e) => setSelect(e.target.value)}
            value={select}
          >
            <option>select an option</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="LGBTQ+">LGBTQ+</option>
            <option value="no comment">no comment</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 w-1/2 rounded-sm"

            // onClick={handleSubmitChange}
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
