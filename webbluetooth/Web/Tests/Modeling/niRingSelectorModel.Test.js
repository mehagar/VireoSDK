﻿//****************************************
// Tests for RingSelectorModel class
// National Instruments Copyright 2015
//****************************************

describe('A RingSelectorModel', function () {
    'use strict';

    var controlModel;
    var niControlId = 'testId';
    var top = 100;
    var left = 200;
    var width = 300;
    var height = 400;
    var visible = true;
    var items = [{ value: 0, displayValue: 'first'}, { value: 2, displayValue: 'second'}, { value: 10, displayValue: 'third'}];

    var otherItems = [{ value: 0, displayValue: 'a' }, { value: 2, displayValue: 'b' }, { value: 10, displayValue: 'c' }];
    var allowUndefined = false;
    var numericIndex = 0;
    var completeSettings = {};
    var otherSettings = {};

    beforeEach(function () {
        completeSettings = {
            top: top,
            left: left,
            width: width,
            height: height,
            visible: visible,
            allowUndefined: allowUndefined,
            items: items,
            value: numericIndex
        };

        otherSettings = {
            top: top + 1,
            left: left + 1,
            width: width + 1,
            height: height + 1,
            visible: !visible,
            allowUndefined: !allowUndefined,
            items: otherItems,
            value: 2
        };

        controlModel = new NationalInstruments.HtmlVI.Models.RingSelectorModel(niControlId);
    });

    // -------------------------------------------------
    // Testing setters and getters for properties
    // -------------------------------------------------

    it('can be constructed', function () {
        expect(controlModel).toBeDefined();
        expect(controlModel.niControlId).toEqual(niControlId);
    });

    it('can get and set the value property', function () {
        controlModel.value = numericIndex;
        expect(controlModel.value).toEqual(numericIndex);
    });

    it('can get and set the allowUndefined property', function () {
        controlModel.allowUndefined = allowUndefined;
        expect(controlModel.allowUndefined).toEqual(allowUndefined);
    });

    it('can get and set the source property', function () {
        controlModel.items = items;
        expect(controlModel.items).toEqual(items);
    });

    // -------------------------------------------------
    // Testing behavior (methods)
    // -------------------------------------------------
    it('allows to call the setMultipleProperties method to update Model properties', function () {
        controlModel.setMultipleProperties(completeSettings);
        expect(controlModel.width).toEqual(width);
        expect(controlModel.height).toEqual(height);
        expect(controlModel.value).toEqual(numericIndex);
        expect(controlModel.allowUndefined).toEqual(allowUndefined);
        expect(controlModel.items).toEqual(items);
    });

    it('allows to call the setMultipleProperties method to update Model properties', function () {
        controlModel.setMultipleProperties(otherSettings);
        expect(controlModel.top).toEqual(otherSettings.top);
        expect(controlModel.left).toEqual(otherSettings.left);
        expect(controlModel.width).toEqual(otherSettings.width);
        expect(controlModel.height).toEqual(otherSettings.height);
        expect(controlModel.value).toEqual(otherSettings.value);
        expect(controlModel.allowUndefined).toEqual(otherSettings.allowUndefined);
        expect(controlModel.items).toEqual(otherSettings.items);
    });
});
