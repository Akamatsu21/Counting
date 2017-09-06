/*SELECT `message` FROM `xf_post` WHERE `thread_id`=11780 AND `user_id`<>918 AND `user_id`<>1957 AND `user_id`<>671 ORDER BY `post_date` ASC LIMIT 1000*/

trimerini = function(s)
{
	s = s.toUpperCase();

	while(s.indexOf("[QUOTE") != -1)
	{
		s = s.substring(0, s.indexOf("[QUOTE")) + s.substring(s.indexOf("[/QUOTE]") + 8);
	}
	while(s.indexOf("[IMG") != -1)
	{
		s = s.substring(0, s.indexOf("[IMG")) + s.substring(s.indexOf("[/IMG]") + 6);
	}
	while(s.indexOf("[ATTACH") != -1)
	{
		s = s.substring(0, s.indexOf("[ATTACH")) + s.substring(s.indexOf("[/ATTACH]") + 9);
	}
	while(s.indexOf("[MEDIA") != -1)
	{
		s = s.substring(0, s.indexOf("[MEDIA")) + s.substring(s.indexOf("[/MEDIA]") + 8);
	}
	while(s.indexOf("[URL") != -1)
	{
		s = s.substring(0, s.indexOf("[URL")) + s.substring(s.indexOf("[/URL]") + 6);
	}
	while(s.indexOf("<BR>") != -1)
	{
		s = s.substring(0, s.indexOf("<BR>")) + s.substring(s.indexOf("<BR>") + 4);
	}

	if (s.match(/[0-9]/g) == null)
		return "";
	else
		return s;
}


var tablerini = $(".odd > td:first-child > span, .even > td:first-child > span");
var index = 0;
var i = 1;
var counter = 0;
var list = [];
while(i <= 880 && index <= 924)
{
	var post = trimerini(tablerini[index].innerHTML);

	//console.log(post + " is at i=" + i + " and index=" + index);

	if(post == "")
	{
		++index;
		continue;
	}

	if(post.indexOf(i + "") != -1)
	{
		list[i] = index;

		if(list[i - 1] == -1)
		{
			/*******Louis section*******/
			
			var prev = i - 1;
			while(list[prev] == -1)
			{
				--prev;
			}
			var images = 0;
			for(var k = list[prev] + 1; k < list[i]; ++k)
			{
				console.log(trimerini(tablerini[k].innerHTML));
				if(trimerini(tablerini[k].innerHTML) == "")
				{
					++images;
				}
			}
			if(images >= (i - prev - 1))
			{
				for(var k = prev + 1; k < i; ++k)
				{
					list[k] = -2;
				}
			}

			/***************************/
		}
		++index;
		++i;
	}
	else
	{
		for(var k = 1; k <= 25; ++k)
		{
			if(post.indexOf((i + k) + "") != -1)
			{
				list[i] = -1;
				++counter;
				++i;
				break;
			}
			else if(k == 25)
			{
				++index;
			}
		}
	}
}



for(var k = 0; k < list.length; ++k)
{
	if(list[k] == -1)
	{
		console.log(k + " is missing");
	}
	/*else if(list[k] == -2)
	{
		console.log(k + " is an image");
	}*/
}

console.log(counter);