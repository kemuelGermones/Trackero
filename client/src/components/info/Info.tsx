import React from "react";

import { Card } from "../styles/UI/Card";

interface IInstruction {
  children: string;
}

function Info({ children }: IInstruction) {
  return <Card $margin="0 0 1rem 0">{children}</Card>;
}

export default React.memo(Info);
