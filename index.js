const express = require("express");
const app = express();
const mercardoPago = require("mercadopago");

mercardoPago.configure({
    sandbox: true,
    access_token: "TEST-269850690680080-011908-3cc8eab265e96da5cf4d4d6484a90581-244513121"
});



app.get("/", function(req,res){
    res.send("Bem vindo!aaaaa")
});

app.get("/pagar", async function (req,res){
    
    var id = "" + Date.now();
    var emailDoPagador = "srbam02@outlook.com";

    var dados = {
        items : [
            item = {
                id: id,
                title: "2x jogos",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(10)
            }
        ],
        payer:{
            email: emailDoPagador
        },
        external_reference: id
    }

    try{
        var pagamento = await mercardoPago.preferences.create(dados);
        console.log(pagamento);

        return res.redirect(pagamento.body.init_point);
    }catch(err){
        return res.send(err.message);
    }
    
});

app.post("/",(req,res) => {
    console.log(req.query);
    res.send("OK")
})
app.listen(80,function(error){
    if(error){
        console.log("Erro detectado");
    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})
