import Ember from 'ember';

export default Ember.Route.extend({

	beforeModel: function() {
		this._super.apply(this, arguments);

		// TODO: use an unused id
		var fiddleId = Math.random().toString(36).slice(-7);

		this.transitionTo('edit', fiddleId);
	}

});
