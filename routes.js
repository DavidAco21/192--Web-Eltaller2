const assert = require('assert');
const ObjectID = require ('mongodb').ObjectID;
var cartList = [];


function createRoutes (app, db) {

    app.get('/', (request, response) => {
        console.log('Alguien entró a la ruta inicial');
        response.sendFile(__dirname + '/public/index.html');
    });

   

    app.post('/api/cart/:id', (request, response) => {
        var id = request.params.id;
        const products = db.collection('productos');
        var query= {};        
        
        var esId=false;
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            
            var c=0;
            var cont=0;
            for(c;c<result.length;c++){
                if(request.params.id.toString()===result[c]._id.toString()){
                    esId=true;         
                    cartList.push(result[c]);
                    
                    cont+=1;
                } 
            }
            
            if(!esId){
                response.send({
                    message: 'error',
                    cartLength: cartList.length
                });
                return;
            }
            
            
            console.log("cartList[0]");
            response.send({
                cartLength: cartList.length
            });
            
        });
        
        
        
    });

    // app.get('/tiendass', (request, response) => {
    //     console.log('Alguien entró a la tienda');
    //     response.render('store');
    // });

    app.get('/tienda', (request, response) => {
        const products = db.collection('productos');
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
                console.log(listCopy);
                response.render('store',context);
        });
    });

    app.get('/products/:id', function (req, res) {
        const products = db.collection('productos');
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
                    res.render('products', result[c]);
                }
                
            }
            
            
        });
        
    });

    app.post('/api/cartProducts/:id', (request,response)=>{
        var id = request.params.id;
        
        var listCopy = cartList.slice();
        
        
        var index=listCopy.length;
        for(var c=0;c<listCopy.length;c++){
            if(request.params.id.toString()===listCopy[c]._id.toString()){
                cartList.splice(c,1);
            }
        }

        var price=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }

        response.send({
            totalCount: "TOTAL $"+price,
        });
        
        
        
    });


    app.get('/cart', function(req, res) {

        var listCopy = cartList.slice();
        var value = 0;
        var cantidad = [];
        var is = false;
        for (var i = 0; i < listCopy.length; i++) {
            value += listCopy[i].price;

        }

        //idenfica los elementos iguales
        var count = {};
        var clean = [];

        listCopy.forEach(function(i) {
            i = i._id.toString();
            count[i] = (count[i] || 0) + 1;
        });

   
        Object.keys(count).forEach(key => {
            var obj = listCopy.find(elem => elem._id.toString() === key);
            obj.count = count[key];
            clean.push(obj);

        })

        const context = {
            products: clean,
            total: value,
            cant: count,
        }

        res.render('cart', context);

    });

   app.post('/api/cart/:id', (request, response) => {
        var id = request.params.id;
        const products = db.collection('productos');
        var query= {};        
        
        var esId=false;
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            
            var c=0;
            var cont=0;
            for(c;c<result.length;c++){
                if(request.params.id.toString()===result[c]._id.toString()){
                    esId=true;         
                    cartList.push(result[c]);
                    
                    cont+=1;
                } 
            }
            
            if(!esId){
                response.send({
                    message: 'error',
                    cartLength: cartList.length
                });
                return;
            }
            
            
            console.log("cartList[0]");
            response.send({
                cartLength: cartList.length
            });
            
        });
        
        
        
    });

    app.get('/checkout', function(req, res){
        const products = db.collection('productos');
        var query = {};

        res.render('checkout');


    });

    app.post('/checkout/orders', (request, response) => {

        const orders = db.collection('orders');
        request.body.cartList = cartList;

        orders.insertOne(request.body);

        response.send({ message: 'ok'});

    });

    
}
    module.exports = createRoutes;