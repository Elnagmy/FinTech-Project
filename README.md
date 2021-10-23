# FinTech-Project
Team 4 - Payment Gateway
Team Memebers :-
1.	Omar Abdo
2.	Mohamed Saber
3.	Omar Adel
4.	Ola Diaa
5.	Ahmed ElNabawy 

Overview
We designed the payment gateway application with microservice architecture, the system consist from 3 main microservices, the services communicate together with a REST full API, and  authenticated with JWT tokens, each service can scale up or down independently and can be deployed independently as long as the changes are not in the API contract , In order to help the merchants to avoid PCI regulation, we will offer them to redirect the customers checkout request to us and we will handle the payment end to end for them, they don't have to store any payment information or card information.
Microservices overview 
1. Authentication service : 
This service is responsible to provide authentication services to authenticate the requests coming from Merchants  and the request between the microservices, the service has three endpoints: 
⦁	Register : This service is only exposed to the Administrators' user with a valid JWT Admin token, the endpoint will create the merchants and the API services credentials. Admin has to provide the token in the header, and the merchant or the API Client service object in the request body.  
⦁	Login: this end point is exposed to everybody, merchant or service can use this end point to supply the username and the password and the service will provide the JWT token which is valid for two hours. The password is sha256 encrypted in the database. 
⦁	Auth: this end point is exposed to all services, it helps the services to validate all coming request, all services have a middleware code to call this service and pass the request token, and this service validate the token and provide the relevant response to the other services. 
2. Merchant services : 
This service is exposed to the merchants to use, it provides the below end points : 
⦁	Register : which merchants use to register to the payment gateway network, once the merchant registered and a token is provided to him, the merchant can add us as a payment method. 
⦁	checkout : when the customer checkout the shopping cart, the merchant will need to send a post request to this end point with the authentication details and the amount required to be paid, this end point will create a session with specific time period, and a direct URL, the merchant will need to redirect the customer to our payment getaway page, the reason we did it this way, to take the overload of PCI Data Storage regulation from the shoulder of the merchants. 
⦁	A Valid redirect : with a valid session ID and amount will result in the below page
 
⦁	In-Valid redirect : we will redirect the customer to the below page : 
  
⦁	Customer will need to provide a valid credit card information	:
 
⦁	The merchant API service will send the CC information to the bank payment service, and wait for the result 
 
⦁	Once the response received from the payment service, if the payment fails we will display the below page, and redirect the customer to the merchant. 
 
⦁	IF the payment is success, we will display the below page and redirect the customer to the merchant again. 
 

3. Bank Payment service : 
This service is responsible to provide the integration between banks and to provide all transaction done by  merchant if,  the service has two endpoints :
⦁	Pay : this endpoint is exposed to the merchant service to provide the cc information and the amount we need to pay and the merchant. The service then get the issuing bank from the card number, then it connects to the bank and do the payment. Bank connectivity information are stored in the database.
⦁	 getTransactionByMerchantId : this endpoint retrieve all transaction for specific merchant and provide to them in order to do settlements
Application End Point architecure : 
 
Referances : 
Github Repo : https://github.com/Elnagmy/FinTech-Project
Heroku End Points : 
1. Payment gateway auth Service :
https://payment-gateway-auth-service.herokuapp.com/
2. Payment gateway Bank Service :
https://payment-gateway-bank-service.herokuapp.com/api/pay
3. Merchant Service
 
