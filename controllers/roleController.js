const Role = require('../models/roleModel');
const UserRole = require('../models/userRoleModel');

const assignRole = async (req, res) => {
  try {
    const { userId, roleName } = req.body;

    if (!userId || !roleName) {
      return res.status(400).json({ message: 'userId and roleName are required.' });
    }

    let role = await Role.findOne({ where: { roleName } });

    if (!role) {
      role = await Role.create({ roleName });
    }

    await UserRole.create({
      userId,
      roleId: role.id
    });

    res.status(201).json({ message: `Role '${roleName}' assigned to user ${userId}.` });
  } catch (error) {
    console.error('Role assignment error:', error);
    res.status(500).json({ message: 'Server error during role assignment.' });
  }
};

module.exports = { assignRole };
