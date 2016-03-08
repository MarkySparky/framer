/**
 * FRAMER
 * https://github.com/MarkySparky/framer
 *
 * Copyright (c) 2016 Mark Caulfield
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 */

var Jimp = require('jimp');
var fs = require('fs');
var path = require('path');
var glob = require('glob')
var extend = require('util')._extend;

/**
 * Expose `application()`.
 */

var application = { frame: frame };

exports = module.exports = application;

function frame(config) {

    var config = extend(defaults, config);

    console.log('config:', config);

    var dest = path.resolve(process.cwd(), config.dest);

    fs.existsSync(dest) || fs.mkdirSync(path.resolve(dest));

    Jimp.read('nexus5.png', function(err, nexus5) {

        Jimp.read('iphone6.png', function(err, iphone6) {

            glob.sync(config.source).forEach(function(file) {
                var theFile = path.parse(file);
                processImage(theFile, dest + '/', nexus5, iphone6);
            });

        });
    });
}

function processImage(theFile, dest, nexus5, iphone6) {

    var res = path.resolve(process.cwd(), path.format(theFile));
    Jimp.read(res, function(err, screenshot) {
        var imageInfo = getImageInfo(screenshot.bitmap.width, screenshot.bitmap.height)

        if (err) {
            console.error('Oh no error', err);
            throw err;
        }
        var outputFileName = dest + theFile.base;

        switch (imageInfo.device) {
            case 'iphone6':
                screenshot.resize(560, Jimp.AUTO);
                iphone6.resize(750, Jimp.AUTO) //size to our screenshots
                    .composite(screenshot, 97, 215) //merge them together with nexus 5 in the background
                    .write(outputFileName);
                    break;
            case 'nexus5':
                screenshot.resize(400, Jimp.AUTO);
                nexus5.resize(629, Jimp.AUTO) //size to our screenshots
                    .composite(screenshot, 113, 209) //merge them together with nexus 5 in the background
                    .write(outputFileName);
            default:

        }


    });
}

var defaults = {
    'source': './test/screenshots/*{.png,.jpg}',
    'dest': './framed123/',
    'devices': ['nexus5'],
    'configFile': 'framer.json',
    addStatusBar: false
};


function getImageInfo(width, height) {
    var info = {};

    var ratio = parseFloat((width / height).toFixed(2));

    switch (ratio) {
        case 1.2:
            info.device = 'nexus5';
            info.statusBar = true;
            break;
        case 0.6:
            info.device = 'nexus5';
            info.statusBar = true;
            break;
        case 0.56:
            info.device = width === 750 ? 'iphone6' : 'nexus5';
            info.statusBar = true;
            break;
        default:
            info.device = 'nexus5';
            info.statusBar = false;
    }
    return info;
}
