frappe.provide("hotel");
frappe.provide("frappe.utils");


// monkey-patch generate_route to handle ag-report links
var original_generate_route = frappe.utils.generate_route;
frappe.utils.generate_route = function (item) {
  let link = original_generate_route(item).replace(/\/report/i, 'ag-report');
  return link
}


hotel.make_grid_room_folio_advance = function (frm) {
  let $wrapper = frm.fields_dict["room_folio_advance"].$wrapper;
  $wrapper
    .empty()
    .html(
      `<div id="ag-room-folio-advance" class="ag-theme-balham" style="width:100%;height:150px;;"></div>`
    );
  frm.room_folio_advance_gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    columnDefs: [
      { headerName: "Reference Type", field: "reference_type", width: 160 },
      {
        headerName: "Reference Name",
        field: "reference_name",
        width: 160,
        cellRenderer: function (params) {
          return `<a href='/app/${frappe.router.slug(params.data.reference_type)}/${params.value}' target="_blank">${params.value}</a>`;
        },
      },
      { headerName: "Posting Date", field: "posting_date", width: 100 },
      {
        headerName: "Amount",
        field: "amount",
        width: 100,
        type: "numericColumn",
      },
      {
        headerName: "Allocated Amount",
        field: "allocated_amount",
        width: 130,
        type: "numericColumn",
      },
    ],
    rowData: [],
    components: {
      customNoRowsOverlay: CustomNoRowsOverlay,
    },
    noRowsOverlayComponent: "customNoRowsOverlay",
    noRowsOverlayComponentParams: {
      noRowsMessageFunc: function () {
        return !frm.doc.master_folio
          ? "No advance payments made"
          : "Please check master folio for advances";
      },
    },
  };

  var gridDiv = document.querySelector("#ag-room-folio-advance");
  new agGrid.Grid(gridDiv, frm.room_folio_advance_gridOptions);
};

hotel.make_grid_charge_and_purchase = function (frm) {
  let $wrapper = frm.fields_dict["sales_invoice_reference"].$wrapper;
  $wrapper
    .empty()
    .html(
      `<div id="charge-purchase" class="ag-theme-balham" style="width:100%;height:150px;;"></div>`
    );
  frm.gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    columnDefs: [
      {
        headerName: "Invoice",
        field: "name",
        width: 160,
        cellRenderer: function (params) {
          return `<a href='/app/sales-invoice/${params.value}' target="_blank">${params.value}</a>`;
        },
      },
      // {
      //   headerName: "Folio",
      //   field: "room_folio",
      //   width: 160,
      //   cellRenderer: function (params) {
      //     return `<a href='#Form/Room Folio HMS/${params.value}' target="_blank">${params.value}</a>`;
      //   },
      // },
      { headerName: "Room", field: "room_no", width: 90 },
      { headerName: "Date", field: "room_date_cf", width: 90 },
      { headerName: "Time", field: "posting_time", width: 75 },
      {
        headerName: "Total",
        field: "rounded_total",
        type: "numericColumn",
        width: 90,
      },
      {
        headerName: "Outstanding",
        field: "outstanding_amount",
        type: "numericColumn",
        width: 90,
      },
      {
        headerName: "Charges For",
        field: "charges_for",
        width: 320,
      },
    ],
    rowData: [],
  };
  var gridDiv = document.querySelector("#charge-purchase");
  new agGrid.Grid(gridDiv, frm.gridOptions);
};

frappe.provide("hotel.utils");
hotel.utils.toggle_selection = function (report) {
  const rows = report.gridOptions.api.getSelectedRows();
  if (rows.length > 0) report.gridOptions.api.deselectAll();
  else report.gridOptions.api.selectAll();
};

hotel.utils.pick = function (o, ...props) {
  return Object.assign({}, ...props.map((prop) => ({ [prop]: o[prop] })));
};

hotel.utils.get_first_of_month = function (add_months, date) {
  return moment(date || frappe.datetime.get_today())
    .add(add_months || 0, "months")
    .startOf("month")
    .format();
};

function CustomNoRowsOverlay() { }

CustomNoRowsOverlay.prototype.init = function (params) {
  this.eGui = document.createElement("div");
  this.eGui.innerHTML =
    '<div class="ag-overlay-loading-center" style="background-color: lightcoral;">' +
    '   <i class="far fa-frown"> ' +
    params.noRowsMessageFunc() +
    " </i>" +
    "</div>";
};

CustomNoRowsOverlay.prototype.getGui = function () {
  return this.eGui;
};

hotel.make_grid_guest_purchase = function (frm) {
  let $wrapper = frm.fields_dict["guest_purchase"].$wrapper;
  $wrapper
    .empty()
    .html(
      `<div id="guest-purchase" class="ag-theme-balham" style="width:100%;height:150px;;"></div>`
    );
  frm.gridOptions_guest_purchase = {
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    columnDefs: [
      {
        headerName: "Invoice",
        field: "invoice",
        width: 160,
        cellRenderer: function (params) {
          return `<a href='/app/sales-invoice/${params.value}' target="_blank">${params.value}</a>`;
        },
      },
      { headerName: "Status", field: "status", width: 90 },
      { headerName: "Date", field: "posting_date", width: 130 },
      {
        headerName: "Total",
        field: "base_rounded_total",
        type: "numericColumn",
        width: 90,
      },
      { headerName: "Items", field: "items", width: 300 },
      { headerName: "Remarks", field: "remarks", width: 90 },
    ],
    rowData: [],
  };
  var gridDiv = document.querySelector("#guest-purchase");
  new agGrid.Grid(gridDiv, frm.gridOptions_guest_purchase);
};

