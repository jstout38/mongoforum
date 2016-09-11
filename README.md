# Web Forum

A fully functional web forum build from scratch using a Ruby on Rails API and an AngularJS client. Angular Material and Bootstrap are used for much of the formatting.

The Ruby on Rails application uses MongoDB, a NoSQL, document-based data store. The API and the client assets are housed in the same file structure for cohesiveness. Devise is used for user authentication and authorization and is integrated into both the backend API and the client. Validation is mostly performed in the client but some is done in the backend when necessary.

Current features include:

-Avatars and profile information  -Signatures  -Upvoting and downvoting  -Hidden posts based on user ratings  -User listing  -My Threads page  -Search by post keywords, username, or topic

Upcoming features will include:

-Password verification and email confirmation  -Top rated post listings  -Sortable user list  -Private messages  -Friend/Foe lists  -oAuth authentication  -Quoting and other post formatting

A fully deployed version of the application is hosted on Heroku at https://aqueous-tundra-43580.herokuapp.com/.