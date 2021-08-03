import { Component } from "react";
import {HiOutlineSortDescending, HiOutlineSortAscending} from 'react-icons/hi'
import DataRow from "../DataRow";
import "./index.css";

class Home extends Component {
  state = {
    isChecked: false,
  };

  componentDidMount() {}

  onChangeCheakBox = (event) => {
    const { onHeaderCheakBoxClicked, tableData } = this.props;
    const selectedRowIds = tableData.map((eachRow) => eachRow.id);
    const isChecked = event.target.checked;
    onHeaderCheakBoxClicked(selectedRowIds, isChecked);
  };
  render() {
    const {
      tableData,
      deleteRow,
      seteditRow,
      onClickCheakBox,
      checkedBoxesList,
      restrictedColumns,
      removable,
      editable,
      sortByColumn
    } = this.props;

    if (tableData.length < 1) {
      return <p>no data found</p>;
    }

    const isChecked = tableData.every((eachRow) =>
      checkedBoxesList.includes(eachRow.id)
    );

    const tableHeaders = Object.keys(tableData[0]);
    const modifiedHeaders = tableHeaders.filter(
      (eachHeader) => !restrictedColumns.includes(eachHeader)
    );
    return (
      <div className="data-table-container">
        <table className="data-table-table table ">
          <thead>
            <tr className="data-table-header">
              <th className="data-table-header-action-item">
                <input
                  className="data-table-header-cheakbox"
                  type="checkbox"
                  onChange={this.onChangeCheakBox}
                  checked={isChecked}
                />
              </th>
              {modifiedHeaders.map((eachHeader) => (
                <th className="data-table-header-item" key={eachHeader}>
                  {eachHeader} 
                  <HiOutlineSortAscending onClick={()=>sortByColumn(eachHeader, "asc")} /> 
                  <HiOutlineSortDescending onClick={()=>sortByColumn(eachHeader, "des")} />
                </th>
              ))}
              {(removable || editable) && (
                <th className="data-table-header-action-item">action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.map((eachRow) => (
              <DataRow
                rowData={eachRow}
                removable={removable}
                editable={editable}
                key={eachRow.id}
                deleteRow={deleteRow}
                seteditRow={seteditRow}
                onClickCheakBox={onClickCheakBox}
                checkedBoxesList={checkedBoxesList}
                restrictedColumns={restrictedColumns}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Home;
