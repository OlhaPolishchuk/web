function addReview() {
    if ($('#name').val() === "" || $('#text').val() === "") {
        alert('Заповніть всі поля');
        return false;
    } else {
        var date = new Date;
        var author = document.getElementById('name').value;
        var text = document.getElementById('text').value;
        var parentElem = document.getElementById('reviews-list');
        var out = document.createElement('div');
        out.id = 'reviews';
        out.innerHTML =
            "<div class='container card'><br>" +
            "   <span class='review-author'>" + author + "</span>" +
            "   <span class='review-date'>" + date + "</span>" +
            "   <p><br>" + text + "</p><br></div>";
        parentElem.appendChild(out);
        document.getElementById('form').reset();
    }
}
