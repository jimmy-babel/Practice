import { useState } from "react";

function useFormInput(initialValue) { //自定义hook
  const [value,setValue]= useState(initialValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  const inputProps = {
    value,
    onChange,
  }
  return inputProps;
}

export function FullNameCmpt() {
  const firstNameProps = useFormInput('Jimmy');
  const lastNameProps = useFormInput('Luo');

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p><b>Good morning, {firstNameProps.value} {lastNameProps.value}.</b></p>
    </>
  );
}