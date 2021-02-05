-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Gegenereerd op: 05 feb 2021 om 09:44
-- Serverversie: 10.5.8-MariaDB-1:10.5.8+maria~stretch
-- PHP-versie: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `FoxManage`
--
CREATE DATABASE IF NOT EXISTS `FoxManage` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `FoxManage`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `domains`
--

DROP TABLE IF EXISTS `domains`;
CREATE TABLE `domains` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `domainName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `domains`
--

INSERT INTO `domains` (`id`, `user`, `domainName`) VALUES
(1, 1, 'robertboudewijn.nl'),
(2, 1, 'foxels.nl'),
(3, 1, 'markatakas.nl'),
(4, 1, 'anneverdurmen.nl'),
(5, 1, 'digi-dropping.nl'),
(6, 1, 'digi-dropping.online'),
(7, 1, 'klanten.foxels.nl'),
(8, 1, 'p002.develop.robertboudewijn.nl'),
(9, 1, 'p004.develop.robertboudewijn.nl');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `facturen`
--

DROP TABLE IF EXISTS `facturen`;
CREATE TABLE `facturen` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `facturen`
--

INSERT INTO `facturen` (`id`, `user`, `date`, `payed`) VALUES
(3, 1, '2021-02-04 20:32:13', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `factuurproducten`
--

DROP TABLE IF EXISTS `factuurproducten`;
CREATE TABLE `factuurproducten` (
  `id` int(11) NOT NULL,
  `factuurnummer` int(11) NOT NULL,
  `productname` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 1,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `factuurproducten`
--

INSERT INTO `factuurproducten` (`id`, `factuurnummer`, `productname`, `amount`, `price`) VALUES
(1, 3, 'FoxMange 3 uur', 1, 50),
(2, 3, 'Webhosting 1 jaar', 1, 25);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `userdatabases`
--

DROP TABLE IF EXISTS `userdatabases`;
CREATE TABLE `userdatabases` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `databaseName` varchar(265) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `userdatabases`
--

INSERT INTO `userdatabases` (`id`, `user`, `databaseName`) VALUES
(1, 1, 'robermi58_website'),
(2, 1, 'Foxmanage'),
(3, 1, 'robermi58_coronaWolf'),
(4, 1, 'robermi58_DigiDropping'),
(5, 1, 'robermi58_p002'),
(6, 1, 'robermi58_vbk'),
(7, 1, 'robermi58_wp668'),
(8, 1, 'wp_xwxhf');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(129) NOT NULL,
  `maxDirSize` float NOT NULL,
  `adminRights` tinyint(1) NOT NULL DEFAULT 0,
  `subscription` decimal(5,2) NOT NULL,
  `registrationDate` date NOT NULL,
  `changePassword` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `maxDirSize`, `adminRights`, `subscription`, `registrationDate`, `changePassword`) VALUES
(1, 'RobertBoudewijn', 'robert-boudewijn@hotmail.com', '570d59cdc2e3023530f1ec87dbf7786a53e9eb9f2a2d5664c402993484c5d46231289130a85fb75bac9fae09cafa995a7629243b090c0df8f870ef60902d5276', 220, 1, '-5.00', '2021-01-17', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `usersadress`
--

DROP TABLE IF EXISTS `usersadress`;
CREATE TABLE `usersadress` (
  `id` int(11) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `Lastname` varchar(50) NOT NULL,
  `adress` varchar(50) NOT NULL,
  `number` varchar(8) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `usersadress`
--

INSERT INTO `usersadress` (`id`, `firstname`, `Lastname`, `adress`, `number`, `zipcode`, `city`, `country`) VALUES
(1, 'Robert', 'Boudewijn', 'Paasberg', '32', '6862CC', 'Oosterbeek', 'Nederland');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `domains`
--
ALTER TABLE `domains`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Users` (`user`);

--
-- Indexen voor tabel `facturen`
--
ALTER TABLE `facturen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Users_facturen` (`user`);

--
-- Indexen voor tabel `factuurproducten`
--
ALTER TABLE `factuurproducten`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_factuurnummer` (`factuurnummer`);

--
-- Indexen voor tabel `userdatabases`
--
ALTER TABLE `userdatabases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_user` (`user`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `usersadress`
--
ALTER TABLE `usersadress`
  ADD UNIQUE KEY `id` (`id`) USING BTREE;

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `domains`
--
ALTER TABLE `domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT voor een tabel `facturen`
--
ALTER TABLE `facturen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT voor een tabel `factuurproducten`
--
ALTER TABLE `factuurproducten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `userdatabases`
--
ALTER TABLE `userdatabases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `domains`
--
ALTER TABLE `domains`
  ADD CONSTRAINT `FK_Users` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Beperkingen voor tabel `facturen`
--
ALTER TABLE `facturen`
  ADD CONSTRAINT `FK_Users_facturen` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Beperkingen voor tabel `factuurproducten`
--
ALTER TABLE `factuurproducten`
  ADD CONSTRAINT `FK_factuurnummer` FOREIGN KEY (`factuurnummer`) REFERENCES `facturen` (`id`);

--
-- Beperkingen voor tabel `userdatabases`
--
ALTER TABLE `userdatabases`
  ADD CONSTRAINT `FK_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Beperkingen voor tabel `usersadress`
--
ALTER TABLE `usersadress`
  ADD CONSTRAINT `fk_id` FOREIGN KEY (`id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
