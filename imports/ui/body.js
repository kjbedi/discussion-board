import { Template } from 'meteor/templating';
import { Comments } from '../api/comments.js';
import { Meteor } from 'meteor/meteor';


import "./login.js";
import "./user_comments.js"; 
import "./task.js"; 
import './body.html';


//temp
Template.body.helpers({
  comments() {
	 var id_comment = this._id;
    return Comments.find({id:id_comment}, { sort: { createdAt: -1 } });
  },
});
//temp

 Tracker.autorun(function(){
  if(Meteor.userId()){
	 
    console.log('logged in');
  }else{
	  console.log('logged out');
  }
});


Template.body.events({
	"click #del_comments"(){
		$(".delete").toggle();
		if($(".delete").is(":visible")){
			$("#del_comments").html("<a href='#'>Done Deleting</a>");
		}else{
			$("#del_comments").html("<a href='#'>Delete Comments</a>");
		}
	}
});

Template.body.events({
	"click #del_posts"(){
		$(".btn-xs.btn-danger.del_task").toggle();
		if($(".btn-xs.btn-danger.del_task").is(":visible")){
			$("#del_posts").html("<a href='#'>Done Deleting</a>");
		}else{
			$("#del_posts").html("<a href='#'>Delete Posts</a>");
		}
	}
});