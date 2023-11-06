//initial request data
const dataLeaveRequests = [
  {
    id: 1,
    employee_name: 'Patricia McQuinn',
    start_date: '2023-10-24T09:00:00',
    end_date: '2023-10-30T09:00:00',
    type: 'Personal',
    reason: 'Time visting interstate parent',
    status: 'Approved'
  },
  {
    id: 2,
    employee_name: 'Bill Brown',
    start_date: '2023-12-01T12:01:00',
    end_date: '2023-12-04T23:00:00',
    type: 'Sick',
    reason: 'Covid',
    status: 'Pending'
  },
  {
    id: 3,
    employee_name: 'Jackie Jones',
    start_date: '2023-11-25T09:00:00',
    end_date: '2023-12-01T14:00:00',
    type: 'Vacation',
    reason: 'Holiday',
    status: 'Pending'
  },
  {
    id: 4,
    employee_name: 'Aaron Willow',
    start_date: '2024-01-10T16:00:00',
    end_date: '2024-01-20T17:00:00',
    type: 'Bereavement',
    reason: 'Relative passed',
    status: 'Pending'
  },
  {
    id: 5,
    employee_name: 'Patrick Lloyd',
    start_date: '2023-11-20T08:30:00',
    end_date: '2024-01-03T08:30:00',
    type: 'Personal',
    reason: 'Annual Leave',
    status: 'Approved'
  },
  {
    id: 6,
    employee_name: 'William Jones',
    start_date: '2023-12-20T08:30:00',
    end_date: '2024-01-05T08:30:00',
    type: 'Personal',
    reason: 'Annual Leave',
    status: 'Pending'
  }
];

const dataEmployee =
[
  "Aaron Willow", 
  "Bill Brown", 
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
