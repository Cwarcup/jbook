# Overview of the project

The application uses a CLI to launch an interactive development environment for writing and documenting code. 

## Features

User enters the command `jbook serve` to start the development environment. The user is prompted to navigate to 'http://localhost:4005' to view the application.

The 'text' button adds in a new next cell to the document. The user is prompted with a markdown editor where they can write out documentation. User has access to full markdown syntax (links, bullets, etc). Once the user clicks outside of the cell, the cell is rendered as markdown.

The 'code' button creates a new cell with a fully featured code editor. The user can write code on the left side, and automatically render the code on the right side. The user can also show the code by using a special method called `show()` to display content. 

User can add in as many cells as they'd like. 

For example, if the user calls `show(123)`, the right hand side will display '123'. 

Code cell features:
- handle advanced code syntax (e.g. JavaScript with JSX syntax).
- import and use any module from NPM (e.g. `import axios from 'axios'`).
- import CSS files from NPM (e.g. `import 'bootstrap/dist/css/bootstrap.min.css'`).

All content is stored in a file called 'book.js' in the root of the project. Inside this file is the content written in the browser. This file can shared with other users and loaded into jbook. 

## Challenges

Executing the code that a user provides in a preview window. 

Creating a cell to accept markdown and render it as markdown.

Code cell needs to take in some code, render it, and display the result in a preview window. 

Code will be provided to Preview as a *sting*. We have to execute it safely. The code may have a syntax error, therefore, we need to ensure this doesn't crash the application. 

The code might have advanced JavaScript syntax in it (e.g. JSX) which the browser can not execute. Need to preprocess this code before executing it.

The code might have import statement for other JavaScript or CSS. We have to deal with those import statements *before* executing the code.

## Considerations when running user code in the browser
- User-provided code might throw and error, causing our application to crash. 
  - Handling infinite loops.
- User-provided code might mutate the DOM, causing the application to crash. 
  - `document.body.innerHTML = ''` will clear our DOM.
- A user might accidentally run code which is malicious.

### General Solution

`iFrame` is a good solution for this problem. See details [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe). Need to also disable direct communication between the child and parent.

---
 

## Bundling Options

We will use a bundler to automatically find all the modules to user has imported from NPM. 

**Option 1**: React app sends code to the backend API server, which runs Webpack. Webpack will find the missing modules. We will use a plugin to automatically find the modules called [NpmInstallWebpackPlugin](https://v4.webpack.js.org/plugins/npm-install-webpack-plugin/). Once the modules are found, Webpack will bundle them together into a single file and send it back to the React app.

**Issues**: We are using a backend API server to install modules over and over again. Eventually our server would be full of modules.

---

**Option 2**: Every similar to the option above, however, we will write our own custom plugin to intercept the import statements and fetch *individual files from npm* and take the source code and bundle it together.

---

**Option 3**: Same as above, but implement all the Webpack processing into our application. This eliminates the need to use a backend server, speeding up our application. In addition, the users machine reaches out to the NPM registry to fetch the modules. Bundling processes occurs on users machine. 

### Which option is best?

| Remote                                                                        | Local                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| We can cache downloaded NPM modules to bundle code faster                     | Removes an extra request to the API server, speeding up code execution. |
| Will work better for users with slow devices or limited internet connections. | We do not have to maintain an API server                                |
|                                                                               | Less complexity since we are not moving code back and forth.            |

We will go with the local approach. 

# Webpack Replacement

The issue is that Webpack does not run in the browser. We will use a tool called [ESBuild](https://github.com/evanw/esbuild) which can transpile and bundle our code within the browser. Using `args.path` for they key. 

---

Uses [localForage](https://www.npmjs.com/package/localforage) to handle caching of multiple network requests.
Uses [ESBuild](https://esbuild.github.io/) to transpile and bundle our code. 
[Unpkg](https://unpkg.com/) to fetch NPM modules.
Uses [Monaco Editor](https://www.npmjs.com/package/@monaco-editor/react/v/3.7.4) to render code.
Includes [Prettier](https://www.npmjs.com/package/prettier) to format code.
[Bulmaswatch](https://jenil.github.io/bulmaswatch/) for CSS.
[React-resizable](https://www.npmjs.com/package/react-resizable) for resizing windows. 
[uiw/react-md-editor](https://www.npmjs.com/package/@uiw/react-md-editor) for markdown editor.
[React-redux](https://react-redux.js.org/) for state management.
[Immer](https://immerjs.github.io/immer/update-patterns) to handle state changes.
[fortawesome/fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free) for icons.


---

code cells communicate between each other. For example, if you import a module in one cell, it will be available in the next cell.

Built in `show()` function to display content from the code cell in the preview window. Can accept a number, a string, an array, object, or even a component. Will automatically render JSX without having to import React and ReactDOM if the show() function is called.

User can show a react component using the `show()` function:
```jsx
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return <h1> component </h1>
}

show(<App />)

show(
  <div>
    <App />
    <App />
  </div>
);
```

# Local Storage

Local storage is used to store the code cells.
- User can run `npx jbook serve` to start the server. User navigates to localhost:4005 to view the application.
- The CLI will start up a local node server with Express.
  - The CLI serve up the application on localhost:4050.
  - It writes any changes the user makes to the users local machine.
  - Loads up the local files at launch if they exist.

Lerna is used to manage multiple packages.