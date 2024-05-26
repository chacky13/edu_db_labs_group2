# Реалізація інформаційного та програмного забезпечення


## SQL-скрипт для створення на початкового наповнення бази даних

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mcas` ;

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mcas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mcas` ;

-- -----------------------------------------------------
-- Table `mcas`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`role` ;

CREATE TABLE IF NOT EXISTS `mcas`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `nameIndex` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`user` ;

CREATE TABLE IF NOT EXISTS `mcas`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `roleId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `roleId` (`roleId` ASC) VISIBLE,
  CONSTRAINT `user_ibfk_1`
    FOREIGN KEY (`roleId`)
    REFERENCES `mcas`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`action`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`action` ;

CREATE TABLE IF NOT EXISTS `mcas`.`action` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `action_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mcas`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`publicrequest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`publicrequest` ;

CREATE TABLE IF NOT EXISTS `mcas`.`publicrequest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `actionId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `actionId` (`actionId` ASC) VISIBLE,
  CONSTRAINT `publicrequest_ibfk_1`
    FOREIGN KEY (`actionId`)
    REFERENCES `mcas`.`action` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`mediadata`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`mediadata` ;

CREATE TABLE IF NOT EXISTS `mcas`.`mediadata` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `fileType` TEXT NOT NULL,
  `requestId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `requestId` (`requestId` ASC) VISIBLE,
  CONSTRAINT `mediadata_ibfk_1`
    FOREIGN KEY (`requestId`)
    REFERENCES `mcas`.`publicrequest` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permision` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permision` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permisionhasrole`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permisionhasrole` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permisionhasrole` (
  `permisionId` INT NOT NULL,
  `roleName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`permisionId`, `roleName`),
  INDEX `roleName` (`roleName` ASC) VISIBLE,
  CONSTRAINT `permisionhasrole_ibfk_1`
    FOREIGN KEY (`permisionId`)
    REFERENCES `mcas`.`permision` (`id`),
  CONSTRAINT `permisionhasrole_ibfk_2`
    FOREIGN KEY (`roleName`)
    REFERENCES `mcas`.`role` (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

- RESTfull сервіс для управління даними

### ApplicationDbContex для зв'язку з базою даних

```csharp
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public DbSet<Users> Users { get; set; }
    public DbSet<Roles> Roles { get; set; }
}
```

### Моделі

```csharp
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models;

public class Users
{
    public Users(string email, string password)
    {
        this.email = email;
        this.password = password;
    }
    
    [Key]
    public int id { get; set; }
    [Required]
    public string password { get; set; }
    [Required]
    public string email { get; set; }
    public int role_id { get; set; }
}
```
Загальна модель користувачів

```csharp
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models;

public class UserLogin
{
    [Required]
    public string email { get; set; }
    [Required]
    public string password { get; set; }
}
```
Модель для авторизації

```csharp
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models;

public class Roles
{
    [Key]
    public int id { get; set; }

    public string name { get; set; }
    
    public string description { get; set; }

}
```

Модель ролей

### Валідація введених даних

```csharp
using FluentValidation;
using WebApplication1.Models;

namespace WebApplication1.Validation;

public class LoginValidator:AbstractValidator<Users>
{
    public LoginValidator()
    {
        RuleFor(users => users.email).NotEmpty().MaximumLength(30);
        RuleFor(users => users.password).NotEmpty().MaximumLength(50);
    }
}
```

### Конфігураційний файл

```csharp
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;port=3306;Database=mcas;User =root;Password=1337;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}

```
Цей файл потрібен для звернення до бази через ConnectionStrings

### Основний файл в якому відбуваються всі налаштування API

```csharp
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"), 
        new MySqlServerVersion(new Version(8, 0, 37))
    ));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();

```
