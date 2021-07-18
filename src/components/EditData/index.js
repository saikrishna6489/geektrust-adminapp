import { Component } from "react";
import EditDataFeild from "../EditDataFeild";
import {AiFillCloseCircle} from "react-icons/ai"
import "./index.css";

class EditData extends Component {
  state = {
    data: {},
    isLoading: true,
  };

  componentDidMount() {
    const { rowData } = this.props;
    this.setState({ data: rowData, isLoading: false });
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.rowData !== this.props.rowData) {
      this.setState({ data: this.props.rowData });
    }
  }

  onFeildChange = (feildKey, changedValue) => {
    const { data } = this.state;
    data[feildKey] = changedValue;
    this.setState({ data });
  };

  editRow = () => {
    const { editRowData } = this.props;
    const { data } = this.state;
    editRowData(data);
  };

  closeEditTab = () => {
    const { closeEditTab } = this.props;
    closeEditTab();
  };

  renderFeilds = () => {
    const { data } = this.state;
    const dataKeys = Object.keys(data);
    return (
      <div className="edit-data-section">
        <div className="d-flex flex-row justify-content-end">
          <AiFillCloseCircle size="25" onClick={this.closeEditTab} className="edit-data-close-button" />
        </div>
        {dataKeys.map((eachKey) => (
          <EditDataFeild
            feildKey={eachKey}
            feildValue={data[eachKey]}
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
