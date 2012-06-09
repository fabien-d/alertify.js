(function (global, undefined) {
	"use strict";

	var document = global.document,
	    WhatUp;

	WhatUp = function () {

		var init, build, hide, alert, confirm, log, prompt,
		    cover, dialogs, element,

		    setEvents,
		    callback;

		dialogs = {
			buttons : {
				holder : "<nav class=\"wu-buttons\">{{buttons}}</nav>",
				ok     : "<a class=\"wu-button wu-button-ok\" id=\"wuOK\">OK</a>",
				cancel : "<a class=\"wu-button wu-button-cancel\" id=\"wuCancel\">Cancel</a>"
			},
			input   : "<input type=\"text\" class=\"wu-text\">",
			message : "<p class=\"wu-message\">{{message}}</p>"
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
		};

		/**
		 * Build the proper message box
		 * 
		 * @param  {String} type    The type of message box to build
		 * @param  {String} message The message passed from the function
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
					break;
				case "alert":
					html = html.replace("{{buttons}}", dialogs.buttons.ok);
					break;
				default:
					break;
			}

			element.className = "whatup wu-" + type;
			cover.className   = "wu-cover";
			return html;
		};

		/**
		 * Hide the dialog and rest to defaults
		 */
		hide = function () {
			callback = null;
			element.className = "whatup wu-hidden";
			cover.className   = "wu-cover wu-hidden";
			element.innerHTML = "";
		};

		/**
		 * Set the proper button click events
		 */
		setEvents = function () {
			var btnOK     = document.getElementById("wuOK") || undefined,
			    btnCancel = document.getElementById("wuCancel") || undefined;

			if (typeof btnOK !== "undefined") {
				btnOK.addEventListener("click", function () {
					if (typeof callback === "function") { callback(true); }
					hide();
				}, false);
			}

			if (typeof btnCancel !== "undefined") {
				btnCancel.addEventListener("click", function () {
					if (typeof callback === "function") { callback(false); }
					hide();
				}, false);
			}
		};

		/**
		 * Create an alert dialog box
		 * 
		 * @param  {String}   message The message passed from the function
		 * @param  {Function} fn      [Optional] Callback function
		 */
		alert = function (message, fn) {
			if (typeof fn === "function") { callback = fn; }
			element.innerHTML = build("alert", message);
			setEvents();
		};

		/**
		 * Create a confirm dialog box
		 * 
		 * @param  {String}   message The message passed from the function
		 * @param  {Function} fn      [Optional] Callback function
		 */
		confirm = function (message, fn) {
			if (typeof fn === "function") { callback = fn; }
			element.innerHTML = build("confirm", message);
			setEvents();
		};

		log = function (message) {
			// NEEDS TO CLOSE ON A TIMER
		};

		/**
		 * Create a prompt dialog box
		 * 
		 * @param  {String}   message The message passed from the function
		 * @param  {Function} fn      [Optional] Callback function
		 */
		prompt = function (message, fn) {
			if (typeof fn === "function") { callback = fn; }
			element.innerHTML = build("prompt", message);
			setEvents();
			// NEEDS TO PASS THE ENTERED VALUE
		};

		// Bootstrap
		init();

		return {
			alert   : alert,
			confirm : confirm,
			log     : log,
			prompt  : prompt
		};
	};

	if (typeof global.whatup === "undefined") { global.whatup = WhatUp(); }
}(this));