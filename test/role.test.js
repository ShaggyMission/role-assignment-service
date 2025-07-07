const { Sequelize, DataTypes } = require('sequelize');
const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  roleName: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const UserRole = sequelize.define('UserRole', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.STRING, allowNull: false },
  roleId: { type: DataTypes.INTEGER, allowNull: false },
});

Role.hasMany(UserRole, { foreignKey: 'roleId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });

app.post('/roles/assign-role', async (req, res) => {
  const { userId, roleName } = req.body;
  if (!userId || !roleName) {
    return res.status(400).json({ message: 'userId and roleName are required.' });
  }

  try {
    let role = await Role.findOne({ where: { roleName } });
    if (!role) {
      role = await Role.create({ roleName });
    }

    await UserRole.create({ userId, roleId: role.id });

    return res.status(201).json({ message: `Role '${roleName}' assigned to user ${userId}.` });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during role assignment.' });
  }
});

describe('POST /roles/assign-role', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close(); 
  });

  it('should assign a role to a user successfully', async () => {
    const response = await request(app)
      .post('/roles/assign-role')
      .send({
        userId: 'user123',
        roleName: 'Contributor'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Role 'Contributor' assigned to user user123.");

    const role = await Role.findOne({ where: { roleName: 'Contributor' } });
    expect(role).not.toBeNull();

    const userRole = await UserRole.findOne({ where: { userId: 'user123', roleId: role.id } });
    expect(userRole).not.toBeNull();
  });
});
