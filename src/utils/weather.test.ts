import test from 'node:test';
import assert from 'node:assert/strict';
import {
  celsiusToFahrenheit,
  formatTemp,
  computeUnitScale,
  buildWavePathForTemps,
  CITIES_DATABASE,
  searchLocations,
  getFullCityData,
  getLocalTimeForTimezone,
  getCelestialCoordinates,
  parseTimeToDecimal,
  calculateAstronomicalOrbit,
  computeMoonSvgPaths,
  getMoonPhaseName
} from './weather';

test('parseTimeToDecimal converts time strings to decimal hours', () => {
  assert.equal(parseTimeToDecimal("06:30"), 6.5);
  assert.equal(parseTimeToDecimal("12:00"), 12);
  assert.equal(parseTimeToDecimal("17:45"), 17.75);
});

test('getLocalTimeForTimezone computes phase correctly', () => {
  // Test noon: 12:00
  const noonDate = new Date('2026-10-25T12:00:00Z');
  const info = getLocalTimeForTimezone('UTC', noonDate, "06:00", "18:00");
  assert.equal(info.hours, 12);
  assert.equal(info.isNight, false);
  assert.equal(info.phase, 'day');

  // Test midnight: 00:00
  const midnightDate = new Date('2026-10-25T00:00:00Z');
  const infoNight = getLocalTimeForTimezone('UTC', midnightDate, "06:00", "18:00");
  assert.equal(infoNight.hours, 0);
  assert.equal(infoNight.isNight, true);
  assert.equal(infoNight.phase, 'night');
});

test('getCelestialCoordinates computes sun arc during daytime and moon during night', () => {
  // Midday sun: peak altitude
  const sunMid = getCelestialCoordinates(12.0, "06:00", "18:00");
  assert.equal(sunMid.isSun, true);
  assert.ok(sunMid.yRatio < 0.35, 'Peak sun should be high in the sky (low yRatio)');
  assert.ok(sunMid.altitude > 40, 'Peak altitude should be high');

  // Midnight moon
  const moonMidnight = getCelestialCoordinates(0.0, "06:00", "18:00");
  assert.equal(moonMidnight.isSun, false);
  assert.ok(moonMidnight.altitude > 0);
});

test('calculateAstronomicalOrbit calculates live Sun orbit when solar altitude > 0', () => {
  // 12:00 PM Tashkent time (07:00 UTC)
  const middayTashkent = new Date('2026-10-25T07:00:00Z');
  const astro = calculateAstronomicalOrbit(middayTashkent, 41.2995, 69.2401, 'Asia/Tashkent');

  assert.equal(astro.isDay, true);
  assert.equal(astro.activeBody, 'sun');
  assert.ok(astro.solarAltitude > 0, 'Sun altitude should be positive at midday');
  assert.ok(astro.solarAltitude >= -90 && astro.solarAltitude <= 90, 'Solar altitude must be strictly between -90 and +90');
  assert.ok(astro.moonAltitude >= -90 && astro.moonAltitude <= 90, 'Moon altitude must be strictly between -90 and +90');
  assert.ok(astro.solarAzimuth >= 0 && astro.solarAzimuth <= 360, 'Azimuth should be between 0 and 360');
  assert.ok(astro.sunriseTimeStr.length === 5, 'Sunrise time should be formatted HH:mm');
  assert.ok(astro.sunsetTimeStr.length === 5, 'Sunset time should be formatted HH:mm');
  assert.ok(astro.solarNoonTimeStr.length === 5, 'Solar noon should be formatted HH:mm');
  assert.ok(astro.arcProgress > 0 && astro.arcProgress < 1, 'Midday arc progress should be within [0, 1]');
  assert.ok(astro.arcYRatio < 0.5, 'Sun should be high along the arc at midday');
});

test('calculateAstronomicalOrbit strictly clamps altitude across all 24 hours of the day', () => {
  for (let h = 0; h < 24; h++) {
    const testDate = new Date(`2026-10-25T${h.toString().padStart(2, '0')}:30:00Z`);
    const astro = calculateAstronomicalOrbit(testDate, 41.2995, 69.2401, 'Asia/Tashkent');
    assert.ok(astro.solarAltitude >= -90 && astro.solarAltitude <= 90, `Solar altitude at hour ${h} must be within [-90, 90], got ${astro.solarAltitude}`);
    assert.ok(astro.moonAltitude >= -90 && astro.moonAltitude <= 90, `Moon altitude at hour ${h} must be within [-90, 90], got ${astro.moonAltitude}`);
    assert.ok(astro.activeAltitude >= -90 && astro.activeAltitude <= 90, `Active altitude must be within [-90, 90], got ${astro.activeAltitude}`);
    assert.ok(!astro.statusText.includes('2169'), 'Status text must never contain spurious un-clamped altitude');
  }
});

test('calculateAstronomicalOrbit switches to Moon when solar altitude <= 0', () => {
  // 00:00 Midnight Tashkent time (19:00 UTC of previous day)
  const midnightTashkent = new Date('2026-10-24T19:00:00Z');
  const astro = calculateAstronomicalOrbit(midnightTashkent, 41.2995, 69.2401, 'Asia/Tashkent');

  assert.equal(astro.isDay, false);
  assert.equal(astro.activeBody, 'moon');
  assert.ok(astro.solarAltitude <= 0, 'Sun altitude should be <= 0 at midnight');
  assert.ok(astro.moonAltitude >= -90 && astro.moonAltitude <= 90);
  assert.ok(astro.moonFraction >= 0 && astro.moonFraction <= 1, 'Moon fraction between 0.0 and 1.0');
  assert.ok(astro.moonPhase >= 0 && astro.moonPhase <= 1, 'Moon phase between 0.0 and 1.0');
  assert.ok(astro.moonPhaseName.length > 0, 'Moon phase name should be populated in Uzbek');
  assert.ok(astro.moonIlluminationPercent >= 0 && astro.moonIlluminationPercent <= 100);
});

test('getFullCityData populates humidity and windSpeed for each forecast day', () => {
  const city = getFullCityData(CITIES_DATABASE[0]);
  assert.ok(city.days.length === 7);
  for (const day of city.days) {
    assert.ok(typeof day.humidity === 'number' && day.humidity >= 0 && day.humidity <= 100, 'Forecast day must have numeric humidity %');
    assert.ok(typeof day.windSpeed === 'number' && day.windSpeed >= 0, 'Forecast day must have numeric windSpeed km/h');
  }
});

test('computeMoonSvgPaths produces valid SVG paths for various moon phases', () => {
  // Waxing crescent
  const crescent = computeMoonSvgPaths(0.15, 16);
  assert.ok(crescent.litPath.startsWith('M 0,-16'));
  assert.ok(crescent.shadowPath.startsWith('M 0,-16'));
  assert.equal(crescent.isWaxing, true);

  // Full moon
  const fullMoon = computeMoonSvgPaths(0.5, 16);
  assert.ok(fullMoon.litPath.includes('A 16 16'));
  assert.equal(fullMoon.phaseName.includes('To\'lin oy'), true);

  // Waning gibbous
  const waning = computeMoonSvgPaths(0.65, 16);
  assert.equal(waning.isWaxing, false);
  assert.ok(waning.litPath.length > 0);
});

test('cities database includes coordinates for all entries', () => {
  for (const city of CITIES_DATABASE) {
    assert.ok(typeof city.lat === 'number', `${city.city} must have numeric lat`);
    assert.ok(typeof city.lng === 'number', `${city.city} must have numeric lng`);
    assert.ok(city.lat >= -90 && city.lat <= 90);
    assert.ok(city.lng >= -180 && city.lng <= 180);
  }
});

test('cities database includes diverse weather effects including snow and wind', () => {
  const chimyon = CITIES_DATABASE.find(c => c.id === 'chimyon');
  assert.ok(chimyon, 'Chimyon should be in database');
  assert.equal(chimyon.weatherEffect, 'snow');

  const nukus = CITIES_DATABASE.find(c => c.id === 'nukus');
  assert.ok(nukus, 'Nukus should be in database');
  assert.equal(nukus.weatherEffect, 'wind');

  const jakarta = CITIES_DATABASE.find(c => c.id === 'central-jakarta');
  assert.ok(jakarta, 'Jakarta should be in database');
  assert.equal(jakarta.weatherEffect, 'storm');
});

test('default city is Toshkent with timezone and sunrise/sunset', () => {
  const defaultCity = CITIES_DATABASE[0];
  assert.equal(defaultCity.id, 'toshkent');
  assert.equal(defaultCity.timezone, 'Asia/Tashkent');
  assert.equal(defaultCity.lat, 41.2995);
  assert.equal(defaultCity.lng, 69.2401);
  assert.ok(defaultCity.sunriseTime);
  assert.ok(defaultCity.sunsetTime);
});

test('searchLocations matches recommendations on the first letter typed', () => {
  const resultsT = searchLocations('t');
  assert.ok(resultsT.length > 0);
  assert.equal(resultsT[0].city.toLowerCase().startsWith('t'), true);
});

test('buildWavePathForTemps returns valid stroke and fill paths', () => {
  const { strokePath, fillPath } = buildWavePathForTemps([22, 24, 21, 17, 19, 23]);
  assert.ok(strokePath.startsWith('M0,'));
  assert.ok(fillPath.includes('L835,230 L0,230 Z'));
});

test('cities database includes major Uzbekistan districts and towns', () => {
  const districtNames = ["Qo'qon", "Marg'ilon", "Shahrisabz", "Olmaliq", "Denov", "Zomin", "Xiva", "Urganch", "Chorvoq", "Mo'ynoq"];
  for (const name of districtNames) {
    const found = CITIES_DATABASE.find(c => c.city.includes(name));
    assert.ok(found, `Expected district or town ${name} to be in CITIES_DATABASE`);
    assert.ok(found.lat && found.lng, `${name} must have lat/lng`);
    assert.ok(found.bgImageUrl, `${name} must have high-res web bgImageUrl`);
  }
});

test('searchLocations only returns genuine matching locations and never dummy data', () => {
  const invalid = searchLocations('xyznonexistentplacename1234');
  assert.equal(invalid.length, 0, 'Non-existent location search should return empty array');

  const margilon = searchLocations("Marg'ilon");
  assert.ok(margilon.length > 0);
  assert.ok(margilon[0].city.includes("Marg'ilon"));
});

