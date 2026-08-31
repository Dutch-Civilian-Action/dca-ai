import React from "react";

export type CardTone = "default" | "subtle" | "info" | "calm" | "inverse";
export type CardPad = "none" | "sm" | "md" | "lg";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Surface tint. info = light grey-blue, calm = soft peach. @default "default" */
  tone?: CardTone;
  /** Lift with a subtle shadow. @default false */
  raised?: boolean;
  /** Inner padding. @default "md" */
  pad?: CardPad;
  /** Element/component to render as. @default "div" */
  as?: React.ElementType;
  children?: React.ReactNode;
}

/** Structured content surface for DCA layouts. */
export function Card(props: CardProps): JSX.Element;
