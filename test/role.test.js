const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const Role = require('../models/roleModel');
const UserRole = require('../models/userRoleModel');

describe('POST /roles/assign-role', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
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

  it('should return 400 if fields are missing', async () => {
    const response = await request(app)
      .post('/roles/assign-role')
      .send({ userId: 'user123' }); 

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('userId and roleName are required.');
  });

  it('should handle server errors gracefully', async () => {
    const originalCreate = UserRole.create;
    UserRole.create = () => { throw new Error('Forced failure'); };

    const response = await request(app)
      .post('/roles/assign-role')
      .send({
        userId: 'user123',
        roleName: 'Contributor'
      });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Server error during role assignment.');

    
    UserRole.create = originalCreate;
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
