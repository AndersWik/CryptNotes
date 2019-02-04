
# CryptNotes

App for storing and ecrypting notes.

<img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/img/screenshot.png" alt="CryptNotes App" width="500">


## Features and options

When starting the app the user is prompted for a password. This password will be used for encryption of new notes and deryption of any existing notes. Only notes encrypted with the current password will be listed.

The app will automatically lock after 5 min of none user interaction.

The following is a list of the main screens and the options available on them.

### Main menu

* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/plus.svg?sanitize=true" alt="Copy" width="25"> The plus will add an additional note.
* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/bomb.svg?sanitize=true" alt="Copy" width="25"> The bomb will delete all note in the archive.
* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/lock.svg?sanitize=true" alt="Copy" width="25"> The lock will exit the notes and take the user to the lock screen.

### List screen

* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/copy.svg?sanitize=true" alt="Copy" width="25"> Copy the note.
* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/pencil-alt.svg?sanitize=true" alt="Pencil" width="25"> Edit the note.
* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/trash-alt.svg?sanitize=true" alt="Trash" width="25"> Remove the note.

### Add note screen

* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/save.svg?sanitize=true" alt="Save" width="25"> Save the note and exit.
* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/trash-alt.svg?sanitize=true" alt="Trash" width="25"> Exit the note without saving.


### Edit note screen

* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/times.svg?sanitize=true" alt="X" width="25"> Exit without saving any changes.
* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/save.svg?sanitize=true" alt="Save" width="25"> Save the note and exit.
* <img src="https://github.com/AndersWik/CryptNotes/raw/develop/assets/fontawesome-free-5.5.0-web/svgs/solid/trash-alt.svg?sanitize=true" alt="Trash" width="25"> Remove the note and exit.

## Prerequisite

NodeJs

* https://nodejs.org/en/download/

## Setup

Install dependencies.

``` bash
$ npm install
```

Build app

``` bash
$ npm run build
```

## Versioning

This project uses Semantic versioning

* https://semver.org/