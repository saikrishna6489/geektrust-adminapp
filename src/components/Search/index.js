import { Component } from "react";
import "./index.css";

class Search extends Component {

  state = {
    searchText : ""
  }

  cheakSearchText = (rowData, searchText) =>{
      const rowValues = Object.values(rowData)
      for(let value of rowValues){
          if(value.includes(searchText)){
              return true
          }
      }
      return false
  }

  onChangeSearch = (event)=>{
      const {entiredata, onUpdateSearch} = this.props
      const searchText = event.target.value
      const filteredData = entiredata.filter(eachRowData=>(
          this.cheakSearchText(eachRowData, searchText)
      ))
      onUpdateSearch(filteredData)
      this.setState({searchText})
  }

  render() {
    const {searchText} = this.state
    return (
      <div className="search-container">
        <input className="search-input form-control" type="text" value={searchText} placeholder="search" onChange={this.onChangeSearch}/>
      </div>
    );
  }
}
export default Search;
