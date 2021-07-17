import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import "./index.css";

const DataRow = (props) => {
  const { rowData, deleteRow, seteditRow, onClickCheakBox } = props;
  const rowValues = Object.values(rowData);
  const deleteRowData = () => {
    deleteRow(rowData.id);
  };
  const editRowData = () => {
    seteditRow(rowData.id);
  };
  const onClickCheakBoxInput = ()=>{
    onClickCheakBox(rowData.id)
  }
  return (
    <tr className="data-row">
      <td className="data-row-item data-row-cheak-item">
        <input type="checkbox" onClick={onClickCheakBoxInput}/>
      </td>
      {rowValues.map((eachItem) => (
        <td className="data-row-item" key={`${eachItem}${rowValues.id}`}>
          {eachItem}
        </td>
      ))}
      <td className="data-row-item data-row-action-item">
        <button onClick={editRowData} className="btn">
          <FiEdit />
        </button>
        <button onClick={deleteRowData} className="btn">
          <AiOutlineDelete color="red" />
        </button>
      </td>
    </tr>
  );
};

export default DataRow;
