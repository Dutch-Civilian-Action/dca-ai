import React from "react";

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The figure (string or number), e.g. "1,240" or "7 days". */
  value: React.ReactNode;
  /** Short uppercase label, e.g. "Generators delivered". */
  label: React.ReactNode;
  /** Optional supporting context line. */
  context?: React.ReactNode;
  /** Figure colour. @default "blue" */
  accent?: "blue" | "orange" | "black" | "delivered";
  /** @default "left" */
  align?: "left" | "center";
}

/**
 * A single concrete operational figure with label.
 * @startingPoint section="Operational" subtitle="Operational figures with mono numerals" viewport="700x150"
 */
export function Stat(props: StatProps): JSX.Element;
