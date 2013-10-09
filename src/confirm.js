    /**
     * Confirm dialog object
     *
     * @param  {String} message Confirm message
     * @return {Object}
     */
    function AlertifyConfirm ( message ) {
        // confirm properties
        this.message = message;
        this.type = 'confirm';
    }

    // Add the common dialog functionality to the prototype
    AlertifyConfirm.prototype = dialog;
