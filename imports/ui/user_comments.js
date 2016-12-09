import { Comments } from '../api/comments.js';
import "./user_comments.html"; 

Template.user_comments.helpers({
  comments() {
	 var id_comment = this._id;
    return Comments.find({id:id_comment}, { sort: { createdAt: -1 } });
  },
});



Template.user_comments.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.body.events({
  "click .comments"(event){
	  var id  = $(this);
	  id = id[0];
	  id = id._id;
	  $("#"+id).toggle();
	  $("input[name=text]").focus();
  },
  'submit .new-comment'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
	if(text.length==0) return;
	var id  = $(this);
	id = id[0];
	id = id._id;
    // Insert a task into the collection
    Meteor.call('comments.insert', text,id);
 
    // Clear form
    target.text.value = '';
  },
  "click .delete"(event){
	var id = this._id;
	new Confirmation({
	  message: "Are you sure? Do you want to delete this?",
	  title: "Confirmation",
	  cancelText: "Cancel",
	  okText: "Ok",
	  success: true, // whether the button should be green or red
	  focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
	}, function (ok) {
		// alert(2);
		if(ok){
			Meteor.call('comments.remove', id);
		}
	  // ok is true if the user clicked on "ok", false otherwise
	});
  }
});

