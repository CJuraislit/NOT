import { Sequelize } from 'sequelize';

import { initUser, User } from './User';
import { initUserStats, UserStats } from './UserStats';
import { initReferral, Referral } from './Referrals';
import { initTemplate, Template } from './Template';
import { initUserProgress, UserProgress } from './UserProgress';

export function initModels(sequelize: Sequelize) {
  initUser(sequelize);
  initUserStats(sequelize);
  initReferral(sequelize);
  initTemplate(sequelize);
  initUserProgress(sequelize);

  User.hasOne(UserStats, { foreignKey: 'user_id', as: 'stats' });
  UserStats.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  User.hasMany(Referral, { foreignKey: 'referrer_id', as: 'referrals' });
  Referral.belongsTo(User, { foreignKey: 'referrer_id', as: 'referrer' });
  Referral.belongsTo(User, { foreignKey: 'referred_id', as: 'referred' });

  User.hasMany(Template, { foreignKey: 'created_by', as: 'templates' });
  Template.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

  User.hasMany(UserProgress, { foreignKey: 'user_id', as: 'progress' });
  UserProgress.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  Template.hasMany(UserProgress, { foreignKey: 'template_id', as: 'progress' });
  UserProgress.belongsTo(Template, { foreignKey: 'template_id', as: 'template' });

  return {
    User,
    UserStats,
    Referral,
    Template,
    UserProgress,
  };
}

export { User, UserStats, Referral, Template, UserProgress };
