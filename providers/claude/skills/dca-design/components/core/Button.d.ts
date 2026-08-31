import React from "react";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual intent. primary = DCA Blue, accent = DCA Orange CTA. @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  /** Optional leading icon node. */
  iconLeft?: React.ReactNode;
  /** Optional trailing icon node. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Primary action control for DCA interfaces.
 * @startingPoint section="Core" subtitle="Buttons — primary, accent, secondary, ghost" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
