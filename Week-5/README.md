# Task-2：
---
  ```sql
  -- 1. 
  create database website;
  ```
  ![Task2-1](./img/Task2-1.png)
  ```sql
  -- 2. 
  CREATE TABLE member
  (
    id BIGINT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL, 
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    follower_count INT UNSIGNED NOT NULL DEFAULT 0, 
    time DATETIME NOT NULL DEFAULT NOW()
  );
  ``` 
  ![Task2-2](./img/Task2-2.png)
# Task-3：
---
  ```sql
  -- 1
  INSERT INTO member(name, username, password) 
  VALUES("test", "test", "test");
  
  INSERT INTO member(name, username, password, follower_count, time)
  VALUES
    ("Emily Johnson", "user2", "password2", FLOOR(1 + (RAND() * 19)), "2024-05-02 02:00:00"),
    ("Charles Smith", "user3", "password3", FLOOR(1 + (RAND() * 19)), "2024-05-03 03:00:00"),
    ("Samantha Brown", "user4", "password4", FLOOR(1 + (RAND() * 19)), "2024-05-04 04:00:00"),
    ("Natalie Davis", "user5", "password4", FLOOR(1 + (RAND() * 19)), "2024-05-05 05:00:00");
  ```
  ```sql
  -- 2
  SELECT * FROM member;
  ```
  ![Task3-2](./img/Task3-2.png)
  ```sql
  -- 3
  SELECT * FROM member ORDER BY time DESC;
  ```
  ![Task3-3](./img/Task3-3.png)
  ```sql
  -- 4
  SELECT * FROM member ORDER BY time DESC LIMIT 1, 3;
  ```
  ![Task3-4](./img/Task3-4.png)
  ```sql
  -- 5
  SELECT * FROM member WHERE username="test";
  ```
  ![Task3-5](./img/Task3-5.png)
  ```sql
  -- 6
  SELECT * FROM member WHERE name LIKE "%es%";
  ```
  ![Task3-6](./img/Task3-6.png)
  ```sql
  -- 7
  SELECT * FROM member WHERE username="test" and password="test";
  ```
  ![Task3-7](./img/Task3-7.png)
  ```sql
  -- 8
  UPDATE member SET name="test2" WHERE username="test";
  ```
  ![Task3-8](./img/Task3-8.png)
# Task-4：
---
  ```sql
  -- 1
  SELECT COUNT(*) FROM member;
  ```
  ![Task4-1](./img/Task4-1.png)
  ```sql
  -- 2
  SELECT SUM(follower_count) FROM member;
  ```
  ![Task4-2](./img/Task4-2.png)
  ```sql
  -- 3
  SELECT AVG(follower_count) FROM member;
  ```
  ![Task4-3](./img/Task4-3.png)
  ```sql
  -- 4
  SELECT AVG(follower_count) AS AVG_follower_count FROM (SELECT follower_count FROM member ORDER BY follower_count DESC LIMIT 2) as Top_2_follower_count;
  ```
  ![Task4-4](./img/Task4-4.png)
# Task-5：
---
  ```sql
  -- 1
  CREATE TABLE message
  (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    content VARCHAR(255) NOT NULL,
    like_count INT UNSIGNED NOT NULL DEFAULT 0,
    time DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY(member_id) REFERENCES member(id)
  );
  ```
  ![Task5-1](./img/Task5-1.png)
  ```sql
  -- 2
  SELECT message.id, member_id, name, content, like_count, message.time FROM message INNER JOIN member ON message.member_id=member.id;
  ```
  ![Task5-2](./img/Task5-2.png)
  ```sql
  -- 3
  SELECT message.id, member_id, name, content, like_count, message.time FROM message INNER JOIN member ON message.member_id=member.id WHERE username="test";
  ```
  ![Task5-3](./img/Task5-3.png)
  ```sql
  -- 4
  SELECT AVG(like_count) FROM message INNER JOIN member ON message.member_id=member.id WHERE username="test";
  ```
  ![Task5-4](./img/Task5-4.png)
  ```sql
  -- 5
  SELECT username, AVG(like_count) FROM message INNER JOIN member ON message.member_id=member.id GROUP BY username;
  ```
  ![Task5-5](./img/Task5-5.png)

