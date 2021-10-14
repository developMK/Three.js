var renderer, scene, camera, controls;
var WIDTH, HEIGHT;
var boxMesh, spotLight;

stageResize();
init();

function init(){
	// renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	// renderer.setClearColor(0x0E2255);
	// renderer.shadowMap.enabled = true;

	document.getElementById('world').appendChild(renderer.domElement);
	
	camera = new THREE.PerspectiveCamera(85, WIDTH / HEIGHT, .1, 1000); 
  camera.position.set(0 , 0, 50);
	
	scene = new THREE.Scene();
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	var axes = new THREE.AxesHelper(50);
	scene.add(axes)

	var gridHelper = new THREE.GridHelper( 100, 5 );
	scene.add( gridHelper );


	//조명1
	var light = new THREE.HemisphereLight( 0xc0daf5 , 0xc0daf5 , .3 );
	light.position.set( -50, 50, -50 );
	scene.add( light );

	// var helper = new THREE.HemisphereLightHelper( light, 5 );
	// scene.add( helper );

	//조명2
	spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( -35, 72, 80 );
	scene.add( spotLight );

	// var spotLightHelper = new THREE.SpotLightHelper( spotLight );
	// scene.add( spotLightHelper );


	var geometry = new THREE.BoxGeometry( 20, 20, 20 );
	var material = new THREE.MeshLambertMaterial( { color: 0xffff00 } );
	boxMesh = new THREE.Mesh( geometry, material );
	// boxMesh.castShadow = true;
	// boxMesh.receiveShadow = true;
	scene.add( boxMesh );
	
	render();
	guiSet();
}
//  camera.position.set(20 , 50, 50);

function guiSet(){
	var setting  = {
      x: 0
			,y: 0
			,z: 0
    };
    
    function guiChanged(){
      boxMesh.position.x = setting.x;
			boxMesh.position.y = setting.y;
			boxMesh.position.z = setting.z;
    };
    
    var gui = new dat.GUI();
    gui.add( setting, "x", -120, 120, 1 ).onChange( guiChanged );
    gui.add( setting, "y", -120, 120, 1 ).onChange( guiChanged );
    gui.add( setting, "z", -120, 120, 1 ).onChange( guiChanged );
    guiChanged();
}


function render() {
    camera.lookAt( scene.position );
	
		// boxMesh.rotation.z += 0.01;
		// boxMesh.rotation.x += 0.01;
		// boxMesh.rotation.y += 0.01;
	
    //controls.update( clock.getDelta() );
    renderer.render( scene, camera );
    requestAnimationFrame( render );
}

window.addEventListener( 'resize', stageResize );

function stageResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
	
    if(renderer != undefined){
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
				camera.updateProjectionMatrix();
    }
}
