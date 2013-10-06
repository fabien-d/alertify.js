( function () {

    suite( 'alertify global object', function () {
        test( '`alertify` object', function () {
            assert.isObject( alertify );
        } );
    } );

    suite( 'alertify public API', function () {
        test( '`alert` method', function () {
            assert.isFunction( alertify.alert );
        } );

        test( '`confirm` method', function () {
            assert.isFunction( alertify.confirm );
        } );

        test( '`prompt` method', function () {
            assert.isFunction( alertify.prompt );
        } );

        test( '`settings` object', function () {
            assert.isObject( alertify.settings );
        } );

        test( '`settings.ok` string', function () {
            assert.isString( alertify.settings.ok );
        } );

        test( '`settings.cancel` string', function () {
            assert.isString( alertify.settings.cancel );
        } );

        test( '`settings.focus` string', function () {
            assert.isString( alertify.settings.focus );
        } );
    } );

} () );
