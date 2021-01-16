// Book Class: Represents a book
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class : Handle UI Tasks
class UI {
    static displayBook(){
        // just a  dummy
        // const StoredBooks = [
        //     {
        //         title: "Book One",
        //         author: "John Doe",
        //         isbn: '34343434'
        //     },
        //     {
        //         title:'Book Tow',
        //         author:'Jane Doe',
        //         isbn:  '454546'
        //     }
        // ];
        const books = Store.getBooks();
        //loop through the array to add them
        //
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
const list = document.querySelector('#book-list');
     // insert a table row (tr) inside
     const row = document.createElement('tr');

     row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href = "#" class = "btn btn-danger btn-sm
      delete">X</a></td>
     `;

     list.appendChild(row);
    }
    //el = any target element
    //we want to check if the td element has a delete class like line 39-40
    // and we want to get the parant x2 of that element in which its tr

    static deleteBook(el){
      if(el.classList.contains('delete')){
          el.parentElement.parentElement.remove();
      }
    }
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className =`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        // Vanish in 3 sec
        setTimeout(() =>document.querySelector('.alert').remove(), 2000);
    }
    static clearFields(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value ='';
    }
}

//Store Class :Handles Storage
//key value pairs in a string 
    class Store{
        // static to call them directly
     static  getBooks() {
let books;
if(localStorage.getItem('books') === null){
    books =[];

}else {
    books = JSON.parse(localStorage.getItem("books"));
}
return books;
        }
    static addBook(book){
const books = Store.getBooks();
books.push(book);
//books are an array of objects 
//and when dealing with local storage we must use JSON to stringfy it
localStorage.setItem('books',JSON.stringify(books));
// about storage
//we created the methods and need to implement them
    }
    static removeBook(isbn){
const books =Store.getBooks();
books.forEach((book, index)=>{
    if(book.isbn === isbn){
        books.splice(index,1);
    }
});
localStorage.setItem('books',JSON.stringify(books));
    }
}

//Event :Display Books
document.addEventListener('DOMContentLoaded',UI.displayBook);

//Event : Add a Book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
// Prevent Actual submit
e.preventDefault();
    //Get Form Values
const title = document.querySelector('#title').value;//we want the value from it
const author = document.querySelector('#author').value;
const isbn = document.querySelector('#isbn').value;
// VAlidate
if(title === ''|| author === ''|| isbn === ''){
    //'danger' = color red
    //'success' = color green
    //info = blue
   UI.showAlert('Please fill in all fields', 'danger');
}else {



//Instatiate Book
const book = new Book(title, author, isbn);

// add Book to UI
UI.addBookToList(book);
// after local storage initiated
//add book to store
Store.addBook(book);
// Show success Message
UI.showAlert('Book Added', 'success');

// Clear Fields
UI.clearFields();
}
});
//Event : Remove a Book
//this code below called event propagation
//the ability to interact with a specific obj like on clicing
//to target a certain element
document.querySelector('#book-list').addEventListener('click',(e)=>{
    //remove book from ui
    //to check do below cons.log
    //console.log(e.target);
    UI.deleteBook(e.target);
// remove book from store class
//check the structure above from line 36
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show success Message
UI.showAlert('Book Removed', 'success');
});

