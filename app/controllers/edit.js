/* globals jsonlint, $, _ */

import Ember from 'ember';

export default Ember.Controller.extend({

	tree: function() {
		return this.parse();
	}.property('model.json'),

	parse: function() {
		try {
			var json = jsonlint.parse(this.get('model.json'));

			var makeUL = function(lst, type) {
				var html = [];
				html.push('<ul>');
				_.forEach(lst, function(item, k) {
					html.push(makeLI(k, item, type));
				});
				html.push('</ul>');
				return html.join("");
			};

			var makeLI = function(k, elem, type) {

				var html = [];
				if(Array.isArray(elem)) {
					html.push("\
						<li class='parent'>\
							<div class='arrow'>&#9668;</div>\
							<div class='sybmol'>[<span>"+elem.length+"</span>]</div>\
							<div class='val'>"+k+"</div>\
					");
					html.push(makeUL(elem, "array"));
				} else if(k === null) {
					html.push("\
						<li class='parent'>\
							<div class='sybmol'></div>\
							<div class='val'>null</div>\
					");
					html.push(makeUL(elem, "obj"));
				} else if(typeof elem === "object") {
					html.push("\
						<li class='parent'>\
							<div class='arrow'>&#9668;</div>\
							<div class='sybmol'>{}</div>\
							<div class='val'>"+k+"</div>\
					");
					html.push(makeUL(elem, "obj"));
				} else {
					if(type === "array") {
						html.push("\
							<li>\
								<div class='sybmol light'></div>\
								<span class='val'>"+elem+"</span>\
						");
					} else {
						type = "string";
						if($.isNumeric(elem)) {
							type = "number";
						}
						if(elem === "false") {
							type = "bool false";
						}
						if(elem === "true") {
							type = "bool true";
						}
						if(type === "string") {
							elem = '"'+elem+'"';
						}
						html.push("\
							<li>\
								<span class='sybmol light'></span>\
								<span class='key'>"+k+"</span>\
								<span class='val "+type+"'>"+elem+"</span>\
						");
					}
				}
				html.push('</li>');
				return html.join("");
			};

			return makeUL(json);

		} catch (e) {
			console.error(e.message);
		}
	}

});
