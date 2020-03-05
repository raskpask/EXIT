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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Area_of_expertise`
--

LOCK TABLES `Area_of_expertise` WRITE;
/*!40000 ALTER TABLE `Area_of_expertise` DISABLE KEYS */;
INSERT INTO `Area_of_expertise` VALUES (2,'Network');
/*!40000 ALTER TABLE `Area_of_expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Budget_work`
--

DROP TABLE IF EXISTS `Budget_work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Budget_work` (
  `work_year_id` int(11) NOT NULL,
  `year` int(11) DEFAULT NULL,
  PRIMARY KEY (`work_year_id`),
  KEY `year` (`year`),
  CONSTRAINT `Budget_work_ibfk_1` FOREIGN KEY (`year`) REFERENCES `Budget_year` (`year`) ON DELETE CASCADE,
  CONSTRAINT `work_year_id` FOREIGN KEY (`work_year_id`) REFERENCES `Work_year` (`work_year_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Budget_work`
--

LOCK TABLES `Budget_work` WRITE;
/*!40000 ALTER TABLE `Budget_work` DISABLE KEYS */;
/*!40000 ALTER TABLE `Budget_work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Budget_year`
--

DROP TABLE IF EXISTS `Budget_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Budget_year` (
  `master_hours` int(11) DEFAULT NULL,
  `bachelor_hours` int(11) DEFAULT NULL,
  `total_tutoring_hours` int(11) DEFAULT NULL,
  `factor_1` double DEFAULT NULL,
  `factor_2` double DEFAULT NULL,
  `factor_3` double DEFAULT NULL,
  `factor_4` double DEFAULT NULL,
  `factor_5` double DEFAULT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Budget_year`
--

LOCK TABLES `Budget_year` WRITE;
/*!40000 ALTER TABLE `Budget_year` DISABLE KEYS */;
INSERT INTO `Budget_year` VALUES (200,100,300,1.5,1.6,1.7,1.8,2.7,2020),(200,100,300,1.5,1.6,1.7,1.8,2.7,2021);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
INSERT INTO `Company` VALUES ('Test AB','Testgatan 12, 123 45','076 12345',1),('test','testitest','test some moar',5),('testföretaget','test','1234565',13),('testföretaget','test','1234565',14),('testförefdataget','tesasdt','1sdf234565',15),('','','',17),('','','',18);
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
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  KEY `company_idx` (`company`),
  CONSTRAINT `company` FOREIGN KEY (`company`) REFERENCES `Company` (`company_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Degree_project`
--

LOCK TABLES `Degree_project` WRITE;
/*!40000 ALTER TABLE `Degree_project` DISABLE KEYS */;
INSERT INTO `Degree_project` VALUES (2,2,15,'2015-01-20','2008-06-20',1,0,1,1,2,'This is a dummy project',NULL),(3,2,15,'2020-01-20','2020-06-04',1,0,1,NULL,NULL,'This is another dummy project',NULL),(4,1,15,'2020-01-05','2020-06-01',1,0,1,NULL,1,'testprojekt',NULL),(5,1,15,'2020-01-05','2020-06-01',1,0,1,13,1,'testprojekt',NULL),(6,1,15,'2020-01-05','2020-06-01',1,0,1,14,1,'testprojekt',NULL),(7,1,15,'2020-01-05','2020-06-01',1,0,1,15,1,'testprojekt',NULL),(8,0,0,'2015-01-01','2020-01-01',NULL,NULL,NULL,17,NULL,'',''),(9,0,0,'2015-01-01','2020-01-01',NULL,NULL,NULL,18,NULL,'',''),(10,2,15,'2020-03-02','2020-03-09',NULL,NULL,NULL,NULL,NULL,'Test from fronend','Test Title'),(11,23,123,'2020-03-02','2020-03-02',NULL,NULL,NULL,NULL,NULL,'HEj då asfdas','HEllo'),(12,2,13,'2020-03-02','2020-03-02',NULL,NULL,NULL,NULL,NULL,'das','HEk');
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
/*!40000 ALTER TABLE `Expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_project`
--

DROP TABLE IF EXISTS `Student_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Student_project` (
  `degree_project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `project_role_id` smallint(6) DEFAULT NULL,
  KEY `user_id_idx` (`user_id`),
  KEY `degree_project_id_fk` (`degree_project_id`),
  CONSTRAINT `degree_project_id_fk` FOREIGN KEY (`degree_project_id`) REFERENCES `Degree_project` (`project_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_project`
--

LOCK TABLES `Student_project` WRITE;
/*!40000 ALTER TABLE `Student_project` DISABLE KEYS */;
INSERT INTO `Student_project` VALUES (2,1,3),(2,2,1),(3,2,1);
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
  `kth_email` varchar(45) DEFAULT NULL,
  `alt_email` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `kth_username` varchar(32) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'asdf@kth.se','hej','hej','hej',1,NULL,NULL),(2,'test@kth.se','ldsf@gmail.com','tets','Testson',2,'uxisfgd','23445');
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
  `work_hours` int(11) DEFAULT NULL,
  `available_hours` int(11) DEFAULT NULL,
  `work_year_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`work_year_id`),
  KEY `person_id_idx` (`person_id`),
  CONSTRAINT `person_id` FOREIGN KEY (`person_id`) REFERENCES `User` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Work_year`
--

LOCK TABLES `Work_year` WRITE;
/*!40000 ALTER TABLE `Work_year` DISABLE KEYS */;
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

-- Dump completed on 2020-03-05 13:46:08
