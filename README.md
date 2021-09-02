# ad_page

routes.js file contains the following routes:

1. '/test/home'
    content - the list of all categories and their subcategories

2. '/test/category'

    '/test/category/:id'
    content - the list of all advertisements in the subcategories with the given parent id

3. '/test/subcategory'

    '/test/subcategory/:id'
    content - the list of all advertisements in the subcategory with the given id

4. '/test/item'

    '/test/item/:id'
    content - information about the advertisement with the given id

    '/test/item/:id/images'
    content - all images of the advertisement with the given id

5. '/test/message'

    '/test/message/:id'
    (if a user is loged in)
    content - a form to send a message for the advertisement with the given id
    post method - creates a new message in the "messages" table

6. '/test/user/messages'
    (if a user is loged in)
    content - the list of all messages sent to or from the user

    '/test/user/messages/:id'
    (if a user is loged in)
    content - messages (conversation) with the given id and a form to reply
    post method - updates the messages (conversation) with the given id

7. '/test/login'
    content - a form to login
    post method - checks the credentials and directs to the account

8. '/test/register'
    content - a form to register
    post method - creates a user in the "users" table

9. '/test/logout' - logs out the user

10. '/test/account'
    (if a user is loged in)
    content - information ablout the user

11. '/test/profile'
    (if a user is loged in)
    content - a form to update the profile of the user
    post method - updates the profile of the user

    '/test/profile/:id'
    (if a user is loged in)
    content - the list of advertisements posted by the user with the given id

12. '/test/delete/account'
    (if a user is loged in)
    content - a form to confirm to delete the account
    post method - deletes the user and any information associated with them

13. '/test/ad'
    (if a user is loged in)
    content - the list of categories to choose for the post

    '/test/ad/:id'
    (if a user is loged in)
    content - a form to submit a post
    post method - creates an advertisement in the "ads" table

14. '/test/add/category'
    (if a user is loged in)
    (if the user is an admin)
    content - a form to add a category
    post method - creates a category in the "categories" table

15. '/test/add/subcategory'
    (if a user is loged in)
    (if the user is an admin)
    content - a form to add a subcategory
    post method - creates a category in the "categories" table

16. '/test/delete/category'
    (if a user is loged in)
    (if the user is an admin)
    content - a form to confirm to delete the category
    post method - deletes the category unlesss it contains subcategories

17. '/test/delete/subcategory'
    (if a user is loged in)
    (if the user is an admin)
    content - a form to confirm to delete the subcategory
    post method - deletes the subcategory unless it contains advertisements

18. '/test/edit'

    '/test/edit/:id'
    (if a user is loged in)
    content - a form to edit the advertisement with the given id
    post method - updates the advertisement with the given id

19. '/test/delete/ad'

    '/test/delete/:id'
    (if a user is loged in)
    content - a form to confirm to delete the advertisement with the given id
    post method - deletes the advertisement with the given id

20. '/test/error'
    content - information about the occurred error