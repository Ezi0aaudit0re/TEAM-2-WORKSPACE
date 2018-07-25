-- MySQL Script generated by MySQL Workbench
-- Tue Jul 24 20:37:12 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema team_beta
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema team_beta
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `team_beta` DEFAULT CHARACTER SET utf8 ;
USE `team_beta` ;

-- -----------------------------------------------------
-- Table `team_beta`.`projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team_beta`.`projects` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `admin_id` VARCHAR(45) NOT NULL,
  `status` INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 118
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `team_beta`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team_beta`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email_id` VARCHAR(255) NOT NULL,
  `privilege` INT(11) NOT NULL DEFAULT '0',
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC),
  UNIQUE INDEX `email_id_UNIQUE` (`email_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 245
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `team_beta`.`tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team_beta`.`tasks` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `priority` INT(11) NOT NULL DEFAULT '0',
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `due_date` DATETIME NOT NULL,
  `assigned_to_user_id` INT(11) NOT NULL,
  `assigned_by_user_id` INT(11) NOT NULL,
  `projects_id` INT(11) NOT NULL,
  `status` INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_tasks_users_idx` (`assigned_to_user_id` ASC),
  INDEX `fk_tasks_users1_idx` (`assigned_by_user_id` ASC),
  INDEX `fk_tasks_projects1_idx` (`projects_id` ASC),
  CONSTRAINT `fk_tasks_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `team_beta`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tasks_users`
    FOREIGN KEY (`assigned_to_user_id`)
    REFERENCES `team_beta`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tasks_users1`
    FOREIGN KEY (`assigned_by_user_id`)
    REFERENCES `team_beta`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `team_beta`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team_beta`.`comments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `comments` VARCHAR(255) NULL DEFAULT NULL,
  `users_id` INT(11) NOT NULL,
  `tasks_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_users1_idx` (`users_id` ASC),
  INDEX `fk_comments_tasks1_idx` (`tasks_id` ASC),
  CONSTRAINT `fk_comments_tasks1`
    FOREIGN KEY (`tasks_id`)
    REFERENCES `team_beta`.`tasks` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `team_beta`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `team_beta`.`issues`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team_beta`.`issues` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `priority` INT(11) NOT NULL DEFAULT '0',
  `projects_id` INT(11) NOT NULL,
  `created_by_user_id` INT(11) NOT NULL,
  `assigned_to_user_id` INT(11) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `status` INT(11) NOT NULL DEFAULT '0',
  `tested` INT(11) NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_issues_projects1_idx` (`projects_id` ASC),
  INDEX `fk_issues_users1_idx` (`created_by_user_id` ASC),
  INDEX `fk_issues_users2_idx` (`assigned_to_user_id` ASC),
  CONSTRAINT `fk_issues_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `team_beta`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_issues_users1`
    FOREIGN KEY (`created_by_user_id`)
    REFERENCES `team_beta`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_issues_users2`
    FOREIGN KEY (`assigned_to_user_id`)
    REFERENCES `team_beta`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `team_beta`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team_beta`.`messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `msg` VARCHAR(255) NOT NULL,
  `users_id` INT(11) NOT NULL,
  `projects_id` INT(11) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `stored_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_users1_idx` (`users_id` ASC),
  INDEX `fk_messages_projects1_idx` (`projects_id` ASC),
  CONSTRAINT `fk_messages_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `team_beta`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `team_beta`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `team_beta`.`users_has_projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team_beta`.`users_has_projects` (
  `users_id` INT(11) NOT NULL COMMENT 'This table contains all the members that are associated with the project\n',
  `projects_id` INT(11) NOT NULL,
  PRIMARY KEY (`users_id`, `projects_id`),
  INDEX `fk_users_has_projects_projects1_idx` (`projects_id` ASC),
  INDEX `fk_users_has_projects_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_users_has_projects_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `team_beta`.`projects` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_projects_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `team_beta`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
