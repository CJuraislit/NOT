import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { User } from './User';

export interface ReferralAttributes {
  id: number;
  referrer_id: number;
  referred_id: number;
  created_at?: Date;
}

interface ReferralCreationAttributes extends Optional<ReferralAttributes, 'id' | 'created_at'> {}

export class Referral
  extends Model<ReferralAttributes, ReferralCreationAttributes>
  implements ReferralAttributes
{
  public id!: number;
  public referrer_id!: number;
  public referred_id!: number;
  public created_at?: Date;

  public referrer?: User;
  public referred?: User;
}

export function initReferral(sequelize: Sequelize) {
  Referral.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      referrer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      referred_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: 'referrals',
      timestamps: false,
      underscored: true,
      indexes: [{ unique: true, fields: ['referred_id'] }],
    },
  );
}
