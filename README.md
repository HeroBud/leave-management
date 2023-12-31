<h1>Prototype Leave Management Application</h1>

<h3>Overview</h3>
<li>This prototype of a leave management system, lists leave requests for employees.</li>
<li>It shows the Start and End date of the employees leave, the status (whether pending/approved/denied/cancelled), reason for the leave, and the type of leave</li>  
<li>It also shows the days of leave (with the limitation that it doesn't take into consideration weekends/public holidays that may not be considered part of actual leave).</li>
<li>The list can be sorted asc/desc by click a column heading.</li>
<li>Various search filtering is available, eg: by employee with leave that falls within a certain date range.</li>
<li>Leave requests can also be added or edited</li>

<h3>Some Basic Business Rules</h3>
<li>A successful save of a new/edited request returns to the Home page (Leave List)</li>
<li>An unsuccessful save attempt shows helpful message to user</li>
<li>Unsuccessful save attempts will occur if fields aren't populated; the start/end leave dates are invalid or overlap with another existing leave request for that employee;  the end date is before the start; the number of days leave is 0</li>
<li>The Add/Edit Request page has a cancel option that will abandon changes and return the user to the Home page</li>
<li>Reason field is limited to 50 chars</li>
<li>The number of days leave displayed shows to 2 decimal places with floor rounding - ie:  4.376  will become 4.37</li>

<h3>Additional Features</h3>
<li>Leave records are given a status - initially being set to Pending</li>
<li>Max Number of Records retrieved can be varied by the user, but defaults to small number to start with, to reduce data retrieval overheads</li>
<li>The records are retrieved in descending order (based on the unique id)</li>
<li>Searching - 'automatically' occurs after a short delay in user activity, ie: Search Filters changes are handled with a timeout feature ie: after a change/keyup, after there is 1.5 second delay of no user activity before the retrieval occurs - in order to wait for user to finish type and to avoid unnecessary system overhead on data retrieval </li>
<li>A similar timeout is in place for when the Max Records Number is changed</li>
<li>Filtering by date/time ranges can be by using the Start / End input fields, as well using the alternate Search Filter - where eg: a user could enter the value 2023 that is found in 'Start of Leave' values to return all the leave that has a start date in 2023 </li>

<h3>Technical Spec</h3> 
The front-end consists of an index.html (list of leave requests) and leave-request.html (adding/editing a leave request).  A css file is used, and a utils file (particularly for datetime functions), and a data file. The data file contains data that in a real system would be housed in an actual database.  It contains data that is used to populate drop downs, eg: approx 10 dummy employee names, Leave Types and Status Types. It also contains some initial request data records.  These request records are then stored to local storage on the first time the app is run, and any adds/edits in turn update to the local storage.  (Note: at the bottom of the index.js file there is commented out code, that can be uncommented to clear the local storage and return to the default start up dataset).   
    
<h3>Testing</h3>
Testing has been conducted on Microsoft Edge. Testing has been a mix of structured and adhoc (with or without preconditions). It also included Load Testing of 10000+ records.  (This load testing can be activated by uncommenting two lines of code at the end of hte index.js file). Other testing included (but not limited to):
<li>Meeting the basic requirements and common workflow scenarios - add/edit a request; sorting; filtering</li> 
<li>Obvious pathways - eg: testing each pathway that leads to a message displayed to the user; and then that the message displayed is relevant, accurate, correct spelling/grammar and user-friendly, and shows correct highlighting of the message type eg: warnings are red, infos are blue</li>
<li>Data entry validation / user-friendliness / error handling - eg: no negative values allowed (in this app); hints when hover over fields/controls that would benefit from additional explanation; there is consistency (familiarity for users' experience) of layout/fonts/message wording/phrasing style/etc throughout the app; messages to screen follow an app wide consistency for immediately highligting to user whether they are a warning, info, - in this app simply done using colours red/blue; </li>
<li>Calculations and Sorting are accurate - Days of Leave - correctly uses floor rounding to 2 decimal places; Dates show with times in AM/PM format for user friendliness (rather than 24 hour), and when sort dates they are correctly ordered </li> 
<li>More complex and uncommon scenario testing - eg: all the scenarios where the date range for an employee could overlap with an existing employee request; or eg: change sort order, then click Edit and correct record is retrieved into the edit page; or eg: leave time is less than 15 minutes - this will return a Leave Days of 0 - so should give a friendly message to user that a minimum of 15 minutes leave is required  </li>
<li> Key Stroke/Mouse combinations - not just the common ways, but also test less common/unusual key strokes/mouse combinations to navigate around the page - eg just using tab and enter - no mouse</li>
<li>Front end - Check for any Console exceptions (F12)</li>
<li>Continuity - eg: What happens after an new request is added - it should show up the top of the list and be subsequently editable.</li>
<li>Other user-friendly tests: eg: messages that may be singular or plural depending on numeric quantities - altered to read correctly - eg: showing '1 record found'  as opposed to poor grammar of '1 records found'
</li>
<li>Stress Test - eg: Load Testing as outlined above; </li>
</ul>

<h3>Limitations/Assumptions/Known Issues/Improvements</h3>
<li>Inital dataset is hardcoded into js file and then subsequently stored to local storage - various issues: security, usability limitations, lack of primary key uniqueness handling, not multi-user...</li>
<li>Although validity of user data entry checking is thorough and the messages are user-friendly, it doesn't make use of element features such as 'required', similarly its not utilising HTML5</li> 
<li>System dates are assumed to be set to AU format - would need to adjust to cater for regions not using a DD-MM-YYYY format</li>
<li>Days of Leave - if less than 15 minutes, wont register as a leave amount - due to the floor rounding method used - currently handled by giving user a friendly message</li>
<li>Days of Leave  - doesn't take into consideration whether weekends/public holidays should be excluded from count</li>
<li>Extend: Where the date checks for overlaps for an employee, it should exclude existing records that are in a cancelled/denied state.</li>
<li>Extend Search facility: eg: search by exact Request#</li>
<li>Consider replacing the 'Edit' button that shows on each row with a double click feature?</li>
<li>Add an extra field of Status Reason - eg: when status set to Denied - require user populate with a reason why the leave was Denied?</li>
<li>Audit tracking and reporting - eg: who created the request? who editted/approved/denied the request? and when?</li>
 <li>Pretty it up - with images and glyphicons etc</li>
 <li>...</li>
#   l e a v e - m a n a g e m e n t   -   l a s t   u p d a t e d   2 0 2 3 1 1 0 7   1 : 1 9 p m    
 