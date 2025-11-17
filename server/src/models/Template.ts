import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserProgress } from './UserProgress';

export interface TemplateAttributes {
  id: number;
  name: string;
  description?: string;
  width: number;
  height: number;
  data: number[][];
  created_by?: number | null;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface TemplateCreationAttributes
  extends Optional<
    TemplateAttributes,
    'id' | 'description' | 'created_by' | 'is_active' | 'created_at' | 'updated_at'
  > {}

export class Template
  extends Model<TemplateAttributes, TemplateCreationAttributes>
  implements TemplateAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public width!: number;
  public height!: number;
  public data!: number[][];
  public created_by?: number | null;
  public is_active!: boolean;
  public created_at?: Date;
  public updated_at?: Date;

  public progress?: UserProgress[];
}

export function initTemplate(sequelize: Sequelize) {
  Template.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      width: { type: DataTypes.INTEGER, allowNull: false },
      height: { type: DataTypes.INTEGER, allowNull: false },
      data: { type: DataTypes.JSONB, allowNull: false },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
      },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: 'templates',
      underscored: true,
      timestamps: false,
    },
  );
}
