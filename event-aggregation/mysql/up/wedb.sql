-- MySQL Script generated by MySQL Workbench
-- Wed Apr 18 11:56:52 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema wedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `wedb` ;

-- -----------------------------------------------------
-- Schema wedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wedb` DEFAULT CHARACTER SET utf8 ;
USE `wedb` ;

-- -----------------------------------------------------
-- Table `wedb`.`we_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedb`.`we_users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

CREATE INDEX `ndx_email` ON `wedb`.`we_users` (`email` ASC);


-- -----------------------------------------------------
-- Table `wedb`.`we_event_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedb`.`we_event_types` (
  `type_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wedb`.`we_events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedb`.`we_events` (
  `event_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` VARCHAR(45) NOT NULL,
  `type_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`event_id`),
  CONSTRAINT `fk_we_events_we_event_type`
    FOREIGN KEY (`type_id`)
    REFERENCES `wedb`.`we_event_types` (`type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_we_events_we_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `wedb`.`we_users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_event_type_idx` ON `wedb`.`we_events` (`type_id` ASC);

CREATE INDEX `fk_users_idx` ON `wedb`.`we_events` (`user_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;