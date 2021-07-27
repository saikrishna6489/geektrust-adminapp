import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import "./index.css";

const DataRow = (props) => {
  const {
    rowData,
    deleteRow,
    seteditRow,
    onClickCheakBox,
    checkedBoxesList,
    restrictedColumns,
    editable,
    removable,
  } = props;
  restrictedColumns.forEach((element) => {
    delete rowData[element];
  });
  const rowValues = Object.values(rowData);
  const isChecked = checkedBoxesList.includes(rowData.id);
  const rowClassName = isChecked ? "data-row-active" : "data-row";
  const deleteRowData = () => {
    deleteRow(rowData.id);
  };
  const editRowData = () => {
    seteditRow(rowData.id);
  };
  const onClickCheakBoxInput = () => {
    onClickCheakBox(rowData.id);
  };
  return (
    <tr className={rowClassName}>
      <td className="data-row-item data-row-cheak-item">
        <input
          type="checkbox"
          className="data-row-cheakbox"
          onChange={onClickCheakBoxInput}
          checked={isChecked}
        />
      </td>
      {rowValues.map((eachItem) => (
        <td className="data-row-item" key={`${eachItem}${rowValues.id}`}>
          {eachItem}
        </td>
      ))}
      <td className="data-row-item data-row-action-item">
        {editable && (
          <button onClick={editRowData} className="btn">
            <FiEdit />
          </button>
        )}
        {removable && (
          <button onClick={deleteRowData} className="btn">
            <AiOutlineDelete color="red" />
          </button>
        )}
      </td>
    </tr>
  );
};

export default DataRow;
