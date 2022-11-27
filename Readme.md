# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action list

![](img/list.JPG)

# Получаем контакт по id

node index.js --action get --id 5

![](/img/getById.JPG)

# Добавялем контакт

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

![](/img/addContact.JPG)

# Удаляем контакт

node index.js --action remove --id=3

![](/img/removeById.JPG)
