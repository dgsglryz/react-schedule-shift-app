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
  let shiftLocations = {};
  let lunchSchedule = {};
  let normalSchedule = {};

  for (const item of data) {
    const { employeeName, day, index } = item;

    if (typeof index === "string" && index.includes("Lunch")) {
      if (lunchSchedule[employeeName] === day) {
        alert(`${employeeName} employee must have only 1 lunch on ${day}`);
        return true;
      } else {
        lunchSchedule[employeeName] = day;
      }
    } else if (typeof index === "string") {
      if (!shiftLocations[employeeName]) {
        shiftLocations[employeeName] = {};
      }

      if (
        shiftLocations[employeeName][day] &&
        shiftLocations[employeeName][day].includes("Morning") &&
        index.includes("Morning")
      ) {
        alert(`${employeeName} cannot have multiple morning shifts on ${day}`);
        return true;
      } else if (
        shiftLocations[employeeName][day] &&
        shiftLocations[employeeName][day].includes("Afternoon") &&
        index.includes("Afternoon")
      ) {
        alert(
          `${employeeName} cannot have multiple afternoon shifts on ${day}`
        );
        return true;
      } else {
        if (!shiftLocations[employeeName][day]) {
          shiftLocations[employeeName][day] = "";
        }
        shiftLocations[employeeName][day] += index;
      }

      if (!normalSchedule[employeeName]) {
        normalSchedule[employeeName] = 1;
      } else {
        normalSchedule[employeeName]++;
        if (normalSchedule[employeeName] > 2) {
          alert(`${employeeName} employee must not have more than 2 shifts`);
          return true;
        }
      }
    }
  }

  return false;
};

export const checkForMultipleLunch = (staffObject, employeeName) => {
  const lunchCounts = {};

  for (const day in staffObject) {
    let lunchCount = 0;

    for (const entry of staffObject[day]) {
      for (const key in entry) {
        if (entry[key].includes("Lunch")) {
          lunchCount++;
        }
      }
    }

    lunchCounts[day] = lunchCount;

    if (lunchCount > 1) {
      alert(`Alert: Multiple lunches found for ${day}`);
      break;
    }
  }
};

export const dropdownOptions = staffMembers;
