import { Component } from "react";
import EditDataFeild from "../EditDataFeild";
import {AiFillCloseCircle} from "react-icons/ai"
import "./index.css";

class EditData extends Component {
  state = {
    editedData: {},
    isLoading: true,
  };

  componentDidMount() {
    const { rowData } = this.props;
    this.setState({ editedData: rowData, isLoading: false });
  }

  onFeildChange = (feildKey, changedValue) => {
    const {editedData} = this.state
    let changedData = {...editedData}
    changedData[feildKey] = changedValue
    this.setState(prevState=>({editedData: changedData}));
  };

  editRow = () => {
    const { editRowData } = this.props;
    const { editedData } = this.state;
    editRowData(editedData);
  };

  closeEditTab = () => {
    const { closeEditTab } = this.props;
    closeEditTab();
  };

  renderFeilds = () => {
    const { editedData } = this.state;
    const { restrictedEditColumns } = this.props;
    const dataKeys = Object.keys(editedData);
    const modifiedKeys = dataKeys.filter((eachKey)=>(
      !restrictedEditColumns.includes(eachKey)
    ))
    return (
      <div className="edit-data-section">
        <div className="d-flex flex-row justify-content-end">
          <AiFillCloseCircle size="25" onClick={this.closeEditTab} className="edit-data-close-button" />
        </div>
        {modifiedKeys.map((eachKey) => (
          <EditDataFeild
            feildKey={eachKey}
            feildValue={editedData[eachKey]}
            onChangeValue={this.onFeildChange}
            key={eachKey}
          />
        ))}
        <div className="edit-data-action-section d-flex flex-row mt-3">
          <button
            className="edit-data-button btn btn-success flex-grow-1"
            type="button"
            onClick={this.editRow}
          >
            Edit Data
          </button>
          <button
            className="edit-data-button btn btn-info flex-grow-1"
            type="button"
            onClick={this.closeEditTab}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="edit-data-container">
        {isLoading ? "...loading" : this.renderFeilds()}
      </div>
    );
  }
}
export default EditData;
