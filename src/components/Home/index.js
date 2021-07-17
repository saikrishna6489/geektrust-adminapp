import { Component } from "react";
import DataTable from "../DataTable";
import EditData from "../EditData";
import Search from "../Search";
import "./index.css";

class Home extends Component {
  state = {
    data: [],
    isLoading: true,
    editableData: {},
    displayedData: [],
    checkedBoxesList: [],
    showEditPage: false,
  };

  componentDidMount() {
    this.getDatafromApi();
  }

  getDatafromApi = async () => {
    const apiQuery =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const response = await fetch(apiQuery);
    let jsonData = [];
    if (response.ok === true) {
      jsonData = await response.json();
    }
    this.setState({
      data: jsonData,
      isLoading: false,
      editableData: jsonData[0],
      displayedData: jsonData,
    });
  };

  deleteRow = (id) => {
    const { data } = this.state;
    const modifiedData = data.filter((eachItem) => eachItem.id !== id);
    this.setState({ data: modifiedData , displayedData:modifiedData});
  };

  seteditRow = (id) => {
    const { data } = this.state;
    const editData = data.filter((eachItem) => eachItem.id === id);
    this.setState({ editableData: editData[0], showEditPage: true });
  };

  editRowData = (rowData) => {
    const { data } = this.state;
    const rowDataId = rowData.id;
    const editData = data.filter((eachItem) => eachItem.id === rowDataId);
    editData[rowDataId] = rowData;
    this.setState({ data, showEditPage: false });
  };

  onUpdateSearch = (filteredData) => {
    this.setState({ displayedData: filteredData });
  };

  onClickCheakBox = (id) => {
    const { checkedBoxesList } = this.state;
    const index = checkedBoxesList.indexOf(id);
    if (index > -1) {
      checkedBoxesList.splice(index, 1);
    } else {
      checkedBoxesList.push(id);
    }
    this.setState({ checkedBoxesList });
  };

  deleteAllCheckedItems = () => {
    const { checkedBoxesList, data } = this.state;
    const modifiedData = data.filter((eachRow) => {
      return !checkedBoxesList.includes(eachRow.id);
    });
    this.setState({
      data: modifiedData,
      checkedBoxesList: [],
      displayedData: modifiedData,
    });
  };

  renderTable = () => {
    const { displayedData } = this.state;
    return (
      <>
        <DataTable
          tableData={displayedData}
          deleteRow={this.deleteRow}
          seteditRow={this.seteditRow}
          onClickCheakBox={this.onClickCheakBox}
        />
        <button className="btn btn-danger" onClick={this.deleteAllCheckedItems}>
          Delete All
        </button>
      </>
    );
  };

  closeEditTab = () => {
    this.setState({ showEditPage: false });
  };

  renderEditPage = () => {
    const { editableData, showEditPage } = this.state;
    return (
      <>
        {showEditPage ? (
          <div className="home-edit-module">
            <div className="home-edit-section">
              <EditData
                rowData={editableData}
                editRowData={this.editRowData}
                closeEditTab={this.closeEditTab}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  render() {
    const { data, isLoading } = this.state;

    return (
      <>
        <div className="home-container">
          <Search entiredata={data} onUpdateSearch={this.onUpdateSearch} />
          <div className="home-section">
            {isLoading ? "...loading" : this.renderTable()}
          </div>
          {isLoading ? "...loading" : this.renderEditPage()}
        </div>
      </>
    );
  }
}
export default Home;
