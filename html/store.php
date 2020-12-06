<?php
require_once 'global.php';

$mysqli = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_DB_NAME);

if (!$mysqli->multi_query('CALL API_TO_WEB_SELECT_STORE_USING_DISTANCE(37.513224, 127.1001228, 5, 0, 100)')) {
    echo "CALL failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

do {
    if ($res = $mysqli->store_result()) {
        printf("---\n");
        var_dump($res->fetch_all());
        $res->free();
    } else {
        if ($mysqli->errno) {
            echo "Store failed: (" . $mysqli->errno . ") " . $mysqli->error;
        }
    }
} while ($mysqli->more_results() && $mysqli->next_result());
?>