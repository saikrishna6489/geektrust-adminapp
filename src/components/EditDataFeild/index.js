import './index.css'

const EditDataFeild=(props)=>{
    const {feildKey, feildValue, onChangeValue} = props
    const onValueChange = (e)=>{
        const changedValue = e.target.value
        onChangeValue(feildKey, changedValue)
    }
    return(
      <div className="edit-data-input-feild-section">
        <p className="edit-data-input-label">{feildKey}</p>
        <input type="text" className="edit-data-input-feild" value={feildValue} onChange={onValueChange}/>
      </div>
    )
}

export default EditDataFeild