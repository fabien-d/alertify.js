    /**
     * Use a closure to return proper event listener method. Try to use
     * `addEventListener` by default but fallback to `attachEvent` for
     * unsupported browser. The closure simply ensures that the test doesn't
     * happen every time the method is called.
     *
     * @param    {Node}     el    Node element
     * @param    {String}   event Event type
     * @param    {Function} fn    Callback of event
     * @return   {Function}
     */
    var on = ( function () {
        if ( document.addEventListener ) {
            return function ( el, event, fn ) {
                el.addEventListener( event, fn, false );
            };
        } else if ( document.attachEvent ) {
            return function ( el, event, fn ) {
                el.attachEvent( 'on' + event, fn );
            };
        }
    } () );

    /**
     * Use a closure to return proper event listener method. Try to use
     * `removeEventListener` by default but fallback to `detachEvent` for
     * unsupported browser. The closure simply ensures that the test doesn't
     * happen every time the method is called.
     *
     * @param    {Node}     el    Node element
     * @param    {String}   event Event type
     * @param    {Function} fn    Callback of event
     * @return   {Function}
     */
    var off = ( function () {
        if ( document.removeEventListener ) {
            return function ( el, event, fn ) {
                el.removeEventListener( event, fn, false );
            };
        } else if ( document.detachEvent ) {
            return function ( el, event, fn ) {
                el.detachEvent( 'on' + event, fn );
            };
        }
    } () );

    /**
     * Prevent default event from firing
     *
     * @param  {Event} event Event object
     * @return {undefined}
     */
    function prevent ( event ) {
        if ( event.preventDefault ) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    var transition = ( function () {
        var t, type;
        var supported = false;
        var el = document.createElement( 'fakeelement' );
        var transitions = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'otransitionend',
            'transition': 'transitionend'
        };

        for ( t in transitions ) {
            if ( el.style[ t ] !== undefined ) {
                type = transitions[ t ];
                supported = true;
                break;
            }
        }

        return {
            type: type,
            supported: supported
        };
    } () );
