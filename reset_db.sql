drop table continents;

create table continents (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  points INT NOT NULL,
  admin VARCHAR(100)
) type=innodb;

insert into continents(name, points) values
  ('africa', 0),
  ('antarctica', 0),
  ('asia', 0),
  ('australia', 0),
  ('europe', 0),
  ('north_america', 0),
  ('south_america', 0);

