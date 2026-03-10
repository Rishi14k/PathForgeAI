const updateStreak = (user) => {
  const today = new Date();
  const lastActivity = user.streak.lastActivityDate;

  const todayDate = new Date(today.setHours(0,0,0,0));

  if (!lastActivity) {
    user.streak.currentStreak = 1;
  } else {
    const lastDate = new Date(lastActivity.setHours(0,0,0,0));

    const diffDays = Math.floor(
      (todayDate - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      user.streak.currentStreak += 1;
    } 
    else if (diffDays > 1) {
      user.streak.currentStreak = 1;
    }
  }

  if (user.streak.currentStreak > user.streak.longestStreak) {
    user.streak.longestStreak = user.streak.currentStreak;
  }

  user.streak.lastActivityDate = new Date();

  return user;
};

module.exports = updateStreak;