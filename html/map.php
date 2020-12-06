<?php
    require_once 'global.php';

    $mysqli = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_DB_NAME);

    $stmt = $mysqli->prepare('CALL API_TO_WEB_SELECT_MAP_POLYGON_USING_DISTANCE(37.513224, 127.1001228, 5, 0, 100)');
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
            $result[] = array('EMD_CD' => $row['EMD_CD'], 'EMD_ENG_NM' => $row['EMD_ENG_NM'],
                'EMD_KOR_NM' => $row['EMD_KOR_NM'], 'type' => $row['type'],
                'center_lat'=> $row['center_lat'], 'center_lot' => $row['center_lot'],
            'distance' => $row['distance']
            , 'coordinates' => json_decode($row['coordinates']));
        }
        header('Content-type: application/json');
        echo json_encode( array('result' => 'OK', 'data'=> array('cnt'=>$cnt, 'data'=>$result)) );
    } catch(Exception $e) {
        echo json_encode(array('result' => 'FAIL', 'message' => $e->getMessage()));
    }
?>