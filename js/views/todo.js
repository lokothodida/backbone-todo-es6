import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import todoHtml from '../templates/todo.js';

var TodoView = Backbone.View.extend({
  tagName: 'li',
  
  template: _.template(todoHtml),
  
  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  
  render: function() {
    var data = this.model.toJSON();
    var html = this.template(data);
    
    this.$el.html(html);
    
    this.input = this.$('.edit');
    
    return this;
  },
  
  events: {
    'dblclick label' : 'edit',
    'keypress .edit' : 'updateOnEnter',
    'blur .edit'     : 'close',
    'click .destroy' : 'destroy',
    'click .toggle'  : 'toggleCompleted',
  },
  
  edit: function() {
    this.$el.addClass('editing');
    this.input.focus();
  },
  
  close: function() {
    var value = this.input.val();
    
    if (value && value.trim()) {
      this.model.save({
        title: value.trim(),
      });
    }

    this.$el.removeClass('editing');
  },
  
  updateOnEnter: function(evt) {
    if (evt.which == 13) {
      this.close();
    }
  },
  
  toggleCompleted: function() {
    this.model.toggle();
  },
  
  destroy: function() {
    this.model.destroy();
  }
});

export default TodoView;