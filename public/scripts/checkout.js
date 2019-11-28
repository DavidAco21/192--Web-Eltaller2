window.addEventListener('load', function() {

    var add__btn = document.querySelector('.information__checkout');

    add__btn.addEventListener('submit', function(event){
        event.preventDefault();
        var order = new FormData(add__btn);
        


    });


});