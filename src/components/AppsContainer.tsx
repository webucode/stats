import React, { ReactNode } from "react";

export default function AppsContainer({ children }: { children: ReactNode }) {
  return <div className="container mx-auto">{children}</div>;
}
