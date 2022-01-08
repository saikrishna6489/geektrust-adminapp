import React, { Component } from "react";
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
    itemsPerPage: 10,
    sortingColumnName: "id",
  };

  searchChild = React.createRef();

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
    const isCurrentPageChanged = prevState.currentPage !== this.state.currentPage
    const isDisplayedDataChanged = prevState.displayedData !== this.state.displayedData
    const isItemsPerPageChanged = prevState.itemsPerPage !== this.state.itemsPerPage
    if (isCurrentPageChanged || isDisplayedDataChanged || isItemsPerPageChanged) {
      this.filterDataByPagination();
    }
  }

  sortByColumn = (columnName, sortOrder)=>{
    console.log(columnName, sortOrder) 
    const {data} = this.state 
    const sortedData = data.sort((a,b)=>{
      const condition = sortOrder === "asc" ? a[columnName] > b[columnName] : a[columnName] < b[columnName]
      if(condition){
        return 1
      } else{
        return -1
      }
    })
    console.log(sortedData)
    this.setState({displayedData:sortedData},() => {
      this.searchChild.current.updateSearchData(false);
    })
  }

  deleteRow = (id) => {
    const { data } = this.state;
    const modifiedData = data.filter((eachItem) => eachItem.id !== id);
    this.setState({ data: modifiedData, displayedData: modifiedData }, () => {
      this.searchChild.current.updateSearchData(false);
    });
  };

  seteditRow = (id) => {
    const { data } = this.state;
    const editData = data.filter((eachItem) => eachItem.id === id);
    const editableObj = editData[0];
    this.setState({ editableData: editableObj, showEditPage: true });
  };

  editRowData = (rowData) => {
    const { data } = this.state;
    const modifiedData = data.map((eachrow) => {
      if (rowData.id === eachrow.id) {
        return { ...rowData };
      }
      return eachrow;
    });
    this.setState(
      { data: modifiedData, showEditPage: false, displayedData: modifiedData },
      () => {
        this.searchChild.current.updateSearchData(false);
      }
    );
  };

  onUpdateSearch = (filteredData, isSearchChanged) => {
    const { currentPage, itemsPerPage } = this.state;
    let updatedPage = isSearchChanged ? 1 : currentPage;
    const noOfPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage > noOfPages) {
      updatedPage = noOfPages;
    }
    if (currentPage === 0) {
      updatedPage = 1;
    }
    this.setState({ displayedData: filteredData, currentPage: updatedPage });
  };

  onClickCheakBox = (id) => {
    const { checkedBoxesList } = this.state;
    const index = checkedBoxesList.indexOf(id);
    console.log(id)
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
    this.setState(
      {
        data: modifiedData,
        checkedBoxesList: [],
        displayedData: modifiedData,
      },
      () => {
        this.searchChild.current.updateSearchData(false);
      }
    );
  };

  filterDataByPagination = () => {
    const { currentPage, displayedData, itemsPerPage} = this.state;
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

  onItemsPerPageChange = (event) => {
    this.setState({itemsPerPage: parseInt(event.target.value)})
  }

  renderTable = () => {
    const { pageData, checkedBoxesList, itemsPerPage } = this.state;
    const { restrictedColumns, removable, editable } = this.props;
    return (
      <>
        <DataTable
          tableData={pageData}
          removable={removable}
          editable={editable}
          checkedBoxesList={checkedBoxesList}
          restrictedColumns={restrictedColumns}
          deleteRow={this.deleteRow}
          seteditRow={this.seteditRow}
          onClickCheakBox={this.onClickCheakBox}
          onHeaderCheakBoxClicked={this.onHeaderCheakBoxClicked}
          sortByColumn={this.sortByColumn}
        />
        <div className="" style={{display: 'flex', justifyContent:'space-between'}}>
          {removable && (
            <button
              className="btn btn-danger"
              onClick={this.deleteAllCheckedItems}
            >
              Delete Selected
            </button>
          )}
          <div>
            <span>Rows per page : </span>
            <select className="rows-per-page-select" value={itemsPerPage} onChange={this.onItemsPerPageChange}>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>
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
    const { data, isLoading, displayedData, currentPage, itemsPerPage } = this.state;

    return (
      <>
        <div className="home-container">
          <Search
            entiredata={data}
            onUpdateSearch={this.onUpdateSearch}
            ref={this.searchChild}
          />
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
                siblingCount={1}
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
  removable: true,
  editable: true,
};

export default DataTableMain;
