---
title: Database Management
date: 2024-02-13
---

## PostgreSQL

##### Installation
```
$ sudo apt install postgresql
```

##### Become the postgres user.
```
$ su -l postgres
```

###### [Optional] Create User
```
$ createuser --interactive
```

###### [Optional] Create Database
```
$ createdb DBNAME
```

##### Start the primary database shell.
```
$ psql
```

##### Some helpful commands:

List all databases
```
=> \l
```

Connect to a particular database:
```
=> \c DBNAME
```

Show summary information about all tables in the current database:
```
=> \dt
```

List all users and their permission levels:
```
=> \du
```

Exit/quit the `psql` shell:
```
=> \q
```

## SQL

### Basic Commands

##### Simple SELECT Query
```sql
SELECT * FROM TableName;
```
```sql
SELECT expressions
FROM table
[WHERE conditions]
[ORDER BY expression [ ASC | DESC ]];
```

#### [TODO] The Big Six

### COMP378 Database Management Lab 1

##### Create database and tables
```sql
CREATE DATABASE univeristy;

CREATE TABLE student (
    stud_id integer,
    stud_name varchar(30),
    address varchar(40),
    telephone varchar(10)
);

CREATE TABLE course (
    course_no varchar(7),
    title varchar(40),
    inst_no integer
);

CREATE TABLE registration (
    stud_id integer,
    course_no varchar(7),
    term varchar(15)
);

CREATE TABLE instructor (
    inst_no integer,
    inst_name varchar(30),
    department varchar(50)
);
```

##### Populate the tables with some records
```sql
INSERT INTO student 
VALUES (10, 'Bob Smith','123 sesame street New York USA','7803333222');

INSERT INTO student 
VALUES (11, 'Karen Lee', '1 university drive Athabasca Canada','5875555444');

INSERT INTO student 
VALUES ('COMP378', 'Database Management', 103);

INSERT INTO course
VALUES values ('COMP456', 'Artificial Intelligence', 103);

INSERT INTO registration
VALUES ('10', 'COMP378', 'Winter 2019');

INSERT INTO registration
VALUES ('11', 'COMP456', 'Spring 2020');

INSERT INTO instructor
VALUES ('103', 'Lary Mckay', 'School of Computing and Information Systems');

INSERT INTO instructor
VALUES ('104', 'Harris Terrien', 'School of Business');
```

##### Query the tables contents
```sql
SELECT * FROM student;
```

```sql
SELECT * FROM course;
```

```sql
SELECT * FROM registration;
```

```sql
SELECT * FROM instructor;
```