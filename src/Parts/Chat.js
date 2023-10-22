import React from 'react';
import '.././Css/Parts/Chat.css'

class ReadOnlyChat extends React.Component {
  render() {

    return (
      <>
    <ol class="chat">
    <li class="other">
        <div className="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
    <div className="msg">
        <h4>Lorem ipsum dolor sit amet consectetur. Quis interdum nulla nibh ut. Donec eu placerat at senectus. Molestie tristique ac sed velit eget a.</h4>
        <time>20:17</time>
    </div>
    </li>
    <li class="self">
        <div className="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
    <div className="msg">
        <h4>Lorem ipsum dolor sit amet consectetur. Quis interdum nulla nibh ut. Donec eu placerat at senectus. Molestie tristique ac sed velit eget a.</h4>
        <time>20:18</time>
    </div>
    </li>
    <li class="other">
        <div className="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
    <div className="msg">
        <h4>Lorem ipsum dolor sit amet consectetur. Quis interdum nulla nibh ut. Donec eu placerat at senectus. Molestie tristique ac sed velit eget a.</h4>
        <time>20:17</time>
    </div>
    </li>
    <li class="self">
        <div className="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
    <div className="msg">
        <h4>Lorem ipsum dolor sit amet consectetur. Quis interdum nulla nibh ut. Donec eu placerat at senectus. Molestie tristique ac sed velit eget a.</h4>
        <time>20:18</time>
    </div>
    </li>
    </ol>
      </>
    );
  }
}

export default ReadOnlyChat;
