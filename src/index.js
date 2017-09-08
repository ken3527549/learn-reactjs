import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var say_hello = require('./say_hello.js');

const showDate = <h2>{say_hello.myDateTime()}</h2>;
ReactDOM.render(
  showDate,
  document.getElementById('showDate')
);


// rendering an element into the DOM
const element = <h1>Hello world!</h1>;

// Functional Components
function Welcome(props) {
  // React calls the Welcome component with {name: 'ken'} as the props.
  return <h1>hello {props.name}</h1>;
  // Our Welcome component returns a <h1>Hello ken</h1> element as the result.
}
const ken_name = <Welcome name="ken" />;
ReactDOM.render(
  ken_name, // -> '<Welcome name="ken" />' element
  document.getElementById('root')
  // React DOM efficiently updates the DOM to match <h1>Hello ken</h1>.
);

// Composing Components
// Components must return a single root element. This is why we added a <div> to contain all the <Welcome /> elements.
function App() {
  return (
    <div>
      <Welcome name="Jerry" />
      <Welcome name="GG" />
      <Welcome name="PP" />
    </div>
  );
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// Extracting Components
function formatDate(date) {
  return date.toLocaleDateString();
}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
// <Avatar user={props.author} /> replace:
// <img className="Avatar"
  // src={props.user.avatarUrl}
  // alt={props.user.name}
// />
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">

        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author} />,
  document.getElementById('exroot')
);

// All React components must act like pure functions with respect to their props.
// Such functions are called "pure" because they do not attempt to change their inputs, and always return the same result for the same inputs.
function sum(a, b) {
  return a + b;
}
// In contrast, this function is impure because it changes its own input:
function withdraw(account, amount) {
  account.total -= amount;
}

// Updating the Rendered Element
function tick() {
  const element = (
    <div>
      <h1>hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('tick')
  );
}
setInterval(tick, 1000);

// State and Lifecycle
function Clock(props) {
  return (
    <div>
      <h1>hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
function tick2() {
  ReactDOM.render(
    <Clock date={new Date()}/>,
    document.getElementById('tick2')
  )
}
setInterval(tick2, 1000);
// Ideally we want to write this once and have the Clock update itself:
// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );
// To implement this, we need to add "state" to the Clock component.
// State is similar to props, but it is private and fully controlled by the component.
// Local state is exactly that: a feature available only to classes.

// Converting a Function to a Class
// You can convert a functional component like Clock to a class in five steps:
// 1. Create an ES6 class with the same name that extends React.Component.
// 2. Add a single empty method to it called render().
// 3. Move the body of the function into the render() method.
// 4. Replace props with this.props in the render() body.
// 5. Delete the remaining empty function declaration.
class Clockclass extends React.Component {
  render() {
    return (
    <div>
      <h1>hello, world!</h1>
      <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
    </div>
  );
  }
}
function tick3() {
  ReactDOM.render(
    <Clockclass date={new Date()}/>,
    document.getElementById('tick3')
  )
}
setInterval(tick3, 1000);

// Adding Local State to a Class
// We will move the date from props to state in three steps:
// 1) Replace this.props.date with this.state.date in the render() method:
// 2) Add a class constructor that assigns the initial this.state:
// 3) Remove the date prop from the <Clock /> element:
class Clockclass2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
      <div>
        <h1>hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clockclass2 />,
  document.getElementById('tick4')
)

// Adding Lifecycle Methods to a Class
// These methods are called "lifecycle hooks".
// The componentDidMount() hook runs after the component output has been rendered to the DOM. This is a good place to set up a timer:
class Clockclass3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnMount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clockclass3 />,
  document.getElementById('tick5')
)

function FormToServer() {
  return (
    <form action="http://localhost:8888/upload" method="post">
      <textarea name="text" rows="20" cols="60"></textarea>
      <input type="submit" value="Submit text" />
    </form>
  );
}
ReactDOM.render(
  <FormToServer />,
  document.getElementById('formToserver')
)





// Let's quickly recap what's going on and the order in which the methods are called:
// 1)Clockclass3被render後，會執行一次Clockclass3的constructor，此時會初始化this.state，此值會在之後更新
// 2)react接著會呼叫Clockclass3的render()，這個方法告訴react要輸出甚麼東西在螢幕上。接著會更新需要更新的DOM輸出。
// 3)當Clockclass3輸出到DOM後，react會呼叫componentDidMount()這個lifecycle hook。Clockclass3物件請求瀏覽器每秒執行一次tick()
// 4)藉由setStete()，react知道state改變了，會在一次呼叫render()去判斷甚麼東西要輸出在螢幕上。
// 5)當Clockclass3從DOM中移除後，react會呼叫componentWillUnMount() lifecycle hook停止timer。

// Using State Correctly
// There are three things you should know about setState().
// Do Not Modify State Directly
  // For example, this will not re-render a component:
  // Wrong
  // this.state.comment = 'Hello';

  // Instead, use setState():
  // Correct
  // this.setState({comment: 'Hello'});
  // The only place where you can assign this.state is the constructor.

// State Updates May Be Asynchronous

// State Updates are Merged

// Class Components
// class Welcome2 extends React.Components {
//   render() {
//     return <h1>hello {this.props.name}</h1>;
//   }
// }