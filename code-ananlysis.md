# Code Analysis
## If This Were a Code Review
In the intent of letting you know how I think about code, if this were a pull request or code review, I would have spent about 5 seconds looking at this code before immediately having a quick in-person discussion with code writer because the sloppiness and inconsistencies make me twitch.  To be fair, the sloppiness and inconsistencies that probably slipped through in my own code project also make me twitch.  The 3 biggest things that I would have felt like needed to be addressed (aside from the bugs) before shipping would be the things that impact maintainability, readability, and reuse as follows:
- use of inline styles
- poor use of good naming conventions to reduce the need for excessive comments, and when documentation was provided, not formatted correctly
- lack of splitting up the view layer and model/controller/data transform/business logic layer into separate modules or using dependency management

This would have assumed that the style guide didn’t already contain information about most of this, in which case that would have been covered there and my fellow developer could just pull the code in line with the style guide. I also would immediately update the style guide with recommendations on code structure in the event that items were missing.

## Analysis Notes
As this wasn’t a code review, per se, but a request for analysis, I’ve put together a list of more specific areas that I would do differently.

### General Notes

#### Export Inline Styles to an External File.
Inline styles are incredibly difficult to maintain and decrease overal readability of your view

#### Split Code Into Modules
Mixing the view layer, the controller business logic, and helper functions together like this will make this very hard to update or reuse. I would split the code up to ease readability and maintainability. 

#### Use JSX
I prefer using JSX to declare my components for improved readability

#### Correct Inconsistent Function Definition Style  
This file defines function using both the ```function``` keyword and the ```const``` keyword. I'm in flux on this, but currently prefer using the ```function``` keyword unless I specifically need ```this``` bound through arrow function.  I honestly can't decide if I'd rather have functions explicitly called out as I'm reading it, or have the consistency of having all of my functions defined in a similar way

ex. lines 126-132
```javascript
function getLastName(fullName) {
    return fullName.match(/\w+/g)[1];
}
const getFirstName = (fullName) => {
    return fullName.match(/\w+/g)[0];
};
```
#### Transpile Code Using Babel
ES6 features used in the code still node supported in all modern browsers. In additon, there's no polyfill for ```fetch``` included.  I like [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) .

#### Update Documentation

Inline documentation is inconsistent; where there is documentation, there aren't any jsdocs @param or @return entries.


### Specific Notes and Suggested Changes

#### HTML

**Line 47: Update Doctype**

```html
<!DOCTYPE html>
```

***Line 50: Add More Metadata***

```html
<meta charset="utf-8">
<title>Single Page Application</title>
<meta name="description" content="This is a list view for employees that work at WillowTree.">
<meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1"">
...more as appplicable
```

#### CSS

***Line 53: 0px should just be 0:***

```css
body {
    margin: 0;
    padding: 0;
}        
```

***Line 63: Use less generic style name

```css
.thumbnail{
	width:100px,
	height:100px
}
```

- inline scripts
- bad vars in shuffle
- use of slice should use spread operator
- line 184 slice should be slice(0)
- line 204 doesn’t work
- line 241 bad return, should be 0