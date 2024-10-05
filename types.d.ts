/*

postgres database tables
 *users
 
 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table with UUID
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

*schedules

-- Create schedules table with UUID foreign key
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  schedule_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

*/

type Schedule = {
	id: string;
	title: string;
	description: string;
	userId: number;
};

type User = {
	id: number;
	name: string;
	email: string;
};

type SqlMessage = { error: string } | { success: string };
