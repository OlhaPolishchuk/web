window.addEventListener('load', function() {
     function updateOnlineStatus(event) {
         if(isOnline()) {
             readOfflineNews();
         }
     }
     window.addEventListener('online',  updateOnlineStatus);
     window.addEventListener('offline', updateOnlineStatus);
 });

 function isOnline() {
     return window.navigator.onLine;
 }


 function readOfflineNews() {
   if (useLocalStorage) {
        len = localStorage.length + 1;
     len = localStorage.length + 1;
     for (var k = 1; k < len; k++){
         news = JSON.parse(localStorage.getItem('n'+k));
         var img = localStorage.getItem('n' + k);
         var parentElem = document.getElementById('news-list');
         var out = document.createElement('div');
         out.id = 'news';
         out.innerHTML =
             "<div class='col-md-4'>" +
             "<div class='card'> " +
             "<img src='eu.jpg' style='width:100%'>" +
             "<div class='caption'><h2>" + news[0].name + "</h2></div>" +
             " <p>"+ news[0].text + "</p>" +
             "</a></div></div>";
         parentElem.appendChild(out);
         localStorage.removeItem(k);
       }
       } else {
        var transaction = db.transaction(["news"], "readonly");
        var store = transaction.objectStore("news");
        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                var parentElem = document.getElementById('news-list');
                var out = document.createElement('div');
                out.id = 'news';
                out.innerHTML =
                    "<div class='col-md-4'>" +
                    "<div class='card'> " +
                    "<img src='" + cursor.value.img + "' width='100%'>" +
                    "<div class='caption'><h2>" + cursor.value.name + "</h2></div>" +
                    " <p>" + cursor.value.text + "</p>" +
                    "</a></div></div>";
                parentElem.appendChild(out);
            }
        }
     }
 }
