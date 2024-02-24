import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogin = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const login = async (email, password) => {
    try {
      if (!email || !password) {
        setErr(true);
        toast.error("please enter email and password");
      } else {
        setErr(false);
        const { data } = await axios.post(
          "https://mie-chat.onrender.com/api/auth/login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("uid", JSON.stringify(data.data));
          localStorage.setItem("token", JSON.stringify(data.token));
          navigate("/");
          window.location.reload();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return { login, err };
};

export default useLogin;
