import React from "react";

export type TraceStatus = "need" | "planned" | "progress" | "delivered" | "impact";

export interface TraceStep {
  /** Stage name, e.g. "Need", "Action", "Delivery", "Impact". */
  stage: React.ReactNode;
  /** Short concrete line, e.g. "Kharkiv hospital needed 4 generators". */
  detail: React.ReactNode;
  /** Operational status — drives the colour. @default "planned" */
  status?: TraceStatus;
}

export interface TraceProps extends React.OlHTMLAttributes<HTMLOListElement> {
  /** Ordered operational steps. */
  steps: TraceStep[];
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
}

/**
 * The signature DCA operational flow: Need → Action → Delivery → Impact.
 * @startingPoint section="Operational" subtitle="Need → Action → Delivery → Impact trace" viewport="700x180"
 */
export function Trace(props: TraceProps): JSX.Element;
