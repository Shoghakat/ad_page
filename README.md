# ad_page

routes.js file contains the following routes:

1. '/test/home' <br />
    content - the list of all categories and their subcategories <br />

2. '/test/category' <br />

    '/test/category/:id' <br />
    content - the list of all advertisements in the subcategories with the given parent id <br />

3. '/test/subcategory' <br />

    '/test/subcategory/:id' <br />
    content - the list of all advertisements in the subcategory with the given id <br />

4. '/test/item' <br />

    '/test/item/:id' <br />
    content - information about the advertisement with the given id <br />

    '/test/item/:id/images' <br />
    content - all images of the advertisement with the given id <br />

5. '/test/message' <br />

    '/test/message/:id' <br />
    (if a user is loged in) <br />
    content - a form to send a message for the advertisement with the given id <br />
    post method - creates a new message in the "messages" table <br />

6. '/test/user/messages' <br />
    (if a user is loged in) <br />
    content - the list of all messages sent to or from the user <br />

    '/test/user/messages/:id' <br />
    (if a user is loged in) <br />
    content - messages (conversation) with the given id and a form to reply <br />
    post method - updates the messages (conversation) with the given id <br />

7. '/test/login' <br />
    content - a form to login <br />
    post method - checks the credentials and directs to the account <br />

8. '/test/register' <br />
    content - a form to register <br />
    post method - creates a user in the "users" table <br />

9. '/test/logout' - logs out the user <br />

10. '/test/account' <br />
    (if a user is loged in) <br />
    content - information ablout the user <br />

11. '/test/profile' <br />
    (if a user is loged in) <br />
    content - a form to update the profile of the user <br />
    post method - updates the profile of the user <br />

    '/test/profile/:id' <br />
    (if a user is loged in) <br />
    content - the list of advertisements posted by the user with the given id <br />

12. '/test/delete/account' <br />
    (if a user is loged in) <br />
    content - a form to confirm to delete the account <br />
    post method - deletes the user and any information associated with them <br />

13. '/test/ad' <br />
    (if a user is loged in) <br />
    content - the list of categories to choose for the post <br />

    '/test/ad/:id' <br />
    (if a user is loged in) <br />
    content - a form to submit a post <br />
    post method - creates an advertisement in the "ads" table <br />

14. '/test/add/category' <br />
    (if a user is loged in) <br />
    (if the user is an admin) <br />
    content - a form to add a category <br />
    post method - creates a category in the "categories" table <br />

15. '/test/add/subcategory' <br />
    (if a user is loged in) <br />
    (if the user is an admin) <br />
    content - a form to add a subcategory <br />
    post method - creates a category in the "categories" table <br />

16. '/test/delete/category' <br />
    (if a user is loged in) <br />
    (if the user is an admin) <br />
    content - a form to confirm to delete the category <br />
    post method - deletes the category unlesss it contains subcategories <br />

17. '/test/delete/subcategory' <br />
    (if a user is loged in) <br />
    (if the user is an admin) <br />
    content - a form to confirm to delete the subcategory <br />
    post method - deletes the subcategory unless it contains advertisements <br />

18. '/test/edit' <br />

    '/test/edit/:id' <br />
    (if a user is loged in) <br />
    content - a form to edit the advertisement with the given id <br />
    post method - updates the advertisement with the given id <br />

19. '/test/delete/ad' <br />

    '/test/delete/:id' <br />
    (if a user is loged in) <br />
    content - a form to confirm to delete the advertisement with the given id <br />
    post method - deletes the advertisement with the given id <br />

20. '/test/error' <br />
    content - information about the occurred error <br />