import { Component } from "react";
import "./index.css";

class Search extends Component {
  state = {
    searchText: "",
  };

  cheakSearchText = (rowData, searchText) => {
    const rowValues = Object.values(rowData);
    for (let value of rowValues) {
      if (value.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  updateSearchData = (isSearchChanged) => {
    const { entiredata, onUpdateSearch } = this.props;
    const { searchText } = this.state
    const filteredData = entiredata.filter((eachRowData) =>
      this.cheakSearchText(eachRowData, searchText)
    );
    onUpdateSearch(filteredData, isSearchChanged);
  };

  onChangeSearch = (event) => {
    const searchText = event.target.value;
    this.setState({ searchText }, ()=>{this.updateSearchData()});
  };

  render() {
    const { searchText } = this.state;
    return (
      <div className="search-container">
        <input
          className="search-input form-control"
          type="text"
          value={searchText}
          placeholder="Search"
          onChange={this.onChangeSearch}
        />
      </div>
    );
  }
}
export default Search;
