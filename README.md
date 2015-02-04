[![Build Status](https://travis-ci.org/angus-c/waldo.png?branch=master)](http://travis-ci.org/angus-c/waldo)

###Waldo

I got frustrated trying to find objects in runtime object models – so I created a utility that does and that can be stored as a bookmark (see Wikipeida: [Bookmarklet](http://en.wikipedia.org/wiki/Bookmarklet)).

You search for objects using a find utility. Then you can click on the retrieved objects to inspect them.

e.g. in the console do this kind of thing

```js
//global search for all properties named 'home'
find.byName('home');

//search jquery for all properties named 'map'
find.byName('map', {obj: jQuery, path: 'jQuery'})

//global search for all property names containing 'box' as a substring
find.byNameContains('box');

//global search for all arrays
find.byType(Array)

//all instances with value 1000
find.byValue(1000);

//all falsey values
find.byValueCoerced(false);

///all values coerced to string that contain a phrase
find.byValueCoercedContains('Kingston')

//search with a custom function
//e.g. all truthy properties named 'a'...
find.custom(function(searchTerm, obj, prop) {return (obj[prop] == true) && (prop == 'a')});
```


####Creating and using a bookmarklet

In you favorite browser creat a bookmark and as the page url paste the contents of `lib/find_min.js`. To use just select the bookmark while on target page and open up the JavaScript developer console - the utility will be accessible through the `find` object. 


####circular references

Waldo now detects circular references and cites them:  

```js
var a = {b: 3};
var c = {d: a};
find.byName('d');
```

will log...  
```
global.c.d -> (<global.a>) Object {b: 3} 
```

Thanks to [John-David Dalton](https://github.com/jdalton) for infrastructure improvements.
