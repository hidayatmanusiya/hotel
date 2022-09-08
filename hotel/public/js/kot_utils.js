frappe.router.on('change', () => {
    // hack to set query string parameters in link cards. 
    // There is no way to set url params in the Workspace doc, for reports
    if (frappe.utils.arrays_equal(frappe.get_route(), ['Workspaces', 'Kitchen'])) {
        setTimeout(() => {
            frappe.workspace.body.find('[data-page-name="Kitchen"] .widget-body a[href*="/Kot Listview"]').each((idx, el) => {
                if (el.href.endsWith('/Kot%20Listview')) {
                    let view = el.text.trim('\n');
                    $(el).click((e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        frappe.route_options = {
                            "view_name": view
                        }
                        frappe.set_route('query-report', 'Kot Listview')
                    })
                }
            });
        }, 1000);
    }

    // destroy tabulator if user has navigated away from report
    if (frappe.tabulator) {
        if (frappe.get_route()[0] !== 'query-report') {
            frappe.tabulator.destroy();
        }
        else if (frappe.tabulator.report.report_name !== frappe.get_route()[1]) {
            frappe.tabulator.destroy();
        }
    }


});

$(document).on('app_ready', function () {

});
