window.addEventListener('load', function() {

    var add__btn = document.querySelector('.information');

    add__btn.addEventListener('submit', function(event){
        event.preventDefault();
        var order = new FormData(add__btn);
        var data = new URLSearchParams(order);
        console.log(data, order);

        var promise = fetch('/checkout/orders', {method: 'POST', body: data});
        promise
            .then(function(response){
                console.log(response);
                return response.json();
            })
            .then (function(data){
                console.log(data);
            });


    });


});
