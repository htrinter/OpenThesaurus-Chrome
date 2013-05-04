// register context menu item
var id = chrome.contextMenus.create({"title": "Im Thesaurus nachschlagen", "contexts":["selection"], "onclick": lookUp});

// perform lookup
function lookUp(info, tab) {
	var url = 'http://www.openthesaurus.de/synonyme/' +  encodeURIComponent(info['selectionText']);
	chrome.tabs.create({url: url, selected: true});
}