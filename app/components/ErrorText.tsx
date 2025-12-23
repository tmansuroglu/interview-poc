import { Slot } from "@radix-ui/react-slot";
import { ComponentProps } from "react";

type ErrorTextProps = ComponentProps<"li"> & {
  asChild?: boolean;
};

export function ErrorText({ asChild, ...props }: ErrorTextProps) {
  const Comp = asChild ? Slot : "li";

  return <Comp className="text-xs text-red-500" {...props} />;
}
