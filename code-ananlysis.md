# Code Analysis
## If This Were a Code Review
In the intent of letting you know how I think about code, if this were a pull request or code review, I would have spent about 5 seconds looking at this code before immediately having a quick in-person discussion with code writer because the sloppiness and inconsistencies make me twitch.  To be fair, the sloppiness and inconsistencies that probably slipped through in my own code project also make me twitch.  The 3 biggest things that I would have felt like needed to be addressed (aside from the bugs) before shipping would be the things that impact maintainability, readability, and reuse as follows:
- use of inline styles
- poor use of good naming conventions to reduce the need for excessive comments, and when documentation was provided, not formatted correctly
- lack of splitting up the view layer and model/controller/data transform/business logic layer into separate modules or using dependency management

This would have assumed that the style guide didn’t already contain information about most of this, in which case that would have been covered there and my fellow developer could just pull the code in line with the style guide. I also would immediately update the style guide with recommendations on code structure in the event that items were missing.

As this wasn’t a code review, per se, but a request for analysis, I’ve put together a list of more specific areas that I would do differently.
## Analysis notes
### General
#### Export inline styles to an external file for readability and maintenance.
#### Split code into modules to ease readability and maintainability. 
Mixing the view layer, the controller business logic, and helper functions together like this will make this very hard to update or reuse.

#### Correct inconsistent use of es6 syntax and legacy syntax.  
Either choice will work, but striving for consistency is definitely preferred.
lines 126-132
```javascript
function getLastName(fullName) {
    return fullName.match(/\w+/g)[1];
}
const getFirstName = (fullName) => {
    return fullName.match(/\w+/g)[0];
};
```
####
Poor inline documentation; where there is documentation, no jsdocs @param or @return entries

- bad metadata
- styles: 0px should be 0
- inline scripts
- Too much in 1 file
- no transpired es6, won’t work on some browsers
- no polyfill for fetch
- bad vars in shuffle
- use of slice should use spread operator
- line 184 slice should be slice(0)
- line 204 doesn’t work
- line 241 bad return, should be 0