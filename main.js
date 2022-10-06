alarm_sound = "";
person = [];
status = "";

function preload()
{
    alarm_sound = new Audio("mixkit-facility-alarm-sound-999.wav");
}
function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();

    personDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Person";

    video = createCapture(VIDEO);
    video.hide();
}
function modelLoaded()
{
    console.log("Model is loaded !");
    status = true;
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
    }
    person = results;
}
function draw()
{
    image(video, 0, 0, 640, 420);
    if(status != "")
    {
        personDetector.detect(video, gotResult);
        for (i = 0; i < person.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(person[i].confidence * 100);
            text(person[i].label + " " + percent + "%", person[i].x + 15, person[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(person[i].x, person[i].y, person[i].width, person[i].height);
            if(person[i].label == "person")
            {
                document.getElementById("found_result").innerHTML = "Baby Found";
            }
            else
            {
                document.getElementById("found_result").innerHTML = "Baby Not Found";
            }
        }
    }
}