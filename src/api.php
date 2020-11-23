<?php

require('database.php');

$data = getAllCategory();


for($i = 0 ; $i < 4 ;$i ++){
    $datas[] = $data[$i][count];
}
var_dump($datas);

  ?>