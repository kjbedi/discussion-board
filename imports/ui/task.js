import { Tasks } from '../api/tasks.js';

import "./task.html";


Template.body.helpers({
  tasks() {
	var c = Tasks.find({}, { sort: { createdAt: -1 } }).count();
	if(c==0){
		$("#sorry").show();
	}else{
		$("#sorry").hide();
	}
	//alert(this);
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});



Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});




Template.del_b.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});


	
Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
	if(text.length==0) return;
    // Insert a task into the collection
    Meteor.call('tasks.insert', text);
 
    // Clear form
    target.text.value = '';
  },
  'click .del_task'() {
	 var id  = this._id;
	new Confirmation({
	  message: "Are you sure? Do you want to delete this?",
	  title: "Confirmation",
	  cancelText: "Cancel",
	  okText: "Ok",
	  success: true, // whether the button should be green or red
	  focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
	}, function (ok) {
		if(ok){
			Meteor.call('tasks.remove', id);
		}	
	  // ok is true if the user clicked on "ok", false otherwise
	});
  },
});
