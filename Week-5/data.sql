-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: website
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `follower_count` int unsigned NOT NULL DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'test2','test','test',0,'2024-04-29 15:36:32'),(2,'Emily Johnson','user2','password2',14,'2024-05-02 02:00:00'),(3,'Charles Smith','user3','password3',14,'2024-05-03 03:00:00'),(4,'Samantha Brown','user4','password4',7,'2024-05-04 04:00:00'),(5,'Natalie Davis','user5','password4',14,'2024-05-05 05:00:00');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `content` varchar(255) NOT NULL,
  `like_count` int unsigned NOT NULL DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,4,'留言內容38',48,'2024-04-29 13:22:19'),(2,3,'留言內容62',10,'2024-04-29 19:59:19'),(3,1,'留言內容15',24,'2024-04-29 21:05:19'),(4,3,'留言內容21',26,'2024-04-29 20:24:19'),(5,2,'留言內容99',2,'2024-04-29 11:03:19'),(6,3,'留言內容35',12,'2024-04-29 18:23:19'),(7,5,'留言內容97',60,'2024-04-29 10:34:19'),(8,3,'留言內容0',54,'2024-04-29 20:25:19'),(9,4,'留言內容0',11,'2024-04-29 18:02:19'),(10,3,'留言內容12',66,'2024-04-30 00:32:19'),(11,5,'留言內容28',27,'2024-04-29 17:20:19'),(12,2,'留言內容42',71,'2024-04-29 14:12:19'),(13,5,'留言內容85',23,'2024-04-29 18:56:19'),(14,5,'留言內容96',79,'2024-04-29 10:24:19'),(15,1,'留言內容86',51,'2024-04-30 00:48:19'),(16,5,'留言內容57',83,'2024-04-29 15:55:19'),(17,5,'留言內容89',58,'2024-04-29 12:36:19'),(18,2,'留言內容96',66,'2024-04-29 15:25:19'),(19,1,'留言內容8',84,'2024-04-30 00:45:19'),(20,5,'留言內容70',37,'2024-04-29 21:24:19'),(21,2,'留言內容8',82,'2024-04-29 23:39:19'),(22,4,'留言內容83',67,'2024-04-29 22:54:19'),(23,3,'留言內容16',90,'2024-04-30 01:18:19'),(24,1,'留言內容60',10,'2024-04-29 20:18:19'),(25,1,'留言內容86',46,'2024-04-29 20:49:19'),(26,1,'留言內容38',12,'2024-04-29 16:50:19'),(27,1,'留言內容40',81,'2024-04-29 23:11:19'),(28,3,'留言內容42',85,'2024-04-29 08:58:19'),(29,2,'留言內容52',93,'2024-04-29 10:48:19'),(30,5,'留言內容74',15,'2024-04-29 17:43:19'),(31,1,'留言內容80',18,'2024-04-29 17:10:19'),(32,5,'留言內容6',18,'2024-04-29 21:25:19'),(33,4,'留言內容14',69,'2024-04-29 09:33:19'),(34,1,'留言內容0',91,'2024-04-29 18:04:19'),(35,1,'留言內容64',40,'2024-04-29 10:01:19'),(36,4,'留言內容83',56,'2024-04-29 14:35:19'),(37,1,'留言內容3',86,'2024-04-29 12:27:19'),(38,4,'留言內容47',57,'2024-04-29 16:48:19'),(39,4,'留言內容11',63,'2024-04-29 22:59:19'),(40,2,'留言內容32',7,'2024-04-29 15:25:19'),(41,4,'留言內容51',74,'2024-04-29 12:16:19'),(42,5,'留言內容88',88,'2024-04-29 21:59:19'),(43,2,'留言內容12',41,'2024-04-29 20:16:19'),(44,1,'留言內容34',51,'2024-04-29 18:07:19'),(45,3,'留言內容12',19,'2024-04-29 18:54:19'),(46,5,'留言內容34',26,'2024-04-29 13:28:19'),(47,3,'留言內容70',48,'2024-04-29 13:45:19'),(48,1,'留言內容45',27,'2024-04-29 09:17:19'),(49,1,'留言內容99',91,'2024-04-29 18:37:19'),(50,4,'留言內容44',44,'2024-04-30 00:11:19');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-29 17:53:03
