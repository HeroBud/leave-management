//initial dummy leave request data
const dataLeaveRequests = [
  {
    id: 1,
    employee_name: 'Patricia McQuinn',
    start_date: '2023-09-23T09:00:00',
    end_date: '2023-09-30T09:00:00',
    type: 'Personal',
    reason: 'Time visting interstate parent',
    status: 'Approved'
  },
  {
    id: 2,
    employee_name: 'Aaron Willow',
    start_date: '2023-10-10T14:00:00',
    end_date: '2023-10-20T08:00:00',
    type: 'Bereavement',
    reason: 'Relative passed',
    status: 'Approved'
  },
  {
    id: 3,
    employee_name: 'Xavier Johnson',
    start_date: '2023-10-24T08:30:00',
    end_date: '2023-10-29T08:30:00',
    type: 'Personal',
    reason: 'Unknown',
    status: 'Denied'
  },
  {
    id: 4,
    employee_name: 'Bill Daron',
    start_date: '2023-10-25T08:00',
    end_date: '2023-10-26T08:00',
    type: 'Sick',
    reason: 'Virus',
    status: 'Approved'
  },
  {
    id: 5,
    employee_name: 'Xavier Johnson',
    start_date: '2023-10-25T13:00',
    end_date: '2023-10-26T14:30',
    type: 'Sick',
    reason: 'Unwell, went home early, came late next day',
    status: 'Approved'
  },
  {
    id: 6,
    employee_name: 'Jackie Jones',
    start_date: '2023-11-25T09:00:00',
    end_date: '2023-12-01T14:00:00',
    type: 'Vacation',
    reason: 'Holiday',
    status: 'Pending'
  },
  {
    id: 7,
    employee_name: 'Bill Daron',
    start_date: '2023-11-01T08:00:00',
    end_date: '2023-11-05T08:00:00',
    type: 'Sick',
    reason: 'Covid',
    status: 'Approved'
  },
 
  {
    id: 8,
    employee_name: 'Patrick Lloyd',
    start_date: '2023-11-20T08:30:00',
    end_date: '2024-01-03T08:30:00',
    type: 'Personal',
    reason: 'Annual Leave',
    status: 'Approved'
  },
  {
    id: 9,
    employee_name: 'William Jones',
    start_date: '2023-12-20T07:00:00',
    end_date: '2024-01-05T07:00:00',
    type: 'Personal',
    reason: 'Annual Leave',
    status: 'Pending'
  },
  {
    id: 10,
    employee_name: 'Bill Daron',
    start_date: '2023-12-04T08:30:00',
    end_date: '2023-12-04T13:30:00',
    type: 'Sick',
    reason: 'Appointment',
    status: 'Approved'
  },
  {
    id: 11,
    employee_name: 'Bill Daron',
    start_date: '2023-12-23T08:30:00',
    end_date: '2023-12-27T08:30:00',
    type: 'Personal',
    reason: 'Festivities',
    status: 'Cancelled'
  },
  {
    id: 12,
    employee_name: 'Bill Daron',
    start_date: '2023-12-30T08:30:00',
    end_date: '2024-01-02T13:30:00',
    type: 'Personal',
    reason: 'New Year Festivities',
    status: 'Approved'
  },
];

const dataEmployee =
[
  "Aaron Willow", 
  "Bill Daron", 
  "Chloe Chesterfield", 
  "Hunter Thompson", 
  "Jackie Jones", 
  'Jane Smith', 
  'Janet Wilson',
  'Michael Mitchelson',
  'Patricia McQuinn',
  'Patrick Lloyd',
  'William Jones',
  'William Millan',
  'Xavier Johnson'
];

const dataLeaveType = 
[
  "Personal", 
  "Sick", 
  "Vacation", 
  "Bereavement"
];

const dataLeaveStatus = 
[
  "Approved", 
  "Cancelled", 
  "Denied", 
  "Pending"
];
