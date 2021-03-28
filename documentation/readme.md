## Software principles
### Coding quality 
* All functions/methodes/classes will we documented with either PHPDOC or JSDoc.
#### Variables
* The user sessions variable is declared as 'user'.
### UnitTesting/intergrationTesting
The websever is unit/intergration tested with JEST. You can run the unittests with ```npm test``` in the main directory. Make sure that 'deploy\a_routes\dbh\dbh.php  $state' is turned to test.
## Webserver requirements
* Webserver with PDO.
* MySql database.
* ~~The getUsedData.php uses php component [COM]. So for now only Windows systems.~~
    >``` 
    >[PHP_COM_DOTNET]
    >extension=php_com_dotnet.dll
    >```
    
    This has been changed. ~~getuseddata.php~~ users/data.php now checks what os is the server is running and hands accordenly. For windows [COM] and for Linux/ unix ```popen()```.