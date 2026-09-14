#!/usr/bin/env python3
"""Summarize an evidence-reviewed queue snapshot; never infer state from raw flags."""
import json
import sys
from datetime import datetime

VERSION = "dca-validation-metrics/1"
STATES = {"validation_needed", "reconciliation_pending", "closed", "unknown"}
ACTIONS = {"actionable", "held_dependency", "needs_preparation", "unknown"}
BASES = {"verified", "lower_bound", "unknown"}


def timestamp(value):
    result = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if result.tzinfo is None or result.utcoffset() is None:
        raise ValueError("Timestamps must include a timezone")
    return result


def summarize(snapshot):
    if snapshot.get("metric_version") != VERSION:
        raise ValueError("Unsupported metric version")
    if snapshot.get("coverage") not in {"complete", "partial"}:
        raise ValueError("Declare complete or partial coverage")
    if not snapshot.get("scope") or not snapshot.get("coverage_notes"):
        raise ValueError("Scope and coverage evidence are required")
    at = timestamp(snapshot["captured_at"])
    seen = set()
    counts = {state: 0 for state in STATES}
    held = prepared = 0
    ages = []
    pending_ages = []
    unknown_request_age = unknown_establishment_age = 0
    lower_bound_ages = 0
    for item in snapshot["items"]:
        identity = item["id"]
        if not identity or identity in seen:
            raise ValueError("Every bounded need must have one unique stable ID")
        seen.add(identity)
        if not item.get("need") or not item.get("sources"):
            raise ValueError("Every item needs wording and source references")
        state = item["state"]
        if state not in STATES or item["actionability"] not in ACTIONS:
            raise ValueError("Unknown state or actionability")
        if item["age_basis"] not in BASES:
            raise ValueError("Unknown age basis")
        if bool(item.get("requested_at")) != (item["age_basis"] != "unknown"):
            raise ValueError("Request timestamp and age basis must agree")
        counts[state] += 1
        if item.get("requested_at"):
            age = (at - timestamp(item["requested_at"])).total_seconds() / 86400
            if age < 0:
                raise ValueError("Request cannot follow capture")
        else:
            age = None
        if state == "validation_needed":
            held += item["actionability"] == "held_dependency"
            prepared += item["actionability"] == "needs_preparation"
            if age is None:
                unknown_request_age += 1
            else:
                ages.append(age)
                lower_bound_ages += item["age_basis"] == "lower_bound"
        if state == "reconciliation_pending":
            if not item.get("establishment_source"):
                raise ValueError("Pending reconciliation requires establishment evidence")
            if not item.get("closure_gap"):
                raise ValueError("Pending reconciliation requires a verified closure gap")
            if item.get("established_at"):
                pending_age = (at - timestamp(item["established_at"])).total_seconds() / 86400
                if pending_age < 0:
                    raise ValueError("Establishment cannot follow capture")
                pending_ages.append(pending_age)
            else:
                unknown_establishment_age += 1
    return {
        "metric_version": VERSION,
        "captured_at": snapshot["captured_at"],
        "coverage": snapshot["coverage"],
        "scope": snapshot["scope"],
        "validation_needed": counts["validation_needed"],
        "held_dependency": held,
        "needs_preparation": prepared,
        "validation_age_known": len(ages),
        "validation_age_unknown": unknown_request_age,
        "validation_age_lower_bound_count": lower_bound_ages,
        "oldest_known_validation_age_days": round(max(ages), 2) if ages else None,
        "reconciliation_pending_verified": counts["reconciliation_pending"],
        "reconciliation_age_known": len(pending_ages),
        "reconciliation_age_unknown": unknown_establishment_age,
        "oldest_known_reconciliation_age_days": round(max(pending_ages), 2) if pending_ages else None,
        "unclassified_candidates": counts["unknown"],
        "closed": counts["closed"],
        "comparison_status": "No trend inferred; compare only matching scope and metric version",
    }


if __name__ == "__main__":
    print(json.dumps(summarize(json.load(sys.stdin)), indent=2))

