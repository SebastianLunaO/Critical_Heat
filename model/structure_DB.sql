DROP DATABASE Critical_Heat;
CREATE DATABASE Critical_Heat;
USE Critical_Heat;

CREATE TABLE GameTag(
    tag_id SMALLINT NOT NULL,
    tag_name VARCHAR(25),
    CONSTRAINT GAME_TAG_PK PRIMARY KEY (tag_id)
);

CREATE TABLE Games(
    game_id VARCHAR(255) NOT NULL DEFAULT '54ccb0c96906ac48ab90fd21cc22ffab0de1cc0f5809681446964a1bde88af7a',
    title VARCHAR(60) NOT NULL DEFAULT 'Game Deleted',
    genre VARCHAR(60) ,
    developer VARCHAR(60),
    publisher VARCHAR(60), 
    release_date DATE ,
    descp MEDIUMTEXT,
    cover_ref VARCHAR(255),
    Base_price DECIMAL(8,2),
    CONSTRAINT GAMES_PK PRIMARY KEY (game_id)
);

CREATE TABLE GT_REL(
    game_id VARCHAR(255) NOT NULL,
    tag_id SMALLINT NOT NULL,
    CONSTRAINT GAME_TAG_RELATION_PK PRIMARY KEY (game_id,tag_id),
    CONSTRAINT GT_RELATION_GAME_FK FOREIGN KEY (game_id) REFERENCES Games(game_id),
    CONSTRAINT GT_RELATION_TAG_FK FOREIGN KEY (tag_id) REFERENCES GameTag(tag_id)
);


CREATE TABLE Platforms(
    platform_id VARCHAR(10),
    platform_name VARCHAR(30),
    CONSTRAINT PLATFORMS_PK PRIMARY KEY (platform_id)
);

CREATE TABLE GP_REL(
    game_id VARCHAR(255),
    platform_id VARCHAR(10),
    CONSTRAINT GAME_PLATFORM_PK PRIMARY KEY (game_id,platform_id),
    CONSTRAINT GP_RELATION_GAME_FK FOREIGN KEY (game_id) REFERENCES Games(game_id),
    CONSTRAINT GP_RELATION_PLATFORM_FK FOREIGN KEY (platform_id) REFERENCES Platforms(platform_id)
);

CREATE TABLE Users(
    user_id VARCHAR(255) DEFAULT '300d0e2e4530970fcfbcd6706bda49bd10316d856db3f5bf0915d2c45c8b751b',
    username VARCHAR(70) DEFAULT 'Critical_Heat_Site',
    email VARCHAR(80),
    passwd VARCHAR(40),
    profile_picture_ref VARCHAR(255),
    join_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    CONSTRAINT USER_PK PRIMARY KEY (user_id)
);

CREATE TABLE Reviews(
    review_id VARCHAR(255),
    game_id VARCHAR(255),
    user_id VARCHAR(255),
    per2pay TINYINT,
    review_title VARCHAR(100),
    review_content TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT REVIEW_PK PRIMARY KEY (review_id),
    CONSTRAINT REVIEW_USER_FK FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT REVIEW_GAME_FK FOREIGN KEY (game_id) REFERENCES Games(game_id)
);

CREATE TABLE Likes(
    review_id VARCHAR(255),
    user_id VARCHAR(255),
    CONSTRAINT LIKES_PK PRIMARY KEY (review_id,user_id),
    CONSTRAINT LIKES_REVIEW_FK FOREIGN KEY (review_id) REFERENCES Reviews(review_id),
    CONSTRAINT LIKES_USER_FK FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

