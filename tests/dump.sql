-- MySQL dump 10.17  Distrib 10.3.22-MariaDB, for debian-linux-gnueabihf (armv8l)
--
-- Host: localhost    Database: exit_db
-- ------------------------------------------------------
-- Server version	10.3.22-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `exit_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `exit_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `exit_db`;

--
-- Table structure for table `Area_of_expertise`
--

DROP TABLE IF EXISTS `Area_of_expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Area_of_expertise` (
  `expertise_id` int(11) NOT NULL AUTO_INCREMENT,
  `expertise_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`expertise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Area_of_expertise`
--

LOCK TABLES `Area_of_expertise` WRITE;
/*!40000 ALTER TABLE `Area_of_expertise` DISABLE KEYS */;
INSERT INTO `Area_of_expertise` VALUES (2,'Network'),(3,'Network'),(4,'Network');
/*!40000 ALTER TABLE `Area_of_expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Budget_year`
--

DROP TABLE IF EXISTS `Budget_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Budget_year` (
  `total_tutoring_hours` int(11) DEFAULT NULL,
  `factor_1` double DEFAULT NULL,
  `factor_2` double DEFAULT NULL,
  `factor_3` double DEFAULT NULL,
  `factor_4` double DEFAULT NULL,
  `factor_5` double DEFAULT NULL,
  `bachelor_hours_supervisor` int(11) DEFAULT NULL,
  `bachelor_hours_examiner` int(11) DEFAULT NULL,
  `master_hours_examiner` int(11) DEFAULT NULL,
  `master_hours_supervisor` int(11) DEFAULT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Budget_year`
--

LOCK TABLES `Budget_year` WRITE;
/*!40000 ALTER TABLE `Budget_year` DISABLE KEYS */;
INSERT INTO `Budget_year` VALUES (300,1.5,1.6,1.7,1.8,2.7,200,200,100,100,2019),(300,1.6,1.7,1.8,1.8,2.7,200,200,100,100,2020),(500,2,4,2,4,2,13,13,100,400,2021);
/*!40000 ALTER TABLE `Budget_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Company`
--

DROP TABLE IF EXISTS `Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Company` (
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
INSERT INTO `Company` VALUES ('Test AB','Testgatan 12, 123 45','076 12345',1),('test','testitest','test some moar',5),('testföretaget','test','1234565',13),('testföretaget','test','1234565',14),('testförefdataget','tesasdt','1sdf234565',15),('','','',17),('','','',18),('Test AB','Testvägen 7','46238872',19),('test ab','hejväg 7 ','34235235',20),('ha ab','hjs 8','7476638',21),('Test AB','test 7','84836664',22),('a','a','12',25),('jd','kd','7348',26),('Testföretag','Testgatan 1234','+46123456778',27),('Testföretag','Testgatan 1234','+46123456778',28),('Testföretag','Testgatan 1234','+46123456778',29),('KTH','valhallavägen 81','213423453423',30),('hej','hej','736',31),('s','s','213',32);
/*!40000 ALTER TABLE `Company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Degree_project`
--

DROP TABLE IF EXISTS `Degree_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Degree_project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `number_of_students` int(11) DEFAULT NULL,
  `credits` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `in_progress` tinyint(4) DEFAULT NULL,
  `out_of_date` tinyint(4) DEFAULT NULL,
  `all_info_specified` tinyint(4) DEFAULT NULL,
  `company` int(11) DEFAULT NULL,
  `company_contact` int(11) DEFAULT NULL,
  `project_description` varchar(1024) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `company_idx` (`company`),
  CONSTRAINT `company` FOREIGN KEY (`company`) REFERENCES `Company` (`company_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Degree_project`
--

LOCK TABLES `Degree_project` WRITE;
/*!40000 ALTER TABLE `Degree_project` DISABLE KEYS */;
INSERT INTO `Degree_project` VALUES (2,2,15,'2015-01-20','2008-06-20',1,0,1,1,2,'This is a dummy project',''),(3,2,15,'2020-01-20','2020-06-04',1,0,1,NULL,NULL,'This is another dummy project',''),(4,1,15,'2020-01-05','2020-06-01',1,0,1,NULL,1,'testprojekt',''),(5,1,15,'2020-01-05','2020-06-01',1,0,1,13,1,'testprojekt',''),(6,1,15,'2020-01-05','2020-06-01',1,0,1,14,1,'testprojekt',''),(7,1,15,'2020-01-05','2020-06-01',1,0,1,15,1,'testprojekt',''),(8,0,0,'2015-01-01','2020-01-01',NULL,NULL,NULL,17,NULL,'',''),(9,0,0,'2015-01-01','2020-01-01',NULL,NULL,NULL,18,NULL,'',''),(10,2,15,'2020-03-02','2020-03-09',NULL,NULL,NULL,NULL,NULL,'Test from fronend','Test Title'),(11,23,123,'2020-03-02','2020-03-02',NULL,NULL,NULL,NULL,NULL,'HEj då asfdas','HEllo'),(12,2,13,'2020-03-02','2020-03-02',NULL,NULL,NULL,NULL,NULL,'das','HEk'),(13,2,30,'2020-03-09','2020-05-30',NULL,NULL,NULL,NULL,NULL,'Test for the test','Testing a test'),(14,2,30,'2020-03-09','2020-05-30',NULL,NULL,NULL,19,NULL,'Test for the test','Testing a test'),(15,3,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a project','Project'),(16,2,30,'2020-03-09','2020-04-01',NULL,NULL,NULL,NULL,NULL,'Testing','Test'),(17,2,30,'2020-03-09','2020-03-31',NULL,NULL,NULL,NULL,NULL,'TYest','Testing'),(18,2,30,'2020-03-09','2020-03-31',NULL,NULL,NULL,NULL,NULL,'Test 2 Company','Test 2'),(19,1,1,'2020-03-09','2020-03-09',NULL,NULL,NULL,25,NULL,'a','a'),(20,2,15,'2020-03-09','2020-03-09',NULL,NULL,NULL,26,NULL,'hej','Test'),(24,2,15,'2020-03-11','2020-03-30',NULL,NULL,NULL,30,NULL,'Migration','Test'),(25,1,15,'2020-03-11','2020-03-18',NULL,NULL,NULL,31,NULL,'hej','Test'),(26,1,15,'2020-03-11','2020-03-18',NULL,NULL,NULL,32,NULL,'hej','Testing');
/*!40000 ALTER TABLE `Degree_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Expertise`
--

DROP TABLE IF EXISTS `Expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Expertise` (
  `user_id` int(11) NOT NULL,
  `expertise_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `expertise_id_idx` (`expertise_id`),
  CONSTRAINT `expertise_id` FOREIGN KEY (`expertise_id`) REFERENCES `Area_of_expertise` (`expertise_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Expertise`
--

LOCK TABLES `Expertise` WRITE;
/*!40000 ALTER TABLE `Expertise` DISABLE KEYS */;
INSERT INTO `Expertise` VALUES (1,2);
/*!40000 ALTER TABLE `Expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_project`
--

DROP TABLE IF EXISTS `Student_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Student_project` (
  `degree_project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_role_id` int(11) NOT NULL,
  KEY `user_id_idx` (`user_id`),
  KEY `degree_project_id` (`degree_project_id`),
  CONSTRAINT `Student_project_ibfk_1` FOREIGN KEY (`degree_project_id`) REFERENCES `Degree_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_project`
--

LOCK TABLES `Student_project` WRITE;
/*!40000 ALTER TABLE `Student_project` DISABLE KEYS */;
INSERT INTO `Student_project` VALUES (2,1,3),(2,2,1),(3,2,1),(20,2,2),(20,2,2),(20,2,2),(24,1,1),(24,1,2),(24,20,3),(24,21,3),(25,1,1),(25,1,2),(25,22,3),(24,2,2),(26,1,1),(26,1,2),(26,23,3);
/*!40000 ALTER TABLE `Student_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `user_type_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `kth_username` varchar(32) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'hej','hej','hej',1,'hej',NULL),(2,'ldsf@gmail.com','tets','Testson',2,'ldsf@gmail.com','23445'),(4,'test','test',NULL,3,'test',NULL),(4,'hej','Hej',NULL,4,'hej',NULL),(4,'test','test',NULL,5,'test',NULL),(4,'hej','hej',NULL,6,'hej',NULL),(4,'test','test',NULL,7,'test',NULL),(4,'test2','test2',NULL,8,'test2',NULL),(4,'test','test',NULL,9,'test',NULL),(4,'a','a',NULL,10,'a',NULL),(4,'a','aa',NULL,11,'a',NULL),(4,'hej','Hej',NULL,12,'hej',NULL),(4,'sd','sdfa',NULL,13,'sd',NULL),(4,'stud1@kth.se','Student 1',NULL,14,'stud1@kth.se',NULL),(4,'stud2@kth.se','Student 2',NULL,15,'stud2@kth.se',NULL),(4,'stud1@kth.se','Student 1',NULL,16,'stud1@kth.se',NULL),(4,'stud2@kth.se','Student 2',NULL,17,'stud2@kth.se',NULL),(4,'stud1@kth.se','Student 1',NULL,18,'stud1@kth.se',NULL),(4,'stud2@kth.se','Student 2',NULL,19,'stud2@kth.se',NULL),(4,'jakmol','jakmol',NULL,20,'jakmol',NULL),(4,'rikjak','Rikard',NULL,21,'rikjak',NULL),(4,'hej','hej',NULL,22,'hej',NULL),(4,'jakmol','Jakob',NULL,23,NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Work_year`
--

DROP TABLE IF EXISTS `Work_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Work_year` (
  `person_id` int(11) DEFAULT NULL,
  `work_hours_examiner` int(11) DEFAULT NULL,
  `available_hours_supervisor` int(11) DEFAULT NULL,
  `work_hours_supervisor` int(11) DEFAULT NULL,
  `available_hours_examiner` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  KEY `person_id_idx` (`person_id`),
  KEY `year` (`year`),
  CONSTRAINT `Work_year_ibfk_1` FOREIGN KEY (`year`) REFERENCES `Budget_year` (`year`),
  CONSTRAINT `person_id` FOREIGN KEY (`person_id`) REFERENCES `User` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Work_year`
--

LOCK TABLES `Work_year` WRITE;
/*!40000 ALTER TABLE `Work_year` DISABLE KEYS */;
INSERT INTO `Work_year` VALUES (1,200,150,NULL,NULL,NULL),(1,200,75,200,75,NULL),(1,200,75,200,75,2020),(2,200,100,200,100,2019);
/*!40000 ALTER TABLE `Work_year` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-11 16:57:33
