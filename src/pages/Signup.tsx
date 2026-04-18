import { useNavigate } from "react-router-dom";

import AuthCardForm from "@/components/AuthCardForm";
import { useAuth } from "@context/useAuth";
import { sileo } from "sileo";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await sileo.promise(
      signup({
        email,
        password,
        role: "USER",
      }).then(() => {
        navigate("/classes", { replace: true });
      }),
      {
        loading: { title: "Creating account..." },
        success: { title: "Account created" },
        error: {
          title: "Signup failed",
          description: "Please verify your information and try again.",
        },
      },
    );
  };

  return (
    <AuthCardForm
      footerLinkLabel="Log in"
      footerLinkTo="/login"
      footerText="Already have an account?"
      onSubmit={onSubmit}
      submitLabel="Sign up"
      subtitle="Create your account to continue."
      title="Signup"
    />
  );
};

export default Signup;
