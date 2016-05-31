/* eslint-env karma, jasmine */
/* eslint strict: [2, false] */
describe("Dialog Unit Tests:", function () {
    var $alertify;

    beforeEach(function() {
        alertify.reset();
        alertify.clearLogs();
        $alertify = alertify._$$alertify;
    });

    describe("Creating logs", function() {

        it("should create elements", function(done) {
            alertify.log('rolls down stairs');
            alertify.error('all over in pairs');
            setTimeout(function() {
                expect(document.querySelector(".alertify-logs .default").innerHTML).toBe("rolls down stairs");
                expect(document.querySelector(".alertify-logs .error").innerHTML).toBe("all over in pairs");
                done();
            }, 100);
        });

        it("should use a templating method", function(done) {
            alertify.setLogTemplate(function (input) {
                return input + ' sang kowalski';
            });
            alertify.log("it rolls over your neighbor's dog");
            alertify.error("it's great for a snack");
            
            setTimeout(function() {
                expect(document.querySelector(".alertify-logs .default").innerHTML).toBe("it rolls over your neighbor's dog sang kowalski");
                expect(document.querySelector(".alertify-logs .error").innerHTML).toBe("it's great for a snack sang kowalski");
                done();
            }, 100);
        });

        it("should reset", function () {
            alertify.setLogTemplate(function (input) {
                return input + ' sang kowalski';
            });
            alertify.reset();
            expect(alertify._$$alertify.logTemplateMethod).toBe(null);

        });

    });

});
