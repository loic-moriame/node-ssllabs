var should = require("should"),
mocha = require("mocha"),
ssllabs = require("../lib/ssllabs.js");

describe("ssllabs", function () {

	describe("library", function () {

		it("should check SSL Labs availability", function (done) {
			ssllabs.info(function (err, info) {
				if (err) {
					return done(err);
				}
				info.should.have.properties([
					"criteriaVersion",
					"currentAssessments",
					"engineVersion",
					"maxAssessments",
					"messages"
				]);
				info.currentAssessments.should.be.a.number;
				info.maxAssessments.should.be.a.number;
				info.messages.should.be.an.array;
				done();
			});
		});

		it("should invoke assessment", function(done) {
			var options;

			options = {
				all: "done",
				host: "keithws.net",
				publish: true,
				startNew: false
			};

			ssllabs.analyze(options, function (err, host) {
				if (err) {
					return done(err);
				}
				host.status.should.be.ok;
				done();
			});
		});

		it("should check progress", function(done) {
			var options;

			options = {
				all: "done",
				host: "keithws.net",
				publish: true
			};

			ssllabs.analyze(options, function (err, host) {
				if (err) {
					return done(err);
				}
				host.status.should.be.ok;
				done();
			});
		});

		it("should retrieve detailed endpoint information", function (done) {
			var options;

			options = {
				host: "ssllabs.com",
				s: "64.41.200.100"
			}

			ssllabs.getEndpointData(options, function (err, endpoint) {
				if (err) {
					throw err;
				}
				endpoint.statusMessage.should.be.ok;
				endpoint.ipAddress.should.equal("64.41.200.100");
				done();
			});
		});
	});

});