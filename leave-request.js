//populate Dropdowns
loadDataEmployeeNames();
loadDataLeaveType();
loadDataLeaveStatus();


const urlParams = new URLSearchParams(window.location.search);
const requestId = urlParams.get('id');
if (requestId == null)
{
  leaveRequestTitle.innerHTML = "New Leave Request";
  leaveRequestHeading.innerHTML = "New Leave Request";
  submitLeaveRequestBtn.innerHTML = 'Add Request';
  leaveStatusLabel.style.display = "none";
  leaveStatus.style.display = "none";
}
else
{
  leaveRequestTitle.innerHTML = "Edit Leave Request (id:" + requestId + ")";
  leaveRequestHeading.innerHTML = "Edit Leave Request";
  submitLeaveRequestBtn.innerHTML = 'Update Request';
  getRequestDetailsToEdit()
}

function submitRequest() 
{
  if (requestId != null && requestId > 0)
  {
    submitEditRequest();
  }
  else
  {
    submitNewRequest();
  }
}


function submitNewRequest() 
{
  if (!IsRequestDataValid())
  {
    return;
  }

  let localStorageLeaveRequests = JSON.parse(localStorage.getItem("leaveRequestsDataSet"));

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
  var newId = currentMaxId + 1;

  const newRequest = {
    id: newId,
    employee_name: employeeName.value,
    start_date: getDateTimeAsString(startDate.value, startTime.value),
    end_date: getDateTimeAsString(endDate.value, endTime.value),
    type: leaveType.value,
    reason: leaveReason.value,
    status: 'Pending'
  };

  localStorageLeaveRequests.push(newRequest);

  localStorage.setItem("leaveRequestsDataSet", JSON.stringify(localStorageLeaveRequests));

  window.location.href = "index.html";
}

function submitEditRequest() 
{
  if (!IsRequestDataValid())
  {
    return;
  }

  let localStorageLeaveRequests = JSON.parse(localStorage.getItem("leaveRequestsDataSet"));

  if (localStorageLeaveRequests != null)
  {
    for (var i=0 ; i < localStorageLeaveRequests.length; i++) 
    {
      if (localStorageLeaveRequests[i].id == requestId)
      {
        localStorageLeaveRequests[i].employee_name = employeeName.value;
        localStorageLeaveRequests[i].start_date = getDateTimeAsString(startDate.value, startTime.value);
        localStorageLeaveRequests[i].end_date = getDateTimeAsString(endDate.value, endTime.value);
        localStorageLeaveRequests[i].type = leaveType.value;
        localStorageLeaveRequests[i].reason = leaveReason.value;
        localStorageLeaveRequests[i].status = leaveStatus.value;

        break;
      }
    }
  }

  localStorage.setItem("leaveRequestsDataSet", JSON.stringify(localStorageLeaveRequests));

  window.location.href = "index.html";
}


function getRequestDetailsToEdit()
{
  let localStorageLeaveRequests = JSON.parse(localStorage.getItem("leaveRequestsDataSet"));

  if (localStorageLeaveRequests == null || localStorageLeaveRequests.length == 0)
  {
    //should never happen 
    updateLeaveRequestWarningMessage('An unexpected error occurred.  Please try again.', 'red');
    return;
  }

  for (var i=0 ; i < localStorageLeaveRequests.length; i++) 
  {

    if (localStorageLeaveRequests[i].id == requestId)
    {
        employeeName.value = localStorageLeaveRequests[i].employee_name;
        startDate.value = getDatePartOfDateTimeString(localStorageLeaveRequests[i].start_date);
        startTime.value = getTimePartOfDateTimeString(localStorageLeaveRequests[i].start_date);
        endDate.value = getDatePartOfDateTimeString(localStorageLeaveRequests[i].end_date);
        endTime.value = getTimePartOfDateTimeString(localStorageLeaveRequests[i].end_date);
        updateLeaveDaysDisplay();
        leaveType.value = localStorageLeaveRequests[i].type;
        leaveReason.value = localStorageLeaveRequests[i].reason;
        leaveStatus.value = localStorageLeaveRequests[i].status;

        break;
    }
        
  }
}

function updateLeaveDaysDisplay()
{
  var start = getDateTime(startDate.value, startTime.value);
  var end = getDateTime(endDate.value, endTime.value);


  leaveDays.innerHTML = getLeaveDaysWithDaySuffix(start, end);
}

function IsRequestDataValid()
{
  if (employeeName.value == null || employeeName.value.length == 0)
  {
    updateLeaveRequestWarningMessage('The employee name is required.', 'red');
    return false;
  }
  else if (getDateTime(startDate.value, startTime.value) == null)
  {
    if (startDate.value == "")
    {
      updateLeaveRequestWarningMessage('A start date is required.', 'red');
    }
    else
    {
      updateLeaveRequestWarningMessage('The start date/time is not valid.', 'red');
    }
    return false;
  }
  else if (getDateTime(startDate.value, startTime.value) <= new Date())
  {
    updateLeaveRequestWarningMessage('The start date cannot be in the past.', 'red');
    return false;
  }
  else if (getDateTime(endDate.value, endTime.value) == null)
  {
    if (endDate.value == "")
    {
      updateLeaveRequestWarningMessage('An end date is required.', 'red');
    }
    else
    {
      updateLeaveRequestWarningMessage('The end date/time is not valid.', 'red');
    }
    return false;
  }
  else if (getDateTime(endDate.value, endTime.value) <=  getDateTime(startDate.value, startTime.value))
  {
    updateLeaveRequestWarningMessage('The end date must be later than the start date.', 'red');
    return false;
  }
  else if (leaveDays.innerHTML == null || leaveDays.innerHTML == "" || leaveDays.innerHTML == "0")  //rarely will get here, with all the earlier checks, but can eg: the enddate is only a minute later than the startdate and with rounding it comes to 0
  {
    var diffInMilliseconds = getDateTime(endDate.value, endTime.value) - getDateTime(startDate.value, startTime.value);
    if ( diffInMilliseconds < 900000 )  //15 minutes is 900000 milliseconds
    {
      updateLeaveRequestWarningMessage('The leave period must be at least 15 minutes.', 'red');
    }
    else
    {
      updateLeaveRequestWarningMessage('The leave period cannot be determined. Check the date/time range.', 'red');
    }
    return false;
  }
  else if (dateRangeOverlapsWithAnotherLeaveRequest(true))
  {
    //updateLeaveRequestWarningMessage('The leave period overlaps with an existing leave request for this employee.', 'red');  -- done in dateRangeOverlapsWithAnotherLeaveRequest so can show clashing dates
    return false;
  }
  else if (leaveType.value == null || leaveType.value.length == 0)
  {
    updateLeaveRequestWarningMessage('A leave type is required.', 'red');
    return false;
  }
  else if (leaveReason.value == null || leaveReason.value.length == 0)
  {
    updateLeaveRequestWarningMessage('A reason is required.', 'red');
    return false;
  }
  else if (requestId != null && requestId > 0  && (leaveStatus.value == null || leaveStatus.value.length == 0))
  {
    updateLeaveRequestWarningMessage('A status is required.', 'red');
    return false;
  }
  

  return true;
}

function dateRangeOverlapsWithAnotherLeaveRequest(showMessage)
{
  let localStorageLeaveRequests = JSON.parse(localStorage.getItem("leaveRequestsDataSet"));

  if (localStorageLeaveRequests == null || localStorageLeaveRequests.length == 0)
  {
    //should never happen 
    return false;
  }

  var haveOverlap = false;

  for (var i=0 ; i < localStorageLeaveRequests.length; i++)
  {     
      if ( (requestId == null || requestId == 0 || localStorageLeaveRequests[i].id != requestId) && (localStorageLeaveRequests[i].employee_name == employeeName.value))
      {
          //check if there is an overlap of time frames

          //TO DO - extend this to allow overlaps for an employee if either match has Status of Denied???

          var theNewOrEditedStartDate = getDateTime(startDate.value, startTime.value);
          var theNewOrEditedEndDate = getDateTime(endDate.value, endTime.value);

          var thisItemStartDate = getDateTime(getDatePartOfDateTimeString(localStorageLeaveRequests[i].start_date), getTimePartOfDateTimeString(localStorageLeaveRequests[i].start_date));
          var thisItemEndDate = getDateTime(getDatePartOfDateTimeString(localStorageLeaveRequests[i].end_date), getTimePartOfDateTimeString(localStorageLeaveRequests[i].end_date));

          //IMP: NEED TO TEST THESE SCENARIOS...
          //   OK:  theNewOrEdited :  1/10/2024 - 4/10/2024 and thisItem : 5/10/2024 - 20/10/2024
          //        thisItem :  1/10/2024 - 4/10/2024 and theNewOrEdited : 5/10/2024 - 20/10/2024  (reverse of above)
          //        theNewOrEdited :  1/11/2024 - 2/11/2024 and thisItem : 5/10/2024 - 20/10/2024         
          //        thisItem :  1/11/2024 - 2/11/2024 and theNewOrEdited : 5/10/2024 - 20/10/2024  (reverse of above)

          //Overlap: theNewOrEdited :  1/10/2024 - 6/10/2024 and thisItem : 5/10/2024 - 20/10/2024
          //         thisItem :  1/10/2024 - 6/10/2024 and theNewOrEdited : 5/10/2024 - 20/10/2024 (reverse of above)
          //         theNewOrEdited :  1/10/2024 - 30/10/2024 and thisItem : 5/10/2024 - 20/10/2024
          //         thisItem :  1/10/2024 - 30/10/2024 and theNewOrEdited : 5/10/2024 - 20/10/2024 (reverse of above)

          //for code logic readability - lets check for the ok ones
          if (theNewOrEditedEndDate <= thisItemStartDate)
          {
            //ok
          }
          else if (thisItemEndDate <= theNewOrEditedStartDate)
          {
            //ok
          }
          else if (theNewOrEditedStartDate >= thisItemEndDate)
          {
            //ok
          }
          else if (thisItemStartDate >= theNewOrEditedEndDate)
          {
            //ok
          }
          else  //everything else is an overlap?
          {
            haveOverlap = true;
            if (showMessage)
            {
              updateLeaveRequestWarningMessage('This leave overlaps with an existing leave request for ' + employeeName.value + ' (Request #' + localStorageLeaveRequests[i].id + ', ' +
                 formatDateTimeAsDDMMYYYYHHMM(localStorageLeaveRequests[i].start_date) + " to " + formatDateTimeAsDDMMYYYYHHMM(localStorageLeaveRequests[i].end_date) + ")." , 'red');
            }
            break;
          } 

/*  refactioring - based on checking the oks -so shouldn't need following code that specifically checks for the overlaps
          else if (theNewOrEditedStartDate <= thisItemStartDate  && theNewOrEditedEndDate >= thisItemStartDate) 
          {
            haveOverlap = true;
            break;
          } 
          else if (thisItemStartDate <= theNewOrEditedStartDate  && thisItemEndDate >= theNewOrEditedStartDate) 
          {
            haveOverlap = true;
            break;
          }
          else if (theNewOrEditedEndDate  <= thisItemEndDate  && thisItemStartDate <= theNewOrEditedEndDate)
          {
            haveOverlap = true;
            break;
          }
          else if (thisItemEndDate  <= theNewOrEditedEndDate  && theNewOrEditedStartDate <= thisItemEndDate)
          {
            haveOverlap = true;
            break;
          }
    */      
      }        
  };

 

  return haveOverlap;
}

function updateLeaveRequestWarningMessage(msg, colour)
{
  leaveRequestWarningMessage.innerHTML = msg;

  if (colour != null)
  {
    leaveRequestWarningMessage.style.color = colour;
  }
  else
  {
    leaveRequestWarningMessage.style.color = 'black';
  }
}


function loadDataEmployeeNames()
{
  for (var i = 0; i < dataEmployee.length; i++) 
  { 
    var option = document.createElement ("option"); 
    option.text = dataEmployee[i]; 
    employeeName.appendChild (option); 
  }
 
}

function loadDataLeaveType()
{
  for (var i = 0; i < dataLeaveType.length; i++) 
  { 
    var option = document.createElement ("option"); 
    option.text = dataLeaveType[i]; 
    leaveType.appendChild (option); 
  }
 
}

function loadDataLeaveStatus()
{
  for (var i = 0; i < dataLeaveStatus.length; i++) 
  { 
    var option = document.createElement ("option"); 
    option.text = dataLeaveStatus[i]; 
    leaveStatus.appendChild (option); 
  }
 
}


