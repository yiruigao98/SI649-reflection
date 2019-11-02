function update_angle(){

    var in_rotate_angle=45-slider_in_angle.value;
    var inElement = document.getElementById("item");
    inElement.setAttribute('transform','rotate('+ in_rotate_angle +',200,200)');

    var refle_angle= slider_in_angle.value;
    var refle_rotate_angle = refle_angle - 45;
    var refleElement = document.getElementById("item2");
    refleElement.setAttribute('transform','rotate('+ refle_rotate_angle +',200,200)');

    var refra_angle;
    var refra_rotate_angle;
    if(slider_in_angle.value < 90)
    {
        refra_angle = (Math.asin(Math.sin((Math.PI/180)*slider_in_angle.value)*slider_m1.value/slider_m2.value))*(180/Math.PI);
        refra_rotate_angle = 45 - refra_angle;
    }else if(slider_in_angle.value == 90){
        refra_angle = 90;
        refra_rotate_angle = 45 - refra_angle;
    }else{
        var real_in_angle = 180 - slider_in_angle.value;
        refra_angle = (Math.asin(Math.sin((Math.PI/180)*real_in_angle.value)*slider_m2.value/slider_m1.value))*(180/Math.PI);
        refra_rotate_angle = refra_angle - 135;
    }
    var refraElement = document.getElementById("item2");
    refraElement.setAttribute('transform','rotate('+ refra_rotate_angle +',200,200)');

    // var index_select = document.getElementById("rect");
    // index_select.setAttribute('fill-opacity', + (slider2.value/2.5) + - 0 );

    //var angle12=45-r;
    //var kh=45.0-(Math.asin(Math.sin((Math.PI/180)*slider.value)/slider2.value))*(180/Math.PI);
    //document.getElementById("angler").innerHTML=r.toFixed(2);

}

var slider_m1 = document.getElementById("index1");
var output_m1 = document.getElementById("index-angle");
output_m1.innerHTML = slider_m1.value;

var slider_m2 = document.getElementById("index2");
var output_m2 = document.getElementById("index-angle");
output_m2.innerHTML = slider_m2.value;

var slider_in_angle = document.getElementById("in_angle");
var output_in_angle = document.getElementById("index-angle");
output_in_angle.innerHTML = slider_in_angle.value;

slider_m1.oninput = function() {
    output_m1.innerHTML = this.value;
    update_angle();
};
slider_m2.oninput = function() {
    output_m2.innerHTML = this.value;
    update_angle();
};
slider_in_angle.oninput = function() {
    output_in_angle.innerHTML = this.value;
    update_angle();

};
update_angle();