(function (global, undefined) {
	"use strict";

	var document = global.document,
	    WhatUp;

	WhatUp = function () {

		var init, addListeners, bind, build, close, hide, notify, setup, alert, confirm, log, prompt,
		    $, cover, delay = 5000, dialogs, element, labels, logElement;

		labels = {
			ok     : "OK",
			cancel : "Cancel"
		};

		dialogs = {
			buttons : {
				holder : "<nav class=\"wu-buttons\">{{buttons}}</nav>",
				ok     : "<a class=\"wu-button wu-button-ok\" id=\"wuOK\">{{ok}}</a>",
				cancel : "<a class=\"wu-button wu-button-cancel\" id=\"wuCancel\">{{cancel}}</a>"
			},
			input   : "<input type=\"text\" class=\"wu-text\" id=\"wuText\">",
			message : "<p class=\"wu-message\">{{message}}</p>",
			log     : "<article id=\"log-{{id}}\" class=\"wu-log\">{{message}}</article>"
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
		 * Initialize WhatUp
		 * Create the 2 main elements
		 */
		init = function () {
			// cover
			cover = document.createElement("div");
			cover.setAttribute("id", "whatupcover");
			cover.className = "wu-cover wu-hidden";
			document.body.appendChild(cover);
			// main element
			element = document.createElement("section");
			element.setAttribute("id", "whatup");
			element.className = "whatup wu-hidden";
			document.body.appendChild(element);
			// main element
			logElement = document.createElement("section");
			logElement.setAttribute("id", "whatuplogs");
			logElement.className = "wu-logs";
			document.body.appendChild(logElement);
		};

		/**
		 * Set the proper button click events
		 *
		 * @param {Function} fn [Optional] Callback function
		 */
		addListeners = function (fn) {
			var btnOK     = $("wuOK")     || undefined,
			    btnCancel = $("wuCancel") || undefined,
			    input     = $("wuText")   || undefined,
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

			html += "<div class=\"wu-dialog\">";
			html += 	"<article class=\"wu-inner\">";
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

			element.className = "whatup wu-" + type;
			cover.className   = "wu-cover";
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
			element.className = "whatup wu-hidden";
			cover.className   = "wu-cover wu-hidden";
			element.innerHTML = "";
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

	if (typeof global.whatup === "undefined") { global.whatup = WhatUp(); }
}(this));