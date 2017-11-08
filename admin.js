var i = 0;

function addNews() {
    if ($('#news-name').val() === "" || $('#news-text').val() === "" || $('#news-img').val() === "") {
        alert('Заповніть всі поля');
        return false;
    } else {
        document.getElementById('news-form').reset();
        document.getElementById('news-img-form').reset();
        alert('Новина успішно надіслана.');
        /*
        var name = document.getElementById('news-name').value;
        var text = document.getElementById('news-text').value;
        var img = document.getElementById('news-img').value;
        i++;
        var list = [];
        list.push({"name": (name), "text": (text), "img": (img)});
        localStorage.setItem(i, list);*/
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
