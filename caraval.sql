DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
	user_id VARCHAR(64) NOT NULL,
	password VARCHAR(64) NOT NULL,
	first_name VARCHAR(64) NOT NULL,
	last_name VARCHAR(64) NOT NULL,
	address VARCHAR(64) NOT NULL,
	PRIMARY KEY (user_id) 
);
DROP TABLE IF EXISTS Handyman;
CREATE TABLE Handyman( 
	handy_id VARCHAR(64) NOT NULL,
	password VARCHAR(64) NOT NULL, 
	first_name VARCHAR(64) NOT NULL,
	last_name VARCHAR(64) NOT NULL, 
	address VARCHAR(64) NOT NULL, 
	status INT, 
	skill VARCHAR(64) NOT NULL,
	PRIMARY KEY (handy_id)
);
DROP TABLE IF EXISTS Transactions;
CREATE TABLE Transactions(
	_id INT NOT NULL, 
	user_id VARCHAR(64) NOT NULL, 
	handy_id VARCHAR(64) NOT NULL, 
	date DATE NOT NULL,
	PRIMARY KEY (_id),
	CONSTRAINT tra_constr_u FOREIGN KEY (user_id) 
	REFERENCES Users(user_id), 
	CONSTRAINT tra_constr_h FOREIGN KEY (handy_id) 
	REFERENCES Handyman(handy_id)
);
DROP TABLE IF EXISTS Review;
CREATE TABLE Review(
	_id INT NOT NULL, 
	text VARCHAR(255) NOT NULL, 
	rating INT NOT NULL, 
	user_id VARCHAR(64) NOT NULL, 
	handy_id VARCHAR(64) NOT NULL, 
	date DATE NOT NULL, 
	PRIMARY KEY (_id), 
	CONSTRAINT rev_constr_u FOREIGN KEY (user_id) 
	REFERENCES Users(user_id), 
	CONSTRAINT rev_constr_h FOREIGN KEY (handy_id) 
	REFERENCES Handyman(user_id)
);