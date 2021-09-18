import { DateTime, Interval } from 'luxon';

export function getTimeSince(date: Date): string {
  const now = DateTime.utc();
  const prev = DateTime.fromJSDate(date);

  const timeBetween = Interval.fromDateTimes(prev, now);
  const days = Math.floor(timeBetween.length('days'));
  const months = Math.floor(timeBetween.length('months'));
  const years = Math.floor(timeBetween.length('years'));

  if (years > 0) {
    const sOrBlank = years > 1 ? 's' : '';
    return `${years} year${sOrBlank} ago`;
  } else if (months > 0) {
    const sOrBlank = months > 1 ? 's' : '';
    return `${months} month${sOrBlank} ago`;
  } else {
    if (days === 0) return 'today';
    else if (days === 1) return 'yesterday';
    else return `${days} days ago`;
  }
}
