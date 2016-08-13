# mongoforum

ser
#####
Username string
Email string
Password string
Website string
Facebook string
Twitter string
Pinterest string
LinkedIn string
Location string
Occupation string
Interests text
Birthday date
Signature text
Avatar image

Posts has many
Private Messages has many
Ignore List has many
Friend List has many

Post
#####
Body text
Upvotes
Downvotes
Forum belongs to one
User belongs to one
Thread belongs to one

Thread
#####
Post has many
Forum belongs to one
Subject string