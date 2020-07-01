USE [master]

IF db_id('GifagramPOC') IS NULL
  CREATE DATABASE GifagramPOC
GO

USE GifagramPOC
GO


DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Subscription];
DROP TABLE IF EXISTS [Posting];
DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Name] nvarchar(55) NOT NULL,
  [Email] nvarchar(55) NOT NULL,
  [ImageUrl] nvarchar(255) NULL,
  [Bio] nvarchar(255) NULL,
)

CREATE TABLE [Posting] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Title] nvarchar(55) NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL,
  [Caption] nvarchar(255) NULL,
  [UserProfileId] UNIQUEIDENTIFIER NOT NULL,

  CONSTRAINT [FK_Posting_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Subscription] (
  [Id] integer PRIMARY KEY IDENTITY,
  [SubscriberId] UNIQUEIDENTIFIER NOT NULL,
  [ContentProviderId]  UNIQUEIDENTIFIER NOT NULL,

  CONSTRAINT [FK_Subscription_Subscriber] FOREIGN KEY ([SubscriberId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Subscription_Provider] FOREIGN KEY ([ContentProviderId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] UNIQUEIDENTIFIER NOT NULL,
  [PostingId]  integer NOT NULL,
  [Message]  nvarchar NOT NULL,

  CONSTRAINT [FK_Comment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Comment_Posting] FOREIGN KEY ([PostingId]) REFERENCES [Posting] ([Id])
)


GO