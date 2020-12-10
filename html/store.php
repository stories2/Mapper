<?php
require_once 'global.php';

$mysqli = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_DB_NAME);

$stmt = $mysqli->prepare('CALL API_TO_WEB_SELECT_STORE_USING_DISTANCE(37.513224, 127.1001228, 5, 0, 100)');
//    $stmt->execute(array(':param1' => $param1, ':param2' => $param2));
$stmt->execute();
//    if (!$mysqli->multi_query('CALL API_TO_WEB_SELECT_MAP_POLYGON_USING_DISTANCE(37.513224, 127.1001228, 5, 0, 100)')) {
//        echo "CALL failed: (" . $mysqli->errno . ") " . $mysqli->error;
//    }
//https://stackoverflow.com/a/1686047/7270469
try {
    $result = array();
    $abc = $stmt->get_result();
//        print_r($abc);
    $cnt = 0;
    $row = $abc->fetch_assoc();
    if ($row) {
        $cnt = $row['cnt'];
    }
    while($row = $abc->fetch_assoc()) {
//            var_dump($row);
        $result[] = array('s_code' => $row['s_code'], 's_name' => $row['s_name'],
            'tel' => $row['tel'], 'fax' => $row['fax'],
            'sido_name' => $row['sido_name'], 'gugun_name' => $row['gugun_name'], 'dong_name' => $row['dong_name'],
            'addr'=> $row['addr'], 'doro_address' => $row['doro_address'], 'lat' => $row['lat'],
            'lot'=>$row['lot'], 'distance'=>$row['distance']);
    }
    header('Content-type: application/json');
    echo json_encode( array('result' => 'OK', 'data'=> array('cnt'=>$cnt, 'data'=>$result)) );
} catch(Exception $e) {
    echo json_encode(array('result' => 'FAIL', 'message' => $e->getMessage()));
}
?>
