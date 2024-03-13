---
title: PostgreSQL
date: 2024-02-13
---

## Quickstart

Installation
```sh
$ sudo apt install postgresql
```

Become the postgres user.
```sh
$ su -l postgres
```

[Optional] Create User
```sh
$ createuser --interactive
```

[Optional] Create Database  
```sh
$ createdb DBNAME
```

Start the primary database shell.
```sh
$ psql
```

## psql shell

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

Clear shell output
```
=> \! clear
```

## Quirks with postgres

[On successful completion, an INSERT command returns a command tag of the form  `INSERT oid count`](https://www.postgresql.org/docs/current/sql-insert.html#id-1.9.3.152.7)

[PostgreSQL interprets " as being quotes for identifiers, ' as being quotes for strings.](https://stackoverflow.com/questions/12428496/cannot-get-simple-postgresql-insert-to-work)