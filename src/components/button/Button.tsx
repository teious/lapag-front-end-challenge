import * as React from "react";
import './Button.css'

interface ButtonProps {
  onClick: React.MouseEventHandler;
  children: any;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export default ({
  onClick,
  className = "",
  children,
  disabled,
  style = {}
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={'Button ' + className}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};
