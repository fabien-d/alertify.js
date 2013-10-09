    // AMD and window support
    if ( typeof define === 'function' ) {
        define( [], function () {
            return new Alertify();
        } );
    } else if ( !global.alertify ) {
        global.alertify = new Alertify();
    }

} ( this ) );
