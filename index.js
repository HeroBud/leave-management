
function refreshLeaveRequestsTable(filterBy, filterValue)
{
  updateLeaveListWarningMessage("","");
  var rowCount = 0;

  let localStorageLeaveRequests = JSON.parse(localStorage.getItem("leaveRequestsDataSet"));

  if (localStorageLeaveRequests == null || localStorageLeaveRequests.length == 0)
  {
    //just use starter data (dataLeaveRequests) and store this locally for next time
    localStorage.setItem("leaveRequestsDataSet", JSON.stringify(dataLeaveRequests));
    localStorageLeaveRequests = dataLeaveRequests;
  }

  const tableBody = document.querySelector('#leaveRequestsTable tbody');

  //delete any of the body rows from table - to handle on updating to show changes
  tableBody.innerHTML = "";

  //see if specific date/time filtering provided
  var filterStartDateTime = getDateTime(filterStartDate.value, filterStartTime.value);
  var filterEndDateTime = getDateTime(filterEndDate.value, filterEndTime.value);

  //now add the leave requests data to the table - but only those that match the filter if filtering provided
  for (var i=localStorageLeaveRequests.length-1; i >= 0; i--)  //we'll retrieve in desc order so most recent created to the top
  {
      if (rowCount >= maxRecordsToRetrieve.value)
      {
        break;
      }

      var item = localStorageLeaveRequests[i];

      //filter out any that have start date earlier than filter start date
      if (filterStartDateTime != null)
      {
        if (getDateTime(getDatePartOfDateTimeString(item.start_date), getTimePartOfDateTimeString(item.start_date)) < filterStartDateTime)
        {
          continue;
        }
      }

       //filter out any that have end date later than filter end date
      if (filterEndDateTime != null)
      {
        if (getDateTime(getDatePartOfDateTimeString(item.end_date), getTimePartOfDateTimeString(item.end_date)) > filterEndDateTime)
        {
          continue;
        }
      }

      //also filter out by the Quick Search Filter  (which can also do filtering by start/end date eg: if the Quick Search Filter is set to look for '2024' in item.start_date)  
      if (filterBy != null && filterBy.length > 0  && filterValue != null && filterValue.trim().length > 0)
      {
        switch (filterBy) 
        {
          case "RequestIdNbr":
            if (!item.id.toString().includes(filterValue.trim().toUpperCase()))
            {
              continue;
            }
            break;
          case "EmployeeName":
            if (!item.employee_name.toUpperCase().includes(filterValue.trim().toUpperCase()))
            {
              continue;
            }
            break;
          case "StartOfLeave":
            if (!formatDateTimeAsDDMMYYYYHHMM(item.start_date).includes(filterValue.trim()))
            {
              continue;
            }
            break;
          case "EndOfLeave":
            if (!formatDateTimeAsDDMMYYYYHHMM(item.end_date).includes(filterValue.trim()))
            {
              continue;
            }
            break;
          case "LeaveType":
            if (!item.type.toUpperCase().includes(filterValue.trim().toUpperCase()))
            {
              continue;
            }
            break;
          case "LeaveReason":
            if (!item.reason.toUpperCase().includes(filterValue.trim().toUpperCase()))
            {
              continue;
            }
            break;
          case "LeaveStatus":
            if (!item.status.toUpperCase().includes(filterValue.trim().toUpperCase()))
            {
              continue;
            }
            break;
          default:
            break;
        }
          
      }
    
      //ok to add this item
      rowCount++;
      const row = document.createElement('tr');
      const requestIdCell = document.createElement('td');
      const employeeNameCell = document.createElement('td');
      const startDateCell = document.createElement('td');
      const endDateCell = document.createElement('td');
      const daysCell = document.createElement('td');
      const typeCell = document.createElement('td');
      const reasonCell = document.createElement('td');
      reasonCell.classList.add('column-wide-class');
      const statusCell = document.createElement('td');

      requestIdCell.textContent = item.id;
      employeeNameCell.textContent = item.employee_name;
      startDateCell.textContent = formatDateTimeAsDDMMYYYYHHMM(item.start_date);
      endDateCell.textContent = formatDateTimeAsDDMMYYYYHHMM(item.end_date);
      daysCell.textContent = getLeaveDays(item.start_date, item.end_date); 
      typeCell.textContent = item.type;
      reasonCell.textContent = item.reason;  
      statusCell.textContent = item.status;

      requestIdCell.setAttribute("name", "requestID"); 
      row.appendChild(requestIdCell);     
      row.appendChild(employeeNameCell);
      row.appendChild(startDateCell);
      row.appendChild(endDateCell);
      row.appendChild(daysCell);
      row.appendChild(typeCell);
      row.appendChild(reasonCell);
      row.appendChild(statusCell);

      var viewDetailsBtn = document.createElement('button');
      viewDetailsBtn.innerText="Edit";
      viewDetailsBtn.onclick = function () 
      {
        window.location.href = "leave-request.html?id=" + leaveRequestsTable.rows[this.parentNode.rowIndex].cells["requestID"].innerHTML;
      };
      document.body.appendChild(viewDetailsBtn);
      row.appendChild(viewDetailsBtn)

      tableBody.appendChild(row);
  };

  if (rowCount  == 0)
  {
    var filterStart = getDateTime(filterStartDate.value, filterStartTime.value) ;
    var filterEnd = getDateTime(filterEndDate.value, filterEndTime.value);
    if (filterStart != null && filterEnd != null  &&  filterStart > filterEnd )
    {
      updateLeaveListWarningMessage("The Start Date filter cannot be later than the End Date.","red");
    }
    else
    {
      updateLeaveListWarningMessage("No matches found","blue");
    }

  }
  else if (rowCount == 1)
  {
    updateLeaveListWarningMessage("1 record found","blue");
  }
  else 
  {
    if (rowCount < maxRecordsToRetrieve.value)  // we found all possible matches
    {
      updateLeaveListWarningMessage(rowCount + " records found","blue");
    }
    else
    {
      updateLeaveListWarningMessage("Use the filtering to refine your search, or increase the maximum records that can be retrieved to view more than " + rowCount + " records.","blue");
    }
  }
}


function sortTable(n, fieldType) 
{
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementsByTagName("table")[0];
  switching = true;
  dir = "asc";
  while (switching) 
  {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) 
    {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (dir == "asc") 
      {
        if (fieldType == 'datetime')
        {
          if (new Date(formatDDMMYYYYHHMMasYYYYMMDDTHHMM(x.innerHTML)) > new Date(formatDDMMYYYYHHMMasYYYYMMDDTHHMM(y.innerHTML))) 
          {
            shouldSwitch = true;
            break;
          }
        }
        else if (fieldType == 'number')
        {
          if (Number(x.innerHTML) > Number(y.innerHTML)) 
          {
            shouldSwitch = true;
            break;
          }
        }
        else
        {
          if (x.innerHTML.trim().toLowerCase() > y.innerHTML.trim().toLowerCase()) 
          {
            shouldSwitch = true;
            break;
          }
        }
      } 
      else if (dir == "desc")
      {
        if (fieldType == 'datetime')
        {
          if (new Date(formatDDMMYYYYHHMMasYYYYMMDDTHHMM(x.innerHTML)) < new Date(formatDDMMYYYYHHMMasYYYYMMDDTHHMM(y.innerHTML))) 
          {
            shouldSwitch = true;
            break;
          }
        }
        else if (fieldType == 'number')
        {
          if (Number(x.innerHTML) < Number(y.innerHTML)) 
          {
            shouldSwitch = true;
            break;
          }
        }
        else
        {
          if (x.innerHTML.trim().toLowerCase() < y.innerHTML.trim().toLowerCase()) 
          {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") 
      {
        dir = "desc";
        switching = true;
      }
    }
  }
}


var quickFilterTimeout;
var quickFilterDelay = 1500;  // 1 & 1/2 secs  - reduce potentially unecessary hits to db with a delay that allows a pause in typing
//
function handleFilterInput()
{
  if (quickFilterTimeout)
  {
    clearTimeout(quickFilterTimeout);
  }

  quickFilterTimeout = setTimeout(function ()
  {
    filterRequestsList();
  }, quickFilterDelay);
}

function changeFilterFieldDropDown()
{
  filterRequestsList()
}

var filterStartTimeout;
var filterStartDelay = 1000;  // 1 sec  - reduce hits to db with a delay
//
function changeFilterStartDateTime()
{
  if (filterStartTimeout)
  {
    clearTimeout(filterStartTimeout);
  }

  filterStartTimeout = setTimeout(function ()
  {
     filterRequestsListWithStartDateFilterChange();
  }, filterStartDelay);
}


var filterEndTimeout;
var filterEndDelay = 1000;  // 1 sec  - reduce hits to db with a delay
//
function changeFilterEndDateTime()
{
  if (filterEndTimeout)
  {
    clearTimeout(filterEndTimeout);
  }

  filterEndTimeout = setTimeout(function ()
  {
     filterRequestsListWithEndDateFilterChange();
  }, filterEndDelay);
}

var changeMaxRecordsTimeout;
var changeMaxRecordsDelay = 1000;  // 1 sec  - reduce hits to db with a delay
function changeMaxRecords()
{
  if (changeMaxRecordsTimeout)
  {
    clearTimeout(changeMaxRecordsTimeout);
  }

  changeMaxRecordsTimeout = setTimeout(function ()
  {
    filterRequestsList()
  }, changeMaxRecordsDelay);
}


function filterRequestsList()
{
   if (filterInput.value == null || filterInput.value.trim().length == 0) 
   {
      refreshLeaveRequestsTable(null, null);
   }
   else if (filterByDropdown.value != null)
    {
      refreshLeaveRequestsTable(filterByDropdown.value, filterInput.value);
    }

};

function filterRequestsListWithStartDateFilterChange()
{
  if (filterStartDate.value == "")  //eg: clicked the Clear date button in calendar popup
  {
    filterRequestsList()
  }
  else
  {
    if (filterStartDate.value != "" && filterStartTime.value == "")
    {
      filterStartTime.value = "00:00";
    }

    if (getDateTime(filterStartDate.value, filterStartTime.value) != null)
    {
      filterRequestsList()
    }
  }
}

function filterRequestsListWithEndDateFilterChange()
{
  if (filterEndDate.value == "")  //eg: clicked the Clear date button in calendar popup
  {
    filterRequestsList()
  }
  else
  {
    if (filterEndDate.value != "" && filterEndTime.value == "")
    {
      filterEndTime.value = "00:00";
    }

    if (getDateTime(filterEndDate.value, filterEndTime.value) != null)
    {
      filterRequestsList()
    }
  }
}

function updateLeaveListWarningMessage(msg, colour)
{
  leaveListWarningMessage.innerHTML = msg;

  if (colour != null)
  {
    leaveListWarningMessage.style.color = colour;
  }
  else
  {
    leaveListWarningMessage.style.color = 'black';
  }
}

//load testing
function randomGenerateRequestRecords(qty)
{

  let localStorageLeaveRequests = JSON.parse(localStorage.getItem("leaveRequestsDataSet"));

  if (qty > 10000 || localStorageLeaveRequests.length > 15000)  //local storage has quota limits - 25000 is enough for prototyping
  {
    console.log('Local Storage contains ' + localStorageLeaveRequests.length + ' records - no more will be added for prototype.')
    return; 
  }

  //Get Current Max Id - this is not ideal - in a real situation data would be in db with primary key indexing for speedy retrieval and to prevent duplicates
  var currentMaxId = 0;
  if (localStorageLeaveRequests != null)
  {
    localStorageLeaveRequests.forEach(item => 
    {
      if (Number(item.id) > Number(currentMaxId))
      {
        currentMaxId = item.id;
      }
    });
  }

  var newId = currentMaxId;

  for (var i=0; i < qty; i++)
  {
    newId++;
    const randomEmpNbr = Math.floor(Math.random() * dataEmployee.length);
    const randomLeaveTypeNbr = Math.floor(Math.random() * dataLeaveType.length);
    const randomLeaveStatusNbr = Math.floor(Math.random() * dataLeaveStatus.length);

    const dataSetReason = ["Annual Leave", "Reason abc", "A reason xyz", "No reason given", "Unknown"];
    const randomReasonNbr = Math.floor(Math.random() * dataSetReason.length);

    //NOTE: seeing as this is for 'load testing' don't worry about overlapping dates with other records
    const dataSetStartDate = ['2023-11-19T11:00','2023-11-25T08:30', '2023-11-28T14:00', '2023-12-01T08:00', '2023-12-02T09:00', '2023-12-04T13:00', '2023-12-07T16:00','2023-12-07T23:59'];
    const randomStartDateNbr = Math.floor(Math.random() * dataSetStartDate.length);
    const dataSetEndDate = ['2023-12-10T07:00','2023-12-11T08:00', '2023-12-14T09:00', '2023-12-15T13:00', '2023-12-20T16:00', '2023-12-27T18:00', '2024-01-05T00:00', '2024-01-21T00:00', '2024-02-17T00:00'];
    const randomEndDateNbr = Math.floor(Math.random() * dataSetEndDate.length);

    const newRequest = {
      id: newId,
      employee_name: dataEmployee[randomEmpNbr],
      start_date: dataSetStartDate[randomStartDateNbr],
      end_date: dataSetEndDate[randomEndDateNbr],
      type: dataLeaveType[randomLeaveTypeNbr],
      reason: dataSetReason[randomReasonNbr],
      status: dataLeaveStatus[randomLeaveStatusNbr]
     };

     localStorageLeaveRequests.push(newRequest);
    }

  localStorage.setItem("leaveRequestsDataSet", JSON.stringify(localStorageLeaveRequests));

}

//clear to refresh to initial data   -- UNCOMMENT THIS TO RESET DATA  - but remember to comment it back out after - so that add/edits are refreshed to Leave List!
//localStorage.clear();

//initial setup
refreshLeaveRequestsTable();

//load testing
//randomGenerateRequestRecords(1000); //(10000); //-- UNCOMMENT THIS TO LOAD TEST
//refreshLeaveRequestsTable();                   //-- UNCOMMENT THIS TO LOAD TEST





