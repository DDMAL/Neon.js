/*
Copyright (C) 2011 by Gregory Burlet, Alastair Porter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/**
 * Creates a staff
 * @class Represents a Staff
 * 
 * @param {Array} bb [ulx, uly, lrx, lry] staff bounding box
 * (.) <ulx,uly>        (.)
 *
 *
 * (.)        <lrx,lry> (.)
 *
 * @param {Object} options [numlines {Number}, clefType {String}, clefIndent (px) {Number}, interact {Boolean}]
 *
 * The staff has list of neumes on the staff
 */
Toe.Model.Staff = function(bb, options) {
    // set position
    if(!Toe.validBoundingBox(bb)) {
        throw new Error("Staff: invalid bounding box");
    }

    this.zone = new Object();
    this.zone.ulx = bb[0];
    this.zone.uly = bb[1];
    this.zone.lrx = bb[2];
    this.zone.lry = bb[3];

    // default 4 stafflines
    this.props = {
        numLines: 4,
        interact: false
    };

    $.extend(this.props, options);

    // cache delta y: pixels between stafflines
    this.delta_y = Math.abs(this.zone.lry - this.zone.uly) / (this.props.numLines-1);

    this.neumes = new Array();
}

Toe.Model.Staff.prototype.constructor = Toe.Model.Staff;

Toe.Model.Staff.prototype.setBoundingBox = function(bb) {
    if(!Toe.validBoundingBox(bb)) {
        throw new Error("Staff: invalid bounding box");
    }
    
    this.zone.ulx = bb[0];
    this.zone.uly = bb[1];
    this.zone.lrx = bb[2];
    this.zone.lry = bb[3];
}

/**
 * Mounts the clef on the staff
 *
 * @methodOf Toe.Model.Staff
 * @param {Toe.Model.Clef} clef The clef to mount
 * @returns {Toe.Model.Staff} pointer to this staff for chaining
 */
Toe.Model.Staff.prototype.setClef = function(clef) {
    if (!(clef instanceof Toe.Model.Clef)) {
        throw new Error("Staff: Invalid clef");
    }
    if (clef.props.staffLine > this.props.numLines) {
        throw new Error("Staff: Invalid clef position");
    }

    // set clef position given the staffline
    var x = this.zone.ulx;
    if (clef.zone.ulx) {
        x = clef.zone.ulx;
    }
    clef.setPosition([x, this.zone.uly+((this.props.numLines-clef.props.staffLine)*this.delta_y)]);

    // update view
    $(clef).trigger("vRenderClef", [clef]);
    
    this.clef = clef;

    // for chaining
    return this;
}

/**
 * Mounts a neume on the staff
 *
 * @methodOf Toe.Model.Staff
 * @param {Toe.Model.Neume} neume The neume to mount
 * @returns {Toe.Model.Staff} Pointer to this staff for chaining
 */
Toe.Model.Staff.prototype.addNeume = function(neume) {
    // check argument is a neume
    if (!(neume instanceof Toe.Model.Neume)) {
        throw new Error("Staff: Invalid neume");
    }

    // update view
    $(neume).trigger("vRenderNeume", [neume, this]);

    this.neumes.push(neume);
    
    // for chaining
    return this;
}
