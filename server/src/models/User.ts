import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserStats } from './UserStats';

export interface UserAttributes {
  id: number;
  email: string;
  password_hash: string;
  username: string;
  rating: number;
  role: string;
  daily_attempts: number;
  last_attempt_reset: Date | null;
  referrer_id?: number | null;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'rating' | 'last_attempt_reset' | 'daily_attempts'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password_hash!: string;
  public username!: string;
  public rating!: number;
  public role!: string;
  public daily_attempts!: number;
  public last_attempt_reset!: Date | null;
  public referrer_id?: number | null;
  created_at?: Date;
  updated_at?: Date;

  public stats?: UserStats;
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      rating: { type: DataTypes.INTEGER, defaultValue: 0 },
      role: { type: DataTypes.STRING, defaultValue: 'USER' },
      daily_attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
      last_attempt_reset: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: 'users',
      underscored: true,
      timestamps: false,
    },
  );
}
