# Local-API

Will be run on the users machine when they use jbook application. User will not being running the development server because it takes up a lot of resources and is slow to start up.

`get /` Sends back index.html or index.js for React App. Will get loaded in users browser.

`get /cells` Find the list of cells stored in a file (name provided in the CLI) and sends those back to the browser.

`post /cells` Take the list of cells from the browser and stores them into a file.


---

Using express to handle the requests.


---

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