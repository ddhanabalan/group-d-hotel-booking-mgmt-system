-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 3.25.100.176    Database: HOTEL
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.22.04.3

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
-- Table structure for table `BOOKING_STAT`
--

DROP TABLE IF EXISTS `BOOKING_STAT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BOOKING_STAT` (
  `PROPERTY_ID` int NOT NULL,
  `ROOM_CAT` varchar(45) NOT NULL,
  `BOOKED` int DEFAULT '0',
  `CAPACITY` int NOT NULL,
  KEY `PROPERTY_ID` (`PROPERTY_ID`),
  CONSTRAINT `BOOKING_STAT_ibfk_1` FOREIGN KEY (`PROPERTY_ID`) REFERENCES `HOTELS` (`PROPERTY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOKING_STAT`
--

LOCK TABLES `BOOKING_STAT` WRITE;
/*!40000 ALTER TABLE `BOOKING_STAT` DISABLE KEYS */;
INSERT INTO `BOOKING_STAT` VALUES (16558,'1',0,19),(16558,'2',0,22),(16558,'3',0,8),(16558,'4',0,3),(16559,'1',0,30),(16559,'2',0,41),(16559,'3',0,32),(16559,'4',1,18),(16560,'1',0,24),(16560,'2',1,34),(16560,'3',0,20),(16560,'4',2,10),(16561,'1',0,22),(16561,'2',0,24),(16561,'3',1,21),(16561,'4',3,10),(16562,'1',0,32),(16562,'2',0,44),(16562,'3',0,18),(16562,'4',2,7),(16563,'1',0,41),(16563,'2',0,38),(16563,'3',1,20),(16563,'4',0,18),(17558,'1',0,19),(17558,'2',1,50),(17558,'3',4,27),(17558,'4',3,6),(17559,'1',0,32),(17559,'2',1,39),(17559,'3',0,16),(17559,'4',0,14),(17560,'1',0,40),(17560,'2',1,45),(17560,'3',0,25),(17560,'4',1,13),(17561,'1',0,26),(17561,'2',0,36),(17561,'3',0,19),(17561,'4',0,4),(17562,'1',0,20),(17562,'2',0,30),(17562,'3',0,27),(17562,'4',0,6),(17563,'1',0,25),(17563,'2',0,44),(17563,'3',0,16),(17563,'4',0,19),(17564,'1',1,16),(17564,'2',0,40),(17564,'3',0,24),(17564,'4',0,17),(18558,'1',1,15),(18558,'2',0,30),(18558,'3',0,26),(18558,'4',0,20),(18559,'1',0,42),(18559,'2',0,44),(18559,'3',0,23),(18559,'4',0,19),(18560,'1',0,30),(18560,'2',1,40),(18560,'3',0,24),(18560,'4',1,15),(18561,'1',0,33),(18561,'2',0,40),(18561,'3',0,25),(18561,'4',0,9),(18562,'1',0,38),(18562,'2',0,34),(18562,'3',0,29),(18562,'4',0,20),(18563,'1',0,27),(18563,'2',0,29),(18563,'3',0,23),(18563,'4',0,18),(19558,'1',0,40),(19558,'2',0,39),(19558,'3',0,21),(19558,'4',0,7),(19559,'1',0,24),(19559,'2',0,41),(19559,'3',0,27),(19559,'4',0,3),(19560,'1',0,26),(19560,'2',0,38),(19560,'3',0,19),(19560,'4',0,16),(19561,'1',0,36),(19561,'2',0,45),(19561,'3',0,29),(19561,'4',0,7),(19562,'1',0,30),(19562,'2',0,23),(19562,'3',0,29),(19562,'4',0,14),(19563,'1',0,30),(19563,'2',0,45),(19563,'3',0,29),(19563,'4',0,6);
/*!40000 ALTER TABLE `BOOKING_STAT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HOTELS`
--

DROP TABLE IF EXISTS `HOTELS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HOTELS` (
  `PROPERTY_ID` int NOT NULL,
  `PROPERTY_NAME` varchar(45) NOT NULL,
  `CATEGORY` varchar(45) NOT NULL,
  `CITY` varchar(45) NOT NULL,
  `RT1_COUNT` int NOT NULL,
  `RT2_COUNT` int NOT NULL,
  `RT3_COUNT` int NOT NULL,
  `RT4_COUNT` int NOT NULL,
  `RT1_COST` decimal(7,2) NOT NULL,
  `RT2_COST` decimal(7,2) NOT NULL,
  `RT3_COST` decimal(7,2) NOT NULL,
  `RT4_COST` decimal(7,2) NOT NULL,
  PRIMARY KEY (`PROPERTY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HOTELS`
--

LOCK TABLES `HOTELS` WRITE;
/*!40000 ALTER TABLE `HOTELS` DISABLE KEYS */;
INSERT INTO `HOTELS` VALUES (16558,'Atliq Grands','Luxury','Delhi',19,22,8,3,1000.00,2000.00,3000.00,4000.00),(16559,'Atliq Exotica','Luxury','Mumbai',30,41,32,18,1000.00,2000.00,3000.00,4000.00),(16560,'Atliq City','Business','Delhi',24,34,20,10,1000.00,2000.00,3000.00,4000.00),(16561,'Atliq Blu','Luxury','Delhi',22,24,21,10,1000.00,2000.00,3000.00,4500.00),(16562,'Atliq Bay','Luxury','Delhi',32,44,18,7,1000.00,2000.00,3000.00,4000.00),(16563,'Atliq Palace','Business','Delhi',41,38,20,18,1000.00,2000.00,3000.00,4000.00),(17558,'Atliq Grands','Luxury','Mumbai',19,50,27,6,1000.00,2000.00,3000.00,4000.00),(17559,'Atliq Exotica','Luxury','Mumbai',32,39,16,14,1000.00,2000.00,3000.00,4000.00),(17560,'Atliq City','Business','Mumbai',40,45,25,13,1002.00,2000.00,3000.00,4000.00),(17561,'Atliq Blu','Luxury','Mumbai',26,36,19,4,1000.00,2000.00,3000.00,4000.00),(17562,'Atliq Bay','Luxury','Mumbai',20,30,27,6,1000.00,2000.00,3000.00,4000.00),(17563,'Atliq Palace','Business','Mumbai',25,44,16,19,1000.00,2000.00,3000.00,4000.00),(17564,'Atliq Seasons','Business','Mumbai',16,40,24,17,1000.00,2000.00,3000.00,4000.00),(18558,'Atliq Grands','Luxury','Hyderabad',15,30,26,20,1000.00,2000.00,3000.00,4000.00),(18559,'Atliq Exotica','Luxury','Hyderabad',42,44,23,19,1000.00,2000.00,3000.00,4000.00),(18560,'Atliq City','Business','Hyderabad',30,40,24,15,1000.00,2000.00,3000.00,4000.00),(18561,'Atliq Blu','Luxury','Hyderabad',33,40,25,9,1000.00,2000.00,3000.00,4000.00),(18562,'Atliq Bay','Luxury','Hyderabad',38,34,29,20,1000.00,2000.00,3000.00,4000.00),(18563,'Atliq Palace','Business','Hyderabad',27,29,23,18,1000.00,2000.00,3000.00,4000.00),(19558,'Atliq Grands','Luxury','Bangalore',40,39,21,7,1000.00,2000.00,3000.00,4000.00),(19559,'Atliq Exotica','Luxury','Bangalore',24,41,27,3,1000.00,2000.00,3000.00,4000.00),(19560,'Atliq City','Business','Bangalore',26,38,19,16,1000.00,2000.00,3000.00,4000.00),(19561,'Atliq Blu','Luxury','Bangalore',36,45,29,7,1000.00,2000.00,3000.00,4000.00),(19562,'Atliq Bay','Luxury','Bangalore',30,23,29,7,1000.00,2000.00,3000.00,4000.00),(19563,'Atliq Palace','Luxury','Bangalore',30,45,29,6,1000.00,2000.00,3000.00,4000.00);
/*!40000 ALTER TABLE `HOTELS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MANAGER`
--

DROP TABLE IF EXISTS `MANAGER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MANAGER` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(45) NOT NULL,
  `PASSWORD` varchar(45) NOT NULL,
  `PROPERTY_ID` int NOT NULL,
  `EMAIL` varchar(200) NOT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USERNAME_UNIQUE` (`USERNAME`),
  UNIQUE KEY `PROPERTY_ID_UNIQUE` (`PROPERTY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MANAGER`
--

LOCK TABLES `MANAGER` WRITE;
/*!40000 ALTER TABLE `MANAGER` DISABLE KEYS */;
INSERT INTO `MANAGER` VALUES (1,'mngr1','password',16560,'mngr1@mail.com'),(2,'mngr12','password',16561,'mngr12@mail.com'),(3,'mngr2','password',16562,'mngr2@gmail.com'),(4,'mngr3','password',16563,'mngr3@gmail.com'),(5,'test','test@123',16850,'test@mail.com');
/*!40000 ALTER TABLE `MANAGER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RATINGS`
--

DROP TABLE IF EXISTS `RATINGS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RATINGS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `PROPERTY_ID` int NOT NULL,
  `USER_ID` int NOT NULL,
  `RATING` int NOT NULL,
  `REVIEW` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RATINGS`
--

LOCK TABLES `RATINGS` WRITE;
/*!40000 ALTER TABLE `RATINGS` DISABLE KEYS */;
INSERT INTO `RATINGS` VALUES (1,16560,1,4,'GOOd');
/*!40000 ALTER TABLE `RATINGS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RECORDS`
--

DROP TABLE IF EXISTS `RECORDS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RECORDS` (
  `RID` int NOT NULL AUTO_INCREMENT,
  `PROPERTY_ID` int NOT NULL,
  `USER_ID` int NOT NULL,
  `ROOM_CAT` int NOT NULL,
  `BOOKING_DATE` date DEFAULT NULL,
  `CHECKIN_DATE` date NOT NULL,
  `CHECKOUT_DATE` date NOT NULL,
  `GUEST_COUNT` int NOT NULL,
  `AMOUNT` decimal(9,2) NOT NULL,
  `CANCELLATION` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`RID`),
  UNIQUE KEY `RID_UNIQUE` (`RID`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RECORDS`
--

LOCK TABLES `RECORDS` WRITE;
/*!40000 ALTER TABLE `RECORDS` DISABLE KEYS */;
INSERT INTO `RECORDS` VALUES (2,16560,1,3,'2024-05-22','2024-06-04','2024-06-06',4,5400.00,1),(5,16560,1,3,'2024-05-22','2024-06-02','2024-06-03',4,5600.00,1),(6,16560,13,3,'2024-05-22','2024-06-04','2024-06-07',4,8400.00,0),(7,16560,13,3,'2024-05-22','2024-06-07','2024-06-09',4,5400.00,1),(8,16560,17,3,'2024-05-22','2024-06-03','2024-06-06',4,590.00,1),(10,16560,1,2,'2024-05-05','2024-06-04','2024-06-06',4,5400.00,0),(11,17559,13,2,'2024-07-23','2024-07-23','2024-07-24',4,2000.00,0),(12,17558,13,4,'2024-07-23','2024-07-26','2024-07-27',5,4000.00,1),(13,17558,13,4,'2024-07-23','2024-07-26','2024-07-27',5,4000.00,0),(15,17558,13,4,'2024-07-23','2024-07-23','2024-07-24',2,4000.00,0),(16,16558,13,1,'2024-07-23','2024-07-24','2024-07-25',5,1000.00,0),(17,16558,13,1,'2024-07-23','2024-07-24','2024-07-25',5,1000.00,0),(18,16558,13,1,'2024-07-24','2024-07-24','2024-07-25',4,1000.00,0),(19,16558,13,1,'2024-07-24','2024-07-24','2024-07-25',1,1000.00,0),(20,17560,13,3,'2024-07-24','2024-07-24','2024-07-25',1,3000.00,0),(21,17558,13,2,'2024-07-24','2024-07-24','2024-07-25',1,2000.00,0),(22,16561,13,4,'2024-07-24','2024-07-25','2024-07-30',4,4000.00,0),(23,16561,13,4,'2024-07-24','2024-07-25','2024-07-30',1,4000.00,0),(24,17558,13,3,'2024-07-24','2024-07-24','2024-07-27',4,9000.00,0),(25,17558,13,3,'2024-07-24','2024-07-24','2024-07-27',3,9000.00,0),(26,17560,13,4,'2024-07-24','2024-07-25','2024-07-26',1,4000.00,0),(27,18560,13,3,'2024-07-24','2024-07-24','2024-07-25',3,3000.00,1),(28,17560,21,2,'2024-07-24','2024-07-25','2024-07-26',1,2000.00,0),(29,18561,21,4,'2024-07-24','2024-07-27','2024-07-28',1,4000.00,1),(30,16559,21,4,'2024-07-24','2024-07-28','2024-07-30',1,8000.00,0),(31,16560,1,3,'2024-07-25','2024-07-24','2024-07-25',4,5400.00,0),(32,16560,1,3,'2024-07-25','2024-07-24','2024-07-25',4,5400.00,0),(33,16560,1,3,'2024-07-25','2024-07-24','2024-07-25',4,5400.00,0),(34,16562,21,4,'2024-07-25','2024-07-27','2024-07-31',2,16000.00,0),(35,18558,18,1,'2024-07-25','2024-07-17','2024-07-25',3,8000.00,0),(36,16561,21,4,'2024-07-25','2024-07-10','2024-07-12',2,9000.00,0),(37,16561,21,3,'2024-07-25','2024-07-26','2024-07-28',1,6000.00,0),(38,16562,21,4,'2024-07-25','2024-08-10','2024-08-28',1,72000.00,0),(39,17558,18,2,'2024-07-25','2024-07-25','2024-07-30',1,10000.00,0),(40,16563,21,3,'2024-07-25','2024-07-25','2024-07-31',1,18000.00,0),(41,18560,21,2,'2024-07-26','2024-07-27','2024-07-31',3,8000.00,0),(42,17558,13,3,'2024-07-26','2024-07-26','2024-07-27',1,3000.00,0),(43,17558,13,3,'2024-07-26','2024-07-26','2024-07-27',1,3000.00,0),(44,18560,13,4,'2024-07-26','2024-07-28','2024-07-30',1,8000.00,0),(45,17564,18,1,'2024-07-27','2024-07-29','2024-07-31',2,2000.00,0),(46,16560,21,4,'2024-07-27','2024-07-28','2024-07-30',4,8000.00,0),(47,16560,21,4,'2024-07-27','2024-07-28','2024-07-30',1,8000.00,0);
/*!40000 ALTER TABLE `RECORDS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `idUSER` int NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(45) NOT NULL,
  `PASSWORD` varchar(45) NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `EMAIL` varchar(45) NOT NULL,
  `ADDRESS` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idUSER`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,'aasif','password','Aasif','aasifrafeeck@test.com','chicago street'),(11,'manu','grev','berbeb','evrerve','evre'),(13,'test','password','styl','test@mail.com','some address'),(15,'new_user','password','user123','aasifrafeeck519@gmail.com','some address'),(16,'aaasif','password','aasif','test123@mail.com','uygboruyco'),(17,'user12','password','aasif','eriuepiv@gmail.com','iuhpeiurg'),(18,'test1','password','styl1','test1@mail.com','some address'),(19,'test2','password','test2test','test2@mail.com','address address'),(20,'test3','password','test3test','test3@mail.com','some address'),(21,'user1','password','user user','user1@gmail.com','xyz street');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ml`
--

DROP TABLE IF EXISTS `ml`;
/*!50001 DROP VIEW IF EXISTS `ml`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ml` AS SELECT 
 1 AS `BOOKING_DATE`,
 1 AS `CHECKIN_DATE`,
 1 AS `CHECKOUT_DATE`,
 1 AS `GUEST_COUNT`,
 1 AS `ROOM_CAT`,
 1 AS `PROPERTY_NAME`,
 1 AS `CITY`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'HOTEL'
--
/*!50003 DROP PROCEDURE IF EXISTS `book_room` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `book_room`(in pid int,in uid int,in rcat int,in bdate date,in cidate date,in codate date,in gcount int,in bill decimal(10,2))
BEGIN
	insert into RECORDS(PROPERTY_ID,USER_ID,ROOM_CAT,BOOKING_DATE,CHECKIN_DATE,CHECKOUT_DATE,GUEST_COUNT,AMOUNT) 
    VALUES(pid,uid,rcat,bdate,cidate,codate,gcount,bill);
    
    update BOOKING_STAT SET BOOKED=BOOKED+1 WHERE PROPERTY_ID=pid AND ROOM_CAT=rcat;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cancel_book` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `cancel_book`(in bid int)
BEGIN
	declare pid, rc int;
    select PROPERTY_ID,ROOM_CAT into pid,rc from RECORDS WHERE RID=bid;
    UPDATE RECORDS SET CANCELLATION=1 WHERE RID=bid;
	update BOOKING_STAT SET BOOKED=BOOKED-1 WHERE PROPERTY_ID=pid AND ROOM_CAT=rc;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cities` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `cities`()
BEGIN
		SELECT DISTINCT(CITY) from HOTELS; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `city_fetch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `city_fetch`(IN TOWN VARCHAR(45))
BEGIN
	DECLARE COUNT INT;
    SELECT * FROM HOTELS WHERE CITY=TOWN;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fetch_rec` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `fetch_rec`(in PID INT)
BEGIN
	SELECT * from RECORDS WHERE PROPERTY_ID=PID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fetch_review` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `fetch_review`(IN PID INT)
BEGIN
	SELECT * FROM RATINGS WHERE PROPERTY_ID=PID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fetch_usr` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `fetch_usr`(IN UID INT)
BEGIN
	SELECT * FROM USER WHERE idUSER=UID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_bookings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_bookings`(in UID int)
BEGIN
	select * from RECORDS WHERE USER_ID= UID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_pid` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_pid`()
BEGIN
	SELECT PROPERTY_id FROM MANAGER;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `hotel_fetch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `hotel_fetch`(in hid int)
BEGIN
	SELECT ROOM_CAT,(CAPACITY-BOOKED) AS AVAILABLE FROM BOOKING_STAT WHERE (CAPACITY-BOOKED)>0 AND PROPERTY_ID=hid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `login`(IN UNAME VARCHAR(45), IN PWD VARCHAR(45))
BEGIN
	SELECT idUSER FROM USER WHERE USERNAME=UNAME AND PASSWORD=PWD;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ml_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `ml_data`(in bid int)
BEGIN
	 SELECT 
        `RECORDS`.`BOOKING_DATE` AS `BOOKING_DATE`,
        `RECORDS`.`CHECKIN_DATE` AS `CHECKIN_DATE`,
        `RECORDS`.`CHECKOUT_DATE` AS `CHECKOUT_DATE`,
        `RECORDS`.`GUEST_COUNT` AS `GUEST_COUNT`,
        `RECORDS`.`ROOM_CAT` AS `ROOM_CAT`,
        `HOTELS`.`PROPERTY_NAME` AS `PROPERTY_NAME`,
        `HOTELS`.`CITY` AS `CITY`
    FROM
        (`RECORDS`
        JOIN `HOTELS`)
    WHERE
        (`RECORDS`.`PROPERTY_ID` = `HOTELS`.`PROPERTY_ID` and 	`RECORDS`.`RID`=bid);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ml_fetch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `ml_fetch`()
BEGIN
	select * from ml;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `mngr_login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `mngr_login`(IN UNAME VARCHAR(45), IN PWD VARCHAR(45))
BEGIN
	SELECT PROPERTY_ID FROM MANAGER WHERE USERNAME=UNAME AND PASSWORD=PWD;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `mngr_signup` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `mngr_signup`(IN UNAME VARCHAR(45),IN PASSWD VARCHAR(45),IN P_ID INT, IN MAIL VARCHAR(45), OUT err VARCHAR(100))
BEGIN
DECLARE user_count INT;
    
    -- Check if username or email already exists
    SELECT COUNT(*) INTO user_count FROM MANAGER WHERE USERNAME = UNAME OR EMAIL = MAIL OR PROPERTY_ID = P_ID;
    
    IF user_count > 0 THEN
        SET err = "Manager already in exist!";
    ELSE 
        -- Insert new user
        INSERT INTO MANAGER(USERNAME, PASSWORD, PROPERTY_ID, EMAIL) VALUES (UNAME, PASSWD, P_ID, MAIL);
        SET err = "None";
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `new_user`(IN UNAME VARCHAR(45),IN PASSWD VARCHAR(45),IN ANAME VARCHAR(45), IN MAIL VARCHAR(45),IN ADDR VARCHAR(100), OUT err VARCHAR(100))
BEGIN
DECLARE user_count INT;
    
    -- Check if username or email already exists
    SELECT COUNT(*) INTO user_count FROM USER WHERE USERNAME = UNAME OR EMAIL = MAIL;
    
    IF user_count > 0 THEN
        SET err = "username or email already in use!";
    ELSE 
        -- Insert new user
        INSERT INTO USER(USERNAME, PASSWORD, NAME, EMAIL, ADDRESS) VALUES (UNAME, PASSWD, ANAME, MAIL, ADDR);
        SET err = "None";
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `propertys` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `propertys`()
BEGIN
	SELECT DISTINCT(PROPERTY_NAME) from HOTELS; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reset` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `reset`()
BEGIN
    -- Declare all variables and handlers at the start
    DECLARE done INT DEFAULT FALSE;
    DECLARE PID INT;
    DECLARE RCAT INT;

    -- Declare the cursor to select events happening today
    DECLARE event_cursor CURSOR FOR
        SELECT PROPERTY_ID, ROOM_CAT FROM RECORDS WHERE CHECKOUT_DATE = CURDATE();

    -- Declare a handler for the end of the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open the cursor
    OPEN event_cursor;

    -- Loop through the records
    read_loop: LOOP
        -- Fetch the next row into the variables
        FETCH event_cursor INTO PID, RCAT;

        -- Check if the cursor has reached the end
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Update the BOOKING_STAT table where PROPERTY_ID and ROOM_CAT match
        UPDATE BOOKING_STAT 
        SET BOOKED = BOOKED - 1 
        WHERE PROPERTY_ID = PID AND ROOM_CAT = RCAT;
    END LOOP;

    -- Close the cursor
    CLOSE event_cursor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_count_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `room_count_update`(IN P_ID INT, IN RT INT, IN NUM INT)
BEGIN
	SET @sql = CONCAT('UPDATE HOTELS SET RT', RT, '_COUNT =', NUM,' WHERE PROPERTY_ID =', P_ID);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    UPDATE BOOKING_STAT SET CAPACITY = NUM WHERE PROPERTY_ID=P_ID AND ROOM_CAT=RT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_price_update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `room_price_update`(IN P_ID INT, IN RT INT, IN AMT DECIMAL(7,2))
BEGIN
	SET @sql = CONCAT('UPDATE HOTELS SET RT', RT, '_COST =', AMT,' WHERE PROPERTY_ID =', P_ID);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `test` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `test`()
BEGIN
	select * from USER;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `ml`
--

/*!50001 DROP VIEW IF EXISTS `ml`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `ml` AS select `RECORDS`.`BOOKING_DATE` AS `BOOKING_DATE`,`RECORDS`.`CHECKIN_DATE` AS `CHECKIN_DATE`,`RECORDS`.`CHECKOUT_DATE` AS `CHECKOUT_DATE`,`RECORDS`.`GUEST_COUNT` AS `GUEST_COUNT`,`RECORDS`.`ROOM_CAT` AS `ROOM_CAT`,`HOTELS`.`PROPERTY_NAME` AS `PROPERTY_NAME`,`HOTELS`.`CITY` AS `CITY` from (`RECORDS` join `HOTELS`) where (`RECORDS`.`PROPERTY_ID` = `HOTELS`.`PROPERTY_ID`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-27 17:59:22
