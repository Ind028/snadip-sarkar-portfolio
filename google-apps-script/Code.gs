const SHEET_NAME = "Registrations";
const HEADERS = [
  "Submitted At",
  "Full Name",
  "Age",
  "Email",
  "Phone",
  "Dance Experience",
  "Preferred Batch",
  "Class Format",
  "Approval Status",
  "Approval Email Sent",
];

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.action === "message") {
    return saveMessage(data);
  }

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    spreadsheet.getSheetByName(SHEET_NAME) ||
    spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    ensureHeaders(sheet);
  }

  if (emailExists(sheet, data.email)) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, duplicate: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  function saveMessage(data) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet =
      spreadsheet.getSheetByName("Messages") ||
      spreadsheet.insertSheet("Messages");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Submitted At", "Name", "Email", "Message"]);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.age || "",
    data.email || "",
    data.phone || "",
    data.experience || "",
    data.batch || "",
    data.mode || "",
    "Pending",
    "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ success: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const callback = String(e.parameter.callback || "");
  const email = String(e.parameter.email || "").trim();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const result = {
    exists: Boolean(sheet && emailExists(sheet, email)),
  };
  const json = JSON.stringify(result);

  if (callback) {
    return ContentService.createTextOutput(
      callback.replace(/[^\w$]/g, "") + "(" + json + ")",
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(json).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function emailExists(sheet, email) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail || sheet.getLastRow() < 2) {
    return false;
  }

  const headers = sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0];
  const emailColumn = headers.indexOf("Email");
  if (emailColumn < 0) {
    return false;
  }

  return sheet
    .getRange(2, emailColumn + 1, sheet.getLastRow() - 1, 1)
    .getValues()
    .some(function (row) {
      return String(row[0] || "").trim().toLowerCase() === normalizedEmail;
    });
}

function ensureHeaders(sheet) {
  const currentHeaders = sheet
    .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), HEADERS.length))
    .getValues()[0];

  HEADERS.forEach(function (header, index) {
    if (currentHeaders[index] !== header) {
      sheet.getRange(1, index + 1).setValue(header);
    }
  });
}

function onApprovalStatusEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();

  if (sheet.getName() !== SHEET_NAME || range.getRow() === 1) {
    return;
  }

  const headers = sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0];
  const statusColumn = headers.indexOf("Approval Status") + 1;
  const sentColumn = headers.indexOf("Approval Email Sent") + 1;
  const emailColumn = headers.indexOf("Email") + 1;

  if (
    range.getColumn() !== statusColumn ||
    String(e.value || "").trim().toLowerCase() !== "approved" ||
    String(sheet.getRange(range.getRow(), sentColumn).getValue()).trim() ===
      "Yes"
  ) {
    return;
  }

  const row = sheet
    .getRange(range.getRow(), 1, 1, sheet.getLastColumn())
    .getValues()[0];
  const email = String(row[emailColumn - 1] || "").trim();
  const name = String(row[headers.indexOf("Full Name")] || "").trim();
  const batch = String(row[headers.indexOf("Preferred Batch")] || "").trim();
  const mode = String(row[headers.indexOf("Class Format")] || "").trim();

  if (!email) {
    sheet
      .getRange(range.getRow(), sentColumn)
      .setValue("Failed: applicant email is missing");
    return;
  }

  MailApp.sendEmail({
    to: email,
    subject: "Kathak class registration approved",
    htmlBody:
      "<p>Dear " +
      escapeHtml(name || "Applicant") +
      ",</p>" +
      "<p>Your registration for Kathak classes has been approved.</p>" +
      "<p><strong>Preferred batch:</strong> " +
      escapeHtml(batch || "To be confirmed") +
      "<br><strong>Class format:</strong> " +
      escapeHtml(mode || "To be confirmed") +
      "</p><p>We look forward to welcoming you.</p>",
  });

  sheet.getRange(range.getRow(), sentColumn).setValue("Yes");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createApprovalTrigger() {
  const exists = ScriptApp.getProjectTriggers().some(function (trigger) {
    return trigger.getHandlerFunction() === "onApprovalStatusEdit";
  });

  if (!exists) {
    ScriptApp.newTrigger("onApprovalStatusEdit")
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();
  }
}
