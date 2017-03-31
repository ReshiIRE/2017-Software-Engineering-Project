// we declare these functions at the top for use with the templates

let isPast = function(date)
{
	let today = moment().format();
	return moment(today).isAfter(date); // check whether or not the date
	// is in the past
};

let closeModal = function()
{
  $( '#add-edit-event-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut(); // simply closes the modal
};

Template.calendar.onCreated(function()
{
	let template = Template.instance();// we create a version of the template
	// and subscribe to it. easier than typical subscriptions
	template.subscribe('calendar');
});

Template.calendar.onRendered(function()
{
	$('#events-calendar').fullCalendar({
		// FullCalendar, the package used to display the Calendar,
		// has some functions we can already use
		// we just have to insert our own functionality for them
		events: function (start, endDate, timezone, callback)
		{
			// get all the data from the collection
			let data = Events.find().fetch().map(function()
				{
					event.editable = !isPast(event.start);
					return event;
				});
			if(data)
			{
				callback(data); // get a callback and show the data
				// we believe that this did not work on presentation day
				// due to conflicts and issues with the packages
			}
		},
		eventRender: function(event, element)
		{
			// renders the actual event by inserting in the following html
			element.find('.fc-content').html(
				`<h4>${event.title}</h4>
				<p class="guest-count">${event.guests}Guests</p>
				<p class="type-${event.type}">#{event.type}</p>`
			);
		},
		eventDrop(event, delta, revert)
		{
			// this is for dragging and dropping the events
			if(!isPast(date))
			{
				let update = { _id: event._id,
					startDate: event.startDate,
					endDate: event.endDate// create an update based on data from the event
				};

				Meteor.call('editEvent', update, function(error){
					if(error)
					{
						// Bert is a package that creates alerts
						// very useful for the calendar
						Bert.alert(error.reason, ' danger')
					}
				})
			} else
			{
				revert();
				Bert.alert('Sorry, you can\'t move items to the past!', 'danger');
			}
		},
		dayClick: function(date)
		{
			// allows us to click on a specific day and create a modal for editing
			Session.set('eventModal', {type: 'add', date: date.format()});
			$('#add-edit-event-modal').modal('show');
		},
		eventClick: function(event)
		{
			Session.set('eventModal', {type: 'edit', event: event._id});
			$('#add-edit-event-modal').modal('show');
		}
	});
	// this tracker autorun finds the events we need
	Tracker.autorun(function() {
		 Events.find().fetch();
    	$( '#events-calendar' ).fullCalendar( 'refetchEvents' );
	});
});

Template.addEditEventModal.helpers(
{
	// these are some helpers
	modalType(type)
	{
		let eventModal = Session.get('eventModal');
		if(eventModal)
		{
			return eventModal.type == type;
		}
	},
	modalLabel()
	{
		let eventModal = Session.get('eventModal');
		if(eventModal)
		{
			return {
				button: eventModal.type == 'edit' ? 'Edit' : 'Add',
				label: eventModal.type == 'edit' ? 'Edit' : 'Add an'
			};
		}
	},

	selected(v1, v2)
	{
		return v1==v2;
	},
	event()
	{
		let eventModal = Session.get('eventModal');

		if(eventModal)
		{
			return eventModal.type == 'edit' ? Events.findOne(eventModal.event) : {
				start: eventModal.date,
				end: eventModal.data
			};
		}
	}
});

Template.addEditEventModal.events(
{
	// these are our events on the modal
	// for adding data
	'submit form' (event, template)
	{
		// submit the form
		event.preventDefault();

		let eventModal = Session.get('eventModal'),
				submitType = eventModal.type == 'edit' ? 'editEvent' : 'addEvent',
				eventItem = {
					// template.find finds the inputs
					// named after a particular element
					title: template.find('[name="title"]').value,
					startDate: template.find( '[name="start"]' ).value,
          			endDate: template.find( '[name="end"]' ).value,
          			type: template.find( '[name="type"] option:selected' ).value,
          			guests: parseInt( template.find( '[name="guests"]' ).value, 10 )
          			// depending on whether this is an edit or add we need to
          			// change how the functionality works
			};
		if(submitType == 'editEvent')
		{
			eventItem._id = eventModal.event;
		}

		Meteor.call(submitType, eventItem, (error) =>
		{
			if(error)
			{
				// if there is an error - alert us!
				Bert.alert(error.reason, 'danger');
			}
			else
			{
				Bert.alert('Event ${{eventModal.type}}ed!', 'success');
				closeModal();
			}
		});
	},
	'click .delete-event' (event, template)
	{
		let eventModal = Session.get('eventModal');
		if( confirm('Are you sure? This is perment.'))
		{
			Meteor.call('removeEvent', eventModal.event, function()
			{
				if(error)
				{
					Bert.alert(error.reason, 'danger');
				}
				else
				{
					Bert.alert('Event deleted!', 'sucess');
					closeModal();
				}
			});
		}
	}
});