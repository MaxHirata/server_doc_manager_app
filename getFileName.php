<?php
define("DS", DIRECTORY_SEPARATOR);

$filename = "Document_Collection/";

function getFiles($filename) 
{
    $file_collection = array();

    if(is_dir($filename))
    {
        if($dh = opendir($filename))
        {
            while(($file = readdir($dh)) !== false)
            {
                if($file == '.DS_Store' || $file == '.' || $file == '..')
                {
                    //ignore this
                }else{
                    if(is_dir($filename . $file . '/'))
                    {
                        $subdir = $filename . $file . '/';
                        //Recursive call to check for files in subdirectories
                        $file_collection += getFiles($subdir);
                    }else {
                        $filepath = $filename . $file;
                        //Add file as key and filepath as value
                        $file_collection[$file] = $filepath;
                    }
                }
            }
            closedir($dh);
        }
    }
    return $file_collection;
}
    

function showArray($values){
    foreach($values as $element){
        echo $element . "<br>";
    }
}

$values = getFiles($filename);
$keys = array_keys($values);

$data = json_encode($keys);
echo $data;
//print_r($arr);


//$file_collection["hello"] = "This";
//$file_collection["hell2"] = "plzwrk";

//print_r($keys);
?>