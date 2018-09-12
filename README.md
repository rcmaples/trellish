# trellish

A Trello® Clone

[![Build Status](https://travis-ci.org/rcmaples/trellish.svg?branch=master)](https://travis-ci.org/rcmaples/trellish)
[![Dependancy Monitoring](https://badgen.net/badge//dependabot/green?icon=dependabot)](https://dependabot.com/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

### Stack:

- MongoDB
- Express
- jQuery
- Node

### Other Dependencies of note:

- Mocha/Chai
- lodash (pick / isboolean)
- mongoose
- passport
- jsonwebtoken

### View live:

~~[View live here](https://trellish.herokuapp.com)~~\
~~either sign up, or sign in with the demo credentials:~~\
~~john@doe.com / abc.1234~~

### Installation:

```
npm install
touch .env
```

In your code editor of choice put the following variables in your .env file

```
JWT_SECRET=someSecret
JWT_EXPIRY=3d
MLAB_URI="mongodb://user:pass@someHost.mlab.com:41972/some-db"
```

For local environments

```
npm run dev
```
