CREATE TABLE users (
	id serial PRIMARY KEY,
	email_addr VARCHAR ( 50 ) UNIQUE NOT NULL,
    pwd VARCHAR ( 500 ) NOT NULL,
    name VARCHAR ( 50 ) NOT NULL,
    phone_num INTEGER UNIQUE NOT NULL,
    addr VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE consult_record (
	id serial PRIMARY KEY,
    user_id serial NOT NULL,
    doctor_id serial NOT NULL,
    patient_id serial NOT NULL,
    medication_id serial,
    diagnosis_datail VARCHAR ( 500 ) UNIQUE NOT NULL,
    fee INTEGER NOT NULL,
    datetime TIMESTAMP NOT NULL,
    follow_up BOOLEAN NOT NULL
);

INSERT INTO users VALUES (
    1, 'sun@sun.com', '$2y$12$UZXZZ0ahL89dbhv9ziTihO01i2z2XPupOsXgVMTfn8g2Ja9AQRG.e', 'Sun', 51690597, 'Hong Kong'
);