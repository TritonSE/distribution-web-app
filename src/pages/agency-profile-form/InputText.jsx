import React, { Component } from "react";
import RequiredAsterisk from "./RequiredAsterisk";
import "./formstyle.css";

class InputText extends Component {
  onBlur = (event) => {
    const { stateKey, onChange } = this.props;
    onChange(stateKey, event.target.value);
  }

  render() {
    let groupClass = "form-input";
    if (!this.props.leftmost) {
      groupClass += " form-col-gutter";
    }
    let boxClass = "form-input-box selection-choice";
    if (this.props.wide) {
      boxClass += " form-input-box-wide";
    }

    return (
      <div className={groupClass}>
        <label className="form-input-label">
          {this.props.label}
          <RequiredAsterisk required={this.props.required} />
        </label>
        <input
          type="text"
          className={boxClass}
          value={this.props.value}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

export default InputText;
