import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
  useContext,
  createContext,
} from "react";
import axios from "axios";

//useState
function FirstHook() {
  let [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter((counter = counter + 1));
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={increment}>Add</button>
    </div>
  );
}

function FirstHook_2() {
  const [inputValue, setInputValue] = useState("DHanush");

  let onChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  return (
    <div>
      <input type="text" placeholder="Type here..." onChange={onChange} />
      {inputValue}
    </div>
  );
}

//useReducer
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, showText: state.showText };
    case "toogleShowText":
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};

function SecondHook() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    showText: true,
  });

  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
          dispatch({ type: "toogleShowText" });
        }}
      >
        click here
      </button>
      {state.showText && <p>This is a text</p>}
    </div>
  );
}

//useEffect
const ThirdHook = () => {
  const [data, setData] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((resp) => {
      setData(resp.data[0].email);
      console.log("Api was called");
    });
  }, []);
  return (
    <div>
      <h1>Hello, {data}</h1>
      <h3>{count}</h3>
      <button onClick={() => setCount(count + 1)}>click</button>
    </div>
  );
};

//useRef
const ForthHook = () => {
  const inputRef = useRef(null);

  const onClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" placeholder="type.." ref={inputRef} />
      <button onClick={onClick}>Change Name</button>
    </div>
  );
};

//useLayoutEffect
function FifthHook() {
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    console.log(inputRef.current.value);
  }, []);
  useEffect(() => {
    inputRef.current.value = "Hello";
  }, []);
  return (
    <div>
      <input type="text" value={"Dhanush"} ref={inputRef} />
    </div>
  );
}

//forwardREf
const Button = forwardRef((props, ref) => {
  const [toogle, setToggle] = useState(false);
  useImperativeHandle(ref, () => ({
    alterToogle() {
      setToggle(!toogle);
    },
  }));
  return (
    <>
      <button>Button from Child</button>
      {toogle && <span>Toogle</span>}
    </>
  );
});

//^^^ useImperativeHandle
function SixtHook() {
  const buttonRef = useRef(null);
  return (
    <>
      <button
        onClick={() => {
          buttonRef.current.alterToogle();
        }}
      >
        Button from parent
      </button>
      <Button ref={buttonRef} />
    </>
  );
}

//useContext
function User(props) {
  const { username } = useContext(AppContext);
  return (
    <div>
      <h1>User: {username}</h1>
    </div>
  );
}

function Login(props) {
  const { setUsername } = useContext(AppContext);
  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
    </div>
  );
}

const AppContext = createContext(null);

function SeventhHook() {
  const [username, setUsername] = useState("");

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
      }}
    >
      <Login /> <User />
    </AppContext.Provider>
  );
}

//App
function App() {
  return (
    <>
      <SeventhHook />
    </>
  );
}

export default App;
