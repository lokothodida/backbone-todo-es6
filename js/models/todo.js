import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false,
  },
  
  toggle() {
    this.save({
      completed: !this.get('completed'),
    });
  }
});

export default Todo;