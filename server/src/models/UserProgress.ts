import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserProgressAttributes {
  id: number;
  user_id: number;
  template_id: number;
  solved_coords: number[][];
  solved_count: number;
  is_completed: boolean;
  updated_at?: Date;
}

interface UserProgressCreationAttributes
  extends Optional<
    UserProgressAttributes,
    'id' | 'solved_coords' | 'solved_count' | 'is_completed' | 'updated_at'
  > {}

export class UserProgress
  extends Model<UserProgressAttributes, UserProgressCreationAttributes>
  implements UserProgressAttributes
{
  public id!: number;
  public user_id!: number;
  public template_id!: number;
  public solved_coords!: number[][];
  public solved_count!: number;
  public is_completed!: boolean;
  public updated_at?: Date;
}

export function initUserProgress(sequelize: Sequelize) {
  UserProgress.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      template_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'templates', key: 'id' },
        onDelete: 'CASCADE',
      },
      solved_coords: { type: DataTypes.JSONB, defaultValue: [] },
      solved_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      is_completed: { type: DataTypes.BOOLEAN, defaultValue: false },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: 'user_progress',
      underscored: true,
      timestamps: false,
      indexes: [{ unique: true, fields: ['user_id', 'template_id'] }],
    },
  );
}
