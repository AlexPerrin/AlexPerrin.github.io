---
title: SQL
date: 2024-03-11
---

## [TODO]
- Querrying SELECT, FROM, WHERE, ORDER BY
- PRIMARY KEY, FOREIGN KEY
- CONSTRAINT
- Triggers, stored procedures

## [Khan Academy](https://www.khanacademy.org/computer-programming/new/sql)

### Creating tables

[Many data types](https://www.khanacademy.org/computer-programming/sql-create-table-with-multiple-data-types/5945065256124416)

```sql
CREATE TABLE customers (
    id INTEGER PRIMARY KEY, 
    name TEXT, 
    age INTEGER, 
    weight REAL
);
```

[Using primary keys](https://www.khanacademy.org/computer-programming/sql-create-table-with-a-primary-key/5189331400654848)

```sql
CREATE TABLE customers (
    id INTEGER PRIMARY KEY, 
    age INTEGER
);
```

### Inserting data

[Inserting data](https://www.khanacademy.org/computer-programming/sql-inserting-values-in-tables/5382515271532544)

```sql
INSERT INTO customers VALUES (73, "Brian", 33);
```

[Inseting data for named columns](https://www.khanacademy.org/computer-programming/sql-inserting-values-in-tables/5382515271532544)

```sql
INSERT INTO customers (name, age) VALUES ("Brian", 33);
```

### Querying Data

[Select everything](https://www.khanacademy.org/computer-programming/sql-selecting-rows/5163767537205248)

```sql
SELECT * FROM customers;
```

[Select specific columns](https://www.khanacademy.org/computer-programming/sql-selecting-rows/5163767537205248)

```sql
SELECT name, age FROM customers;
```

[Filter with condition](https://www.khanacademy.org/computer-programming/sql-selecting-with-where-conditions/6216095996444672)

```sql
SELECT * FROM customers 
WHERE age > 21;
```

[Filter with multiple conditions](https://www.khanacademy.org/computer-programming/sql-selecting-with-where-conditions/6216095996444672)

```sql
SELECT * FROM customers 
WHERE age < 21 AND state = "NY";
```
[Filter with IN](https://www.khanacademy.org/computer-programming/sql-filter-with-in/6529475600842752)

```sql
SELECT * FROM customers 
WHERE plan IN ("free", "basic");
```

[Order results](https://www.khanacademy.org/computer-programming/sql-select-with-order-by/6218182226477056)

```sql
SELECT * FROM customers
WHERE age > 21 ORDER BY age DESC;
```

[Transform with CASE](https://www.khanacademy.org/computer-programming/sql-transform-select-results-with-case/5100246984163328)

```sql
SELECT name, CASE WHEN age > 18 THEN "adult" ELSE "minor" END "type" FROM customers;
```

### Aggregating data

[Aggregate functions](https://www.khanacademy.org/computer-programming/sql-select-with-aggregate-functions/4797964233080832)

```sql
SELECT MAX(age) FROM customers;
```

[Grouping data](https://www.khanacademy.org/computer-programming/sql-grouping-select-results-with-group-by/5520132919132160)

```sql
SELECT gender, COUNT(*) FROM students GROUP BY gender;
```

### Updating and deleting data

[Updating data](https://www.khanacademy.org/computer-programming/sql-update-and-delete/5559819222253568)

```sql
UPDATE customers SET age = 44 WHERE id = 73;
```

[Deleting data](https://www.khanacademy.org/computer-programming/sql-update-and-delete/5559819222253568)

```sql
DELETE FROM customers WHERE id = 73;
```

### Joining related tables

[Inner Join](https://www.khanacademy.org/computer-programming/sql-join-on-tables/5409956539006976)

```sql
SELECT customers.name, orders.time FROM customers 
JOIN orders ON customers.id = order.customer_id;
```

[Outer Join](https://www.khanacademy.org/computer-programming/sql-join-on-tables/5409956539006976)

```sql
SELECT customers.name, orders.item FROM customers
LEFT OUTER JOIN orders ON customers.id = orders.customer_id;
```