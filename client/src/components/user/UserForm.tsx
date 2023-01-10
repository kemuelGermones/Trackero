import { useState } from "react";
import {
  Card,
  CardTitle,
  CardDivider,
  CardFooterText,
} from "../styles/UI/Card";
import Label from "../styles/UI/Label";
import Button from "../styles/UI/Button";
import Input from "../styles/UI/Input";
import Select from "../styles/UI/Select";

function UserForm() {
  const [isLogin, setIsLogin] = useState(true);

  const isLoginToggler = () => {
    setIsLogin((state) => !state);
  };

  return (
    <Card $width="30rem">
      <CardTitle>{!!isLogin ? "Login" : "Sign Up"}</CardTitle>
      <CardDivider />
      <Label htmlFor="email">Your email</Label>
      <Input id="email" type="email" placeholder="Email" />
      <Label htmlFor="password">Your password</Label>
      <Input id="password" type="password" placeholder="Password" />
      {!isLogin ? (
        <>
          <Label htmlFor="username">Your username</Label>
          <Input id="username" type="text" placeholder="Username" />
          <Label htmlFor="role">Your role</Label>
          <Select>
            <option>Administrator</option>
            <option>Developer</option>
          </Select>
        </>
      ) : null}
      <Button>{!!isLogin ? "Login" : "Sign Up"}</Button>
      <CardFooterText onClick={isLoginToggler}>
        {!!isLogin ? "Don't have an account?" : "Have an account?"}
      </CardFooterText>
    </Card>
  );
}

export default UserForm;
