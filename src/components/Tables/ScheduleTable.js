import React, { useEffect, useState } from "react";
import {
  tableHeaders,
  scheduleTableData,
  dropdownOptions,
  hasLunchWithSameValue,
  groupObjectsByDay,
  // staffMembers,
  // checkForMultipleLunch,
} from "../utils/helper";
import Dropdown from "../Dropdown/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { selectStaff } from "../Redux/staffActions.js";

const ScheduleTable = ({ onCalculate }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const selectedStaff = useSelector((state) => state.staff.selectedStaff);

  const [staff, setStaff] = useState([]);
  const [warning, setWarning] = useState("");
  const dispatch = useDispatch();

  const countShiftsForStaffMember = (staff, employeeName) => {
    return staff.filter((item) => item.employeeName === employeeName).length;
  };

  const handleScheduleOptionChange = (day, employeeName, index) => {
    // Check if the staff member has more than 7 shifts
    if (countShiftsForStaffMember(staff, employeeName) >= 7) {
      setWarning(
        "Warning: Staff member has reached the maximum of 7 shifts per week."
      );
      return;
    }

    if (
      hasLunchWithSameValue([
        ...staff,
        { day, employeeName, index: scheduleTableData[index] },
      ])
    ) {
      setWarning(
        "Warning: Lunch with the same value already selected. This selection will be removed."
      );
      setStaff(staff.slice(0, staff.length - 1));
    } else {
      setWarning("");
      const newStaffObject = {
        day,
        employeeName,
        index: scheduleTableData[index],
      };
      setStaff([...staff, newStaffObject]);
    }
  };

  useEffect(() => {
    hasLunchWithSameValue(staff) &&
      setWarning("Warning: Lunch with the same value already selected.");
  }, [staff]);

  const handleCalculate = (event, selectedStaff) => {
    const staffSchedule = groupObjectsByDay(staff);
    dispatch(selectStaff(staffSchedule));
    onCalculate(selectedStaff);
  };

  // const handleRandomPopulate = () => {
  //   const populatedStaff = [];
  //   const availableShifts = [...scheduleTableData.keys()];
  //   const staffMembersCopy = [...staffMembers];

  //   for (let i = staffMembersCopy.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [staffMembersCopy[i], staffMembersCopy[j]] = [
  //       staffMembersCopy[j],
  //       staffMembersCopy[i],
  //     ];
  //   }

  //   for (const day of days) {
  //     for (const shift of scheduleTableData) {
  //       if (availableShifts.length === 0) {
  //         populatedStaff.length = 0;
  //         break;
  //       }

  //       const randomIndex =
  //         availableShifts[Math.floor(Math.random() * availableShifts.length)];
  //       const randomEmployee = staffMembersCopy.pop();

  //       if (countShiftsForStaffMember(populatedStaff, randomEmployee) >= 7) {
  //         staffMembersCopy.push(randomEmployee);
  //         continue;
  //       }

  //       handleScheduleOptionChange(day, randomEmployee, randomIndex);

  //       if (
  //         hasLunchWithSameValue([
  //           ...populatedStaff,
  //           {
  //             day,
  //             employeeName: randomEmployee,
  //             index: scheduleTableData[randomIndex],
  //           },
  //         ]) ||
  //         checkForMultipleLunch(
  //           groupObjectsByDay(populatedStaff),
  //           randomEmployee
  //         )
  //       ) {
  //         staffMembersCopy.push(randomEmployee);
  //       } else {
  //         populatedStaff.push({
  //           day,
  //           employeeName: randomEmployee,
  //           index: scheduleTableData[randomIndex],
  //         });

  //         availableShifts.splice(availableShifts.indexOf(randomIndex), 1);
  //       }
  //     }
  //   }

  //   setStaff(populatedStaff);
  // };

  const handleClearAllShifts = () => {
    setStaff([]);
    setWarning("");

    const dropdowns = document.querySelectorAll("select");
    dropdowns.forEach((dropdown) => {
      dropdown.selectedIndex = 0;
    });
  };

  return (
    <div>
      {warning && <div className="warning">{warning}</div>}
      <table>
        <caption>Schedule</caption>
        <thead>
          <tr>
            {tableHeaders.scheduleTable.items.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {tableHeaders.scheduleTable.days.map((day, dayIndex) => (
              <th key={dayIndex}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleTableData.map((tableData, index) => (
            <tr key={index}>
              <td>{tableData}</td>
              {days.map((day, dayIndex) => (
                <td key={dayIndex}>
                  {day === "Time Slot" ? (
                    "-"
                  ) : (
                    <Dropdown
                      options={dropdownOptions}
                      onChange={(e) =>
                        handleScheduleOptionChange(day, e.target.value, index)
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={(event) => handleCalculate(event, selectedStaff)}>
        Calculate
      </button>
      {/* <button onClick={handleRandomPopulate}>Randomly Populate</button> */}
      <button onClick={handleClearAllShifts}>Clear All Shifts</button>
    </div>
  );
};

export default ScheduleTable;
