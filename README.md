# Demo Credit
Demo Credit gives you hassle free banking in your hands

Demo Credit gives the power to

- Deposit and save money
- Transfer funds from one Demo Credit customer to another with their unique account number
- Withdraw your funds into your personal bank account

![image](https://user-images.githubusercontent.com/67710631/225766792-726d20f0-8ab9-4a3b-b52f-cc99ae31f845.png)

 

# API Endpoints


## Create Account

```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/auth/create

```

## Login

```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/auth/login

```

## Get Wallet Details
Returns the wallet details which includes account number and wallet balance

```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/wallet

```
## Initialize Transactions
Initialize a transaction to fund account.
Alternatively, you can initialize a transaction with this [Paystack Sandbox](https://codesandbox.io/s/paystack-example-forked-evp1dw?file=/src/App.tsx), change the email and attempt to make a payment. Copy the transaction reference from the console and proceed to the Verify Transaction endpoint

```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/wallet/initializeTransaction

```

## Verify Transactions
This takes the reference gotten from the transaction initialization

```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/wallet/verifyTransaction

```

## Fund Account
This is for a customer who has already gone through the verifyTransaction beforehand. They can now fund their accounts without having to initialize their transaction all over again
```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/wallet/fundAccount

```

## Transfer Funds
Transfer funds from a customer to another customer via the account number gotten from their wallets

```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/wallet/transfer

```

## Withdraw Funds
Withdraw funds from your Democredit account into your bank account

```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/wallet/withdraw

```

## Get All Transactions
Returns all the transactions made by a customer

```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/transactions

```
## Get One Transaction
Returns a particular transaction 

```
https://animashaun-fawaz-lendsqr-be-test.onrender.com/wallet/withdraw

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
