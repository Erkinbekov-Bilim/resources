-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: resources
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `categories`
--
DROP SCHEMA IF EXISTS `resources`;
CREATE SCHEMA `resources`;
USE `resources`;

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Furniture','A wide selection of cabinet and upholstered furniture: tables, chairs, sofas, and storage systems to create a cozy interior.'),(2,'Computer equipment','Laptops, PCs, components, and accessories. Everything you need to create an efficient workplace and home entertainment system.'),(3,'Household appliances','Large and small household appliances for the kitchen, home care, and clothing. Only trusted brands with official warranties and service support.'),(4,'Electronics & Gadgets','Smartphones, wearable devices, and accessories. Trendy new products from the world of personal electronics in one section.');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `location_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `date_from` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `accounting_objects_categories__fk` (`category_id`),
  KEY `accounting_objects_locations__fk` (`location_id`),
  CONSTRAINT `accounting_objects_categories__fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `accounting_objects_locations__fk` FOREIGN KEY (`location_id`) REFERENCES `item_locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,2,1,'Laptop HP Probook 450',NULL,NULL,'2026-03-06 21:17:32'),(2,4,3,'Amazfit Bip 6 ','Built to withstand the demands of daily life, the Bip 6 is an everyday smartwatch that seamlessly integrates high-performance fitness tracking with elegant design and smart features. With advanced health technology, intelligent coaching, and seamless connectivity, it empowers users to stay active, connected, and in control - making every moment count.',NULL,'2026-03-06 21:20:54'),(3,3,2,'MOVA P50 Pro Ultra',NULL,NULL,'2026-03-06 21:22:18');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_locations`
--

DROP TABLE IF EXISTS `item_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_locations`
--

LOCK TABLES `item_locations` WRITE;
/*!40000 ALTER TABLE `item_locations` DISABLE KEYS */;
INSERT INTO `item_locations` VALUES (1,'Director`s office','Administrative unit responsible for managing the company,'),(2,'Office 204',NULL),(3,'Teacher`s room','Designated area in the school for relaxation, preparation for lessons, and communication among teaching staff');
/*!40000 ALTER TABLE `item_locations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-07  4:22:28
