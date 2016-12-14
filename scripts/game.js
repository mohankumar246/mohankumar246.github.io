
// scene object variables
var renderer, scene, camera, pointLight, spotLight;

var road_size = 40;
// field variables
var fieldWidth = road_size*13, fieldHeight = road_size*13;
var half_fieldWidth = fieldWidth/2;

var frogWidth, frogHeight, frogDepth, frogQuality;

var frog;
var score=0;
var max_score = 0;
var life = 3;
var plane;

//music
var roadkill = new Audio('https://mohankumar246.github.io/sounds/roadkill.mp3');
var jump = new Audio('https://mohankumar246.github.io/sounds/jump.mp3');
var success = new Audio('https://mohankumar246.github.io/sounds/success.mp3');
var drown = new Audio('https://mohankumar246.github.io/sounds/drown.mp3');
var start = new Audio('https://mohankumar246.github.io/sounds/start.wav');

var log_material,car_material,truck_material,frog_material,turtle_material,grass_material,water_material,road_material;


function loadtextures()
{
   //THREE.ImageUtils.crossOrigin = '';
   car_material    = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('https://mohankumar246.github.io/images/car.png') } );
   turtle_material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('https://mohankumar246.github.io/images/turtle.png') } );
   truck_material  = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('https://mohankumar246.github.io/images/truck.png') } );
   frog_material   = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('https://mohankumar246.github.io/images/frog.png') } );
   log_material    = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('https://mohankumar246.github.io/images/log.png') } );

   grass_material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('https://mohankumar246.github.io/images/grass.jpg') } );
   road_material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( 'https://mohankumar246.github.io/images/road.jpg') } );
   water_material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('https://mohankumar246.github.io/images/water.jpg') } );
   road_material.wrapS = road_material.wrapT = THREE.RepeatWrapping;
   //road_material.repeat.set( 2, 2 );
   road_material.wrapAround = true;
}

function surface_cubes()
{
		var road  = new THREE.Mesh(
				  new THREE.CubeGeometry(
					road_size*5,
					fieldHeight,
					10,
					1,
					1,
					1),
	    			road_material);
		road.position.z = -5;
		road.position.x = -120;
		road.receiveShadow = true;
		scene.add(road);

	    var water  = new THREE.Mesh(
				  new THREE.CubeGeometry(
					road_size*5,
					fieldHeight,
					10,
					1,
					1,
					1),
	    			water_material);
	    water.position.z = -5;
		water.position.x = 120;
		water.receiveShadow = true;
		scene.add(water);

	    var grass1  = new THREE.Mesh(
				  new THREE.CubeGeometry(
					road_size,
					fieldHeight,
					10,
					1,
					1,
					1),
	    			grass_material);
	    grass1.position.z = -5;
		grass1.position.x = -240;
		grass1.receiveShadow = true;
		scene.add(grass1);

	    var grass2  = new THREE.Mesh(
				  new THREE.CubeGeometry(
					road_size,
					fieldHeight,
					10,
					1,
					1,
					1),
	    			grass_material);
	    grass2.position.z = -5;
	    grass2.receiveShadow = true;
	    scene.add(grass2);

	    var grass3  = new THREE.Mesh(
				  new THREE.CubeGeometry(
					road_size,
					fieldHeight,
					10,
					1,
					1,
					1),
	    			grass_material);
	    grass3.position.z = -5;
	    grass3.position.x = 240;
		grass3.receiveShadow = true;
		scene.add(grass3);
}

function restart()
{
	life = 3;
	frog.position.x = -half_fieldWidth + frogWidth;
	frog.position.z = frogDepth;
	start.pause();
	start.currentTime = 0;
	start.play();
	score = 0;
	document.getElementById("restart").innerHTML = "";
}

function setup()
{
	document.onkeydown  = handleKeyDown;
    document.onkeyup    = handleKeyUp;

	// set up all the 3D objects in the scene
	loadtextures();
	createScene();
	surface_cubes();
	createObjects();
	restart();
	draw();
}

function createScene()
{
	// set the scene size
	var WIDTH = 600,
	  HEIGHT = 500;

	// set some camera attributes
	var VIEW_ANGLE = 90,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	var c = document.getElementById("gameCanvas");

	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer();
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	scene = new THREE.Scene();

	// add the camera to the scene
	scene.add(camera);

	// set a default position for the camera
	// not doing this somehow messes up shadow rendering
	camera.position.z = 100;

	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	c.appendChild(renderer.domElement);

	// set up the playing surface plane
	var planeWidth = fieldWidth,
		planeHeight = fieldHeight,
		planeQuality = 10;

	var frogMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x1B32C0
		});
	// create the plane's material
	var planeMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x4BD121
		});


	plane  = new THREE.Mesh(
			  new THREE.CubeGeometry(
				planeWidth,
				planeHeight,
				planeHeight,
				frogQuality,
				frogQuality,
				frogQuality),
	    road_material);


	plane.position.z = -planeHeight/2;
	//scene.add(plane);
	plane.receiveShadow = true;

	frogWidth = 20;
	frogHeight = 15;
	frogDepth = 10;
	frogQuality = 1;

	frog = new THREE.Mesh(
	  new THREE.CubeGeometry(
		frogWidth,
		frogHeight,
		frogDepth,
		frogQuality,
		frogQuality,
		frogQuality),
	    frog_material);

	// // add the sphere to the scene
	scene.add(frog);
	frog.receiveShadow = true;
    frog.castShadow = true;

	frog.position.x = -half_fieldWidth + frogWidth;

	frog.position.z = frogDepth;

	// // create a point light
	pointLight =
	  new THREE.PointLight(0xF8D898);

	// set its position
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 2.9;
	pointLight.distance = 10000;
	// add to the scene
	scene.add(pointLight);

	// add a spot light
	// this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 0.5;
    spotLight.castShadow = true;
    scene.add(spotLight);

	renderer.shadowMapEnabled = true;
}

function draw()
{
	// draw THREE.JS scene
	renderer.render(scene, camera);
	// loop draw function call
	requestAnimationFrame(draw);
	animateObjects();
	frogDeadCheck();

    if(life == 0)
    {
		var row = ((frog.position.x + half_fieldWidth - frogWidth)/road_size);
		if(row != 12)
			document.getElementById("restart").innerHTML = "Game over, Press 'r' to restart";
		else
			document.getElementById("restart").innerHTML = "Success! Press 'r' to restart";
	}
	document.getElementById("scores").innerHTML = "Lives = " + life+", Current Score = " + score +", Max Score = " + max_score ;
	cameraSet();
}

function cameraSet()
{
	camera.position.x = frog.position.x - 100;
	camera.position.y += (frog.position.y - camera.position.y) * 0.05;
	camera.position.z = frog.position.z + 100 + 0.04 * (frog.position.x);

	camera.rotation.y = -60 * Math.PI/180;
	camera.rotation.z = -90 * Math.PI/180;
}

