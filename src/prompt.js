    /**
     * Prompt dialog object
     *
     * @param  {String} message Prompt message
     * @return {Object}
     */
    function AlertifyPrompt ( message, value ) {
        // prompt properties
        this.message = message;
        this.value = value;
        this.type = 'prompt';
    }

    // Add the common dialog functionality to the prototype
    AlertifyPrompt.prototype = dialog;
