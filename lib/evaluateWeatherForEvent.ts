// Overall weather logic implemented by Isaac
// Temperature highs and lows added by Alex
export function evaluateWeatherForEvent(
  data: any,
  startTime: string,
  endTime: string,
  isOutside: boolean
): string {
  if (!isOutside) return "";

  // Takes the hour portion of both times and converts it into integers
  const startHour = parseInt(startTime.split(":")[0], 10);
  const endHour = parseInt(endTime.split(":")[0], 10);

  // Get the forecast for the next 24 hours, which is stored in the response from the
  // WeatherAPI
  const hours = data.forecast.forecastday[0].hour;

  // Set a list of potential bad conditions that the WeatherAPI can respond with
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

  // Array to store warnings displayed by Isaac
  let warnings: string[] = [];
  // Array to store temps displayed by Alex
  let temps: number[] = [];

  // Iterates through each hour and gets the condition for that specific hour by Isaac
  for (let h = startHour; h <= endHour; h++) {
    const hourlyWeather = hours[h];

    if (!hourlyWeather) {
      continue;
    }

    // Temps push added by Alex
    temps.push(hourlyWeather.temp_f);

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

  // Temperatures added by Alex
  const high = Math.max(...temps);
  const low = Math.min(...temps);

  // Logic of displaying conditional weather data by Isaac
  if (warnings.length > 0) {
    return (
      `Bad weather expected:\n` +
      warnings.join("\n") +
      `\n\nHigh during event: ${high}°F\nLow during event: ${low}°F`
    );
  }

  return `Weather looks good!\nHighs: ${high}°F\nLows: ${low}°F`;
}
