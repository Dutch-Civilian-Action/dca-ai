---
document_type: dca_goods_lines_dev_test_record
status: proposed_for_review
scope: goods_reconstruction_structure_r01
environment: DCA Dev/Test
---

# Goods lines R01 — bounded Dev/Test mapping check

**Date:** 26 September 2026. **Test base:** [`[DEV] DCA Goods Lines — R01`](https://airtable.com/appKeml5cgS1mRXxq) (`appKeml5cgS1mRXxq`) in DCA Dev/Test (`wspCZsYbWYC7OXX1l`). **Intended production destination, if accepted:** DCA Warehouse & Logistics (`appivZyJTh5tQv1On`) in DCA (`wspYnyJ08xBNYOjXw`). **Evidence layer:** [RUN-receXkVSVZTfjD1j6](https://airtable.com/appZ1Fv0YtZPbBbWa/tblTS9OEq5PTSFK4S/receXkVSVZTfjD1j6) in DCA Evidence & Reconciliation.

This is a source-linked structural sample. It does not transfer the full workbook, establish operational truth, or implement production. The old `3 | DCA Logistics` (`appXTzdTNB8KjALbk`) and other Dev/Test bases containing historical material were not reused or changed.

## Question and sample

Can an authoritative goods model represent historical aggregates at the detail evidenced, keep physical shipment-unit identity separate from persistent Logistics_Unit identity, and avoid counting a split pallet or CMR total twice?

| Source-backed case | Test representation | Read-back result |
|---|---|---|
| May 6 NR consignment, CMR 2/260506, 1,510 kg | Three category-weight lines: hospital supplies 866 kg, hygiene 572 kg, medical equipment 72 kg; no invented box count or LU | 866 + 572 + 72 = 1,510 kg; the 572 kg is inside the consignment, not additional to it |
| June SHI-0002 split pallet SU-0011 | One shipment-scoped unit control of 288 kg; two goods lines linked to it but different consignees: Salim diapers 12 boxes / 140 kg and Lifeline monitors 1 box / 148 kg | 140 + 148 = 288 kg; unit control is non-additive. These two lines are only a partial sample of the 3,632 kg and 193 kg CMR consignments |
| July SHI-0001 HW CMR 1/260704 | 8,890 kg palletised mixed goods at broad source scope plus loose bedding 51 bags / 510 kg, separate from any fabricated LU | 8,890 + 510 = 9,400 kg CMR gross. The broad line is a sample aggregate and must be replaced or explicitly partitioned if itemised category lines are later used; they cannot coexist as additive lines |

Sources: [May definitive workbook](https://drive.google.com/file/d/1TVO8UH7ynwxAIP-qKU9I9Ll00DumkmC1/view), [June detailed manifest](https://drive.google.com/file/d/1TbP4RqkwO05sdyiWTsKNExiUH8qyb7gM/view), [Salim CMR](https://drive.google.com/file/d/16pYKE0Yy050zxds8sGh6-fn9ZshHD3il/view), [Lifeline CMR](https://drive.google.com/file/d/12FLmr5WW_2a1Y_gn4IfgQGMdrafcjK2K/view), [July HW CMR](https://drive.google.com/file/d/1ijQJZlohLI3aLLgr19OayewgfHHBIFCJ/view), and staging objects G-18/G-21/G-30. Each copied record stores its source and staging reference, original wording, event-state qualification and validation scope.

## Structure and observed result

The test base has four tables: `Consignments` (four CMR controls), `Goods_Lines` (seven non-overlapping sample allocations), `Shipment_Units` (one June shipment-scoped control), and `Logistics_Units` (zero records). Goods lines link to consignment records; the two June lines also link to SU-0011. Quantity and its unit are measures, not line identity. Recipient and CMR are part of the allocation context. Persistent LU records require their own individual identity evidence; neither an aggregate nor a shipment-local code automatically supplies that identity.

A read-back of all records and linked fields returned four consignments, seven goods lines, one shipment unit and zero persistent LUs. The summed weights match both complete-case controls and the split-unit control as above. The June CMR descriptions conflict with the manifest's split-pallet content allocation, so the two June lines remain an interpretation requiring owner/James review. These technical checks demonstrate that the sample can be represented; they do not validate its full historical meaning or demonstrate an automatic overlap constraint. The current test uses explicit counting notes and a manual reconciliation. Before any production implementation, the accepted model needs a durable rule for aggregate/detail replacement or partitioning, and a checked report that does not sum controls with goods lines.

Production DCA Warehouse & Logistics was read on 26 September: it contains `Warehouse_Sessions`, `Warehouse_Locations`, and `Warehouse_Inventory_Observations`; the goods/consignment/unit tables above are not there. The test is an extension candidate, not a migration from `3 | DCA Logistics`.

## Independent source pass and staging state

All 17 JPEGs in the [August SHI-0003 source-photo folder](https://drive.google.com/drive/folders/1FipL_kKif52APTZBFIO8_hYvmyAIgLSG) were opened and visually inspected. [EVD-recrTh7u9YOAzwBFz](https://airtable.com/appZ1Fv0YtZPbBbWa/tbl35kxZNyfhKmtXG/recrTh7u9YOAzwBFz) records the bounded observations and links to G-25 and G-32. Handwritten labels generally corroborate the loading list's counts and weights for photographed positions, while most visible `PALLET #` boxes are blank. P20 shows a local `20` mark. Reused commercial cartons cannot establish their current contents; the photos show wrapped surfaces, not every box, unloading or persistent identity. Pallets 6, 7 and 9 are unphotographed.

G-31's claim was corrected in staging: July Help Window unloading was reported in progress on 7 July, with completion unconfirmed; June remains plan/indirect context. Directly counted current run membership after the photo evidence and two links is **78 Evidence, 33 Reconstruction_Objects, 174 Evidence_Links, 8 Object_Relationships, 2 Meetings**. The merged v13 handoff and workbook remain the earlier **77/33/172** snapshot; the run record labels that checkpoint as history. This R01 record is an addendum, not a regenerated full export.

## Review boundary and next decisions

System & Structure should review the proposed goods-line identity, the split shipment-unit relation and the aggregate/detail overlap rule. Kees and James should validate the source meanings and the full workbook at the appropriate scope; the May owner confirmations do not review every category line, and James's June calculation method remains open. The separately assigned [James source-input task](https://app.asana.com/1/1204854523404532/project/1211569943698313/task/1218876349160020) remains the route for January–February truck documents and the 48,000 kg basis. Other unsent candidate review topics remain subject to source preflight.

No valuation, production schema change, canonical promotion, reporting adoption or automation was made. A successful R01 sample does not release phases 3–5.
