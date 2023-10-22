
const products = [
  {
    id: 81,
    name: 'Chocolate Bar',
    price: 3.5,
    qtyAvail: 5
  },
  {
    id: 35,
    name: 'Health Bar',
    price: 2.75,
    qtyAvail: 7
  },
  {
    id: 3,
    name: 'Juice',
    price: 4,
    qtyAvail: 16
  },
  {
    id: 26,
    name: 'Cola',
    price: 2.80,
    qtyAvail: 20
  }
];

var cheapestProductPriceOfInStockItems = 99999;  // default to ridiculously high nbr, will be set in updateVendingTable - may need this value to see if they have put in enough money to buy another item
var productListPurchasedByThisCustomer = [];
var saleInProgress = false;  //note: use setSaleInProgress to set

function setSaleInProgress(value)
{
  const summary = document.querySelector('#summaryForm');

  if (value == true)
  {
    saleInProgress = true;
    
    summary.classList.remove('fade-out');
  }
  else
  {
    saleInProgress = false;
    
    summary.classList.add('fade-out');
  }

}

function changeToMoneyInByCustomer(textBoxMoneyIn)
{
  updatePurchaseMessage("");

  //just check customer isn't trying to get their money back by changing the moneyIn value to less
  if (textBoxMoneyIn.value != "" && textBoxMoneyIn.oldValue != "" &&  Number(textBoxMoneyIn.value) < Number(textBoxMoneyIn.oldValue))  
  {
    moneyIn.value = (Number(textBoxMoneyIn.oldValue)).toFixed(2);
    updatePurchaseMessage("Use the Return Money button to retrieve your money.", 'blue');
    return;
  }

  if (textBoxMoneyIn.value != "" && textBoxMoneyIn.value < 0)   //no negative values
  {
    moneyIn.value = (Number(textBoxMoneyIn.oldValue)).toFixed(2);
    return;
  }

  if (textBoxMoneyIn.oldValue == "" || textBoxMoneyIn.oldValue == 0)  //assume its a new customer - so clear any purchase history from previous customer 
  {
    clearPurchaseHistory();
  }

  moneyIn.value = (Number(textBoxMoneyIn.value)).toFixed(2); 

  if (textBoxMoneyIn.value != "" && Number(textBoxMoneyIn.value) > 0)
  {
    setSaleInProgress(true);
  }
}

function showProductNameSelected(value)
{
  productNameToBuy.innerHTML = "";

  if (value.trim() == "")
  {
    return;
  }

   products.forEach(item => 
    {
        if (item.id == value.trim())
        {
          productNameToBuy.innerHTML = item.name;
          updatePurchaseMessage("");
          return;
        }
  
    });

}

function updateVendingTable()
{
  const tableBody = document.querySelector('#vendingTable tbody');

  //delete any of the body rows from table - to handle on updating to show changes after purchases
  tableBody.innerHTML = "";

  cheapestProductPriceOfInStockItems = 99999;  //reset - in case the cheapest product that is in stock has changed

  //now add the product data to the table
  products.forEach(item => 
  {
      const row = document.createElement('tr');
      const productIdCell = document.createElement('td');
      const productNameCell = document.createElement('td');
      const priceCell = document.createElement('td');
      const qtyAvailCell = document.createElement('td');

      productIdCell.textContent = item.id;
      productNameCell.textContent = item.name;
      priceCell.textContent = moneyFormatter(item.price); 
      qtyAvailCell.textContent = showSoldOutIfNone(item.qtyAvail);

      row.appendChild(productIdCell);
      row.appendChild(productNameCell);
      row.appendChild(priceCell);
      row.appendChild(qtyAvailCell);

      tableBody.appendChild(row);

      if (item.price < cheapestProductPriceOfInStockItems  && item.qtyAvail > 0)
      {
        cheapestProductPriceOfInStockItems = item.price;
      }
  });
}

function submitPurchase() 
{
  //reduce product's qty avail - but only if enough moneyIn  and if not already sold out
  for (var i = 0; i < products.length; i++) 
  {
    if (moneyIn.value == "" || moneyIn.value == 0)
    {
      updatePurchaseMessage("Please put some money in.", 'blue');
      clearPurchaseHistoryAfterAWhile();
      moneyInGiveFocus();
      return;
    }
    else if (moneyIn.value < cheapestProductPriceOfInStockItems && productIdToBuy.value == "")
    {
      updatePurchaseMessage("Please put some more money in. You have not added enough funds to purchase an in stock item.", 'blue');
      moneyInGiveFocus();
      return;
    }

    if (productIdToBuy.value == "")
    {
      updatePurchaseMessage("Please select a product.", 'blue');
      productIdToBuy.focus();
      return;
    }

    if (products[i]['id'] == productIdToBuy.value) 
    {
      if (products[i]['qtyAvail'] <= 0 )
      {
        updatePurchaseMessage("Sorry - we've sold out of " + products[i]['name'] + "s.", 'red');
        productIdToBuy.focus();
        return;
      }
       var thisProductsPrice = products[i]['price'];
    
       if (thisProductsPrice > moneyIn.value)
       {
          updatePurchaseMessage("Not enough funds.", 'red');
          moneyInGiveFocus();
          return;
       }

       products[i]['qtyAvail'] --;
       updateListOfPurchasesByThisCustomer(products[i]['name'])
       updateVendingTable();

       var giveFocusToMoneyIn = false;

       if (thisProductsPrice == moneyIn.value )    
       {
          updatePurchaseMessage("Thank you - exact money received.  Enjoy your snack" + (productListPurchasedByThisCustomer.length > 1 ? "s" : "") + "!", 'green');
          clearPurchaseHistoryAfterAWhile();
          clearProductToBuyDisplays();
          giveFocusToMoneyIn = true;
       }
       else if (thisProductsPrice < moneyIn.value  && moneyIn.value - thisProductsPrice >= cheapestProductPriceOfInStockItems )  //sufficient funds to purchase another in stock product
       {
          updatePurchaseMessage("Thank you! You have enough funds to purchase another stocked product.", 'green');
          clearProductToBuyDisplays();
          productIdToBuy.focus();
       }
       else if (thisProductsPrice < moneyIn.value  && moneyIn.value - thisProductsPrice < cheapestProductPriceOfInStockItems )   //insufficient funds to purchase another in stock product
       {
          updatePurchaseMessage("Thank you! Please add more funds to buy another stocked product, or use the Return Money button to get your change.", 'green');
          clearProductToBuyDisplays(); 
          giveFocusToMoneyIn = true;
       }

       moneyIn.value = (moneyIn.value - thisProductsPrice).toFixed(2);

       if (giveFocusToMoneyIn)
       {
          moneyInGiveFocus();
       }
       
       return;
    }

    updatePurchaseMessage("Product could not be found.", 'red');
    productIdToBuy.focus();
  }

}

function returnMoney()
{
  if (moneyIn.value > 0)
  {
    updatePurchaseMessage("Here's your funds of $" + moneyIn.value + ". Enjoy the rest of your day!", 'green');
    moneyIn.value = 0;
    moneyInGiveFocus(); 
  }
  else
  {
    updatePurchaseMessage("No money to return.", 'blue');
    moneyInGiveFocus(); 
  }

  clearPurchaseHistoryAfterAWhile();

  clearProductToBuyDisplays();
}

function showSoldOutIfNone (value)
{
  if (value <= 0)
  {
    return '*Sold Out*';
  }
 
  return value;
} 

function moneyFormatter (value)
{
  return '$' + value.toFixed(2);
} 

function clearProductToBuyDisplays()
{
  productIdToBuy.value = "";
  productNameToBuy.innerHTML = "";
}

function moneyInGiveFocus()
{ 
  moneyIn.select();
  moneyIn.focus(); 
}

function updatePurchaseMessage(msg, colour)
{
  purchaseMessage.innerHTML = msg;

  if (colour != null)
  {
    purchaseMessage.style.color = colour;
  }
  else
  {
    purchaseMessage.style.color = 'black';
  }
}

function updateListOfPurchasesByThisCustomer(lastestPurchase)
{
  if (lastestPurchase != "")
  {
    purchaseListHeading.innerHTML = "Your Purchases";

    productListPurchasedByThisCustomer.push(lastestPurchase);

    purchaseList.innerHTML += "<li>" + lastestPurchase + "</li>";
  }
}

function clearPurchaseHistory()
{
  productListPurchasedByThisCustomer = [];  

  purchaseListHeading.innerHTML = "";
  purchaseList.innerHTML = "";

  updatePurchaseMessage("");
}

var timerAlreadyStarted = false;   //eg: prevent spam button clicking causing a bunch of random messages to screen
function  clearPurchaseHistoryAfterAWhile()
{
  setSaleInProgress(false);

  if (timerAlreadyStarted)
  {
     return;
  }
  timerAlreadyStarted = true;

  setTimeout(() => 
  {
    //clear history, but abandon if already started another sale
    if (!saleInProgress)
    {
       clearPurchaseHistory();
       updatePurchaseMessage(getRandomWelcomeMessage(), 'purple');
       
    }
    timerAlreadyStarted = false;
  }, 9000);
} 

function getRandomWelcomeMessage()
{
  const message = ["Feeling famished?", "What snack takes your fancy?", "Feeling peckish?", "After a delicious snack?", "A little hungry?", 'hmm, what do you feel like?'];

  const random = Math.floor(Math.random() * message.length);

  return "Welcome... " + message[random];

}

//initial setup
updatePurchaseMessage(getRandomWelcomeMessage(), 'purple');
updateVendingTable();
moneyIn.focus(); 


