---
title: SQL
date: 2024-03-11
---

## [Khan Academy](https://www.khanacademy.org/computer-programming/new/sql)

### Creating tables

```sql
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, weight REAL);
```

```sql
CREATE TABLE customers (id INTEGER PRIMARY KEY, age INTEGER);
```

### Inserting data

```sql
INSERT INTO customers VALUES (73, "Brian", 33);
```

```sql
INSERT INTO customers (name, age) VALUES ("Brian", 33);
```

### Querying Data

[Select everything](https://www.khanacademy.org/computer-programming/sql-selecting-rows/5163767537205248)

```sql
SELECT * FROM customers;
```

### Simple SELECT Query

```sql
SELECT * FROM TableName;
```

```sql
SELECT expressions
FROM table
[WHERE conditions]
[ORDER BY expression [ ASC | DESC ]];
```

## [TODO]
- Querrying SELECT, FROM, WHERE, ORDER BY
- PRIMARY KEY, FOREIGN KEY
- CONSTRAINT
- Triggers, stored procedures