frappe.DataTabulator = Class.extend({
    init: function (report, opts) {
        $.extend(this, opts);
        this.report = report;
        this.options = this.options || Object.assign({}, this.get_options());
        this.setup();
        this.make(report);
        frappe.tabulator = this;
    },

    setup() {
        let me = this;
        this.toggle_frappe_datatable(true);

        if (!this.original_refresh) {
            // monkey-patch refresh as frappe query_report does not provide refresh event
            this.original_refresh = this.report.refresh;
            this.report.refresh = function () {
                me.original_refresh.apply(this, arguments)
                setTimeout(() => {
                    me.set_data();
                }, 800);
            };
        }
        // destroy tabulator when navigating away
        window.addEventListener("popstate", this.destroy.bind(this), {
            once: true,
        });

    },

    get_options() {
        let me = this;
        // default tabulator options
        return DEFAULT_OPIONS
    },

    make() {
        setTimeout(() => {
            let me = this,
                el = $("<div id='tabu-lator' class='x-table-light'></div>");
            el.insertBefore($(".report-wrapper"));
            this.tabulator = new Tabulator("#tabu-lator", this.options);
        }, 1);
    },

    destroy(e) {
        this.report.refresh = this.original_refresh;
        this.tabulator && this.tabulator.destroy();
        $("#tabu-lator").remove();
        this.toggle_frappe_datatable(false);
        // need to set route_options here to force refresh when navigating back to same report
        frappe.route_options = { _t: new Date().getTime() };
    },

    set_data() {
        if (this.tabulator) {
            this.tabulator.setData(this.report.data.length ? this.report.data : []);
        }
    },

    toggle_frappe_datatable(flag) {
        let me = this.report;
        // hide frappe report datatable and message area
        frappe.timeout(0.2).then(() => {
            me.$message.toggleClass("hidden d-none", flag);
            me.$loading.toggleClass("hidden d-none", flag);
            me.$report.toggleClass("hidden d-none", flag);
            me.$report_footer && me.$report_footer.toggleClass("hidden d-none", flag);
        });

    },
});



const DEFAULT_OPIONS = {
    height: 450,
    layout: "fitColumns",
    placeholder: "Nothing to Show",
    data: [],
    // If you set the autoColumns option to true,
    // every time data is loaded into the table through the data option or through the setData function,
    // Tabulator will examine the first row of the data and build columns to match that data.
    autoColumns: true,
    autoColumnsDefinitions: function (definitions) {
        return me.report.columns.map((column) => {
            column.title = column.label;
            column.field = column.fieldname;
            // add header filter to every column
            // column.headerFilter = true;
            return column;
        });

    },
};