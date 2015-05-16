window.onload = function() {

    // CONSTANTS

    var circ = 2*Math.PI;
    var dist = 2.4;

    // init scene
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // create light

    var sLight = new THREE.SpotLight( 0xffffff );
    sLight.position.set( 0,10,0 );
    sLight.castShadow = true;
    // sLight.shadowCameraVisible = true;

    scene.add( sLight )

    var aLight = new THREE.AmbientLight( 0x404040 );

    scene.add( aLight );

    // create cube

    var cubeGeo = new THREE.BoxGeometry( 1, 1, 1 );
    var texture	= THREE.ImageUtils.loadTexture('../assets/samface.jpg');
    var cubeMat = new THREE.MeshLambertMaterial({ map: texture });
    var cube = new THREE.Mesh( cubeGeo, cubeMat );
    cube.castShadow = true;
    cube.rotation.y = circ/8;
    cube.rotation.x = circ/4 - Math.asin(1/Math.sqrt(3))

    scene.add( cube );

    camera.position.z = dist;

    var step = 0;

    // animation loop

    function render() {
    	requestAnimationFrame( render );

        step += .02 ;

        camera.position.z = dist*Math.cos(step);
        camera.position.x = dist*Math.sin(step);

        camera.lookAt(scene.position);


    	renderer.render( scene, camera );
    }

    // animate

    render();
}
