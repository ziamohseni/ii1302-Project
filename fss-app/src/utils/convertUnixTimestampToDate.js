function convertUnixTimestampToDate(unixTimestamp) {
  // Convert to milliseconds and round to handle fractional seconds
  const milliseconds = Math.round(unixTimestamp * 1000);
  const date = new Date(milliseconds);

  // Customize the date format using toLocaleString() for Swedish locale
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Sweden typically uses 24-hour time format
  };

  return date.toLocaleString("sv-SE", options);
}

export default convertUnixTimestampToDate;
