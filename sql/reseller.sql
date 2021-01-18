-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 18 jan 2021 om 19:09
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
-- Database: `reseller`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `domains`
--

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
(3, 1, 'markatakas.nl');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `userdatabases`
--

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
(2, 1, 'reseller');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

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
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `domains`
--
ALTER TABLE `domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT voor een tabel `userdatabases`
--
ALTER TABLE `userdatabases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Beperkingen voor tabel `userdatabases`
--
ALTER TABLE `userdatabases`
  ADD CONSTRAINT `FK_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
