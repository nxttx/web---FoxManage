## Software principles
### Coding quality 
* All functions/methodes/classes will we documented with either PHPDOC or JSDoc.
#### Variables
* The user sessions variable is declared as 'user'.
## Webserver requirements
* Webserver with PDO.
* MySql database.
* The getUsedData.php uses php component [COM]. So for now only Windows systems.
    ``` 
    [PHP_COM_DOTNET]
    extension=php_com_dotnet.dll
    ```