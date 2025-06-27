export const typeDefs = `#graphql
  scalar DateTime

  type User {
    id: ID!
    username: String!
    email: String
    firstName: String!
    lastName: String!
    phoneNumber: String
    isActive: Boolean!
    isVerified: Boolean!
    role: Role!
    externalId: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    sessions: [Session!]!
    permissions: [UserPermission!]!
    applications: [UserApplication!]!
  }

  type Session {
    id: ID!
    userId: String!
    token: String!
    ipAddress: String
    userAgent: String
    isActive: Boolean!
    expiresAt: DateTime!
    createdAt: DateTime!
    lastActivity: DateTime!
    user: User!
  }

  type Application {
    id: ID!
    name: String!
    description: String
    url: String!
    icon: String
    isActive: Boolean!
    category: String
    order: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UserApplication {
    id: ID!
    userId: String!
    applicationId: String!
    isFavorite: Boolean!
    lastAccessed: DateTime
    accessCount: Int!
    createdAt: DateTime!
    user: User!
    application: Application!
  }

  type Permission {
    id: ID!
    name: String!
    code: String!
    description: String
    applicationId: String
    createdAt: DateTime!
    application: Application
  }

  type UserPermission {
    id: ID!
    userId: String!
    permissionId: String!
    grantedBy: String
    grantedAt: DateTime!
    expiresAt: DateTime
    user: User!
    permission: Permission!
  }

  type LoginAttempt {
    id: ID!
    userId: String
    username: String!
    ipAddress: String
    userAgent: String
    success: Boolean!
    reason: String
    createdAt: DateTime!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type ExternalAuthPayload {
    success: Boolean!
    message: String!
    token: String
    sessionId: String
    applicationUrl: String!
    userData: ExternalUserData
  }

  type ExternalUserData {
    username: String!
    firstName: String
    lastName: String
    email: String
  }

  type ExternalAuthUrl {
    authUrl: String!
    method: String!
    applicationUrl: String!
    requiresCredentials: Boolean!
  }

  type DashboardStats {
    totalUsers: Int!
    activeUsers: Int!
    totalApplications: Int!
    totalSessions: Int!
  }

  enum Role {
    USER
    ADMIN
    SUPER_ADMIN
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input CreateUserInput {
    username: String!
    email: String
    firstName: String!
    lastName: String!
    phoneNumber: String
    password: String!
    role: Role
  }

  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    phoneNumber: String
    password: String
    isActive: Boolean
    isVerified: Boolean
    role: Role
  }

  input CreateApplicationInput {
    name: String!
    description: String
    url: String!
    icon: String
    category: String
    order: Int
  }

  input UpdateApplicationInput {
    name: String
    description: String
    url: String
    icon: String
    category: String
    order: Int
    isActive: Boolean
  }

  type Query {
    # Auth
    me: User
    
    # Users
    users(skip: Int, take: Int, where: UserFilterInput): [User!]!
    user(id: ID!): User
    userByUsername(username: String!): User
    
    # Applications
    applications(skip: Int, take: Int, onlyActive: Boolean): [Application!]!
    application(id: ID!): Application
    myApplications: [UserApplication!]!
    
    # Sessions
    mySessions: [Session!]!
    activeSessions(userId: ID!): [Session!]!
    
    # Stats
    dashboardStats: DashboardStats!
    
    # Login attempts
    loginAttempts(username: String, skip: Int, take: Int): [LoginAttempt!]!
    
    # External applications
    getExternalApplications: [UserApplication!]!
  }

  type Mutation {
    # Auth
    login(input: LoginInput!): AuthPayload!
    logout: Boolean!
    logoutSession(sessionId: ID!): Boolean!
    
    # External authentication
    authenticateExternal(application: String!): ExternalAuthPayload!
    getExternalAuthUrl(application: String!): ExternalAuthUrl!
    
    # Users
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    changePassword(oldPassword: String!, newPassword: String!): User!
    
    # Applications
    createApplication(input: CreateApplicationInput!): Application!
    updateApplication(id: ID!, input: UpdateApplicationInput!): Application!
    deleteApplication(id: ID!): Boolean!
    
    # User Applications
    addApplicationToUser(applicationId: ID!): UserApplication!
    removeApplicationFromUser(applicationId: ID!): Boolean!
    toggleFavoriteApplication(applicationId: ID!): UserApplication!
    trackApplicationAccess(applicationId: ID!): UserApplication!
    
    # Permissions
    grantPermission(userId: ID!, permissionCode: String!, expiresAt: DateTime): UserPermission!
    revokePermission(userId: ID!, permissionCode: String!): Boolean!
  }

  input UserFilterInput {
    username: String
    email: String
    isActive: Boolean
    role: Role
  }
`; 