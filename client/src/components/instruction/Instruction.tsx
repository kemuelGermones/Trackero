import { ReactNode } from "react";
import { Card, CardBody, CardDescription } from "../styles/UI/Card";

interface IInstruction {
  children: ReactNode;
}

function Instruction({ children }: IInstruction) {
  return (
    <Card $marginBottom={true}>
      <CardBody>
        <CardDescription $hasLimit={false}>{children}</CardDescription>
      </CardBody>
    </Card>
  );
}

export default Instruction;
