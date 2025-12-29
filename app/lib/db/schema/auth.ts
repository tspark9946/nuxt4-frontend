import { bigint, boolean, mysqlTable, serial, text, time, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
});

export const session = mysqlTable('session', {
  id: serial().primaryKey(),
  userId: bigint({ mode: 'number', unsigned: true }).notNull().references(() => user.id, { onDelete: 'cascade' }),
  token: varchar({ length: 500 }).notNull().unique(),
  expiresAt: time().notNull(),
  ipAddress: text(),
  userAgent: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
});

export const account = mysqlTable('account', {
  id: serial().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: bigint({ mode: 'number', unsigned: true }).notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
});

export const verification = mysqlTable('verification', {
  id: serial().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: time().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
});
