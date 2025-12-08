import * as React from "react";

import { cn } from "./utils";

function Calendar({ className, children, ...props }) {
  return (
    <div data-slot="calendar" className={cn("w-full", className)} {...props}>
      {children}
    </div>
  );
}

export { Calendar };
