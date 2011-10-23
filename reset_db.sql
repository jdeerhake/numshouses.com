drop table if exists continents;

create table continents (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  points INT NOT NULL,
  admin VARCHAR(100),
  updated_at timestamp default now()
) type=innodb;

insert into continents(name, points, admin) values
  ('africa', 0, 1),
  ('antarctica', 0, 1),
  ('asia', 0, 1),
  ('australia', 0, 1),
  ('europe', 0, 1),
  ('north_america', 0, 1),
  ('south_america', 0, 1);

drop table if exists users;

create table users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  password VARCHAR(100) NOT NULL
) type=innodb;

insert into users(name, password) values('admin', SHA1('test'));

