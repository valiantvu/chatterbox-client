var app = {
  'server': 'https://api.parse.com/1/classes/chatterbox',
  'username': '',
  'friends': {},
  'roomList': {},

  'init': function(){
    // set username
    app.username = document.URL.split('username=')[1];

    // detect sending messages
    $('#send .submit').on('click', function (event) {
      event.preventDefault();
      app.handleSubmit();
    });

    // grab messages continuously
    setInterval(function(){
      app.fetch();
    }, 1000);

  },

  'send': function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data){
        console.log('chatterbox: Message sent');
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
      data: {order: '-createdAt'},
      success: function(data){
        app.addMessages(data.results);
        app.getRooms(data.results);
        console.log('chatterbox: Message received');
      },
      error: function(data){
        console.error('chatterbox: Failed to receive message');
      }
    });
  },

  'addMessages': function(messages){
    for(var i = 0; i< messages.length; i++){
      var renderedMessage = app.renderMessage(messages[i]);
      $('#chats').append(renderedMessage);
    }
  },

  'renderMessage': function(message) {
    var $user = $('<div>', {class: 'username'}).text(message.username);
    var $text = $('<div>', {id: 'message'}).text(message.text);
    var $message = $('<div>', {class: 'chat', 'data-id': 'message.objectId'}).append($user, $text);
    return $message;
  },

  'clearMessages': function() {
    $('#chats').children().remove();
  },

  'handleSubmit': function(){
    //build message object
    var message = {
      'username': app.username,
      'text': $('#message').val(),
      'roomname': 'black hole' //$('#roomSelect').value
    };
    $('#message').val('');
    app.send(message);
  },

  'getRooms': function(messages){
    app.roomList = {}; // Refactor to update instead of empty
    for(var i = 0; i < messages.length; i++){
      var roomname = messages[i].roomname;
      if(!app.roomList[roomname]){
        app.roomList[roomname] = true;
      }
    }
    app.listRooms();
  },

  'listRooms': function(){
    $('#roomList').empty(); // Refactor to update instead of empty
    for(var roomname in app.roomList){
      var renderedRoom = app.renderRoom(roomname);
      $('#roomList').append(renderedRoom);
    }
  },

  'renderRoom': function(roomname){
    $roomname = $('<div>', {class: 'room'}).text(roomname);
    return $roomname;
  },

  'addFriend': function() {
    var friendName = this.innerHTML;
    app.friends[friendName] = true;
    console.log(friendName);
    console.log('Friend added!');
  }
  // $('.username').children().css({'fontstyle': 'bold'})
};

