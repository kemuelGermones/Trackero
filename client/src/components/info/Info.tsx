import React from "react";

import { Card, CardDescription } from "../styles/UI/Card";

interface IInstruction {
  children: string;
}

function Info({ children }: IInstruction) {
  return (
    <Card $marginBottom={true}>
      <CardDescription $hasLimit={false}>{children}</CardDescription>
    </Card>
  );
}

export default React.memo(Info);
