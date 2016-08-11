//****************************************
// Tests for IONameControlModel class
// National Instruments Copyright 2015
//****************************************

describe('A IONameControlModel', function () {
    'use strict';

    var controlModel;
    var niControlId = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var visible = true;
    var source = ['channel/1', 'channel\\2', 'channel 3'];
    var otherSource = ['alpha', 'beta', 'charlie'];
    var selectedValue = 'channel 3';
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            top: top,
            left: left,
            width: width,
            height: height,
            visible: visible,
            source: source,
            selectedValue: selectedValue
        };

        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            visible: !visible,
            source: otherSource,
            selectedValue: selectedValue
        };

        controlModel = new NationalInstruments.HtmlVI.Models.IONameControlModel(niControlId);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------

    it('can be constructed', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.niControlId).toEqual(niControlId);
    });

    it('can get and set the selectedIndex property', function () {
        controlModel.selectedValue = selectedValue;
        expect(controlModel.selectedValue).toEqual(selectedValue);
    });

    it('can get and set the source property', function () {
        controlModel.source = source;
        expect(controlModel.source).toEqual(source);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the setMultipleProperties method to update Model properties', function () {
        controlModel.setMultipleProperties(completeSettings);
        expect(controlModel.width).toEqual(width);
        expect(controlModel.height).toEqual(height);
        expect(controlModel.selectedValue).toEqual(selectedValue);
        expect(controlModel.source).toEqual(source);
    });

    it('allows to call the setMultipleProperties method to update Model properties', function () {
        controlModel.setMultipleProperties(otherSettings);
        expect(controlModel.top).toEqual(otherSettings.top);
        expect(controlModel.left).toEqual(otherSettings.left);
        expect(controlModel.width).toEqual(otherSettings.width);
        expect(controlModel.height).toEqual(otherSettings.height);
        expect(controlModel.selectedValue).toEqual(otherSettings.selectedValue);
        expect(controlModel.source).toEqual(otherSettings.source);
    });
});
