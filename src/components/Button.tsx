import React from "react";
import { cn } from "~/utils/helpers";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const FullButton = (props: Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(
        "inline-flex justify-center items-center h-[34px] py-[6px] px-[12px] rounded text-white",
        props.variant === "primary" ? "bg-[#1A7BB9] hover:bg-[#204d74] active:bg-[#204d74] text-white" : "",
        props.variant === "secondary" ? "bg-white text-blue border border-blue" : "",
        props.variant === "success" ? "bg-[#1AB394] hover:bg-[#18A689] active:bg-[#18A689] text-white" : "",
        props.variant === "danger" ? "bg-[#dc3545] hover:bg-[#c82333] active:bg-[#c82333] text-white" : "",
        props.variant === "warning" ? "bg-[#F7A54A] text-white" : "",
        props.disabled ? "opacity-50 cursor-not-allowed" : "",
      )}
    >{props.children}
    </button>
  )
}
