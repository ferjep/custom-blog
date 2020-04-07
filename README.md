# Custom blog (MERN)

This is a custom blog that I've been creating in my free time using the MERN stack (MongoDB, Express, ReactJS and NodeJS).

It has an admin panel where (by now) you can create, edit or delete a post, and edit the info that shows up in the blog page such as blog name, author, author profession and your twitter handle, which will make appear your twitter feed on the right of the blog page.

As the rich editor for creating and editing posts, it uses [EditorJS](https://editorjs.io/) which is a block-style editor that outputs in JSON.

## Getting started

**Before anything else**, this project has to connect to a MongoDB database to work, the express server will check for a &nbsp;`MONGODB_URI`&nbsp; environment variable to get the URI and connect to the database.

- Production, set it up in your preferred deployment service

- Development, create a &nbsp;`.env`&nbsp; file

  ##### Example

  `MONGODB_URI=mongodb://localhost/custom-blog`

### Quick start

1. #### Install all the dependencies (client included)

   - `npm install`

2. #### Build the ReactJS client

   - `npm run build-client`

3. #### Start the express server
   - `npm start`

### Development

1. #### Start the express server
   - `npm run server`
2. #### Start the ReactJS client
   - `npm run client`

### Deployment

This really depends on you, but in any case you'd want to build your client

1. #### Build the ReactJS client

   - `npm run build-client`

2. #### Start the express server
   - `npm start`
