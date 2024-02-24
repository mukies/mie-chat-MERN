import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useRegister = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const register = async (inputs) => {
    try {
      // VERIFY ALL THE FIELDS ARE NOT EMPTY
      if (
        !inputs.name ||
        !inputs.email ||
        !inputs.password ||
        !inputs.confirmPassword ||
        !inputs.gender
      ) {
        setErr(true);
        toast.error("please fill all the form fields.");
      } else {
        setErr(false);
        // CHECK PASSWORD AND CONFIRM-PASSWORD ARE MATCH

        if (inputs.password !== inputs.confirmPassword) {
          setErr(true);
          toast.error("password didnt match.");
        } else {
          // CHECK IF THE PASSWORD IS GREATER THAN 6 CHARACTER

          if (inputs.password.length < 6) {
            toast.error("password must be greater than 6 character.");
          } else {
            setErr(false);
            const { data } = await axios.post(
              "https://mie-chat.onrender.com/api/auth/register",
              {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                gender: inputs.gender,
              }
            );

            if (data.success) {
              toast.success("Account created.");
              navigate("/login");
            } else {
              toast.error(data.message);
            }
          }
        }
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  return { register, err };
};

export default useRegister;
