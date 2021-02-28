import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TimePickerField(props) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      dateFormat="HH:mm:ss"
      timeIntervals={15}
      selected={(field.value && new Date(field.value)) || null}
      showTimeSelect
      showTimeSelectOnly
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
  );
}

export default TimePickerField;
