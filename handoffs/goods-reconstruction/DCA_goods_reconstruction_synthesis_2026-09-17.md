# DCA goods and shipment history 2026 — reconstruction synthesis (interim)

**Version.** v3 (17 Sep 2026), PR export repair based on Claude’s supplied v2. [v1 is preserved in PR #42’s original commit](https://github.com/Dutch-Civilian-Action/dca-ai/tree/df16b9c64362508aad001b7c6627290d5d095200). This remains the original 37-source historical snapshot with corrected interpretations; 16 additional run evidence records are indexed for the next reconstruction pass, not silently incorporated into these results.

**What this is.** A source-first reconstruction of what DCA's documents and messages show about goods received, packed, allocated, dispatched and handed over in 2026, compared with James's reporting workbook and Kees's reconstruction workbook. It was produced on 17 September 2026 in Kees's Claude account following the Anja–Kees huddle of 16 September, under the DCA Reconstruction & Reconciliation Method and the Full Historical Domain Reconstruction workflow (read from the attached `dca-ai` / `dca-architecture` repositories).

**Status and authority.** Interim, not complete. Corrected on 17 Sep 2026 after independent review: pallet matches are candidate matches, not identities; James's May/June differences are proposed readings pending his confirmation; Mission 36 carries a 507-vs-527 kg source-internal discrepancy; correction history is preserved in the Airtable objects' notes. Self-evaluation outcome: **insufficient** — material sources are unread or unsupplied (Part 6). Nothing here is validated organisational truth; nothing in any DCA operational document, James's workbook or Kees's workbook has been changed. No valuation, rate, euro total or ANBI position is produced. Staging trace: [RUN-receXkVSVZTfjD1j6](https://airtable.com/appZ1Fv0YtZPbBbWa/tblTS9OEq5PTSFK4S/receXkVSVZTfjD1j6) in *DCA Evidence & Reconciliation*. At PR repair, the run links 53 evidence records and 28 objects; this snapshot uses the original 37 sources. The 28 objects reference 84 distinct Evidence_Links IDs. The earlier report of 88 links has not been reconciled. This PR repair changes the exported files only.

**Audience and action.** Kees, James and Anja. Part 7 contains candidate topics, not active requests. First reconcile existing evidence, review relevant remaining sources, assess candidate sufficiency and check prior answers/validation threads. Only the remaining operational delta should be put to the person who knows it. Anja: see [the handoff](HANDOFF.md) for scope and run mechanics.

**Labels used.** *Supported* = stated in a primary document or contemporaneous message. *Validation-pending* = supported but not yet confirmed by the person who did the work. *Disputed* = sources conflict. *Unknown* = no processed source states it.

**Period actually covered.** Goods evidence processed runs from September 2025 (James's earliest tab) to 3 September 2026 (mission 39). Truck documents/loading or dispatch reports in this snapshot are dated 20 Jan, 10 Mar, 6 May, 24 Jun, 4 Jul and 20 Aug 2026; the August date is the loading-list date, not an established departure in this snapshot. Van missions with lists or notes: 33 (partial), 34, 35, 36, 38, 39.

---

## 1. Chronology and goods account (declared, unless stated otherwise)

| Departure | Transport | Consignees / destination | Declared load | Status |
|---|---|---|---|---|
| 9 Jan, 28 Jan, 11 Feb | 3 trucks (James "Truck 1/3/4") | unknown | 32,000 + 16,000 kg booked as "Medical" by James; no sheet, CMR or list supplied | **Unknown / disputed** — Kees: "two Lithuania trucks, mattresses, not confirmed"; Lieke (23 Jan): three trucks sent; Feb appeal: "5 trucks in 2026" |
| 20 Jan | Truck AA8047TI/AA9147XK | Help Window Kharkiv 14 pallets 7,403 kg; Nezlomna Rodina 6 pallets 2,633 kg | 20 pallets, 613 boxes, **10,036 kg** (food 6,333; clothing 1,186; hygiene 835; hospital supplies 632; kitchen 450; bedding 325; baby 275) | Supported (CMR sheets); delivery unknown |
| Jan/Feb (date open) | Mission 33, armoured van | Bohdan (van); goods recipients unknown | Working sheet: pallet 18 = 24 boxes medical supplies 315 kg "in the van for mission 33". Kees recalls mostly second-hand clothing (~700 kg per James) | **Disputed** load and date |
| 8–21 Feb | Mission 34, van | not stated per line | 13 Nutridrink boxes 260 kg confirmed; generators, inverter, medical supplies, food, clothing named without quantities | Supported (Kees) |
| 10 Mar | Truck KA6484AP/AA2117XC | Nezlomna Rodina 7 pallets 4,226 kg (incl. 134 loose items 244 kg); Help Window 24 pallets 15,093 kg | 31 pallets (nos. 22, 31 absent), **19,319 kg** | Supported (def. sheet) |
| 6–17 Apr | Mission 35, van | Lighthouse Makariv; Traveling Colonels; scooter recipient unknown | 6 lines, **686 kg** | Supported (Kees); ambulances not quantified |
| 6 May | Truck АА8045ТІ/АА9145ХК | Help Window 16 pallets 8,700 kg (pallets 1–4 marked H4U Ludmila Zhytomyr; 6, 17 marked DCA James Kamyanka/Kramatorsk); Nezlomna Rodina 4 pallets 1,510 kg | 20 pallets, 806 boxes, **10,210 kg** | Supported; Kees reported loaded/sent (prior run) |
| 24 May–7 Jun | Mission 36, van | Lighthouse Makariv; Bogdan evac team; Kamyanka | 64 units; **507 kg stated, but the note's own lines sum to 527 kg** (source-internal discrepancy) | Supported with conflict (Kees to confirm) |
| 24 Jun | Truck AC7440HP/AC0450XG, SHI-0002 | Zhytomyr/Makariv: Help Window 3,745.5; Salim 3,632; Lifeline 193 | 12 pallets (2 split), 437 boxes, **7,570.5 kg** | Supported; loaded 24 Jun (invoice email); on 3 Jul not all recipients had collected |
| 4 Jul | Truck OL-78-FB (W.B. van der Donk), SHI-0001, "mission 37" | Help Window 19 pallets 8,890 kg + 51 bags bedding 510 kg; Nezlomna Rodina 13 pallets 6,370 kg; Kharkiv | 32 pallets, 1,008 boxes, **15,260 kg + 510 loose** | Supported; departure 4 Jul 08:00 evidenced; delivery unknown |
| 11–21 Jul | Mission 38, van | Lighthouse Makariv | 57 boxes, **525 kg** | Supported (Kees) |
| ~20 Aug | Truck AI8800HM/AA7888XS, SHI-0003 | Help Window 15 pallets 8,779 kg; Nezlomna Rodina 5 pallets 1,511 kg hospital supplies; Kharkiv | 20 pallets, 813 boxes, **10,290 kg** | Supported (list dated 20 Aug; CMR stamping 14–18 Aug); departure unestablished in this snapshot; additional departure-report evidence awaits reconciliation (Part 6) |
| 21 Aug–3 Sep | Mission 39, van | Monty; Shelter and Evac Team Kramatorsk; Kam'yanka; Lighthouse Makariv; one line TBD | 167 units, **1,286 kg** | Supported (list) |

No source in this 37-source snapshot establishes receipt by a consignee or onward recipient. Additional run evidence includes an August unloading report (Part 6); that report still needs reconciliation and is not a signed receipt. "Delivered" in James’s title is a reporting label, not delivery proof.

## 2. Carry-over candidates (interpretation, validation-pending)

Pallets prepared for the January truck but absent from its CMR sheets have matching or closely similar contents and weights in later documents — carry-over is a candidate explanation, **not an established identity**: working-sheet pallet 12 (505 kg, 48 food + 8 clothing) matches March NR pallet 1; pallet 22 (24 incontinence, 275 kg) is a candidate for March pallet 27 (275 kg) or 28 (276 kg); pallet 10 (20 baby, 342 kg) matches May pallet 11 (already in Kees's Corrections). Working-sheet pallets 4, 6, 8, 16, 26 and 27 also did not ship in January and are not yet traced. Identical composition is a matching clue, not proof the same physical pallet moved unchanged.

## 3. Kees's February WhatsApp notes (#32–#46) → March pallets

Candidate matches by content, none confirmed: #40 (32 baby + 4 hygiene) matches pallet 32; #39 H4U (18 animal + 2 hygiene + 16 hero) matches pallet 15; #45 (45 Schoolfruit + 2 baby + 13 wipes = 60) matches pallet 21 and would imply 15 baby boxes where the sheet says 14 — a conflict to resolve with Kees, not a settled correction of the sheet; #44 (24 winter clothing) matches NR pallet 30. #43 H4U (36 food boxes) is one of pallets 7, 8, 11, 19 — unresolved. The unnumbered H4U note (32 boxes) matches no pallet. #35 supersedes #34. The March H4U tab was not supplied, so pallets 7, 8, 11, 19 as H4U rest on Kees's workbook alone.

## 4. Where the reporting workbook and the evidence differ

* **January food −751 kg (Kees vs James) is internal to Kees's workbook**: the CMR sheets give 4,534 + 1,699 = 6,233 kg, exactly James's figure; Kees's lines exclude pallet 17 (759 kg) because its weight was "split pending".
* **June +147.5 kg (James vs manifest) — proposed duplication, arithmetically consistent but unconfirmed**: Salim food 2,735 + the whole split pallet SU-0011 (288) reproduces James's Donetsk food 3,023 exactly, and the 148 kg monitors appear again in house goods 193; this reconstructs his method rather than observing it. James to confirm.
* **May — proposed reading, unconfirmed**: James's Kharkiv medical 1,510 equals the whole NR CMR (incl. 572 kg hygiene) while Donetsk hygiene 572 repeats that pallet; HW incontinence 503 kg has no line. James to confirm his method.
* **Region split is a reporting convention**, not consignee: NR clothing goes to Donetsk in January but Kharkiv in March; January NR food 1,699 appears as 699 with 1,000 moved to Kharkiv.
* **48,000 kg "Medical" (Jan 32,000 + Feb 16,000) has no supporting document** in Kees's collection.
* **July and August trucks (15,260 + 510 and 10,290 kg) are not in James's workbook**; Kees's reconstruction understates July as "~9,300+ kg".
* **Total tab ≠ monthly tabs** for clothing (€37,593 vs 41,533) and baby (€44,940 vs 45,360) in the uploaded copy's extracted values (native cells not opened); kilograms reconcile.
* **"Mission 37"** is the 4 July truck journey (James's group DM and #logistics, 3–6 Jul), reused for camp fundraising — not a van mission.
* **Sender address** changes from Meidoornweg (Jan–May sheets) to Lutmanstraat (Jun–Aug documents); cause unknown.

Full row-level reconciliation: [structured workbook](DCA_goods_reconstruction_RUN-receXkVSVZTfjD1j6_structured_output_2026-09-17.xlsx), tab *Reconciliation*. Each row keeps its item, interpretation, source and object reference together.

## 5. Source guide

The [workbook’s Evidence tab](DCA_goods_reconstruction_RUN-receXkVSVZTfjD1j6_structured_output_2026-09-17.xlsx) provides direct links to each Airtable evidence record, available original-source URLs, source references and access limits. Its scope column separates the original 37 sources from the 16 additional run records awaiting incorporation.

| Source | Where / reference | Supports | Limits |
|---|---|---|---|
| Truck January 2026.xlsx (4 sheets) | Kees upload, Drive [source](https://drive.google.com/file/d/1ETJQCmiyKfLEQ2G_pO4xee4s1csYN-uJ/view) | 20 Jan load; working-sheet pallets incl. "mission 33" note | Working sheet not final (Kees); HW vs Total sheet disagree on pallet 30 split |
| Truck March (def.) (1).xlsx | Drive [source](https://drive.google.com/file/d/1DoitCvlni5TBXjRbZi5cJqxjEDv0X3oW/view) | 10 Mar load | No H4U tab; internal box-count inconsistencies |
| Kees's WhatsApp screenshots (3) | Drive 1rdJo4Iv5NFOcMjS-aOpEBZIkmAPV1N-T, 1n7lyb989GVI_VhiGw1QcKMuzvZnt776z, 1QbNhcb7fmrPRO7cr_qVp9CM2VmUFXdaB | Feb pallet contents #32–#46 | Own messages only; chat partner and dates not visible |
| Def. Truck May 6 2026.xlsx | Drive 1TVO8UH7ynwxAIP-qKU9I9Ll00DumkmC1 | 6 May load and onward annotations | Working versions not compared; same workbook as prior-run evidence |
| Manifest_SHI-0002_Total kopie.pdf | Drive 1d0t1DS4q3HbHXmb0r2FvYsNNLvMHQuuq | 24 Jun load, split pallets | Per-consignee PDFs and detail xlsx not read |
| Manifest_SHI-0001..pdf; _detail.pdf | Drive 1w1A4r0GgTIeLfYNt5EaBPPOSMshgQ-wH; 1t3ygcUmwXe9sXtFtnovOx5ATrp6Tt-EX | 4 Jul load, carrier, CMR numbers | 291/782 HW and 87/226 NR boxes "unspecified"; pickup date 30 May unexplained |
| Loading_list_SHI-0003.pdf | Drive 1W8-8AgC55oirp0T4B97S5gGrWbeT5k4q | ~20 Aug load | Departure date absent; photos/zip unprocessed |
| Kees's mission notes 33–36, 38; Mission_39_Loading_List.pdf | Missions (van) folder | Van loads as stated | Notes written 16 Sep 2026 (recollection where stated) |
| DCA goods delivered for 2026.xlsx | Drive [source](https://drive.google.com/file/d/1OC5vrenD58ewHgy7cKCbKrFRDvygpcNR/view) (copy mod. 15 Sep) | James's monthly kg/€, labels, regions | Native Sheet/XLSX revisions not compared |
| DCA_goods_reconstruction_2026_Jan-Jun | Sheet 172U-YYZQQqc2qIebYuQeSNIHRSSdeR7H78y0F3koy-w | Kees's prior research, corrections, open items | Chat-attached copy |
| Slack (live, Kees's account) | #marketing 23 Jan (Lieke), 16 Feb (Bas); #fundraising 3 Feb (James); DM Kees–James 4 Feb, 14 May; group DM 3 & 6 Jul (James); #logistics 3 Jul; #ukraine bot 13 Sep | Truck counts, mission 33/37 timing, Lithuania cost, June collection status | Search-bounded; message ts not captured |
| Gmail kees@ | threads 19f0888eec7ab63d, 19f3733ade8be4d1, 19ef5524fa59492e | July paperwork 27 Jun–3 Jul; 24 Jun loading; Aug CMR stamping | Snippets only; attachments not opened |
| Emergency Appeal for Ukraine (Feb 2026) | Google Doc 1OdP715UQCwQEvIMAKGL4sazamrxzdfDVti1XEHhkdHk | "5 trucks in 2026"; winter-truck contents; mission 35 date | Fundraising text; current revision |

## 6. Limitations and gaps

The original 37-source pass reported missing WhatsApp exports; sheets/CMRs for James’s Trucks 1, 3, 4; Mission 33’s loading list; the March H4U tab; and Anja’s Slack export. It also left CMR originals, working May files, further June–August detail, photos/source packages, equipment files, full communications and huddle transcripts unprocessed. These are snapshot coverage statements; current availability must be checked before asking anyone to supply material again.

The run now links 16 additional evidence records, including June detail, the July box extract, August contents/README, legacy shipment records, warehouse observations and further shipment messages. [Kees’s August departure report](https://airtable.com/appZ1Fv0YtZPbBbWa/tbl35kxZNyfhKmtXG/recC9dOzCgXbRSQEm) and [the later unloading report](https://airtable.com/appZ1Fv0YtZPbBbWa/tbl35kxZNyfhKmtXG/recHgOgGg8Rdr638M) directly affect the August unknowns above. [The Anja–Kees huddle entry](https://airtable.com/appZ1Fv0YtZPbBbWa/tbl35kxZNyfhKmtXG/recJTH9lXBSM03K14) preserves AI notes and explicitly records that the underlying transcript was not read. Reconcile these existing records with the claims, Meetings ledger and run coverage before continuing source discovery or asking questions. They are indexed, not established as new conclusions by this export repair.

[G-12](https://airtable.com/appZ1Fv0YtZPbBbWa/tblv7wDJZjJRs34nU/recB37f26Q14iwW6a) still presents March H4U pallet attribution more strongly than corrected G-11 permits. The workbook qualifies those links as candidates; the staging object needs the same consistency correction. No Airtable records were changed by this PR repair.

## 7. Candidate review list (gated — nothing sent)

Workbook tab *Review_List* (Q1–Q9) is **gated**. First reconcile evidence already linked to the run, process relevant remaining sources and assess sufficiency for each candidate. Relevant huddle transcripts should be read where accessible; retain specific access gaps and distinguish AI notes from transcripts. Then run [validation-request preflight §5](../../workflows/reconstruction-self-evaluation-and-routing.md#5-validation-request-preflight), checking existing answers, validations and active threads. Only the genuine remaining operational delta may be requested. Questions must not presuppose pallet identity or duplication. Topics remain: undocumented Jan–Feb trucks; mission 33 load/date; June and May reporting calculations; March H4U attribution; January carry-over candidates; July/August reporting; mission 35 ambulances; sender-address change. Existing evidence may settle some without another question.

## 8. Next bounded action

Reconcile the 16 additional records and the G-12/G-11 inconsistency first, then pursue only the remaining relevant source gaps and re-run self-evaluation. Keep the run checkpoint, evidence index and outputs aligned. Valuation, production implementation, maintained-reality promotion and automation remain deferred.
