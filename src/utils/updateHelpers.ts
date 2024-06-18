import { Profile, Day } from '../types/types';

export const findAndUpdateProfile = (
  profiles: Profile[],
  profileId: string,
  updateFn: (profile: Profile) => Profile,
): Profile[] => {
  return profiles.map((profile) => {
    if (profile.id !== profileId) return profile;
    return updateFn(profile);
  });
};

export const findAndUpdateDay = (
  days: Day[],
  date: string,
  updateFn: (day: Day) => Day,
): Day[] => {
  return days.map((day) => {
    if (day.date !== date) return day;
    return updateFn(day);
  });
};
