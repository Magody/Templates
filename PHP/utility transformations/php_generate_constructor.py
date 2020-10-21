import sys


table = "item"
sql_attributes_line = "id 	user_username 	place_id 	category_id 	condition_id 	status_id 	type_id 	title 	i_offer 	i_want 	publication_datetime 	url_reference 	reference_value".split("\t")

php_attributes_output = ""
php_constructor_output = "\npublic function __construct("
php_constructor_assign_output = ""

sql_insert_into = "\n\nINSERT INTO " + table + "("
sql_insert_values = " VALUES("
sql_update = "UPDATE " + table + " SET "

sql_stmt_fill = "$success = $stmt->execute(array("


identifier = ""
count = 0
for attribute in sql_attributes_line:
    # print("|" + attribute.strip() + "|")
    attr = attribute.strip()
    
    php_attributes_output += "private $" + attr + ";\n"
    php_constructor_output += "$" + attr
    php_constructor_assign_output += "\t$this->" + attr + " = " + "$" + attr + ";\n";
    
    if count > 0:
        sql_insert_into += attr
        sql_insert_values += ":" + attr
        sql_update += attr+"=:"+attr
        
        sql_stmt_fill += '\n\t":' + attr + '" => $this->'  + attr
        
        if count < len(sql_attributes_line) - 1:
            sql_insert_into += ", "
            sql_insert_values += ", "
            sql_update += ", "
            sql_stmt_fill += ","
        else:
            sql_update += " WHERE " + identifier + "=:" +identifier
            sql_stmt_fill += ',\n\t":' + identifier + '" => $this->'  + identifier
            sql_stmt_fill += "\n\t));"
        
        
    else:
        identifier = attr
    
    if count < len(sql_attributes_line) - 1:
        php_constructor_output += ", "
    
    count += 1

php_constructor_output += "){\n" + php_constructor_assign_output + "}"

sql_utils_output = sql_insert_into + ")" + sql_insert_values + ")\n" + sql_update + "\n\n" + sql_stmt_fill

file = open("php_constructor.txt", "w")
file.write(php_attributes_output + php_constructor_output + sql_utils_output)
file.close()
    
