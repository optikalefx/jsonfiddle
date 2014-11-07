import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({

	model: function() {
		// this.store.push('fiddle', {
		// 	id: 1,
		// 	name: 'testing'
		// });

		// this.store.push('fiddle', {
		// 	id: 2,
		// 	name: 'another test'
		// });

		// return this.store.all('fiddle');

		return $.getJSON('http://sixtyvocab-server.connectai.com:8080/static/get')
			.then(function(json) {
				return {
					user: 'sean',
					time: new Date(),
					json: JSON.stringify(json),
					raw: json
				};
			});
	}

});
