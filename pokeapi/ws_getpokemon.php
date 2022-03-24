<?php
include_once('constantes.php');

function getpokemon($pArray)
{
    $nome = array_key_exists('nome', $pArray) ? $pArray['nome'] : '';
    $retorno = array(CONSResultado => 0, CONSMensagemResultado => TELANenhumRegistroEncontrado);

    $urlAPI = 'https://pokeapi.co/api/v2/pokemon/' . $nome;

    $response = file_get_contents($urlAPI);

    if ($response) {
        $retorno = array(CONSResultado => 1, CONSMensagemResultado => $response);
    } else {
        $retorno = array(CONSResultado => 2, CONSMensagemResultado => TELANenhumRegistroEncontrado);
    }

    return $retorno;
}
