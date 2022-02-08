--oblast
DROP TABLE IF EXISTS oblast cascade;
CREATE TABLE oblast(
	id serial primary key,
	oblast varchar(100) UNIQUE
);

--pouzivatelia
DROP TABLE IF EXISTS pouzivatelia cascade;
CREATE TABLE pouzivatelia(
	id serial primary key,
	email varchar(100) UNIQUE,
	heslo varchar(100) NOT NULL,
	is_admin boolean NOT NULL
);

--zamestnanci
DROP TABLE IF EXISTS zamestnanci cascade;
CREATE TABLE zamestnanci(
	id serial primary key,
	meno varchar(100) NOT NULL,
	priezvisko varchar(100) NOT NULL,
	pozicia varchar(100) NOT NULL,
	fa varchar(30) NOT NULL,
	oblast varchar REFERENCES oblast(oblast),
	osobne_Cislo integer NOT NULL,
	karticka integer NOT NULL,
	VZV varchar(50),
	datum_Vydania date,
	kava boolean NOT NULL,
	bufetka varchar(50),
	ZFsatna varchar(50),
	ZFskrinka integer,
	winnex integer
);

--skolenia
DROP TABLE IF EXISTS skolenia cascade;
CREATE TABLE skolenia(
	id serial primary key,
	nazov varchar(70) NOT NULL,
	kod_skolenia varchar(20) NOT NULL,
	dlzka_platnosti integer NOT NULL, 
	oblast varchar REFERENCES oblast(oblast),
	popis text,
	UNIQUE(kod_skolenia)
);


--zamestnanci_skolenia
DROP TABLE IF EXISTS zamestnanci_skolenia cascade;
CREATE TABLE zamestnanci_skolenia(
	id_zamestnanca integer REFERENCES zamestnanci(id) ON DELETE CASCADE,
	id_skolenia integer REFERENCES skolenia(id) ON DELETE CASCADE,
	datum_absolvovania date,
	UNIQUE(id_zamestnanca, id_skolenia)
);

--zamestnanci_skolenia
DROP TABLE IF EXISTS pouzivatelia_oblast cascade;
CREATE TABLE pouzivatelia_oblast(
	id_pouzivatela integer REFERENCES pouzivatelia(id) ON DELETE CASCADE,
	id_oblast integer REFERENCES oblast(id) ON DELETE CASCADE
);


CREATE OR REPLACE PROCEDURE clean_oblast()
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
DELETE FROM oblast WHERE oblast IN (SELECT oblast.oblast  FROM oblast LEFT JOIN zamestnanci ON oblast.oblast = zamestnanci.oblast LEFT JOIN skolenia ON oblast.oblast = skolenia.oblast WHERE (zamestnanci.oblast is null AND skolenia.oblast is null) 
);
COMMIT;
END $$;
