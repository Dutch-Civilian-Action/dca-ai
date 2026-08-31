import React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  /** Field label shown above the input. */
  label?: React.ReactNode;
  /** Helper text shown below the field. */
  hint?: React.ReactNode;
  /** Error message; turns the field red and replaces the hint. */
  error?: React.ReactNode;
  /** Leading adornment (e.g. "€" for donation amounts). */
  lead?: React.ReactNode;
  /** Stretch to container width. @default true */
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

/**
 * Text field for DCA forms (donation, contact, operational entry).
 * @startingPoint section="Forms" subtitle="Labelled text field with hint / error / adornment" viewport="700x150"
 */
export function Input(props: InputProps): JSX.Element;
