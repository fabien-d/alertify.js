(function (global, undefined) {
	"use strict";

	var document = global.document,
	    // Methods
	    WhatUp,
	    buildDialogs,
	    showDialog,
	    hideDialog,
	    setEvents,
	    // Properties
	    callback,
	    element,
	    dialog,
	    cover,
	    alertHTML   = "",
	    confirmHTML = "",
	    logHTML     = "",
	    promptHTML  = "";

	/**
	 * Initialize WhatUp
	 * Create the 2 main elements
	 */
	WhatUp = function () {
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

		buildDialogs();
	};

	/**
	 * Store the various elements into variables for easy access
	 */
	buildDialogs = function () {
		var btnOK     = "<a class=\"wu-button wu-button-ok\" id=\"wuOK\">OK</a>",
		    btnCancel = "<a class=\"wu-button wu-button-cancel\" id=\"wuCancel\">Cancel</a>";
		
		dialog        = "<div class=\"wu-dialog\">{{type}}</div>";
		alertHTML     = "<article class=\"wu-inner wu-alert\">" +
		                	"<p>{{message}}</p>" +
		                	"<nav class=\"wu-buttons\">" +
		                		btnOK +
		                	"</nav>" +
		                "</article>";
		confirmHTML   = "<article class=\"wu-inner wu-confirm\">" +
		                	"<p>{{message}}</p>" +
		                	"<nav class=\"wu-buttons\">" +
		                	    btnCancel + btnOK +
		                	"</nav>" +
		                "</article>";
		logHTML       = "<article class=\"wu-inner wu-confirm\">" +
		                	"<p>{{message}}</p>" +
		                "</article>";
		promptHTML    = "<article class=\"wu-inner wu-prompt\">" +
		                	"<p>{{message}}</p>" +
		                	"<input type=\"text\" class=\"wu-text\">" +
		                	"<nav class=\"wu-buttons\">" +
		                	    btnCancel + btnOK +
		                	"</nav>" +
		                "</article>";
	};

	/**
	 * Close the dialog box and reset the needs properties
	 */
	hideDialog = function () {
		callback = undefined;
		element.className = "whatup wu-hidden";
		cover.className   = "wu-cover wu-hidden";
		element.innerHTML = "";

		document.body.style.overflow = "visible";
	};

	/**
	 * Build an show the proper dialog box
	 * 
	 * @param  {String} message The message to be displayed, passed from the function call
	 * @param  {String} html    The html string to use to populate the dialog
	 */
	showDialog = function (message, html) {
		element.className = "whatup";
		element.innerHTML = dialog.replace("{{type}}", html.replace("{{message}}", message));
		document.body.style.overflow = "hidden";

		setEvents();
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
				hideDialog();
			}, false);
		}

		if (typeof btnCancel !== "undefined") {
			btnCancel.addEventListener("click", function () {
				if (typeof callback === "function") { callback(false); }
				hideDialog();
			}, false);
		}
	};

	WhatUp.prototype.alert = function (message, fn) {
		if (typeof fn === "function") { callback = fn; }
		showDialog(message, alertHTML);
	};

	WhatUp.prototype.confirm = function (message, fn) {
		if (typeof fn === "function") { callback = fn; }
		showDialog(message, confirmHTML);
	};

	WhatUp.prototype.log = function (message) {
		showDialog(message, logHTML);
		// NEEDS TO CLOSE ON A TIMER
	};

	WhatUp.prototype.prompt = function (message, fn) {
		if (typeof fn === "function") { callback = fn; }
		showDialog(message, promptHTML);
		// NEEDS TO PASS THE ENTERED VALUE
	};

	global.whatup = new WhatUp();
}(this));