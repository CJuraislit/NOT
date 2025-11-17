import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserStatsAttributes {
  id: number;
  user_id: number;
  completed_art_count: number;
  attempts_used_today: number;
  daily_quota: number;
  last_attempt_reset_at: Date;
  total_pixels_placed: number;
  updated_at?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserStatsAttributes,
    | 'id'
    | 'completed_art_count'
    | 'attempts_used_today'
    | 'last_attempt_reset_at'
    | 'daily_quota'
    | 'total_pixels_placed'
    | 'updated_at'
  > {}

export class UserStats
  extends Model<UserStatsAttributes, UserCreationAttributes>
  implements UserStatsAttributes
{
  public id!: number;
  public user_id!: number;
  public completed_art_count!: number;
  public attempts_used_today!: number;
  public daily_quota!: number;
  public last_attempt_reset_at!: Date;
  public total_pixels_placed!: number;
  public updated_at?: Date;
}

export function initUserStats(sequelize: Sequelize) {
  UserStats.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      completed_art_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      attempts_used_today: { type: DataTypes.INTEGER, defaultValue: 0 },
      daily_quota: { type: DataTypes.INTEGER, defaultValue: 5 },
      last_attempt_reset_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      total_pixels_placed: { type: DataTypes.INTEGER, defaultValue: 0 },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: 'user_stats',
      timestamps: false,
      underscored: true,
      indexes: [{ unique: true, fields: ['user_id'] }],
    },
  );
}
