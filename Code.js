// Hàm này sẽ phục vụ HTML từ Google Apps Script
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
// Lấy danh sách món ăn từ trang tính "Danh mục món ăn"
function getMenuItems() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Danh mục món ăn');
  var range = sheet.getDataRange();
  var values = range.getValues();
  var items = [];
  
  for (var i = 1; i < values.length; i++) {
    items.push({
      name: values[i][0],
      price: values[i][1]
    });
  }
  
  return items;
}

// Lưu đơn hàng vào trang tính "Đơn hàng"
function saveOrder(tableNumber, orderItems, totalPrice) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Đơn hàng');
  var timestamp = new Date();
  
  orderItems.forEach(function(item) {
    sheet.appendRow([timestamp, tableNumber, item.name, item.price]);
  });
  
  // Thêm dòng tổng tiền
  sheet.appendRow([timestamp, tableNumber, 'Tổng cộng', totalPrice]);
}

// Trả về dữ liệu từ menu
function getMenu() {
  return getMenuItems();
}
