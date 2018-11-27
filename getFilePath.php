<?php

define("DS", DIRECTORY_SEPARATOR);

$filename = "Document_Collection" . DS;

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
                    if(is_dir($filename . $file . DS))
                    {
                        $subdir = $filename . $file . DS;
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

$file_paths = getFiles($filename);

//print($file_paths);
$data = json_encode($file_paths);

echo $data;


?>