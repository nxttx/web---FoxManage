-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 06 feb 2021 om 12:00
-- Serverversie: 10.4.10-MariaDB
-- PHP-versie: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TEST_foxmanage`
--
CREATE DATABASE IF NOT EXISTS `TEST_foxmanage` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `TEST_foxmanage`;

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

-- --
-- -- Gegevens worden geëxporteerd voor tabel `domains`
-- --

-- INSERT INTO `domains` (`id`, `user`, `domainName`) VALUES
-- (1, 1, 'robertboudewijn.nl'),
-- (2, 1, 'foxels.nl'),
-- (3, 1, 'markatakas.nl');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `facturen`
--

DROP TABLE IF EXISTS `facturen`;
CREATE TABLE `facturen` (
  `id` varchar(8) NOT NULL,
  `user` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payed` tinyint(1) NOT NULL DEFAULT 0,
  `IDEAL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `facturen`
--

-- INSERT INTO `facturen` (`id`, `user`, `date`, `payed`, `IDEAL`) VALUES
-- ('2021-003', 1, '2021-02-05 15:27:15', 0, ''),
-- ('2021-004', 1, '2021-02-05 15:27:07', 0, 'https://www.ing.nl/particulier/betaalverzoek/index.html?trxid=Papa5THjUlxGyhpLCVmrwzo9IA0nP75v');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `factuurproducten`
--

DROP TABLE IF EXISTS `factuurproducten`;
CREATE TABLE `factuurproducten` (
  `id` int(11) NOT NULL,
  `factuurnummer` varchar(8) NOT NULL,
  `productname` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 1,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `factuurproducten`
--

-- INSERT INTO `factuurproducten` (`id`, `factuurnummer`, `productname`, `amount`, `price`) VALUES
-- (1, '2021-003', 'FoxMange 3 uur', 1, '50.25'),
-- (2, '2021-003', 'Webhosting 1 jaar', 1, '25.00'),
-- (3, '2021-004', 'Domeinnaam Markatakas.nl,  1 jaar', 1, '5.00'),
-- (4, '2021-004', 'Webhosting 1 jaar', 1, '64.99');

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

-- INSERT INTO `userdatabases` (`id`, `user`, `databaseName`) VALUES
-- (1, 1, 'robermi58_website'),
-- (2, 1, 'Foxmanage');

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

-- INSERT INTO `users` (`id`, `username`, `email`, `password`, `maxDirSize`, `adminRights`, `subscription`, `registrationDate`, `changePassword`) VALUES
-- (1, 'RobertBoudewijn', 'robert-boudewijn@hotmail.com', '570d59cdc2e3023530f1ec87dbf7786a53e9eb9f2a2d5664c402993484c5d46231289130a85fb75bac9fae09cafa995a7629243b090c0df8f870ef60902d5276', 220, 1, '-5.00', '2021-01-17', 0);

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

-- INSERT INTO `usersadress` (`id`, `firstname`, `Lastname`, `adress`, `number`, `zipcode`, `city`, `country`) VALUES
-- (1, 'Robert', 'Boudewijn', 'Paasberg', '32', '6862 CC', 'Oosterbeek', 'Nederland');

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
-- AUTO_INCREMENT voor een tabel `factuurproducten`
--
ALTER TABLE `factuurproducten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
