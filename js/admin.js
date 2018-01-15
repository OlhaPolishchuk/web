var i = 0;

function isOnline() {
   return window.navigator.onLine;
}


function addNews() {
    if ($('#news-name').val() === "" || $('#news-text').val() === "") {
        alert('Заповніть всі поля');
        return false;
      }
    if (isOnline()) {
        var data = {
            name: document.getElementById('news-name').value,
            text: document.getElementById('news-text').value
        };
        $.ajax({
            url: 'http://localhost:8080/api/bears',
            type: "post",
            dataType: "json",
            data: data
        });
        document.getElementById('news-form').reset();
        alert('Новина успішно надіслана.');
      } else {
         if (useLocalStorage) {

             var name = document.getElementById('news-name').value;
             var text = document.getElementById('news-text').value;
             imgData = target.src;
             i++;
             var list = [];
             list.push({"name": (name), "text": (text)});
             localStorage.setItem('n' + i, JSON.stringify(list));
             localStorage.setItem('i' + i, (imgData));
         }
         else {
             var transaction = db.transaction(["news"], "readwrite");
             var store = transaction.objectStore("news");
             var news1 = {
                 name: document.getElementById('news-name').value,
                 text: document.getElementById('news-text').value,
                 img: target.src
             };
             store.add(news1);
         }
          document.getElementById('news-form').reset();
      }
  }

  function showImage(src, target) {
      var fr = new FileReader();
      // when image is loaded, set the src of the image where you want to display it
      fr.onload = function (e) {
          target.src = this.result;
      };
      src.addEventListener("change", function () {
          // fill fr with image data
          fr.readAsDataURL(src.files[0]);
      });
  }

  var src = document.getElementById("news-img");
  var target = document.getElementById("target");
  showImage(src, target);
