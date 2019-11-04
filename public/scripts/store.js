window.addEventListener('load', function(){

    var btnsAdd = document.querySelectorAll('.carcar');
    var cartCount = document.querySelector('.cart__count');

    btnsAdd.forEach(function (btn) {
    
        btn.addEventListener('click', function(event){
            event.preventDefault();
            var id = btn.getAttribute('data-name');
            console.log("cartLength");

            var promise = fetch('/api/cart/' + id, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    cartCount.innerText = data.cartLength;
                });

        });

    });

});