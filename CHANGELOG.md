# DAW Base App - Changes Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).


## 2.2.6
* Project modification
    * Modal added with form used to createa new device.
    * Modal added with options to modify or delete a device.
    * New UI with one button to add, and an option button for each device.
    * Added switch to control all devices.

## 2.2.5
* Project modification
    * Switches added to each device to control 'Status'.
    * Slider added to each device to control 'Level'.
    * UI reacts to device type to show Switch and/or Slider.
    * Separate methods to loadDevices and loadScreen.

## 2.2.4
* Project modification
    * Web interface designed as single page application.
    * UI implements MaterializeCSS
    * Added modules Nouislider and material-dialog.
    * Web page able visualize all devices data and picture.

## 2.2.3
* Project modification
    * Framework implemented to use REST API with backend
    * Device class defined to store data and methods.
    * Main class defined with an atribute of active array of devices.
    * Main class implements event handler for UI interaction.

## 2.2.2
* Project modification
    * Backend makes usage of MySQL database to store data.
    * New DB field called 'level' added to store dimmable devices.
    * SQL dump modified to comply with new DB structure
    * New field Level added to REST API.

## 2.2.1
* Project modification
    * Adds an REST API interface to connect backend with frontend
    * Implements HTTP methods GET, to give information of one or all devices.
    * Implements methods POST to update a hole device or just the status
    * Implements methods PUT, DELETE to create or delete a device.

## 2.2.0

* Project modification
    * Adds TypeScript compiler service to Docker Compose
    * Reestructures frontend folder for TypeScript
    * Adds new info to README accordingly
    * Changes project architecture image

## 2.1.0

* Project modification
    * Enhaces README accordingly to Goto IoT
    * Adds example of finished application
    * Removes unnecessary frontend images
    * Changes src code folders names

## 2.0.0

* Project modification
    * Changes project and organization names
    * Removes Typescript container
    * Removes Typescript Code
    * Executes Javascript code directly
    * Changes licence to MIT
    * Modifies README accordingly

## 1.0.0

* Project creation
    * Docker Compose implementation for whole project.
    * Typescript compilation into docker-compose.
    * MySQL 5.7 DB Server.
    * PHPMyAdmin.
    * NodeJS backend application.
    * Materialize CSS framework.
