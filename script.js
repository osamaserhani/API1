window.onload = function() {
  for(var i =0 ; i < booksNames.length ; i++) {
    doClick(); 
    
  }

};

var books = [
  // add more book items here
]

var booksNames = ["harry" , "house" , "TheLightningThief","Twilight" , "TheGiver" ,  ]
var i =0;
function doClick() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var resObj = JSON.parse(xhttp.responseText);
    
      books.push({
        title: resObj.items[0].volumeInfo.title ,
        date_published: resObj.items[0].volumeInfo.publishedDate ,
        author:  resObj.items[0].volumeInfo.authors[0],
        reviews: resObj.items[0].volumeInfo.ratingsCount,
        rate: resObj.items[0].volumeInfo.averageRating, 
        img: resObj.items[0].volumeInfo.imageLinks.thumbnail})
      upDateDOM()
      console.log(resObj)

    }
  }
  // Send an asynchronous HTTP GET request to the given end point (url)
  xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + booksNames[i]+ "&key=AIzaSyB_WJVwKPveKKtaNre1qRDqfPseGHZ2HmU"  , true);
  xhttp.send();
  i++;
}


// Default sort
StarsHigh ()
upDateDOM()

function createBookItem(bookObj) {

  var liElem = document.createElement('li')

  var img = document.createElement('img');
  img.src = bookObj.img;
  img.width = 100;
  img.height = 150;
  liElem.appendChild(img);


  

  var Lit = document.createElement("div");
  var Lia = document.createElement('div');
  var Lid = document.createElement('div');
  var Lir = document.createElement('div');
  var Lira = document.createElement('div');

  //title
  Lit.appendChild(document.createTextNode("Title :" + bookObj.title))
  liElem.appendChild(Lit)

  
//Author
  Lia.appendChild(document.createTextNode("Author: " + bookObj.author))
  liElem.appendChild(Lia)

//Date
  Lid.appendChild(document.createTextNode("Published Date: " + bookObj.date_published))
  liElem.appendChild(Lid);

//reviews
  Lir.appendChild(document.createTextNode("Reviews: " + bookObj.reviews))
  liElem.appendChild(Lir);

//rate
  Lira.appendChild(document.createTextNode("Rating: " + bookObj.rate ))
  liElem.appendChild(Lira);
  
  
  liElem.appendChild(document.createElement("hr"));


  // create the remaining elements
  return liElem
}


function Dateold (){
  books.sort(function (a, b) {
    var D1 = Date.parse(a.date_published);
    var D2 = Date.parse(b.date_published);
    return D2 - D1;
  })
}
function Datenew (){
  books.sort(function (a, b) {
    var D1 = Date.parse(a.date_published);
    var D2 = Date.parse(b.date_published);
    return D1 - D2;
  })
}
function reviewsHigh (){
  books.sort(function (a, b) {
    return b.reviews-a.reviews;
  })
}
function reviewslow (){
  books.sort(function (a, b) {
    return a.reviews-b.reviews;
  })
}
function StarsHigh (){
  books.sort(function (a, b) {
    return b.rate-a.rate;
  })
}
function Starslow (){
  books.sort(function (a, b) {
    return a.rate-b.rate;
  })
} 

function upDateDOM() {
  var ulBooks = document.getElementById('books-list')
  var b = document.getElementById('br')
  ulBooks.innerHTML = ''
  for (item of books) {

    ulBooks.appendChild(createBookItem(item))

  }

}

// Sort by, select event
var select = document.getElementById("sort-news")
select.onchange = function () {
  if (select.value === 'Dateold') {
    Dateold()
    upDateDOM()
  } else if (select.value === 'Datenew') {
   Datenew()
    upDateDOM()
  } else if (select.value === 'reviewsHigh') {
    reviewsHigh()
    upDateDOM()
  } else if (select.value === 'reviewslow') {
    reviewslow()
    upDateDOM()
  } else if (select.value === 'StarsHigh') {
    StarsHigh()
    upDateDOM()
  } else if (select.value === 'Starslow') {
    Starslow()
    upDateDOM()
  }
}
