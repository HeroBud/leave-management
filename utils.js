function getDatePartOfDateTimeString(datetimeString)  //eg: '2023-12-05T12:01:07'
{
  return datetimeString.split('T')[0];
}

function getTimePartOfDateTimeString(datetimeString)  //eg: '2023-12-05T12:01:07'
{
  return new Date(datetimeString).toLocaleTimeString([], {hour12: false});
}

function getDateTime(date,time)
{
    const datetimeString = getDateTimeAsString(date,time);

    if (datetimeString == null)
    {
      return null;
    }

    return new Date(datetimeString);
}

function getDateTimeAsString(date,time)
{
  if (date == null || date == "" || time == null || time == "")
    {
      return null;
    }

    const datetimeString = date + 'T' + time;
    return datetimeString;
}

function formatDateTimeAsDDMMYYYYHHMM(datetimeString) //eg: '2023-12-05T14:01:07' to '05-12-2023 02:01 PM'
{
  const date = new Date(datetimeString);

  if (isNaN(date.getTime())) 
  {
    return '';
  }

  //returning time with AM/PM suffix
  return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${(date.getHours() % 12 || 12).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${(date.getHours() >= 12 ? 'PM' : 'AM')}`;

  //returning in 24 hour time
  //return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function formatDDMMYYYYHHMMasYYYYMMDDTHHMM(datetimeString) //eg: convert '05-12-2023 02:01 PM' to '2023-12-05T14:01'
{
  var dateParts = datetimeString.split(' ');
  var date = dateParts[0].split('-');
  var time = dateParts[1];  //02:01

  //time received in AM/PM format so will need to convert to 24 hour time
  var amORpm = dateParts[2]; 
  var timeAsDate = new Date('1900-01-01 ' + time + " " + amORpm);  // do this so can extract in 24 Hours format
  return date[2] + '-' + date[1] + '-' + date[0]  + 'T' + timeAsDate.getHours().toString().padStart(2, '0') + ":" + timeAsDate.getMinutes().toString().padStart(2, '0');

  //if received in 24 hour time
  //return date[2] + '-' + date[1] + '-' + date[0]  + 'T' + time;
 }


 function getLeaveDays(startOfLeave, endOfLeave)
{
  //NOTE: this needs to be extended to take into consideration excluding weekends where employee works a standard Mon-Fri week
  //      plus public holidays...
  
  if (new Date(endOfLeave) <= new Date(startOfLeave))  //not a valid date range
  {
     return 0;
  }

  const diffTime = Math.abs(new Date(endOfLeave) - new Date(startOfLeave));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24) * 100) / 100;   //eg: 4.376 will become 4.37
  
  if (isNaN(diffDays))
  {
    return 0;
  }

  return diffDays;
}


function getLeaveDaysWithDaySuffix(startOfLeave, endOfLeave)
{
  days = getLeaveDays(startOfLeave, endOfLeave)

  if (days <= 0)
  {
    return '';
  }
  else if (days == 1)
  {
    return "1 Day of Leave";
  }
  else
  {
    return days + " Days of Leave";
  }
}