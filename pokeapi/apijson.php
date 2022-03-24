<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Max-Age: 1000");

include_once('constantes.php');

if (strcasecmp($_SERVER['REQUEST_METHOD'], 'GET') == 0) {
    $pparametros = isset($_GET) ? $_GET : [];

    $arquivo = 'ws_getpokemon.php';

    if (file_exists($arquivo)) {
        require_once($arquivo);
        $retorno = array();

        if (function_exists('getpokemon')) {
            $poperacaoAPI = 'getpokemon';
            $retorno = $poperacaoAPI($pparametros);
        } else {
            $retorno = array(CONSResultado => 2, CONSMensagemResultado => TELAOperacaoNaoAutorizada);
        }
    } else {
        $retorno = array(CONSResultado => 2, CONSMensagemResultado => TELAOperacaoNaoAutorizada);
    }
}

echo json_encode($retorno);
