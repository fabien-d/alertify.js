/// <reference path="./interfaces/dialog.d.ts" />
/// <reference path="../../alertify-js.d.ts" />
declare let Promise: any;
declare let module: any;
declare let define: any;

(function () {
    /**
     * Alertify
     */
    class Alertify {
        private static TRANSITION_FALLBACK_DURATION: number = 500;

        public parent: Element = document.body;
        public version: string = "1.0.11";
        public promptValue: string = "";
        public promptPlaceholder: string = "";
        public logTemplateMethod: Function = null;

        private defaultOkLabel: string = "Ok";
        private okLabel: string = "Ok";
        private defaultCancelLabel: string = "Cancel";
        private cancelLabel: string = "Cancel";
        private defaultMaxLogItems: number = 2;
        private maxLogItems: number = 2;
        private closeLogOnClick: boolean = false;
        private closeLogOnClickDefault: boolean = false;
        private delay: number = 5000;
        private defaultDelay: number = 5000;
        private logContainerClass: string = "alertify-logs";
        private logContainerDefaultClass: string = "alertify-logs";
        private dialogs: Dialog = {
            buttons: {
                holder: "<nav>{{buttons}}</nav>",
                ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>",
            },
            input: "<input type='text'>",
            message: "<p class='msg'>{{message}}</p>",
            log: "<div class='{{class}}'>{{message}}</div>",
        };

        private defaultDialogs: Dialog = {
            buttons: {
                holder: "<nav>{{buttons}}</nav>",
                ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>",
            },
            input: "<input type='text'>",
            message: "<p class='msg'>{{message}}</p>",
            log: "<div class='{{class}}'>{{message}}</div>",
        };

        private static hideElement = (el: Element) => {
            if (!el) {
                return;
            }

            let removeThis = () => {
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

        public setCloseLogOnClick(bool: boolean) {
            this.closeLogOnClick = !!bool;
        };

        public dialog(message: string, type: string, onOkay: Function, onCancel: Function) {
            return this.setup({
                type: type,
                message: message,
                onOkay: onOkay,
                onCancel: onCancel,
            });
        };

        public log(message: string, type: string, click: Function) {
            let existing = document.querySelectorAll(".alertify-logs > div");

            if (existing) {
                let diff = existing.length - this.maxLogItems;
                if (diff >= 0) {
                    for (let i = 0, _i = diff + 1; i < _i; i++) {
                        this.close(existing[i], -1);
                    }
                }
            }

            this.notify(message, type, click);
        };

        public setLogPosition(str: string) {
            this.logContainerClass = `alertify-logs ${str}`;
        };

        public setupLogContainer() {
            let elLog = document.querySelector(".alertify-logs");
            let className = this.logContainerClass;
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

        public okBtn(label: string) {
            this.okLabel = label;
            return this;
        };

        public setDelay(time: number) {
            time = time || 0;
            this.delay = isNaN(time) ? this.defaultDelay : parseInt(time.toString(), 10);
            return this;
        };

        public cancelBtn(str: string) {
            this.cancelLabel = str;
            return this;
        };

        public setMaxLogItems(num?: number) {
            let value = num || this.defaultMaxLogItems;
            this.maxLogItems = parseInt(value.toString());
        };

        public theme(themeStr: string) {
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

        public reset() {
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

        public injectCSS() {
            if (!document.querySelector("#alertifyCSS")) {
                let head = document.getElementsByTagName("head")[0];
                let css = document.createElement("style");
                css.type = "text/css";
                css.id = "alertifyCSS";
                css.innerHTML = "/* style.css */";
                head.insertBefore(css, head.firstChild);
            }
        };

        public removeCSS() {
            let css = document.querySelector("#alertifyCSS");
            if (css && css.parentNode) {
                css.parentNode.removeChild(css);
            }
        };
        private build(item: any): string {
            let btnTxt = this.dialogs.buttons.ok;
            let html = `<div class='dialog'><div> ${this.dialogs.message.replace("{{message}}", item.message)}`;

            if (item.type === "confirm" || item.type === "prompt") {
                btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
            }

            if (item.type === "prompt") {
                html += this.dialogs.input;
            }

            html = (`${html}${this.dialogs.buttons.holder}</div></div>`)
                .replace("{{buttons}}", btnTxt)
                .replace("{{ok}}", this.okLabel)
                .replace("{{cancel}}", this.cancelLabel);

            return html;
        };

        private close(elem: Element, wait: number): void {
            if (this.closeLogOnClick) {
                elem.addEventListener("click", function () {
                    Alertify.hideElement(elem);
                });
            }

            wait = wait && !isNaN(+wait) ? +wait : this.delay;

            if (wait < 0) {
                Alertify.hideElement(elem);
            } else if (wait > 0) {
                setTimeout(function () {
                    Alertify.hideElement(elem);
                }, wait);
            }
        };

        private notify(message: string, type: string, click: Function) {
            let elLog = this.setupLogContainer();
            let log = document.createElement("div");

            log.className = (type || "default");
            if (this.logTemplateMethod) {
                log.innerHTML = this.logTemplateMethod(message);
            } else {
                log.innerHTML = message;
            }

            // Add the click handler, if specified.
            if ("function" === typeof click) {
                log.addEventListener("click", (ev) => click(ev));
            }

            elLog.appendChild(log);
            setTimeout(function () {
                log.className += " show";
            }, 10);

            this.close(log, this.delay);
        };

        private setup(item: any): any {
            let el = document.createElement("div");
            el.className = "alertify hide";
            el.innerHTML = this.build(item);

            let btnOK = <HTMLButtonElement>el.querySelector(".ok");
            let btnCancel = <HTMLButtonElement>el.querySelector(".cancel");
            let input = <HTMLInputElement>el.querySelector("input");
            let label = el.querySelector("label");

            // Set default value/placeholder of input
            if (input) {
                if (typeof this.promptPlaceholder === "string") {
                    // Set the label, if available, for MDL, etc.
                    if (label) {
                        label.textContent = this.promptPlaceholder;
                    } else {
                        input.placeholder = this.promptPlaceholder;
                    }
                }
                if (typeof this.promptValue === "string") {
                    input.value = this.promptValue;
                }
            }

            function setupHandlers(resolve?: Function) {
                if ("function" !== typeof resolve) {
                    // promises are not available so resolve is a no-op
                    resolve = function () { };
                }

                if (btnOK) {
                    btnOK.addEventListener("click", function (ev) {
                        if (item.onOkay && "function" === typeof item.onOkay) {
                            if (input) {
                                item.onOkay(input.value, ev);
                            } else {
                                item.onOkay(ev);
                            }
                        }

                        if (input) {
                            resolve({
                                buttonClicked: "ok",
                                inputValue: input.value,
                                event: ev
                            });
                        } else {
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

            let promise: any;

            if (typeof Promise === "function") {
                promise = new Promise(setupHandlers);
            } else {
                setupHandlers();
            }

            this.parent.appendChild(el);

            setTimeout(function () {
                el.classList.remove("hide");
                if (input && item.type && item.type === "prompt") {
                    input.select();
                    input.focus();
                } else {
                    if (btnOK) {
                        btnOK.focus();
                    }
                }
            }, 100);

            return promise;
        };
    };

    let _alertify = new Alertify();

    let _exposed: IAlertify = {
        _$$alertify: _alertify,
        parent: (elem: Element) => {
            _alertify.parent = elem;
        },
        reset: () => {
            _alertify.reset();
            return _exposed;
        },
        alert: (message: string, onOkay?: Function, onCancel?: Function) => {
            return _alertify.dialog(message, "alert", onOkay, onCancel) || _exposed;
        },
        confirm: (message: string, onOkay?: Function, onCancel?: Function) => {
            return _alertify.dialog(message, "confirm", onOkay, onCancel) || _exposed;
        },
        prompt: (message: string, onOkay?: Function, onCancel?: Function) => {
            return _alertify.dialog(message, "prompt", onOkay, onCancel) || _exposed;
        },
        log: (message: string, click?: Function) => {
            _alertify.log(message, "default", click);
            return _exposed;
        },
        theme: (themeStr: string) => {
            _alertify.theme(themeStr);
            return _exposed;
        },
        success: (message: string, click: Function) => {
            _alertify.log(message, "success", click);
            return _exposed;
        },
        error: (message: string, click: Function) => {
            _alertify.log(message, "error", click);
            return _exposed;
        },
        cancelBtn: (label: string) => {
            _alertify.cancelBtn(label);
            return _exposed;
        },
        okBtn: (label: string) => {
            _alertify.okBtn(label);
            return _exposed;
        },
        delay: (time: number) => {
            _alertify.setDelay(time);
            return _exposed;
        },
        placeholder: (str: string) => {
            _alertify.promptPlaceholder = str;
            return _exposed;
        },
        defaultValue: (str: string) => {
            _alertify.promptValue = str;
            return _exposed;
        },
        maxLogItems: (num: number) => {
            _alertify.setMaxLogItems(num);
            return _exposed;
        },
        closeLogOnClick: (bool: boolean) => {
            _alertify.setCloseLogOnClick(!!bool);
            return _exposed;
        },
        logPosition: (str: string) => {
            _alertify.setLogPosition(str || "");
            return _exposed;
        },
        setLogTemplate: (templateMethod: Function) => {
            _alertify.logTemplateMethod = templateMethod;
            return _exposed;
        },
        clearLogs: () => {
            _alertify.setupLogContainer().innerHTML = "";
            return _exposed;
        },
        version: _alertify.version,
    };

    if ("undefined" !== typeof module && !!module && !!module.exports) {
        // Preserve backwards compatibility
        module.exports = function () {
            return _exposed;
        };
        let obj: any = _exposed;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                module.exports[key] = obj[key];
            }
        }
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return _exposed;
        });
    } else {
        (<any>window).alertify = _exposed;
    }
})();