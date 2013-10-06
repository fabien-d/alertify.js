    /**
     * Alert dialog object
     *
     * @param  {String} message Alert message
     * @return {Object}
     */
    function AlertifyAlert ( message ) {
        var self = this;

        // alert properties
        this.message = message;
        this.type = 'alert';

        /**
         * Handle clicking OK
         *
         * @param  {MouseEvent} event Mouse event
         * @return {undefined}
         */
        this.onOK = function ( event ) {
            self.onAccept.call( self, event );
        };
    }

    // Add the common dialog functionality to the prototype
    AlertifyAlert.prototype = dialog;
