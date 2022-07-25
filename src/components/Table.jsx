const Table = ({ contacts, handleDelete, handleUpdate }) => {
  // console.log(contacts);
  return (
    <div className="tableDiv flex justify-center items-center ">
      <table className="table-fixed grid gap-2 text-base bg-stone-200 p-4 rounded-sm ">
        <thead className="grid gap-2 underline font-serif ">
          <tr className="grid grid-cols-5">
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="grid gap-2 text-sm">
          {contacts?.map((item) => {
            //   console.log(item);
            return (
              <tr className="tableRows grid grid-cols-5" key={item.uuid}>
                <td className="text-start">{item.name}</td>
                <td className="text-start" >{item.phone}</td>
                <td>{item.select}</td>
                <td>
                  <button
                    className="bg-amber-500 text-xs px-1 lg:px-5 lg:py-2 rounded-sm"
                    onClick={() => handleDelete(item)}
                  >
                    delete
                  </button>
                </td>
                <td>
                  <button
                    className="bg-green-500 text-xs px-1 lg:px-5 lg:py-2 rounded-sm"
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
  );
};

export default Table;
