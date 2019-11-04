const assert = require('assert');
const ObjectID = require ('mongodb').ObjectID;


function createRoutes (app, db) {

    app.get('/', (request, response) => {
        console.log('Alguien entró a la ruta inicial');
        response.sendFile(__dirname + '/public/index.html');
    });

    // app.get('/tiendass', (request, response) => {
    //     console.log('Alguien entró a la tienda');
    //     response.render('store');
    // });

    app.get('/tienda', (request, response) => {
        const products = db.collection('products');
        console.log('Alguien entró a la tienda');

        //buscamos todos los productos
        products.find({})
            //transformamos el cursor a una arreglo
            .toArray((err, result) => {
                //aseguramos de que no hay error
                assert.equal(null, err);
                var listCopy = result.slice();

                if (request.query.filter__bread == "ar") {
                    listCopy = listCopy.filter(function(elem) {
                        if (elem.typeOfBread === "Pan Árabe") {
                            return true;
                        } else {
                            return false;
                        }
                    });
                }

                if (request.query.filter__bread == "tri") {
                    listCopy = listCopy.filter(function(elem) {
                        if (elem.typeOfBread === "Pan de Trigo") {
                            return true;
                        } else {
                            return false;
                        }
                    });
                }

                if (request.query.filter__bread == "ajo") {
                    listCopy = listCopy.filter(function(elem) {
                        if (elem.typeOfBread === "Pan de Ajonjolí") {
                            return true;
                        } else {
                            return false;
                        }
                    });
                }

                if (request.query.filter__bread == "que") {
                    listCopy = listCopy.filter(function(elem) {
                        if (elem.typeOfBread === "Pan de Queso") {
                            return true;
                        } else {
                            return false;
                        }
                    });
                }

                if(request.query.order__products == 'orderPrice'){
                    listCopy.sort(function(a, b){
                        return a.price-b.price;
                });

                }

                if(request.query.order__products == 'orderPopularity'){
                    listCopy.sort(function(a, b){
                        return a.popularity-b.popularity;
                });
            }

            if(request.query.order__products == 'orderTime'){
                listCopy.sort(function(a, b){
                    return a.time-b.time;
            });
        }

            if (request.query.filter__price == "<3000") {
                listCopy = listCopy.filter(function(elem) {
                    if (elem.price < 3000) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }

            if (request.query.filter__price == "3-10") {
                listCopy = listCopy.filter(function(elem) {
                    if (elem.price >= 3000 && elem.price <= 10000) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }

            if (request.query.filter__price == ">10") {
                listCopy = listCopy.filter(function(elem) {
                    if (elem.price > 10000) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }

            if (request.query.filter__time == "<5") {
                listCopy = listCopy.filter(function(elem) {
                    if (elem.time < 5) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }

            if (request.query.filter__time == "5-10") {
                listCopy = listCopy.filter(function(elem) {
                    if (elem.time >=5 && elem.time <= 10) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }

            if (request.query.filter__time == ">10") {
                listCopy = listCopy.filter(function(elem) {
                    if (elem.time > 10) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
            
                var context = {
                    products: listCopy, pagina:"Tienda"
                };

                response.render('store',context);
        });
    });

    app.get('/product/:id', function (req, res) {
        const products = db.collection('products');
        var query= {};        
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            var c=0;
            for(c;c<result.length;c++){
                if(req.params.id.toString()===result[c]._id.toString()){
                    result[c].cartLength= cartList.length,
                    res.render('product', result[c]);
                }
                
            }
            
            
        });
        
    });
}
    module.exports = createRoutes;