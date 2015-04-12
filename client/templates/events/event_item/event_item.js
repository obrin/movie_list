/*****************************************************************************/
/* EventItem: Event Handlers */
/*****************************************************************************/
Template.EventItem.events({
	'click .event-content': function (e, tmpl) {
		Session.set('selectedEventId', this._id);
		$('.active-event').removeClass('active-event');
		$('#'+this._id).addClass('active-event');
	},

	'click [name=eventUrl]': function () {
		return Router.go('event.id');
	},

	'click button[name=follow]': function () {
		return Meteor.call('follow', this._id);
	},

	'click button[name=unfollow]': function () {
		return Meteor.call('unfollow', this._id);
	},

	'click [name=edit]': function () {
		Session.set('isEditing', {status: true});
		// console.log(this._id);
		Router.go('event.edit', {_id: this._id});
	},

	'click [name=saveEdit]': function () {
		Session.set('isEditing', {status: false});
	},

	'click [name=delete]': function () {
		Meteor.call('removeEvent', this._id);

		var currentId = Session.get('selectedEventId')
		if (this._id === currentId)
			Session.set('selectedEventId', false)
	}
});

/*****************************************************************************/
/* EventItem: Helpers */
/*****************************************************************************/
Template.EventItem.helpers({
	isMyEvent: function () {
		var event = this;
		return event.created_by_id === Meteor.userId();
	},


	hiddenClass: function(field) {
		return isSet(this[field]) ? '' : '{display: none}';
	},

	followers: function () {
		var event = this;
		if (!! event.followers)
			return event.followers.join(", ")
	},

	eventUrl: function () {
		var event = this;

	},

	isNotFollowing: function () {
		var userId = Meteor.userId()
		if (!! this.followers_id)
			return this.followers_id.indexOf(userId) > -1 ? false : true;
	},

	isOwner: function () {
		var event = this;
		return this.created_by_id === Meteor.userId() ? true : false;
	}
});

/*****************************************************************************/
/* EventItem: Lifecycle Hooks */
/*****************************************************************************/
Template.EventItem.created = function () {
};

Template.EventItem.rendered = function () {
};

Template.EventItem.destroyed = function () {
};

