const updateStreak = (user) => {
  const now = new Date();

  // Create a "Today" date object at midnight for clean comparison
  const todayAtMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const lastActivity = user.streak.lastActivityDate;

  if (!lastActivity) {
    user.streak.currentStreak = 1;
  } else {
    const lastDate = new Date(lastActivity);
    const lastDateAtMidnight = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate(),
    );

    const diffDays = Math.round(
      (todayAtMidnight - lastDateAtMidnight) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 1) {
      // Exactly one day later - increment
      user.streak.currentStreak += 1;
    } else if (diffDays > 1) {
      // Missed one or more days - reset to 1
      user.streak.currentStreak = 1;
    }
    // Note: If diffDays is 0, we do nothing to currentStreak (same day completion)
  }

  // Update records
  if (user.streak.currentStreak > user.streak.longestStreak) {
    user.streak.longestStreak = user.streak.currentStreak;
  }

  user.streak.lastActivityDate = now;

  return user;
};

module.exports = updateStreak;
