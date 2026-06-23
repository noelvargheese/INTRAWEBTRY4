const SHEETS = {
  announcements: "Announcements",
  circulars: "Circulars",
  events: "Events",
  leftLinks: "LeftLinks",
  rightLinks: "RightLinks"
};

function doGet(e) {

  const action = e.parameter.action;

  if (action === "getAll") {

    return jsonResponse({
      success: true,
      announcements: getSheetData(SHEETS.announcements),
      circulars: getSheetData(SHEETS.circulars),
      events: getSheetData(SHEETS.events),
      leftLinks: getSheetData(SHEETS.leftLinks),
      rightLinks: getSheetData(SHEETS.rightLinks)
    });

  }

  return jsonResponse({
    success: false,
    message: "Invalid action"
  });
}

function doPost(e) {

  try {

    const data = JSON.parse(e.postData.contents);

    switch (data.action) {

      case "addAnnouncement":
        addAnnouncement(data);
        break;

      case "addCircular":
        addCircular(data);
        break;

      case "addEvent":
        addEvent(data);
        break;

      case "addLeftLink":
        addLeftLink(data);
        break;

      case "addRightLink":
        addRightLink(data);
        break;

      case "deleteAnnouncement":
        deleteRecord(
          SHEETS.announcements,
          data.id
        );
        break;

      case "deleteCircular":
        deleteRecord(
          SHEETS.circulars,
          data.id
        );
        break;

      case "deleteEvent":
        deleteRecord(
          SHEETS.events,
          data.id
        );
        break;

      case "deleteLeftLink":
        deleteRecord(
          SHEETS.leftLinks,
          data.id
        );
        break;

      case "deleteRightLink":
        deleteRecord(
          SHEETS.rightLinks,
          data.id
        );
        break;

      default:
        throw new Error(
          "Unknown Action"
        );
    }

    return jsonResponse({
      success: true
    });

  } catch (error) {

    return jsonResponse({
      success: false,
      error: error.toString()
    });
  }
}

function jsonResponse(data) {

  return ContentService
    .createTextOutput(
      JSON.stringify(data)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}

function generateID() {

  return Utilities.getUuid();
}

function getSheetData(sheetName) {

  const sheet =
    SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(sheetName);

  const values =
    sheet
      .getDataRange()
      .getValues();

  if (values.length <= 1)
    return [];

  const headers = values[0];

  return values
    .slice(1)
    .map(row => {

      let obj = {};

      headers.forEach(
        (header, i) => {

          obj[header] =
            row[i];
        }
      );

      return obj;
    });
}

function addAnnouncement(data) {

  SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(
      SHEETS.announcements
    )
    .appendRow([
      generateID(),
      data.title || "",
      data.content || "",
      data.writer || "",
      data.image || "",
      data.pdf || "",
      data.link || "",
      new Date()
    ]);
}

function addCircular(data) {

  SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(
      SHEETS.circulars
    )
    .appendRow([
      generateID(),
      data.title || "",
      data.content || "",
      data.writer || "",
      data.image || "",
      data.pdf || "",
      data.link || "",
      new Date()
    ]);
}

function addEvent(data) {

  SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(
      SHEETS.events
    )
    .appendRow([
      generateID(),
      data.title || "",
      data.content || "",
      data.writer || "",
      data.image || "",
      data.pdf || "",
      data.link || "",
      data.eventDate || ""
    ]);
}

function addLeftLink(data) {

  SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(
      SHEETS.leftLinks
    )
    .appendRow([
      generateID(),
      data.name || "",
      data.url || "",
      data.image || ""
    ]);
}

function addRightLink(data) {

  SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(
      SHEETS.rightLinks
    )
    .appendRow([
      generateID(),
      data.name || "",
      data.url || "",
      data.image || ""
    ]);
}

function deleteRecord(
  sheetName,
  id
) {

  const sheet =
    SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(
        sheetName
      );

  const values =
    sheet
      .getDataRange()
      .getValues();

  for (
    let i = 1;
    i < values.length;
    i++
  ) {

    if (
      String(values[i][0]) ===
      String(id)
    ) {

      sheet.deleteRow(
        i + 1
      );

      return true;
    }
  }

  return false;
}