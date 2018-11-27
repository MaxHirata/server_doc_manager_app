<?php

define("DS", DIRECTORY_SEPARATOR);

$filename = "Document_Collection" . DS;

function create_menu_nav_items($filename){

    $dropdown_menu = "";

    if(is_dir($filename)){
        if($dh = opendir($filename)){
            while(($file = readdir($dh)) !== false){
                if($file == '.DS_Store' || $file == '.' || $file == '..')
                {
                    //ignore this
                }
                else{
                    if(is_dir($filename . $file . DS)){
                        $subdir = $filename . $file . DS;
                        
                        //Add dropdown button to nav-item
                        
                        $dropdown_menu .= "<div class='nav-item'>" . 
                                            "<div class='btn-group dropright'>" .
                                                "<button type='button' class='btn btn-secondary dropdown-toggle menu-button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>" .
                                                $file .
                                                "</button>" .
                                                "<ul class='dropdown-menu multi-level' role='menu' aria-labelledby='dropdownMenu'>";
                                                
                        
                        
                        $dropdown_menu .= create_menu_nav_items($subdir);
                        
                    }else{
                        $filepath = $filename . $file;
                        //Add sub-nac-item for dropdown
                        $dropdown_menu .= "<li class='dropdown-item' onclick='getServerDocument(this.innerHTML)'>" .$file . "</li>";
                    }
                }
            }
            $dropdown_menu .= "</div></div>";
            closedir($dh);
        }
    }
    return $dropdown_menu;
}

$dropdown_menu = create_menu_nav_items($filename);

//echo $dropdown_menu;

//print($file_paths);
$data = json_encode($dropdown_menu);

echo $data;



?>