/*global describe, beforeEach, it*/
'use strict';

var assert = require('assert');

describe('mongoose generator', function () {
    it('can be imported without blowing up', function () {
        var app = require('../app');
        assert(app !== undefined);
    });
});

describe('mongoose schema generator', function () {
    it('schema can be imported without blowing up', function () {
        var app = require('../schema');
        assert(app !== undefined);
    });
});
