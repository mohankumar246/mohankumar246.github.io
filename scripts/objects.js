var car_mat,bus_mat,log_mat,turtle_mat;
var car_geo,bus_geo,log_geo,turtle_geo;

var car_width = 20,car_height=40,car_depth=10;
var bus_width = 20,bus_height=70,bus_depth=15;
var log_width = 20,log_height=60,log_depth=5;
var turtle_width = 20,turtle_height=30,turtle_depth=5;
var origin_x,origin_y;
var speeds           = [0.3,0.7,1.5];
											//objs##row_nums
var obj_col_num     = [[0,1,4,5,9,10,11],	//cars_0
					   [0,2,8],				//bus_1
					   [1,4,7,11,12],		//cars_2
					   [1,7],				//bus_3
					   [1,6,7,8],			//cars_4
					   [1,2,3,6,8,9,10],	//turtle_5
					   [2,4,6,10],			//log_6
					   [1,2,5,6,8,9,10],	//turtle_7
					   [0,3,5,9,11],		//log_8
					   [0,3,7,10]];			//log_9

var num_rows         = 10;
var left_or_right    = [-1,-1,1,-1,1,-1,-1,1,-1,1];

var object_set_prev_pos;
var object_set;

function set_vertices(geometry, left_flag)
{
	geometry.faceVertexUvs[0] = [];

		geometry.faceVertexUvs[0][0] = [ car_front[0],car_front[2],car_front[3] ];
		geometry.faceVertexUvs[0][1] = [ car_front[1],car_front[2],car_front[3] ];

		geometry.faceVertexUvs[0][2] = [ car_side[0],car_side[2],car_side[3] ];
		geometry.faceVertexUvs[0][3] = [ car_side[1],car_side[2],car_side[3] ];

		geometry.faceVertexUvs[0][4] = [ car_back[0],car_back[2],car_back[3] ];
		geometry.faceVertexUvs[0][5] = [ car_back[1],car_back[2],car_back[3] ];

		geometry.faceVertexUvs[0][6] = [ car_side[0],car_side[2],car_side[3] ];
		geometry.faceVertexUvs[0][7] = [ car_side[1],car_side[2],car_side[3] ];

		geometry.faceVertexUvs[0][8] = [ car_top[0],car_top[2],car_top[3] ];
		geometry.faceVertexUvs[0][9] = [ car_top[1],car_top[2],car_top[3] ];

		geometry.faceVertexUvs[0][10] = [ car_top[0],car_top[2],car_top[3] ];
		geometry.faceVertexUvs[0][11] = [ car_top[1],car_top[2],car_top[3] ];
		/*
		geometry.faceVertexUvs[0][2] = [ car_front[0],car_front[2],car_front[3] ];
		geometry.faceVertexUvs[0][3] = [ car_front[1],car_front[2],car_front[3] ];

		geometry.faceVertexUvs[0][4] = [ car_front[0],car_front[2],car_front[3] ];
		geometry.faceVertexUvs[0][5] = [ car_front[1],car_front[2],car_front[3] ];

		geometry.faceVertexUvs[0][6] = [ car_front[0],car_front[2],car_front[3] ];
		geometry.faceVertexUvs[0][7] = [ car_front[1],car_front[2],car_front[3] ];

		geometry.faceVertexUvs[0][8] = [ car_front[0],car_front[2],car_front[3] ];
		geometry.faceVertexUvs[0][9] = [ car_front[1],car_front[2],car_front[3] ];

		geometry.faceVertexUvs[0][10] = [ car_front[0],car_front[2],car_front[3] ];
		geometry.faceVertexUvs[0][11] = [ car_front[1],car_front[2],car_front[3] ];
*/
	return geometry;
}
function createObjects()
{
	origin_x = -half_fieldWidth + road_size;
	origin_y = half_fieldWidth ;

	var car_mat =
		new THREE.MeshLambertMaterial(
			{
			  color: 0xff0000
		    });

	var bus_mat =
		new THREE.MeshLambertMaterial(
			{
			  color: 0xff0000
	    });

	var log_mat =
		new THREE.MeshLambertMaterial(
			{
			  color: 0xff0000
	    });

	var turtle_mat =
			new THREE.MeshLambertMaterial(
				{
				  color: 0xff0000
	 });

	car_geo = new THREE.CubeGeometry(
				car_width,
				car_height,
				car_depth);

	bus_geo = new THREE.CubeGeometry(
				bus_width,
				bus_height,
				bus_depth,
				1,
				1,
				1);

	log_geo = new THREE.CubeGeometry(
				log_width,
				log_height,
				log_depth,
				1,
				1,
				1);

	turtle_geo = new THREE.CubeGeometry(
				turtle_width,
				turtle_height,
				turtle_depth,
				1,
				1,
				1);

	var row=0;
	object_set_prev_pos = new Array(10);
	object_set          = new Array(10);

	for(row=0;row < num_rows; row=row+1)
	{
		var obj_idx;
		object_set_prev_pos[row] = new Array(fieldHeight/road_size);
		object_set[row] 		 = new Array(fieldHeight/road_size);

		if(row == 0 || row == 2 || row == 4)
		{
			//cars
			for(obj_idx=0;obj_idx < obj_col_num[row].length; obj_idx=obj_idx+1)
			{
				object_set_prev_pos[row][obj_idx] = (obj_col_num[row][obj_idx]*road_size);
				car_geo = set_vertices(car_geo);
				var car_obj = new THREE.Mesh(car_geo, car_material);
				car_obj.position.x = -(fieldHeight/2) + (row+1)*road_size + car_width;
				car_obj.position.y = object_set_prev_pos[row][obj_idx] - (fieldHeight/2) + car_height;
				car_obj.position.z = car_depth;
				car_obj.receiveShadow = true;
    			car_obj.castShadow = true;
				scene.add(car_obj);
				object_set[row][obj_idx] = car_obj;
			}
		}
		else if(row == 6 || row == 8 || row == 9)
		{
			//log
			for(obj_idx=0;obj_idx < obj_col_num[row].length; obj_idx=obj_idx+1)
			{
				object_set_prev_pos[row][obj_idx] = (obj_col_num[row][obj_idx]*road_size);
				var log_obj = new THREE.Mesh(log_geo, log_mat);
				log_obj.position.x = -(fieldHeight/2) + (row+2)*road_size + log_width;
				log_obj.position.y = object_set_prev_pos[row][obj_idx] - (fieldHeight/2) + log_height;
				log_obj.position.z = log_depth;
				log_obj.receiveShadow = true;
    			log_obj.castShadow = true;
				scene.add(log_obj);
				object_set[row][obj_idx] = log_obj;
			}
		}
		else if(row == 1 || row == 3)
		{
			//bus
			for(obj_idx=0;obj_idx < obj_col_num[row].length; obj_idx=obj_idx+1)
			{
				object_set_prev_pos[row][obj_idx] = (obj_col_num[row][obj_idx]*road_size);
				var bus_obj = new THREE.Mesh(bus_geo, bus_mat);
				bus_obj.position.x = -(fieldHeight/2) + (row+1)*road_size + bus_width;
				bus_obj.position.y = object_set_prev_pos[row][obj_idx] - (fieldHeight/2) + bus_height;
				bus_obj.position.z = bus_depth;
				bus_obj.receiveShadow = true;
    			bus_obj.castShadow = true;
				scene.add(bus_obj);
				object_set[row][obj_idx] = bus_obj;
			}
		}
		else
		{
			//turtle
			for(obj_idx=0;obj_idx < obj_col_num[row].length; obj_idx=obj_idx+1)
			{
				object_set_prev_pos[row][obj_idx] = (obj_col_num[row][obj_idx]*road_size);
				var turtle_obj = new THREE.Mesh(turtle_geo, turtle_mat);
				turtle_obj.position.x = -(fieldHeight/2) + (row+2)*road_size + turtle_width;
				turtle_obj.position.y = object_set_prev_pos[row][obj_idx] - (fieldHeight/2)  + turtle_height;
				turtle_obj.position.z = turtle_depth;
				turtle_obj.receiveShadow = true;
    			turtle_obj.castShadow = true;
				scene.add(turtle_obj);
				object_set[row][obj_idx] = turtle_obj;
			}
		}
	}
}

function animateObjects()
{
	var row=0,object_id;
	for(row=0;row < num_rows; row=row+1)
	{
		for(object_id=0;object_id < obj_col_num[row].length; object_id = object_id+1)
		{
			object_set_prev_pos[row][object_id] = (object_set_prev_pos[row][object_id] + speeds[row%speeds.length])%fieldHeight;

			if(left_or_right[row] == 1)
				object_set[row][object_id].position.y = object_set_prev_pos[row][object_id] - (fieldHeight/2) ;
			else
				object_set[row][object_id].position.y = -object_set_prev_pos[row][object_id] + (fieldHeight/2) ;
		}
	}
}

function frogDeadCheck()
{
	var row = ((frog.position.x + half_fieldWidth - frogWidth)/road_size) - 1;

	if((row == 5) || (row == 11)) //grass and endpoint
		row = -1;

	if(row > 5)
		row = row-1;

	//for roads
	frog.position.z = frogDepth;
	if((row >= 0) && (row < 5))
	{
		for(object_id=0;object_id < obj_col_num[row].length; object_id = object_id+1)
		{
			var obj_left   = object_set[row][object_id].geometry.vertices[0].y + object_set[row][object_id].position.y;
			var obj_right  = object_set[row][object_id].geometry.vertices[7].y + object_set[row][object_id].position.y;
			var frog_left  = frog.geometry.vertices[0].y + frog.position.y;
			var frog_right = frog.geometry.vertices[7].y + frog.position.y;


			//(obj right should be more than frog left ) or( frog right > obj left)
			if(!((obj_right > frog_left) || (frog_right > obj_left)))
			{
					frog.position.x = -half_fieldWidth + frogWidth;
					frog.position.y = 0;
					score = 0;
					roadkill.pause();
		 		    roadkill.currentTime = 0;
	  				roadkill.play();
	  				life=life-1;
					break;
			}
		}
	}

	//for water
	if((row >= 5) && (row < 10))
	{
		var flag =1;
		for(object_id=0;object_id < obj_col_num[row].length; object_id = object_id+1)
		{
			var obj_left   = object_set[row][object_id].geometry.vertices[0].y + object_set[row][object_id].position.y;
			var obj_right  = object_set[row][object_id].geometry.vertices[7].y + object_set[row][object_id].position.y;
			var frog_left  = frog.geometry.vertices[0].y + frog.position.y;
			var frog_right = frog.geometry.vertices[7].y + frog.position.y;

			if(!((obj_right > frog_left) || (frog_right > obj_left)))
			{
				 if(left_or_right[row] == 1)
				 	frog.position.y = frog.position.y + speeds[row%speeds.length];
				 else
				 	frog.position.y = frog.position.y - speeds[row%speeds.length];

				if(row == 5 || row == 7)
					frog.position.z = frogDepth + turtle_depth;
				else
					frog.position.z = frogDepth + log_depth;

				var frog_left  = frog.geometry.vertices[0].y + frog.position.y;
				var frog_right = frog.geometry.vertices[7].y + frog.position.y;

				if((frog_left > half_fieldWidth) || (frog_right < -half_fieldWidth))
				{
					frog.position.x = -half_fieldWidth + frogWidth;
					frog.position.y = 0;
					frog.position.z = frogDepth;
					score = 0;
					drown.pause();
					drown.currentTime = 0;
	  				drown.play();
	  				life=life-1;
				}
				flag = 0;
				break;
			}
		}

		if(flag)
		{
			frog.position.x = -half_fieldWidth + frogWidth;
			frog.position.y = 0;
			frog.position.z = frogDepth;
			drown.pause();
		    drown.currentTime = 0;
	  		drown.play();
			score = 0;
			life=life-1;
		}
	}
}