CREATE TABLE member
  (
    id BIGINT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL, 
    username VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,  
    time DATETIME NOT NULL DEFAULT NOW()
  );

  CREATE TABLE message
  (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    content VARCHAR(255) NOT NULL,
    time DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY(member_id) REFERENCES member(id)
  );