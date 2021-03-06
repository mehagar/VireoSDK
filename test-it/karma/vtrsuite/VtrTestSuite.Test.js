describe('The Vireo VTR test suite', function () {
    'use strict';

    // Reference aliases
    var vireoHelpers = window.vireoHelpers;
    var vireoRunner = window.testHelpers.vireoRunner;
    var fixtures = window.testHelpers.fixtures;
    var testListLoader = window.testHelpers.testListLoader;

    // Sharing Vireo instances across tests make them run soooo much faster
    var vireo;
    beforeAll(async function () {
        vireo = await vireoHelpers.createInstance();

        // VTR tests can't fire JS events, so register no-op registration functions
        vireo.eventHelpers.setRegisterForControlEventsFunction(function () {
            // no-op
        });
        vireo.eventHelpers.setUnRegisterForControlEventsFunction(function () {
            // no-op
        });
    });
    var viaTestNames = testListLoader.getTestNamesForEnvironment('browser');

    var viaTestConfigs = viaTestNames.map(function (testName) {
        return {
            testName: testName,
            viaFile: fixtures.convertToAbsoluteFromViaTestsDir(testName + '.via'),
            vtrFile: fixtures.convertToAbsoluteFromExpectedResultsDir(testName + '.vtr')
        };
    });

    // To disable a test add a key for the test name set to true, ie:
    // {'AwesomeDisabledTest': true}
    var focusTests = {};
    var disabledTests = {};

    viaTestConfigs.forEach(function (viaTestConfig) {
        var testName = viaTestConfig.testName;
        var viaFile = viaTestConfig.viaFile;
        var vtrFile = viaTestConfig.vtrFile;

        describe('can preload ' + testName, function () {
            var testDescription = 'and run ' + testName;
            var test = async function () {
                var vtrText = fixtures.loadAbsoluteUrl(vtrFile);
                var runSlicesAsync;
                try {
                    runSlicesAsync = vireoRunner.rebootAndLoadVia(vireo, viaFile);
                } catch (ex) {
                    expect(ex.message).toMatch(/CantDecode/);
                    expect(ex.rawPrintError).toBeEmptyString();
                    expect(ex.rawPrint).toMatchVtrText(vtrText);
                    return;
                }
                var {rawPrint, rawPrintError} = await runSlicesAsync();
                expect(rawPrintError).toBeEmptyString();
                expect(rawPrint).toMatchVtrText(vtrText);
            };

            beforeEach(function (done) {
                fixtures.preloadAbsoluteUrls([
                    viaFile,
                    vtrFile
                ], done);
            });

            if (focusTests[testName] === true) {
                fit(testDescription, async function () { // eslint-disable-line no-restricted-globals
                    await test();
                });
            } else if (disabledTests[testName] === true) {
                xit(testDescription, async function () {
                    await test();
                });
            } else {
                it(testDescription, async function () {
                    await test();
                });
            }
        });
    });
});
