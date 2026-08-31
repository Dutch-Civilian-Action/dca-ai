import React from "react";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tick + text colour. @default "blue" */
  color?: "blue" | "orange" | "yellow" | "muted";
  /** Show the leading colour tick. @default true */
  tick?: boolean;
  children?: React.ReactNode;
}

/** Uppercase overline label that signals section / operational domain. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
