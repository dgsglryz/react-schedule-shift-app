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
  {
    TimeSlot: "Morning UpStairs",
  },
  {
    TimeSlot: "Morning Down Stairs",
  },
  {
    TimeSlot: "Morning Parking Lot",
  },
  {
    TimeSlot: "LunchA",
  },
  {
    TimeSlot: "LunchB",
  },
  {
    TimeSlot: "LunchC",
  },
  {
    TimeSlot: "LunchD",
  },
  {
    TimeSlot: "Afternoon Up Stairs",
  },
  {
    TimeSlot: "Afternoon Down Stairs",
  },
  {
    TimeSlot: "Afternoon Parking Lot",
  },
].map((row) => {
  tableHeaders.scheduleTable.days.forEach((day) => {
    row[day] = "";
  });
  return row;
});

export const dropdownOptions = staffMembers;
