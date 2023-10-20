export const staffMembers = [null, "X1", "X2", "X3", "X4", "X5", "X6", "X7"];
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const tableHeaders = {
  loadTable: {
    items: ["Staff Member", "Total"],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  scheduleTable: {
    items: ["Time Slot"],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
};

export const loadTableData = staffMembers.map((staffMember) => {
  const row = { StaffMember: staffMember };
  tableHeaders.loadTable.days.forEach((day) => {
    row[day] = "";
  });
  row.Total = "";

  return row;
});

export const scheduleTableData = [
  "Morning UpStairs",
  "Morning Down Stairs",
  "Morning Parking Lot",
  "LunchA",
  "LunchB",
  "LunchC",
  "LunchD",
  "Afternoon Up Stairs",
  "Afternoon Down Stairs",
  "Afternoon Parking Lot",
];

export const handleCalculateConflict = (staffObject) => {
  for (const key in staffObject) {
    if (Object.hasOwnProperty.call(staffObject, key)) {
      const test1 = Object.values(staffObject[key]);

      console.log("zzzz", test1);
    }
  }
};

export const groupObjectsByDay = (data) => {
  const groupedData = {};

  for (const item of data) {
    const { day } = item;
    if (!groupedData[day]) {
      groupedData[day] = [];
    }
    groupedData[day].push(item);
  }

  return groupedData;
};

export const hasLunchWithSameValue = (data) => {
  // Create an object to keep track of unique "employeeName" values that have "Lunch" in their "index"
  let lunchSchedule = {};
  let normalSchedule = [];
  console.log({ data });
  for (const item of data) {
    if (item.index.includes("Lunch")) {
      if (lunchSchedule[item.employeeName] === item.day) {
        alert(`${item.employeeName} employee must have only 1 lunch`);
        return;
      } else {
        lunchSchedule = { ...lunchSchedule, [item.employeeName]: item.day };
      }
    } else {
      normalSchedule = [...normalSchedule, { [item.day]: item.employeeName }];
    }
    console.log({ normalSchedule });
    console.log({ lunchSchedule });
  }
  return false; // No match found
};

//old
export const checkForMultipleLunch = (staffObject, employeeName) => {
  // Initialize an object to store lunch counts for each day
  const lunchCounts = {};

  // Loop through each day in the schedule
  for (const day in staffObject) {
    // Initialize lunch count for the current day
    let lunchCount = 0;

    // Loop through the objects in the day's array
    for (const entry of staffObject[day]) {
      // Check if any property (key) in the object has the value "Lunch"
      for (const key in entry) {
        if (entry[key].includes("Lunch")) {
          lunchCount++;
        }
      }
    }

    // Store the lunch count for the current day
    lunchCounts[day] = lunchCount;

    // Check if lunch count is greater than 1
    if (lunchCount > 1) {
      alert(`Alert: Multiple lunches found for ${day}`);
      break;
    }
  }
};

export const dropdownOptions = staffMembers;
