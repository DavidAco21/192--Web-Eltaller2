window.addEventListener('load', function() {

    var remove = document.querySelectorAll('.delete');

    remove.forEach(function(btn) {

        btn.addEventListener('click', function(event) {
           
            var id = btn.getAttribute('data-name');

     
            fetch(`/api/cart/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}`,
            }).then(function(respuesta) {
                return respuesta.text();
            }).catch(function(error) {
                console.error(error);
            }).then(function(mensaje) {
                console.log(mensaje);
            });

        });

    });

});