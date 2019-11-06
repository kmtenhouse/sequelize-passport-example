# Sequelize with Passport (local strategy)
This is based on the sequelize / passport local strategy example from class...now using express's new method router() to organize routes!

## Changes
* Fixed a bug in the old boilerplate that leaked hashed passwords to the front end
* Routes now use express.router to separate concerns

## How to Use
1. Clone this repository to your local machine
2. In MySQL Workbench, create a blank database named whatever you'd like
2. In the root of the project directory, create a file called .env
3. Inside .env, put your database information in the following format:
```
DB_USER_LOCAL=yoursqlaccount
DB_PASSWORD_LOCAL=yourdevpassword
DB_DATABASE_LOCAL=yourdbnmae
DB_HOST_LOCAL=localhost
DB_USER_TEST=yourtestsqlaccount
DB_PASSWORD_TEST=yourtestpassword
DB_DATABASE_TEST=yourtestdbname
DB_HOST_TEST=localhost
SESSION_KEY=arandompasswordmadeupbyyou

```

## How to Protect Routes
* If a user is logged in, there will be an object req.user available within every ```function(req, res) {}``` that you write!  You can check ```if(req.user)``` to see if someone is logged in
* To figure out which SPECIFIC user is logged in, check the value of ```req.user.id```. 

## Suggestions
* Take a look at the existing html files. They're pretty bare bones!  What additional form validation could you add for login and signup?  What about custom error handling?
* Note: password reset is its own kettle of wax!  For this project, it would be okay not to add a reset route -- or you can do some research :)

## Additional Resources
* [OWASP Cheat Sheet - Authentication](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Authentication_Cheat_Sheet.md#authentication-and-error-messages)