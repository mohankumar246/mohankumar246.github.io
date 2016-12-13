
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
var roadkill = new Audio('sounds/roadkill.mp3');
var jump = new Audio('sounds/jump.mp3');
var success = new Audio('sounds/success.mp3');
var drown = new Audio('sounds/drown.mp3');
var start = new Audio('sounds/start.wav');

var log_material,car_material,truck_material,frog_material,turtle_material,grass_material,water_material,road_material;
var car_front,car_top, car_side, car_back;

function loadtextures()
{
   car_material    = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/car.png') } );
   turtle_material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/turtle.png') } );
   truck_material  = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/truck.png') } );
   frog_material   = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/frog.png') } );
   log_material    = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/log.png') } );

   car_front   = [new THREE.Vector2(0, .832),	new THREE.Vector2(0.407, 0.832), new THREE.Vector2(0.407, 0.41), new THREE.Vector2(0, 0.41)];
   car_top     = [new THREE.Vector2(0.419, 0.997),	new THREE.Vector2(.746, .997), new THREE.Vector2(0.746, 0.435), new THREE.Vector2(0.419, 0.435)];
   car_back    = [new THREE.Vector2(0.560, 0.666),	new THREE.Vector2(0.99, 0.422), new THREE.Vector2(.99, 0.011), new THREE.Vector2(0.56, 0.011)];
   car_side    = [new THREE.Vector2(0, .411),	new THREE.Vector2(0.561, 0.411), new THREE.Vector2(.561, 0), new THREE.Vector2(0, 0)];

   var grass_tex = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/grass.jpg') } );
   var road_tex = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/road.jpg') } );
   var water_tex = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/water.jpg') } );

   grass_material = new THREE.MeshBasicMaterial({ map: grass_tex });
   road_material  = new THREE.MeshBasicMaterial({ map: road_tex  });
   water_material= new THREE.MeshBasicMaterial({ map: water_tex });
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
	createScene();
	loadtextures();
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

    var  plane_geo = new THREE.PlaneGeometry(
		planeWidth,
		planeHeight,
		planeQuality,
		planeQuality);

	// create the playing surface plane
	plane = new THREE.Mesh(
			    plane_geo,
  	            planeMaterial);

	scene.add(plane);
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
	    frogMaterial);

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
    spotLight.intensity = 1.5;
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
			document.getElementById("restart").innerHTML = "Sucess! Press 'r' to restart";
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

