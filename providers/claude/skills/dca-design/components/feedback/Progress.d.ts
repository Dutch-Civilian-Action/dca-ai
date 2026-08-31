import React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. @default 0 */
  value?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Optional label shown above the track. */
  label?: React.ReactNode;
  /** Formatted raised figure, e.g. "€12,400". */
  raised?: React.ReactNode;
  /** Formatted goal figure, e.g. "€20,000". */
  goal?: React.ReactNode;
  /** Fill colour. @default "orange" */
  tone?: "orange" | "blue" | "yellow" | "delivered";
  /** Show the "% funded" line below. @default true */
  showPercent?: boolean;
}

/**
 * Fundraising / goal progress bar with concrete raised vs goal figures.
 * @startingPoint section="Operational" subtitle="Fundraising goal progress bar" viewport="700x150"
 */
export function Progress(props: ProgressProps): JSX.Element;
