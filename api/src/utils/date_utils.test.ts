import MockDate from 'mockdate';
import { getTimeSince } from './date_utils';

beforeEach(() => {
  // Reference date that will be returned when any function calls new Date()
  MockDate.set('6/15/2010');
});

afterEach(() => {
  MockDate.reset();
});

describe('getTimeSince', () => {
  it('handles same day', () => {
    const sameDay = new Date('6/15/2010');
    expect(getTimeSince(sameDay)).toBe('today');
  });

  it('handles yesterday', () => {
    const past = new Date('6/14/2010');
    expect(getTimeSince(past)).toBe('yesterday');
  });

  it('handles 2 days ago', () => {
    const past = new Date('6/13/2010');
    expect(getTimeSince(past)).toBe('2 days ago');
  });

  it('handles 3 days ago', () => {
    const past = new Date('6/12/2010');
    expect(getTimeSince(past)).toBe('3 days ago');
  });

  it('handles 30 days ago', () => {
    const past = new Date('5/16/2010');
    expect(getTimeSince(past)).toBe('30 days ago');
  });

  it('handles 1 month ago', () => {
    const past = new Date('5/15/2010');
    expect(getTimeSince(past)).toBe('1 month ago');
  });

  it('handles 2 months ago', () => {
    const past = new Date('4/14/2010');
    expect(getTimeSince(past)).toBe('2 months ago');
  });

  it('handles 11 months ago', () => {
    const past = new Date('6/16/2009');
    expect(getTimeSince(past)).toBe('11 months ago');
  });

  it('handles 1 year ago', () => {
    const past = new Date('6/15/2009');
    expect(getTimeSince(past)).toBe('1 year ago');
  });

  it('handles 2 years ago', () => {
    const past = new Date('6/15/2008');
    expect(getTimeSince(past)).toBe('2 years ago');
  });
});
