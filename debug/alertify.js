(function (global, undefined) {
	"use strict";

	var document = global.document,
	    Alertify;

	Alertify = function () {

		var init, addListeners, bind, build, close, hide, notify, setup, alert, confirm, log, prompt,
		    $, cover, delay = 5000, dialogs, element, labels, logElement;

		labels = {
			ok     : "OK",
			cancel : "Cancel"
		};

		dialogs = {
			buttons : {
				holder : "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
				ok     : "<a class=\"alertify-button alertify-button-ok\" id=\"aOK\">{{ok}}</a>",
				cancel : "<a class=\"alertify-button alertify-button-cancel\" id=\"aCancel\">{{cancel}}</a>"
			},
			input   : "<input type=\"text\" class=\"alertify-text\" id=\"aText\">",
			message : "<p class=\"alertify-message\">{{message}}</p>",
			log     : "<article id=\"log-{{id}}\" class=\"alertify-log\">{{message}}</article>"
		};

		/**
		 * Shorthand for document.getElementById()
		 * 
		 * @param  {String} id A specific element ID
		 * @return {Object}    HTML element
		 */
		$ = function (id) {
			return document.getElementById(id);
		};

		/**
		 * Initialize Alertify
		 * Create the 2 main elements
		 */
		init = function () {
			// cover
			cover = document.createElement("div");
			cover.setAttribute("id", "alertifycover");
			cover.className = "alertify-cover alertify-hidden";
			document.body.appendChild(cover);
			// main element
			element = document.createElement("section");
			element.setAttribute("id", "alertify");
			element.className = "alertify alertify-hidden";
			document.body.appendChild(element);
			// main element
			logElement = document.createElement("section");
			logElement.setAttribute("id", "alertifylogs");
			logElement.className = "alertify-logs";
			document.body.appendChild(logElement);
		};

		/**
		 * Set the proper button click events
		 *
		 * @param {Function} fn [Optional] Callback function
		 */
		addListeners = function (fn) {
			var btnOK     = $("aOK")     || undefined,
			    btnCancel = $("aCancel") || undefined,
			    input     = $("aText")   || undefined,
			    val       = "";

			// handle OK click
			if (typeof btnOK !== "undefined") {
				bind(btnOK, "click", function () {
					hide();
					if (typeof input !== "undefined") { val = input.value; }
					if (typeof fn === "function")     { fn(true, val); }
				});
			}

			// handle Cancel click
			if (typeof btnCancel !== "undefined") {
				bind(btnCancel, "click", function () {
					hide();
					if (typeof fn === "function") { fn(false); }
				});
			}
		};

		/**
		 * Bind events to elements
		 * 
		 * @param  {Object}   el    HTML Object
		 * @param  {Event}    event Event to attach to element
		 * @param  {Function} fn    Callback function
		 */
		bind = function (el, event, fn) {
			if (typeof el.addEventListener === "function") {
				el.addEventListener(event, fn, false);
			} else if (el.attachEvent) {
				el.attachEvent("on" + event, fn);
			}
		};

		/**
		 * Build the proper message box
		 * 
		 * @param  {String} type    The type of message box to build
		 * @param  {String} message The message passed from the callee
		 * @return {String}         An HTML string of the message box
		 */
		build = function (type, message) {
			var html = "";

			html += "<div class=\"alertify-dialog\">";
			html += 	"<article class=\"alertify-inner\">";
			html += 		dialogs.message.replace("{{message}}", message);

			if (type === "prompt") { html += dialogs.input; }

			html += 		dialogs.buttons.holder;
			html += 	"</article>";
			html += "</div>";

			switch (type) {
				case "confirm":
				case "prompt":
					html = html.replace("{{buttons}}", dialogs.buttons.cancel + dialogs.buttons.ok);
					html = html.replace("{{ok}}", labels.ok).replace("{{cancel}}", labels.cancel);
					break;
				case "alert":
					html = html.replace("{{buttons}}", dialogs.buttons.ok);
					html = html.replace("{{ok}}", labels.ok);
					break;
				default:
					break;
			}

			element.className = "alertify alertify-show alertify-" + type;
			cover.className   = "alertify-cover";
			return html;
		};

		/**
		 * Close the log messages
		 */
		close = function () {
			setTimeout(function () {
				var child = logElement.childNodes[0];
				if (child instanceof Element) {
					logElement.removeChild(child);
				}
			}, delay);
		};

		/**
		 * Add new log message
		 * 
		 * @param  {String} message The message passed from the callee
		 */
		notify = function (message) {
			logElement.innerHTML += dialogs.log.replace("{{message}}", message);
			close();
		};

		/**
		 * Hide the dialog and rest to defaults
		 */
		hide = function () {
			element.className = "alertify alertify-hide alertify-hidden";
			cover.className   = "alertify-cover alertify-hidden";
		};

		/**
		 * Initiate all the required pieces for the dialog box
		 * 
		 * @param  {String} type    The type of message box to build
		 * @param  {String} message The message passed from the callee
		 * @param  {Function} fn    [Optional] Callback function
		 */
		setup = function (type, message, fn) {
			element.innerHTML = build(type, message);
			addListeners(fn);
		};

		/**
		 * Create an alert dialog box
		 * 
		 * @param  {String}   message The message passed from the callee
		 * @param  {Function} fn      [Optional] Callback function
		 */
		alert = function (message, fn) {
			setup("alert", message, fn);
		};

		/**
		 * Create a confirm dialog box
		 * 
		 * @param  {String}   message The message passed from the callee
		 * @param  {Function} fn      [Optional] Callback function
		 */
		confirm = function (message, fn) {
			setup("confirm", message, fn);
		};

		/**
		 * Show a new log message box
		 * 
		 * @param  {String} message The message passed from the callee
		 * @param  {String} type    [Optional] Optional type of log message
		 */
		log = function (message, type) {
			notify(message);
		};

		/**
		 * Create a prompt dialog box
		 * 
		 * @param  {String}   message The message passed from the function
		 * @param  {Function} fn      [Optional] Callback function
		 */
		prompt = function (message, fn) {
			setup("prompt", message, fn);
		};

		// Bootstrap
		init();

		return {
			alert   : alert,
			confirm : confirm,
			log     : log,
			prompt  : prompt,

			labels  : labels,
			delay   : delay
		};
	};

	if (typeof global.alertify === "undefined") { global.alertify = Alertify(); }
}(this));