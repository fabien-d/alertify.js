define([], function () {
    "use strict";

    var _checkValidation,
        validate;

    /**
     * Validate Parameters
     * The validation checks parameter against specified type.
     * If the parameter is set to optional, is will be valid unless
     * a parameter is specified and does not pass the test
     *
     * @param  {String}  type     Type to check parameter against
     * @param  {Mixed}   param    Parameter to check
     * @param  {Boolean} optional [Optional] Whether the parameter is optional
     * @return {Boolean}
     */
    _checkValidation = function (type, param, optional) {
        var valid = false;
        if (optional && typeof param === "undefined") {
            valid = true;
        } else {
            if (type === "object") {
                valid = (typeof param === "object" && !(param instanceof Array));
            } else {
                valid = (typeof param === type);
            }
        }
        return valid;
    };

    /**
     * Validate API
     *
     * @type {Object}
     */
    validate = {
        messages: {
            invalidArguments: "Invalid arguments"
        },
        isFunction: function (param, optional) {
            return _checkValidation("function", param, optional);
        },
        isNumber: function (param, optional) {
            return _checkValidation("number", param, optional);
        },
        isObject: function (param, optional) {
            return _checkValidation("object", param, optional);
        },
        isString: function (param, optional) {
            return _checkValidation("string", param, optional);
        },
    };

    return validate;
});
