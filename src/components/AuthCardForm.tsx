import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Link } from "react-router-dom";

interface AuthCardFormValues {
  email: string;
  password: string;
}

interface AuthCardFormProps {
  title: string;
  subtitle: string;
  submitLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  onSubmit: (values: AuthCardFormValues) => Promise<void>;
}

export default function AuthCardForm({
  title,
  subtitle,
  submitLabel,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  onSubmit,
}: AuthCardFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    await onSubmit({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card>
        <Card.Header className="text-center">
          <Card.Title className="w-full text-center">{title}</Card.Title>
          <Card.Description className="w-full text-center">
            {subtitle}
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Form className="flex w-96 flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <Description>
                Must be at least 6 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>
            <div className="flex justify-center gap-2">
              <Button type="submit">{submitLabel}</Button>
              <Button type="reset" variant="secondary">
                Reset
              </Button>
            </div>
          </Form>
        </Card.Content>
        <Card.Footer>
          <Description className="w-full text-center">
            {footerText}{" "}
            <Link className="text-blue-500 underline" to={footerLinkTo}>
              {footerLinkLabel}
            </Link>
          </Description>
        </Card.Footer>
      </Card>
    </div>
  );
}
