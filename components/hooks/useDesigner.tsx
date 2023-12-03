"use client";

import { useContext } from "react";
import { DesignerContext } from "../context/DesignerContext";

function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner должен использоваться внутри DesignerContext");
  }

  return context;
}

export default useDesigner;
