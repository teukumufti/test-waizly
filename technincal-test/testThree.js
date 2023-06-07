function convertToMilitaryTime(time12hr) {
  const [time, meridian] = time12hr.split(" ");
  let [hours, minutes, seconds] = time.split(":");

  hours = meridian === "PM" ? (parseInt(hours) + 12) % 24 : hours % 12;

  return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
}

console.log(convertToMilitaryTime("07:05:45 PM"));
