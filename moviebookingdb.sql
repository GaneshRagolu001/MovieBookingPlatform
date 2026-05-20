CREATE DATABASE  IF NOT EXISTS `moviebookingdatabase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `moviebookingdatabase`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: moviebookingdatabase
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` bigint NOT NULL AUTO_INCREMENT,
  `booking_status` tinyint DEFAULT NULL,
  `booking_time` datetime(6) DEFAULT NULL,
  `number_of_seats` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `show_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `FKppeximswyg8m9ccft84na6wb2` (`show_id`),
  KEY `FK7udbel7q86k041591kj6lfmvw` (`user_id`),
  CONSTRAINT `FK7udbel7q86k041591kj6lfmvw` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKppeximswyg8m9ccft84na6wb2` FOREIGN KEY (`show_id`) REFERENCES `show` (`show_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,0,'2025-12-17 15:38:33.763851',2,600,1,1),(2,0,'2025-12-17 15:39:20.342657',3,900,1,2),(3,1,'2025-12-17 15:42:24.417513',2,600,1,2),(4,0,'2025-12-18 12:42:11.339002',2,600,1,1),(5,0,'2025-12-24 12:39:02.885713',2,600,1,1),(6,0,'2025-12-27 12:24:05.488858',2,600,4,1),(7,1,'2025-12-27 12:29:13.722368',3,900,4,1),(8,2,'2025-12-27 12:33:05.781831',2,500,5,1),(9,0,'2026-04-15 11:09:16.647160',3,900,6,1);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_seat_numbers`
--

DROP TABLE IF EXISTS `booking_seat_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_seat_numbers` (
  `booking_booking_id` bigint NOT NULL,
  `seat_numbers` varchar(255) DEFAULT NULL,
  KEY `FK3n3udmud1lu53mpw8emu2n5dp` (`booking_booking_id`),
  CONSTRAINT `FK3n3udmud1lu53mpw8emu2n5dp` FOREIGN KEY (`booking_booking_id`) REFERENCES `booking` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_seat_numbers`
--

LOCK TABLES `booking_seat_numbers` WRITE;
/*!40000 ALTER TABLE `booking_seat_numbers` DISABLE KEYS */;
INSERT INTO `booking_seat_numbers` VALUES (1,'D8'),(1,'D9'),(2,'C10'),(2,'C11'),(2,'C12'),(3,'E15'),(3,'E16'),(4,'G11'),(4,'G12'),(5,'G8'),(5,'G9'),(6,'E15'),(6,'E16'),(7,'G13'),(7,'G14'),(7,'G15'),(8,'F15'),(8,'F16'),(9,'E14'),(9,'E15'),(9,'E16');
/*!40000 ALTER TABLE `booking_seat_numbers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movie_id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `duration` int DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `headerimgurl` varchar(1000) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `normalimgurl` varchar(1000) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (3,'In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.',158,'Action/Fantasy','https://images2.alphacoders.com/614/thumb-1920-614769.jpg','Telugu','Bahubali','https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Baahubali_The_Beginning_poster.jpg/250px-Baahubali_The_Beginning_poster.jpg','2026-01-10'),(4,'A star-studded saga inspired by incredible true events set in the gritty criminal vein of underworld with a backdrop of Indian patriotism, featuring action sequences, Shakespearean betrayals, and tradecrafts of espionage.',214,'Action/Adventure','https://i.ytimg.com/vi/1a5nyrMtRsk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAYuekU5oRJSScEeg_WA2EX_CtOiw','Hindi','Dhurandhar','https://m.media-amazon.com/images/M/MV5BMzFiNTVkZjYtM2I3Yi00MGNjLWEyYTAtMGViNGExZmMzMGMzXkEyXkFqcGc@._V1_QL75_UY562_CR35,0,380,562_.jpg','2025-12-05'),(5,'A powerful smuggler goes head-to-head with a vengeful enemy while controlling politics and managing high-stakes confrontations. A public apology sparks a tense showdown, culminating in a challenge.',201,'Action/Crime','https://cdn.gulte.com/wp-content/uploads/2024/12/Pushpa2-Movie-Review.jpg','Telugu,Hindi,Malayalam,Kannada,Tamil','Pushpa 2: The Rule','https://m.media-amazon.com/images/M/MV5BZjllNTdiM2QtYjQ0Ni00ZGM1LWFlYmUtNWY0YjMzYWIxOTYxXkEyXkFqcGc@._V1_.jpg','2024-12-04'),(6,'After vanishing from Mumbai\'s underworld for a decade, mob boss Ojas Gambheera resurfaces seeking vengeance against rival crime lords.',154,'Action/Thriller','https://survi.in/wp-content/uploads/2025/09/OG-Movie-Review-e1758780917479.jpg','Telugu','They Call Him OG','https://static.moviecrow.com/gallery/20240902/233836-oG.jpeg','2025-09-25'),(7,'Shivaji\'s death sparks the Maratha-Mughal conflict. His son Sambhaji leads resistance against Aurangzeb\'s forces. Amid battles and intrigue, both sides face challenges in a struggle for power.',161,'Drama ','https://theraisinahills.com/wp-content/uploads/2025/02/Chhava.jpg','Hindi,Telugu','Chhaava','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0IfyAU2VKhi9idE-H29QfleuY1PmgTbmoKsk9ixU-GtYxSSLL8IUKA2wZ6x6ubTEwg7iQ&s=10','2025-02-14');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `show`
--

DROP TABLE IF EXISTS `show`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `show` (
  `show_id` bigint NOT NULL AUTO_INCREMENT,
  `price` double DEFAULT NULL,
  `show_time` datetime(6) DEFAULT NULL,
  `movie_id` bigint NOT NULL,
  `theater_id` bigint NOT NULL,
  PRIMARY KEY (`show_id`),
  KEY `FK35lhgbvyds9qmsci4xqrf3fu4` (`movie_id`),
  KEY `FK2l5f4rgl0dc7aiipved1b5m0n` (`theater_id`),
  CONSTRAINT `FK2l5f4rgl0dc7aiipved1b5m0n` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`),
  CONSTRAINT `FK35lhgbvyds9qmsci4xqrf3fu4` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `show`
--

LOCK TABLES `show` WRITE;
/*!40000 ALTER TABLE `show` DISABLE KEYS */;
INSERT INTO `show` VALUES (1,300,'2026-01-10 11:00:00.000000',3,1),(3,300,'2026-01-11 20:50:00.000000',3,1),(4,300,'2025-12-27 16:00:00.000000',4,2),(5,250,'2026-01-10 16:00:00.000000',3,3),(6,300,'2026-04-15 18:00:00.000000',4,2),(7,250,'2026-04-15 14:00:00.000000',5,1);
/*!40000 ALTER TABLE `show` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) DEFAULT NULL,
  `student_rollno` int DEFAULT NULL,
  `student_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'ganesh',20,'Parvathipuram'),(2,'ganesh',20,'Parvathipuram'),(3,'ganesh',20,'Parvathipuram'),(4,'ganesh',20,'Parvathipuram'),(5,'ganesh',20,'Parvathipuram'),(6,'ganesh',20,'Parvathipuram');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theater`
--

DROP TABLE IF EXISTS `theater`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theater` (
  `theater_id` bigint NOT NULL AUTO_INCREMENT,
  `theater_capacity` int DEFAULT NULL,
  `theater_location` varchar(255) DEFAULT NULL,
  `theater_name` varchar(255) DEFAULT NULL,
  `theater_screen_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`theater_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theater`
--

LOCK TABLES `theater` WRITE;
/*!40000 ALTER TABLE `theater` DISABLE KEYS */;
INSERT INTO `theater` VALUES (1,250,'Hyderabad','Prime Cinemas','IMAX'),(2,300,'Ludhiana','PVR Friends','IMAX'),(3,250,'Ludhiana','GRD Cinemasd','IMAX');
/*!40000 ALTER TABLE `theater` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_user_id` bigint NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FK5gikiw021w6y16a8t5vjwqwyj` (`user_user_id`),
  CONSTRAINT `FK5gikiw021w6y16a8t5vjwqwyj` FOREIGN KEY (`user_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,'ROLE_USER'),(1,'ROLE_ADMIN'),(2,'ROLE_USER'),(3,'ROLE_USER'),(4,'ROLE_USER'),(5,'ROLE_USER');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ganesh@gmail.com','$2a$12$IYbRPJFuyvhWAo9XJzp2uO/PtjmSL/OBQ/7p/aoe3IF/06MfjH0Du','ganesh'),(2,'jaswanth@gmail.com','$2a$12$PRqaysBsn3Fn7a99EnbtsuOt9YwkHGry168MkrAgjxQBOI/QwyxIi','jaswanth'),(3,'ansh@gmail.com','$2a$12$JEq9ROiDzVRZdqotu4wwYuDrIt5uOFyvE2YJeWw.vQFnuDN4Zail2','ansh'),(4,'Rahul@gmail.com','$2a$12$BCFUV2XpoOtskv7c11MKHOz5oY8PZ1QdjEa46Ay/zXpEpJPdJ0Bw6','Rahul'),(5,'vishnu@gmail.com','$2a$12$o67yCa.WDfeZFdOtSlE/e.AqjRc2.bOk6ifFESW/3TI.tibsUhQ8.','vishnu');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-15 21:56:13
