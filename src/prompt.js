    /**
     * Prompt dialog object
     *
     * @param  {String} message Prompt message
     * @return {Object}
     */
    function AlertifyPrompt ( message, value ) {
        var self = this;

        // prompt properties
        this.message = message;
        this.value = value;
        this.type = 'prompt';

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
    AlertifyPrompt.prototype = dialog;
