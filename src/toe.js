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
 * @namespace Neon namespace: the table of elements
 */
Toe = {};

/**
 * Utility Functions
 */

/**
 * Custom jQuery utility function
 * Returns true if arrays are equal
 */
(function($) {
    $.arraysEqual = function(arr1, arr2) {
        if (arr1.length != arr2.length) {
            return false;
        }

        var isEqual = true;
        $.each(arr1, function(i, val) {
            if (val != arr2[i]) {
                isEqual = false;
                return false;
            }
        });

        return isEqual;
    }
})(jQuery);

/**
 * Musical information
 * May eventually be moved to a musical methods class
 */
Toe.neumaticChroma = ["b", "c", "d", "e", "f", "g", "a"];
