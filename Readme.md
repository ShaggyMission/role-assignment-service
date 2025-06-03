# 🛡️ Role Assignment Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

<div align="center">
  <h3>🚀 Dynamic Role Management Microservice for Pet Rescue Platform</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Managing permissions for heroes saving street animals! 🐾</em></p>
</div>

---

## 🌟 Overview

The **Role Assignment Service** is a crucial authorization microservice in the Shaggy Mission platform that manages user permissions and access control. This service ensures that volunteers, adopters, veterinarians, and administrators have the appropriate permissions to perform their rescue mission tasks effectively.

## 🎯 What This Service Does

- **Dynamic Role Assignment**: Assigns roles to users across the platform ecosystem
- **Automatic Role Creation**: Creates new roles on-the-fly when they don't exist
- **User-Role Relationship Management**: Maintains secure associations between users and their assigned roles
- **Permission Control**: Enables proper access control throughout the Shaggy Mission platform
- **Flexible Role System**: Supports any role type needed for pet rescue operations (Contributor, Volunteer, Veterinarian, Admin, etc.)

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Sequelize ORM
- **Architecture**: RESTful microservice design
- **Documentation**: Swagger UI integration
- **Data Modeling**: Relational database with foreign key relationships

## 📡 API Endpoints

### Role Assignment Endpoint
**`POST /roles/assign-role`**
- Assigns specific roles to users in the Shaggy Mission platform
- Automatically creates new roles if they don't exist in the system
- Establishes secure user-role relationships
- Supports any role type needed for pet rescue operations

```json
{
  "userId": "abc123xyz789",
  "roleName": "Contributor"
}
```

### API Documentation Endpoint  
**`GET /roles/assign-docs`**
- Interactive Swagger UI documentation
- Complete API specification and testing interface

```json
{
  "swagger": "2.0",
  "info": {
    "title": "Role Assignment API",
    "version": "1.0.0"
  }
}
```

## 🔧 Core Functionality

### Role Assignment Process
The service handles the complete role management workflow by validating user and role information, checking if the requested role exists in the system, automatically creating new roles when needed, establishing secure user-role relationships, and maintaining referential integrity through foreign key constraints.

### Dynamic Role Creation
One of the key features is the ability to create roles dynamically. When a role assignment is requested for a role that doesn't exist, the service automatically creates it, making the system highly flexible for evolving rescue operation needs.

### Database Schema
The service manages two main tables: the Roles table with auto-incrementing integer ID and unique role names, and the UserRole junction table that creates many-to-many relationships between users and roles with proper foreign key constraints.

## 🌐 Service Integration

This microservice serves as the authorization backbone for the entire Shaggy Mission platform, working closely with the User Registration Service and other platform components to ensure proper access control. It enables different permission levels for volunteers, adopters, veterinarians, and administrators based on their roles in the pet rescue ecosystem.

## 🔒 Security Features

- **Role Uniqueness**: Prevents duplicate role creation
- **Referential Integrity**: Maintains proper database relationships through foreign keys
- **Input Validation**: Validates required fields for role assignments
- **Error Handling**: Comprehensive error management for failed operations

---

<div align="center">
  <p><strong>Built with ❤️ for street dogs and cats everywhere 🐕🐱</strong></p>
  <p><em>Every role assignment helps organize our rescue mission better!</em></p>
</div>