<h1>Prototype Virtual Vending Machine Application</h1>

<h3>Overview</h3>
<li>This prototype of a vending machine contains a list of products, with a corresponding amount and quantity available.</li>
<li>Customers can put in (virtual) money and purchase an item.</li>  
<li>After they have purchased an item, they can use the remaining money to purchase another item or have the change returned to them.</li>
<li>Once they are done (and as they progress through their purchases), they see a list of the items they have purchased.</li>

<h3>Simulation of Virtual to an Actual Vending Machine</h3>
<li>In an actual vending machine, a customer would generally insert their money via a card scan/coin slot and see their balance go up.</li> 
<li>In this virtual vending machine, this is all handled by the one money balance field, that the user can enter their initial balance into, and also change it to a higher amount (simulating them adding more funds).  They cannot change it to a smaller amount however, for this they should use the Refund Money button to clear the balance, and then they can start a new transaction.</li>

<h3>Some basic business rules</h3>
<li>Users cannot purchase a product if there is no quantity remaining</li>
<li>Users can only purchase a product if they have put in funds equal to or greater than the cost of the product</li>
<li>Users should receive the correct change back after the transaction</li>
<li>The product quantity should be reduced by the amount of quantity purchased of an item</li>

<h3>Additional features</h3>
<li>Many user-friendly messages appear depending on data entry</li>
<li>Purchase List fades away (about 10 seconds) and new random welcome message appears ready for the next customer</li>
<li>The cheapest product priced items that is still in stock is tracked, so that meaningful messages can be provided to the customer, in relation to the amount of funds they have provided</li>

<h3>Technical spec</h3> 
The front-end is a single page app with a single index.html linking to external JS file. Due to access to limited personal IT resources as well as time contraints, the use of a very basic html/javascript coding has been implemented (front-end track), with the dataset contained as part of the javascript file. Obviously this has security issues and limitations: such as the product quantities do reduce after purchases as per the requirements specifications, but if the web page is refreshed the product data set is also refreshed - which in a non-prototype situation would not be acceptable.  
    
<h3>Testing</h3>
Testing has been conducted on Microsoft Edge. Testing has been a mix of structured and adhoc (with or without preconditions). Including (but not limited to):
<li>Meeting the basic requirements and common workflow scenarios - eg: after a successful purchase, the item's qty reduces and this is refreshed to the screen; repeat on same product and it reduces again and updates the page; repeat until none of product left - and then shows 'Sold Out' and then on the customer attempting to purchase this same item - they are not permitted - with user friendly message; or eg: customer puts in money - buys a product - their money balance reduces correctly - if > 0 they can request change - refund amount is shown to screen - and purchase history shows</li> 
<li>Obvious pathways - eg: testing each pathway that leads to a message displayed to the user; and then that the message displayed is relevant, accurate and user-friendly, and shows correct highlighting of the message type eg: warnings are red</li>
<li>Data entry validation / user-friendliness / error handling - eg: no negative values allowed (in this app); hints when hover over eg: the Money In field; wording is relevant to the targeted audience - eg: for a vending maching the wording over the money field is 'Put money in here...', but in a more formal application it might be better reading as 'Enter money amount you wish to spend...'; there is consistency (familiarity for users' experience) of layout/fonts/message wording/phrasing style/etc throughout the app; messages to screen follow an app wide consistency for immediately highligting to user whether they are a warning, info, successful/neutral - in this app simply done using colours red/blue/green; ensure user-friendliness with which field/control has focus after each action </li>
<li>Calculations - eg: Qty reduces as product sells; correct product is adjusted; customer's money balance reduces by correct amount of each purchase; when not enough money left - product qty doesn't reduce, nor does customer's money balance and customer is given user-friendly message explaining not enough funds; also check comparisons of number fields aren't comparing by text values eg: comparison (for greater than/less than) of text "10" and "2.40" would give different outcome to comparing number of 10 and number of 2.40 </li> 
<li>More complex and uncommon scenario testing - eg: [Precondition: Cheapest product has sold out] - The customer buys a product; then after the purchase, customer's spending balance is more than the cheapest product price, but less than the next cheapest priced product that has stocks; the resulting message shown to the user indicates that they don't have enough funds left to make a purchase from any (in stock) stocked items, and message hints to them to add more funds or use the Return Money button.</li>
<li>Obscure - Customer tries to refund some/all of their money by changing the Money In field to less than the current balance (rather than the customer using the  Refund Money button) - result: user-friendly message directing them to the Refund Money button</li>
<li> Key Stroke/Mouse combinations - not just the common ways, but also test less common/unusual key strokes/mouse combinations to navigate around the page - eg just using tab and enter - no mouse</li>
<li>Front end - Check for any Console exceptions (F12)</li>
<li>Continuity - What happens after one sale finishes and the next customer commences their transaction? -> result: welcome message shows again; the purchase history list that was displayed to previous customer fades away, data is cleared and page ready for the next customer with new random welcome message.</li>
<li>Other user-friendly tests: eg: messages that may be singular or plural depending on numeric quantities - altered to read correctly - eg:  'Enjoy your snack' vs 'Enjoy your snacks'</li>
<li>Stress Test - eg: the timeout loop; or eg: the users spam clicking buttons; </li>
</ul>

<h3>Limitations/assumptions</h3>
<li>Dataset is hardcoded into js file - security and usability limitations</li>
<li>Refresh page will reset dataset</li>
<li>Although validity of user data entry checking is thorough and the messages are user-friendly, it doesn't make use of element features such as 'required', similarly its not utilising HTML5</li> 
<li>There is no null/undefined checking, as data is a basic hardcoded set for prototype</li>
<li>Assumption has been made that if the Money In balance is zero and the customer changes it to add money to the vending machine, that this is considered a new customer (and therefore the previous purchase history will be cleared) - that is, as opposed to it being the same customer who eg: did one purchase and provided the exact money (and so their Money In balance would change to zero), but then that same customer proceeds to do another purchase. </li>

 <h3>Improvements / Known Issues</h3>
 <li>Proper backend and database integration with error/exception handling - obviously!</li>
 <li>Purchase history stored to a table with time stamps</li>
 <li>Reporting - total sales for a period, stock levels, other statistical - most popular items sold between eg: 8am-10am...</li> 
 <li>Pretty it up - with product images and glyphicons etc</li>
 <li>Where the Total Purchases list displays - could extend this to show the price of each item purchased and a total spend amount...</li>
 <li>Extend UI so that user can press Enter key to jump to the next field quickly</li>
 <li> ...</li>



#   v e n d i n g - m a c h i n e   -   l a s t   u p d a t e d   2 0 2 3 1 0 2 2   1 1 5 9 a m    
 #   l e a v e - m a n a g e m e n t  
 