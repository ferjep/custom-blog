# Custom blog (MERN)

This is a custom blog that I've been creating in my free time using the MERN stack (MongoDB, Express, ReactJS and NodeJS).

It has an admin panel where (by now) you can create, edit or delete a post, delete comments, and edit the info that it's shown up in the blog page such as blog name, author, author profession and your twitter handle, which will make appear your twitter feed on the right of the blog page.

For creating and editing posts, it uses [EditorJS](https://editorjs.io/) which is a block-style rich editor that outputs in JSON.

## Getting started

**Before anything else**, this project uses some environment variables to work properly, such as:

<pre>
MONGODB_URI=(your MongoDB database uri)
ADMIN_USERNAME=(admin username)
ADMIN_PASSWORD=(admin password)
SECRET_ACCESS_KEY=(your secret key)
</pre>

- Production, set it up in your preferred deployment service

- Development, create a &nbsp;`.env`&nbsp; file

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
