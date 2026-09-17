# Goods reconstruction — instructions for Kees

Hey Kees :) Before running the reconstruction, please collect the original sources in this existing shared Drive folder:

**DCA Systems & Data → 05 Data Warehouse & Reporting Infrastructure → Intake → [Logistics](https://drive.google.com/drive/folders/1awpG275UCHoiziUolDwtN3UVqXn2fS7a)**

Keep the files and conversations separate, with their original names and dates. Keep access appropriate for private conversations and make sure the DCA Claude context you use can actually read the supplied files.

I'll put a fresh Slack export of the non-private channels in **DCA Organisation → 00 Shared Organisational Reality → 02 Validation → [Evidence](https://drive.google.com/drive/folders/1xShgRQF6PDABUwlh3PoEMqe8V6THgKzh)**. Claude can read it there; you don't need to copy it into Logistics. Claude should use that for the covered history, then check live Slack for newer material and missing context or files. Your private channels and DMs are separate from that export, so please still supply the private conversations below, including those with Bas and James.

Please include:

1. **WhatsApp chats**
Export the relevant individual and group chats, including conversations with Bas, James, warehouse volunteers, drivers, donors and receiving partners. Keep the conversation history and include photos, documents and voice messages where they contain information. Export each chat separately and make clear who it is with.

2. **Private Slack conversations**
Include all your DCA-related DM conversations with **Bas and James**, plus relevant group DMs and conversations with other people. Include replies, attachments, corrections and any huddle notes or transcripts. These conversations may contain information the bots cannot normally access. Provide the conversation text or an available export, preserving names, timestamps and message links. Links alone won't help if Claude cannot open them.

3. **Emails and attachments**
Include relevant correspondence from mailboxes Claude cannot access: donations, collections, transport arrangements, loading, recipients, delivery confirmations and later changes. Keep complete threads and their attachments.

4. **Your personal notes and private files**
Include notes on your phone or computer, private Drive documents, loading lists, spreadsheets, photos of goods or pallet labels, and anything you used to fill gaps in the reconstruction. If something is only in your memory, write it down separately and label it as your recollection, including what you're uncertain about.

5. **Your earlier Claude work**
Make the original conversations and uploaded files available, including the information you gave Claude, your corrections and decisions. The finished spreadsheet alone doesn't preserve all of that. A new conversation may not have access to the previous chat, even within the same project.

6. **Original shipment and goods documents**
Include the CMRs, manifests, truck and van loading lists, warehouse records and earlier versions you worked from. For material already available in shared Drive, keep it in its existing location and provide the original link once Claude confirms it can read it.

Please don't limit this to January–June or to messages explicitly about quantities. Earlier donations, stock, packing, rebuilt pallets, pickup arrangements and later deliveries may explain what happened.

There's no need to clean up the sources, combine everything into one document or match notes to pallets beforehand. Keep older or contradictory information too—Claude needs the history to distinguish changes from mistakes.

The shared Drive locations preserve the originals as DCA-held source material. During the reconstruction, Claude should create the linked evidence and reconstruction records in **Airtable Evidence & Reconciliation**, pointing back to the precise files and relevant messages, pages or rows. Uploading something only to a Claude conversation does not complete that shared-source preservation.

Once collected, run the full **DCA-Goods-Reconstruction-Claude-Prompt.md** with **goods-valuation-plan-v3.md** and the workbooks linked in the prompt. The prompt already contains both source-folder links and the complete source guide. Have Claude check what it can actually read, record anything missing, then continue with the available evidence using the shared reconstruction method.

If Claude cannot read the governing repositories, attach ZIPs of `dca-ai` and `dca-architecture` and have it identify the files it actually reads before continuing beyond source inventory. If the files are readable but their revision is unknown, record that limitation; attaching a ZIP is a useful provenance route, not a new mandatory approval step. After access is restored, Claude should reassess affected earlier work within the same run.

We're reconstructing and comparing at this stage; valuation and production changes come later.
