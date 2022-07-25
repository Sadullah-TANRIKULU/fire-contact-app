const Table = ({ contacts, handleDelete, handleUpdate }) => {
    // console.log(contacts);
    return ( 
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
            //   console.log(item);
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
     );
}
 
export default Table;