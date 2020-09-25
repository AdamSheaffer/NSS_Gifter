USE [master]

IF db_id('GifagramPOC') IS NULL
  CREATE DATABASE GifagramPOC
GO

USE GifagramPOC
GO


DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Subscription];
DROP TABLE IF EXISTS [Post];
DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(55) NOT NULL,
  [Email] nvarchar(55) NOT NULL,
  [ImageUrl] nvarchar(255) NULL,
  [Bio] nvarchar(255) NULL,
  [FirebaseId] nvarchar(55) UNIQUE NOT NULL,
  [DateCreated] datetime NOT NULL
)

CREATE TABLE [Post] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Title] nvarchar(55) NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL,
  [Caption] nvarchar(255) NULL,
  [UserProfileId] integer NOT NULL,
  [DateCreated] datetime NOT NULL

  CONSTRAINT [FK_Posti_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Subscription] (
  [Id] integer PRIMARY KEY IDENTITY,
  [SubscriberId] integer NOT NULL,
  [ContentProviderId]  integer NOT NULL,

  CONSTRAINT [FK_Subscription_Subscriber] FOREIGN KEY ([SubscriberId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Subscription_Provider] FOREIGN KEY ([ContentProviderId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [PostId]  integer NOT NULL,
  [Message]  nvarchar(255) NOT NULL,

  CONSTRAINT [FK_Comment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Comment_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
)


GO