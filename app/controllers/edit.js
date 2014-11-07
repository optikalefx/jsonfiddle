import Ember from 'ember';

export default Ember.Controller.extend({

	tree: function() {
		var json = this.get('model.json');

		return json.replace(/"id"/g, 'ID');
	}.property('model.json')

});
