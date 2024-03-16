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

[PostgreSQL interprets " as being quotes for identifiers, ' as being quotes for strings.](https://stackoverflow.com/questions/12428496/cannot-get-simple-postgresql-insert-to-work)