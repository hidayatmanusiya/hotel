# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt


import frappe
from frappe import _, bold, throw
from frappe.contacts.doctype.address.address import get_address_display
from frappe.utils import cint, cstr, flt, get_link_to_form, nowtime

from erpnext.controllers.accounts_controller import get_taxes_and_charges
from erpnext.controllers.sales_and_purchase_return import get_rate_for_return


class Reservation(Reservation):
	pass