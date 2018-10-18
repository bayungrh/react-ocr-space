<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$container = $app->getContainer();
$container['upload_directory'] = './uploads/';

$app->get('/getuser', 'HomeController:getuser');

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");
    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization,')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
$app->post('/files/upload', function(Request $request, Response $response) {
    $directory = $this->get('upload_directory');

    $uploadedFiles = $request->getUploadedFiles();
    $imageAllow = array('image/gif', 'image/jpeg', 'image/png');
    
    // handle single input with single file upload
    $uploadedFile = $uploadedFiles['myFile'];
    if(!in_array($uploadedFile->getClientMediaType(), $imageAllow)) {
        return $response->withJson(['success' => false, 'message' => 'File type not allowed']);
    }
    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
        $filename = moveUploadedFile($directory, $uploadedFile);
        $data = array(
        	'success' => true,
        	'filename' => $filename,
        	'url' => $request->getUri()->getBaseUrl()."/uploads/$filename",
        	'type' => $uploadedFile->getClientMediaType(),
        );
		return $response->withJson($data);
    } else {
    	return $response->withJson(['success' => false]);
    }

});