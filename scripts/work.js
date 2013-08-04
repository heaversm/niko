var work = new Work_Class();

function Work_Class(){
  var self = this;

  var $workSection = $('#work'); //holds all the images
  var $menuInfo = $('#menu-info');

  var resizeTimer = null; //allows view to be hidden a moment while work thumbnails are resized

  function init(){
    buildCategoryImageList();
  }

  function buildCategoryImageList(){

    var workCategories = WORK_DATA.categories;

    for (var i=0;i<workCategories.length;i++){ //populate the section with images
      var categoryImage = workCategories[i].images[0];
      var categoryImageURL = "images/work/" + workCategories[i].category + "/thumbs/" + categoryImage;
      var categoryElement = $('<img>').attr({'src' : categoryImageURL, 'class' : 'category-image', 'alt' : workCategories[i].category });
      $workSection.append(categoryElement);
    }

    loadCategoryImages();
  }

  //imagesLoaded plugin: https://github.com/desandro/imagesloaded
  function loadCategoryImages(){ //detect when images are done loading
    $workSection.imagesLoaded().done(function(instance){
      sizeImages();
      addCategoryImageListeners();
    });
  }

  //jQuery collage plugin - http://collageplus.edlea.com/
  function sizeImages(){
    $workSection.removeWhitespace().collagePlus({
      'targetHeight'    : 200,
      'fadeSpeed' : 500,
      'allowPartialLastRow' : true
    });
  }

  function addCategoryImageListeners(){
    $('.category-image').on('mouseenter',function(){
      setCategoryName($(this));
    }).on('mouseleave',function(){
      //hideCategoryName($(this));
    }).on('click',function(){
      selectCategory($(this));
    });
  }

  function setCategoryName($thisImage){
    clearTimeout($menuInfo.data('timeoutid'));
    var categoryName = $thisImage.attr('alt');
    $menuInfo.find('#info-content').html(categoryName);
    //showCategoryName();
  }

  function showCategoryName(){
    $menuInfo.slideDown(200);
  }

  function hideCategoryName($thisImage){
    var categoryNameTimeout = setTimeout(function(){
      $menuInfo.slideUp(200);
    }, 500);
    $menuInfo.data('timeoutid', categoryNameTimeout);
  }

  function selectCategory($thisImage){
    var categoryName = $thisImage.attr('alt');
    hideCategories(categoryName);
  }

  function hideCategories(categoryName){

    var $categoryImages = $('.category-image');
    var numCategories = $categoryImages.length;

    $categoryImages.each(function(i){
      $(this).delay(i*100).fadeTo(200,0);
      //console.log(i,numCategories);
      if (i == numCategories-1){
        $workSection.empty();
        findSelectedCategory(categoryName);
      }
    })
  }

  function findSelectedCategory(categoryName){
    var workCategories = WORK_DATA.categories;
    for (var i=0;i<workCategories.length;i++){
      var curCategoryName = workCategories[i].category;
      if (curCategoryName == categoryName){
        buildSelectedCategory(i,categoryName);
      }
    }
  }

  function buildSelectedCategory(categoryIndex,categoryName){

    var categoryImgArray = WORK_DATA.categories[categoryIndex].images;

    for (var i=0; i<categoryImgArray.length; i++){
      var portfolioImage = categoryImgArray[i];
      var portfolioImageURL = "images/work/" + categoryName + "/thumbs/" + portfolioImage;
      var portfolioElement = $('<img>').attr({'src' : portfolioImageURL, 'class' : 'portfolio-image', 'alt' : 'Portfolio Image' });
      //MH - might need to change the images array in work data to an array of objects, and add a title attribute
      $workSection.append(portfolioElement);
    }
    loadPortfolioImages();
  }

  function loadPortfolioImages(){ //detect when images are done loading
    $workSection.imagesLoaded().done(function(instance){
      sizeImages();
      addPortfolioImageListeners();
    });
  }

  function addPortfolioImageListeners(){
    $('.portfolio-image').on('click',function(){
      console.log('CLICK');
    });
  }

  self.resize = function(){ //triggered from window.js
    $workSection.find('img').css("opacity", 0); //hide images
    if (resizeTimer){ // set a timer to re-apply the plugin
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(sizeImages, 200);
  }

  init();

}
