const props = PropertiesService.getScriptProperties();
const SHEET_ID: string | null = props.getProperty('ss_id');

export function doGet() {
    return HtmlService.createHtmlOutputFromFile("hosting/index.html")
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setTitle("♨シャワー予約♨");
    };
}

// TODO: for test
export function editSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheets()[0];
  sh.getRange(1,1).setValue('test');
}
