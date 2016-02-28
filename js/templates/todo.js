export default `
<div class="view">
  <input class="toggle" type="checkbox" <%= completed ? 'checked' : ''  %>>
  <label><%- title %></label>
  <input class="edit" value="<%= title %>"/>
  <button class="destroy">x</button>
</div>
`;
