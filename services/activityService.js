const User = require('../models/User');

class ActivityService {
  /**
   * Updates the user's streak based on their last active date.
   * Call this when a user logs in or loads the dashboard.
   */
  static async updateStreak(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      const now = new Date();
      const lastActive = new Date(user.lastActive);
      
      // Strip time for pure day-level comparison
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
      
      const diffTime = Math.abs(today - lastActiveDay);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Active yesterday, streak continues
        user.streak += 1;
      } else if (diffDays > 1) {
        // Missed a day, streak resets to 1 (since they are active today)
        user.streak = 1;
      } else if (user.streak === 0) {
        // First time initialization
        user.streak = 1;
      }
      
      // If diffDays === 0, streak remains the same (already logged today)

      user.lastActive = now;
      await user.save();
      return user;
    } catch (error) {
      console.error('Error updating streak:', error);
      return null;
    }
  }

  /**
   * Logs a specific action to the user's activity log and recent activity feed.
   */
  static async logActivity(userId, actionString) {
    try {
      const user = await User.findById(userId);
      if (!user) return;

      const newActivity = { date: new Date(), action: actionString };

      // Push to structured log (for heatmap)
      user.activityLog.push(newActivity);

      // Push to recent feed (for UI feed)
      user.recentActivity.unshift(actionString);
      
      // Keep only last 10 in recent feed
      if (user.recentActivity.length > 10) {
        user.recentActivity = user.recentActivity.slice(0, 10);
      }

      await user.save();
      
      // Also update streak just in case they haven't loaded dashboard
      await this.updateStreak(userId);
      
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }
}

module.exports = ActivityService;
