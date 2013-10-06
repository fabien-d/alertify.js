    /**
     * Alert dialog object
     *
     * @param  {String} message Alert message
     * @return {Object}
     */
    function AlertifyAlert ( message ) {
        // alert properties
        this.message = message;
        this.type = 'alert';
    }

    // Add the common dialog functionality to the prototype
    AlertifyAlert.prototype = dialog;
