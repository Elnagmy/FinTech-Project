# FinTech-Project (Team 4 - Payment Gateway)

<h3>Team Memebers :-</h3>

<ol type="1">
  <li>Omar Abdo</li>
  <li>Mohamed Saber</li>
  <li>Omar Adel</li>
  <li>Ola Diaa</li>
  <li>Ahmed ElNabawy </li>
</ol>
 

<h3>Overview</h3>
We designed the payment gateway application with microservice architecture, the system consist from 3 main microservices, the services communicate together with a REST full API, and  authenticated with JWT tokens, each service can scale up or down independently and can be deployed independently as long as the changes are not in the API contract , In order to help the merchants to avoid PCI regulation, we will offer them to redirect the customers checkout request to us and we will handle the payment end to end for them, they don't have to store any payment information or card information.

<img src="https://github.com/Elnagmy/FinTech-Project/blob/main/Project%20Digrams/overview/overview-Page-2.drawio.png" alt="end point digram">

<h3>Microservices overview </h3>
<h4>1. Authentication service : </h4>
This service is responsible to provide authentication services to authenticate the requests coming from Merchants  and the request between the microservices, the service has three endpoints: 
<br>
<strong>⦁	Register : </strong>
This service is only exposed to the Administrators' user with a valid JWT Admin token, the endpoint will create the merchants and the API services credentials. Admin has to provide the token in the header, and the merchant or the API Client service object in the request body.  
<br>
<strong>⦁	Login: </strong>
this end point is exposed to everybody, merchant or service can use this end point to supply the username and the password and the service will provide the JWT token which is valid for two hours. The password is sha256 encrypted in the database. 
<br>
<strong>⦁	Auth: </strong> 
this end point is exposed to all services, it helps the services to validate all coming request, all services have a middleware code to call this service and pass the request token, and this service validate the token and provide the relevant response to the other services. 

<h4>2. Merchant services : </h4>
This service is exposed to the merchants to use, it provides the below end points : 
 <br>
<strong>⦁	Register :</strong> 
 which merchants use to register to the payment gateway network, once the merchant registered and a token is provided to him, the merchant can add us as a payment method. 
 <br>
<strong>⦁	Checkout : </strong>
 when the customer checkout the shopping cart, the merchant will need to send a post request to this end point with the authentication details and the amount required to be paid, this end point will create a session with specific time period, and a direct URL, the merchant will need to redirect the customer to our payment getaway page, the reason we did it this way, to take the overload of PCI Data Storage regulation from the shoulder of the merchants. 
  <br>
  <ul> 
 <li>A Valid redirect : with a valid session ID and amount , we will direct the customer to a web page where he can enter the cc information  </li>
 <li>In-Valid redirect : we will redirect the customer back to the merchant. </li>
 <li>Customer will need to provide a valid credit card information.  </li>
 <li>The merchant API service will send the CC information to the bank payment service, and wait for the result </li>
 <li>Once the response received from the payment service, if the payment fails we will display the error message, and redirect the customer back to the merchant.  </li>
 <li>Once the response received from the payment service, if the payment fails we will display the error message, and redirect the customer back to the merchant. </li>
  <li>IF the payment is success, we will display to the customer a sucess message and redirect the customer to the merchant again.  </li>
 </ul>

 
<h4>3. Bank Payment service : </h4>
This service is responsible to provide the integration between banks and to provide all transaction done by  merchant if,  the service has two endpoints :
<br>
<strong>⦁	Pay : </strong> 
this endpoint is exposed to the merchant service to provide the cc information and the amount we need to pay and the merchant. The service then get the issuing bank from the card number, then it connects to the bank and do the payment. Bank connectivity information are stored in the database.
<br>
<strong>⦁	 getTransactionByMerchantId : </strong>this endpoint retrieve all transaction for specific merchant and provide to them in order to do settlements

<h3>Application End Point architecure :</h3>
 <img src="https://github.com/Elnagmy/FinTech-Project/blob/main/Project%20Digrams/Payment-gateway.png" alt="end point digram">
 
<h3>Referances :<h3> 
 <h4> Github Repo : </h4> https://github.com/Elnagmy/FinTech-Project
 
 <h4> Heroku End Points : </h4>
 <h5> 1. Payment gateway auth Service : </h5>
https://payment-gateway-auth-service.herokuapp.com/
<h5> 2. Payment gateway Bank Service :</h5>
https://payment-gateway-bank-service.herokuapp.com/api/pay
<h5> 3. Merchant Service :</h5>
 
