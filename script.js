function books() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(xmlhttp.response);
      var book = myObj.items[0];
      var title = (book["volumeInfo"][0]]);
      console.log(title);
    }
  };
  xmlhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=search+terms", true);
  xmlhttp.send();


}
