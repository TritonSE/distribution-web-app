import React from "react";
import "./formstyle.css";

/**
 * RequiredAsterisk is the indicator for form inputs that are required. It
 * expects a prop `required`: if true, it will appear; otherwise, the component
 * will turn into null.
 */
export default function RequiredAsterisk(props) {
  if (props.required) {
    return <h3 className="form-input-label asterisk"> *</h3>;
  }
  return null;
}
