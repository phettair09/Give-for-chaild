-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.12-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for give_for_child
CREATE DATABASE IF NOT EXISTS `give_for_child` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `give_for_child`;

-- Dumping structure for table give_for_child.activity
CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `tel` varchar(255) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `person_max` int(11) NOT NULL,
  `location` text NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `admin_id` int(11) NOT NULL,
  `foundation` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.activity: ~11 rows (approximately)
DELETE FROM `activity`;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` (`id`, `name`, `tel`, `start_time`, `end_time`, `person_max`, `location`, `description`, `image`, `admin_id`, `foundation`) VALUES
	(32, 'เล่นดนตรีเพื่อการกุศล', '0931654886', '2020-12-19 00:12:00', '2020-12-20 00:12:00', 10, 'ตลาดนัดเรียบทางด่วน', 'วัตถุประสงค์เพื่อนำเงินส่วนหนึ่งที่ได้จากการจัดแสดงไปบริจาคเพื่อองค์การกุศลต่างๆ ซึ่งแนวคิดนี้ถือได้ว่าเป็นแนวคิดที่ดีมาก ซึ่งมีการจัดแสดงลักษณะนี้มาหลายครั้ง', '1608311631.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(34, 'อาสากลางกรุง ทำสื่อการเรียนรู้เพื่อน้องที่ห่างไกล รุ่น6', '0923211771', '2020-12-18 09:46:00', '2020-12-19 09:46:00', 10, 'ศูนย์การค้ายูเนี่ยน มอลล์ จ.กรุงเทพมหานคร', 'เพื่อให้ผู้เข้าร่วมกิจกรรมสร้างจิตสำนึกของการแบ่งปันและการช่วยเหลือผู้ที่ขาดแคลน ทำให้ผู้เข้าร่วมกิจกรรมได้รู้สึกถึงความอิ่มเอมใจ ความสุขและการเสียสละจากการแบ่งปัน ผ่านกิจกรรมการทำสื่อการเรียนรู้การ์ดเกมส์เพื่อเสริมทักษะและความสนุกในการเรียนรู้ให้น้องๆในโรงเรียนที่ห่างไกล', '1608345991.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(37, 'จิตอาสาทำสมุดทำมือจากกระดาษรีไซเคิลให้น้องๆด้อยโอกาส', '0897726182', '2020-12-19 10:04:00', '2020-12-20 10:04:00', 25, 'Paper Ranger บ้านจิตอาสา', 'Paper Ranger บ้านจิตอาสา มูลนิธิบูรณะชนบทแห่งประเทศไทยฯ ตำบล/แขวง บางกะปิ อำเภอ/เขต ห้วยขวาง จังหวัด กรุงเทพมหานคร 10310', '1608347084.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(38, 'awdawd', '123123', '2021-02-10 23:40:00', '2021-02-25 23:40:00', 23, 'dawdawd', 'awawdwd', '1612543306.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(39, 'zzzzzzzzzzz', '123', '2021-02-11 23:45:00', '2021-02-18 23:45:00', 222, 'adwda', 'awawd', '1612543598.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(40, 'xcxcxcxc', '12323', '2021-02-16 23:56:00', '2021-03-02 23:57:00', 1, 'asds', 'asdsd', '1612544615.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(41, 'cccc', '12323', '2021-02-17 03:08:00', '2021-02-24 03:08:00', 12, 'asdsd', 'asdasd', '1612544703.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(42, 'zxc', '123', '2021-02-11 00:05:00', '2021-02-23 00:05:00', 12, 'asd', 'asd', '1612544756.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(43, 'zxczxc', '123', '2021-02-11 00:08:00', '2021-02-18 00:08:00', 12, 'asd', 'asd', '1612544949.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(45, 'R', '999', '2021-02-05 18:21:00', '2021-02-06 17:20:00', 10, 'RRRRR', 'RRRRR', '1612552823.jpg', 2, 'มูลนิธิบ้านนกขมิ้น'),
	(46, 'จิตอาสาทำสมุดทำมือจากกระดาษรีไซเคิลให้น้องๆด้อย', '08901841213', '2021-02-06 04:04:00', '2021-02-07 04:04:00', 10, 'reareraerraerae', 'REARERAER', '1612559335.jpg', 2, 'มูลนิธิบ้านนกขมิ้น');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;

-- Dumping structure for table give_for_child.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foundation` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.admin: ~5 rows (approximately)
DELETE FROM `admin`;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `foundation`, `username`, `password`) VALUES
	(1, '11', '11', '11'),
	(2, 'มูลนิธิบ้านนกขมิ้น', 'asdasd', 'asdasd'),
	(3, 'มูลนิธิบ้านนกขมิ้น', 'adasda', 'dadad'),
	(4, 'มูลนิธิบ้านนกขมิ้น', 'Real', '123456'),
	(5, 'มูลนิธิบ้านนกขมิ้น', 'realzaa20', 'realzaa20');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table give_for_child.banquet
CREATE TABLE IF NOT EXISTS `banquet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `duration` varchar(255) NOT NULL,
  `budget` float DEFAULT NULL,
  `slip` mediumtext DEFAULT NULL,
  `booking_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.banquet: ~8 rows (approximately)
DELETE FROM `banquet`;
/*!40000 ALTER TABLE `banquet` DISABLE KEYS */;
INSERT INTO `banquet` (`id`, `duration`, `budget`, `slip`, `booking_id`) VALUES
	(1, '7:00 - 9:00', 121212, '.jpg', 5),
	(2, '7:00 - 9:00', 121212, '.jpg', 6),
	(3, '7:00 - 9:00', 121212, '.jpg', 7),
	(4, '7:00 - 9:00', 121111, '.jpg', 8),
	(5, '7:00 - 9:00', 123232, '1612525131.jpg', 9),
	(6, '11:00 - 13:00', 454454, '1612525363.jpg', 10),
	(7, '7:00 - 9:00', 500, '1612531213.jpg', 16),
	(8, '7:00 - 9:00', 10, '1612552559.jpg', 17);
/*!40000 ALTER TABLE `banquet` ENABLE KEYS */;

-- Dumping structure for table give_for_child.booking
CREATE TABLE IF NOT EXISTS `booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `foundation` varchar(50) NOT NULL DEFAULT '',
  `category` varchar(50) NOT NULL DEFAULT '',
  `option` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `location` text NOT NULL DEFAULT '',
  `tel` varchar(50) NOT NULL DEFAULT '',
  `description` mediumtext NOT NULL,
  `is_success` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.booking: ~4 rows (approximately)
DELETE FROM `booking`;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` (`id`, `member_id`, `foundation`, `category`, `option`, `name`, `date`, `location`, `tel`, `description`, `is_success`, `created_at`) VALUES
	(12, 11, 'มูลนิธิบ้านนกขมิ้น', 'งานช่าง', 'asdsd', 'fssefse', '2021-02-10', 'sedfsef', '234234', 'sefsef', 1, '2021-02-06 01:40:32'),
	(14, 11, 'มูลนิธิบ้านนกขมิ้น', 'งานช่าง', 'asdsd', 'sefsef', '2021-02-22', 'sefsef', '234234', 'sefsef', 1, '2021-02-06 01:25:24'),
	(15, 11, 'มูลนิธิบ้านนกขมิ้น', 'งานช่าง', 'asdsd', 'dfhgdfhdf', '2021-02-10', 'sefsefsef', '23423432', 'sefsesef', 1, '2021-02-05 21:10:47'),
	(17, 11, 'มูลนิธิบ้านนกขมิ้น', 'เลี้ยงอาหารเด็ก', 'จัดหาให้', 'RRRRR', '2021-02-05', 'RRRR', '00000000', 'RRRRRR', 0, '2021-02-06 02:15:59');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;

-- Dumping structure for table give_for_child.donation
CREATE TABLE IF NOT EXISTS `donation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `foundation` varchar(255) NOT NULL,
  `tel` varchar(50) NOT NULL,
  `date_time` datetime NOT NULL,
  `location` text NOT NULL,
  `description` mediumtext NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `is_success` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.donation: ~9 rows (approximately)
DELETE FROM `donation`;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` (`id`, `name`, `foundation`, `tel`, `date_time`, `location`, `description`, `member_id`, `created_at`, `is_success`) VALUES
	(5, 'ธิติวัฒน์', 'มูลนิธิบ้านเฟื้องฟ้า', '0891119283', '2020-12-19 10:56:00', '51/528 ซ.นวลจันทร์17 แขวงนวลจันทร์ เขตคลองกุ่ม 10230', 'เสื้อผ้า ตู้ เตียง มือสอง', NULL, NULL, 0),
	(6, 'นายยศวัฒน์ เลิศวุฒิพันธ์', 'มูลนิธิบ้านภูมิเวท', '0890184213', '2020-12-20 11:03:00', '51/528 ซ.นวลจันทร์17 แขวงนวลจันทร์ เขตคลองกุ่ม 10230', 'เสื้อผ้ามือสอง2ถุงใหญ่', NULL, NULL, 0),
	(7, 'นายชัยวัฒน์ กตะศิลา', 'มูลนิธิบ้านนกขมิ้น', '0923211771', '2020-12-23 11:35:00', 'นวลจันทร์36  แขวงนวลจันทร์ เขตบึงกุ่ม', 'พัดลมที่เสีย 2 ตัว , เครื่องซักผ้าเก่า 1 เครื่อง', NULL, NULL, 0),
	(8, 'ธิติวัฒน์999', 'มูลนิธิบ้านเด็กอ่อนพญาไท', '0891119283', '2020-12-19 15:09:00', '51/528 ซ.นวลจันทร์17 แขวงนวลจันทร์ เขตคลองกุ่ม 10230', 'เสื้อผ้า ตู้ เตียง มือสอง', NULL, NULL, 0),
	(9, 'ธิติวัฒน์', 'มูลนิธิบ้านเฟื้องฟ้า', '0891119283', '2021-01-09 04:58:00', '51/528 ซ.นวลจันทร์17 แขวงนวลจันทร์ เขตคลองกุ่ม 10230', 'เตียง', NULL, NULL, 0),
	(10, 'ลลิดา', 'บ้านเด็กตาบอดผู้พิการซ้ำซ้อน', '0960691998', '2021-01-26 23:59:00', 'คอนโดลุมพินี', 'เตียง', NULL, NULL, 0),
	(11, 'เรียว', 'มูลนิธิบ้านเฟื้องฟ้า', '0890184213', '2021-02-04 01:18:00', '51/528 ซ.นวลจันทร์17 แขวงนวลจันทร์ เขตคลองกุ่ม 10230', 'ฟหกฟหก', NULL, NULL, 0),
	(12, 'sefsefsef', 'มูลนิธิบ้านนกขมิ้น', '234234234', '2021-02-17 22:54:00', 'sefsefsef', 'sefseef', 11, NULL, 1),
	(16, 'RRRR', 'มูลนิธิบ้านนกขมิ้น', '999', '2021-02-06 16:17:00', 'RRRRRR', 'RRRRRRR', 11, NULL, 0);
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;

-- Dumping structure for table give_for_child.foundation
CREATE TABLE IF NOT EXISTS `foundation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `url` text NOT NULL,
  `img` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.foundation: ~4 rows (approximately)
DELETE FROM `foundation`;
/*!40000 ALTER TABLE `foundation` DISABLE KEYS */;
INSERT INTO `foundation` (`id`, `name`, `url`, `img`) VALUES
	(3, 'real', 'https://react-bootstrap.github.io/layout/grid/', '1611808049.jpg'),
	(8, 'aaaa', 'bbbb', '1612510138.jpg'),
	(9, 'มูลนิธิบ้านนกขมิ้น', 'https://www.baannokkamin.org/', '1612510700.jpg'),
	(10, 'awdawdawd', 'fesfsefef', '1612521357.jpg');
/*!40000 ALTER TABLE `foundation` ENABLE KEYS */;

-- Dumping structure for table give_for_child.fou_catagory
CREATE TABLE IF NOT EXISTS `fou_catagory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `foundation_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.fou_catagory: ~4 rows (approximately)
DELETE FROM `fou_catagory`;
/*!40000 ALTER TABLE `fou_catagory` DISABLE KEYS */;
INSERT INTO `fou_catagory` (`id`, `name`, `foundation_name`) VALUES
	(1, 'เลี้ยงอาหารเด็ก', 'มูลนิธิบ้านนกขมิ้น'),
	(5, 'งานช่าง', 'มูลนิธิบ้านนกขมิ้น'),
	(6, 'aaaa', 'aaaa'),
	(7, 'awdawdawd', 'awdawdawd');
/*!40000 ALTER TABLE `fou_catagory` ENABLE KEYS */;

-- Dumping structure for table give_for_child.fou_option
CREATE TABLE IF NOT EXISTS `fou_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `fou_cat_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.fou_option: ~4 rows (approximately)
DELETE FROM `fou_option`;
/*!40000 ALTER TABLE `fou_option` DISABLE KEYS */;
INSERT INTO `fou_option` (`id`, `name`, `fou_cat_name`) VALUES
	(1, 'นำมาเอง', 'เลี้ยงอาหารเด็ก'),
	(2, 'จัดหาให้', 'เลี้ยงอาหารเด็ก'),
	(5, 'asdsd', 'งานช่าง'),
	(6, 'aefsefsef', 'awdawdawd');
/*!40000 ALTER TABLE `fou_option` ENABLE KEYS */;

-- Dumping structure for table give_for_child.join_activity
CREATE TABLE IF NOT EXISTS `join_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `is_success` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.join_activity: ~6 rows (approximately)
DELETE FROM `join_activity`;
/*!40000 ALTER TABLE `join_activity` DISABLE KEYS */;
INSERT INTO `join_activity` (`id`, `activity_id`, `member_id`, `is_success`, `created_at`) VALUES
	(51, 34, 8, 1, '2021-02-05 20:45:23'),
	(56, 32, 11, 1, '2021-02-05 20:45:23'),
	(58, 37, 11, 1, '2021-02-05 20:45:24'),
	(61, 45, 11, 0, NULL),
	(62, 46, 11, 1, NULL),
	(63, 46, 8, 0, NULL);
/*!40000 ALTER TABLE `join_activity` ENABLE KEYS */;

-- Dumping structure for table give_for_child.member
CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_line_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Dumping data for table give_for_child.member: ~4 rows (approximately)
DELETE FROM `member`;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`id`, `sub_line_id`, `name`, `img`) VALUES
	(8, 'U4de99c5d958ce45aa09938437bd470b2', 'Titiwat', 'https://profile.line-scdn.net/0hjEdALJnFNWpZOBwhVKJKPWV9OwcuFjMiIV58C31oY1MgD3ZuZV5yDX47PltxAHU6NQktDHRtO1xz'),
	(9, 'U41baa022195dc9355b102b19efc770e0', '????', 'https://profile.line-scdn.net/0h7v8D4mnlaFkFPUH5HxYXDjl4ZjRyE24RfQwiOyI7N2l4CiwPbgkjNyk4YTt4DiwMOF9zPCk7Mz4r'),
	(10, 'U462e8bf6236062b820201f6957a9c8ab', 'a', 'https://profile.line-scdn.net/0h6pE6HQazaV94T0Ctm6AWCEQKZzIPYW8XACklPQpJYG0BeStaRS9xag5OMDxSfSYKRnoua1QfPzgF'),
	(11, 'Uf37a36ac02b950ce14fc95b286ddef68', 'm i c k y', 'https://profile.line-scdn.net/0hLEUQPP5eE2poKAUOqlZsPVRtHQcfBhUiEElYBUR4HVhNG1U5V0pVDB4gHVwQSwRuVkhUBUQqSFIV');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
