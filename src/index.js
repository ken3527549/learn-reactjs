import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var say_hello = require('./say_hello.js');

const showDate = <h2>{say_hello.myDateTime()}</h2>;
ReactDOM.render(
  showDate,
  document.getElementById('showDate')
);

//********************************************
// rendering an element into the DOM
const element = <h1>Hello world!</h1>;

//********************************************
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

//********************************************
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

//********************************************
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

//********************************************
// All React components must act like pure functions with respect to their props.
// Such functions are called "pure" because they do not attempt to change their inputs, and always return the same result for the same inputs.
function sum(a, b) {
  return a + b;
}
// In contrast, this function is impure because it changes its own input:
function withdraw(account, amount) {
  account.total -= amount;
}

//********************************************
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
//********************************************
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

//********************************************
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

//********************************************
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

//********************************************
// Let's quickly recap what's going on and the order in which the methods are called:
// 1)Clockclass3被render後，會執行一次Clockclass3的constructor，此時會初始化this.state，此值會在之後更新
// 2)react接著會呼叫Clockclass3的render()，這個方法告訴react要輸出甚麼東西在螢幕上。接著會更新需要更新的DOM輸出。
// 3)當Clockclass3輸出到DOM後，react會呼叫componentDidMount()這個lifecycle hook。Clockclass3物件請求瀏覽器每秒執行一次tick()
// 4)藉由setStete()，react知道state改變了，會在一次呼叫render()去判斷甚麼東西要輸出在螢幕上。
// 5)當Clockclass3從DOM中移除後，react會呼叫componentWillUnMount() lifecycle hook停止timer。

//********************************************
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

//********************************************
// State Updates May Be Asynchronous
// Because this.props and this.state may be updated asynchronously, you "should not rely on their values" for calculating the next state.
// For example, this code may fail to update the counter:
// Wrong
// this.setState({
//   counter: this.state.counter + this.props.increment,
// });

// Correct
// this.setState((prevState, props) => ({
//   counter: prevState.counter + props.increment
// }));

//********************************************
// State Updates are Merged
// When you call setState(), React merges the object you provide into the current state.
// For example, your state may contain several independent variables:
// constructor(props) {
//     super(props);
//     this.state = {
//       posts: [],
//       comments: []
//     };
//   }
// Then you can update them independently with separate setState() calls:
// componentDidMount() {
// fetchPosts().then(response => {
//   this.setState({
//     posts: response.posts
//   });
// });

// fetchComments().then(response => {
//   this.setState({
//     comments: response.comments
//   });
// });
// }
// The merging is shallow, so this.setState({comments}) leaves this.state.posts intact, but completely replaces this.state.comments.
// 分開setState()改動了comments，但posts未受任何改變。

//********************************************
// The Data Flows Down
// The FormattedDate2 is called child component in this case.
function FormattedDate2(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

// The ClockClass4 is called parent component in this case.
// A component may choose to pass its state down as props to its child components:
class ClockClass4 extends React.Component {
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

  componentWillUnmount() {
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
        <h1>Hello, world!</h1>
        <FormattedDate2 date={this.state.date} />
      </div>
    );
  }
}

ReactDOM.render(
  <ClockClass4 />,
  document.getElementById('tick6')
);


//********************************************
// Handling Events
// Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:

// React events are named using camelCase, rather than lowercase.
// With JSX you pass a function as the event handler, rather than a string.
// For example, the HTML:
// <button onclick="activateLasers()">
  // Activate Lasers
// </button>
// is slightly different in React:
// <button onClick={activateLasers}>
  // Activate Lasers
// </button>

// ensure that "this" is bound.
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.toggleActive = this.toggleActive.bind(this);
  }
  toggleActive() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={this.toggleActive}>
        {this.state.isToggleOn?"ON":"OFF"}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('toggle')
);

// Another syntax ensures "this" is bound within toggleActive.
class Toggle2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
  }
  toggleActive() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={(e) => this.toggleActive(e)}>
        {this.state.isToggleOn?"ON":"OFF"}
      </button>
    );
  }
}
ReactDOM.render(
  <Toggle2 />,
  document.getElementById('toggle2')
);
// The problem with this syntax is that a different callback is created each time the LoggingButton renders. 
// In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the property initializer syntax, to avoid this sort of performance problem.

//********************************************
// Conditional Rendering
// Conditional rendering in React works the same way conditions work in JavaScript.
function SomeLogin(props) {
  const isLoggin = props.isLoggin;
  if (isLoggin) {
    return <h1>Welcome Back!</h1>;
  }else {
    return <h1>Please sign up!</h1>;
  }
}
ReactDOM.render(
  <SomeLogin isLoggin={true} />,
  document.getElementById('conditionRender')
);

//********************************************
// Element Variables
// You can use variables to store elements. This can help you conditionally render a part of the component while the rest of the output doesn't change.
function UserGreeting() {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting() {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggin: false};
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  handleLoginClick() {
    this.setState({isLoggin: true});
  }
  handleLogoutClick() {
    this.setState({isLoggin: false});
  }
  render() {
    const isLoggin = this.state.isLoggin;
    let button = null;
    if (isLoggin) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    }else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggin} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('LoginControl')
);
  
//********************************************
// Inline If with Logical && Operator
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('messages')
);
// It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.

//********************************************
// Inline If-Else with Conditional Operator
// render() {
//   const isLoggin = this.state.isLoggin;
//   let button = null;

//   if (isLoggin) {
//     button = <LogoutButton onClick={this.handleLogoutClick} />;
//   }else {
//     button = <LoginButton onClick={this.handleLoginClick} />;
//   }
//   return (
//     <div>
//       <Greeting isLoggedIn={isLoggin} />
//       {isLoggin ? (
//         <LogoutButton onClick={this.handleLogoutClick} />
//       ) : (
//         <LoginButton onClick={this.handleLoginClick} />
//       )}
//     </div>
//   );
// }

//********************************************
// Preventing Component from Rendering
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <div className="Warning">
      Warning!
    </div>
  );
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isShowWarning: true};
    this.handleShowWarning = this.handleShowWarning.bind(this);
  }
  handleShowWarning() {
    this.setState((prevState) => ({
          isShowWarning: !prevState.isShowWarning
        }));
  }
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.isShowWarning} />
        <button onClick={this.handleShowWarning}>
          {this.state.isShowWarning?"Hide":"Show"}
        </button>
      </div>
    );
  }
}
ReactDOM.render(
  <Page />,
  document.getElementById('warning')
);
// Returning null from a component's render method does not affect the firing of the component's lifecycle methods. 
// For instance, componentWillUpdate and componentDidUpdate will still be called.

