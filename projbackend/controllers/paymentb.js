const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "7qbbnfvms6wn7kq3",
  publicKey: "pfn4r4cxzbff3fz9",
  privateKey: "f99b32d5803121576304a2cdea1eb63d"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            res.status(500).send(err)
        }else {
            res.send(response)
        }
      });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient =req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err) {
              res.status(500).json(err)
          }else {
              res.json(result)
          }
      });
}