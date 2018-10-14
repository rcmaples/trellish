# trellish

A Trello® Clone

[![Build Status](https://travis-ci.org/rcmaples/trellish.svg?branch=master)](https://travis-ci.org/rcmaples/trellish)
[![codecov](https://codecov.io/gh/rcmaples/trellish/branch/master/graph/badge.svg)](https://codecov.io/gh/rcmaples/trellish)
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

[View live here](https://trellish.herokuapp.com)\
either sign up, or sign in with the demo credentials:\
username: demo@thinkful.com \
password: thinkful

### Screenshots

To add a board:
![Add a button](./doc/add-board.png)

To add a card to a board:
![Add a card](./doc/add-card.png)

Cards can have different status.

- Favorite
- Priority
- Complete

To modify a card's status or delete it, tap on the edit icon on the card. Tapping the edit icon again will close the menu.

![Modify a card](./doc/edit-card.png)

Boards can be deleted or minimized. Click on the avatar icon to sign out.

![Misc Controls](./doc/misc-buttons.png)

### Installation:

```shell
npm install
touch .env
```

In your code editor of choice put the following variables in your .env file

```shell
JWT_SECRET=someSecret
JWT_EXPIRY=3d
MLAB_URI="mongodb://user:pass@someHost.mlab.com:41972/some-db"
```

For local environments

```shell
npm run dev
```
