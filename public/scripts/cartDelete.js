window.addEventListener('load', function(){

    var btnsAdd = document.querySelectorAll('.delete');
    var total = document.querySelector('.total');


    btnsAdd.forEach(function (btn) {
        
        btn.addEventListener('click', function(event){
            event.preventDefault();
            var id = btn.getAttribute('data-name');

            var promise = fetch('/api/cartProducts/' + id, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    total.innerHTML=data.totalCount;
                });

                window.location.reload();

        });

    });

  

});