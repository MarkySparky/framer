/**
 * FRAMER
 * https://github.com/MarkySparky/framer
 *
 * Copyright (c) 2016 Mark Caulfield
 * Licensed under the MIT license.
 */

'use strict';

var Jimp = require('jimp');
var fs = require('fs');
var path = require('path');

var defaults = {
  'source': 'screenshots/**.*.png',
  'dest': 'framed',
  'devices': ['nexus5'],
  'configFile': 'framer.json'
};

function isImage(file) {
    var res = file.indexOf('.png') >= 1;
    return res;
}

