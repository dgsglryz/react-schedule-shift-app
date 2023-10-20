import React, { useEffect, useState } from "react";
import {
  tableHeaders,
  scheduleTableData,
  dropdownOptions,
  hasLunchWithSameValue,
  groupObjectsByDay,
} from "../utils/helper";
import Dropdown from "../Dropdown/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { selectStaff } from "../Redux/staffActions.js";

const ScheduleTable = ({ onCalculate }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const selectedStaff = useSelector((state) => state.staff.selectedStaff);

  const [staff, setStaff] = useState([]);
  const dispatch = useDispatch();

  const handleScheduleOptionChange = (day, employeeName, index) => {
    const newStaffObject = {
      day,
      employeeName,
      index: scheduleTableData[index],
    };
    setStaff([...staff, newStaffObject]);
  };

  useEffect(() => {
    hasLunchWithSameValue(staff);
  }, [staff]);

  const handleCalculate = (event, selectedStaff) => {
    const staffSchedule = groupObjectsByDay(staff);
    dispatch(selectStaff(staffSchedule));
    onCalculate(selectedStaff);
  };

  return (
    <div>
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
    </div>
  );
};

export default ScheduleTable;
