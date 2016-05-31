/// <reference path="./interfaces/dialog.d.ts" />
/// <reference path="../../alertify-js.d.ts" />
(function () {
    /**
     * Alertify
     */
    var Alertify = (function () {
        function Alertify() {
            this.parent = document.body;
            this.version = "1.0.11";
            this.defaultOkLabel = "Ok";
            this.okLabel = "Ok";
            this.defaultCancelLabel = "Cancel";
            this.cancelLabel = "Cancel";
            this.defaultMaxLogItems = 2;
            this.maxLogItems = 2;
            this.promptValue = "";
            this.promptPlaceholder = "";
            this.closeLogOnClick = false;
            this.closeLogOnClickDefault = false;
            this.delay = 5000;
            this.defaultDelay = 5000;
            this.logContainerClass = "alertify-logs";
            this.logContainerDefaultClass = "alertify-logs";
            this.logTemplateMethod = null;
            this.dialogs = {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            };
            this.defaultDialogs = {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            };
        }
        ;
        Alertify.prototype.build = function (item) {
            var btnTxt = this.dialogs.buttons.ok;
            var html = "<div class='dialog'><div> " + this.dialogs.message.replace("{{message}}", item.message);
            if (item.type === "confirm" || item.type === "prompt") {
                btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
            }
            if (item.type === "prompt") {
                html += this.dialogs.input;
            }
            html = ("" + html + this.dialogs.buttons.holder + "</div></div>")
                .replace("{{buttons}}", btnTxt)
                .replace("{{ok}}", this.okLabel)
                .replace("{{cancel}}", this.cancelLabel);
            return html;
        };
        ;
        Alertify.prototype.setCloseLogOnClick = function (bool) {
            this.closeLogOnClick = !!bool;
        };
        ;
        Alertify.prototype.close = function (elem, wait) {
            if (this.closeLogOnClick) {
                elem.addEventListener("click", function () {
                    Alertify.hideElement(elem);
                });
            }
            wait = wait && !isNaN(+wait) ? +wait : this.delay;
            if (wait < 0) {
                Alertify.hideElement(elem);
            }
            else if (wait > 0) {
                setTimeout(function () {
                    Alertify.hideElement(elem);
                }, wait);
            }
        };
        ;
        Alertify.prototype.dialog = function (message, type, onOkay, onCancel) {
            return this.setup({
                type: type,
                message: message,
                onOkay: onOkay,
                onCancel: onCancel
            });
        };
        ;
        Alertify.prototype.log = function (message, type, click) {
            var existing = document.querySelectorAll(".alertify-logs > div");
            if (existing) {
                var diff = existing.length - this.maxLogItems;
                if (diff >= 0) {
                    for (var i = 0, _i = diff + 1; i < _i; i++) {
                        this.close(existing[i], -1);
                    }
                }
            }
            this.notify(message, type, click);
        };
        ;
        Alertify.prototype.setLogPosition = function (str) {
            this.logContainerClass = "alertify-logs " + str;
        };
        ;
        Alertify.prototype.setupLogContainer = function () {
            var elLog = document.querySelector(".alertify-logs");
            var className = this.logContainerClass;
            if (!elLog) {
                elLog = document.createElement("div");
                elLog.className = className;
                this.parent.appendChild(elLog);
            }
            // Make sure it's positioned properly.
            if (elLog.className !== className) {
                elLog.className = className;
            }
            return elLog;
        };
        ;
        Alertify.prototype.notify = function (message, type, click) {
            var elLog = this.setupLogContainer();
            var log = document.createElement("div");
            log.className = (type || "default");
            if (this.logTemplateMethod) {
                log.innerHTML = this.logTemplateMethod(message);
            }
            else {
                log.innerHTML = message;
            }
            // Add the click handler, if specified.
            if ("function" === typeof click) {
                log.addEventListener("click", function (ev) { return click(ev); });
            }
            elLog.appendChild(log);
            setTimeout(function () {
                log.className += " show";
            }, 10);
            this.close(log, this.delay);
        };
        ;
        Alertify.prototype.setup = function (item) {
            var el = document.createElement("div");
            el.className = "alertify hide";
            el.innerHTML = this.build(item);
            var btnOK = el.querySelector(".ok");
            var btnCancel = el.querySelector(".cancel");
            var input = el.querySelector("input");
            var label = el.querySelector("label");
            // Set default value/placeholder of input
            if (input) {
                if (typeof this.promptPlaceholder === "string") {
                    // Set the label, if available, for MDL, etc.
                    if (label) {
                        label.textContent = this.promptPlaceholder;
                    }
                    else {
                        input.placeholder = this.promptPlaceholder;
                    }
                }
                if (typeof this.promptValue === "string") {
                    input.value = this.promptValue;
                }
            }
            function setupHandlers(resolve) {
                if ("function" !== typeof resolve) {
                    // promises are not available so resolve is a no-op
                    resolve = function () { };
                }
                if (btnOK) {
                    btnOK.addEventListener("click", function (ev) {
                        if (item.onOkay && "function" === typeof item.onOkay) {
                            if (input) {
                                item.onOkay(input.value, ev);
                            }
                            else {
                                item.onOkay(ev);
                            }
                        }
                        if (input) {
                            resolve({
                                buttonClicked: "ok",
                                inputValue: input.value,
                                event: ev
                            });
                        }
                        else {
                            resolve({
                                buttonClicked: "ok",
                                event: ev
                            });
                        }
                        Alertify.hideElement(el);
                    });
                }
                if (btnCancel) {
                    btnCancel.addEventListener("click", function (ev) {
                        if (item.onCancel && "function" === typeof item.onCancel) {
                            item.onCancel(ev);
                        }
                        resolve({
                            buttonClicked: "cancel",
                            event: ev
                        });
                        Alertify.hideElement(el);
                    });
                }
                if (input) {
                    input.addEventListener("keyup", function (ev) {
                        if (ev.which === 13) {
                            btnOK.click();
                        }
                    });
                }
            }
            var promise;
            if (typeof Promise === "function") {
                promise = new Promise(setupHandlers);
            }
            else {
                setupHandlers();
            }
            this.parent.appendChild(el);
            setTimeout(function () {
                el.classList.remove("hide");
                if (input && item.type && item.type === "prompt") {
                    input.select();
                    input.focus();
                }
                else {
                    if (btnOK) {
                        btnOK.focus();
                    }
                }
            }, 100);
            return promise;
        };
        ;
        Alertify.prototype.okBtn = function (label) {
            this.okLabel = label;
            return this;
        };
        ;
        Alertify.prototype.setDelay = function (time) {
            time = time || 0;
            this.delay = isNaN(time) ? this.defaultDelay : parseInt(time.toString(), 10);
            return this;
        };
        ;
        Alertify.prototype.cancelBtn = function (str) {
            this.cancelLabel = str;
            return this;
        };
        ;
        Alertify.prototype.setMaxLogItems = function (num) {
            var value = num || this.defaultMaxLogItems;
            this.maxLogItems = parseInt(value.toString());
        };
        ;
        Alertify.prototype.theme = function (themeStr) {
            switch (themeStr.toLowerCase()) {
                case "bootstrap":
                    this.dialogs.buttons.ok = "<button class='ok btn btn-primary' tabindex='1'>{{ok}}</button>";
                    this.dialogs.buttons.cancel = "<button class='cancel btn btn-default' tabindex='2'>{{cancel}}</button>";
                    this.dialogs.input = "<input type='text' class='form-control'>";
                    break;
                case "purecss":
                    this.dialogs.buttons.ok = "<button class='ok pure-button' tabindex='1'>{{ok}}</button>";
                    this.dialogs.buttons.cancel = "<button class='cancel pure-button' tabindex='2'>{{cancel}}</button>";
                    break;
                case "mdl":
                case "material-design-light":
                    this.dialogs.buttons.ok = "<button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{{ok}}</button>";
                    this.dialogs.buttons.cancel = "<button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{{cancel}}</button>";
                    this.dialogs.input = "<div class='mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input'><label class='md-textfield__label'></label></div>";
                    break;
                case "angular-material":
                    this.dialogs.buttons.ok = "<button class='ok md-primary md-button' tabindex='1'>{{ok}}</button>";
                    this.dialogs.buttons.cancel = "<button class='cancel md-button' tabindex='2'>{{cancel}}</button>";
                    this.dialogs.input = "<div layout='column'><md-input-container md-no-float><input type='text'></md-input-container></div>";
                    break;
                case "default":
                default:
                    this.dialogs.buttons.ok = this.defaultDialogs.buttons.ok;
                    this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel;
                    this.dialogs.input = this.defaultDialogs.input;
                    break;
            }
        };
        ;
        Alertify.prototype.reset = function () {
            this.parent = document.body;
            this.theme("default");
            this.okBtn(this.defaultOkLabel);
            this.cancelBtn(this.defaultCancelLabel);
            this.setMaxLogItems();
            this.promptValue = "";
            this.promptPlaceholder = "";
            this.delay = this.defaultDelay;
            this.setCloseLogOnClick(this.closeLogOnClickDefault);
            this.setLogPosition("bottom left");
            this.logTemplateMethod = null;
        };
        ;
        Alertify.prototype.injectCSS = function () {
            if (!document.querySelector("#alertifyCSS")) {
                var head = document.getElementsByTagName("head")[0];
                var css = document.createElement("style");
                css.type = "text/css";
                css.id = "alertifyCSS";
                css.innerHTML = "/* style.css */";
                head.insertBefore(css, head.firstChild);
            }
        };
        ;
        Alertify.prototype.removeCSS = function () {
            var css = document.querySelector("#alertifyCSS");
            if (css && css.parentNode) {
                css.parentNode.removeChild(css);
            }
        };
        ;
        Alertify.TRANSITION_FALLBACK_DURATION = 500;
        Alertify.hideElement = function (el) {
            if (!el) {
                return;
            }
            var removeThis = function () {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            };
            el.classList.remove("show");
            el.classList.add("hide");
            el.addEventListener("transitionend", removeThis);
            // Fallback for no transitions.
            setTimeout(removeThis, Alertify.TRANSITION_FALLBACK_DURATION);
        };
        return Alertify;
    }());
    ;
    var _alertify = new Alertify();
    var _exposed = {
        _$$alertify: _alertify,
        parent: function (elem) {
            _alertify.parent = elem;
        },
        reset: function () {
            _alertify.reset();
            return _exposed;
        },
        alert: function (message, onOkay, onCancel) {
            return _alertify.dialog(message, "alert", onOkay, onCancel) || _exposed;
        },
        confirm: function (message, onOkay, onCancel) {
            return _alertify.dialog(message, "confirm", onOkay, onCancel) || _exposed;
        },
        prompt: function (message, onOkay, onCancel) {
            return _alertify.dialog(message, "prompt", onOkay, onCancel) || _exposed;
        },
        log: function (message, click) {
            _alertify.log(message, "default", click);
            return _exposed;
        },
        theme: function (themeStr) {
            _alertify.theme(themeStr);
            return _exposed;
        },
        success: function (message, click) {
            _alertify.log(message, "success", click);
            return _exposed;
        },
        error: function (message, click) {
            _alertify.log(message, "error", click);
            return _exposed;
        },
        cancelBtn: function (label) {
            _alertify.cancelBtn(label);
            return _exposed;
        },
        okBtn: function (label) {
            _alertify.okBtn(label);
            return _exposed;
        },
        delay: function (time) {
            _alertify.setDelay(time);
            return _exposed;
        },
        placeholder: function (str) {
            _alertify.promptPlaceholder = str;
            return _exposed;
        },
        defaultValue: function (str) {
            _alertify.promptValue = str;
            return _exposed;
        },
        maxLogItems: function (num) {
            _alertify.setMaxLogItems(num);
            return _exposed;
        },
        closeLogOnClick: function (bool) {
            _alertify.setCloseLogOnClick(!!bool);
            return _exposed;
        },
        logPosition: function (str) {
            _alertify.setLogPosition(str || "");
            return _exposed;
        },
        setLogTemplate: function (templateMethod) {
            _alertify.logTemplateMethod = templateMethod;
            return _exposed;
        },
        clearLogs: function () {
            _alertify.setupLogContainer().innerHTML = "";
            return _exposed;
        },
        version: _alertify.version
    };
    if ("undefined" !== typeof module && !!module && !!module.exports) {
        // Preserve backwards compatibility
        module.exports = function () {
            return _exposed;
        };
        var obj = _exposed;
        for (var key in obj) {
            module.exports[key] = obj[key];
        }
    }
    else if (typeof define === "function" && define.amd) {
        define(function () {
            return _exposed;
        });
    }
    else {
        window.alertify = _exposed;
    }
})();
