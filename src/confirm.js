    /**
     * Confirm dialog object
     *
     * @param  {String} message Confirm message
     * @return {Object}
     */
    function AlertifyConfirm ( message ) {
        var self = this;

        // confirm properties
        this.message = message;
        this.type = 'confirm';

        /**
         * Handle clicking OK
         *
         * @param  {MouseEvent} event Mouse event
         * @return {undefined}
         */
        this.onOK = function ( event ) {
            self.onAccept.call( self, event );
        };

        /**
         * Handle clicking Cancel
         *
         * @param  {MouseEvent} event Mouse event
         * @return {undefined}
         */
        this.onCancel = function ( event ) {
            self.onDeny.call( self, event );
        };
    }

    // Add the common dialog functionality to the prototype
    AlertifyConfirm.prototype = dialog;
