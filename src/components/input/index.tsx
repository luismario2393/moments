import { FormControl, FormGroup } from "./style";
import "../../index.css";
import { InputTypes } from "../../state/emun";
import { ChangeEvent } from "react";

type PropsType = {
  type: InputTypes;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;

  onChange?: (text: ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: PropsType) => {
  const {
    type,
    disabled,
    label,
    value,
    id,
    placeholder,
    name,
    error,
    onChange,
    autoComplete,
    required,
  } = props;
  return (
    <FormGroup
      labelCol={{ span: 24 }}
      rules={[{ required: required, message: error }]}
      name={name}
      label={label}
    >
      <FormControl
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e)}
        autoComplete={autoComplete}
      />
    </FormGroup>
  );
};

export default Input;
