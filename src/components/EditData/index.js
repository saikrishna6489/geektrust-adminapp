import { Component } from "react";
import EditDataFeild from '../EditDataFeild'
import "./index.css";

class EditData extends Component {

  state = {
    data: {},
    isLoading: true
  }

  componentDidMount(){
    const {rowData} = this.props 
    this.setState({data:rowData, isLoading:false})
  }

  componentDidUpdate(prevProp, prevState){
    if(prevProp.rowData !== this.props.rowData){
      this.setState({data: this.props.rowData})
    }
  }

  onFeildChange = (feildKey, changedValue)=>{
    const {data} = this.state
    data[feildKey] = changedValue 
    this.setState({data})
  }

  editRow = ()=>{
    const {editRowData} = this.props
    const {data} = this.state
    editRowData(data)
  }

  closeEditTab = ()=>{
    const {closeEditTab} = this.props
    closeEditTab()
  }

  renderFeilds = ()=>{
    const {data} = this.state
    const dataKeys = Object.keys(data)
    return(
      <div className="edit-data-section">
        {dataKeys.map(eachKey => (
          <EditDataFeild feildKey={eachKey} feildValue={data[eachKey]} onChangeValue={this.onFeildChange} key={eachKey}/>
        ))}
        <button className="edit-data-button btn btn-success" type="button" onClick={this.editRow}>Edit Data</button>
        <button className="edit-data-button btn btn-info" type="button" onClick={this.closeEditTab}>Close</button>
      </div>
    )
  }

  render() {
      const {isLoading} = this.state
    return (
      <div className="edit-data-container">
        {isLoading? "...loading" : this.renderFeilds()}
      </div>
    );
  }
}
export default EditData;
