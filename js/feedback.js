window.addEventListener('load', function() {
    function updateOnlineStatus(event) {
         if(isOnline()){
             readOfflineReview();
         }
     }
     window.addEventListener('online',  updateOnlineStatus);
     window.addEventListener('offline', updateOnlineStatus);
 });

 var i = 0;

 function isOnline() {
     return window.navigator.onLine;
 }

function addReview() {
    if ($('#name').val() === "" || $('#text').val() === "") {
      alert('Заповніть всі поля');
      return false;
      }

    if (isOnline()) {
      var date = new Date;
      var author = document.getElementById('name').value;
      var text = document.getElementById('text').value;
      var parentElem = document.getElementById('reviews-list');
      var out = document.createElement('div');
      out.id = 'review';
      out.innerHTML =
          "<div class='container card'><br>" +
          "   <span class='review-author'>" + author + "</span>" +
          "   <span class='review-date'>" + date + "</span>" +
          "   <p><br>" + text + "</p><br></div>";
      parentElem.appendChild(out);
      document.getElementById('form').reset();
    } else {
         if (useLocalStorage) {
             var date = new Date;
             var author = document.getElementById('name').value;
             var text = document.getElementById('text').value;
             i++;
             var list = [];
             list.push({"name": author, "text": text, "date": date});
             localStorage.setItem('r' + i, JSON.stringify(list));
         } else {
             var transaction = db.transaction(["feedback"], "readwrite");
             var store = transaction.objectStore("feedback");
             var review = {
                 message: document.getElementById('text').value,
                 author: document.getElementById('name').value,
                 time: new Date
             };
             store.add(review);
         }
        document.getElementById('form').reset();
    }
}

function readOfflineReview() {
  if (useLocalStorage) {
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
            review = JSON.parse(localStorage.getItem('r' + k));
            var parentElem = document.getElementById('reviews-list');
            var out = document.createElement('div');
            out.id = 'review';
            out.innerHTML =
                "<div class='container card'><br>" +
                "   <span class='review-author'>" + review[0].name + "</span>" +
                "   <span class='review-date'>" + review[0].date + "</span>" +
                "   <p><br>" + review[0].text + "</p><br></div>";
            parentElem.appendChild(out);
            localStorage.removeItem(k);
        }
    } else {
        var transaction = db.transaction(["feedback"], "readonly");
        var store = transaction.objectStore("feedback");

        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                var parentElem = document.getElementById('reviews-list');
                var out = document.createElement('div');
                out.id = 'review';
                out.innerHTML =
                    "<div class='container card'><br>" +
                    "   <span class='review-author'>" + cursor.value.author + "</span>" +
                    "   <span class='review-date'>" + cursor.value.time + "</span>" +
                    "   <p><br>" + cursor.value.message + "</p><br></div>";
                parentElem.appendChild(out);
            }
        }
   }
}
