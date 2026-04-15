const updateStreak = (user) => {
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const lastActivity = user.streak.lastActivityDate;

  if (!lastActivity) {
    user.streak.currentStreak = 1;
  } else {
    const lastDate = new Date(lastActivity);

    const lastDay = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate(),
    );

    const diffDays = Math.floor((today - lastDay) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Continue streak
      user.streak.currentStreak += 1;
    } else if (diffDays > 1) {
      // Missed days → reset
      user.streak.currentStreak = 1;
    }
    // diffDays === 0 → already counted today
  }

  if (user.streak.currentStreak > user.streak.longestStreak) {
    user.streak.longestStreak = user.streak.currentStreak;
  }

  user.streak.lastActivityDate = now;

  return user;
};  

module.exports = updateStreak;
