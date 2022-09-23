# La bibliothèque de Henri Potier

Il était une fois, une collection de cinq livres racontant les histoires d’un formidable héros nommé Henri Potier. Tous les enfants du monde trouvaient les histoires de cet adolescent fantastiques. L’éditeur de cette collection, dans un immense élan de générosité (mais aussi pour booster ses ventes ;)), décida de mettre en place des offres commerciales aussi aléatoires que l’issue des sorts de Ron Weasley

## Project Description

This project was made using the basic React app as a boilerplate template and then built upon to create the necessary components to satisfy the editor requirements. Since I consider myself a beginner in React, please do not expect a top notch website that has no flaws nor space to improve. In fact, it is the complete opposite, I recognize that the style is lacking to say the least, I haven't implemented any unit tests (I need to learn more about react), and I wish I made it a responsive webpage for a better ease of use. But alas, this is my solution that I'm proud of for the time being, and while I will do some code refactoring, I will not change any functionalities for the time being.

I initially wanted to build and host the webpage on a Github Pages site, however due to the API restriction of using the `https` protocol I scraped that idea. I will provide a small description of the components and concepts used in this project below:

### App

The `App` component provide the base for the webpage and set up the routes to different pages while keeping the logic simple and direct. It also serves to create three States that are essential to many parts of the webpage. These states are: `cartState`, `cartSize`, and `totalPrice`. Setting or changing these states is made through the `updateCart` function.

I also used the `Context` feature from react to share these states with other components for the sake of accessibility and readability of the code. I might split the single context into three to avoid complicating the code.

### Nav

This component is present on all parts of the website, it represents the top menu which allows the user to navigate the website to either the home page, the about page, or the cart page. The menu also displays the number of items currently placed in the cart, this number is changed dynamically whenever items are added or taken out of the cart.

### Home

The Home component serves two purposes:

- Displaying a list of the available books in the form of their cover, title, and price.

- Integrating a search function which dynamically filters through the book list using the book titles, and returns only the related items.

Each book card is clickable and links to a page that displays the full details of the book (will discuss further in the BookInfo section). I used the `isbn` as the id which allows to create a webpage based on a prepared template.

### BookInfo

This components displays all the information regarding the selected book: title, isbn, price, and synopsis. This component also allows the user to add the book to the cart, if the book is already in the card it doesn't deny the user adding more copies to the cart.

### About

Just a simple about page where I pasted the text from the test document, it just felt wrong to have a webpage with no about page.

### Cart

This components serves just as what it name implies, it is the cart:

- If there is no element in the cart it just displays a message indicating the case.

- If there is one or more items in the cart it displays them in a list of cards that provide the book title, isbn, and price. If more than copy is placed in the cart, the component doesn't place a duplicate item in the list but rather increase the number of copies displayed on the list item. Each list item has three control buttons that serve to manage the books in the cart:

  - The `+` button adds another copy of the book to the cart.

  - The `-` button removes a single copy of the book. If the number of copies hit `0`, the book is removed from the list completly.

  - The `Delete` button removes the book from the cart regardless of the number of copies present in the cart.

### Price

This component is present on the Cart page, however it is only visible if there is at least one item in the cart, otherwise it is disabled. This components displays the total price of the items placed in the cart, it is dynamically updated with any change to the cart.

The Price component also calculates the best offer every time the contents of the cart are changed, it displaced the substracted amount and the reduced price. Finally, you can find the `Buy Now` button that just displays an alert message (this is a mock store after all).

### E404

This components serves the simple purpose of handeling any issues that might arise from attemting to enter a false link. It notifies the user that the requested page does not exist and provide a redirect link towards the Home page.

## Other Thoughts

While I believe the project, as is right now, answers well to the request of the client. However, there are quite a few things I wish I could go back to and improve upon in the future:

- As mentionned before, there is no implementation for any unit tests which is a bad practice that I wish to resolve soon by learning more about React.

- When a change occurs on the cart, there is a visual bug that appears briefly on the offered reduction amount. I would like to investigate this bug and eliminate it.

- As of right now, reaching `0` or hitting the `Delete` button in the cart auto removes the item. It would be best to display a confirmation message before that for a better UX.

- More animations and responsive designs would defenitely be welcome. It is also possible to introduce themes (I like working with dark themes) for a better looking and more unified look for the website.

- Right now the webpage have no backup, so a quick refresh would erase any changes made by the user. Integrating cookies or another mechanism would be good for saving the user from performing actions everytime they visit the site.

That's all I can think about right now, any feedback is welcome as always. I think that this project displays a clear picture of where I stand on my learning journey and the steps I should take in the future to better improve. Thank you for reading so far and have a good day 🙂.
