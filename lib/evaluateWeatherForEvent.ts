// Convert "3:00 PM" or "14:00" → 24-hour integer hour for WeatherAPI
function toHour(time: string): number {
  const upper = time.toUpperCase();

  // If already 24-hour format: "14:30", "09:15"
  if (!upper.includes("AM") && !upper.includes("PM")) {
    return parseInt(time.split(":")[0], 10);
  }

  // AM/PM handling
  const [hourPart] = time.split(":");
  let hour = parseInt(hourPart, 10);
  const isPM = upper.includes("PM");

  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  return hour;
}

export function evaluateWeatherForEvent(
  data: any,
  startTime: string,
  endTime: string,
  isOutside: boolean
): string {
  if (!isOutside) return "";

  // Convert event times to 24-hour WeatherAPI hour indices
  const startHour = toHour(startTime);
  const endHour = toHour(endTime);

  const hours = data.forecast.forecastday[0].hour;

  const badConditions = [
    "rain",
    "snow",
    "sleet",
    "ice",
    "freezing",
    "thunder",
    "storm",
    "blizzard",
    "drizzle",
  ];

  let warnings: string[] = [];
  let temps: number[] = [];

  // Loop from start → end hour
  for (let h = startHour; h <= endHour; h++) {
    const hourlyWeather = hours[h];
    if (!hourlyWeather) continue; // If missing data, skip

    // Track temp for high/low calculation
    temps.push(hourlyWeather.temp_f);

    // Check for bad conditions
    const condition = hourlyWeather.condition.text.toLowerCase();
    if (badConditions.some(word => condition.includes(word))) {
      warnings.push(
        `At ${hourlyWeather.time.split(" ")[1]} → ${hourlyWeather.condition.text}`
      );
    }
  }

  // No temps means something wrong → fallback
  if (temps.length === 0) {
    return "Weather data unavailable for event time.";
  }

  const high = Math.max(...temps);
  const low = Math.min(...temps);

  if (warnings.length > 0) {
    return (
      `Bad weather expected:\n` +
      warnings.join("\n") +
      `\n\nHigh during event: ${high}°F\nLow during event: ${low}°F`
    );
  }

  return `Weather looks good!\nHighs: ${high}°F\nLows: ${low}°F`;
}
