# generator-mongoose [![Build Status](https://secure.travis-ci.org/afj176/generator-mongoose.png?branch=master)](https://travis-ci.org/afj176/generator-mongoose)

[![NPM](https://nodei.co/npm/generator-mongoose.png?downloads=true&stars=true)](https://nodei.co/npm/generator-mongoose/)

A generator for [Yeoman](http://yeoman.io).


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/KvLOBSb.jpg)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Generator Mongoose

While running through a leafy mongodb field he picked up mongoose.

To install generator-mongoose from npm, run:

```
$ npm install -g generator-mongoose
```

Finally, initiate the generator:

```
$ yo mongoose
```
It should output a file structure similiar to:

    .bowerrc
    .editorconfig
    .jshintrc
    config/
      - db.js
    public/
      css/  
         - style.css
      js/  
         - script.css
    models/
        - post.js
    routes/
      - index.js
      - post.js
    test/
      - test-post.js
    views/
      - index.html
    bower.json
    Gruntfile.js
    package.json
    Readme.md

### Run the app 

Development mode
```bash
$ grunt 
```
or

```bash
$ grunt server 
```

Production mode
```bash
$ grunt prod 
```



### Sub Generator Schema

Run the sub generator for schemas:

```
$ yo mongoose:schema "article|title:String,excerpt:String,content:String,published:Boolean,created:Date"
```

output:

    Your creating a schema for article
    With the fields: title,excerpt,content,published,created
       create routes/article.js
       create models/article.js
    starting request to schematic for test mock data...
       create test/test-article.js


### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/afj176/generator-mongoose/trend.png)](https://bitdeli.com/free "Bitdeli Badge")