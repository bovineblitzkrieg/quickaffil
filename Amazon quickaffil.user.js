// ==UserScript==
// @name         Amazon quickaffil
// @namespace    bovineintervention
// @version      1.0
// @description  immediately puts affiliate code for current page on clipboard when hotkey is pressed (line 36)
// @author       bovine
// @match        https://www.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // pulls code from URL
    function extractCode(url) {
        const pattern = /\/dp\/([A-Za-z0-9]{10})/; // pulls 10 digit code
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1]; // found code
        }
        return null; // no code present
    }

    // copies to clipboard in affil format
    function copyCodeToClipboard(code) {
        if (code) {
            GM_setClipboard(`?a ${code}`);
            console.log('Code copied to clipboard:', `?a ${code}`);
        } else {
            console.log('Moo, no code found');
        }
    }

    // Hotkey section
    function handleHotkey(event) {
        if (event.key === '1') {
            // Get the current URL
            const url = window.location.href;

            // Extract the code from the URL
            const code = extractCode(url);

            // Copy the code to clipboard
            copyCodeToClipboard(code);
        }
    }

    // Add event listener for the hotkey
    document.addEventListener('keydown', handleHotkey);
})();
