// postgres database tables
//  *users

//  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

// -- Create users table with UUID
// CREATE TABLE users (
//   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   fullname VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL,
//	 clerkId varchar(255),
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// *schedules

// CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

// CREATE TABLE schedules (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     dateTime TIMESTAMP WITH TIME ZONE,
//     description TEXT,
//     title TEXT,
//     userId UUID,
//     FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
// );

type Schedule = {
	id: string;
	title: string;
	description: string;
	userId: string;
	datetime: Date;
};

type User = {
	id: string;
	clerkId: string;
	fullname: string;
	email: string;
};

type SqlResponse = { error: string } | { success: string };
