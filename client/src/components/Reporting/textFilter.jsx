import React, { useState } from "react";
import { message } from "antd";
import PropTypes from "prop-types";
import Filter from "bad-words";

function filterBadWords(xmlText, badWords) {
    //assuming gallery team sending xml string, convert to doc
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    traverseAndFilter(xmlDoc);
	//serialize xml text
    const filteredXmlText = new XMLSerializer().serializeToString(xmlDoc);

    return filteredXmlText;

    function traverseAndFilter(node) {
        if (node.nodeType === 3) { // text node
            const originalText = node.nodeValue;
            const filteredText = filterText(originalText, badWords);
            if (originalText !== filteredText) {
                node.nodeValue = filteredText;
            }
        } else if (node.nodeType === 1) { // Element node
            // for (let i = 0; i < node.childNodes.length; i++) {
            //     traverseAndFilter(node.childNodes[i]);
            // }
            for (let item of node.childNodes) {
                traverseAndFilter(item);
            }
        }
    }

    function filterText(text, badWords) {
		//replace bad words with asterisks
        const pattern = new RegExp('\\b(' + badWords.join('|') + ')\\b', 'gi');
        return text.replace(pattern, function (match) {
            return '*'.repeat(match.length);
        });
    }
}

// filters bad words using the bad-words module, a string is inputted
function filterBadwords2(badWordString) {
    const filter = new Filter();
    // can add more bad words to the built in list
    filter.addWords('','','');
    filter.clean(badWordString);
}

const badWords = ['','','']; //input bad words here or link to sheet of words

const filteredXmlText = filterBadWords(xmlText, badWords);
console.log(filteredXmlText); //return bad words that have been filtered



filterBadwords2(badWordString); // test the bad word filter using the bad-words library
console.log(badWordString); // return filtered bad words