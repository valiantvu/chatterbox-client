// YOUR CODE HERE:
var app = {
  'username': function(){
    // return document.URL.split('username=')[1];
    return 'michelle';
  },
  'init': function(){
    app.fetch();
  },
  'send': function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data){
        console.log('chatterbox: Message sent');
        console.dir(data);
      },
      error: function(data){
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  'fetch': function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function(data){
        for (var i = 0; i < data.results.length; i++) {
          console.dir(data.results[i]);
          app.addMessage(data.results[i]);
        }
        console.log('chatterbox: Message received');
      },
      error: function(data){
        console.error('chatterbox: Failed to receive message');
      }
    });
  },
  'server': 'https://api.parse.com/1/classes/chatterbox',
  'clearMessages': function() {
    $('#chats').children().remove();
  },
  'addMessage': function(message){
    //create HTML string
    var HTML = '<div><a class="username" onclick="app.addFriend.call(this)">' + message.username + '</a><p>' + message.text + '</p></div>';
    //convert to DOM node & append to body
    $('#chats').append(HTML);
  },
  'addRoom': function(roomName){
    var HTML = '<ul>' + roomName + '</ul>';
    $('#roomSelect').append(HTML);
  },
  'friends': {},
  'addFriend': function() {
    var friendName = this.innerHTML;
    app.friends[friendName] = true;
    console.log(friendName);
    console.log('Friend added!');
  },
  'handleSubmit': function(){
    //build message object
    var message = {
      'username': app.username(),
      'text': $('#message').text(),
      'roomname': 'black hole' //$('#roomSelect').value
    };
    app.send(message);
    console.log('clicked');
  }
};
