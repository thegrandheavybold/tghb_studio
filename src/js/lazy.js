// Make it simple to swap parts of a URL attribute on an element
function updateAttributeURL(element, attr, swapOut, swapIn) {
  var url = element.getAttribute(attr);
  url = url.replace(swapOut, swapIn);
  element.setAttribute(attr, url);
}


// Update the image source on elements in the picture element
function loadImage(picture) {

  var sources = picture.children;
  var loadingPath = "assets/img/tiny";
  var sizes = ["original","large","medium","small"];

  for(var s=0; s<sources.length; s++) {
    // update the src or srcset urls
    if (sources[s].hasAttribute("srcset")) {
      updateAttributeURL(sources[s], "srcset", loadingPath, "assets/img/"+sizes[s] );
    } else {
      updateAttributeURL(sources[s], "src", loadingPath, "assets/img/"+sizes[s] );
    }

    // remove the lazy-initial class when the full image is loaded to unblur
    sources[s].addEventListener('load', image => {
      image.target.closest("picture").classList.remove("lazy-initial")
    }, false);
  }

}




// Update the image source on elements in the picture element
function loadImageFigure(figure) {

  var sources = figure.children;
  var loadingPath = "assets/img/tiny";
  var sizes = ["original","large","medium","small"];

  for(var s=0; s<sources.length; s++) {
    // update the src or srcset urls
    if (sources[s].hasAttribute("srcset")) {
      updateAttributeURL(sources[s], "srcset", loadingPath, "assets/img/"+sizes[s] );
    } else {
      updateAttributeURL(sources[s], "src", loadingPath, "assets/img/"+sizes[s] );
    }

    // remove the lazy-initial class when the full image is loaded to unblur
    sources[s].addEventListener('load', image => {
      image.target.closest("figure").classList.remove("lazy-initial")
    }, false);
  }

}

// Stop observing this image and load its source
function lazyLoad(elements) {
  elements.forEach(item => {
    if (item.intersectionRatio > 0) {
      observer.unobserve(item.target);
      loadImage(item.target);
      loadImageFigure(item.target);
    };
  });
};

// Set up the intersection observer to detect when to define
// and load the real image source
var options = {
  rootMargin: "100px",
  threshold: 1
};
var observer = new IntersectionObserver(lazyLoad, options);

// Watch for all pictures with a "lazy" class
var pictures = document.querySelectorAll('lazy');
pictures.forEach(pic => {
  observer.observe(pic);
});

// Watch for all pictures with a "lazy" class
var figures = document.querySelectorAll('lazy');
figures.forEach(pic => {
  observer.observe(pic);
});
