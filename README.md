# Sneaker sales website

To write this SPA we used such a stack :

- react
- react-router-dom
- react-content-loader
- sass
- marco-css (a library for writing styles by tailwind type classes)

This application was the first one I created in react. In it I use React.useContext to pass the state of elements to other functional components, also in some parts of the code I use props-drilling (I don't do that now because I realized that it is not the best practice).
I use Axios to retrieve data from the database and then use the map method to render it onto the page. It is also possible to add the selected item to favorites (the data is sent to the server and saved even after reloading), as well as the ability to remove items from bookmarks by clicking on the mouse button. The basket of goods is also implemented, in which the goods are stored in the basket even after reloading and after ordering get to the page "my orders". Routing is implemented with react-router-dom in the root index.js file and with <Link> in other functional components.

Launching an application :
Launching an application 
1) Clone or download this repository
2) Navigate to the project folder 
3) Launch the project with the command sudo npm start
The project will run on http://localhost:3000/
The built version of the project is in the build folder

Application screenshots : 
![](https://github.com/valdemarus21/REACT-snikers-shop/blob/master/screenshots/12.jpg)
![](https://github.com/valdemarus21/REACT-snikers-shop/blob/master/screenshots/13.jpg)
![](https://github.com/valdemarus21/REACT-snikers-shop/blob/master/screenshots/14.jpg)
