# Local-API

Will be run on the users machine when they use jbook application. User will not being running the development server because it takes up a lot of resources and is slow to start up.

`get /` Sends back index.html or index.js for React App. Will get loaded in users browser.

`get /cells` Find the list of cells stored in a file (name provided in the CLI) and sends those back to the browser.

`post /cells` Take the list of cells from the browser and stores them into a file.


---

Using express to handle the requests.


---

# How to run locally

```
cd cli
cd dist
node index.js serve

//in jbook
npm start
```

cli/dlist: `node index.js server` Runs on port 4005
root packages: `npm run start` Runs on port 3000
Create new build: local-client: `npm run build`

# Adding packages:
```
lerna add --scope=<file name> <package name>  
```

# Lera - link packages

```
lerna add local-client --scope=local-api
```

# Which packages to serve?
When we are actively developing our app on our local machine, we want to use the local-api package with create-react-app dev server.

When we are running our app on a user machine, we want to serve up the build files from build directory. 

Inside of CLI, we need to decide if we are running on our local machine for development or on a user machine for production. Before we ship to NPM, we must run a script to search for 'NODE_ENV" and set it to 'production'.

```js
const isProduction = process.env.NODE_ENV === 'production'; // keep for local machine
const isProduction = 'production' === 'production'; // keep for production when shipping to NPM
```