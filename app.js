window.updatePreview = function(url) {
  if (typeof cropper === "undefined") {
    $("#profile-pic")
      .attr("src", url)
      .attr("id", "crop-img");
  } else {
    cropper.replace(url);
    return;
  }
  window.cropper = new Cropper(document.getElementById("crop-img"), {
    url: url,
    viewMode: 3,
    dragMode: "move",
    cropBoxResizable: false,
    cropBoxMovable: false,
    minCropBoxWidth: $("#preview").width(),
    minCropBoxHeight: $("#preview").height(),
    background: false,
    guides: false,
    checkCrossOrigin: false,
    strict: true
  });
  $(document).on("mouseover touchstart", function(e) {
    if ($("#fg").is(e.target)) {
      return;
    }
    if (
      !$(".cropper-crop-box").is(e.target) &&
      $(".cropper-crop-box").has(e.target).length === 0
    ) {
      document.getElementById("fg").style.zIndex = 10;
    }
  });
  $("#fg").on("mouseover click touchstart", function() {
    document.getElementById("fg").style.zIndex = -1;
  });
  $("#afterActions").show();
  document.getElementById("btnSave").onclick = function() {
    document.getElementById("preview2").style.display = "inline-block";
    var imageData = cropper
      .getCroppedCanvas({ width: 400, height: 400 })
      .toDataURL();
    //document.getElementById("profile-pic").src = imageData;
    //console.log(imageData);
    document.getElementById("pic").setAttribute("src", imageData);
    html2canvas($("#preview2")[0]).then(function(canvas) {
      $("#img-out").append(canvas);
      //Canvas2Image.saveAsPNG(canvas, 400, 400, "Image");
      $("#img-out")
        .get(0)
        .scrollIntoView();
    });
  };
  //document.getElementById("download").removeAttribute("disabled");
};
window.onFileChange = function(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      image = new Image();
      image.onload = function() {
        var width = this.width;
        var height = this.height;
        if (width >= 400 && height >= 400) updatePreview(e.target.result);
        else alert("Image should be atleast have 400px width and 400px height");
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
};
$(document).ready(function() {
  $(".design").on("click", function() {
    $("#fg")
      .attr("src", $(this).attr("src"))
      .data("design", $(this).data("design"));
    $(".design.active").removeClass("active");
    $(this).addClass("active");
  });
});
