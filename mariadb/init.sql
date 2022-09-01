ALTER DATABASE uasmash CHARACTER SET='utf8mb4' COLLATE='utf8mb4_unicode_ci';

CREATE TABLE uasmash.stages (
	stage_id INT NOT NULL AUTO_INCREMENT,
  stage_name VARCHAR(50),
  image_url VARCHAR(50),
	PRIMARY KEY(stage_id)
)
CHARACTER SET 'utf8mb4'
COLLATE 'utf8mb4_unicode_ci';

CREATE TABLE uasmash.users (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL UNIQUE,
  user_password VARCHAR(500) NOT NULL,
  PRIMARY KEY (user_id)
)
CHARACTER SET 'utf8mb4'
COLLATE 'utf8mb4_unicode_ci';

CREATE TABLE uasmash.user_keys (
	user_id INT NOT NULL,
	module_name VARCHAR(50) NOT NULL,
	key_value VARCHAR(500) UNIQUE,
	PRIMARY KEY(user_id, module_name),
	FOREIGN KEY (user_id) REFERENCES uasmash.users (user_id)
)
CHARACTER SET 'utf8mb4'
COLLATE 'utf8mb4_unicode_ci';

CREATE TABLE uasmash.stage_lists (
	user_id INT NOT NULL,
	stage_list JSON,
	PRIMARY KEY(user_id),
	FOREIGN KEY (user_id) REFERENCES uasmash.users (user_id)
)
CHARACTER SET 'utf8mb4'
COLLATE 'utf8mb4_unicode_ci';

INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Battlefield","SSBU-Battlefield.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Castle Siege","SSBU-Castle_Siege.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Final Destination","SSBU-Final_Destination.jpeg");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Frigate Orpheon","SSBU-Frigate_Orpheon.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Halberd","SSBU-Halberd.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Hollow Bastion","SSBU-Hollow_Bastion.jpeg");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Kalos Pokémon League","SSBU-Kalos_Pokémon_League.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Lylat Cruise","SSBU-Lylat_Cruise.jpeg");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Mementos","SSBU-Mementos.jpeg");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Minecraft World","SSBU-Minecraft_World.jpeg");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Northern Cave","SSBU_Northern_Cave.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Pokémon Stadium","SSBU-Pokémon_Stadium.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Pokémon Stadium 2","SSBU-Pokémon_Stadium_2.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Rainbow Cruise","SSBU-Rainbow_Cruise.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Skyloft","SSBU-Skyloft.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Small Battlefield","SSBU-Small-Battlefield.jpeg");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Smashville","SSBU-Smashville.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Spring Stadium","SSBU-Spring_Stadium.jpeg");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Town and City","SSBU-Town_and_City.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Unova Pokémon League","SSBU-Unova_Pokémon_League.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"WarioWare, Inc.","SSBU-WarioWare,_Inc..png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Wily Castle","SSBU-Wily_Castle.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Wuhu Island","SSBU-Wuhu_Island.png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Yggdrasil's Altar","SSBU-Yggdrasil'sAltar.jpeg");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Yoshi's Island","SSBU-Yoshi's_Island_(SSBB).png");
INSERT INTO uasmash.stages (stage_id,stage_name,image_url) VALUES (DEFAULT,"Yoshi's Story","SSBU-Yoshi's_Story.png");
