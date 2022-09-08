from . import __version__ as app_version

app_name = "hotel"
app_title = "Hotel"
app_publisher = "Bala"
app_description = "Hotel Management"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "murugan.mu@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = [
    "/assets/hotel/css/hotel.css",
    "/assets/hotel/css/tabulator.min.css"]
app_include_js = [
    "/assets/hotel/js/common.js",
    "/assets/hotel/js/ag_report.js",
    "/assets/hotel/js/common_quick_entry.js",
    "/assets/hotel/js/frappe_tabulator.js",
    "/assets/hotel/js/kot_utils.js",
    "/assets/hotel/js/tabulator.js",
    "/assets/hotel/js/lib/ag-grid-community.min.js",
    "/assets/hotel/js/lib/mousetrap.min.js"]




# include js, css files in header of web template
# web_include_css = "/assets/hotel/css/hotel.css"
# web_include_js = "/assets/hotel/js/hotel.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "hotel/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "hotel.install.before_install"
# after_install = "hotel.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "hotel.uninstall.before_uninstall"
# after_uninstall = "hotel.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "hotel.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"hotel.tasks.all"
# 	],
# 	"daily": [
# 		"hotel.tasks.daily"
# 	],
# 	"hourly": [
# 		"hotel.tasks.hourly"
# 	],
# 	"weekly": [
# 		"hotel.tasks.weekly"
# 	]
# 	"monthly": [
# 		"hotel.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "hotel.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "hotel.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "hotel.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

user_data_fields = [
	{
		"doctype": "{doctype_1}",
		"filter_by": "{filter_by}",
		"redact_fields": ["{field_1}", "{field_2}"],
		"partial": 1,
	},
	{
		"doctype": "{doctype_2}",
		"filter_by": "{filter_by}",
		"partial": 1,
	},
	{
		"doctype": "{doctype_3}",
		"strict": False,
	},
	{
		"doctype": "{doctype_4}"
	}
]


fixtures = [
    {
        'dt': 'Custom Field',
        'filters': {
            'name': ['in', [
                'Sales Order-room_reservation',
                'Sales Order-guest',
                'Sales Order-check_in',
                'Sales Order-no_of_nights',
                'Sales Order-check_out',
                'Sales Order-no_of_guest',
                'Sales Order-reservation_notes_cf',
                'Sales Order-column_break_reservation',
                'Sales Order-hotel_room_type',
                'Sales Order-hotel_room',
                'Sales Order-room_no',
                'Sales Order-room_rate',
                'Sales Order-weekend_rate',
                'Item-room_type'
            ]]
        },
    },
    {
        "doctype": "Property Setter",
        "filters": [["name", "in", ("Sales Order-delivery_status-in_standard_filter"),("Sales Order-billing_status-in_standard_filter"),("Sales Order-billing_status-no_copy"),("Sales Order-per_delivered-in_list_view"),
                     ("Sales Order-from_date-hidden"),("Sales Order-from_date-in_standard_filter"),("Sales Order-from_date-in_list_view"),
                     ("Sales Order-to_date-hidden"),("Sales Order-to_date-in_standard_filter"),("Sales Order-to_date-in_list_view"),
                     ("Sales Order-delivery_date-in_list_view"),("Sales Order-delivery_date-hidden")]],
    },
]
# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"hotel.auth.validate"
# ]

# Translation
# --------------------------------

# Make link fields search translated document names for these DocTypes
# Recommended only for DocTypes which have limited documents with untranslated names
# For example: Role, Gender, etc.
# translated_search_doctypes = []
