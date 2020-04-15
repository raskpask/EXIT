-- MariaDB dump 10.17  Distrib 10.4.12-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: exit_db
-- ------------------------------------------------------
-- Server version	10.4.12-MariaDB

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
-- Table structure for table `area_of_expertise`
--

DROP TABLE IF EXISTS `area_of_expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_of_expertise` (
  `expertise_id` int(11) NOT NULL AUTO_INCREMENT,
  `expertise_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`expertise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_of_expertise`
--

LOCK TABLES `area_of_expertise` WRITE;
/*!40000 ALTER TABLE `area_of_expertise` DISABLE KEYS */;
INSERT INTO `area_of_expertise` VALUES (2,'Network'),(3,'Network'),(4,'Network'),(5,'Noting set yet'),(6,'devops'),(7,'Saying hi'),(8,'Network and programming and ga');
/*!40000 ALTER TABLE `area_of_expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_year`
--

DROP TABLE IF EXISTS `budget_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budget_year` (
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
-- Dumping data for table `budget_year`
--

LOCK TABLES `budget_year` WRITE;
/*!40000 ALTER TABLE `budget_year` DISABLE KEYS */;
INSERT INTO `budget_year` VALUES (500,4,1,1,1,1,13,13,100,400,1337),(300,1.5,1.6,1.7,1.8,2.7,200,200,100,100,2019),(300,1.6,1.7,1.8,1.8,2.7,200,200,100,100,2020),(500,2,4,2,4,2,13,13,100,400,2021),(500,1,1,1,1,1,13,13,200,300,2022);
/*!40000 ALTER TABLE `budget_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('Test AB','Testgatan 12, 123 45','076 12345',1),('test','testitest','test some moar',5),('testföretaget','test','1234565',13),('testföretaget','test','1234565',14),('testförefdataget','tesasdt','1sdf234565',15),('','','',17),('','','',18),('Test AB','Testvägen 7','46238872',19),('test ab','hejväg 7 ','34235235',20),('ha ab','hjs 8','7476638',21),('Test AB','test 7','84836664',22),('a','a','12',25),('jd','kd','7348',26),('Testföretag','Testgatan 1234','+46123456778',27),('Testföretag','Testgatan 1234','+46123456778',28),('Testföretag','Testgatan 1234','+46123456778',29),('KTH','valhallavägen 81','213423453423',30),('hej','hej','736',31),('s','s','213',32),('d','3ds','2334234234',33),('fasdf','23423ds','324345',34),('ads','234d','323242',35),('asdsd','dwsad','13424',37),('dfsgdf','dfgsdfg','23452345',38),('dfg','fsdfg','3425',39),('dd','efa','32452523',40),('asdf','asdf','13241345',41),('sda','dsad','1234234',42),('sadf','sadf','2345234',43),('Testsons','Testsvängen 12',NULL,44),('Testsons','Testsvängen 12',NULL,45),('Testsons','Testsvängen 12',NULL,46),('Testsons','Testsvängen 12',NULL,47),('Testsons','Testsvängen 12',NULL,48),('Testsons','Testsvängen 12',NULL,49),('Testsons','Testsvängen 12',NULL,50),('Testsons','Testsvängen 12',NULL,51),('Testsons','Testsvängen 12',NULL,52),('Testsons','Testsvängen 12',NULL,53),('Testsons','Testsvängen 12',NULL,54),('Testsons','Testsvängen 12',NULL,55),('Testsons','Testsvängen 12',NULL,56),('Testsons','Testsvängen 12',NULL,57),('Testsons','Testsvängen 12',NULL,58),('Testsons','Testsvängen 12',NULL,59),('Testsons','Testsvängen 12',NULL,60),('Testsons','Testsvängen 12',NULL,61),('Testsons','Testsvängen 12',NULL,62),('Testsons','Testsvängen 12',NULL,63),('Testsons','Testsvängen 12',NULL,64);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degree_project`
--

DROP TABLE IF EXISTS `degree_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `degree_project` (
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
  `notes` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  KEY `company_idx` (`company`),
  CONSTRAINT `company` FOREIGN KEY (`company`) REFERENCES `company` (`company_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degree_project`
--

LOCK TABLES `degree_project` WRITE;
/*!40000 ALTER TABLE `degree_project` DISABLE KEYS */;
INSERT INTO `degree_project` VALUES (2,2,15,'2015-01-20','2008-06-20',1,0,1,1,2,'This is a dummy project','','This is the notes for the project'),(3,2,15,'2020-01-20','2020-06-04',1,0,1,NULL,NULL,'This is another dummy project','','This is the notes for the project'),(4,1,15,'2020-01-05','2020-06-01',1,0,1,NULL,1,'testprojekt','','This is the notes for the project'),(5,1,15,'2020-01-05','2020-06-01',1,0,1,13,1,'testprojekt','','This is the notes for the project'),(6,1,15,'2020-01-05','2020-06-01',1,0,1,14,1,'testprojekt','','This is the notes for the project'),(7,1,15,'2020-01-05','2020-06-01',1,0,1,15,1,'testprojekt','','This is the notes for the project'),(8,0,0,'2015-01-01','2020-01-01',NULL,NULL,NULL,17,NULL,'','','This is the notes for the project'),(9,0,0,'2015-01-01','2020-01-01',NULL,NULL,NULL,18,NULL,'','','This is the notes for the project'),(10,2,15,'2020-03-02','2020-03-09',NULL,NULL,NULL,NULL,NULL,'Test from fronend','Test Title','This is the notes for the project'),(11,23,123,'2020-03-02','2020-03-02',NULL,NULL,NULL,NULL,NULL,'HEj då asfdas','HEllo','This is the notes for the project'),(12,2,13,'2020-03-02','2020-03-02',NULL,NULL,NULL,NULL,NULL,'das','HEk','This is the notes for the project'),(13,2,30,'2020-03-09','2020-05-30',NULL,NULL,NULL,NULL,NULL,'Test for the test','Testing a test','This is the notes for the project'),(14,2,30,'2020-03-09','2020-05-30',NULL,NULL,NULL,19,NULL,'Test for the test','Testing a test','This is the notes for the project'),(15,3,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a project','Project','This is the notes for the project'),(16,2,30,'2020-03-09','2020-04-01',NULL,NULL,NULL,NULL,NULL,'Testing','Test','This is the notes for the project'),(17,2,30,'2020-03-09','2020-03-31',NULL,NULL,NULL,NULL,NULL,'TYest','Testing','This is the notes for the project'),(18,2,30,'2020-03-09','2020-03-31',NULL,NULL,NULL,NULL,NULL,'Test 2 Company','Test 2','This is the notes for the project'),(19,1,1,'2020-03-09','2020-03-09',NULL,NULL,NULL,25,NULL,'a','a','This is the notes for the project'),(20,2,15,'2020-03-09','2020-03-09',NULL,NULL,NULL,26,NULL,'hej','Test','This is the notes for the project'),(24,2,15,'2020-03-11','2020-03-30',NULL,NULL,NULL,30,NULL,'Migration','Test','This is the notes for the project'),(25,1,15,'2020-03-11','2020-03-18',NULL,NULL,NULL,31,NULL,'hej','Test','This is the notes for the project'),(26,1,15,'2020-03-11','2020-03-18',NULL,NULL,NULL,32,NULL,'hej','Testing','This is the notes for the project'),(27,1,15,'2020-03-18','2020-03-18',NULL,NULL,NULL,NULL,NULL,'test','TEST','This is the notes for the project'),(28,1,15,'2020-03-18','2020-03-18',NULL,NULL,NULL,33,NULL,'test','TEST','This is the notes for the project'),(29,1,15,'2020-03-18','2020-03-18',NULL,NULL,NULL,34,NULL,'dsada','Test','This is the notes for the project'),(30,1,15,'2020-03-18','2020-03-18',NULL,NULL,NULL,35,NULL,'sad','Test','This is the notes for the project'),(32,1,15,'2020-03-18','2020-03-18',NULL,NULL,NULL,37,NULL,'sadasd','sdfa','This is the notes for the project\n2020-04-01T13:03:36.503Z\ndasww;\n;\nWed Apr 01 2020 15:53:31 :;\nNy kommentar;\n;\nWed Apr 01 2020 16:06:38 ;\nNästa kommentar;\n;\nWed Apr 01 2020 16:08:29 ;\nen till;\n;\nWed Apr 01 2020 16:09:33 ;\nDetta är en \nlång kommertar\nsa\najg;\n;\nWed Apr 01 2020 16:10:38 ;\ngdr;\n;\nWed Apr 01 2020 16:10:56 ;\ngdpr;\n;\nWed Apr 01 2020 16:14:41 ;\nasdw;\n;\nWed Apr 01 2020 16:17:55 ;\nadfwe;\n;\nWed Apr 01 2020 16:21:26 ;\nhejehj;\n;\nWed Apr 01 2020 16:21:47 ;\nasdw;\n;\nWed Apr 01 2020 16:22:13 ;\naeaafea;\n;\nWed Apr 01 2020 16:23:09 ;\nghfuf;\n;\nWed Apr 01 2020 16:24:11 ;\nhejeh;\n;\nWed Apr 01 2020 16:25:51 ;\nNy kommentar;\n;\nWed Apr 01 2020 16:26:01 ;\nEn ny till;\n;\nWed Apr 01 2020 16:26:19 ;\n2;\n;\nWed Apr 01 2020 16:26:56 ;\n3;\n;\nWed Apr 01 2020 16:26:58 ;\n4;\n;\nWed Apr 01 2020 16:27:03 ;\n5;\n;\nWed Apr 01 2020 16:27:10 ;\n6;\n;\nWed Apr 01 2020 16:27:14 ;\n7;\n;\nWed Apr 01 2020 16:27:17 ;\n8;\n;\nWed Apr 01 2020 16:27:20 ;\n9;\n;\nWed Apr 01 2020 16:27:24 ;\n10;\n;\nWed Apr 01 2020 16:49:25 ;\n11;\n;\nWed Apr 01 2020 16:50:16 ;\n12;\n;\nFri Apr 03 2020 09:59:39 ;\nfa;\n;\nFri Apr 03 2020 10:04:24 ;\nhej;\n;\nFri Apr 03 2020 10:11:25 ;\npå;\n;\nFri Apr 03 2020 10:11:31 ;\ndig'),(33,1,15,'2021-03-18','2021-06-10',NULL,NULL,NULL,38,NULL,'test','Test','This is the notes for the project'),(34,1,15,'2021-03-18','2021-04-03',NULL,NULL,NULL,39,NULL,'test','Test','This is the notes for the project'),(35,1,15,'2021-01-21','2021-03-25',NULL,NULL,NULL,40,NULL,'hej','Test','This is the notes for the project'),(36,1,15,'2021-01-01','2021-03-19',NULL,NULL,NULL,41,NULL,'df','Tset','This is the notes for the project'),(37,1,15,'2021-02-13','2021-04-22',NULL,NULL,NULL,42,NULL,'sdw','Test','This is the notes for the project'),(38,1,15,'2021-03-25','2021-03-31',NULL,NULL,NULL,43,NULL,'dfgd','Test','This is the notes for the project'),(39,1,15,'2020-03-18','2020-03-18',NULL,NULL,NULL,NULL,NULL,'asd','asd','This is the notes for the project\n2020-04-01T13:03:23.901Z\nda'),(41,1,15,'2020-04-01','2020-06-11',NULL,NULL,NULL,NULL,NULL,'Test','Test','This is the notes for the project'),(42,2,30,'2020-03-31','2020-03-31',NULL,NULL,NULL,NULL,NULL,'sd','Test','This is the notes for the project'),(43,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(44,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(45,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,44,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(46,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,45,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(47,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,46,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(48,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,47,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(49,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,48,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(52,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,51,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(53,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,52,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(56,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,55,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(57,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,56,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(58,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,57,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(59,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(60,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,58,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(61,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,59,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(62,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(63,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,60,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(64,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,61,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(65,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(66,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,62,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(67,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(68,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,63,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(69,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(70,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,64,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL),(71,2,15,'2020-01-15','2020-06-15',NULL,NULL,NULL,NULL,NULL,'This is a test project aiming to show that the API works.','Testprojekt',NULL);
/*!40000 ALTER TABLE `degree_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertise`
--

DROP TABLE IF EXISTS `expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expertise` (
  `user_id` int(11) NOT NULL,
  `expertise_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `expertise_id_idx` (`expertise_id`),
  CONSTRAINT `expertise_id` FOREIGN KEY (`expertise_id`) REFERENCES `area_of_expertise` (`expertise_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertise`
--

LOCK TABLES `expertise` WRITE;
/*!40000 ALTER TABLE `expertise` DISABLE KEYS */;
INSERT INTO `expertise` VALUES (1,2),(71,5),(72,5),(81,5),(24,8);
/*!40000 ALTER TABLE `expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_project`
--

DROP TABLE IF EXISTS `student_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_project` (
  `degree_project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_role_id` int(11) NOT NULL,
  KEY `user_id_idx` (`user_id`),
  KEY `degree_project_id` (`degree_project_id`),
  CONSTRAINT `Student_project_ibfk_1` FOREIGN KEY (`degree_project_id`) REFERENCES `degree_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_project`
--

LOCK TABLES `student_project` WRITE;
/*!40000 ALTER TABLE `student_project` DISABLE KEYS */;
INSERT INTO `student_project` VALUES (2,1,3),(2,2,1),(3,2,1),(20,2,2),(20,2,2),(20,2,2),(24,1,1),(24,1,2),(25,1,1),(25,1,2),(24,2,2),(26,1,1),(26,1,2),(2,24,1),(27,1,1),(28,1,1),(29,1,1),(30,1,1),(32,1,1),(32,54,3),(2,24,1),(32,24,1),(33,1,1),(34,1,1),(34,56,3),(32,24,1),(35,24,1),(36,24,1),(37,24,1),(38,24,1),(39,24,1),(39,61,3),(41,24,1),(42,24,1),(42,80,3),(43,46,1),(43,1,2),(43,88,3),(44,46,1),(44,1,2),(45,46,1),(45,1,2),(46,46,1),(46,1,2),(46,93,3),(47,46,1),(47,1,2),(48,46,1),(48,1,2),(49,46,1),(49,1,2),(52,46,1),(52,1,2),(53,46,1),(53,1,2),(53,107,3),(56,46,1),(56,1,2),(57,46,1),(57,1,2),(57,123,3),(57,124,3),(58,46,1),(58,1,2),(59,46,1),(59,1,2),(60,46,1),(60,1,2),(61,46,1),(61,1,2),(62,46,1),(62,1,2),(63,46,1),(63,1,2),(64,46,1),(64,1,2),(65,46,1),(65,1,2),(66,46,1),(66,1,2),(67,46,1),(67,1,2),(68,46,1),(68,1,2),(69,46,1),(69,1,2),(70,46,1),(70,1,2),(71,46,1),(71,1,2);
/*!40000 ALTER TABLE `student_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_type_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(64) DEFAULT NULL,
  `kth_username` varchar(32) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `kth_username` (`kth_username`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'hej','hej','hej',1,NULL,'hej',NULL),(2,'ldsf@gmail.com','tets','Testson',2,NULL,'ldsf@gmail.com','23445'),(4,'test','test',NULL,3,NULL,'test',NULL),(4,'test2','test2',NULL,8,NULL,'test2',NULL),(4,'sd','sdfa',NULL,13,NULL,'sd',NULL),(4,'stud1@kth.se','Student 1',NULL,14,NULL,'stud1@kth.se',NULL),(3,'jakmol@kth.se','Jakob','Molin',24,'_d6a263d1634775768e89e89e9d44a52b','jakmol','851481501'),(3,'TestExaminer@kth.se',NULL,NULL,45,NULL,'TestExaminer',NULL),(1,'adm@kth.se','Admtest','Admtest',46,'987654321','testadm','123'),(2,'dir@kth.se','Dirtest','Dirtest',47,'987654321','testdir','123'),(3,'Teach@kth.se','Teachtest','Teachtest',48,'987654321','testteach','123'),(4,'Stud@kth.se','Studtest','Studtest',49,'987654321','teststud','123'),(5,'Comt@comp.sde','Conttest','Conttest',50,'987654321','testcont','123'),(4,'dasd@kth.se','qweda',NULL,54,NULL,'dasd',NULL),(4,'dsse@kth.se','dfee',NULL,56,NULL,'dsse',NULL),(3,'asd@kth.se','asd',NULL,61,NULL,'asd',NULL),(3,'testingAccount@kth.se',NULL,NULL,65,NULL,'testingAccount',NULL),(3,'hejhej@kth.se',NULL,NULL,67,NULL,'hejhej',NULL),(3,'testingtheTest@kth.se',NULL,NULL,71,NULL,'testingtheTest',NULL),(3,'hejdadge@kth.se',NULL,NULL,72,NULL,'hejdadge',NULL),(3,'as@kth.se','Anders','Sjögren',75,'_a6a83af2950ad0d9d74626a12f9a3c95','as',NULL),(4,'dwqq@kth.se','daw',NULL,80,NULL,'dwqq',NULL),(3,'rikjak@kth.se','Rikard','Jakobsson',81,'_b533b42b8aee1cca15a8c5062fff6ce6','rikjak',NULL),(4,'stud2@kth.se@kth.se','Student 2',NULL,88,NULL,'stud2@kth.se',NULL),(4,'stud1111111111111111@kth.se@kth.se','Student 1',NULL,93,NULL,'stud1111111111111111@kth.se',NULL),(4,'stud11111111111111111@kth.se@kth.se','Student 1',NULL,107,NULL,'stud11111111111111111@kth.se',NULL),(4,'stud111@kth.se@kth.se','Student 1',NULL,109,NULL,'stud111@kth.se',NULL),(4,'stud222@kth.se@kth.se','Student 2',NULL,110,NULL,'stud222@kth.se',NULL),(4,'u1blard@kth.se',NULL,NULL,111,NULL,'u1blard',NULL),(4,'stud2222@kth.se@kth.se','Student 2',NULL,120,NULL,'stud2222@kth.se',NULL),(4,'stud11111@kth.se@kth.se','Student 1',NULL,123,NULL,'stud11111@kth.se',NULL),(4,'stud22222@kth.se@kth.se','Student 2',NULL,124,NULL,'stud22222@kth.se',NULL),(4,'Testsoon@kth.se',NULL,NULL,141,NULL,'Testsoon',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_year`
--

DROP TABLE IF EXISTS `work_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_year` (
  `person_id` int(11) DEFAULT NULL,
  `work_hours_examiner` int(11) DEFAULT NULL,
  `available_hours_supervisor` int(11) DEFAULT NULL,
  `work_hours_supervisor` int(11) DEFAULT NULL,
  `available_hours_examiner` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  KEY `person_id_idx` (`person_id`),
  KEY `year` (`year`),
  CONSTRAINT `Work_year_ibfk_1` FOREIGN KEY (`year`) REFERENCES `budget_year` (`year`),
  CONSTRAINT `person_id` FOREIGN KEY (`person_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_year`
--

LOCK TABLES `work_year` WRITE;
/*!40000 ALTER TABLE `work_year` DISABLE KEYS */;
INSERT INTO `work_year` VALUES (1,200,NULL,NULL,NULL,NULL),(1,200,NULL,200,NULL,NULL),(1,200,-9775,200,200,2020),(2,200,100,200,100,2019),(24,50,60,50,-290,2020),(48,50,50,50,50,1337),(45,100,100,100,100,1337),(65,100,100,100,100,1337),(67,100,100,100,100,1337),(72,500,500,500,500,1337),(75,50,60,50,50,2020),(81,100,110,100,100,2020);
/*!40000 ALTER TABLE `work_year` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-14 14:34:35
