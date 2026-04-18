import { useNavigate } from "react-router-dom";

import AuthCardForm from "@/components/AuthCardForm";
import { useAuth } from "@context/useAuth";
import { sileo } from "sileo";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await sileo.promise(
      login({ email, password }).then(() => {
        navigate("/protected", { replace: true });
      }),
      {
        loading: { title: "Signing in..." },
        success: { title: "Welcome back" },
        error: {
          title: "login failed",
          description: "Please check your credentials and try again.",
        },
      },
    );
  };

  return (
    <AuthCardForm
      footerLinkLabel="Sign up"
      footerLinkTo="/signup"
      footerText="Don't have an account?"
      onSubmit={onSubmit}
      submitLabel="Sign in"
      subtitle="Enter your email to sign in."
      title="Login"
    />
  );
};

export default Login;
