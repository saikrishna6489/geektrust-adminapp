import "./index.css";

const EditDataFeild = (props) => {
  const { feildKey, feildValue, onChangeValue } = props;
  const onValueChange = (e) => {
    const changedValue = e.target.value;
    onChangeValue(feildKey, changedValue);
  };
  const isDisabled = feildKey === "id";
  if (feildKey === "id") {
    return "";
  }
  return (
    <div className="edit-data-input-feild-section">
      <p className="edit-data-input-label">{feildKey}</p>
      <input
        type="text"
        className="edit-data-input-feild form-control"
        value={feildValue}
        onChange={onValueChange}
        disabled={isDisabled}
      />
    </div>
  );
};

export default EditDataFeild;
