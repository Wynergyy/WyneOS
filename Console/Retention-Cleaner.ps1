// ========================================================================
// Phase 6 Identity Schema
// Unified Identity, Organisations, Roles, Permissions, Tenancy
// ========================================================================

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================================================================
// BASE MODELS
// ========================================================================

model User {
  id            String           @id @default(uuid())
  email         String           @unique
  name          String?
  image         String?
  passwordHash  String?          // For magic link or email-password flows
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt

  accounts      Account[]
  sessions      Session[]
  roles         UserRole[]
  organisations UserOrganisation[]
  tenants       UserTenant[]

  // AssurePay links
  paymentAccounts PaymentAccount[]
  transactions    PaymentTransaction[]
}

// ========================================================================
// OAuth Accounts
// ========================================================================

model Account {
  id                String   @id @default(uuid())
  userId            String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user              User     @relation(fields: [userId], references: [id])

  @@unique([provider, providerAccountId])
}

// ========================================================================
// Sessions
// ========================================================================

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user         User     @relation(fields: [userId], references: [id])
}

// ========================================================================
// ORG / ROLE / PERMISSIONS
// Supports WFSL, SAS-CIC, Durbin House, AssurePay, Inkspiration
// ========================================================================

model Organisation {
  id          String              @id @default(uuid())
  name        String
  code        String              @unique
  createdAt   DateTime            @default(now())
  users       UserOrganisation[]
  tenants     Tenant[]
}

model UserOrganisation {
  id             String        @id @default(uuid())
  userId         String
  organisationId String
  role           String         // org-level role: Owner, Admin, Staff, Member

  user           User          @relation(fields: [userId], references: [id])
  organisation   Organisation  @relation(fields: [organisationId], references: [id])

  @@unique([userId, organisationId])
}

model Role {
  id          String      @id @default(uuid())
  name        String      @unique
  description String?

  users       UserRole[]
}

model UserRole {
  id      String   @id @default(uuid())
  userId  String
  roleId  String

  user    User     @relation(fields: [userId], references: [id])
  role    Role     @relation(fields: [roleId], references: [id])

  @@unique([userId, roleId])
}

// ========================================================================
// MULTI-TENANT LAYER
// Supports: WFSL tenants, SAS tenants, Durbin House tenants
// ========================================================================

model Tenant {
  id             String      @id @default(uuid())
  name           String
  code           String      @unique
  organisationId String

  organisation   Organisation @relation(fields: [organisationId], references: [id])
  userTenants    UserTenant[]
}

model UserTenant {
  id       String   @id @default(uuid())
  userId   String
  tenantId String

  user     User     @relation(fields: [userId], references: [id])
  tenant   Tenant   @relation(fields: [tenantId], references: [id])

  @@unique([userId, tenantId])
}

// ========================================================================
// ASSUREPAY CORE MODELS
// ========================================================================

model PaymentAccount {
  id        String              @id @default(uuid())
  userId    String
  name      String
  type      String              // personal, business, council, landlord
  createdAt DateTime            @default(now())

  user         User             @relation(fields: [userId], references: [id])
  methods      PaymentMethod[]
  transactions PaymentTransaction[]
  schedules    PaymentSchedule[]
}

model PaymentMethod {
  id              String   @id @default(uuid())
  accountId       String
  methodType      String   // card, bank, tokenised
  last4           String?
  providerRef     String?
  createdAt       DateTime @default(now())

  account         PaymentAccount @relation(fields: [accountId], references: [id])
  transactions    PaymentTransaction[]
}

model PaymentSchedule {
  id          String   @id @default(uuid())
  accountId   String
  frequency   String   // weekly, monthly
  nextRun     DateTime
  active      Boolean  @default(true)

  account      PaymentAccount     @relation(fields: [accountId], references: [id])
  transactions PaymentTransaction[]
}

model PaymentTransaction {
  id         String    @id @default(uuid())
  accountId  String
  methodId   String?
  scheduleId String?
  amount     Float
  status     String     // pending, success, failed
  createdAt  DateTime   @default(now())

  account   PaymentAccount   @relation(fields: [accountId], references: [id])
  method    PaymentMethod?   @relation(fields: [methodId], references: [id])
  schedule  PaymentSchedule? @relation(fields: [scheduleId], references: [id])
}

// ========================================================================
// COMPLIANCE AND PROPERTY MODELS (untouched but preserved)
// ========================================================================

model Property {
  id        String   @id @default(uuid())
  address   String
  ownerId   String
  createdAt DateTime @default(now())
}

