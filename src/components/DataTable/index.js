import { Component } from "react";
import DataRow from "../DataRow";
import "./index.css";

class Home extends Component {
  render() {
    const { tableData, deleteRow, seteditRow, onClickCheakBox } = this.props;
    if(tableData.length<1){
      return <p>no data found</p>
    }
    const tableHeaders = Object.keys(tableData[0]);
    return (
      <div className="data-table-container">
        <table className="data-table-table table">
          <thead>
          <tr className="data-table-header">
            <th className="data-table-header-action-item">
              <p>  </p>
            </th>
            {tableHeaders.map((eachHeader) => (
              <th className="data-table-header-item" key={eachHeader}>
                {eachHeader}
              </th>
            ))}
            <th className="data-table-header-action-item">action</th>
          </tr>
          </thead>
          <tbody>
          {tableData.map((eachRow) => (
            <DataRow
              rowData={eachRow}
              key={eachRow.id}
              deleteRow={deleteRow}
              seteditRow={seteditRow}
              onClickCheakBox={onClickCheakBox}
            />
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Home;
