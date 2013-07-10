define(["alertify", "proto", "element", "validate", "log"], function (Alertify, AlertifyProto, element, validate, Log) {
    "use strict";

    var init,
        createLog,
        validateParams,
        logs;

    /**
     * Init Method
     * Create the log holder element
     *
     * @return {Object} Log holder element
     */
    init = function () {
        var el = element.create("section", { classes: Alertify._prefix + "-logs" });
        document.body.appendChild(el);
        element.ready(el);
        return el;
    };

    /**
     * Create Log
     *
     * @param  {String} type  Log type
     * @param  {String} msg   Log message
     * @param  {Number} delay [Optional] Delay in ms
     * @return {Object}
     */
    createLog = function (type, msg, delay) {
        validateParams(type, msg, delay);
        this.el = document.body.contains(this.el) ? this.el : init();
        return new Log(this.el, type, msg, delay);
    };

    /**
     * Validate Parameters
     *
     * @param  {String} type  Log type
     * @param  {String} msg   Log message
     * @param  {Number} delay [Optional] Delay in ms
     * @return {undefined}
     */
    validateParams = function (type, msg, delay) {
        if (!validate.isString(type) ||
            !validate.isString(msg) ||
            !validate.isNumber(delay, true)) {
            throw new Error(validate.messages.invalidArguments);
        }
    };

    /**
     * Logs API
     *
     * @type {Object}
     */
    logs = {
        delay : 5000,
        el    : undefined,
        create: function (type, msg, delay) {
            return createLog.call(this, type, msg, delay);
        },
        error: function (msg, delay) {
            return createLog.call(this, "error", msg, delay);
        },
        info: function (msg, delay) {
            return createLog.call(this, "info", msg, delay);
        },
        success: function (msg, delay) {
            return createLog.call(this, "success", msg, delay);
        }
    };

    AlertifyProto.log = logs;

    return logs;
});
