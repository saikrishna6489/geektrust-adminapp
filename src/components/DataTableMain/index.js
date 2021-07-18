import { Component } from "react";
import DataTable from "../DataTable";
import EditData from "../EditData";
import Search from "../Search";
import Pagination from "../Pagination";
import "./index.css";

class DataTableMain extends Component {
  state = {
    data: [],
    isLoading: true,
    editableData: {},
    displayedData: [],
    checkedBoxesList: [],
    showEditPage: false,
    currentPage: 1,
    pageData: [],
  };

  componentDidMount() {
    const { tableData } = this.props;
    this.setState({
      data: tableData,
      isLoading: false,
      editableData: tableData[0],
      displayedData: tableData,
    });
    this.filterDataByPagination();
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.filterDataByPagination();
    } else if (prevState.displayedData !== this.state.displayedData) {
      this.filterDataByPagination();
    }
  }

  deleteRow = (id) => {
    const { data } = this.state;
    const modifiedData = data.filter((eachItem) => eachItem.id !== id);
    this.setState({ data: modifiedData, displayedData: modifiedData });
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
    this.setState({ displayedData: filteredData, currentPage: 1 });
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
    });
  };

  filterDataByPagination = () => {
    const { currentPage, displayedData } = this.state;
    const { itemsPerPage } = this.props;
    const lastIndex = currentPage * itemsPerPage;
    const startIndex = lastIndex - itemsPerPage;
    const pageData = displayedData.slice(startIndex, lastIndex);
    this.setState({ pageData });
  };

  changeCurrentPage = (currentPage) => {
    this.setState({ currentPage });
  };

  appendToCheackedList = (selectedRowIds) => {
    const { checkedBoxesList } = this.state;
    const modifiedData = selectedRowIds.filter(
      (eachId) => !checkedBoxesList.includes(eachId)
    );
    this.setState({ checkedBoxesList: [...checkedBoxesList, ...modifiedData] });
  };

  removeFromCheackedList = (selectedRowIds) => {
    const { checkedBoxesList } = this.state;
    const modifiedData = checkedBoxesList.filter(
      (eachId) => !selectedRowIds.includes(eachId)
    );
    this.setState({ checkedBoxesList: modifiedData });
  };

  onHeaderCheakBoxClicked = (selectedRowIds, isChecked) => {
    if (isChecked) {
      this.appendToCheackedList(selectedRowIds);
    } else {
      this.removeFromCheackedList(selectedRowIds);
    }
  };

  renderTable = () => {
    const { pageData, checkedBoxesList } = this.state;
    const { restrictedColumns } = this.props;
    return (
      <>
        <DataTable
          tableData={pageData}
          deleteRow={this.deleteRow}
          seteditRow={this.seteditRow}
          onClickCheakBox={this.onClickCheakBox}
          checkedBoxesList={checkedBoxesList}
          onHeaderCheakBoxClicked={this.onHeaderCheakBoxClicked}
          restrictedColumns={restrictedColumns}
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

  renderEditTab = () => {
    const { editableData, showEditPage } = this.state;
    const { restrictedEditColumns } = this.props;
    return (
      <>
        {showEditPage ? (
          <div className="home-edit-module">
            <div className="home-edit-section">
              <EditData
                rowData={editableData}
                editRowData={this.editRowData}
                closeEditTab={this.closeEditTab}
                restrictedEditColumns={restrictedEditColumns}
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
    const { data, isLoading, displayedData, currentPage } = this.state;
    const { itemsPerPage } = this.props;

    return (
      <>
        <div className="home-container">
          <Search entiredata={data} onUpdateSearch={this.onUpdateSearch} />
          {isLoading ? (
            "...loading"
          ) : (
            <>
              <div className="home-section">{this.renderTable()}</div>
              {this.renderEditTab()}
              <Pagination
                totalItems={displayedData.length}
                itemsPerPage={itemsPerPage}
                changeCurrentPage={this.changeCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

DataTableMain.defaultProps = {
  restrictedColumns: [],
  restrictedEditColumns: [],
  itemsPerPage: 10,
  removable: true,
  editable:true
};

export default DataTableMain;
