import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { isArray } from "util";
import { ELOOP } from "constants";

type Link = {
  type: "link";
  name: string;
  link: string;
};

type File = {
  type: "file";
  name: string;
  value: string;
};

type Folder = {
  type: "folder";
  name: string;
  children: Array<Folder | File | Link>;
};

let folder = (name: string, children: Folder["children"]): Folder => ({
  type: "folder",
  name,
  children
});

let file = (name: string, value: string): File => ({
  type: "file",
  name,
  value
});

let link = (name: string, link: string): Link => ({ type: "link", name, link });

const rootFolder = folder("root", [
  file("about", "hi! i'm nicole. i am a self-taught front end engineer..."),
  file(
    "stack",
    "javascript, typescript, reactjs, css, express.js, styled components"
  ),
  folder("links", [
    link("github", "https://github.com"),
    link("linkedin", "https://linkedin.com"),
    link("portfolio", "https://nmyo.co"),
    link("application", "https://google.com")
  ]),
  file("email", "hellonicolemayo@gmail.com")
]);

enum KeyCodes {
  UP = 38,
  DOWN = 40
}

type InputEl = HTMLInputElement | null;
type DivEl = HTMLDivElement | null;

const App: React.SFC = () => {
  const [userInput, setUserInput] = useState("");
  const [currStack, setCurrStack] = useState([rootFolder]);
  const [history, setHistory] = useState<
    Array<{
      stack: Array<Folder>;
      userInput: string;
      output: string | null;
      cleared: boolean;
    }>
  >([]);
  const [userInputHidden, setUserInputHidden] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(history.length - 1);
  const inputEl = useRef<InputEl>(null);
  const terminalEl = useRef<DivEl>(null);
  const historyEl = useRef<DivEl>(null);
  const currFolder = currStack[currStack.length - 1];
  let isInputSticky = false;

  useEffect(
    () => {
      setUserInput("");
      setScrollIndex(history.length - 1);
    },
    [history]
  );

  if (terminalEl.current && historyEl.current) {
    if (historyEl.current.scrollHeight > terminalEl.current.clientHeight - 40) {
      isInputSticky = true;
    }
  }

  const addNewHistoryItem = (output: string | null) => {
    setHistory([
      ...history,
      {
        stack: currStack,
        userInput: userInput,
        output: output,
        cleared: false
      }
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [command, ...args] = userInput.split(" ");
    if (command == "cd") {
      cd(args[0]);
      return;
    }
    if (command == "ls") {
      let lsOutput_ = currFolder.children
        .map(el => el.name)
        .join("\xa0\xa0\xa0");
      let lsOutput = currFolder.children
        .map(el => {
          if (el.type == "folder") {
            return `<b>${el.name}</b>`;
          } else {
            return el.name;
          }
        })
        .join("\xa0\xa0\xa0");
      addNewHistoryItem(lsOutput);
      return;
    }
    if (command == "clear") {
      isInputSticky = false;
      addNewHistoryItem(null);
      let clearedHistory = history.map(item => ({ ...item, cleared: true }));
      setHistory(clearedHistory);
      return;
    }
    let validFile = currFolder.children.find(child => child.name == userInput);
    if (validFile) {
      if (validFile.type == "file") {
        addNewHistoryItem(validFile.value);
      } else if (validFile.type == "link") {
        let link = validFile.link;
        addNewHistoryItem(`Opening Nicole's ${validFile.name} in a new tab...`);
        setUserInputHidden(true);
        setTimeout(() => {
          window.open(link, "_blank");
          setUserInputHidden(false);
        }, 1000);
      }
      return;
    }
    addNewHistoryItem("Command not found");
  };

  const focusOnInputEl = () => {
    if (inputEl.current !== null) {
      inputEl.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput(e.target.value);

  const checkUserScroll = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode == KeyCodes.UP && scrollIndex > -1) {
      setUserInput(history[scrollIndex].userInput);
      if (scrollIndex <= 0) {
        setScrollIndex(0);
      } else {
        setScrollIndex(scrollIndex - 1);
      }
      return;
    }
    if (event.keyCode == KeyCodes.DOWN && scrollIndex < history.length) {
      setUserInput(history[scrollIndex].userInput);
      if (scrollIndex >= history.length - 1) {
        setScrollIndex(history.length - 1);
      } else {
        setScrollIndex(scrollIndex + 1);
      }
    }
  };

  const cd = (folderName: string) => {
    if (folderName == "..") {
      if (currStack.length <= 1) {
        addNewHistoryItem("No parent directory exists");
        return;
      }
      addNewHistoryItem(null);
      let newCurrStack = [...currStack];
      newCurrStack.splice(newCurrStack.length - 1, 1);
      setCurrStack(newCurrStack);
    } else {
      let folder = currFolder.children.find(child => {
        return child.name == folderName;
      });
      if (!folder || folder.type !== "folder") {
        addNewHistoryItem("No directory found:" + folderName);
        return;
      }
      setCurrStack([...currStack, folder]);
      let folderOutput = folder.children
        .map(el => el.name)
        .join("\xa0\xa0\xa0");
      addNewHistoryItem(folderOutput);
    }
  };

  const renderPath = (stack: Array<Folder>) => (
     stack.slice(1).map(f => f.name).join('/')
  )

  return (
    <div className="App">
      {isInputSticky}
      <div className="terminal" onClick={focusOnInputEl} ref={terminalEl}>
        <div className="terminal-header">Nicole's Terminal</div>
        <div
          className={`terminal-content ${isInputSticky ? "sticky" : null}`}
          ref={historyEl}
        >
          {history
            .filter(item => item.cleared == false)
            .map(item => (
              <div className="historyItem">
                <div className="history-input">
                  <div>
                    <div className="stack">
                      ~
                      {item.stack.length <= 1
                        ? ""
                        : '/' + renderPath(item.stack) }

                      $
                    </div>{" "}
                    {item.userInput}
                  </div>
                </div>
                {item.output ? (
                  <div
                    className="history-output"
                    dangerouslySetInnerHTML={{ __html: item.output }}
                  />
                ) : null}
              </div>
            ))}
          <form
            hidden={userInputHidden}
            onSubmit={handleSubmit}
            className="input-form"
          >
            <div className="stack">
              ~
              {currStack.length <= 1
                ? ""
                : '/' + renderPath(currStack)}
              $
            </div>
            <input
              ref={inputEl}
              autoFocus
              className="user-input"
              onChange={handleInputChange}
              onKeyDown={checkUserScroll}
              value={userInput}
            />
          </form>
        </div>
        <div />
      </div>
    </div>
  );
};

export default App;
