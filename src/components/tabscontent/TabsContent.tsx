import React from "react";

type Props = {
  text: string | undefined;
};

export const TabsContent: React.FC<Props> = ({ text }) => {
  return <div>{text}</div>;
};
