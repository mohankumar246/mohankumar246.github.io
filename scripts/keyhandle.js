var currentlyPressedKeys = {};
var score_row = [0,1,1,1,1,1,5,2,2,2,2,2,10];

function handleKeyDown(event)
{
  currentlyPressedKeys[event.keyCode] = true;
  handleKeys();
}

function handleKeyUp(event)
{
  currentlyPressedKeys[event.keyCode] = false;
}

function handleKeys()
{

  if(life)
  {
	  if (currentlyPressedKeys[65]) //a
  	  {
      	if (frog.position.y < (half_fieldWidth - road_size))
	  	{
		 jump.pause();
		 jump.currentTime = 0;
	     jump.play();
	  	 frog.position.y += road_size;
	  	}
 	  }

	  if (currentlyPressedKeys[68]) //d
	  {
		  if (frog.position.y > (-half_fieldWidth + road_size))
		  {
			 jump.pause();
			 jump.currentTime = 0;
			 jump.play();
			 frog.position.y -= road_size;
		  }
	  }

	  if (currentlyPressedKeys[87]) //w
	  {
		  if (frog.position.x < (half_fieldWidth - road_size))
	 	 {
			  jump.pause();
			  jump.currentTime = 0;
	 	      jump.play();
	 	 	  frog.position.x += road_size;
	 	 	  var row = ((frog.position.x + half_fieldWidth - frogWidth)/road_size);
	 	 	  score = score + score_row[row];
	 	 	  if(max_score < score)
						max_score = score;
			  if(row == (score_row.length-1))
			  {
	 	 	  	success.pause();
			  	success.currentTime = 0;
	 	     	success.play();
	 	     	life = 0;
			  }
	 	 }
  	  }

 	 if (currentlyPressedKeys[83]) //s
 	 {
 	    if (frog.position.x > (-half_fieldWidth + road_size))
		 {
			 jump.pause();
			 jump.currentTime = 0;
			 jump.play();
			 frog.position.x -= road_size;
			 var row = ((frog.position.x + half_fieldWidth - frogWidth)/road_size);
			 score = score + score_row[row];
			 if(max_score < score)
						max_score = score;
		 }
 	 }
  }
  if (currentlyPressedKeys[82]) //s
  {
	restart();
  }
}