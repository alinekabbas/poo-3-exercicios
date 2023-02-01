-- Active: 1675262907922@@127.0.0.1@3306
CREATE TABLE cars (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    make TEXT NOT NULL,
	model TEXT UNIQUE NOT NULL,
    color TEXT NOT NULL,
    year INTEGER NOT NULL
);

INSERT INTO cars (id, make, model, color, year)
VALUES
    ("c001", "Fiat", "Argo", "prata", 2020),
    ("c002", "VW", "Gol", "preto", 2021);

SELECT * FROM cars;