import React from "react";

export type BadgeTone = "neutral" | "blue" | "orange" | "yellow" | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Brand colour. @default "neutral" */
  tone?: BadgeTone;
  /** Tinted background + dark text (vs solid fill). @default true */
  soft?: boolean;
  children?: React.ReactNode;
}

/** Compact uppercase label for categories, counts and emphasis. */
export function Badge(props: BadgeProps): JSX.Element;
