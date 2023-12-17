import { Input } from "../../components";
import { InputTypes } from "../../state/emun";

const Register = () => {
  return <Input type={InputTypes.text} id="name" label="Nombre" name="name" />;
};

export default Register;
