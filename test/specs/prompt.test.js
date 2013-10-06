( function () {

    setup( function () {
        this.prompt = alertify.prompt( 'test', 'default value' );
        this.ok = document.getElementById( 'alertifyButtonOk' );
        this.cancel = document.getElementById( 'alertifyButtonCancel' );
    } );

    suite( 'alertify.prompt return', function () {
        test( 'message string', function () {
            assert.isString( this.prompt.message );
        } );

        test( 'message value', function () {
            assert.strictEqual( this.prompt.message, 'test' );
        } );

        test( 'type string', function () {
            assert.isString( this.prompt.type );
        } );

        test( 'type value', function () {
            assert.strictEqual( this.prompt.type, 'prompt' );
        } );

        test( 'onOK method', function () {
            assert.isFunction( this.prompt.onOK );
        } );

        test( 'onCancel method', function () {
            assert.isFunction( this.prompt.onCancel );
        } );
    } );

    suite( 'alertify.prompt prototype', function () {
        test( 'show method', function () {
            assert.isFunction( this.prompt.show );
        } );

        test( 'close method', function () {
            assert.isFunction( this.prompt.close );
        } );

        test( 'el property', function () {
            assert.isObject( this.prompt.el );
        } );
    } );

    suite( 'alertify.prompt show method', function () {
        test( 'custom onshow method', function ( done ) {
            this.prompt.onshow = function () {
                done();
            };

            this.prompt.show();
        } );

        test( 'sets proper classes', function () {
            this.prompt.show();
            assert.strictEqual( this.prompt.el.className, 'alertify alertify--prompt' );
        } );

        test( 'sets proper title', function () {
            this.prompt.show();
            assert.strictEqual( document.getElementById( 'alertifyTitle' ).innerHTML, 'test' );
        } );

        test( 'sets default value in input field', function () {
            this.prompt.show();
            assert.strictEqual( document.getElementById( 'alertifyInput' ).value, 'default value' );
        } );
    } );

    suite( 'alertify.prompt close method', function () {
        test( 'custom onclose method', function ( done ) {
            this.prompt.onclose = function () {
                done();
            };

            this.prompt.close();
        } );

        test( 'sets proper classes', function () {
            this.prompt.show();
            this.prompt.close();
            assert.strictEqual( this.prompt.el.className, 'alertify alertify--prompt alertify-close' );
        } );
    } );

    suite( 'alertify.prompt accept method', function () {
        test( 'accept method after OK button click', function ( done ) {
            this.prompt.accept = function () {
                done();
            };

            this.prompt.show();
            triggerClick( this.ok );
        } );
    } );

    suite( 'alertify.prompt deny method', function () {
        test( 'deny method after Cancel button click', function ( done ) {
            this.prompt.deny = function () {
                done();
            };

            this.prompt.show();
            triggerClick( this.cancel );
        } );
    } );

} () );
