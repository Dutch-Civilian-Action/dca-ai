"""Synthetic checks for double-counting, clocks, holds and false completion."""
import importlib.util
from pathlib import Path
import unittest

path = Path(__file__).resolve().parents[1] / "scripts" / "validation_metrics.py"
spec = importlib.util.spec_from_file_location("validation_metrics", path)
metrics = importlib.util.module_from_spec(spec)
spec.loader.exec_module(metrics)


def item(identity, state="validation_needed", actionability="actionable"):
    return {
        "id": identity, "need": "Synthetic bounded question", "state": state,
        "actionability": actionability, "requested_at": "2026-09-01T12:00:00+02:00",
        "age_basis": "lower_bound", "sources": ["https://example.invalid/review"],
    }


def snapshot(items):
    return {
        "metric_version": metrics.VERSION, "captured_at": "2026-09-02T10:00:00Z",
        "scope": "Synthetic checks only", "coverage": "partial",
        "coverage_notes": ["No operational data"], "items": items,
    }


class MetricsTest(unittest.TestCase):
    def test_hold_unknown_and_closed_are_distinct(self):
        held = item("held", actionability="held_dependency")
        unknown = item("unknown", "unknown", "unknown")
        closed = item("closed", "closed")
        result = metrics.summarize(snapshot([held, unknown, closed]))
        self.assertEqual(result["validation_needed"], 1)
        self.assertEqual(result["held_dependency"], 1)
        self.assertEqual(result["reconciliation_pending_verified"], 0)
        self.assertEqual(result["unclassified_candidates"], 1)
        self.assertEqual(result["oldest_known_validation_age_days"], 1.0)
        self.assertNotIn("overdue", result)

    def test_same_item_from_two_owners_cannot_double_count(self):
        with self.assertRaises(ValueError):
            metrics.summarize(snapshot([item("same"), item("same")]))

    def test_unknown_request_clock_stays_unknown(self):
        row = item("undelivered", actionability="held_dependency")
        row.update(requested_at=None, age_basis="unknown")
        result = metrics.summarize(snapshot([row]))
        self.assertEqual(result["validation_age_unknown"], 1)
        self.assertIsNone(result["oldest_known_validation_age_days"])

    def test_pending_requires_evidence_and_uses_establishment_clock(self):
        row = item("confirmed", "reconciliation_pending")
        with self.assertRaises(ValueError):
            metrics.summarize(snapshot([row]))
        row.update(establishment_source="https://example.invalid/confirmation",
                   closure_gap="Required write failed verification",
                   established_at="2026-09-02T04:00:00Z")
        result = metrics.summarize(snapshot([row]))
        self.assertEqual(result["validation_needed"], 0)
        self.assertEqual(result["reconciliation_pending_verified"], 1)
        self.assertEqual(result["oldest_known_reconciliation_age_days"], 0.25)

    def test_naive_or_future_timestamps_are_rejected(self):
        for value in ["2026-09-01T12:00:00", "2026-09-03T12:00:00Z"]:
            row = item("bad-time")
            row["requested_at"] = value
            with self.assertRaises(ValueError):
                metrics.summarize(snapshot([row]))


if __name__ == "__main__":
    unittest.main()

