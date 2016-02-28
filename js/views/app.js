import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import TodoView from './todo';

var AppView = Backbone.View.extend({
  el: '#todoapp',
  
  initialize: function() {
    this.input = this.$('#new-todo');
    
    this.model.on('add', this.addOne, this);
    this.model.on('resetPending', this.addAllPending, this);
    this.model.on('resetCompleted', this.addAllCompleted, this);
    this.model.on('resetAll', this.addAll, this);
    this.model.fetch();
  },
  
  events: {
    'keypress #new-todo': 'createTodoOnEnter',
  },
  
  createTodoOnEnter: function(event) {
    if (event.which !== 13 || !this.input.val().trim()) {
      return;
    }
    
    this.model.create(this.newAttributes());
    this.input.val('');
  },
  
  addOne: function(todo) {
    var view = new TodoView({model: todo});
    $('#todo-list').append(view.render().el);
  },
  
  addBulk: function(filter) {
    this.$('#todo-list').html('');
  
    switch (filter) {
      case 'pending' :
        _.each(this.model.remaining(), this.addOne);
        break;
      case 'completed':
        _.each(this.model.completed(), this.addOne);
        break;
      default:
        this.model.each(this.addOne, this);
        break;
    }
  },
  
  addAll: function() {
    this.addBulk();
  },
  
  addAllPending: function() {
    this.addBulk('pending');
  },
  
  addAllCompleted: function() {
    this.addBulk('completed');
  },
  
  newAttributes: function() {
    return {
      title: $('#new-todo').val().trim(),
      completed: false,
    }
  },
});

export default AppView;