(function () {
	'use strict';

	/**
	 * File navigation.js.
	 *
	 * Handles toggling the navigation menu for small screens and enables TAB key
	 * navigation support for dropdown menus.
	 */
	( function() {
		var container, button, menu, links, i, len;
	  var cursorDot = document.querySelector(".c-cursor__dot");
	  var main = document.querySelector("main");

		container = document.getElementById( 'site-navigation' );
		if ( ! container ) {
			return;
		}

		button = container.getElementsByTagName( 'button' )[0];
		if ( 'undefined' === typeof button ) {
			return;
		}

		menu = container.getElementsByTagName( 'ul' )[0];

		// Hide menu toggle button if menu is empty and return early.
		if ( 'undefined' === typeof menu ) {
			button.style.display = 'none';
			return;
		}

		menu.setAttribute( 'aria-expanded', 'false' );
		if ( -1 === menu.className.indexOf( 'menu__items' ) ) {
			menu.className += ' menu__items';
		}

		button.onclick = function() {
			if ( -1 !== container.className.indexOf( 'toggled' ) ) {
				container.className = container.className.replace( ' toggled', '' );
				button.setAttribute( 'aria-expanded', 'false' );
				menu.setAttribute( 'aria-expanded', 'false' );
	      cursorDot.classList.remove('c-cursor__inverted');
	      main.setAttribute("style", "display:block;");
			} else {
				container.className += ' toggled';
				button.setAttribute( 'aria-expanded', 'true' );
				menu.setAttribute( 'aria-expanded', 'true' );
	      cursorDot.className += ' c-cursor__inverted';
	      main.setAttribute("style", "display:none;");
			}
		};

		// Get all the link elements within the menu.
		links    = menu.getElementsByTagName( 'a' );

		// Each time a menu link is focused or blurred, toggle focus.
		for ( i = 0, len = links.length; i < len; i++ ) {
			links[i].addEventListener( 'focus', toggleFocus, true );
			links[i].addEventListener( 'blur', toggleFocus, true );
		}

		/**
		 * Sets or removes .focus class on an element.
		 */
		function toggleFocus() {
			var self = this;

			// Move up through the ancestors of the current link until we hit .menu__items.
			while ( -1 === self.className.indexOf( 'menu__items' ) ) {

				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					if ( -1 !== self.className.indexOf( 'focus' ) ) {
						self.className = self.className.replace( ' focus', '' );
					} else {
						self.className += ' focus';
					}
				}

				self = self.parentElement;
			}
		}


	} )();

	// Make it simple to swap parts of a URL attribute on an element
	function updateAttributeURL(element, attr, swapOut, swapIn) {
	  var url = element.getAttribute(attr);
	  url = url.replace(swapOut, swapIn);
	  element.setAttribute(attr, url);
	}


	// Update the image source on elements in the picture element
	function loadImage$1(picture) {

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
	      image.target.closest("picture").classList.remove("lazy-initial");
	    }, false);
	  }

	}


	// Stop observing this image and load its source
	function lazyLoad(elements) {
	  elements.forEach(item => {
	    if (item.intersectionRatio > 0) {
	      observer.unobserve(item.target);
	      loadImage$1(item.target);
	    }
	  });
	}


	// Set up the intersection observer to detect when to define
	// and load the real image source
	var options = {
	  rootMargin: "0px",
	  threshold: 0
	};
	var observer = new IntersectionObserver(lazyLoad, options);

	// Watch for all pictures with a "lazy" class
	var pictures = document.querySelectorAll('picture.lazy');
	pictures.forEach(pic => {
	  observer.observe(pic);
	});

	/**
	 * SSR Window 4.0.2
	 * Better handling for window object in SSR environment
	 * https://github.com/nolimits4web/ssr-window
	 *
	 * Copyright 2021, Vladimir Kharlampidi
	 *
	 * Licensed under MIT
	 *
	 * Released on: December 13, 2021
	 */
	/* eslint-disable no-param-reassign */
	function isObject$1(obj) {
	    return (obj !== null &&
	        typeof obj === 'object' &&
	        'constructor' in obj &&
	        obj.constructor === Object);
	}
	function extend$1(target = {}, src = {}) {
	    Object.keys(src).forEach((key) => {
	        if (typeof target[key] === 'undefined')
	            target[key] = src[key];
	        else if (isObject$1(src[key]) &&
	            isObject$1(target[key]) &&
	            Object.keys(src[key]).length > 0) {
	            extend$1(target[key], src[key]);
	        }
	    });
	}

	const ssrDocument = {
	    body: {},
	    addEventListener() { },
	    removeEventListener() { },
	    activeElement: {
	        blur() { },
	        nodeName: '',
	    },
	    querySelector() {
	        return null;
	    },
	    querySelectorAll() {
	        return [];
	    },
	    getElementById() {
	        return null;
	    },
	    createEvent() {
	        return {
	            initEvent() { },
	        };
	    },
	    createElement() {
	        return {
	            children: [],
	            childNodes: [],
	            style: {},
	            setAttribute() { },
	            getElementsByTagName() {
	                return [];
	            },
	        };
	    },
	    createElementNS() {
	        return {};
	    },
	    importNode() {
	        return null;
	    },
	    location: {
	        hash: '',
	        host: '',
	        hostname: '',
	        href: '',
	        origin: '',
	        pathname: '',
	        protocol: '',
	        search: '',
	    },
	};
	function getDocument() {
	    const doc = typeof document !== 'undefined' ? document : {};
	    extend$1(doc, ssrDocument);
	    return doc;
	}

	const ssrWindow = {
	    document: ssrDocument,
	    navigator: {
	        userAgent: '',
	    },
	    location: {
	        hash: '',
	        host: '',
	        hostname: '',
	        href: '',
	        origin: '',
	        pathname: '',
	        protocol: '',
	        search: '',
	    },
	    history: {
	        replaceState() { },
	        pushState() { },
	        go() { },
	        back() { },
	    },
	    CustomEvent: function CustomEvent() {
	        return this;
	    },
	    addEventListener() { },
	    removeEventListener() { },
	    getComputedStyle() {
	        return {
	            getPropertyValue() {
	                return '';
	            },
	        };
	    },
	    Image() { },
	    Date() { },
	    screen: {},
	    setTimeout() { },
	    clearTimeout() { },
	    matchMedia() {
	        return {};
	    },
	    requestAnimationFrame(callback) {
	        if (typeof setTimeout === 'undefined') {
	            callback();
	            return null;
	        }
	        return setTimeout(callback, 0);
	    },
	    cancelAnimationFrame(id) {
	        if (typeof setTimeout === 'undefined') {
	            return;
	        }
	        clearTimeout(id);
	    },
	};
	function getWindow() {
	    const win = typeof window !== 'undefined' ? window : {};
	    extend$1(win, ssrWindow);
	    return win;
	}

	/**
	 * Dom7 4.0.6
	 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
	 * https://framework7.io/docs/dom7.html
	 *
	 * Copyright 2023, Vladimir Kharlampidi
	 *
	 * Licensed under MIT
	 *
	 * Released on: February 2, 2023
	 */

	/* eslint-disable no-proto */
	function makeReactive(obj) {
	  const proto = obj.__proto__;
	  Object.defineProperty(obj, '__proto__', {
	    get() {
	      return proto;
	    },

	    set(value) {
	      proto.__proto__ = value;
	    }

	  });
	}

	class Dom7 extends Array {
	  constructor(items) {
	    if (typeof items === 'number') {
	      super(items);
	    } else {
	      super(...(items || []));
	      makeReactive(this);
	    }
	  }

	}

	function arrayFlat(arr = []) {
	  const res = [];
	  arr.forEach(el => {
	    if (Array.isArray(el)) {
	      res.push(...arrayFlat(el));
	    } else {
	      res.push(el);
	    }
	  });
	  return res;
	}
	function arrayFilter(arr, callback) {
	  return Array.prototype.filter.call(arr, callback);
	}
	function arrayUnique(arr) {
	  const uniqueArray = [];

	  for (let i = 0; i < arr.length; i += 1) {
	    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
	  }

	  return uniqueArray;
	}

	// eslint-disable-next-line

	function qsa(selector, context) {
	  if (typeof selector !== 'string') {
	    return [selector];
	  }

	  const a = [];
	  const res = context.querySelectorAll(selector);

	  for (let i = 0; i < res.length; i += 1) {
	    a.push(res[i]);
	  }

	  return a;
	}

	function $(selector, context) {
	  const window = getWindow();
	  const document = getDocument();
	  let arr = [];

	  if (!context && selector instanceof Dom7) {
	    return selector;
	  }

	  if (!selector) {
	    return new Dom7(arr);
	  }

	  if (typeof selector === 'string') {
	    const html = selector.trim();

	    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
	      let toCreate = 'div';
	      if (html.indexOf('<li') === 0) toCreate = 'ul';
	      if (html.indexOf('<tr') === 0) toCreate = 'tbody';
	      if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
	      if (html.indexOf('<tbody') === 0) toCreate = 'table';
	      if (html.indexOf('<option') === 0) toCreate = 'select';
	      const tempParent = document.createElement(toCreate);
	      tempParent.innerHTML = html;

	      for (let i = 0; i < tempParent.childNodes.length; i += 1) {
	        arr.push(tempParent.childNodes[i]);
	      }
	    } else {
	      arr = qsa(selector.trim(), context || document);
	    } // arr = qsa(selector, document);

	  } else if (selector.nodeType || selector === window || selector === document) {
	    arr.push(selector);
	  } else if (Array.isArray(selector)) {
	    if (selector instanceof Dom7) return selector;
	    arr = selector;
	  }

	  return new Dom7(arrayUnique(arr));
	}

	$.fn = Dom7.prototype;

	// eslint-disable-next-line

	function addClass(...classes) {
	  const classNames = arrayFlat(classes.map(c => c.split(' ')));
	  this.forEach(el => {
	    el.classList.add(...classNames);
	  });
	  return this;
	}

	function removeClass(...classes) {
	  const classNames = arrayFlat(classes.map(c => c.split(' ')));
	  this.forEach(el => {
	    el.classList.remove(...classNames);
	  });
	  return this;
	}

	function toggleClass(...classes) {
	  const classNames = arrayFlat(classes.map(c => c.split(' ')));
	  this.forEach(el => {
	    classNames.forEach(className => {
	      el.classList.toggle(className);
	    });
	  });
	}

	function hasClass(...classes) {
	  const classNames = arrayFlat(classes.map(c => c.split(' ')));
	  return arrayFilter(this, el => {
	    return classNames.filter(className => el.classList.contains(className)).length > 0;
	  }).length > 0;
	}

	function attr(attrs, value) {
	  if (arguments.length === 1 && typeof attrs === 'string') {
	    // Get attr
	    if (this[0]) return this[0].getAttribute(attrs);
	    return undefined;
	  } // Set attrs


	  for (let i = 0; i < this.length; i += 1) {
	    if (arguments.length === 2) {
	      // String
	      this[i].setAttribute(attrs, value);
	    } else {
	      // Object
	      for (const attrName in attrs) {
	        this[i][attrName] = attrs[attrName];
	        this[i].setAttribute(attrName, attrs[attrName]);
	      }
	    }
	  }

	  return this;
	}

	function removeAttr(attr) {
	  for (let i = 0; i < this.length; i += 1) {
	    this[i].removeAttribute(attr);
	  }

	  return this;
	}

	function transform(transform) {
	  for (let i = 0; i < this.length; i += 1) {
	    this[i].style.transform = transform;
	  }

	  return this;
	}

	function transition$1(duration) {
	  for (let i = 0; i < this.length; i += 1) {
	    this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;
	  }

	  return this;
	}

	function on(...args) {
	  let [eventType, targetSelector, listener, capture] = args;

	  if (typeof args[1] === 'function') {
	    [eventType, listener, capture] = args;
	    targetSelector = undefined;
	  }

	  if (!capture) capture = false;

	  function handleLiveEvent(e) {
	    const target = e.target;
	    if (!target) return;
	    const eventData = e.target.dom7EventData || [];

	    if (eventData.indexOf(e) < 0) {
	      eventData.unshift(e);
	    }

	    if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
	      const parents = $(target).parents(); // eslint-disable-line

	      for (let k = 0; k < parents.length; k += 1) {
	        if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
	      }
	    }
	  }

	  function handleEvent(e) {
	    const eventData = e && e.target ? e.target.dom7EventData || [] : [];

	    if (eventData.indexOf(e) < 0) {
	      eventData.unshift(e);
	    }

	    listener.apply(this, eventData);
	  }

	  const events = eventType.split(' ');
	  let j;

	  for (let i = 0; i < this.length; i += 1) {
	    const el = this[i];

	    if (!targetSelector) {
	      for (j = 0; j < events.length; j += 1) {
	        const event = events[j];
	        if (!el.dom7Listeners) el.dom7Listeners = {};
	        if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
	        el.dom7Listeners[event].push({
	          listener,
	          proxyListener: handleEvent
	        });
	        el.addEventListener(event, handleEvent, capture);
	      }
	    } else {
	      // Live events
	      for (j = 0; j < events.length; j += 1) {
	        const event = events[j];
	        if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
	        if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
	        el.dom7LiveListeners[event].push({
	          listener,
	          proxyListener: handleLiveEvent
	        });
	        el.addEventListener(event, handleLiveEvent, capture);
	      }
	    }
	  }

	  return this;
	}

	function off(...args) {
	  let [eventType, targetSelector, listener, capture] = args;

	  if (typeof args[1] === 'function') {
	    [eventType, listener, capture] = args;
	    targetSelector = undefined;
	  }

	  if (!capture) capture = false;
	  const events = eventType.split(' ');

	  for (let i = 0; i < events.length; i += 1) {
	    const event = events[i];

	    for (let j = 0; j < this.length; j += 1) {
	      const el = this[j];
	      let handlers;

	      if (!targetSelector && el.dom7Listeners) {
	        handlers = el.dom7Listeners[event];
	      } else if (targetSelector && el.dom7LiveListeners) {
	        handlers = el.dom7LiveListeners[event];
	      }

	      if (handlers && handlers.length) {
	        for (let k = handlers.length - 1; k >= 0; k -= 1) {
	          const handler = handlers[k];

	          if (listener && handler.listener === listener) {
	            el.removeEventListener(event, handler.proxyListener, capture);
	            handlers.splice(k, 1);
	          } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
	            el.removeEventListener(event, handler.proxyListener, capture);
	            handlers.splice(k, 1);
	          } else if (!listener) {
	            el.removeEventListener(event, handler.proxyListener, capture);
	            handlers.splice(k, 1);
	          }
	        }
	      }
	    }
	  }

	  return this;
	}

	function trigger(...args) {
	  const window = getWindow();
	  const events = args[0].split(' ');
	  const eventData = args[1];

	  for (let i = 0; i < events.length; i += 1) {
	    const event = events[i];

	    for (let j = 0; j < this.length; j += 1) {
	      const el = this[j];

	      if (window.CustomEvent) {
	        const evt = new window.CustomEvent(event, {
	          detail: eventData,
	          bubbles: true,
	          cancelable: true
	        });
	        el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
	        el.dispatchEvent(evt);
	        el.dom7EventData = [];
	        delete el.dom7EventData;
	      }
	    }
	  }

	  return this;
	}

	function transitionEnd$1(callback) {
	  const dom = this;

	  function fireCallBack(e) {
	    if (e.target !== this) return;
	    callback.call(this, e);
	    dom.off('transitionend', fireCallBack);
	  }

	  if (callback) {
	    dom.on('transitionend', fireCallBack);
	  }

	  return this;
	}

	function outerWidth(includeMargins) {
	  if (this.length > 0) {
	    if (includeMargins) {
	      const styles = this.styles();
	      return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
	    }

	    return this[0].offsetWidth;
	  }

	  return null;
	}

	function outerHeight(includeMargins) {
	  if (this.length > 0) {
	    if (includeMargins) {
	      const styles = this.styles();
	      return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
	    }

	    return this[0].offsetHeight;
	  }

	  return null;
	}

	function offset() {
	  if (this.length > 0) {
	    const window = getWindow();
	    const document = getDocument();
	    const el = this[0];
	    const box = el.getBoundingClientRect();
	    const body = document.body;
	    const clientTop = el.clientTop || body.clientTop || 0;
	    const clientLeft = el.clientLeft || body.clientLeft || 0;
	    const scrollTop = el === window ? window.scrollY : el.scrollTop;
	    const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
	    return {
	      top: box.top + scrollTop - clientTop,
	      left: box.left + scrollLeft - clientLeft
	    };
	  }

	  return null;
	}

	function styles() {
	  const window = getWindow();
	  if (this[0]) return window.getComputedStyle(this[0], null);
	  return {};
	}

	function css(props, value) {
	  const window = getWindow();
	  let i;

	  if (arguments.length === 1) {
	    if (typeof props === 'string') {
	      // .css('width')
	      if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
	    } else {
	      // .css({ width: '100px' })
	      for (i = 0; i < this.length; i += 1) {
	        for (const prop in props) {
	          this[i].style[prop] = props[prop];
	        }
	      }

	      return this;
	    }
	  }

	  if (arguments.length === 2 && typeof props === 'string') {
	    // .css('width', '100px')
	    for (i = 0; i < this.length; i += 1) {
	      this[i].style[props] = value;
	    }

	    return this;
	  }

	  return this;
	}

	function each(callback) {
	  if (!callback) return this;
	  this.forEach((el, index) => {
	    callback.apply(el, [el, index]);
	  });
	  return this;
	}

	function filter(callback) {
	  const result = arrayFilter(this, callback);
	  return $(result);
	}

	function html$1(html) {
	  if (typeof html === 'undefined') {
	    return this[0] ? this[0].innerHTML : null;
	  }

	  for (let i = 0; i < this.length; i += 1) {
	    this[i].innerHTML = html;
	  }

	  return this;
	}

	function text(text) {
	  if (typeof text === 'undefined') {
	    return this[0] ? this[0].textContent.trim() : null;
	  }

	  for (let i = 0; i < this.length; i += 1) {
	    this[i].textContent = text;
	  }

	  return this;
	}

	function is(selector) {
	  const window = getWindow();
	  const document = getDocument();
	  const el = this[0];
	  let compareWith;
	  let i;
	  if (!el || typeof selector === 'undefined') return false;

	  if (typeof selector === 'string') {
	    if (el.matches) return el.matches(selector);
	    if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
	    if (el.msMatchesSelector) return el.msMatchesSelector(selector);
	    compareWith = $(selector);

	    for (i = 0; i < compareWith.length; i += 1) {
	      if (compareWith[i] === el) return true;
	    }

	    return false;
	  }

	  if (selector === document) {
	    return el === document;
	  }

	  if (selector === window) {
	    return el === window;
	  }

	  if (selector.nodeType || selector instanceof Dom7) {
	    compareWith = selector.nodeType ? [selector] : selector;

	    for (i = 0; i < compareWith.length; i += 1) {
	      if (compareWith[i] === el) return true;
	    }

	    return false;
	  }

	  return false;
	}

	function index() {
	  let child = this[0];
	  let i;

	  if (child) {
	    i = 0; // eslint-disable-next-line

	    while ((child = child.previousSibling) !== null) {
	      if (child.nodeType === 1) i += 1;
	    }

	    return i;
	  }

	  return undefined;
	}

	function eq(index) {
	  if (typeof index === 'undefined') return this;
	  const length = this.length;

	  if (index > length - 1) {
	    return $([]);
	  }

	  if (index < 0) {
	    const returnIndex = length + index;
	    if (returnIndex < 0) return $([]);
	    return $([this[returnIndex]]);
	  }

	  return $([this[index]]);
	}

	function append(...els) {
	  let newChild;
	  const document = getDocument();

	  for (let k = 0; k < els.length; k += 1) {
	    newChild = els[k];

	    for (let i = 0; i < this.length; i += 1) {
	      if (typeof newChild === 'string') {
	        const tempDiv = document.createElement('div');
	        tempDiv.innerHTML = newChild;

	        while (tempDiv.firstChild) {
	          this[i].appendChild(tempDiv.firstChild);
	        }
	      } else if (newChild instanceof Dom7) {
	        for (let j = 0; j < newChild.length; j += 1) {
	          this[i].appendChild(newChild[j]);
	        }
	      } else {
	        this[i].appendChild(newChild);
	      }
	    }
	  }

	  return this;
	}

	function prepend(newChild) {
	  const document = getDocument();
	  let i;
	  let j;

	  for (i = 0; i < this.length; i += 1) {
	    if (typeof newChild === 'string') {
	      const tempDiv = document.createElement('div');
	      tempDiv.innerHTML = newChild;

	      for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
	        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
	      }
	    } else if (newChild instanceof Dom7) {
	      for (j = 0; j < newChild.length; j += 1) {
	        this[i].insertBefore(newChild[j], this[i].childNodes[0]);
	      }
	    } else {
	      this[i].insertBefore(newChild, this[i].childNodes[0]);
	    }
	  }

	  return this;
	}

	function next(selector) {
	  if (this.length > 0) {
	    if (selector) {
	      if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
	        return $([this[0].nextElementSibling]);
	      }

	      return $([]);
	    }

	    if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
	    return $([]);
	  }

	  return $([]);
	}

	function nextAll(selector) {
	  const nextEls = [];
	  let el = this[0];
	  if (!el) return $([]);

	  while (el.nextElementSibling) {
	    const next = el.nextElementSibling; // eslint-disable-line

	    if (selector) {
	      if ($(next).is(selector)) nextEls.push(next);
	    } else nextEls.push(next);

	    el = next;
	  }

	  return $(nextEls);
	}

	function prev(selector) {
	  if (this.length > 0) {
	    const el = this[0];

	    if (selector) {
	      if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
	        return $([el.previousElementSibling]);
	      }

	      return $([]);
	    }

	    if (el.previousElementSibling) return $([el.previousElementSibling]);
	    return $([]);
	  }

	  return $([]);
	}

	function prevAll(selector) {
	  const prevEls = [];
	  let el = this[0];
	  if (!el) return $([]);

	  while (el.previousElementSibling) {
	    const prev = el.previousElementSibling; // eslint-disable-line

	    if (selector) {
	      if ($(prev).is(selector)) prevEls.push(prev);
	    } else prevEls.push(prev);

	    el = prev;
	  }

	  return $(prevEls);
	}

	function parent(selector) {
	  const parents = []; // eslint-disable-line

	  for (let i = 0; i < this.length; i += 1) {
	    if (this[i].parentNode !== null) {
	      if (selector) {
	        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
	      } else {
	        parents.push(this[i].parentNode);
	      }
	    }
	  }

	  return $(parents);
	}

	function parents(selector) {
	  const parents = []; // eslint-disable-line

	  for (let i = 0; i < this.length; i += 1) {
	    let parent = this[i].parentNode; // eslint-disable-line

	    while (parent) {
	      if (selector) {
	        if ($(parent).is(selector)) parents.push(parent);
	      } else {
	        parents.push(parent);
	      }

	      parent = parent.parentNode;
	    }
	  }

	  return $(parents);
	}

	function closest(selector) {
	  let closest = this; // eslint-disable-line

	  if (typeof selector === 'undefined') {
	    return $([]);
	  }

	  if (!closest.is(selector)) {
	    closest = closest.parents(selector).eq(0);
	  }

	  return closest;
	}

	function find(selector) {
	  const foundElements = [];

	  for (let i = 0; i < this.length; i += 1) {
	    const found = this[i].querySelectorAll(selector);

	    for (let j = 0; j < found.length; j += 1) {
	      foundElements.push(found[j]);
	    }
	  }

	  return $(foundElements);
	}

	function children(selector) {
	  const children = []; // eslint-disable-line

	  for (let i = 0; i < this.length; i += 1) {
	    const childNodes = this[i].children;

	    for (let j = 0; j < childNodes.length; j += 1) {
	      if (!selector || $(childNodes[j]).is(selector)) {
	        children.push(childNodes[j]);
	      }
	    }
	  }

	  return $(children);
	}

	function remove() {
	  for (let i = 0; i < this.length; i += 1) {
	    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
	  }

	  return this;
	}

	const Methods = {
	  addClass,
	  removeClass,
	  hasClass,
	  toggleClass,
	  attr,
	  removeAttr,
	  transform,
	  transition: transition$1,
	  on,
	  off,
	  trigger,
	  transitionEnd: transitionEnd$1,
	  outerWidth,
	  outerHeight,
	  styles,
	  offset,
	  css,
	  each,
	  html: html$1,
	  text,
	  is,
	  index,
	  eq,
	  append,
	  prepend,
	  next,
	  nextAll,
	  prev,
	  prevAll,
	  parent,
	  parents,
	  closest,
	  find,
	  children,
	  filter,
	  remove
	};
	Object.keys(Methods).forEach(methodName => {
	  Object.defineProperty($.fn, methodName, {
	    value: Methods[methodName],
	    writable: true
	  });
	});

	function deleteProps(obj) {
	  const object = obj;
	  Object.keys(object).forEach(key => {
	    try {
	      object[key] = null;
	    } catch (e) {// no getter for object
	    }

	    try {
	      delete object[key];
	    } catch (e) {// something got wrong
	    }
	  });
	}

	function nextTick(callback, delay = 0) {
	  return setTimeout(callback, delay);
	}

	function now() {
	  return Date.now();
	}

	function getComputedStyle$1(el) {
	  const window = getWindow();
	  let style;

	  if (window.getComputedStyle) {
	    style = window.getComputedStyle(el, null);
	  }

	  if (!style && el.currentStyle) {
	    style = el.currentStyle;
	  }

	  if (!style) {
	    style = el.style;
	  }

	  return style;
	}

	function getTranslate(el, axis = 'x') {
	  const window = getWindow();
	  let matrix;
	  let curTransform;
	  let transformMatrix;
	  const curStyle = getComputedStyle$1(el);

	  if (window.WebKitCSSMatrix) {
	    curTransform = curStyle.transform || curStyle.webkitTransform;

	    if (curTransform.split(',').length > 6) {
	      curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
	    } // Some old versions of Webkit choke when 'none' is passed; pass
	    // empty string instead in this case


	    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
	  } else {
	    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	    matrix = transformMatrix.toString().split(',');
	  }

	  if (axis === 'x') {
	    // Latest Chrome and webkits Fix
	    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
	    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
	    else curTransform = parseFloat(matrix[4]);
	  }

	  if (axis === 'y') {
	    // Latest Chrome and webkits Fix
	    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
	    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
	    else curTransform = parseFloat(matrix[5]);
	  }

	  return curTransform || 0;
	}

	function isObject(o) {
	  return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
	}

	function isNode(node) {
	  // eslint-disable-next-line
	  if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
	    return node instanceof HTMLElement;
	  }

	  return node && (node.nodeType === 1 || node.nodeType === 11);
	}

	function extend(...args) {
	  const to = Object(args[0]);
	  const noExtend = ['__proto__', 'constructor', 'prototype'];

	  for (let i = 1; i < args.length; i += 1) {
	    const nextSource = args[i];

	    if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
	      const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);

	      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
	        const nextKey = keysArray[nextIndex];
	        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

	        if (desc !== undefined && desc.enumerable) {
	          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
	            if (nextSource[nextKey].__swiper__) {
	              to[nextKey] = nextSource[nextKey];
	            } else {
	              extend(to[nextKey], nextSource[nextKey]);
	            }
	          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
	            to[nextKey] = {};

	            if (nextSource[nextKey].__swiper__) {
	              to[nextKey] = nextSource[nextKey];
	            } else {
	              extend(to[nextKey], nextSource[nextKey]);
	            }
	          } else {
	            to[nextKey] = nextSource[nextKey];
	          }
	        }
	      }
	    }
	  }

	  return to;
	}

	function setCSSProperty(el, varName, varValue) {
	  el.style.setProperty(varName, varValue);
	}

	function animateCSSModeScroll({
	  swiper,
	  targetPosition,
	  side
	}) {
	  const window = getWindow();
	  const startPosition = -swiper.translate;
	  let startTime = null;
	  let time;
	  const duration = swiper.params.speed;
	  swiper.wrapperEl.style.scrollSnapType = 'none';
	  window.cancelAnimationFrame(swiper.cssModeFrameID);
	  const dir = targetPosition > startPosition ? 'next' : 'prev';

	  const isOutOfBound = (current, target) => {
	    return dir === 'next' && current >= target || dir === 'prev' && current <= target;
	  };

	  const animate = () => {
	    time = new Date().getTime();

	    if (startTime === null) {
	      startTime = time;
	    }

	    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
	    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
	    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);

	    if (isOutOfBound(currentPosition, targetPosition)) {
	      currentPosition = targetPosition;
	    }

	    swiper.wrapperEl.scrollTo({
	      [side]: currentPosition
	    });

	    if (isOutOfBound(currentPosition, targetPosition)) {
	      swiper.wrapperEl.style.overflow = 'hidden';
	      swiper.wrapperEl.style.scrollSnapType = '';
	      setTimeout(() => {
	        swiper.wrapperEl.style.overflow = '';
	        swiper.wrapperEl.scrollTo({
	          [side]: currentPosition
	        });
	      });
	      window.cancelAnimationFrame(swiper.cssModeFrameID);
	      return;
	    }

	    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
	  };

	  animate();
	}

	let support;

	function calcSupport() {
	  const window = getWindow();
	  const document = getDocument();
	  return {
	    smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,
	    touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
	    passiveListener: function checkPassiveListener() {
	      let supportsPassive = false;

	      try {
	        const opts = Object.defineProperty({}, 'passive', {
	          // eslint-disable-next-line
	          get() {
	            supportsPassive = true;
	          }

	        });
	        window.addEventListener('testPassiveListener', null, opts);
	      } catch (e) {// No support
	      }

	      return supportsPassive;
	    }(),
	    gestures: function checkGestures() {
	      return 'ongesturestart' in window;
	    }()
	  };
	}

	function getSupport() {
	  if (!support) {
	    support = calcSupport();
	  }

	  return support;
	}

	let deviceCached;

	function calcDevice({
	  userAgent
	} = {}) {
	  const support = getSupport();
	  const window = getWindow();
	  const platform = window.navigator.platform;
	  const ua = userAgent || window.navigator.userAgent;
	  const device = {
	    ios: false,
	    android: false
	  };
	  const screenWidth = window.screen.width;
	  const screenHeight = window.screen.height;
	  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

	  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
	  const windows = platform === 'Win32';
	  let macos = platform === 'MacIntel'; // iPadOs 13 fix

	  const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];

	  if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
	    ipad = ua.match(/(Version)\/([\d.]+)/);
	    if (!ipad) ipad = [0, 1, '13_0_0'];
	    macos = false;
	  } // Android


	  if (android && !windows) {
	    device.os = 'android';
	    device.android = true;
	  }

	  if (ipad || iphone || ipod) {
	    device.os = 'ios';
	    device.ios = true;
	  } // Export object


	  return device;
	}

	function getDevice(overrides = {}) {
	  if (!deviceCached) {
	    deviceCached = calcDevice(overrides);
	  }

	  return deviceCached;
	}

	let browser;

	function calcBrowser() {
	  const window = getWindow();

	  function isSafari() {
	    const ua = window.navigator.userAgent.toLowerCase();
	    return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
	  }

	  return {
	    isSafari: isSafari(),
	    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
	  };
	}

	function getBrowser() {
	  if (!browser) {
	    browser = calcBrowser();
	  }

	  return browser;
	}

	function Resize({
	  swiper,
	  on,
	  emit
	}) {
	  const window = getWindow();
	  let observer = null;
	  let animationFrame = null;

	  const resizeHandler = () => {
	    if (!swiper || swiper.destroyed || !swiper.initialized) return;
	    emit('beforeResize');
	    emit('resize');
	  };

	  const createObserver = () => {
	    if (!swiper || swiper.destroyed || !swiper.initialized) return;
	    observer = new ResizeObserver(entries => {
	      animationFrame = window.requestAnimationFrame(() => {
	        const {
	          width,
	          height
	        } = swiper;
	        let newWidth = width;
	        let newHeight = height;
	        entries.forEach(({
	          contentBoxSize,
	          contentRect,
	          target
	        }) => {
	          if (target && target !== swiper.el) return;
	          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
	          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
	        });

	        if (newWidth !== width || newHeight !== height) {
	          resizeHandler();
	        }
	      });
	    });
	    observer.observe(swiper.el);
	  };

	  const removeObserver = () => {
	    if (animationFrame) {
	      window.cancelAnimationFrame(animationFrame);
	    }

	    if (observer && observer.unobserve && swiper.el) {
	      observer.unobserve(swiper.el);
	      observer = null;
	    }
	  };

	  const orientationChangeHandler = () => {
	    if (!swiper || swiper.destroyed || !swiper.initialized) return;
	    emit('orientationchange');
	  };

	  on('init', () => {
	    if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
	      createObserver();
	      return;
	    }

	    window.addEventListener('resize', resizeHandler);
	    window.addEventListener('orientationchange', orientationChangeHandler);
	  });
	  on('destroy', () => {
	    removeObserver();
	    window.removeEventListener('resize', resizeHandler);
	    window.removeEventListener('orientationchange', orientationChangeHandler);
	  });
	}

	function Observer$1({
	  swiper,
	  extendParams,
	  on,
	  emit
	}) {
	  const observers = [];
	  const window = getWindow();

	  const attach = (target, options = {}) => {
	    const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
	    const observer = new ObserverFunc(mutations => {
	      // The observerUpdate event should only be triggered
	      // once despite the number of mutations.  Additional
	      // triggers are redundant and are very costly
	      if (mutations.length === 1) {
	        emit('observerUpdate', mutations[0]);
	        return;
	      }

	      const observerUpdate = function observerUpdate() {
	        emit('observerUpdate', mutations[0]);
	      };

	      if (window.requestAnimationFrame) {
	        window.requestAnimationFrame(observerUpdate);
	      } else {
	        window.setTimeout(observerUpdate, 0);
	      }
	    });
	    observer.observe(target, {
	      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
	      childList: typeof options.childList === 'undefined' ? true : options.childList,
	      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
	    });
	    observers.push(observer);
	  };

	  const init = () => {
	    if (!swiper.params.observer) return;

	    if (swiper.params.observeParents) {
	      const containerParents = swiper.$el.parents();

	      for (let i = 0; i < containerParents.length; i += 1) {
	        attach(containerParents[i]);
	      }
	    } // Observe container


	    attach(swiper.$el[0], {
	      childList: swiper.params.observeSlideChildren
	    }); // Observe wrapper

	    attach(swiper.$wrapperEl[0], {
	      attributes: false
	    });
	  };

	  const destroy = () => {
	    observers.forEach(observer => {
	      observer.disconnect();
	    });
	    observers.splice(0, observers.length);
	  };

	  extendParams({
	    observer: false,
	    observeParents: false,
	    observeSlideChildren: false
	  });
	  on('init', init);
	  on('destroy', destroy);
	}

	/* eslint-disable no-underscore-dangle */
	var eventsEmitter = {
	  on(events, handler, priority) {
	    const self = this;
	    if (!self.eventsListeners || self.destroyed) return self;
	    if (typeof handler !== 'function') return self;
	    const method = priority ? 'unshift' : 'push';
	    events.split(' ').forEach(event => {
	      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
	      self.eventsListeners[event][method](handler);
	    });
	    return self;
	  },

	  once(events, handler, priority) {
	    const self = this;
	    if (!self.eventsListeners || self.destroyed) return self;
	    if (typeof handler !== 'function') return self;

	    function onceHandler(...args) {
	      self.off(events, onceHandler);

	      if (onceHandler.__emitterProxy) {
	        delete onceHandler.__emitterProxy;
	      }

	      handler.apply(self, args);
	    }

	    onceHandler.__emitterProxy = handler;
	    return self.on(events, onceHandler, priority);
	  },

	  onAny(handler, priority) {
	    const self = this;
	    if (!self.eventsListeners || self.destroyed) return self;
	    if (typeof handler !== 'function') return self;
	    const method = priority ? 'unshift' : 'push';

	    if (self.eventsAnyListeners.indexOf(handler) < 0) {
	      self.eventsAnyListeners[method](handler);
	    }

	    return self;
	  },

	  offAny(handler) {
	    const self = this;
	    if (!self.eventsListeners || self.destroyed) return self;
	    if (!self.eventsAnyListeners) return self;
	    const index = self.eventsAnyListeners.indexOf(handler);

	    if (index >= 0) {
	      self.eventsAnyListeners.splice(index, 1);
	    }

	    return self;
	  },

	  off(events, handler) {
	    const self = this;
	    if (!self.eventsListeners || self.destroyed) return self;
	    if (!self.eventsListeners) return self;
	    events.split(' ').forEach(event => {
	      if (typeof handler === 'undefined') {
	        self.eventsListeners[event] = [];
	      } else if (self.eventsListeners[event]) {
	        self.eventsListeners[event].forEach((eventHandler, index) => {
	          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
	            self.eventsListeners[event].splice(index, 1);
	          }
	        });
	      }
	    });
	    return self;
	  },

	  emit(...args) {
	    const self = this;
	    if (!self.eventsListeners || self.destroyed) return self;
	    if (!self.eventsListeners) return self;
	    let events;
	    let data;
	    let context;

	    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
	      events = args[0];
	      data = args.slice(1, args.length);
	      context = self;
	    } else {
	      events = args[0].events;
	      data = args[0].data;
	      context = args[0].context || self;
	    }

	    data.unshift(context);
	    const eventsArray = Array.isArray(events) ? events : events.split(' ');
	    eventsArray.forEach(event => {
	      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
	        self.eventsAnyListeners.forEach(eventHandler => {
	          eventHandler.apply(context, [event, ...data]);
	        });
	      }

	      if (self.eventsListeners && self.eventsListeners[event]) {
	        self.eventsListeners[event].forEach(eventHandler => {
	          eventHandler.apply(context, data);
	        });
	      }
	    });
	    return self;
	  }

	};

	function updateSize() {
	  const swiper = this;
	  let width;
	  let height;
	  const $el = swiper.$el;

	  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
	    width = swiper.params.width;
	  } else {
	    width = $el[0].clientWidth;
	  }

	  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
	    height = swiper.params.height;
	  } else {
	    height = $el[0].clientHeight;
	  }

	  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
	    return;
	  } // Subtract paddings


	  width = width - parseInt($el.css('padding-left') || 0, 10) - parseInt($el.css('padding-right') || 0, 10);
	  height = height - parseInt($el.css('padding-top') || 0, 10) - parseInt($el.css('padding-bottom') || 0, 10);
	  if (Number.isNaN(width)) width = 0;
	  if (Number.isNaN(height)) height = 0;
	  Object.assign(swiper, {
	    width,
	    height,
	    size: swiper.isHorizontal() ? width : height
	  });
	}

	function updateSlides() {
	  const swiper = this;

	  function getDirectionLabel(property) {
	    if (swiper.isHorizontal()) {
	      return property;
	    } // prettier-ignore


	    return {
	      'width': 'height',
	      'margin-top': 'margin-left',
	      'margin-bottom ': 'margin-right',
	      'margin-left': 'margin-top',
	      'margin-right': 'margin-bottom',
	      'padding-left': 'padding-top',
	      'padding-right': 'padding-bottom',
	      'marginRight': 'marginBottom'
	    }[property];
	  }

	  function getDirectionPropertyValue(node, label) {
	    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
	  }

	  const params = swiper.params;
	  const {
	    $wrapperEl,
	    size: swiperSize,
	    rtlTranslate: rtl,
	    wrongRTL
	  } = swiper;
	  const isVirtual = swiper.virtual && params.virtual.enabled;
	  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
	  const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
	  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
	  let snapGrid = [];
	  const slidesGrid = [];
	  const slidesSizesGrid = [];
	  let offsetBefore = params.slidesOffsetBefore;

	  if (typeof offsetBefore === 'function') {
	    offsetBefore = params.slidesOffsetBefore.call(swiper);
	  }

	  let offsetAfter = params.slidesOffsetAfter;

	  if (typeof offsetAfter === 'function') {
	    offsetAfter = params.slidesOffsetAfter.call(swiper);
	  }

	  const previousSnapGridLength = swiper.snapGrid.length;
	  const previousSlidesGridLength = swiper.slidesGrid.length;
	  let spaceBetween = params.spaceBetween;
	  let slidePosition = -offsetBefore;
	  let prevSlideSize = 0;
	  let index = 0;

	  if (typeof swiperSize === 'undefined') {
	    return;
	  }

	  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
	    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
	  }

	  swiper.virtualSize = -spaceBetween; // reset margins

	  if (rtl) slides.css({
	    marginLeft: '',
	    marginBottom: '',
	    marginTop: ''
	  });else slides.css({
	    marginRight: '',
	    marginBottom: '',
	    marginTop: ''
	  }); // reset cssMode offsets

	  if (params.centeredSlides && params.cssMode) {
	    setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', '');
	    setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', '');
	  }

	  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;

	  if (gridEnabled) {
	    swiper.grid.initSlides(slidesLength);
	  } // Calc slides


	  let slideSize;
	  const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
	    return typeof params.breakpoints[key].slidesPerView !== 'undefined';
	  }).length > 0;

	  for (let i = 0; i < slidesLength; i += 1) {
	    slideSize = 0;
	    const slide = slides.eq(i);

	    if (gridEnabled) {
	      swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
	    }

	    if (slide.css('display') === 'none') continue; // eslint-disable-line

	    if (params.slidesPerView === 'auto') {
	      if (shouldResetSlideSize) {
	        slides[i].style[getDirectionLabel('width')] = ``;
	      }

	      const slideStyles = getComputedStyle(slide[0]);
	      const currentTransform = slide[0].style.transform;
	      const currentWebKitTransform = slide[0].style.webkitTransform;

	      if (currentTransform) {
	        slide[0].style.transform = 'none';
	      }

	      if (currentWebKitTransform) {
	        slide[0].style.webkitTransform = 'none';
	      }

	      if (params.roundLengths) {
	        slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
	      } else {
	        // eslint-disable-next-line
	        const width = getDirectionPropertyValue(slideStyles, 'width');
	        const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
	        const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
	        const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
	        const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
	        const boxSizing = slideStyles.getPropertyValue('box-sizing');

	        if (boxSizing && boxSizing === 'border-box') {
	          slideSize = width + marginLeft + marginRight;
	        } else {
	          const {
	            clientWidth,
	            offsetWidth
	          } = slide[0];
	          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
	        }
	      }

	      if (currentTransform) {
	        slide[0].style.transform = currentTransform;
	      }

	      if (currentWebKitTransform) {
	        slide[0].style.webkitTransform = currentWebKitTransform;
	      }

	      if (params.roundLengths) slideSize = Math.floor(slideSize);
	    } else {
	      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
	      if (params.roundLengths) slideSize = Math.floor(slideSize);

	      if (slides[i]) {
	        slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
	      }
	    }

	    if (slides[i]) {
	      slides[i].swiperSlideSize = slideSize;
	    }

	    slidesSizesGrid.push(slideSize);

	    if (params.centeredSlides) {
	      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
	      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
	      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
	      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
	      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
	      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
	      slidesGrid.push(slidePosition);
	    } else {
	      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
	      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
	      slidesGrid.push(slidePosition);
	      slidePosition = slidePosition + slideSize + spaceBetween;
	    }

	    swiper.virtualSize += slideSize + spaceBetween;
	    prevSlideSize = slideSize;
	    index += 1;
	  }

	  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;

	  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
	    $wrapperEl.css({
	      width: `${swiper.virtualSize + params.spaceBetween}px`
	    });
	  }

	  if (params.setWrapperSize) {
	    $wrapperEl.css({
	      [getDirectionLabel('width')]: `${swiper.virtualSize + params.spaceBetween}px`
	    });
	  }

	  if (gridEnabled) {
	    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
	  } // Remove last grid elements depending on width


	  if (!params.centeredSlides) {
	    const newSlidesGrid = [];

	    for (let i = 0; i < snapGrid.length; i += 1) {
	      let slidesGridItem = snapGrid[i];
	      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

	      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
	        newSlidesGrid.push(slidesGridItem);
	      }
	    }

	    snapGrid = newSlidesGrid;

	    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
	      snapGrid.push(swiper.virtualSize - swiperSize);
	    }
	  }

	  if (snapGrid.length === 0) snapGrid = [0];

	  if (params.spaceBetween !== 0) {
	    const key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
	    slides.filter((_, slideIndex) => {
	      if (!params.cssMode) return true;

	      if (slideIndex === slides.length - 1) {
	        return false;
	      }

	      return true;
	    }).css({
	      [key]: `${spaceBetween}px`
	    });
	  }

	  if (params.centeredSlides && params.centeredSlidesBounds) {
	    let allSlidesSize = 0;
	    slidesSizesGrid.forEach(slideSizeValue => {
	      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
	    });
	    allSlidesSize -= params.spaceBetween;
	    const maxSnap = allSlidesSize - swiperSize;
	    snapGrid = snapGrid.map(snap => {
	      if (snap < 0) return -offsetBefore;
	      if (snap > maxSnap) return maxSnap + offsetAfter;
	      return snap;
	    });
	  }

	  if (params.centerInsufficientSlides) {
	    let allSlidesSize = 0;
	    slidesSizesGrid.forEach(slideSizeValue => {
	      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
	    });
	    allSlidesSize -= params.spaceBetween;

	    if (allSlidesSize < swiperSize) {
	      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
	      snapGrid.forEach((snap, snapIndex) => {
	        snapGrid[snapIndex] = snap - allSlidesOffset;
	      });
	      slidesGrid.forEach((snap, snapIndex) => {
	        slidesGrid[snapIndex] = snap + allSlidesOffset;
	      });
	    }
	  }

	  Object.assign(swiper, {
	    slides,
	    snapGrid,
	    slidesGrid,
	    slidesSizesGrid
	  });

	  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
	    setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
	    setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
	    const addToSnapGrid = -swiper.snapGrid[0];
	    const addToSlidesGrid = -swiper.slidesGrid[0];
	    swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
	    swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
	  }

	  if (slidesLength !== previousSlidesLength) {
	    swiper.emit('slidesLengthChange');
	  }

	  if (snapGrid.length !== previousSnapGridLength) {
	    if (swiper.params.watchOverflow) swiper.checkOverflow();
	    swiper.emit('snapGridLengthChange');
	  }

	  if (slidesGrid.length !== previousSlidesGridLength) {
	    swiper.emit('slidesGridLengthChange');
	  }

	  if (params.watchSlidesProgress) {
	    swiper.updateSlidesOffset();
	  }

	  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
	    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
	    const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);

	    if (slidesLength <= params.maxBackfaceHiddenSlides) {
	      if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
	    } else if (hasClassBackfaceClassAdded) {
	      swiper.$el.removeClass(backFaceHiddenClass);
	    }
	  }
	}

	function updateAutoHeight(speed) {
	  const swiper = this;
	  const activeSlides = [];
	  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
	  let newHeight = 0;
	  let i;

	  if (typeof speed === 'number') {
	    swiper.setTransition(speed);
	  } else if (speed === true) {
	    swiper.setTransition(swiper.params.speed);
	  }

	  const getSlideByIndex = index => {
	    if (isVirtual) {
	      return swiper.slides.filter(el => parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index)[0];
	    }

	    return swiper.slides.eq(index)[0];
	  }; // Find slides currently in view


	  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
	    if (swiper.params.centeredSlides) {
	      (swiper.visibleSlides || $([])).each(slide => {
	        activeSlides.push(slide);
	      });
	    } else {
	      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
	        const index = swiper.activeIndex + i;
	        if (index > swiper.slides.length && !isVirtual) break;
	        activeSlides.push(getSlideByIndex(index));
	      }
	    }
	  } else {
	    activeSlides.push(getSlideByIndex(swiper.activeIndex));
	  } // Find new height from highest slide in view


	  for (i = 0; i < activeSlides.length; i += 1) {
	    if (typeof activeSlides[i] !== 'undefined') {
	      const height = activeSlides[i].offsetHeight;
	      newHeight = height > newHeight ? height : newHeight;
	    }
	  } // Update Height


	  if (newHeight || newHeight === 0) swiper.$wrapperEl.css('height', `${newHeight}px`);
	}

	function updateSlidesOffset() {
	  const swiper = this;
	  const slides = swiper.slides;

	  for (let i = 0; i < slides.length; i += 1) {
	    slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
	  }
	}

	function updateSlidesProgress(translate = this && this.translate || 0) {
	  const swiper = this;
	  const params = swiper.params;
	  const {
	    slides,
	    rtlTranslate: rtl,
	    snapGrid
	  } = swiper;
	  if (slides.length === 0) return;
	  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
	  let offsetCenter = -translate;
	  if (rtl) offsetCenter = translate; // Visible Slides

	  slides.removeClass(params.slideVisibleClass);
	  swiper.visibleSlidesIndexes = [];
	  swiper.visibleSlides = [];

	  for (let i = 0; i < slides.length; i += 1) {
	    const slide = slides[i];
	    let slideOffset = slide.swiperSlideOffset;

	    if (params.cssMode && params.centeredSlides) {
	      slideOffset -= slides[0].swiperSlideOffset;
	    }

	    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
	    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
	    const slideBefore = -(offsetCenter - slideOffset);
	    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
	    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

	    if (isVisible) {
	      swiper.visibleSlides.push(slide);
	      swiper.visibleSlidesIndexes.push(i);
	      slides.eq(i).addClass(params.slideVisibleClass);
	    }

	    slide.progress = rtl ? -slideProgress : slideProgress;
	    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
	  }

	  swiper.visibleSlides = $(swiper.visibleSlides);
	}

	function updateProgress(translate) {
	  const swiper = this;

	  if (typeof translate === 'undefined') {
	    const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

	    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
	  }

	  const params = swiper.params;
	  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
	  let {
	    progress,
	    isBeginning,
	    isEnd
	  } = swiper;
	  const wasBeginning = isBeginning;
	  const wasEnd = isEnd;

	  if (translatesDiff === 0) {
	    progress = 0;
	    isBeginning = true;
	    isEnd = true;
	  } else {
	    progress = (translate - swiper.minTranslate()) / translatesDiff;
	    isBeginning = progress <= 0;
	    isEnd = progress >= 1;
	  }

	  Object.assign(swiper, {
	    progress,
	    isBeginning,
	    isEnd
	  });
	  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);

	  if (isBeginning && !wasBeginning) {
	    swiper.emit('reachBeginning toEdge');
	  }

	  if (isEnd && !wasEnd) {
	    swiper.emit('reachEnd toEdge');
	  }

	  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
	    swiper.emit('fromEdge');
	  }

	  swiper.emit('progress', progress);
	}

	function updateSlidesClasses() {
	  const swiper = this;
	  const {
	    slides,
	    params,
	    $wrapperEl,
	    activeIndex,
	    realIndex
	  } = swiper;
	  const isVirtual = swiper.virtual && params.virtual.enabled;
	  slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
	  let activeSlide;

	  if (isVirtual) {
	    activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
	  } else {
	    activeSlide = slides.eq(activeIndex);
	  } // Active classes


	  activeSlide.addClass(params.slideActiveClass);

	  if (params.loop) {
	    // Duplicate to all looped slides
	    if (activeSlide.hasClass(params.slideDuplicateClass)) {
	      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
	    } else {
	      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
	    }
	  } // Next Slide


	  let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);

	  if (params.loop && nextSlide.length === 0) {
	    nextSlide = slides.eq(0);
	    nextSlide.addClass(params.slideNextClass);
	  } // Prev Slide


	  let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);

	  if (params.loop && prevSlide.length === 0) {
	    prevSlide = slides.eq(-1);
	    prevSlide.addClass(params.slidePrevClass);
	  }

	  if (params.loop) {
	    // Duplicate to all looped slides
	    if (nextSlide.hasClass(params.slideDuplicateClass)) {
	      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
	    } else {
	      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
	    }

	    if (prevSlide.hasClass(params.slideDuplicateClass)) {
	      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
	    } else {
	      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
	    }
	  }

	  swiper.emitSlidesClasses();
	}

	function updateActiveIndex(newActiveIndex) {
	  const swiper = this;
	  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
	  const {
	    slidesGrid,
	    snapGrid,
	    params,
	    activeIndex: previousIndex,
	    realIndex: previousRealIndex,
	    snapIndex: previousSnapIndex
	  } = swiper;
	  let activeIndex = newActiveIndex;
	  let snapIndex;

	  if (typeof activeIndex === 'undefined') {
	    for (let i = 0; i < slidesGrid.length; i += 1) {
	      if (typeof slidesGrid[i + 1] !== 'undefined') {
	        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
	          activeIndex = i;
	        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
	          activeIndex = i + 1;
	        }
	      } else if (translate >= slidesGrid[i]) {
	        activeIndex = i;
	      }
	    } // Normalize slideIndex


	    if (params.normalizeSlideIndex) {
	      if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
	    }
	  }

	  if (snapGrid.indexOf(translate) >= 0) {
	    snapIndex = snapGrid.indexOf(translate);
	  } else {
	    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
	    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
	  }

	  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

	  if (activeIndex === previousIndex) {
	    if (snapIndex !== previousSnapIndex) {
	      swiper.snapIndex = snapIndex;
	      swiper.emit('snapIndexChange');
	    }

	    return;
	  } // Get real index


	  const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
	  Object.assign(swiper, {
	    snapIndex,
	    realIndex,
	    previousIndex,
	    activeIndex
	  });
	  swiper.emit('activeIndexChange');
	  swiper.emit('snapIndexChange');

	  if (previousRealIndex !== realIndex) {
	    swiper.emit('realIndexChange');
	  }

	  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
	    swiper.emit('slideChange');
	  }
	}

	function updateClickedSlide(e) {
	  const swiper = this;
	  const params = swiper.params;
	  const slide = $(e).closest(`.${params.slideClass}`)[0];
	  let slideFound = false;
	  let slideIndex;

	  if (slide) {
	    for (let i = 0; i < swiper.slides.length; i += 1) {
	      if (swiper.slides[i] === slide) {
	        slideFound = true;
	        slideIndex = i;
	        break;
	      }
	    }
	  }

	  if (slide && slideFound) {
	    swiper.clickedSlide = slide;

	    if (swiper.virtual && swiper.params.virtual.enabled) {
	      swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
	    } else {
	      swiper.clickedIndex = slideIndex;
	    }
	  } else {
	    swiper.clickedSlide = undefined;
	    swiper.clickedIndex = undefined;
	    return;
	  }

	  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
	    swiper.slideToClickedSlide();
	  }
	}

	var update = {
	  updateSize,
	  updateSlides,
	  updateAutoHeight,
	  updateSlidesOffset,
	  updateSlidesProgress,
	  updateProgress,
	  updateSlidesClasses,
	  updateActiveIndex,
	  updateClickedSlide
	};

	function getSwiperTranslate(axis = this.isHorizontal() ? 'x' : 'y') {
	  const swiper = this;
	  const {
	    params,
	    rtlTranslate: rtl,
	    translate,
	    $wrapperEl
	  } = swiper;

	  if (params.virtualTranslate) {
	    return rtl ? -translate : translate;
	  }

	  if (params.cssMode) {
	    return translate;
	  }

	  let currentTranslate = getTranslate($wrapperEl[0], axis);
	  if (rtl) currentTranslate = -currentTranslate;
	  return currentTranslate || 0;
	}

	function setTranslate(translate, byController) {
	  const swiper = this;
	  const {
	    rtlTranslate: rtl,
	    params,
	    $wrapperEl,
	    wrapperEl,
	    progress
	  } = swiper;
	  let x = 0;
	  let y = 0;
	  const z = 0;

	  if (swiper.isHorizontal()) {
	    x = rtl ? -translate : translate;
	  } else {
	    y = translate;
	  }

	  if (params.roundLengths) {
	    x = Math.floor(x);
	    y = Math.floor(y);
	  }

	  if (params.cssMode) {
	    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
	  } else if (!params.virtualTranslate) {
	    $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
	  }

	  swiper.previousTranslate = swiper.translate;
	  swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

	  let newProgress;
	  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

	  if (translatesDiff === 0) {
	    newProgress = 0;
	  } else {
	    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
	  }

	  if (newProgress !== progress) {
	    swiper.updateProgress(translate);
	  }

	  swiper.emit('setTranslate', swiper.translate, byController);
	}

	function minTranslate() {
	  return -this.snapGrid[0];
	}

	function maxTranslate() {
	  return -this.snapGrid[this.snapGrid.length - 1];
	}

	function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
	  const swiper = this;
	  const {
	    params,
	    wrapperEl
	  } = swiper;

	  if (swiper.animating && params.preventInteractionOnTransition) {
	    return false;
	  }

	  const minTranslate = swiper.minTranslate();
	  const maxTranslate = swiper.maxTranslate();
	  let newTranslate;
	  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress

	  swiper.updateProgress(newTranslate);

	  if (params.cssMode) {
	    const isH = swiper.isHorizontal();

	    if (speed === 0) {
	      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
	    } else {
	      if (!swiper.support.smoothScroll) {
	        animateCSSModeScroll({
	          swiper,
	          targetPosition: -newTranslate,
	          side: isH ? 'left' : 'top'
	        });
	        return true;
	      }

	      wrapperEl.scrollTo({
	        [isH ? 'left' : 'top']: -newTranslate,
	        behavior: 'smooth'
	      });
	    }

	    return true;
	  }

	  if (speed === 0) {
	    swiper.setTransition(0);
	    swiper.setTranslate(newTranslate);

	    if (runCallbacks) {
	      swiper.emit('beforeTransitionStart', speed, internal);
	      swiper.emit('transitionEnd');
	    }
	  } else {
	    swiper.setTransition(speed);
	    swiper.setTranslate(newTranslate);

	    if (runCallbacks) {
	      swiper.emit('beforeTransitionStart', speed, internal);
	      swiper.emit('transitionStart');
	    }

	    if (!swiper.animating) {
	      swiper.animating = true;

	      if (!swiper.onTranslateToWrapperTransitionEnd) {
	        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
	          if (!swiper || swiper.destroyed) return;
	          if (e.target !== this) return;
	          swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
	          swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
	          swiper.onTranslateToWrapperTransitionEnd = null;
	          delete swiper.onTranslateToWrapperTransitionEnd;

	          if (runCallbacks) {
	            swiper.emit('transitionEnd');
	          }
	        };
	      }

	      swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
	      swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
	    }
	  }

	  return true;
	}

	var translate = {
	  getTranslate: getSwiperTranslate,
	  setTranslate,
	  minTranslate,
	  maxTranslate,
	  translateTo
	};

	function setTransition(duration, byController) {
	  const swiper = this;

	  if (!swiper.params.cssMode) {
	    swiper.$wrapperEl.transition(duration);
	  }

	  swiper.emit('setTransition', duration, byController);
	}

	function transitionEmit({
	  swiper,
	  runCallbacks,
	  direction,
	  step
	}) {
	  const {
	    activeIndex,
	    previousIndex
	  } = swiper;
	  let dir = direction;

	  if (!dir) {
	    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
	  }

	  swiper.emit(`transition${step}`);

	  if (runCallbacks && activeIndex !== previousIndex) {
	    if (dir === 'reset') {
	      swiper.emit(`slideResetTransition${step}`);
	      return;
	    }

	    swiper.emit(`slideChangeTransition${step}`);

	    if (dir === 'next') {
	      swiper.emit(`slideNextTransition${step}`);
	    } else {
	      swiper.emit(`slidePrevTransition${step}`);
	    }
	  }
	}

	function transitionStart(runCallbacks = true, direction) {
	  const swiper = this;
	  const {
	    params
	  } = swiper;
	  if (params.cssMode) return;

	  if (params.autoHeight) {
	    swiper.updateAutoHeight();
	  }

	  transitionEmit({
	    swiper,
	    runCallbacks,
	    direction,
	    step: 'Start'
	  });
	}

	function transitionEnd(runCallbacks = true, direction) {
	  const swiper = this;
	  const {
	    params
	  } = swiper;
	  swiper.animating = false;
	  if (params.cssMode) return;
	  swiper.setTransition(0);
	  transitionEmit({
	    swiper,
	    runCallbacks,
	    direction,
	    step: 'End'
	  });
	}

	var transition = {
	  setTransition,
	  transitionStart,
	  transitionEnd
	};

	function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
	  if (typeof index !== 'number' && typeof index !== 'string') {
	    throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
	  }

	  if (typeof index === 'string') {
	    /**
	     * The `index` argument converted from `string` to `number`.
	     * @type {number}
	     */
	    const indexAsNumber = parseInt(index, 10);
	    /**
	     * Determines whether the `index` argument is a valid `number`
	     * after being converted from the `string` type.
	     * @type {boolean}
	     */

	    const isValidNumber = isFinite(indexAsNumber);

	    if (!isValidNumber) {
	      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
	    } // Knowing that the converted `index` is a valid number,
	    // we can update the original argument's value.


	    index = indexAsNumber;
	  }

	  const swiper = this;
	  let slideIndex = index;
	  if (slideIndex < 0) slideIndex = 0;
	  const {
	    params,
	    snapGrid,
	    slidesGrid,
	    previousIndex,
	    activeIndex,
	    rtlTranslate: rtl,
	    wrapperEl,
	    enabled
	  } = swiper;

	  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
	    return false;
	  }

	  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
	  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
	  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
	  const translate = -snapGrid[snapIndex]; // Normalize slideIndex

	  if (params.normalizeSlideIndex) {
	    for (let i = 0; i < slidesGrid.length; i += 1) {
	      const normalizedTranslate = -Math.floor(translate * 100);
	      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
	      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

	      if (typeof slidesGrid[i + 1] !== 'undefined') {
	        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
	          slideIndex = i;
	        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
	          slideIndex = i + 1;
	        }
	      } else if (normalizedTranslate >= normalizedGrid) {
	        slideIndex = i;
	      }
	    }
	  } // Directions locks


	  if (swiper.initialized && slideIndex !== activeIndex) {
	    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
	      return false;
	    }

	    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
	      if ((activeIndex || 0) !== slideIndex) return false;
	    }
	  }

	  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
	    swiper.emit('beforeSlideChangeStart');
	  } // Update progress


	  swiper.updateProgress(translate);
	  let direction;
	  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

	  if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
	    swiper.updateActiveIndex(slideIndex); // Update Height

	    if (params.autoHeight) {
	      swiper.updateAutoHeight();
	    }

	    swiper.updateSlidesClasses();

	    if (params.effect !== 'slide') {
	      swiper.setTranslate(translate);
	    }

	    if (direction !== 'reset') {
	      swiper.transitionStart(runCallbacks, direction);
	      swiper.transitionEnd(runCallbacks, direction);
	    }

	    return false;
	  }

	  if (params.cssMode) {
	    const isH = swiper.isHorizontal();
	    const t = rtl ? translate : -translate;

	    if (speed === 0) {
	      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

	      if (isVirtual) {
	        swiper.wrapperEl.style.scrollSnapType = 'none';
	        swiper._immediateVirtual = true;
	      }

	      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;

	      if (isVirtual) {
	        requestAnimationFrame(() => {
	          swiper.wrapperEl.style.scrollSnapType = '';
	          swiper._swiperImmediateVirtual = false;
	        });
	      }
	    } else {
	      if (!swiper.support.smoothScroll) {
	        animateCSSModeScroll({
	          swiper,
	          targetPosition: t,
	          side: isH ? 'left' : 'top'
	        });
	        return true;
	      }

	      wrapperEl.scrollTo({
	        [isH ? 'left' : 'top']: t,
	        behavior: 'smooth'
	      });
	    }

	    return true;
	  }

	  swiper.setTransition(speed);
	  swiper.setTranslate(translate);
	  swiper.updateActiveIndex(slideIndex);
	  swiper.updateSlidesClasses();
	  swiper.emit('beforeTransitionStart', speed, internal);
	  swiper.transitionStart(runCallbacks, direction);

	  if (speed === 0) {
	    swiper.transitionEnd(runCallbacks, direction);
	  } else if (!swiper.animating) {
	    swiper.animating = true;

	    if (!swiper.onSlideToWrapperTransitionEnd) {
	      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
	        if (!swiper || swiper.destroyed) return;
	        if (e.target !== this) return;
	        swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
	        swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
	        swiper.onSlideToWrapperTransitionEnd = null;
	        delete swiper.onSlideToWrapperTransitionEnd;
	        swiper.transitionEnd(runCallbacks, direction);
	      };
	    }

	    swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
	    swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
	  }

	  return true;
	}

	function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
	  if (typeof index === 'string') {
	    /**
	     * The `index` argument converted from `string` to `number`.
	     * @type {number}
	     */
	    const indexAsNumber = parseInt(index, 10);
	    /**
	     * Determines whether the `index` argument is a valid `number`
	     * after being converted from the `string` type.
	     * @type {boolean}
	     */

	    const isValidNumber = isFinite(indexAsNumber);

	    if (!isValidNumber) {
	      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
	    } // Knowing that the converted `index` is a valid number,
	    // we can update the original argument's value.


	    index = indexAsNumber;
	  }

	  const swiper = this;
	  let newIndex = index;

	  if (swiper.params.loop) {
	    newIndex += swiper.loopedSlides;
	  }

	  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
	}

	/* eslint no-unused-vars: "off" */
	function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
	  const swiper = this;
	  const {
	    animating,
	    enabled,
	    params
	  } = swiper;
	  if (!enabled) return swiper;
	  let perGroup = params.slidesPerGroup;

	  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
	    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
	  }

	  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;

	  if (params.loop) {
	    if (animating && params.loopPreventsSlide) return false;
	    swiper.loopFix(); // eslint-disable-next-line

	    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
	  }

	  if (params.rewind && swiper.isEnd) {
	    return swiper.slideTo(0, speed, runCallbacks, internal);
	  }

	  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
	}

	/* eslint no-unused-vars: "off" */
	function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
	  const swiper = this;
	  const {
	    params,
	    animating,
	    snapGrid,
	    slidesGrid,
	    rtlTranslate,
	    enabled
	  } = swiper;
	  if (!enabled) return swiper;

	  if (params.loop) {
	    if (animating && params.loopPreventsSlide) return false;
	    swiper.loopFix(); // eslint-disable-next-line

	    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
	  }

	  const translate = rtlTranslate ? swiper.translate : -swiper.translate;

	  function normalize(val) {
	    if (val < 0) return -Math.floor(Math.abs(val));
	    return Math.floor(val);
	  }

	  const normalizedTranslate = normalize(translate);
	  const normalizedSnapGrid = snapGrid.map(val => normalize(val));
	  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

	  if (typeof prevSnap === 'undefined' && params.cssMode) {
	    let prevSnapIndex;
	    snapGrid.forEach((snap, snapIndex) => {
	      if (normalizedTranslate >= snap) {
	        // prevSnap = snap;
	        prevSnapIndex = snapIndex;
	      }
	    });

	    if (typeof prevSnapIndex !== 'undefined') {
	      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
	    }
	  }

	  let prevIndex = 0;

	  if (typeof prevSnap !== 'undefined') {
	    prevIndex = slidesGrid.indexOf(prevSnap);
	    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;

	    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
	      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
	      prevIndex = Math.max(prevIndex, 0);
	    }
	  }

	  if (params.rewind && swiper.isBeginning) {
	    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
	    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
	  }

	  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
	}

	/* eslint no-unused-vars: "off" */
	function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
	  const swiper = this;
	  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
	}

	/* eslint no-unused-vars: "off" */
	function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
	  const swiper = this;
	  let index = swiper.activeIndex;
	  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
	  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
	  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

	  if (translate >= swiper.snapGrid[snapIndex]) {
	    // The current translate is on or after the current snap index, so the choice
	    // is between the current index and the one after it.
	    const currentSnap = swiper.snapGrid[snapIndex];
	    const nextSnap = swiper.snapGrid[snapIndex + 1];

	    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
	      index += swiper.params.slidesPerGroup;
	    }
	  } else {
	    // The current translate is before the current snap index, so the choice
	    // is between the current index and the one before it.
	    const prevSnap = swiper.snapGrid[snapIndex - 1];
	    const currentSnap = swiper.snapGrid[snapIndex];

	    if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
	      index -= swiper.params.slidesPerGroup;
	    }
	  }

	  index = Math.max(index, 0);
	  index = Math.min(index, swiper.slidesGrid.length - 1);
	  return swiper.slideTo(index, speed, runCallbacks, internal);
	}

	function slideToClickedSlide() {
	  const swiper = this;
	  const {
	    params,
	    $wrapperEl
	  } = swiper;
	  const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
	  let slideToIndex = swiper.clickedIndex;
	  let realIndex;

	  if (params.loop) {
	    if (swiper.animating) return;
	    realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

	    if (params.centeredSlides) {
	      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
	        swiper.loopFix();
	        slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
	        nextTick(() => {
	          swiper.slideTo(slideToIndex);
	        });
	      } else {
	        swiper.slideTo(slideToIndex);
	      }
	    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
	      swiper.loopFix();
	      slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
	      nextTick(() => {
	        swiper.slideTo(slideToIndex);
	      });
	    } else {
	      swiper.slideTo(slideToIndex);
	    }
	  } else {
	    swiper.slideTo(slideToIndex);
	  }
	}

	var slide = {
	  slideTo,
	  slideToLoop,
	  slideNext,
	  slidePrev,
	  slideReset,
	  slideToClosest,
	  slideToClickedSlide
	};

	function loopCreate() {
	  const swiper = this;
	  const document = getDocument();
	  const {
	    params,
	    $wrapperEl
	  } = swiper; // Remove duplicated slides

	  const $selector = $wrapperEl.children().length > 0 ? $($wrapperEl.children()[0].parentNode) : $wrapperEl;
	  $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
	  let slides = $selector.children(`.${params.slideClass}`);

	  if (params.loopFillGroupWithBlank) {
	    const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

	    if (blankSlidesNum !== params.slidesPerGroup) {
	      for (let i = 0; i < blankSlidesNum; i += 1) {
	        const blankNode = $(document.createElement('div')).addClass(`${params.slideClass} ${params.slideBlankClass}`);
	        $selector.append(blankNode);
	      }

	      slides = $selector.children(`.${params.slideClass}`);
	    }
	  }

	  if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
	  swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
	  swiper.loopedSlides += params.loopAdditionalSlides;

	  if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) {
	    swiper.loopedSlides = slides.length;
	  }

	  const prependSlides = [];
	  const appendSlides = [];
	  slides.each((el, index) => {
	    const slide = $(el);
	    slide.attr('data-swiper-slide-index', index);
	  });

	  for (let i = 0; i < swiper.loopedSlides; i += 1) {
	    const index = i - Math.floor(i / slides.length) * slides.length;
	    appendSlides.push(slides.eq(index)[0]);
	    prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
	  }

	  for (let i = 0; i < appendSlides.length; i += 1) {
	    $selector.append($(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
	  }

	  for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
	    $selector.prepend($(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
	  }
	}

	function loopFix() {
	  const swiper = this;
	  swiper.emit('beforeLoopFix');
	  const {
	    activeIndex,
	    slides,
	    loopedSlides,
	    allowSlidePrev,
	    allowSlideNext,
	    snapGrid,
	    rtlTranslate: rtl
	  } = swiper;
	  let newIndex;
	  swiper.allowSlidePrev = true;
	  swiper.allowSlideNext = true;
	  const snapTranslate = -snapGrid[activeIndex];
	  const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

	  if (activeIndex < loopedSlides) {
	    newIndex = slides.length - loopedSlides * 3 + activeIndex;
	    newIndex += loopedSlides;
	    const slideChanged = swiper.slideTo(newIndex, 0, false, true);

	    if (slideChanged && diff !== 0) {
	      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
	    }
	  } else if (activeIndex >= slides.length - loopedSlides) {
	    // Fix For Positive Oversliding
	    newIndex = -slides.length + activeIndex + loopedSlides;
	    newIndex += loopedSlides;
	    const slideChanged = swiper.slideTo(newIndex, 0, false, true);

	    if (slideChanged && diff !== 0) {
	      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
	    }
	  }

	  swiper.allowSlidePrev = allowSlidePrev;
	  swiper.allowSlideNext = allowSlideNext;
	  swiper.emit('loopFix');
	}

	function loopDestroy() {
	  const swiper = this;
	  const {
	    $wrapperEl,
	    params,
	    slides
	  } = swiper;
	  $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
	  slides.removeAttr('data-swiper-slide-index');
	}

	var loop = {
	  loopCreate,
	  loopFix,
	  loopDestroy
	};

	function setGrabCursor(moving) {
	  const swiper = this;
	  if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
	  const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
	  el.style.cursor = 'move';
	  el.style.cursor = moving ? 'grabbing' : 'grab';
	}

	function unsetGrabCursor() {
	  const swiper = this;

	  if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
	    return;
	  }

	  swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
	}

	var grabCursor = {
	  setGrabCursor,
	  unsetGrabCursor
	};

	function closestElement(selector, base = this) {
	  function __closestFrom(el) {
	    if (!el || el === getDocument() || el === getWindow()) return null;
	    if (el.assignedSlot) el = el.assignedSlot;
	    const found = el.closest(selector);

	    if (!found && !el.getRootNode) {
	      return null;
	    }

	    return found || __closestFrom(el.getRootNode().host);
	  }

	  return __closestFrom(base);
	}

	function onTouchStart(event) {
	  const swiper = this;
	  const document = getDocument();
	  const window = getWindow();
	  const data = swiper.touchEventsData;
	  const {
	    params,
	    touches,
	    enabled
	  } = swiper;
	  if (!enabled) return;

	  if (swiper.animating && params.preventInteractionOnTransition) {
	    return;
	  }

	  if (!swiper.animating && params.cssMode && params.loop) {
	    swiper.loopFix();
	  }

	  let e = event;
	  if (e.originalEvent) e = e.originalEvent;
	  let $targetEl = $(e.target);

	  if (params.touchEventsTarget === 'wrapper') {
	    if (!$targetEl.closest(swiper.wrapperEl).length) return;
	  }

	  data.isTouchEvent = e.type === 'touchstart';
	  if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
	  if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
	  if (data.isTouched && data.isMoved) return; // change target el for shadow root component

	  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== ''; // eslint-disable-next-line

	  const eventPath = event.composedPath ? event.composedPath() : event.path;

	  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
	    $targetEl = $(eventPath[0]);
	  }

	  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
	  const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element

	  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
	    swiper.allowClick = true;
	    return;
	  }

	  if (params.swipeHandler) {
	    if (!$targetEl.closest(params.swipeHandler)[0]) return;
	  }

	  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
	  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
	  const startX = touches.currentX;
	  const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

	  const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
	  const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

	  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
	    if (edgeSwipeDetection === 'prevent') {
	      event.preventDefault();
	    } else {
	      return;
	    }
	  }

	  Object.assign(data, {
	    isTouched: true,
	    isMoved: false,
	    allowTouchCallbacks: true,
	    isScrolling: undefined,
	    startMoving: undefined
	  });
	  touches.startX = startX;
	  touches.startY = startY;
	  data.touchStartTime = now();
	  swiper.allowClick = true;
	  swiper.updateSize();
	  swiper.swipeDirection = undefined;
	  if (params.threshold > 0) data.allowThresholdMove = false;

	  if (e.type !== 'touchstart') {
	    let preventDefault = true;

	    if ($targetEl.is(data.focusableElements)) {
	      preventDefault = false;

	      if ($targetEl[0].nodeName === 'SELECT') {
	        data.isTouched = false;
	      }
	    }

	    if (document.activeElement && $(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) {
	      document.activeElement.blur();
	    }

	    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

	    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
	      e.preventDefault();
	    }
	  }

	  if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
	    swiper.freeMode.onTouchStart();
	  }

	  swiper.emit('touchStart', e);
	}

	function onTouchMove(event) {
	  const document = getDocument();
	  const swiper = this;
	  const data = swiper.touchEventsData;
	  const {
	    params,
	    touches,
	    rtlTranslate: rtl,
	    enabled
	  } = swiper;
	  if (!enabled) return;
	  let e = event;
	  if (e.originalEvent) e = e.originalEvent;

	  if (!data.isTouched) {
	    if (data.startMoving && data.isScrolling) {
	      swiper.emit('touchMoveOpposite', e);
	    }

	    return;
	  }

	  if (data.isTouchEvent && e.type !== 'touchmove') return;
	  const targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
	  const pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
	  const pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;

	  if (e.preventedByNestedSwiper) {
	    touches.startX = pageX;
	    touches.startY = pageY;
	    return;
	  }

	  if (!swiper.allowTouchMove) {
	    if (!$(e.target).is(data.focusableElements)) {
	      swiper.allowClick = false;
	    }

	    if (data.isTouched) {
	      Object.assign(touches, {
	        startX: pageX,
	        startY: pageY,
	        currentX: pageX,
	        currentY: pageY
	      });
	      data.touchStartTime = now();
	    }

	    return;
	  }

	  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
	    if (swiper.isVertical()) {
	      // Vertical
	      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
	        data.isTouched = false;
	        data.isMoved = false;
	        return;
	      }
	    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
	      return;
	    }
	  }

	  if (data.isTouchEvent && document.activeElement) {
	    if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
	      data.isMoved = true;
	      swiper.allowClick = false;
	      return;
	    }
	  }

	  if (data.allowTouchCallbacks) {
	    swiper.emit('touchMove', e);
	  }

	  if (e.targetTouches && e.targetTouches.length > 1) return;
	  touches.currentX = pageX;
	  touches.currentY = pageY;
	  const diffX = touches.currentX - touches.startX;
	  const diffY = touches.currentY - touches.startY;
	  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;

	  if (typeof data.isScrolling === 'undefined') {
	    let touchAngle;

	    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
	      data.isScrolling = false;
	    } else {
	      // eslint-disable-next-line
	      if (diffX * diffX + diffY * diffY >= 25) {
	        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
	        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
	      }
	    }
	  }

	  if (data.isScrolling) {
	    swiper.emit('touchMoveOpposite', e);
	  }

	  if (typeof data.startMoving === 'undefined') {
	    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
	      data.startMoving = true;
	    }
	  }

	  if (data.isScrolling) {
	    data.isTouched = false;
	    return;
	  }

	  if (!data.startMoving) {
	    return;
	  }

	  swiper.allowClick = false;

	  if (!params.cssMode && e.cancelable) {
	    e.preventDefault();
	  }

	  if (params.touchMoveStopPropagation && !params.nested) {
	    e.stopPropagation();
	  }

	  if (!data.isMoved) {
	    if (params.loop && !params.cssMode) {
	      swiper.loopFix();
	    }

	    data.startTranslate = swiper.getTranslate();
	    swiper.setTransition(0);

	    if (swiper.animating) {
	      swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
	    }

	    data.allowMomentumBounce = false; // Grab Cursor

	    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
	      swiper.setGrabCursor(true);
	    }

	    swiper.emit('sliderFirstMove', e);
	  }

	  swiper.emit('sliderMove', e);
	  data.isMoved = true;
	  let diff = swiper.isHorizontal() ? diffX : diffY;
	  touches.diff = diff;
	  diff *= params.touchRatio;
	  if (rtl) diff = -diff;
	  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
	  data.currentTranslate = diff + data.startTranslate;
	  let disableParentSwiper = true;
	  let resistanceRatio = params.resistanceRatio;

	  if (params.touchReleaseOnEdges) {
	    resistanceRatio = 0;
	  }

	  if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
	    disableParentSwiper = false;
	    if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
	  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
	    disableParentSwiper = false;
	    if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
	  }

	  if (disableParentSwiper) {
	    e.preventedByNestedSwiper = true;
	  } // Directions locks


	  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
	    data.currentTranslate = data.startTranslate;
	  }

	  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
	    data.currentTranslate = data.startTranslate;
	  }

	  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
	    data.currentTranslate = data.startTranslate;
	  } // Threshold


	  if (params.threshold > 0) {
	    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
	      if (!data.allowThresholdMove) {
	        data.allowThresholdMove = true;
	        touches.startX = touches.currentX;
	        touches.startY = touches.currentY;
	        data.currentTranslate = data.startTranslate;
	        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
	        return;
	      }
	    } else {
	      data.currentTranslate = data.startTranslate;
	      return;
	    }
	  }

	  if (!params.followFinger || params.cssMode) return; // Update active index in free mode

	  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
	    swiper.updateActiveIndex();
	    swiper.updateSlidesClasses();
	  }

	  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
	    swiper.freeMode.onTouchMove();
	  } // Update progress


	  swiper.updateProgress(data.currentTranslate); // Update translate

	  swiper.setTranslate(data.currentTranslate);
	}

	function onTouchEnd(event) {
	  const swiper = this;
	  const data = swiper.touchEventsData;
	  const {
	    params,
	    touches,
	    rtlTranslate: rtl,
	    slidesGrid,
	    enabled
	  } = swiper;
	  if (!enabled) return;
	  let e = event;
	  if (e.originalEvent) e = e.originalEvent;

	  if (data.allowTouchCallbacks) {
	    swiper.emit('touchEnd', e);
	  }

	  data.allowTouchCallbacks = false;

	  if (!data.isTouched) {
	    if (data.isMoved && params.grabCursor) {
	      swiper.setGrabCursor(false);
	    }

	    data.isMoved = false;
	    data.startMoving = false;
	    return;
	  } // Return Grab Cursor


	  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
	    swiper.setGrabCursor(false);
	  } // Time diff


	  const touchEndTime = now();
	  const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

	  if (swiper.allowClick) {
	    const pathTree = e.path || e.composedPath && e.composedPath();
	    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
	    swiper.emit('tap click', e);

	    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
	      swiper.emit('doubleTap doubleClick', e);
	    }
	  }

	  data.lastClickTime = now();
	  nextTick(() => {
	    if (!swiper.destroyed) swiper.allowClick = true;
	  });

	  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
	    data.isTouched = false;
	    data.isMoved = false;
	    data.startMoving = false;
	    return;
	  }

	  data.isTouched = false;
	  data.isMoved = false;
	  data.startMoving = false;
	  let currentPos;

	  if (params.followFinger) {
	    currentPos = rtl ? swiper.translate : -swiper.translate;
	  } else {
	    currentPos = -data.currentTranslate;
	  }

	  if (params.cssMode) {
	    return;
	  }

	  if (swiper.params.freeMode && params.freeMode.enabled) {
	    swiper.freeMode.onTouchEnd({
	      currentPos
	    });
	    return;
	  } // Find current slide


	  let stopIndex = 0;
	  let groupSize = swiper.slidesSizesGrid[0];

	  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
	    const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

	    if (typeof slidesGrid[i + increment] !== 'undefined') {
	      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
	        stopIndex = i;
	        groupSize = slidesGrid[i + increment] - slidesGrid[i];
	      }
	    } else if (currentPos >= slidesGrid[i]) {
	      stopIndex = i;
	      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
	    }
	  }

	  let rewindFirstIndex = null;
	  let rewindLastIndex = null;

	  if (params.rewind) {
	    if (swiper.isBeginning) {
	      rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
	    } else if (swiper.isEnd) {
	      rewindFirstIndex = 0;
	    }
	  } // Find current slide size


	  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
	  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

	  if (timeDiff > params.longSwipesMs) {
	    // Long touches
	    if (!params.longSwipes) {
	      swiper.slideTo(swiper.activeIndex);
	      return;
	    }

	    if (swiper.swipeDirection === 'next') {
	      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
	    }

	    if (swiper.swipeDirection === 'prev') {
	      if (ratio > 1 - params.longSwipesRatio) {
	        swiper.slideTo(stopIndex + increment);
	      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
	        swiper.slideTo(rewindLastIndex);
	      } else {
	        swiper.slideTo(stopIndex);
	      }
	    }
	  } else {
	    // Short swipes
	    if (!params.shortSwipes) {
	      swiper.slideTo(swiper.activeIndex);
	      return;
	    }

	    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

	    if (!isNavButtonTarget) {
	      if (swiper.swipeDirection === 'next') {
	        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
	      }

	      if (swiper.swipeDirection === 'prev') {
	        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
	      }
	    } else if (e.target === swiper.navigation.nextEl) {
	      swiper.slideTo(stopIndex + increment);
	    } else {
	      swiper.slideTo(stopIndex);
	    }
	  }
	}

	function onResize() {
	  const swiper = this;
	  const {
	    params,
	    el
	  } = swiper;
	  if (el && el.offsetWidth === 0) return; // Breakpoints

	  if (params.breakpoints) {
	    swiper.setBreakpoint();
	  } // Save locks


	  const {
	    allowSlideNext,
	    allowSlidePrev,
	    snapGrid
	  } = swiper; // Disable locks on resize

	  swiper.allowSlideNext = true;
	  swiper.allowSlidePrev = true;
	  swiper.updateSize();
	  swiper.updateSlides();
	  swiper.updateSlidesClasses();

	  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
	    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
	  } else {
	    swiper.slideTo(swiper.activeIndex, 0, false, true);
	  }

	  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
	    swiper.autoplay.run();
	  } // Return locks after resize


	  swiper.allowSlidePrev = allowSlidePrev;
	  swiper.allowSlideNext = allowSlideNext;

	  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
	    swiper.checkOverflow();
	  }
	}

	function onClick(e) {
	  const swiper = this;
	  if (!swiper.enabled) return;

	  if (!swiper.allowClick) {
	    if (swiper.params.preventClicks) e.preventDefault();

	    if (swiper.params.preventClicksPropagation && swiper.animating) {
	      e.stopPropagation();
	      e.stopImmediatePropagation();
	    }
	  }
	}

	function onScroll() {
	  const swiper = this;
	  const {
	    wrapperEl,
	    rtlTranslate,
	    enabled
	  } = swiper;
	  if (!enabled) return;
	  swiper.previousTranslate = swiper.translate;

	  if (swiper.isHorizontal()) {
	    swiper.translate = -wrapperEl.scrollLeft;
	  } else {
	    swiper.translate = -wrapperEl.scrollTop;
	  } // eslint-disable-next-line


	  if (swiper.translate === 0) swiper.translate = 0;
	  swiper.updateActiveIndex();
	  swiper.updateSlidesClasses();
	  let newProgress;
	  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

	  if (translatesDiff === 0) {
	    newProgress = 0;
	  } else {
	    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
	  }

	  if (newProgress !== swiper.progress) {
	    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
	  }

	  swiper.emit('setTranslate', swiper.translate, false);
	}

	let dummyEventAttached = false;

	function dummyEventListener() {}

	const events = (swiper, method) => {
	  const document = getDocument();
	  const {
	    params,
	    touchEvents,
	    el,
	    wrapperEl,
	    device,
	    support
	  } = swiper;
	  const capture = !!params.nested;
	  const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
	  const swiperMethod = method; // Touch Events

	  if (!support.touch) {
	    el[domMethod](touchEvents.start, swiper.onTouchStart, false);
	    document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
	    document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
	  } else {
	    const passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {
	      passive: true,
	      capture: false
	    } : false;
	    el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
	    el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
	      passive: false,
	      capture
	    } : capture);
	    el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);

	    if (touchEvents.cancel) {
	      el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
	    }
	  } // Prevent Links Clicks


	  if (params.preventClicks || params.preventClicksPropagation) {
	    el[domMethod]('click', swiper.onClick, true);
	  }

	  if (params.cssMode) {
	    wrapperEl[domMethod]('scroll', swiper.onScroll);
	  } // Resize handler


	  if (params.updateOnWindowResize) {
	    swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
	  } else {
	    swiper[swiperMethod]('observerUpdate', onResize, true);
	  }
	};

	function attachEvents() {
	  const swiper = this;
	  const document = getDocument();
	  const {
	    params,
	    support
	  } = swiper;
	  swiper.onTouchStart = onTouchStart.bind(swiper);
	  swiper.onTouchMove = onTouchMove.bind(swiper);
	  swiper.onTouchEnd = onTouchEnd.bind(swiper);

	  if (params.cssMode) {
	    swiper.onScroll = onScroll.bind(swiper);
	  }

	  swiper.onClick = onClick.bind(swiper);

	  if (support.touch && !dummyEventAttached) {
	    document.addEventListener('touchstart', dummyEventListener);
	    dummyEventAttached = true;
	  }

	  events(swiper, 'on');
	}

	function detachEvents() {
	  const swiper = this;
	  events(swiper, 'off');
	}

	var events$1 = {
	  attachEvents,
	  detachEvents
	};

	const isGridEnabled = (swiper, params) => {
	  return swiper.grid && params.grid && params.grid.rows > 1;
	};

	function setBreakpoint() {
	  const swiper = this;
	  const {
	    activeIndex,
	    initialized,
	    loopedSlides = 0,
	    params,
	    $el
	  } = swiper;
	  const breakpoints = params.breakpoints;
	  if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Get breakpoint for window width and update parameters

	  const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
	  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
	  const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
	  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
	  const wasMultiRow = isGridEnabled(swiper, params);
	  const isMultiRow = isGridEnabled(swiper, breakpointParams);
	  const wasEnabled = params.enabled;

	  if (wasMultiRow && !isMultiRow) {
	    $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
	    swiper.emitContainerClasses();
	  } else if (!wasMultiRow && isMultiRow) {
	    $el.addClass(`${params.containerModifierClass}grid`);

	    if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
	      $el.addClass(`${params.containerModifierClass}grid-column`);
	    }

	    swiper.emitContainerClasses();
	  } // Toggle navigation, pagination, scrollbar


	  ['navigation', 'pagination', 'scrollbar'].forEach(prop => {
	    const wasModuleEnabled = params[prop] && params[prop].enabled;
	    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;

	    if (wasModuleEnabled && !isModuleEnabled) {
	      swiper[prop].disable();
	    }

	    if (!wasModuleEnabled && isModuleEnabled) {
	      swiper[prop].enable();
	    }
	  });
	  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
	  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

	  if (directionChanged && initialized) {
	    swiper.changeDirection();
	  }

	  extend(swiper.params, breakpointParams);
	  const isEnabled = swiper.params.enabled;
	  Object.assign(swiper, {
	    allowTouchMove: swiper.params.allowTouchMove,
	    allowSlideNext: swiper.params.allowSlideNext,
	    allowSlidePrev: swiper.params.allowSlidePrev
	  });

	  if (wasEnabled && !isEnabled) {
	    swiper.disable();
	  } else if (!wasEnabled && isEnabled) {
	    swiper.enable();
	  }

	  swiper.currentBreakpoint = breakpoint;
	  swiper.emit('_beforeBreakpoint', breakpointParams);

	  if (needsReLoop && initialized) {
	    swiper.loopDestroy();
	    swiper.loopCreate();
	    swiper.updateSlides();
	    swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
	  }

	  swiper.emit('breakpoint', breakpointParams);
	}

	function getBreakpoint(breakpoints, base = 'window', containerEl) {
	  if (!breakpoints || base === 'container' && !containerEl) return undefined;
	  let breakpoint = false;
	  const window = getWindow();
	  const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
	  const points = Object.keys(breakpoints).map(point => {
	    if (typeof point === 'string' && point.indexOf('@') === 0) {
	      const minRatio = parseFloat(point.substr(1));
	      const value = currentHeight * minRatio;
	      return {
	        value,
	        point
	      };
	    }

	    return {
	      value: point,
	      point
	    };
	  });
	  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

	  for (let i = 0; i < points.length; i += 1) {
	    const {
	      point,
	      value
	    } = points[i];

	    if (base === 'window') {
	      if (window.matchMedia(`(min-width: ${value}px)`).matches) {
	        breakpoint = point;
	      }
	    } else if (value <= containerEl.clientWidth) {
	      breakpoint = point;
	    }
	  }

	  return breakpoint || 'max';
	}

	var breakpoints = {
	  setBreakpoint,
	  getBreakpoint
	};

	function prepareClasses(entries, prefix) {
	  const resultClasses = [];
	  entries.forEach(item => {
	    if (typeof item === 'object') {
	      Object.keys(item).forEach(classNames => {
	        if (item[classNames]) {
	          resultClasses.push(prefix + classNames);
	        }
	      });
	    } else if (typeof item === 'string') {
	      resultClasses.push(prefix + item);
	    }
	  });
	  return resultClasses;
	}

	function addClasses() {
	  const swiper = this;
	  const {
	    classNames,
	    params,
	    rtl,
	    $el,
	    device,
	    support
	  } = swiper; // prettier-ignore

	  const suffixes = prepareClasses(['initialized', params.direction, {
	    'pointer-events': !support.touch
	  }, {
	    'free-mode': swiper.params.freeMode && params.freeMode.enabled
	  }, {
	    'autoheight': params.autoHeight
	  }, {
	    'rtl': rtl
	  }, {
	    'grid': params.grid && params.grid.rows > 1
	  }, {
	    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
	  }, {
	    'android': device.android
	  }, {
	    'ios': device.ios
	  }, {
	    'css-mode': params.cssMode
	  }, {
	    'centered': params.cssMode && params.centeredSlides
	  }, {
	    'watch-progress': params.watchSlidesProgress
	  }], params.containerModifierClass);
	  classNames.push(...suffixes);
	  $el.addClass([...classNames].join(' '));
	  swiper.emitContainerClasses();
	}

	function removeClasses() {
	  const swiper = this;
	  const {
	    $el,
	    classNames
	  } = swiper;
	  $el.removeClass(classNames.join(' '));
	  swiper.emitContainerClasses();
	}

	var classes = {
	  addClasses,
	  removeClasses
	};

	function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
	  const window = getWindow();
	  let image;

	  function onReady() {
	    if (callback) callback();
	  }

	  const isPicture = $(imageEl).parent('picture')[0];

	  if (!isPicture && (!imageEl.complete || !checkForComplete)) {
	    if (src) {
	      image = new window.Image();
	      image.onload = onReady;
	      image.onerror = onReady;

	      if (sizes) {
	        image.sizes = sizes;
	      }

	      if (srcset) {
	        image.srcset = srcset;
	      }

	      if (src) {
	        image.src = src;
	      }
	    } else {
	      onReady();
	    }
	  } else {
	    // image already loaded...
	    onReady();
	  }
	}

	function preloadImages() {
	  const swiper = this;
	  swiper.imagesToLoad = swiper.$el.find('img');

	  function onReady() {
	    if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
	    if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

	    if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
	      if (swiper.params.updateOnImagesReady) swiper.update();
	      swiper.emit('imagesReady');
	    }
	  }

	  for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
	    const imageEl = swiper.imagesToLoad[i];
	    swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
	  }
	}

	var images = {
	  loadImage,
	  preloadImages
	};

	function checkOverflow() {
	  const swiper = this;
	  const {
	    isLocked: wasLocked,
	    params
	  } = swiper;
	  const {
	    slidesOffsetBefore
	  } = params;

	  if (slidesOffsetBefore) {
	    const lastSlideIndex = swiper.slides.length - 1;
	    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
	    swiper.isLocked = swiper.size > lastSlideRightEdge;
	  } else {
	    swiper.isLocked = swiper.snapGrid.length === 1;
	  }

	  if (params.allowSlideNext === true) {
	    swiper.allowSlideNext = !swiper.isLocked;
	  }

	  if (params.allowSlidePrev === true) {
	    swiper.allowSlidePrev = !swiper.isLocked;
	  }

	  if (wasLocked && wasLocked !== swiper.isLocked) {
	    swiper.isEnd = false;
	  }

	  if (wasLocked !== swiper.isLocked) {
	    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
	  }
	}

	var checkOverflow$1 = {
	  checkOverflow
	};

	var defaults = {
	  init: true,
	  direction: 'horizontal',
	  touchEventsTarget: 'wrapper',
	  initialSlide: 0,
	  speed: 300,
	  cssMode: false,
	  updateOnWindowResize: true,
	  resizeObserver: true,
	  nested: false,
	  createElements: false,
	  enabled: true,
	  focusableElements: 'input, select, option, textarea, button, video, label',
	  // Overrides
	  width: null,
	  height: null,
	  //
	  preventInteractionOnTransition: false,
	  // ssr
	  userAgent: null,
	  url: null,
	  // To support iOS's swipe-to-go-back gesture (when being used in-app).
	  edgeSwipeDetection: false,
	  edgeSwipeThreshold: 20,
	  // Autoheight
	  autoHeight: false,
	  // Set wrapper width
	  setWrapperSize: false,
	  // Virtual Translate
	  virtualTranslate: false,
	  // Effects
	  effect: 'slide',
	  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
	  // Breakpoints
	  breakpoints: undefined,
	  breakpointsBase: 'window',
	  // Slides grid
	  spaceBetween: 0,
	  slidesPerView: 1,
	  slidesPerGroup: 1,
	  slidesPerGroupSkip: 0,
	  slidesPerGroupAuto: false,
	  centeredSlides: false,
	  centeredSlidesBounds: false,
	  slidesOffsetBefore: 0,
	  // in px
	  slidesOffsetAfter: 0,
	  // in px
	  normalizeSlideIndex: true,
	  centerInsufficientSlides: false,
	  // Disable swiper and hide navigation when container not overflow
	  watchOverflow: true,
	  // Round length
	  roundLengths: false,
	  // Touches
	  touchRatio: 1,
	  touchAngle: 45,
	  simulateTouch: true,
	  shortSwipes: true,
	  longSwipes: true,
	  longSwipesRatio: 0.5,
	  longSwipesMs: 300,
	  followFinger: true,
	  allowTouchMove: true,
	  threshold: 0,
	  touchMoveStopPropagation: false,
	  touchStartPreventDefault: true,
	  touchStartForcePreventDefault: false,
	  touchReleaseOnEdges: false,
	  // Unique Navigation Elements
	  uniqueNavElements: true,
	  // Resistance
	  resistance: true,
	  resistanceRatio: 0.85,
	  // Progress
	  watchSlidesProgress: false,
	  // Cursor
	  grabCursor: false,
	  // Clicks
	  preventClicks: true,
	  preventClicksPropagation: true,
	  slideToClickedSlide: false,
	  // Images
	  preloadImages: true,
	  updateOnImagesReady: true,
	  // loop
	  loop: false,
	  loopAdditionalSlides: 0,
	  loopedSlides: null,
	  loopedSlidesLimit: true,
	  loopFillGroupWithBlank: false,
	  loopPreventsSlide: true,
	  // rewind
	  rewind: false,
	  // Swiping/no swiping
	  allowSlidePrev: true,
	  allowSlideNext: true,
	  swipeHandler: null,
	  // '.swipe-handler',
	  noSwiping: true,
	  noSwipingClass: 'swiper-no-swiping',
	  noSwipingSelector: null,
	  // Passive Listeners
	  passiveListeners: true,
	  maxBackfaceHiddenSlides: 10,
	  // NS
	  containerModifierClass: 'swiper-',
	  // NEW
	  slideClass: 'swiper-slide',
	  slideBlankClass: 'swiper-slide-invisible-blank',
	  slideActiveClass: 'swiper-slide-active',
	  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
	  slideVisibleClass: 'swiper-slide-visible',
	  slideDuplicateClass: 'swiper-slide-duplicate',
	  slideNextClass: 'swiper-slide-next',
	  slideDuplicateNextClass: 'swiper-slide-duplicate-next',
	  slidePrevClass: 'swiper-slide-prev',
	  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
	  wrapperClass: 'swiper-wrapper',
	  // Callbacks
	  runCallbacksOnInit: true,
	  // Internals
	  _emitClasses: false
	};

	function moduleExtendParams(params, allModulesParams) {
	  return function extendParams(obj = {}) {
	    const moduleParamName = Object.keys(obj)[0];
	    const moduleParams = obj[moduleParamName];

	    if (typeof moduleParams !== 'object' || moduleParams === null) {
	      extend(allModulesParams, obj);
	      return;
	    }

	    if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
	      params[moduleParamName] = {
	        auto: true
	      };
	    }

	    if (!(moduleParamName in params && 'enabled' in moduleParams)) {
	      extend(allModulesParams, obj);
	      return;
	    }

	    if (params[moduleParamName] === true) {
	      params[moduleParamName] = {
	        enabled: true
	      };
	    }

	    if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
	      params[moduleParamName].enabled = true;
	    }

	    if (!params[moduleParamName]) params[moduleParamName] = {
	      enabled: false
	    };
	    extend(allModulesParams, obj);
	  };
	}

	/* eslint no-param-reassign: "off" */
	const prototypes = {
	  eventsEmitter,
	  update,
	  translate,
	  transition,
	  slide,
	  loop,
	  grabCursor,
	  events: events$1,
	  breakpoints,
	  checkOverflow: checkOverflow$1,
	  classes,
	  images
	};
	const extendedDefaults = {};

	class Swiper {
	  constructor(...args) {
	    let el;
	    let params;

	    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
	      params = args[0];
	    } else {
	      [el, params] = args;
	    }

	    if (!params) params = {};
	    params = extend({}, params);
	    if (el && !params.el) params.el = el;

	    if (params.el && $(params.el).length > 1) {
	      const swipers = [];
	      $(params.el).each(containerEl => {
	        const newParams = extend({}, params, {
	          el: containerEl
	        });
	        swipers.push(new Swiper(newParams));
	      }); // eslint-disable-next-line no-constructor-return

	      return swipers;
	    } // Swiper Instance


	    const swiper = this;
	    swiper.__swiper__ = true;
	    swiper.support = getSupport();
	    swiper.device = getDevice({
	      userAgent: params.userAgent
	    });
	    swiper.browser = getBrowser();
	    swiper.eventsListeners = {};
	    swiper.eventsAnyListeners = [];
	    swiper.modules = [...swiper.__modules__];

	    if (params.modules && Array.isArray(params.modules)) {
	      swiper.modules.push(...params.modules);
	    }

	    const allModulesParams = {};
	    swiper.modules.forEach(mod => {
	      mod({
	        swiper,
	        extendParams: moduleExtendParams(params, allModulesParams),
	        on: swiper.on.bind(swiper),
	        once: swiper.once.bind(swiper),
	        off: swiper.off.bind(swiper),
	        emit: swiper.emit.bind(swiper)
	      });
	    }); // Extend defaults with modules params

	    const swiperParams = extend({}, defaults, allModulesParams); // Extend defaults with passed params

	    swiper.params = extend({}, swiperParams, extendedDefaults, params);
	    swiper.originalParams = extend({}, swiper.params);
	    swiper.passedParams = extend({}, params); // add event listeners

	    if (swiper.params && swiper.params.on) {
	      Object.keys(swiper.params.on).forEach(eventName => {
	        swiper.on(eventName, swiper.params.on[eventName]);
	      });
	    }

	    if (swiper.params && swiper.params.onAny) {
	      swiper.onAny(swiper.params.onAny);
	    } // Save Dom lib


	    swiper.$ = $; // Extend Swiper

	    Object.assign(swiper, {
	      enabled: swiper.params.enabled,
	      el,
	      // Classes
	      classNames: [],
	      // Slides
	      slides: $(),
	      slidesGrid: [],
	      snapGrid: [],
	      slidesSizesGrid: [],

	      // isDirection
	      isHorizontal() {
	        return swiper.params.direction === 'horizontal';
	      },

	      isVertical() {
	        return swiper.params.direction === 'vertical';
	      },

	      // Indexes
	      activeIndex: 0,
	      realIndex: 0,
	      //
	      isBeginning: true,
	      isEnd: false,
	      // Props
	      translate: 0,
	      previousTranslate: 0,
	      progress: 0,
	      velocity: 0,
	      animating: false,
	      // Locks
	      allowSlideNext: swiper.params.allowSlideNext,
	      allowSlidePrev: swiper.params.allowSlidePrev,
	      // Touch Events
	      touchEvents: function touchEvents() {
	        const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
	        const desktop = ['pointerdown', 'pointermove', 'pointerup'];
	        swiper.touchEventsTouch = {
	          start: touch[0],
	          move: touch[1],
	          end: touch[2],
	          cancel: touch[3]
	        };
	        swiper.touchEventsDesktop = {
	          start: desktop[0],
	          move: desktop[1],
	          end: desktop[2]
	        };
	        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
	      }(),
	      touchEventsData: {
	        isTouched: undefined,
	        isMoved: undefined,
	        allowTouchCallbacks: undefined,
	        touchStartTime: undefined,
	        isScrolling: undefined,
	        currentTranslate: undefined,
	        startTranslate: undefined,
	        allowThresholdMove: undefined,
	        // Form elements to match
	        focusableElements: swiper.params.focusableElements,
	        // Last click time
	        lastClickTime: now(),
	        clickTimeout: undefined,
	        // Velocities
	        velocities: [],
	        allowMomentumBounce: undefined,
	        isTouchEvent: undefined,
	        startMoving: undefined
	      },
	      // Clicks
	      allowClick: true,
	      // Touches
	      allowTouchMove: swiper.params.allowTouchMove,
	      touches: {
	        startX: 0,
	        startY: 0,
	        currentX: 0,
	        currentY: 0,
	        diff: 0
	      },
	      // Images
	      imagesToLoad: [],
	      imagesLoaded: 0
	    });
	    swiper.emit('_swiper'); // Init

	    if (swiper.params.init) {
	      swiper.init();
	    } // Return app instance
	    // eslint-disable-next-line no-constructor-return


	    return swiper;
	  }

	  enable() {
	    const swiper = this;
	    if (swiper.enabled) return;
	    swiper.enabled = true;

	    if (swiper.params.grabCursor) {
	      swiper.setGrabCursor();
	    }

	    swiper.emit('enable');
	  }

	  disable() {
	    const swiper = this;
	    if (!swiper.enabled) return;
	    swiper.enabled = false;

	    if (swiper.params.grabCursor) {
	      swiper.unsetGrabCursor();
	    }

	    swiper.emit('disable');
	  }

	  setProgress(progress, speed) {
	    const swiper = this;
	    progress = Math.min(Math.max(progress, 0), 1);
	    const min = swiper.minTranslate();
	    const max = swiper.maxTranslate();
	    const current = (max - min) * progress + min;
	    swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
	    swiper.updateActiveIndex();
	    swiper.updateSlidesClasses();
	  }

	  emitContainerClasses() {
	    const swiper = this;
	    if (!swiper.params._emitClasses || !swiper.el) return;
	    const cls = swiper.el.className.split(' ').filter(className => {
	      return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
	    });
	    swiper.emit('_containerClasses', cls.join(' '));
	  }

	  getSlideClasses(slideEl) {
	    const swiper = this;
	    if (swiper.destroyed) return '';
	    return slideEl.className.split(' ').filter(className => {
	      return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
	    }).join(' ');
	  }

	  emitSlidesClasses() {
	    const swiper = this;
	    if (!swiper.params._emitClasses || !swiper.el) return;
	    const updates = [];
	    swiper.slides.each(slideEl => {
	      const classNames = swiper.getSlideClasses(slideEl);
	      updates.push({
	        slideEl,
	        classNames
	      });
	      swiper.emit('_slideClass', slideEl, classNames);
	    });
	    swiper.emit('_slideClasses', updates);
	  }

	  slidesPerViewDynamic(view = 'current', exact = false) {
	    const swiper = this;
	    const {
	      params,
	      slides,
	      slidesGrid,
	      slidesSizesGrid,
	      size: swiperSize,
	      activeIndex
	    } = swiper;
	    let spv = 1;

	    if (params.centeredSlides) {
	      let slideSize = slides[activeIndex].swiperSlideSize;
	      let breakLoop;

	      for (let i = activeIndex + 1; i < slides.length; i += 1) {
	        if (slides[i] && !breakLoop) {
	          slideSize += slides[i].swiperSlideSize;
	          spv += 1;
	          if (slideSize > swiperSize) breakLoop = true;
	        }
	      }

	      for (let i = activeIndex - 1; i >= 0; i -= 1) {
	        if (slides[i] && !breakLoop) {
	          slideSize += slides[i].swiperSlideSize;
	          spv += 1;
	          if (slideSize > swiperSize) breakLoop = true;
	        }
	      }
	    } else {
	      // eslint-disable-next-line
	      if (view === 'current') {
	        for (let i = activeIndex + 1; i < slides.length; i += 1) {
	          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;

	          if (slideInView) {
	            spv += 1;
	          }
	        }
	      } else {
	        // previous
	        for (let i = activeIndex - 1; i >= 0; i -= 1) {
	          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;

	          if (slideInView) {
	            spv += 1;
	          }
	        }
	      }
	    }

	    return spv;
	  }

	  update() {
	    const swiper = this;
	    if (!swiper || swiper.destroyed) return;
	    const {
	      snapGrid,
	      params
	    } = swiper; // Breakpoints

	    if (params.breakpoints) {
	      swiper.setBreakpoint();
	    }

	    swiper.updateSize();
	    swiper.updateSlides();
	    swiper.updateProgress();
	    swiper.updateSlidesClasses();

	    function setTranslate() {
	      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
	      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
	      swiper.setTranslate(newTranslate);
	      swiper.updateActiveIndex();
	      swiper.updateSlidesClasses();
	    }

	    let translated;

	    if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
	      setTranslate();

	      if (swiper.params.autoHeight) {
	        swiper.updateAutoHeight();
	      }
	    } else {
	      if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
	        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
	      } else {
	        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
	      }

	      if (!translated) {
	        setTranslate();
	      }
	    }

	    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
	      swiper.checkOverflow();
	    }

	    swiper.emit('update');
	  }

	  changeDirection(newDirection, needUpdate = true) {
	    const swiper = this;
	    const currentDirection = swiper.params.direction;

	    if (!newDirection) {
	      // eslint-disable-next-line
	      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
	    }

	    if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
	      return swiper;
	    }

	    swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
	    swiper.emitContainerClasses();
	    swiper.params.direction = newDirection;
	    swiper.slides.each(slideEl => {
	      if (newDirection === 'vertical') {
	        slideEl.style.width = '';
	      } else {
	        slideEl.style.height = '';
	      }
	    });
	    swiper.emit('changeDirection');
	    if (needUpdate) swiper.update();
	    return swiper;
	  }

	  changeLanguageDirection(direction) {
	    const swiper = this;
	    if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
	    swiper.rtl = direction === 'rtl';
	    swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;

	    if (swiper.rtl) {
	      swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
	      swiper.el.dir = 'rtl';
	    } else {
	      swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
	      swiper.el.dir = 'ltr';
	    }

	    swiper.update();
	  }

	  mount(el) {
	    const swiper = this;
	    if (swiper.mounted) return true; // Find el

	    const $el = $(el || swiper.params.el);
	    el = $el[0];

	    if (!el) {
	      return false;
	    }

	    el.swiper = swiper;

	    const getWrapperSelector = () => {
	      return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
	    };

	    const getWrapper = () => {
	      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
	        const res = $(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items

	        res.children = options => $el.children(options);

	        return res;
	      }

	      if (!$el.children) {
	        return $($el).children(getWrapperSelector());
	      }

	      return $el.children(getWrapperSelector());
	    }; // Find Wrapper


	    let $wrapperEl = getWrapper();

	    if ($wrapperEl.length === 0 && swiper.params.createElements) {
	      const document = getDocument();
	      const wrapper = document.createElement('div');
	      $wrapperEl = $(wrapper);
	      wrapper.className = swiper.params.wrapperClass;
	      $el.append(wrapper);
	      $el.children(`.${swiper.params.slideClass}`).each(slideEl => {
	        $wrapperEl.append(slideEl);
	      });
	    }

	    Object.assign(swiper, {
	      $el,
	      el,
	      $wrapperEl,
	      wrapperEl: $wrapperEl[0],
	      mounted: true,
	      // RTL
	      rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
	      rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
	      wrongRTL: $wrapperEl.css('display') === '-webkit-box'
	    });
	    return true;
	  }

	  init(el) {
	    const swiper = this;
	    if (swiper.initialized) return swiper;
	    const mounted = swiper.mount(el);
	    if (mounted === false) return swiper;
	    swiper.emit('beforeInit'); // Set breakpoint

	    if (swiper.params.breakpoints) {
	      swiper.setBreakpoint();
	    } // Add Classes


	    swiper.addClasses(); // Create loop

	    if (swiper.params.loop) {
	      swiper.loopCreate();
	    } // Update size


	    swiper.updateSize(); // Update slides

	    swiper.updateSlides();

	    if (swiper.params.watchOverflow) {
	      swiper.checkOverflow();
	    } // Set Grab Cursor


	    if (swiper.params.grabCursor && swiper.enabled) {
	      swiper.setGrabCursor();
	    }

	    if (swiper.params.preloadImages) {
	      swiper.preloadImages();
	    } // Slide To Initial Slide


	    if (swiper.params.loop) {
	      swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
	    } else {
	      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
	    } // Attach events


	    swiper.attachEvents(); // Init Flag

	    swiper.initialized = true; // Emit

	    swiper.emit('init');
	    swiper.emit('afterInit');
	    return swiper;
	  }

	  destroy(deleteInstance = true, cleanStyles = true) {
	    const swiper = this;
	    const {
	      params,
	      $el,
	      $wrapperEl,
	      slides
	    } = swiper;

	    if (typeof swiper.params === 'undefined' || swiper.destroyed) {
	      return null;
	    }

	    swiper.emit('beforeDestroy'); // Init Flag

	    swiper.initialized = false; // Detach events

	    swiper.detachEvents(); // Destroy loop

	    if (params.loop) {
	      swiper.loopDestroy();
	    } // Cleanup styles


	    if (cleanStyles) {
	      swiper.removeClasses();
	      $el.removeAttr('style');
	      $wrapperEl.removeAttr('style');

	      if (slides && slides.length) {
	        slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index');
	      }
	    }

	    swiper.emit('destroy'); // Detach emitter events

	    Object.keys(swiper.eventsListeners).forEach(eventName => {
	      swiper.off(eventName);
	    });

	    if (deleteInstance !== false) {
	      swiper.$el[0].swiper = null;
	      deleteProps(swiper);
	    }

	    swiper.destroyed = true;
	    return null;
	  }

	  static extendDefaults(newDefaults) {
	    extend(extendedDefaults, newDefaults);
	  }

	  static get extendedDefaults() {
	    return extendedDefaults;
	  }

	  static get defaults() {
	    return defaults;
	  }

	  static installModule(mod) {
	    if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
	    const modules = Swiper.prototype.__modules__;

	    if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
	      modules.push(mod);
	    }
	  }

	  static use(module) {
	    if (Array.isArray(module)) {
	      module.forEach(m => Swiper.installModule(m));
	      return Swiper;
	    }

	    Swiper.installModule(module);
	    return Swiper;
	  }

	}

	Object.keys(prototypes).forEach(prototypeGroup => {
	  Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
	    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
	  });
	});
	Swiper.use([Resize, Observer$1]);

	function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
	  const document = getDocument();

	  if (swiper.params.createElements) {
	    Object.keys(checkProps).forEach(key => {
	      if (!params[key] && params.auto === true) {
	        let element = swiper.$el.children(`.${checkProps[key]}`)[0];

	        if (!element) {
	          element = document.createElement('div');
	          element.className = checkProps[key];
	          swiper.$el.append(element);
	        }

	        params[key] = element;
	        originalParams[key] = element;
	      }
	    });
	  }

	  return params;
	}

	function classesToSelector(classes = '') {
	  return `.${classes.trim().replace(/([\.:!\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.')}`;
	}

	function Pagination({
	  swiper,
	  extendParams,
	  on,
	  emit
	}) {
	  const pfx = 'swiper-pagination';
	  extendParams({
	    pagination: {
	      el: null,
	      bulletElement: 'span',
	      clickable: false,
	      hideOnClick: false,
	      renderBullet: null,
	      renderProgressbar: null,
	      renderFraction: null,
	      renderCustom: null,
	      progressbarOpposite: false,
	      type: 'bullets',
	      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
	      dynamicBullets: false,
	      dynamicMainBullets: 1,
	      formatFractionCurrent: number => number,
	      formatFractionTotal: number => number,
	      bulletClass: `${pfx}-bullet`,
	      bulletActiveClass: `${pfx}-bullet-active`,
	      modifierClass: `${pfx}-`,
	      currentClass: `${pfx}-current`,
	      totalClass: `${pfx}-total`,
	      hiddenClass: `${pfx}-hidden`,
	      progressbarFillClass: `${pfx}-progressbar-fill`,
	      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
	      clickableClass: `${pfx}-clickable`,
	      lockClass: `${pfx}-lock`,
	      horizontalClass: `${pfx}-horizontal`,
	      verticalClass: `${pfx}-vertical`,
	      paginationDisabledClass: `${pfx}-disabled`
	    }
	  });
	  swiper.pagination = {
	    el: null,
	    $el: null,
	    bullets: []
	  };
	  let bulletSize;
	  let dynamicBulletIndex = 0;

	  function isPaginationDisabled() {
	    return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0;
	  }

	  function setSideBullets($bulletEl, position) {
	    const {
	      bulletActiveClass
	    } = swiper.params.pagination;
	    $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
	  }

	  function update() {
	    // Render || Update Pagination bullets/items
	    const rtl = swiper.rtl;
	    const params = swiper.params.pagination;
	    if (isPaginationDisabled()) return;
	    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
	    const $el = swiper.pagination.$el; // Current/Total

	    let current;
	    const total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

	    if (swiper.params.loop) {
	      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

	      if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
	        current -= slidesLength - swiper.loopedSlides * 2;
	      }

	      if (current > total - 1) current -= total;
	      if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
	    } else if (typeof swiper.snapIndex !== 'undefined') {
	      current = swiper.snapIndex;
	    } else {
	      current = swiper.activeIndex || 0;
	    } // Types


	    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
	      const bullets = swiper.pagination.bullets;
	      let firstIndex;
	      let lastIndex;
	      let midIndex;

	      if (params.dynamicBullets) {
	        bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
	        $el.css(swiper.isHorizontal() ? 'width' : 'height', `${bulletSize * (params.dynamicMainBullets + 4)}px`);

	        if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
	          dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);

	          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
	            dynamicBulletIndex = params.dynamicMainBullets - 1;
	          } else if (dynamicBulletIndex < 0) {
	            dynamicBulletIndex = 0;
	          }
	        }

	        firstIndex = Math.max(current - dynamicBulletIndex, 0);
	        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
	        midIndex = (lastIndex + firstIndex) / 2;
	      }

	      bullets.removeClass(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`).join(' '));

	      if ($el.length > 1) {
	        bullets.each(bullet => {
	          const $bullet = $(bullet);
	          const bulletIndex = $bullet.index();

	          if (bulletIndex === current) {
	            $bullet.addClass(params.bulletActiveClass);
	          }

	          if (params.dynamicBullets) {
	            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
	              $bullet.addClass(`${params.bulletActiveClass}-main`);
	            }

	            if (bulletIndex === firstIndex) {
	              setSideBullets($bullet, 'prev');
	            }

	            if (bulletIndex === lastIndex) {
	              setSideBullets($bullet, 'next');
	            }
	          }
	        });
	      } else {
	        const $bullet = bullets.eq(current);
	        const bulletIndex = $bullet.index();
	        $bullet.addClass(params.bulletActiveClass);

	        if (params.dynamicBullets) {
	          const $firstDisplayedBullet = bullets.eq(firstIndex);
	          const $lastDisplayedBullet = bullets.eq(lastIndex);

	          for (let i = firstIndex; i <= lastIndex; i += 1) {
	            bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
	          }

	          if (swiper.params.loop) {
	            if (bulletIndex >= bullets.length) {
	              for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
	                bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
	              }

	              bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
	            } else {
	              setSideBullets($firstDisplayedBullet, 'prev');
	              setSideBullets($lastDisplayedBullet, 'next');
	            }
	          } else {
	            setSideBullets($firstDisplayedBullet, 'prev');
	            setSideBullets($lastDisplayedBullet, 'next');
	          }
	        }
	      }

	      if (params.dynamicBullets) {
	        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
	        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
	        const offsetProp = rtl ? 'right' : 'left';
	        bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
	      }
	    }

	    if (params.type === 'fraction') {
	      $el.find(classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
	      $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
	    }

	    if (params.type === 'progressbar') {
	      let progressbarDirection;

	      if (params.progressbarOpposite) {
	        progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
	      } else {
	        progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
	      }

	      const scale = (current + 1) / total;
	      let scaleX = 1;
	      let scaleY = 1;

	      if (progressbarDirection === 'horizontal') {
	        scaleX = scale;
	      } else {
	        scaleY = scale;
	      }

	      $el.find(classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
	    }

	    if (params.type === 'custom' && params.renderCustom) {
	      $el.html(params.renderCustom(swiper, current + 1, total));
	      emit('paginationRender', $el[0]);
	    } else {
	      emit('paginationUpdate', $el[0]);
	    }

	    if (swiper.params.watchOverflow && swiper.enabled) {
	      $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
	    }
	  }

	  function render() {
	    // Render Container
	    const params = swiper.params.pagination;
	    if (isPaginationDisabled()) return;
	    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
	    const $el = swiper.pagination.$el;
	    let paginationHTML = '';

	    if (params.type === 'bullets') {
	      let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

	      if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) {
	        numberOfBullets = slidesLength;
	      }

	      for (let i = 0; i < numberOfBullets; i += 1) {
	        if (params.renderBullet) {
	          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
	        } else {
	          paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
	        }
	      }

	      $el.html(paginationHTML);
	      swiper.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
	    }

	    if (params.type === 'fraction') {
	      if (params.renderFraction) {
	        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
	      } else {
	        paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
	      }

	      $el.html(paginationHTML);
	    }

	    if (params.type === 'progressbar') {
	      if (params.renderProgressbar) {
	        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
	      } else {
	        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
	      }

	      $el.html(paginationHTML);
	    }

	    if (params.type !== 'custom') {
	      emit('paginationRender', swiper.pagination.$el[0]);
	    }
	  }

	  function init() {
	    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
	      el: 'swiper-pagination'
	    });
	    const params = swiper.params.pagination;
	    if (!params.el) return;
	    let $el = $(params.el);
	    if ($el.length === 0) return;

	    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
	      $el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper

	      if ($el.length > 1) {
	        $el = $el.filter(el => {
	          if ($(el).parents('.swiper')[0] !== swiper.el) return false;
	          return true;
	        });
	      }
	    }

	    if (params.type === 'bullets' && params.clickable) {
	      $el.addClass(params.clickableClass);
	    }

	    $el.addClass(params.modifierClass + params.type);
	    $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);

	    if (params.type === 'bullets' && params.dynamicBullets) {
	      $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
	      dynamicBulletIndex = 0;

	      if (params.dynamicMainBullets < 1) {
	        params.dynamicMainBullets = 1;
	      }
	    }

	    if (params.type === 'progressbar' && params.progressbarOpposite) {
	      $el.addClass(params.progressbarOppositeClass);
	    }

	    if (params.clickable) {
	      $el.on('click', classesToSelector(params.bulletClass), function onClick(e) {
	        e.preventDefault();
	        let index = $(this).index() * swiper.params.slidesPerGroup;
	        if (swiper.params.loop) index += swiper.loopedSlides;
	        swiper.slideTo(index);
	      });
	    }

	    Object.assign(swiper.pagination, {
	      $el,
	      el: $el[0]
	    });

	    if (!swiper.enabled) {
	      $el.addClass(params.lockClass);
	    }
	  }

	  function destroy() {
	    const params = swiper.params.pagination;
	    if (isPaginationDisabled()) return;
	    const $el = swiper.pagination.$el;
	    $el.removeClass(params.hiddenClass);
	    $el.removeClass(params.modifierClass + params.type);
	    $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
	    if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);

	    if (params.clickable) {
	      $el.off('click', classesToSelector(params.bulletClass));
	    }
	  }

	  on('init', () => {
	    if (swiper.params.pagination.enabled === false) {
	      // eslint-disable-next-line
	      disable();
	    } else {
	      init();
	      render();
	      update();
	    }
	  });
	  on('activeIndexChange', () => {
	    if (swiper.params.loop) {
	      update();
	    } else if (typeof swiper.snapIndex === 'undefined') {
	      update();
	    }
	  });
	  on('snapIndexChange', () => {
	    if (!swiper.params.loop) {
	      update();
	    }
	  });
	  on('slidesLengthChange', () => {
	    if (swiper.params.loop) {
	      render();
	      update();
	    }
	  });
	  on('snapGridLengthChange', () => {
	    if (!swiper.params.loop) {
	      render();
	      update();
	    }
	  });
	  on('destroy', () => {
	    destroy();
	  });
	  on('enable disable', () => {
	    const {
	      $el
	    } = swiper.pagination;

	    if ($el) {
	      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.pagination.lockClass);
	    }
	  });
	  on('lock unlock', () => {
	    update();
	  });
	  on('click', (_s, e) => {
	    const targetEl = e.target;
	    const {
	      $el
	    } = swiper.pagination;

	    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !$(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
	      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
	      const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);

	      if (isHidden === true) {
	        emit('paginationShow');
	      } else {
	        emit('paginationHide');
	      }

	      $el.toggleClass(swiper.params.pagination.hiddenClass);
	    }
	  });

	  const enable = () => {
	    swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);

	    if (swiper.pagination.$el) {
	      swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
	    }

	    init();
	    render();
	    update();
	  };

	  const disable = () => {
	    swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);

	    if (swiper.pagination.$el) {
	      swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
	    }

	    destroy();
	  };

	  Object.assign(swiper.pagination, {
	    enable,
	    disable,
	    render,
	    update,
	    init,
	    destroy
	  });
	}

	function Lazy({
	  swiper,
	  extendParams,
	  on,
	  emit
	}) {
	  extendParams({
	    lazy: {
	      checkInView: false,
	      enabled: false,
	      loadPrevNext: false,
	      loadPrevNextAmount: 1,
	      loadOnTransitionStart: false,
	      scrollingElement: '',
	      elementClass: 'swiper-lazy',
	      loadingClass: 'swiper-lazy-loading',
	      loadedClass: 'swiper-lazy-loaded',
	      preloaderClass: 'swiper-lazy-preloader'
	    }
	  });
	  swiper.lazy = {};
	  let scrollHandlerAttached = false;
	  let initialImageLoaded = false;

	  function loadInSlide(index, loadInDuplicate = true) {
	    const params = swiper.params.lazy;
	    if (typeof index === 'undefined') return;
	    if (swiper.slides.length === 0) return;
	    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
	    const $slideEl = isVirtual ? swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-swiper-slide-index="${index}"]`) : swiper.slides.eq(index);
	    const $images = $slideEl.find(`.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`);

	    if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
	      $images.push($slideEl[0]);
	    }

	    if ($images.length === 0) return;
	    $images.each(imageEl => {
	      const $imageEl = $(imageEl);
	      $imageEl.addClass(params.loadingClass);
	      const background = $imageEl.attr('data-background');
	      const src = $imageEl.attr('data-src');
	      const srcset = $imageEl.attr('data-srcset');
	      const sizes = $imageEl.attr('data-sizes');
	      const $pictureEl = $imageEl.parent('picture');
	      swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {
	        if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) return;

	        if (background) {
	          $imageEl.css('background-image', `url("${background}")`);
	          $imageEl.removeAttr('data-background');
	        } else {
	          if (srcset) {
	            $imageEl.attr('srcset', srcset);
	            $imageEl.removeAttr('data-srcset');
	          }

	          if (sizes) {
	            $imageEl.attr('sizes', sizes);
	            $imageEl.removeAttr('data-sizes');
	          }

	          if ($pictureEl.length) {
	            $pictureEl.children('source').each(sourceEl => {
	              const $source = $(sourceEl);

	              if ($source.attr('data-srcset')) {
	                $source.attr('srcset', $source.attr('data-srcset'));
	                $source.removeAttr('data-srcset');
	              }
	            });
	          }

	          if (src) {
	            $imageEl.attr('src', src);
	            $imageEl.removeAttr('data-src');
	          }
	        }

	        $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
	        $slideEl.find(`.${params.preloaderClass}`).remove();

	        if (swiper.params.loop && loadInDuplicate) {
	          const slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');

	          if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
	            const originalSlide = swiper.$wrapperEl.children(`[data-swiper-slide-index="${slideOriginalIndex}"]:not(.${swiper.params.slideDuplicateClass})`);
	            loadInSlide(originalSlide.index(), false);
	          } else {
	            const duplicatedSlide = swiper.$wrapperEl.children(`.${swiper.params.slideDuplicateClass}[data-swiper-slide-index="${slideOriginalIndex}"]`);
	            loadInSlide(duplicatedSlide.index(), false);
	          }
	        }

	        emit('lazyImageReady', $slideEl[0], $imageEl[0]);

	        if (swiper.params.autoHeight) {
	          swiper.updateAutoHeight();
	        }
	      });
	      emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
	    });
	  }

	  function load() {
	    const {
	      $wrapperEl,
	      params: swiperParams,
	      slides,
	      activeIndex
	    } = swiper;
	    const isVirtual = swiper.virtual && swiperParams.virtual.enabled;
	    const params = swiperParams.lazy;
	    let slidesPerView = swiperParams.slidesPerView;

	    if (slidesPerView === 'auto') {
	      slidesPerView = 0;
	    }

	    function slideExist(index) {
	      if (isVirtual) {
	        if ($wrapperEl.children(`.${swiperParams.slideClass}[data-swiper-slide-index="${index}"]`).length) {
	          return true;
	        }
	      } else if (slides[index]) return true;

	      return false;
	    }

	    function slideIndex(slideEl) {
	      if (isVirtual) {
	        return $(slideEl).attr('data-swiper-slide-index');
	      }

	      return $(slideEl).index();
	    }

	    if (!initialImageLoaded) initialImageLoaded = true;

	    if (swiper.params.watchSlidesProgress) {
	      $wrapperEl.children(`.${swiperParams.slideVisibleClass}`).each(slideEl => {
	        const index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
	        loadInSlide(index);
	      });
	    } else if (slidesPerView > 1) {
	      for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
	        if (slideExist(i)) loadInSlide(i);
	      }
	    } else {
	      loadInSlide(activeIndex);
	    }

	    if (params.loadPrevNext) {
	      if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
	        const amount = params.loadPrevNextAmount;
	        const spv = Math.ceil(slidesPerView);
	        const maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
	        const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

	        for (let i = activeIndex + spv; i < maxIndex; i += 1) {
	          if (slideExist(i)) loadInSlide(i);
	        } // Prev Slides


	        for (let i = minIndex; i < activeIndex; i += 1) {
	          if (slideExist(i)) loadInSlide(i);
	        }
	      } else {
	        const nextSlide = $wrapperEl.children(`.${swiperParams.slideNextClass}`);
	        if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));
	        const prevSlide = $wrapperEl.children(`.${swiperParams.slidePrevClass}`);
	        if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
	      }
	    }
	  }

	  function checkInViewOnLoad() {
	    const window = getWindow();
	    if (!swiper || swiper.destroyed) return;
	    const $scrollElement = swiper.params.lazy.scrollingElement ? $(swiper.params.lazy.scrollingElement) : $(window);
	    const isWindow = $scrollElement[0] === window;
	    const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;
	    const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;
	    const swiperOffset = swiper.$el.offset();
	    const {
	      rtlTranslate: rtl
	    } = swiper;
	    let inView = false;
	    if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
	    const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];

	    for (let i = 0; i < swiperCoord.length; i += 1) {
	      const point = swiperCoord[i];

	      if (point[0] >= 0 && point[0] <= scrollElementWidth && point[1] >= 0 && point[1] <= scrollElementHeight) {
	        if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

	        inView = true;
	      }
	    }

	    const passiveListener = swiper.touchEvents.start === 'touchstart' && swiper.support.passiveListener && swiper.params.passiveListeners ? {
	      passive: true,
	      capture: false
	    } : false;

	    if (inView) {
	      load();
	      $scrollElement.off('scroll', checkInViewOnLoad, passiveListener);
	    } else if (!scrollHandlerAttached) {
	      scrollHandlerAttached = true;
	      $scrollElement.on('scroll', checkInViewOnLoad, passiveListener);
	    }
	  }

	  on('beforeInit', () => {
	    if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
	      swiper.params.preloadImages = false;
	    }
	  });
	  on('init', () => {
	    if (swiper.params.lazy.enabled) {
	      if (swiper.params.lazy.checkInView) {
	        checkInViewOnLoad();
	      } else {
	        load();
	      }
	    }
	  });
	  on('scroll', () => {
	    if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.freeMode.sticky) {
	      load();
	    }
	  });
	  on('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {
	    if (swiper.params.lazy.enabled) {
	      if (swiper.params.lazy.checkInView) {
	        checkInViewOnLoad();
	      } else {
	        load();
	      }
	    }
	  });
	  on('transitionStart', () => {
	    if (swiper.params.lazy.enabled) {
	      if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !initialImageLoaded) {
	        if (swiper.params.lazy.checkInView) {
	          checkInViewOnLoad();
	        } else {
	          load();
	        }
	      }
	    }
	  });
	  on('transitionEnd', () => {
	    if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
	      if (swiper.params.lazy.checkInView) {
	        checkInViewOnLoad();
	      } else {
	        load();
	      }
	    }
	  });
	  on('slideChange', () => {
	    const {
	      lazy,
	      cssMode,
	      watchSlidesProgress,
	      touchReleaseOnEdges,
	      resistanceRatio
	    } = swiper.params;

	    if (lazy.enabled && (cssMode || watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0))) {
	      load();
	    }
	  });
	  on('destroy', () => {
	    if (!swiper.$el) return;
	    swiper.$el.find(`.${swiper.params.lazy.loadingClass}`).removeClass(swiper.params.lazy.loadingClass);
	  });
	  Object.assign(swiper.lazy, {
	    load,
	    loadInSlide
	  });
	}

	/* eslint no-underscore-dangle: "off" */
	function Autoplay({
	  swiper,
	  extendParams,
	  on,
	  emit
	}) {
	  let timeout;
	  swiper.autoplay = {
	    running: false,
	    paused: false
	  };
	  extendParams({
	    autoplay: {
	      enabled: false,
	      delay: 3000,
	      waitForTransition: true,
	      disableOnInteraction: true,
	      stopOnLastSlide: false,
	      reverseDirection: false,
	      pauseOnMouseEnter: false
	    }
	  });

	  function run() {
	    if (!swiper.size) {
	      swiper.autoplay.running = false;
	      swiper.autoplay.paused = false;
	      return;
	    }

	    const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
	    let delay = swiper.params.autoplay.delay;

	    if ($activeSlideEl.attr('data-swiper-autoplay')) {
	      delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
	    }

	    clearTimeout(timeout);
	    timeout = nextTick(() => {
	      let autoplayResult;

	      if (swiper.params.autoplay.reverseDirection) {
	        if (swiper.params.loop) {
	          swiper.loopFix();
	          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
	          emit('autoplay');
	        } else if (!swiper.isBeginning) {
	          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
	          emit('autoplay');
	        } else if (!swiper.params.autoplay.stopOnLastSlide) {
	          autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
	          emit('autoplay');
	        } else {
	          stop();
	        }
	      } else if (swiper.params.loop) {
	        swiper.loopFix();
	        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
	        emit('autoplay');
	      } else if (!swiper.isEnd) {
	        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
	        emit('autoplay');
	      } else if (!swiper.params.autoplay.stopOnLastSlide) {
	        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
	        emit('autoplay');
	      } else {
	        stop();
	      }

	      if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
	        run();
	      }
	    }, delay);
	  }

	  function start() {
	    if (typeof timeout !== 'undefined') return false;
	    if (swiper.autoplay.running) return false;
	    swiper.autoplay.running = true;
	    emit('autoplayStart');
	    run();
	    return true;
	  }

	  function stop() {
	    if (!swiper.autoplay.running) return false;
	    if (typeof timeout === 'undefined') return false;

	    if (timeout) {
	      clearTimeout(timeout);
	      timeout = undefined;
	    }

	    swiper.autoplay.running = false;
	    emit('autoplayStop');
	    return true;
	  }

	  function pause(speed) {
	    if (!swiper.autoplay.running) return;
	    if (swiper.autoplay.paused) return;
	    if (timeout) clearTimeout(timeout);
	    swiper.autoplay.paused = true;

	    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
	      swiper.autoplay.paused = false;
	      run();
	    } else {
	      ['transitionend', 'webkitTransitionEnd'].forEach(event => {
	        swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
	      });
	    }
	  }

	  function onVisibilityChange() {
	    const document = getDocument();

	    if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
	      pause();
	    }

	    if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
	      run();
	      swiper.autoplay.paused = false;
	    }
	  }

	  function onTransitionEnd(e) {
	    if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
	    if (e.target !== swiper.$wrapperEl[0]) return;
	    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
	      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
	    });
	    swiper.autoplay.paused = false;

	    if (!swiper.autoplay.running) {
	      stop();
	    } else {
	      run();
	    }
	  }

	  function onMouseEnter() {
	    if (swiper.params.autoplay.disableOnInteraction) {
	      stop();
	    } else {
	      emit('autoplayPause');
	      pause();
	    }

	    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
	      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
	    });
	  }

	  function onMouseLeave() {
	    if (swiper.params.autoplay.disableOnInteraction) {
	      return;
	    }

	    swiper.autoplay.paused = false;
	    emit('autoplayResume');
	    run();
	  }

	  function attachMouseEvents() {
	    if (swiper.params.autoplay.pauseOnMouseEnter) {
	      swiper.$el.on('mouseenter', onMouseEnter);
	      swiper.$el.on('mouseleave', onMouseLeave);
	    }
	  }

	  function detachMouseEvents() {
	    swiper.$el.off('mouseenter', onMouseEnter);
	    swiper.$el.off('mouseleave', onMouseLeave);
	  }

	  on('init', () => {
	    if (swiper.params.autoplay.enabled) {
	      start();
	      const document = getDocument();
	      document.addEventListener('visibilitychange', onVisibilityChange);
	      attachMouseEvents();
	    }
	  });
	  on('beforeTransitionStart', (_s, speed, internal) => {
	    if (swiper.autoplay.running) {
	      if (internal || !swiper.params.autoplay.disableOnInteraction) {
	        swiper.autoplay.pause(speed);
	      } else {
	        stop();
	      }
	    }
	  });
	  on('sliderFirstMove', () => {
	    if (swiper.autoplay.running) {
	      if (swiper.params.autoplay.disableOnInteraction) {
	        stop();
	      } else {
	        pause();
	      }
	    }
	  });
	  on('touchEnd', () => {
	    if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
	      run();
	    }
	  });
	  on('destroy', () => {
	    detachMouseEvents();

	    if (swiper.autoplay.running) {
	      stop();
	    }

	    const document = getDocument();
	    document.removeEventListener('visibilitychange', onVisibilityChange);
	  });
	  Object.assign(swiper.autoplay, {
	    pause,
	    run,
	    start,
	    stop
	  });
	}

	function effectInit(params) {
	  const {
	    effect,
	    swiper,
	    on,
	    setTranslate,
	    setTransition,
	    overwriteParams,
	    perspective,
	    recreateShadows,
	    getEffectParams
	  } = params;
	  on('beforeInit', () => {
	    if (swiper.params.effect !== effect) return;
	    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);

	    if (perspective && perspective()) {
	      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
	    }

	    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
	    Object.assign(swiper.params, overwriteParamsResult);
	    Object.assign(swiper.originalParams, overwriteParamsResult);
	  });
	  on('setTranslate', () => {
	    if (swiper.params.effect !== effect) return;
	    setTranslate();
	  });
	  on('setTransition', (_s, duration) => {
	    if (swiper.params.effect !== effect) return;
	    setTransition(duration);
	  });
	  on('transitionEnd', () => {
	    if (swiper.params.effect !== effect) return;

	    if (recreateShadows) {
	      if (!getEffectParams || !getEffectParams().slideShadows) return; // remove shadows

	      swiper.slides.each(slideEl => {
	        const $slideEl = swiper.$(slideEl);
	        $slideEl.find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').remove();
	      }); // create new one

	      recreateShadows();
	    }
	  });
	  let requireUpdateOnVirtual;
	  on('virtualUpdate', () => {
	    if (swiper.params.effect !== effect) return;

	    if (!swiper.slides.length) {
	      requireUpdateOnVirtual = true;
	    }

	    requestAnimationFrame(() => {
	      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
	        setTranslate();
	        requireUpdateOnVirtual = false;
	      }
	    });
	  });
	}

	function effectTarget(effectParams, $slideEl) {
	  if (effectParams.transformEl) {
	    return $slideEl.find(effectParams.transformEl).css({
	      'backface-visibility': 'hidden',
	      '-webkit-backface-visibility': 'hidden'
	    });
	  }

	  return $slideEl;
	}

	function effectVirtualTransitionEnd({
	  swiper,
	  duration,
	  transformEl,
	  allSlides
	}) {
	  const {
	    slides,
	    activeIndex,
	    $wrapperEl
	  } = swiper;

	  if (swiper.params.virtualTranslate && duration !== 0) {
	    let eventTriggered = false;
	    let $transitionEndTarget;

	    if (allSlides) {
	      $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
	    } else {
	      $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
	    }

	    $transitionEndTarget.transitionEnd(() => {
	      if (eventTriggered) return;
	      if (!swiper || swiper.destroyed) return;
	      eventTriggered = true;
	      swiper.animating = false;
	      const triggerEvents = ['webkitTransitionEnd', 'transitionend'];

	      for (let i = 0; i < triggerEvents.length; i += 1) {
	        $wrapperEl.trigger(triggerEvents[i]);
	      }
	    });
	  }
	}

	function EffectFade({
	  swiper,
	  extendParams,
	  on
	}) {
	  extendParams({
	    fadeEffect: {
	      crossFade: false,
	      transformEl: null
	    }
	  });

	  const setTranslate = () => {
	    const {
	      slides
	    } = swiper;
	    const params = swiper.params.fadeEffect;

	    for (let i = 0; i < slides.length; i += 1) {
	      const $slideEl = swiper.slides.eq(i);
	      const offset = $slideEl[0].swiperSlideOffset;
	      let tx = -offset;
	      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
	      let ty = 0;

	      if (!swiper.isHorizontal()) {
	        ty = tx;
	        tx = 0;
	      }

	      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
	      const $targetEl = effectTarget(params, $slideEl);
	      $targetEl.css({
	        opacity: slideOpacity
	      }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);
	    }
	  };

	  const setTransition = duration => {
	    const {
	      transformEl
	    } = swiper.params.fadeEffect;
	    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
	    $transitionElements.transition(duration);
	    effectVirtualTransitionEnd({
	      swiper,
	      duration,
	      transformEl,
	      allSlides: true
	    });
	  };

	  effectInit({
	    effect: 'fade',
	    swiper,
	    on,
	    setTranslate,
	    setTransition,
	    overwriteParams: () => ({
	      slidesPerView: 1,
	      slidesPerGroup: 1,
	      watchSlidesProgress: true,
	      spaceBetween: 0,
	      virtualTranslate: !swiper.params.cssMode
	    })
	  });
	}

	//import Swiper bundle with all modules installed

	new Swiper('.qts_swiper', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay],

	  speed: 800,
	  autoplay: {
	    delay: 8500
	  },
	  // If we need pagination
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },
	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.ppl_sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },

	  speed: 800,
	  autoplay: {
	    delay: 8000
	  },

	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.hro__sldr', {
	  // Optional parameters
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Autoplay, Lazy, EffectFade],

	  effect: 'fade',
	  fadeEffect: {
	    crossFade: true
	  },

	  lazy: {
	      loadPrevNext: true
	     },

	  speed: 800,
	  autoplay: {
	    delay: 8000
	  },

	  observer: true,
	  observeParents: true

	});
	new Swiper('.mintandthings_01__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	 lazy: {
	    loadPrevNext: true
	   },

	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});
	new Swiper('.mintandthings_02__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },

	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});
	new Swiper('.mintandthings_03__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },

	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});
	new Swiper('.mintandthings_04__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },

	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.emporium_01__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },

	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.emporium_02__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },

	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.shyndirty_01__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 8000
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.shyndirty_02__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 8200
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.shyndirty_03__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 7800
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});


	new Swiper('.snd_01__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 1900
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.snd_02__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 2500
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.snd_03__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 2000
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.snd_04__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 2500
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.snd_05__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 2000
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});


	//Gumbrecht sliders
	new Swiper('.gumbrecht_01__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 2500
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.gumbrecht_02__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 2000
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.gumbrecht_03__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 2500
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.gumbrecht_04__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 2000
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	new Swiper('.gumbrecht_05__sldr', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,
	  preloadImages: false,
	  lazy: true,
	  slidesPerView: 1,
	  watchSlidesProgress: true,

	  modules: [Pagination, Autoplay, Lazy],

	  lazy: {
	    loadPrevNext: true
	   },
	   speed: 800,
	   autoplay: {
	     delay: 2500
	   },
	  pagination: {
	    el: '.swiper-bullets',
	    type: 'bullets',
	    clickable: true
	  },

	  renderBullet: function (index, className) {
	    return '<span class="' + className + '">' + (index + 1) + '</span>';
	  }

	});

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var mixitup$1 = {exports: {}};

	/**!
	 * MixItUp v3.3.1
	 * A high-performance, dependency-free library for animated filtering, sorting and more
	 * Build 94e0fbf6-cd0b-4987-b3c0-14b59b67b8a0
	 *
	 * @copyright Copyright 2014-2018 KunkaLabs Limited.
	 * @author    KunkaLabs Limited.
	 * @link      https://www.kunkalabs.com/mixitup/
	 *
	 * @license   Commercial use requires a commercial license.
	 *            https://www.kunkalabs.com/mixitup/licenses/
	 *
	 *            Non-commercial use permitted under same terms as CC BY-NC 3.0 license.
	 *            http://creativecommons.org/licenses/by-nc/3.0/
	 */

	(function (module, exports) {
		(function(window) {

		    var mixitup = null,
		        h       = null;

		    (function() {
		        var VENDORS = ['webkit', 'moz', 'o', 'ms'],
		            canary  = window.document.createElement('div'),
		            i       = -1;

		        // window.requestAnimationFrame

		        for (i = 0; i < VENDORS.length && !window.requestAnimationFrame; i++) {
		            window.requestAnimationFrame = window[VENDORS[i] + 'RequestAnimationFrame'];
		        }

		        // Element.nextElementSibling

		        if (typeof canary.nextElementSibling === 'undefined') {
		            Object.defineProperty(window.Element.prototype, 'nextElementSibling', {
		                get: function() {
		                    var el = this.nextSibling;

		                    while (el) {
		                        if (el.nodeType === 1) {
		                            return el;
		                        }

		                        el = el.nextSibling;
		                    }

		                    return null;
		                }
		            });
		        }

		        // Element.matches

		        (function(ElementPrototype) {
		            ElementPrototype.matches =
		                ElementPrototype.matches ||
		                ElementPrototype.machesSelector ||
		                ElementPrototype.mozMatchesSelector ||
		                ElementPrototype.msMatchesSelector ||
		                ElementPrototype.oMatchesSelector ||
		                ElementPrototype.webkitMatchesSelector ||
		                function (selector) {
		                    return Array.prototype.indexOf.call(this.parentElement.querySelectorAll(selector), this) > -1;
		                };
		        })(window.Element.prototype);

		        // Object.keys
		        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

		        if (!Object.keys) {
		            Object.keys = (function() {
		                var hasOwnProperty      = Object.prototype.hasOwnProperty,
		                    hasDontEnumBug      = false,
		                    dontEnums           = [],
		                    dontEnumsLength     = -1;

		                hasDontEnumBug = !({
		                    toString: null
		                })
		                    .propertyIsEnumerable('toString');

		                dontEnums = [
		                    'toString',
		                    'toLocaleString',
		                    'valueOf',
		                    'hasOwnProperty',
		                    'isPrototypeOf',
		                    'propertyIsEnumerable',
		                    'constructor'
		                ];

		                dontEnumsLength = dontEnums.length;

		                return function(obj) {
		                    var result  = [],
		                        prop    = '',
		                        i       = -1;

		                    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
		                        throw new TypeError('Object.keys called on non-object');
		                    }

		                    for (prop in obj) {
		                        if (hasOwnProperty.call(obj, prop)) {
		                            result.push(prop);
		                        }
		                    }

		                    if (hasDontEnumBug) {
		                        for (i = 0; i < dontEnumsLength; i++) {
		                            if (hasOwnProperty.call(obj, dontEnums[i])) {
		                                result.push(dontEnums[i]);
		                            }
		                        }
		                    }

		                    return result;
		                };
		            }());
		        }

		        // Array.isArray
		        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

		        if (!Array.isArray) {
		            Array.isArray = function(arg) {
		                return Object.prototype.toString.call(arg) === '[object Array]';
		            };
		        }

		        // Object.create
		        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create

		        if (typeof Object.create !== 'function') {
		            Object.create = (function(undefined$1) {
		                var Temp = function() {};

		                return function (prototype, propertiesObject) {
		                    if (prototype !== Object(prototype) && prototype !== null) {
		                        throw TypeError('Argument must be an object, or null');
		                    }

		                    Temp.prototype = prototype || {};

		                    var result = new Temp();

		                    Temp.prototype = null;

		                    if (propertiesObject !== undefined$1) {
		                        Object.defineProperties(result, propertiesObject);
		                    }

		                    if (prototype === null) {
		                        /* jshint ignore:start */
		                        result.__proto__ = null;
		                        /* jshint ignore:end */
		                    }

		                    return result;
		                };
		            })();
		        }

		        // String.prototyoe.trim

		        if (!String.prototype.trim) {
		            String.prototype.trim = function() {
		                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		            };
		        }

		        // Array.prototype.indexOf
		        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

		        if (!Array.prototype.indexOf) {
		            Array.prototype.indexOf = function(searchElement) {
		                var n, k, t, len;

		                if (this === null) {
		                    throw new TypeError();
		                }

		                t = Object(this);

		                len = t.length >>> 0;

		                if (len === 0) {
		                    return -1;
		                }

		                n = 0;

		                if (arguments.length > 1) {
		                    n = Number(arguments[1]);

		                    if (n !== n) {
		                        n = 0;
		                    } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
		                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
		                    }
		                }

		                if (n >= len) {
		                    return -1;
		                }

		                for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
		                    if (k in t && t[k] === searchElement) {
		                        return k;
		                    }
		                }

		                return -1;
		            };
		        }

		        // Function.prototype.bind
		        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

		        if (!Function.prototype.bind) {
		            Function.prototype.bind = function(oThis) {
		                var aArgs, self, FNOP, fBound;

		                if (typeof this !== 'function') {
		                    throw new TypeError();
		                }

		                aArgs = Array.prototype.slice.call(arguments, 1);

		                self = this;

		                FNOP = function() {};

		                fBound = function() {
		                    return self.apply(this instanceof FNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
		                };

		                if (this.prototype) {
		                    FNOP.prototype = this.prototype;
		                }

		                fBound.prototype = new FNOP();

		                return fBound;
		            };
		        }

		        // Element.prototype.dispatchEvent

		        if (!window.Element.prototype.dispatchEvent) {
		            window.Element.prototype.dispatchEvent = function(event) {
		                try {
		                    return this.fireEvent('on' + event.type, event);
		                } catch (err) {}
		            };
		        }
		    })();

		    /**
		     * The `mixitup()` "factory" function creates and returns individual instances
		     * of MixItUp, known as "mixers", on which API methods can be called.
		     *
		     * When loading MixItUp via a script tag, the factory function is accessed
		     * via the global variable `mixitup`. When using a module loading
		     * system (e.g. ES2015, CommonJS, RequireJS), the factory function is
		     * exported into your module when you require the MixItUp library.
		     *
		     * @example
		     * mixitup(container [,config] [,foreignDoc])
		     *
		     * @example <caption>Example 1: Creating a mixer instance with an element reference</caption>
		     * var containerEl = document.querySelector('.container');
		     *
		     * var mixer = mixitup(containerEl);
		     *
		     * @example <caption>Example 2: Creating a mixer instance with a selector string</caption>
		     * var mixer = mixitup('.container');
		     *
		     * @example <caption>Example 3: Passing a configuration object</caption>
		     * var mixer = mixitup(containerEl, {
		     *     animation: {
		     *         effects: 'fade scale(0.5)'
		     *     }
		     * });
		     *
		     * @example <caption>Example 4: Passing an iframe reference</caption>
		     * var mixer = mixitup(containerEl, config, foreignDocument);
		     *
		     * @global
		     * @namespace
		     * @public
		     * @kind        function
		     * @since       3.0.0
		     * @param       {(Element|string)}  container
		     *      A DOM element or selector string representing the container(s) on which to instantiate MixItUp.
		     * @param       {object}            [config]
		     *      An optional "configuration object" used to customize the behavior of the MixItUp instance.
		     * @param       {object}            [foreignDoc]
		     *      An optional reference to a `document`, which can be used to control a MixItUp instance in an iframe.
		     * @return      {mixitup.Mixer}
		     *      A "mixer" object holding the MixItUp instance.
		     */

		    mixitup = function(container, config, foreignDoc) {
		        var el                  = null,
		            returnCollection    = false,
		            instance            = null,
		            facade              = null,
		            doc                 = null,
		            output              = null,
		            instances           = [],
		            id                  = '',
		            elements            = [],
		            i                   = -1;

		        doc = foreignDoc || window.document;

		        if (returnCollection = arguments[3]) {
		            // A non-documented 4th paramater enabling control of multiple instances

		            returnCollection = typeof returnCollection === 'boolean';
		        }

		        if (typeof container === 'string') {
		            elements = doc.querySelectorAll(container);
		        } else if (container && typeof container === 'object' && h.isElement(container, doc)) {
		            elements = [container];
		        } else if (container && typeof container === 'object' && container.length) {
		            // Although not documented, the container may also be an array-like list of
		            // elements such as a NodeList or jQuery collection, is returnCollection is true

		            elements = container;
		        } else {
		            throw new Error(mixitup.messages.errorFactoryInvalidContainer());
		        }

		        if (elements.length < 1) {
		            throw new Error(mixitup.messages.errorFactoryContainerNotFound());
		        }

		        for (i = 0; el = elements[i]; i++) {
		            if (i > 0 && !returnCollection) break;

		            if (!el.id) {
		                id = 'MixItUp' + h.randomHex();

		                el.id = id;
		            } else {
		                id = el.id;
		            }

		            if (mixitup.instances[id] instanceof mixitup.Mixer) {
		                instance = mixitup.instances[id];

		                if (!config || (config && config.debug && config.debug.showWarnings !== false)) {
		                    console.warn(mixitup.messages.warningFactoryPreexistingInstance());
		                }
		            } else {
		                instance = new mixitup.Mixer();

		                instance.attach(el, doc, id, config);

		                mixitup.instances[id] = instance;
		            }

		            facade = new mixitup.Facade(instance);

		            if (config && config.debug && config.debug.enable) {
		                instances.push(instance);
		            } else {
		                instances.push(facade);
		            }
		        }

		        if (returnCollection) {
		            output = new mixitup.Collection(instances);
		        } else {
		            // Return the first instance regardless

		            output = instances[0];
		        }

		        return output;
		    };

		    /**
		     * The `.use()` static method is used to extend the functionality of mixitup with compatible
		     * extensions and libraries in an environment with modular scoping e.g. ES2015, CommonJS, or RequireJS.
		     *
		     * You need only call the `.use()` function once per project, per extension, as module loaders
		     * will cache a single reference to MixItUp inclusive of all changes made.
		     *
		     * @example
		     * mixitup.use(extension)
		     *
		     * @example <caption>Example 1: Extending MixItUp with the Pagination Extension</caption>
		     *
		     * import mixitup from 'mixitup';
		     * import mixitupPagination from 'mixitup-pagination';
		     *
		     * mixitup.use(mixitupPagination);
		     *
		     * // All mixers created by the factory function in all modules will now
		     * // have pagination functionality
		     *
		     * var mixer = mixitup('.container');
		     *
		     * @public
		     * @name     use
		     * @memberof mixitup
		     * @kind     function
		     * @static
		     * @since    3.0.0
		     * @param    {*}  extension   A reference to the extension or library to be used.
		     * @return   {void}
		     */

		    mixitup.use = function(extension) {
		        mixitup.Base.prototype.callActions.call(mixitup, 'beforeUse', arguments);

		        // Call the extension's factory function, passing
		        // the mixitup factory as a paramater

		        if (typeof extension === 'function' && extension.TYPE === 'mixitup-extension') {
		            // Mixitup extension

		            if (typeof mixitup.extensions[extension.NAME] === 'undefined') {
		                extension(mixitup);

		                mixitup.extensions[extension.NAME] = extension;
		            }
		        } else if (extension.fn && extension.fn.jquery) {
		            // jQuery

		            mixitup.libraries.$ = extension;
		        }

		        mixitup.Base.prototype.callActions.call(mixitup, 'afterUse', arguments);
		    };

		    mixitup.instances   = {};
		    mixitup.extensions  = {};
		    mixitup.libraries   = {};

		    /**
		     * @private
		     */

		    h = {

		        /**
		         * @private
		         * @param   {HTMLElement}   el
		         * @param   {string}        cls
		         * @return  {boolean}
		         */

		        hasClass: function(el, cls) {
		            return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}   el
		         * @param   {string}        cls
		         * @return  {void}
		         */

		        addClass: function(el, cls) {
		            if (!this.hasClass(el, cls)) el.className += el.className ? ' ' + cls : cls;
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}   el
		         * @param   {string}        cls
		         * @return  {void}
		         */

		        removeClass: function(el, cls) {
		            if (this.hasClass(el, cls)) {
		                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');

		                el.className = el.className.replace(reg, ' ').trim();
		            }
		        },

		        /**
		         * Merges the properties of the source object onto the
		         * target object. Alters the target object.
		         *
		         * @private
		         * @param   {object}    destination
		         * @param   {object}    source
		         * @param   {boolean}   [deep=false]
		         * @param   {boolean}   [handleErrors=false]
		         * @return  {void}
		         */

		        extend: function(destination, source, deep, handleErrors) {
		            var sourceKeys  = [],
		                key         = '',
		                i           = -1;

		            deep = deep || false;
		            handleErrors = handleErrors || false;

		            try {
		                if (Array.isArray(source)) {
		                    for (i = 0; i < source.length; i++) {
		                        sourceKeys.push(i);
		                    }
		                } else if (source) {
		                    sourceKeys = Object.keys(source);
		                }

		                for (i = 0; i < sourceKeys.length; i++) {
		                    key = sourceKeys[i];

		                    if (!deep || typeof source[key] !== 'object' || this.isElement(source[key])) {
		                        // All non-object properties, or all properties if shallow extend

		                        destination[key] = source[key];
		                    } else if (Array.isArray(source[key])) {
		                        // Arrays

		                        if (!destination[key]) {
		                            destination[key] = [];
		                        }

		                        this.extend(destination[key], source[key], deep, handleErrors);
		                    } else {
		                        // Objects

		                        if (!destination[key]) {
		                            destination[key] = {};
		                        }

		                        this.extend(destination[key], source[key], deep, handleErrors);
		                    }
		                }
		            } catch(err) {
		                if (handleErrors) {
		                    this.handleExtendError(err, destination);
		                } else {
		                    throw err;
		                }
		            }

		            return destination;
		        },

		        /**
		         * @private
		         * @param   {Error}  err
		         * @param   {object} destination
		         * @return  {void}
		         */

		        handleExtendError: function(err, destination) {
		            var re                  = /property "?(\w*)"?[,:] object/i,
		                matches             = null,
		                erroneous           = '',
		                message             = '',
		                suggestion          = '',
		                probableMatch       = '',
		                key                 = '',
		                mostMatchingChars   = -1,
		                i                   = -1;

		            if (err instanceof TypeError && (matches = re.exec(err.message))) {
		                erroneous = matches[1];

		                for (key in destination) {
		                    i = 0;

		                    while (i < erroneous.length && erroneous.charAt(i) === key.charAt(i)) {
		                        i++;
		                    }

		                    if (i > mostMatchingChars) {
		                        mostMatchingChars = i;
		                        probableMatch = key;
		                    }
		                }

		                if (mostMatchingChars > 1) {
		                    suggestion = mixitup.messages.errorConfigInvalidPropertySuggestion({
		                        probableMatch: probableMatch
		                    });
		                }

		                message = mixitup.messages.errorConfigInvalidProperty({
		                    erroneous: erroneous,
		                    suggestion: suggestion
		                });

		                throw new TypeError(message);
		            }

		            throw err;
		        },

		        /**
		         * @private
		         * @param   {string} str
		         * @return  {function}
		         */

		        template: function(str) {
		            var re          = /\${([\w]*)}/g,
		                dynamics    = {},
		                matches     = null;

		            while ((matches = re.exec(str))) {
		                dynamics[matches[1]] = new RegExp('\\${' + matches[1] + '}', 'g');
		            }

		            return function(data) {
		                var key     = '',
		                    output  = str;

		                data = data || {};

		                for (key in dynamics) {
		                    output = output.replace(dynamics[key], typeof data[key] !== 'undefined' ? data[key] : '');
		                }

		                return output;
		            };
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}   el
		         * @param   {string}        type
		         * @param   {function}      fn
		         * @param   {boolean}       useCapture
		         * @return  {void}
		         */

		        on: function(el, type, fn, useCapture) {
		            if (!el) return;

		            if (el.addEventListener) {
		                el.addEventListener(type, fn, useCapture);
		            } else if (el.attachEvent) {
		                el['e' + type + fn] = fn;

		                el[type + fn] = function() {
		                    el['e' + type + fn](window.event);
		                };

		                el.attachEvent('on' + type, el[type + fn]);
		            }
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}   el
		         * @param   {string}        type
		         * @param   {function}      fn
		         * @return  {void}
		         */

		        off: function(el, type, fn) {
		            if (!el) return;

		            if (el.removeEventListener) {
		                el.removeEventListener(type, fn, false);
		            } else if (el.detachEvent) {
		                el.detachEvent('on' + type, el[type + fn]);
		                el[type + fn] = null;
		            }
		        },

		        /**
		         * @private
		         * @param   {string}      eventType
		         * @param   {object}      detail
		         * @param   {Document}    [doc]
		         * @return  {CustomEvent}
		         */

		        getCustomEvent: function(eventType, detail, doc) {
		            var event = null;

		            doc = doc || window.document;

		            if (typeof window.CustomEvent === 'function') {
		                event = new window.CustomEvent(eventType, {
		                    detail: detail,
		                    bubbles: true,
		                    cancelable: true
		                });
		            } else if (typeof doc.createEvent === 'function') {
		                event = doc.createEvent('CustomEvent');
		                event.initCustomEvent(eventType, true, true, detail);
		            } else {
		                event = doc.createEventObject(),
		                event.type = eventType;

		                event.returnValue = false;
		                event.cancelBubble = false;
		                event.detail = detail;
		            }

		            return event;
		        },

		        /**
		         * @private
		         * @param   {Event} e
		         * @return  {Event}
		         */

		        getOriginalEvent: function(e) {
		            if (e.touches && e.touches.length) {
		                return e.touches[0];
		            } else if (e.changedTouches && e.changedTouches.length) {
		                return e.changedTouches[0];
		            } else {
		                return e;
		            }
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}   el
		         * @param   {string}        selector
		         * @return  {Number}
		         */

		        index: function(el, selector) {
		            var i = 0;

		            while ((el = el.previousElementSibling) !== null) {
		                if (!selector || el.matches(selector)) {
		                    ++i;
		                }
		            }

		            return i;
		        },

		        /**
		         * Converts a dash or snake-case string to camel case.
		         *
		         * @private
		         * @param   {string}    str
		         * @param   {boolean}   [isPascal]
		         * @return  {string}
		         */

		        camelCase: function(str) {
		            return str.toLowerCase().replace(/([_-][a-z])/g, function($1) {
		                return $1.toUpperCase().replace(/[_-]/, '');
		            });
		        },

		        /**
		         * Converts a dash or snake-case string to pascal case.
		         *
		         * @private
		         * @param   {string}    str
		         * @param   {boolean}   [isPascal]
		         * @return  {string}
		         */

		        pascalCase: function(str) {
		            return (str = this.camelCase(str)).charAt(0).toUpperCase() + str.slice(1);
		        },

		        /**
		         * Converts a camel or pascal-case string to dash case.
		         *
		         * @private
		         * @param   {string}    str
		         * @return  {string}
		         */

		        dashCase: function(str) {
		            return str.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}       el
		         * @param   {HTMLHtmlElement}   [doc]
		         * @return  {boolean}
		         */

		        isElement: function(el, doc) {
		            doc = doc || window.document;

		            if (
		                window.HTMLElement &&
		                el instanceof window.HTMLElement
		            ) {
		                return true;
		            } else if (
		                doc.defaultView &&
		                doc.defaultView.HTMLElement &&
		                el instanceof doc.defaultView.HTMLElement
		            ) {
		                return true;
		            } else {
		                return (
		                    el !== null &&
		                    el.nodeType === 1 &&
		                    typeof el.nodeName === 'string'
		                );
		            }
		        },

		        /**
		         * @private
		         * @param   {string}            htmlString
		         * @param   {HTMLHtmlElement}   [doc]
		         * @return  {DocumentFragment}
		         */

		        createElement: function(htmlString, doc) {
		            var frag = null,
		                temp = null;

		            doc = doc || window.document;

		            frag = doc.createDocumentFragment();
		            temp = doc.createElement('div');

		            temp.innerHTML = htmlString.trim();

		            while (temp.firstChild) {
		                frag.appendChild(temp.firstChild);
		            }

		            return frag;
		        },

		        /**
		         * @private
		         * @param   {Node} node
		         * @return  {void}
		         */

		        removeWhitespace: function(node) {
		            var deleting;

		            while (node && node.nodeName === '#text') {
		                deleting = node;

		                node = node.previousSibling;

		                deleting.parentElement && deleting.parentElement.removeChild(deleting);
		            }
		        },

		        /**
		         * @private
		         * @param   {Array<*>}  a
		         * @param   {Array<*>}  b
		         * @return  {boolean}
		         */

		        isEqualArray: function(a, b) {
		            var i = a.length;

		            if (i !== b.length) return false;

		            while (i--) {
		                if (a[i] !== b[i]) return false;
		            }

		            return true;
		        },

		        /**
		         * @private
		         * @param   {object}  a
		         * @param   {object}  b
		         * @return  {boolean}
		         */

		        deepEquals: function(a, b) {
		            var key;

		            if (typeof a === 'object' && a && typeof b === 'object' && b) {
		                if (Object.keys(a).length !== Object.keys(b).length) return false;

		                for (key in a) {
		                    if (!b.hasOwnProperty(key) || !this.deepEquals(a[key], b[key])) return false;
		                }
		            } else if (a !== b) {
		                return false;
		            }

		            return true;
		        },

		        /**
		         * @private
		         * @param   {Array<*>}  oldArray
		         * @return  {Array<*>}
		         */

		        arrayShuffle: function(oldArray) {
		            var newArray    = oldArray.slice(),
		                len         = newArray.length,
		                i           = len,
		                p           = -1,
		                t           = [];

		            while (i--) {
		                p = ~~(Math.random() * len);
		                t = newArray[i];

		                newArray[i] = newArray[p];
		                newArray[p] = t;
		            }

		            return newArray;
		        },

		        /**
		         * @private
		         * @param   {object}    list
		         */

		        arrayFromList: function(list) {
		            var output, i;

		            try {
		                return Array.prototype.slice.call(list);
		            } catch(err) {
		                output = [];

		                for (i = 0; i < list.length; i++) {
		                    output.push(list[i]);
		                }

		                return output;
		            }
		        },

		        /**
		         * @private
		         * @param   {function}  func
		         * @param   {Number}    wait
		         * @param   {boolean}   immediate
		         * @return  {function}
		         */

		        debounce: function(func, wait, immediate) {
		            var timeout;

		            return function() {
		                var self     = this,
		                    args     = arguments,
		                    callNow  = immediate && !timeout,
		                    later    = null;

		                later = function() {
		                    timeout  = null;

		                    if (!immediate) {
		                        func.apply(self, args);
		                    }
		                };

		                clearTimeout(timeout);

		                timeout = setTimeout(later, wait);

		                if (callNow) func.apply(self, args);
		            };
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}   element
		         * @return  {object}
		         */

		        position: function(element) {
		            var xPosition       = 0,
		                yPosition       = 0,
		                offsetParent    = element;

		            while (element) {
		                xPosition -= element.scrollLeft;
		                yPosition -= element.scrollTop;

		                if (element === offsetParent) {
		                    xPosition += element.offsetLeft;
		                    yPosition += element.offsetTop;

		                    offsetParent = element.offsetParent;
		                }

		                element = element.parentElement;
		            }

		            return {
		                x: xPosition,
		                y: yPosition
		            };
		        },

		        /**
		         * @private
		         * @param   {object}    node1
		         * @param   {object}    node2
		         * @return  {Number}
		         */

		        getHypotenuse: function(node1, node2) {
		            var distanceX = node1.x - node2.x,
		                distanceY = node1.y - node2.y;

		            distanceX = distanceX < 0 ? distanceX * -1 : distanceX,
		            distanceY = distanceY < 0 ? distanceY * -1 : distanceY;

		            return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
		        },

		        /**
		         * Calcuates the area of intersection between two rectangles and expresses it as
		         * a ratio in comparison to the area of the first rectangle.
		         *
		         * @private
		         * @param   {Rect}  box1
		         * @param   {Rect}  box2
		         * @return  {number}
		         */

		        getIntersectionRatio: function(box1, box2) {
		            var controlArea         = box1.width * box1.height,
		                intersectionX       = -1,
		                intersectionY       = -1,
		                intersectionArea    = -1,
		                ratio               = -1;

		            intersectionX =
		                Math.max(0, Math.min(box1.left + box1.width, box2.left + box2.width) - Math.max(box1.left, box2.left));

		            intersectionY =
		                Math.max(0, Math.min(box1.top + box1.height, box2.top + box2.height) - Math.max(box1.top, box2.top));

		            intersectionArea = intersectionY * intersectionX;

		            ratio = intersectionArea / controlArea;

		            return ratio;
		        },

		        /**
		         * @private
		         * @param   {object}            el
		         * @param   {string}            selector
		         * @param   {boolean}           [includeSelf]
		         * @param   {HTMLHtmlElement}   [doc]
		         * @return  {Element|null}
		         */

		        closestParent: function(el, selector, includeSelf, doc) {
		            var parent  = el.parentNode;

		            doc = doc || window.document;

		            if (includeSelf && el.matches(selector)) {
		                return el;
		            }

		            while (parent && parent != doc.body) {
		                if (parent.matches && parent.matches(selector)) {
		                    return parent;
		                } else if (parent.parentNode) {
		                    parent = parent.parentNode;
		                } else {
		                    return null;
		                }
		            }

		            return null;
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}       el
		         * @param   {string}            selector
		         * @param   {HTMLHtmlElement}   [doc]
		         * @return  {NodeList}
		         */

		        children: function(el, selector, doc) {
		            var children    = [],
		                tempId      = '';

		            doc = doc || window.doc;

		            if (el) {
		                if (!el.id) {
		                    tempId = 'Temp' + this.randomHexKey();

		                    el.id = tempId;
		                }

		                children = doc.querySelectorAll('#' + el.id + ' > ' + selector);

		                if (tempId) {
		                    el.removeAttribute('id');
		                }
		            }

		            return children;
		        },

		        /**
		         * Creates a clone of a provided array, with any empty strings removed.
		         *
		         * @private
		         * @param   {Array<*>} originalArray
		         * @return  {Array<*>}
		         */

		        clean: function(originalArray) {
		            var cleanArray = [],
		                i = -1;

		            for (i = 0; i < originalArray.length; i++) {
		                if (originalArray[i] !== '') {
		                    cleanArray.push(originalArray[i]);
		                }
		            }

		            return cleanArray;
		        },

		        /**
		         * Abstracts an ES6 promise into a q-like deferred interface for storage and deferred resolution.
		         *
		         * @private
		         * @param  {object} libraries
		         * @return {h.Deferred}
		         */

		        defer: function(libraries) {
		            var deferred       = null,
		                promiseWrapper = null,
		                $              = null;

		            promiseWrapper = new this.Deferred();

		            if (mixitup.features.has.promises) {
		                // ES6 native promise or polyfill

		                promiseWrapper.promise = new Promise(function(resolve, reject) {
		                    promiseWrapper.resolve = resolve;
		                    promiseWrapper.reject  = reject;
		                });
		            } else if (($ = (window.jQuery || libraries.$)) && typeof $.Deferred === 'function') {
		                // jQuery

		                deferred = $.Deferred();

		                promiseWrapper.promise = deferred.promise();
		                promiseWrapper.resolve = deferred.resolve;
		                promiseWrapper.reject  = deferred.reject;
		            } else if (window.console) {
		                // No implementation

		                console.warn(mixitup.messages.warningNoPromiseImplementation());
		            }

		            return promiseWrapper;
		        },

		        /**
		         * @private
		         * @param   {Array<Promise>}    tasks
		         * @param   {object}            libraries
		         * @return  {Promise<Array>}
		         */

		        all: function(tasks, libraries) {
		            var $ = null;

		            if (mixitup.features.has.promises) {
		                return Promise.all(tasks);
		            } else if (($ = (window.jQuery || libraries.$)) && typeof $.when === 'function') {
		                return $.when.apply($, tasks)
		                    .done(function() {
		                        // jQuery when returns spread arguments rather than an array or resolutions

		                        return arguments;
		                    });
		            }

		            // No implementation

		            if (window.console) {
		                console.warn(mixitup.messages.warningNoPromiseImplementation());
		            }

		            return [];
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}   el
		         * @param   {string}        property
		         * @param   {Array<string>} vendors
		         * @return  {string}
		         */

		        getPrefix: function(el, property, vendors) {
		            var i       = -1,
		                prefix  = '';

		            if (h.dashCase(property) in el.style) return '';

		            for (i = 0; prefix = vendors[i]; i++) {
		                if (prefix + property in el.style) {
		                    return prefix.toLowerCase();
		                }
		            }

		            return 'unsupported';
		        },

		        /**
		         * @private
		         * @return  {string}
		         */

		        randomHex: function() {
		            return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
		        },

		        /**
		         * @private
		         * @param   {HTMLDocument}  [doc]
		         * @return  {object}
		         */

		        getDocumentState: function(doc) {
		            doc = typeof doc.body === 'object' ? doc : window.document;

		            return {
		                scrollTop: window.pageYOffset,
		                scrollLeft: window.pageXOffset,
		                docHeight: doc.documentElement.scrollHeight,
		                docWidth: doc.documentElement.scrollWidth,
		                viewportHeight: doc.documentElement.clientHeight,
		                viewportWidth: doc.documentElement.clientWidth
		            };
		        },

		        /**
		         * @private
		         * @param   {object}    obj
		         * @param   {function}  fn
		         * @return  {function}
		         */

		        bind: function(obj, fn) {
		            return function() {
		                return fn.apply(obj, arguments);
		            };
		        },

		        /**
		         * @private
		         * @param   {HTMLElement}   el
		         * @return  {boolean}
		         */

		        isVisible: function(el) {
		            var styles = null;

		            if (el.offsetParent) return true;

		            styles = window.getComputedStyle(el);

		            if (
		                styles.position === 'fixed' &&
		                styles.visibility !== 'hidden' &&
		                styles.opacity !== '0'
		            ) {
		                // Fixed elements report no offsetParent,
		                // but may still be invisible

		                return true;
		            }

		            return false;
		        },

		        /**
		         * @private
		         * @param   {object}    obj
		         */

		        seal: function(obj) {
		            if (typeof Object.seal === 'function') {
		                Object.seal(obj);
		            }
		        },

		        /**
		         * @private
		         * @param   {object}    obj
		         */

		        freeze: function(obj) {
		            if (typeof Object.freeze === 'function') {
		                Object.freeze(obj);
		            }
		        },

		        /**
		         * @private
		         * @param   {string}    control
		         * @param   {string}    specimen
		         * @return  {boolean}
		         */

		        compareVersions: function(control, specimen) {
		            var controlParts    = control.split('.'),
		                specimenParts   = specimen.split('.'),
		                controlPart     = -1,
		                specimenPart    = -1,
		                i               = -1;

		            for (i = 0; i < controlParts.length; i++) {
		                controlPart     = parseInt(controlParts[i].replace(/[^\d.]/g, ''));
		                specimenPart    = parseInt(specimenParts[i].replace(/[^\d.]/g, '') || 0);

		                if (specimenPart < controlPart) {
		                    return false;
		                } else if (specimenPart > controlPart) {
		                    return true;
		                }
		            }

		            return true;
		        },

		        /**
		         * @private
		         * @constructor
		         */

		        Deferred: function() {
		            this.promise    = null;
		            this.resolve    = null;
		            this.reject     = null;
		            this.id         = h.randomHex();
		        },

		        /**
		         * @private
		         * @param   {object}  obj
		         * @return  {boolean}
		         */

		        isEmptyObject: function(obj) {
		            var key = '';

		            if (typeof Object.keys === 'function') {
		                return Object.keys(obj).length === 0;
		            }

		            for (key in obj) {
		                if (obj.hasOwnProperty(key)) {
		                    return false;
		                }
		            }

		            return true;
		        },

		        /**
		         * @param   {mixitup.Config.ClassNames}   classNames
		         * @param   {string}                      elementName
		         * @param   {string}                      [modifier]
		         * @return  {string}
		         */

		        getClassname: function(classNames, elementName, modifier) {
		            var classname = '';

		            classname += classNames.block;

		            if (classname.length) {
		                classname += classNames.delineatorElement;
		            }

		            classname += classNames['element' + this.pascalCase(elementName)];

		            if (!modifier) return classname;

		            if (classname.length) {
		                classname += classNames.delineatorModifier;
		            }

		            classname += modifier;

		            return classname;
		        },

		        /**
		         * Returns the value of a property on a given object via its string key.
		         *
		         * @param   {object}    obj
		         * @param   {string}    stringKey
		         * @return  {*} value
		         */

		        getProperty: function(obj, stringKey) {
		            var parts           = stringKey.split('.'),
		                returnCurrent   = null,
		                current         = '',
		                i               = 0;

		            if (!stringKey) {
		                return obj;
		            }

		            returnCurrent = function(obj) {
		                if (!obj) {
		                    return null;
		                } else {
		                    return obj[current];
		                }
		            };

		            while (i < parts.length) {
		                current = parts[i];

		                obj = returnCurrent(obj);

		                i++;
		            }

		            if (typeof obj !== 'undefined') {
		                return obj;
		            } else {
		                return null;
		            }
		        }
		    };

		    mixitup.h = h;

		    /**
		     * The Base class adds instance methods to all other extensible MixItUp classes,
		     * enabling the calling of any registered hooks.
		     *
		     * @constructor
		     * @namespace
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.Base = function() {};

		    mixitup.Base.prototype = {
		        constructor: mixitup.Base,

		        /**
		         * Calls any registered hooks for the provided action.
		         *
		         * @memberof    mixitup.Base
		         * @private
		         * @instance
		         * @since       2.0.0
		         * @param       {string}    actionName
		         * @param       {Array<*>}  args
		         * @return      {void}
		         */

		        callActions: function(actionName, args) {
		            var self            = this,
		                hooks           = self.constructor.actions[actionName],
		                extensionName   = '';

		            if (!hooks || h.isEmptyObject(hooks)) return;

		            for (extensionName in hooks) {
		                hooks[extensionName].apply(self, args);
		            }
		        },

		        /**
		         * Calls any registered hooks for the provided filter.
		         *
		         * @memberof    mixitup.Base
		         * @private
		         * @instance
		         * @since       2.0.0
		         * @param       {string}    filterName
		         * @param       {*}         input
		         * @param       {Array<*>}  args
		         * @return      {*}
		         */

		        callFilters: function(filterName, input, args) {
		            var self            = this,
		                hooks           = self.constructor.filters[filterName],
		                output          = input,
		                extensionName   = '';

		            if (!hooks || h.isEmptyObject(hooks)) return output;

		            args = args || [];

		            for (extensionName in hooks) {
		                args = h.arrayFromList(args);

		                args.unshift(output);

		                output = hooks[extensionName].apply(self, args);
		            }

		            return output;
		        }
		    };

		    /**
		     * The BaseStatic class holds a set of static methods which are then added to all other
		     * extensible MixItUp classes as a means of integrating extensions via the addition of new
		     * methods and/or actions and hooks.
		     *
		     * @constructor
		     * @namespace
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.BaseStatic = function() {
		        this.actions = {};
		        this.filters = {};

		        /**
		         * Performs a shallow extend on the class's prototype, adding one or more new members to
		         * the class in a single operation.
		         *
		         * @memberof    mixitup.BaseStatic
		         * @public
		         * @static
		         * @since       2.1.0
		         * @param       {object} extension
		         * @return      {void}
		         */

		        this.extend = function(extension) {
		            h.extend(this.prototype, extension);
		        };

		        /**
		         * Registers a function to be called on the action hook of the provided name.
		         *
		         * @memberof    mixitup.BaseStatic
		         * @public
		         * @static
		         * @since       2.1.0
		         * @param       {string}    hookName
		         * @param       {string}    extensionName
		         * @param       {function}  func
		         * @return      {void}
		         */

		        this.registerAction = function(hookName, extensionName, func) {
		            (this.actions[hookName] = this.actions[hookName] || {})[extensionName] = func;
		        };

		        /**
		         * Registers a function to be called on the filter of the provided name.
		         *
		         * @memberof    mixitup.BaseStatic
		         * @public
		         * @static
		         * @since       2.1.0
		         * @param       {string}    hookName
		         * @param       {string}    extensionName
		         * @param       {function}  func
		         * @return      {void}
		         */

		        this.registerFilter = function(hookName, extensionName, func) {
		            (this.filters[hookName] = this.filters[hookName] || {})[extensionName] = func;
		        };
		    };

		    /**
		     * The `mixitup.Features` class performs all feature and CSS prefix detection
		     * neccessary for MixItUp to function correctly, as well as storing various
		     * string and array constants. All feature decection is on evaluation of the
		     * library and stored in a singleton instance for use by other internal classes.
		     *
		     * @constructor
		     * @namespace
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.Features = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.boxSizingPrefix            = '';
		        this.transformPrefix            = '';
		        this.transitionPrefix           = '';

		        this.boxSizingPrefix            = '';
		        this.transformProp              = '';
		        this.transformRule              = '';
		        this.transitionProp             = '';
		        this.perspectiveProp            = '';
		        this.perspectiveOriginProp      = '';

		        this.has                        = new mixitup.Has();

		        this.canary                     = null;

		        this.BOX_SIZING_PROP            = 'boxSizing';
		        this.TRANSITION_PROP            = 'transition';
		        this.TRANSFORM_PROP             = 'transform';
		        this.PERSPECTIVE_PROP           = 'perspective';
		        this.PERSPECTIVE_ORIGIN_PROP    = 'perspectiveOrigin';
		        this.VENDORS                    = ['Webkit', 'moz', 'O', 'ms'];

		        this.TWEENABLE = [
		            'opacity',
		            'width', 'height',
		            'marginRight', 'marginBottom',
		            'x', 'y',
		            'scale',
		            'translateX', 'translateY', 'translateZ',
		            'rotateX', 'rotateY', 'rotateZ'
		        ];

		        this.callActions('afterConstruct');
		    };

		    mixitup.BaseStatic.call(mixitup.Features);

		    mixitup.Features.prototype = Object.create(mixitup.Base.prototype);

		    h.extend(mixitup.Features.prototype,
		    /** @lends mixitup.Features */
		    {
		        constructor: mixitup.Features,

		        /**
		         * @private
		         * @return  {void}
		         */

		        init: function() {
		            var self = this;

		            self.callActions('beforeInit', arguments);

		            self.canary = document.createElement('div');

		            self.setPrefixes();
		            self.runTests();

		            self.callActions('beforeInit', arguments);
		        },

		        /**
		         * @private
		         * @return  {void}
		         */

		        runTests: function() {
		            var self = this;

		            self.callActions('beforeRunTests', arguments);

		            self.has.promises       = typeof window.Promise === 'function';
		            self.has.transitions    = self.transitionPrefix !== 'unsupported';

		            self.callActions('afterRunTests', arguments);

		            h.freeze(self.has);
		        },

		        /**
		         * @private
		         * @return  {void}
		         */

		        setPrefixes: function() {
		            var self = this;

		            self.callActions('beforeSetPrefixes', arguments);

		            self.transitionPrefix   = h.getPrefix(self.canary, 'Transition', self.VENDORS);
		            self.transformPrefix    = h.getPrefix(self.canary, 'Transform', self.VENDORS);
		            self.boxSizingPrefix    = h.getPrefix(self.canary, 'BoxSizing', self.VENDORS);

		            self.boxSizingProp = self.boxSizingPrefix ?
		                self.boxSizingPrefix + h.pascalCase(self.BOX_SIZING_PROP) : self.BOX_SIZING_PROP;

		            self.transitionProp = self.transitionPrefix ?
		                self.transitionPrefix + h.pascalCase(self.TRANSITION_PROP) : self.TRANSITION_PROP;

		            self.transformProp = self.transformPrefix ?
		                self.transformPrefix + h.pascalCase(self.TRANSFORM_PROP) : self.TRANSFORM_PROP;

		            self.transformRule = self.transformPrefix ?
		                '-' + self.transformPrefix + '-' + self.TRANSFORM_PROP : self.TRANSFORM_PROP;

		            self.perspectiveProp = self.transformPrefix ?
		                self.transformPrefix + h.pascalCase(self.PERSPECTIVE_PROP) : self.PERSPECTIVE_PROP;

		            self.perspectiveOriginProp = self.transformPrefix ?
		                self.transformPrefix + h.pascalCase(self.PERSPECTIVE_ORIGIN_PROP) :
		                self.PERSPECTIVE_ORIGIN_PROP;

		            self.callActions('afterSetPrefixes', arguments);
		        }
		    });

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.Has = function() {
		        this.transitions    = false;
		        this.promises       = false;

		        h.seal(this);
		    };

		    // Assign a singleton instance to `mixitup.features` and initialise:

		    mixitup.features = new mixitup.Features();

		    mixitup.features.init();

		    /**
		     * A group of properties defining the mixer's animation and effects settings.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        animation
		     * @namespace
		     * @public
		     * @since       2.0.0
		     */

		    mixitup.ConfigAnimation = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A boolean dictating whether or not animation should be enabled for the MixItUp instance.
		         * If `false`, all operations will occur instantly and syncronously, although callback
		         * functions and any returned promises will still be fulfilled.
		         *
		         * @example <caption>Example: Create a mixer with all animations disabled</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         enable: false
		         *     }
		         * });
		         *
		         * @name        enable
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.enable = true;

		        /**
		         * A string of one or more space-seperated properties to which transitions will be
		         * applied for all filtering animations.
		         *
		         * Properties can be listed any order or combination, although they will be applied in a specific
		         * predefined order to produce consistent results.
		         *
		         * To learn more about available effects, experiment with our <a href="https://www.kunkalabs.com/mixitup/">
		         * sandbox demo</a> and try out the "Export config" button in the Animation options drop down.
		         *
		         * @example <caption>Example: Apply "fade" and "translateZ" effects to all animations</caption>
		         * // As targets are filtered in and out, they will fade between
		         * // opacity 1 and 0 and transform between translateZ(-100px) and
		         * // translateZ(0).
		         *
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         effects: 'fade translateZ(-100px)'
		         *     }
		         * });
		         *
		         * @name        effects
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {string}
		         * @default     'fade scale'
		         */

		        this.effects = 'fade scale';

		        /**
		         * A string of one or more space-seperated effects to be applied only to filter-in
		         * animations, overriding `config.animation.effects` if set.
		         *
		         * @example <caption>Example: Apply downwards vertical translate to targets being filtered in</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         effectsIn: 'fade translateY(-100%)'
		         *     }
		         * });
		         *
		         * @name        effectsIn
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {string}
		         * @default     ''
		         */

		        this.effectsIn = '';

		        /**
		         * A string of one or more space-seperated effects to be applied only to filter-out
		         * animations, overriding `config.animation.effects` if set.
		         *
		         * @example <caption>Example: Apply upwards vertical translate to targets being filtered out</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         effectsOut: 'fade translateY(-100%)'
		         *     }
		         * });
		         *
		         * @name        effectsOut
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {string}
		         * @default     ''
		         */

		        this.effectsOut = '';

		        /**
		         * An integer dictating the duration of all MixItUp animations in milliseconds, not
		         * including any additional delay apllied via the `'stagger'` effect.
		         *
		         * @example <caption>Example: Apply an animation duration of 200ms to all mixitup animations</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         duration: 200
		         *     }
		         * });
		         *
		         * @name        duration
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {number}
		         * @default     600
		         */

		        this.duration = 600;

		        /**
		         * A valid CSS3 transition-timing function or shorthand. For a full list of accepted
		         * values, visit <a href="http://easings.net" target="_blank">easings.net</a>.
		         *
		         * @example <caption>Example 1: Apply "ease-in-out" easing to all animations</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         easing: 'ease-in-out'
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Apply a custom "cubic-bezier" easing function to all animations</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
		         *     }
		         * });
		         *
		         * @name        easing
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {string}
		         * @default     'ease'
		         */

		        this.easing = 'ease';

		        /**
		         * A boolean dictating whether or not to apply perspective to the MixItUp container
		         * during animations. By default, perspective is always applied and creates the
		         * illusion of three-dimensional space for effects such as `translateZ`, `rotateX`,
		         * and `rotateY`.
		         *
		         * You may wish to disable this and define your own perspective settings via CSS.
		         *
		         * @example <caption>Example: Prevent perspective from being applied to any 3D transforms</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         applyPerspective: false
		         *     }
		         * });
		         *
		         * @name        applyPerspective
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {bolean}
		         * @default     true
		         */

		        this.applyPerspective = true;

		        /**
		         * The perspective distance value to be applied to the container during animations,
		         * affecting any 3D-transform-based effects.
		         *
		         * @example <caption>Example: Set a perspective distance of 2000px</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         effects: 'rotateY(-25deg)',
		         *         perspectiveDistance: '2000px'
		         *     }
		         * });
		         *
		         * @name        perspectiveDistance
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {string}
		         * @default     '3000px'
		         */

		        this.perspectiveDistance = '3000px';

		        /**
		         * The perspective-origin value to be applied to the container during animations,
		         * affecting any 3D-transform-based effects.
		         *
		         * @example <caption>Example: Set a perspective origin in the top-right of the container</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         effects: 'transateZ(-200px)',
		         *         perspectiveOrigin: '100% 0'
		         *     }
		         * });
		         *
		         * @name        perspectiveOrigin
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {string}
		         * @default     '50% 50%'
		         */

		        this.perspectiveOrigin = '50% 50%';

		        /**
		         * A boolean dictating whether or not to enable the queuing of operations.
		         *
		         * If `true` (default), and a control is clicked or an API call is made while another
		         * operation is progress, the operation will go into the queue and will be automatically exectuted
		         * when the previous operaitons is finished.
		         *
		         * If `false`, any requested operations will be ignored, and the `onMixBusy` callback and `mixBusy`
		         * event will be fired. If `debug.showWarnings` is enabled, a console warning will also occur.
		         *
		         * @example <caption>Example: Disable queuing</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         queue: false
		         *     }
		         * });
		         *
		         * @name        queue
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.queue = true;

		        /**
		         * An integer dictacting the maximum number of operations allowed in the queue at
		         * any time, when queuing is enabled.
		         *
		         * @example <caption>Example: Allow a maximum of 5 operations in the queue at any time</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         queueLimit: 5
		         *     }
		         * });
		         *
		         * @name        queueLimit
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {number}
		         * @default     3
		         */

		        this.queueLimit = 3;

		        /**
		         * A boolean dictating whether or not to transition the height and width of the
		         * container as elements are filtered in and out. If disabled, the container height
		         * will change abruptly.
		         *
		         * It may be desirable to disable this on mobile devices as the CSS `height` and
		         * `width` properties do not receive GPU-acceleration and can therefore cause stuttering.
		         *
		         * @example <caption>Example 1: Disable the transitioning of the container height and/or width</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         animateResizeContainer: false
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Disable the transitioning of the container height and/or width for mobile devices only</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         animateResizeContainer: myFeatureTests.isMobile ? false : true
		         *     }
		         * });
		         *
		         * @name        animateResizeContainer
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.animateResizeContainer = true;

		        /**
		         * A boolean dictating whether or not to transition the height and width of target
		         * elements as they change throughout the course of an animation.
		         *
		         * This is often a must for flex-box grid layouts where the size of target elements may change
		         * depending on final their position in relation to their siblings, or for `.changeLayout()`
		         * operations where the size of targets change between layouts.
		         *
		         * NB: This feature requires additional calculations and manipulation to non-hardware-accelerated
		         * properties which may adversely affect performance on slower devices, and is therefore
		         * disabled by default.
		         *
		         * @example <caption>Example: Enable the transitioning of target widths and heights</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         animateResizeTargets: true
		         *     }
		         * });
		         *
		         * @name        animateResizeTargets
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {boolean}
		         * @default     false
		         */

		        this.animateResizeTargets = false;

		        /**
		         * A custom function used to manipulate the order in which the stagger delay is
		         * incremented when using the ‘stagger’ effect.
		         *
		         * When using the 'stagger' effect, the delay applied to each target element is incremented
		         * based on its index. You may create a custom function to manipulate the order in which the
		         * delay is incremented and create engaging non-linear stagger effects.
		         *
		         * The function receives the index of the target element as a parameter, and must
		         * return an integer which serves as the multiplier for the stagger delay.
		         *
		         * @example <caption>Example 1: Stagger target elements by column in a 3-column grid</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         effects: 'fade stagger(100ms)',
		         *         staggerSequence: function(i) {
		         *             return i % 3;
		         *         }
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Using an algorithm to produce a more complex sequence</caption>
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         effects: 'fade stagger(100ms)',
		         *         staggerSequence: function(i) {
		         *             return (2*i) - (5*((i/3) - ((1/3) * (i%3))));
		         *         }
		         *     }
		         * });
		         *
		         * @name        staggerSequence
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {function}
		         * @default     null
		         */

		        this.staggerSequence = null;

		        /**
		         * A boolean dictating whether or not to reverse the direction of `translate`
		         * and `rotate` transforms for elements being filtered out.
		         *
		         * It can be used to create carousel-like animations where elements enter and exit
		         * from opposite directions. If enabled, the effect `translateX(-100%)` for elements
		         * being filtered in would become `translateX(100%)` for targets being filtered out.
		         *
		         * This functionality can also be achieved by providing seperate effects
		         * strings for `config.animation.effectsIn` and `config.animation.effectsOut`.
		         *
		         * @example <caption>Example: Reverse the desired direction on any translate/rotate effect for targets being filtered out</caption>
		         * // Elements being filtered in will be translated from '100%' to '0' while
		         * // elements being filtered out will be translated from 0 to '-100%'
		         *
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         effects: 'fade translateX(100%)',
		         *         reverseOut: true,
		         *         nudge: false // Disable nudging to create a carousel-like effect
		         *     }
		         * });
		         *
		         * @name        reverseOut
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {boolean}
		         * @default     false
		         */

		        this.reverseOut = false;

		        /**
		         * A boolean dictating whether or not to "nudge" the animation path of targets
		         * when they are being filtered in and out simulatenously.
		         *
		         * This has been the default behavior of MixItUp since version 1, but it
		         * may be desirable to disable this effect when filtering directly from
		         * one exclusive set of targets to a different exclusive set of targets,
		         * to create a carousel-like effect, or a generally more subtle animation.
		         *
		         * @example <caption>Example: Disable the "nudging" of targets being filtered in and out simulatenously</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         nudge: false
		         *     }
		         * });
		         *
		         * @name        nudge
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.nudge = true;

		        /**
		         * A boolean dictating whether or not to clamp the height of the container while MixItUp's
		         * geometry tests are carried out before an operation.
		         *
		         * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
		         * height of the container might affect its vertical positioning in the viewport
		         * (e.g. a vertically-centered container), this should be turned off to ensure accurate
		         * test results and a smooth animation.
		         *
		         * @example <caption>Example: Disable container height-clamping</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         clampHeight: false
		         *     }
		         * });
		         *
		         * @name        clampHeight
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.clampHeight = true;

		        /**
		         * A boolean dictating whether or not to clamp the width of the container while MixItUp's
		         * geometry tests are carried out before an operation.
		         *
		         * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
		         * width of the container might affect its horitzontal positioning in the viewport
		         * (e.g. a horizontall-centered container), this should be turned off to ensure accurate
		         * test results and a smooth animation.
		         *
		         * @example <caption>Example: Disable container width-clamping</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     animation: {
		         *         clampWidth: false
		         *     }
		         * });
		         *
		         * @name        clampWidth
		         * @memberof    mixitup.Config.animation
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.clampWidth = true;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigAnimation);

		    mixitup.ConfigAnimation.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigAnimation.prototype.constructor = mixitup.ConfigAnimation;

		    /**
		     * A group of properties relating to the behavior of the Mixer.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        behavior
		     * @namespace
		     * @public
		     * @since       3.1.12
		     */

		    mixitup.ConfigBehavior = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A boolean dictating whether to allow "live" sorting of the mixer.
		         *
		         * Because of the expensive nature of sorting, MixItUp makes use of several
		         * internal optimizations to skip redundant sorting operations, such as when
		         * the newly requested sort command is the same as the active one. The caveat
		         * to this optimization is that "live" edits to the value of a target's sorting
		         * attribute will be ignored when requesting a re-sort by the same attribute.
		         *
		         * By setting to `behavior.liveSort` to `true`, the mixer will always re-sort
		         * regardless of whether or not the sorting attribute and order have changed.
		         *
		         * @example <caption>Example: Enabling `liveSort` to allow for re-sorting</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     behavior: {
		         *         liveSort: true
		         *     },
		         *     load: {
		         *         sort: 'edited:desc'
		         *     }
		         * });
		         *
		         * var target = containerEl.children[3];
		         *
		         * console.log(target.getAttribute('data-edited')); // '2015-04-24'
		         *
		         * target.setAttribute('data-edited', '2017-08-10'); // Update the target's edited date
		         *
		         * mixer.sort('edited:desc')
		         *     .then(function(state) {
		         *         // The target is now at the top of the list
		         *
		         *         console.log(state.targets[0] === target); // true
		         *     });
		         *
		         * @name        liveSort
		         * @memberof    mixitup.Config.behavior
		         * @instance
		         * @type        {boolean}
		         * @default     false
		         */

		        this.liveSort = false;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigBehavior);

		    mixitup.ConfigBehavior.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigBehavior.prototype.constructor = mixitup.ConfigBehavior;

		    /**
		     * A group of optional callback functions to be invoked at various
		     * points within the lifecycle of a mixer operation.
		     *
		     * Each function is analogous to an event of the same name triggered from the
		     * container element, and is invoked immediately after it.
		     *
		     * All callback functions receive the current `state` object as their first
		     * argument, as well as other more specific arguments described below.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        callbacks
		     * @namespace
		     * @public
		     * @since       2.0.0
		     */

		    mixitup.ConfigCallbacks = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A callback function invoked immediately after any MixItUp operation is requested
		         * and before animations have begun.
		         *
		         * A second `futureState` argument is passed to the function which represents the final
		         * state of the mixer once the requested operation has completed.
		         *
		         * @example <caption>Example: Adding an `onMixStart` callback function</caption>
		         * var mixer = mixitup(containerEl, {
		         *     callbacks: {
		         *         onMixStart: function(state, futureState) {
		         *              console.log('Starting operation...');
		         *         }
		         *     }
		         * });
		         *
		         * @name        onMixStart
		         * @memberof    mixitup.Config.callbacks
		         * @instance
		         * @type        {function}
		         * @default     null
		         */

		        this.onMixStart = null;

		        /**
		         * A callback function invoked when a MixItUp operation is requested while another
		         * operation is in progress, and the animation queue is full, or queueing
		         * is disabled.
		         *
		         * @example <caption>Example: Adding an `onMixBusy` callback function</caption>
		         * var mixer = mixitup(containerEl, {
		         *     callbacks: {
		         *         onMixBusy: function(state) {
		         *              console.log('Mixer busy');
		         *         }
		         *     }
		         * });
		         *
		         * @name        onMixBusy
		         * @memberof    mixitup.Config.callbacks
		         * @instance
		         * @type        {function}
		         * @default     null
		         */

		        this.onMixBusy  = null;

		        /**
		         * A callback function invoked after any MixItUp operation has completed, and the
		         * state has been updated.
		         *
		         * @example <caption>Example: Adding an `onMixEnd` callback function</caption>
		         * var mixer = mixitup(containerEl, {
		         *     callbacks: {
		         *         onMixEnd: function(state) {
		         *              console.log('Operation complete');
		         *         }
		         *     }
		         * });
		         *
		         * @name        onMixEnd
		         * @memberof    mixitup.Config.callbacks
		         * @instance
		         * @type        {function}
		         * @default     null
		         */

		        this.onMixEnd   = null;

		        /**
		         * A callback function invoked whenever an operation "fails", i.e. no targets
		         * could be found matching the requested filter.
		         *
		         * @example <caption>Example: Adding an `onMixFail` callback function</caption>
		         * var mixer = mixitup(containerEl, {
		         *     callbacks: {
		         *         onMixFail: function(state) {
		         *              console.log('No items could be found matching the requested filter');
		         *         }
		         *     }
		         * });
		         *
		         * @name        onMixFail
		         * @memberof    mixitup.Config.callbacks
		         * @instance
		         * @type        {function}
		         * @default     null
		         */

		        this.onMixFail  = null;

		        /**
		         * A callback function invoked whenever a MixItUp control is clicked, and before its
		         * respective operation is requested.
		         *
		         * The clicked element is assigned to the `this` keyword within the function. The original
		         * click event is passed to the function as the second argument, which can be useful if
		         * using `<a>` tags as controls where the default behavior needs to be prevented.
		         *
		         * Returning `false` from the callback will prevent the control click from triggering
		         * an operation.
		         *
		         * @example <caption>Example 1: Adding an `onMixClick` callback function</caption>
		         * var mixer = mixitup(containerEl, {
		         *     callbacks: {
		         *         onMixClick: function(state, originalEvent) {
		         *              console.log('The control "' + this.innerText + '" was clicked');
		         *         }
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Using `onMixClick` to manipulate the original click event</caption>
		         * var mixer = mixitup(containerEl, {
		         *     callbacks: {
		         *         onMixClick: function(state, originalEvent) {
		         *              // Prevent original click event from bubbling up:
		         *              originalEvent.stopPropagation();
		         *
		         *              // Prevent default behavior of clicked element:
		         *              originalEvent.preventDefault();
		         *         }
		         *     }
		         * });
		         *
		         * @example <caption>Example 3: Using `onMixClick` to conditionally cancel operations</caption>
		         * var mixer = mixitup(containerEl, {
		         *     callbacks: {
		         *         onMixClick: function(state, originalEvent) {
		         *              // Perform some conditional check:
		         *
		         *              if (myApp.isLoading) {
		         *                  // By returning false, we can prevent the control click from triggering an operation.
		         *
		         *                  return false;
		         *              }
		         *         }
		         *     }
		         * });
		         *
		         * @name        onMixClick
		         * @memberof    mixitup.Config.callbacks
		         * @instance
		         * @type        {function}
		         * @default     null
		         */

		        this.onMixClick = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigCallbacks);

		    mixitup.ConfigCallbacks.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigCallbacks.prototype.constructor = mixitup.ConfigCallbacks;

		    /**
		     * A group of properties relating to clickable control elements.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        controls
		     * @namespace
		     * @public
		     * @since       2.0.0
		     */

		    mixitup.ConfigControls = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A boolean dictating whether or not controls should be enabled for the mixer instance.
		         *
		         * If `true` (default behavior), MixItUp will search the DOM for any clickable elements with
		         * `data-filter`, `data-sort` or `data-toggle` attributes, and bind them for click events.
		         *
		         * If `false`, no click handlers will be bound, and all functionality must therefore be performed
		         * via the mixer's API methods.
		         *
		         * If you do not intend to use the default controls, setting this property to `false` will
		         * marginally improve the startup time of your mixer instance, and will also prevent any other active
		         * mixer instances in the DOM which are bound to controls from controlling the instance.
		         *
		         * @example <caption>Example: Disabling controls</caption>
		         * var mixer = mixitup(containerEl, {
		         *     controls: {
		         *         enable: false
		         *     }
		         * });
		         *
		         * // With the default controls disabled, we can only control
		         * // the mixer via its API methods, e.g.:
		         *
		         * mixer.filter('.cat-1');
		         *
		         * @name        enable
		         * @memberof    mixitup.Config.controls
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.enable = true;

		        /**
		         * A boolean dictating whether or not to use event delegation when binding click events
		         * to the default controls.
		         *
		         * If `false` (default behavior), each control button in the DOM will be found and
		         * individually bound when a mixer is instantiated, with their corresponding actions
		         * cached for performance.
		         *
		         * If `true`, a single click handler will be applied to the `window` (or container element - see
		         * `config.controls.scope`), and any click events triggered by elements with `data-filter`,
		         * `data-sort` or `data-toggle` attributes present will be handled as they propagate upwards.
		         *
		         * If you require a user interface where control buttons may be added, removed, or changed during the
		         * lifetime of a mixer, `controls.live` should be set to `true`. There is a marginal but unavoidable
		         * performance deficit when using live controls, as the value of each control button must be read
		         * from the DOM in real time once the click event has propagated.
		         *
		         * @example <caption>Example: Setting live controls</caption>
		         * var mixer = mixitup(containerEl, {
		         *     controls: {
		         *         live: true
		         *     }
		         * });
		         *
		         * // Control buttons can now be added, remove and changed without breaking
		         * // the mixer's UI
		         *
		         * @name        live
		         * @memberof    mixitup.Config.controls
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.live = false;

		        /**
		         * A string dictating the "scope" to use when binding or querying the default controls. The available
		         * values are `'global'` or `'local'`.
		         *
		         * When set to `'global'` (default behavior), MixItUp will query the entire document for control buttons
		         * to bind, or delegate click events from (see `config.controls.live`).
		         *
		         * When set to `'local'`, MixItUp will only query (or bind click events to) its own container element.
		         * This may be desireable if you require multiple active mixer instances within the same document, with
		         * controls that would otherwise intefere with each other if scoped globally.
		         *
		         * Conversely, if you wish to control multiple instances with a single UI, you would create one
		         * set of controls and keep the controls scope of each mixer set to `global`.
		         *
		         * @example <caption>Example: Setting 'local' scoped controls</caption>
		         * var mixerOne = mixitup(containerOne, {
		         *     controls: {
		         *         scope: 'local'
		         *     }
		         * });
		         *
		         * var mixerTwo = mixitup(containerTwo, {
		         *     controls: {
		         *         scope: 'local'
		         *     }
		         * });
		         *
		         * // Both mixers can now exist within the same document with
		         * // isolated controls placed within their container elements.
		         *
		         * @name        scope
		         * @memberof    mixitup.Config.controls
		         * @instance
		         * @type        {string}
		         * @default     'global'
		         */

		        this.scope = 'global'; // enum: ['local' ,'global']

		        /**
		         * A string dictating the type of logic to apply when concatenating the filter selectors of
		         * active toggle buttons (i.e. any clickable element with a `data-toggle` attribute).
		         *
		         * If set to `'or'` (default behavior), selectors will be concatenated together as
		         * a comma-seperated list. For example:
		         *
		         * `'.cat-1, .cat-2'` (shows any elements matching `'.cat-1'` OR `'.cat-2'`)
		         *
		         * If set to `'and'`, selectors will be directly concatenated together. For example:
		         *
		         * `'.cat-1.cat-2'` (shows any elements which match both `'.cat-1'` AND `'.cat-2'`)
		         *
		         * @example <caption>Example: Setting "and" toggle logic</caption>
		         * var mixer = mixitup(containerEl, {
		         *     controls: {
		         *         toggleLogic: 'and'
		         *     }
		         * });
		         *
		         * @name        toggleLogic
		         * @memberof    mixitup.Config.controls
		         * @instance
		         * @type        {string}
		         * @default     'or'
		         */

		        this.toggleLogic = 'or'; // enum: ['or', 'and']

		        /**
		         * A string dictating the filter behavior when all toggles are inactive.
		         *
		         * When set to `'all'` (default behavior), *all* targets will be shown by default
		         * when no toggles are active, or at the moment all active toggles are toggled off.
		         *
		         * When set to `'none'`, no targets will be shown by default when no toggles are
		         * active, or at the moment all active toggles are toggled off.
		         *
		         * @example <caption>Example 1: Setting the default toggle behavior to `'all'`</caption>
		         * var mixer = mixitup(containerEl, {
		         *     controls: {
		         *         toggleDefault: 'all'
		         *     }
		         * });
		         *
		         * mixer.toggleOn('.cat-2')
		         *     .then(function() {
		         *         // Deactivate all active toggles
		         *
		         *         return mixer.toggleOff('.cat-2')
		         *     })
		         *     .then(function(state) {
		         *          console.log(state.activeFilter.selector); // 'all'
		         *          console.log(state.totalShow); // 12
		         *     });
		         *
		         * @example <caption>Example 2: Setting the default toggle behavior to `'none'`</caption>
		         * var mixer = mixitup(containerEl, {
		         *     controls: {
		         *         toggleDefault: 'none'
		         *     }
		         * });
		         *
		         * mixer.toggleOn('.cat-2')
		         *     .then(function() {
		         *         // Deactivate all active toggles
		         *
		         *         return mixer.toggleOff('.cat-2')
		         *     })
		         *     .then(function(state) {
		         *          console.log(state.activeFilter.selector); // 'none'
		         *          console.log(state.totalShow); // 0
		         *     });
		         *
		         * @name        toggleDefault
		         * @memberof    mixitup.Config.controls
		         * @instance
		         * @type        {string}
		         * @default     'all'
		         */

		        this.toggleDefault = 'all'; // enum: ['all', 'none']

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigControls);

		    mixitup.ConfigControls.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigControls.prototype.constructor = mixitup.ConfigControls;

		    /**
		     * A group of properties defining the output and structure of class names programmatically
		     * added to controls and containers to reflect the state of the mixer.
		     *
		     * Most commonly, class names are added to controls by MixItUp to indicate that
		     * the control is active so that it can be styled accordingly - `'mixitup-control-active'` by default.
		     *
		     * Using a "BEM" like structure, each classname is broken into the three parts:
		     * a block namespace (`'mixitup'`), an element name (e.g. `'control'`), and an optional modifier
		     * name (e.g. `'active'`) reflecting the state of the element.
		     *
		     * By default, each part of the classname is concatenated together using single hyphens as
		     * delineators, but this can be easily customised to match the naming convention and style of
		     * your project.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        classNames
		     * @namespace
		     * @public
		     * @since       3.0.0
		     */

		    mixitup.ConfigClassNames = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * The "block" portion, or top-level namespace added to the start of any class names created by MixItUp.
		         *
		         * @example <caption>Example 1: changing the `config.classNames.block` value</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         block: 'portfolio'
		         *     }
		         * });
		         *
		         * // Active control output: "portfolio-control-active"
		         *
		         * @example <caption>Example 2: Removing `config.classNames.block`</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         block: ''
		         *     }
		         * });
		         *
		         * // Active control output: "control-active"
		         *
		         * @name        block
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     'mixitup'
		         */

		        this.block = 'mixitup';

		        /**
		         * The "element" portion of the class name added to container.
		         *
		         * @name        elementContainer
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     'container'
		         */

		        this.elementContainer = 'container';

		        /**
		         * The "element" portion of the class name added to filter controls.
		         *
		         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
		         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
		         *
		         * @example <caption>Example 1: changing the `config.classNames.elementFilter` value</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         elementFilter: 'filter'
		         *     }
		         * });
		         *
		         * // Active filter output: "mixitup-filter-active"
		         *
		         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementFilter` values</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         block: 'portfolio',
		         *         elementFilter: 'filter'
		         *     }
		         * });
		         *
		         * // Active filter output: "portfolio-filter-active"
		         *
		         * @name        elementFilter
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     'control'
		         */

		        this.elementFilter = 'control';

		        /**
		         * The "element" portion of the class name added to sort controls.
		         *
		         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
		         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
		         *
		         * @example <caption>Example 1: changing the `config.classNames.elementSort` value</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         elementSort: 'sort'
		         *     }
		         * });
		         *
		         * // Active sort output: "mixitup-sort-active"
		         *
		         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementSort` values</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         block: 'portfolio',
		         *         elementSort: 'sort'
		         *     }
		         * });
		         *
		         * // Active sort output: "portfolio-sort-active"
		         *
		         * @name        elementSort
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     'control'
		         */

		        this.elementSort = 'control';

		        /**
		         * The "element" portion of the class name added to multimix controls.
		         *
		         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
		         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
		         *
		         * @example <caption>Example 1: changing the `config.classNames.elementMultimix` value</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         elementMultimix: 'multimix'
		         *     }
		         * });
		         *
		         * // Active multimix output: "mixitup-multimix-active"
		         *
		         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementMultimix` values</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         block: 'portfolio',
		         *         elementSort: 'multimix'
		         *     }
		         * });
		         *
		         * // Active multimix output: "portfolio-multimix-active"
		         *
		         * @name        elementMultimix
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     'control'
		         */

		        this.elementMultimix = 'control';

		        /**
		         * The "element" portion of the class name added to toggle controls.
		         *
		         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
		         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
		         *
		         * @example <caption>Example 1: changing the `config.classNames.elementToggle` value</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         elementToggle: 'toggle'
		         *     }
		         * });
		         *
		         * // Active toggle output: "mixitup-toggle-active"
		         *
		         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementToggle` values</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         block: 'portfolio',
		         *         elementToggle: 'toggle'
		         *     }
		         * });
		         *
		         * // Active toggle output: "portfolio-toggle-active"
		         *
		         * @name        elementToggle
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     'control'
		         */

		        this.elementToggle = 'control';

		        /**
		         * The "modifier" portion of the class name added to active controls.
		         * @name        modifierActive
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     'active'
		         */

		        this.modifierActive = 'active';

		        /**
		         * The "modifier" portion of the class name added to disabled controls.
		         *
		         * @name        modifierDisabled
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     'disabled'
		         */

		        this.modifierDisabled = 'disabled';

		        /**
		         * The "modifier" portion of the class name added to the container when in a "failed" state.
		         *
		         * @name        modifierFailed
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     'failed'
		         */

		        this.modifierFailed = 'failed';

		        /**
		         * The delineator used between the "block" and "element" portions of any class name added by MixItUp.
		         *
		         * If the block portion is ommited by setting it to an empty string, no delineator will be added.
		         *
		         * @example <caption>Example: changing the delineator to match BEM convention</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         delineatorElement: '__'
		         *     }
		         * });
		         *
		         * // example active control output: "mixitup__control-active"
		         *
		         * @name        delineatorElement
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     '-'
		         */

		        this.delineatorElement = '-';

		        /**
		         * The delineator used between the "element" and "modifier" portions of any class name added by MixItUp.
		         *
		         * If the element portion is ommited by setting it to an empty string, no delineator will be added.
		         *
		         * @example <caption>Example: changing both delineators to match BEM convention</caption>
		         * var mixer = mixitup(containerEl, {
		         *     classNames: {
		         *         delineatorElement: '__'
		         *         delineatorModifier: '--'
		         *     }
		         * });
		         *
		         * // Active control output: "mixitup__control--active"
		         *
		         * @name        delineatorModifier
		         * @memberof    mixitup.Config.classNames
		         * @instance
		         * @type        {string}
		         * @default     '-'
		         */

		        this.delineatorModifier = '-';

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigClassNames);

		    mixitup.ConfigClassNames.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigClassNames.prototype.constructor = mixitup.ConfigClassNames;

		    /**
		     * A group of properties relating to MixItUp's dataset API.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        data
		     * @namespace
		     * @public
		     * @since       3.0.0
		     */

		    mixitup.ConfigData = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A string specifying the name of the key containing your data model's unique
		         * identifier (UID). To use the dataset API, a UID key must be specified and
		         * be present and unique on all objects in the dataset you provide to MixItUp.
		         *
		         * For example, if your dataset is made up of MongoDB documents, the UID
		         * key would be `'id'` or `'_id'`.
		         *
		         * @example <caption>Example: Setting the UID to `'id'`</caption>
		         * var mixer = mixitup(containerEl, {
		         *     data: {
		         *         uidKey: 'id'
		         *     }
		         * });
		         *
		         * @name        uidKey
		         * @memberof    mixitup.Config.data
		         * @instance
		         * @type        {string}
		         * @default     ''
		         */

		        this.uidKey = '';

		        /**
		         * A boolean dictating whether or not MixItUp should "dirty check" each object in
		         * your dataset for changes whenever `.dataset()` is called, and re-render any targets
		         * for which a change is found.
		         *
		         * Depending on the complexity of your data model, dirty checking can be expensive
		         * and is therefore disabled by default.
		         *
		         * NB: For changes to be detected, a new immutable instance of the edited model must be
		         * provided to mixitup, rather than manipulating properties on the existing instance.
		         * If your changes are a result of a DB write and read, you will most likely be calling
		         * `.dataset()` with a clean set of objects each time, so this will not be an issue.
		         *
		         * @example <caption>Example: Enabling dirty checking</caption>
		         *
		         * var myDataset = [
		         *     {
		         *         id: 0,
		         *         title: "Blog Post Title 0"
		         *         ...
		         *     },
		         *     {
		         *         id: 1,
		         *         title: "Blog Post Title 1"
		         *         ...
		         *     }
		         * ];
		         *
		         * // Instantiate a mixer with a pre-loaded dataset, and a target renderer
		         * // function defined
		         *
		         * var mixer = mixitup(containerEl, {
		         *     data: {
		         *         uidKey: 'id',
		         *         dirtyCheck: true
		         *     },
		         *     load: {
		         *         dataset: myDataset
		         *     },
		         *     render: {
		         *         target: function() { ... }
		         *     }
		         * });
		         *
		         * // For illustration, we will clone and edit the second object in the dataset.
		         * // NB: this would typically be done server-side in response to a DB update,
		         * and then re-queried via an API.
		         *
		         * myDataset[1] = Object.assign({}, myDataset[1]);
		         *
		         * myDataset[1].title = 'Blog Post Title 11';
		         *
		         * mixer.dataset(myDataset)
		         *    .then(function() {
		         *        // the target with ID "1", will be re-rendered reflecting its new title
		         *    });
		         *
		         * @name        dirtyCheck
		         * @memberof    mixitup.Config.data
		         * @instance
		         * @type        {boolean}
		         * @default     false
		         */

		        this.dirtyCheck = false;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigData);

		    mixitup.ConfigData.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigData.prototype.constructor = mixitup.ConfigData;

		    /**
		     * A group of properties allowing the toggling of various debug features.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        debug
		     * @namespace
		     * @public
		     * @since       3.0.0
		     */

		    mixitup.ConfigDebug = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A boolean dictating whether or not the mixer instance returned by the
		         * `mixitup()` factory function should expose private properties and methods.
		         *
		         * By default, mixer instances only expose their public API, but enabling
		         * debug mode will give you access to various mixer internals which may aid
		         * in debugging, or the authoring of extensions.
		         *
		         * @example <caption>Example: Enabling debug mode</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     debug: {
		         *         enable: true
		         *     }
		         * });
		         *
		         * // Private properties and methods will now be visible on the mixer instance:
		         *
		         * console.log(mixer);
		         *
		         * @name        enable
		         * @memberof    mixitup.Config.debug
		         * @instance
		         * @type        {boolean}
		         * @default     false
		         */

		        this.enable = false;

		        /**
		         * A boolean dictating whether or not warnings should be shown when various
		         * common gotchas occur.
		         *
		         * Warnings are intended to provide insights during development when something
		         * occurs that is not a fatal, but may indicate an issue with your integration,
		         * and are therefore turned on by default. However, you may wish to disable
		         * them in production.
		         *
		         * @example <caption>Example 1: Disabling warnings</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     debug: {
		         *         showWarnings: false
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Disabling warnings based on environment</caption>
		         *
		         * var showWarnings = myAppConfig.environment === 'development' ? true : false;
		         *
		         * var mixer = mixitup(containerEl, {
		         *     debug: {
		         *         showWarnings: showWarnings
		         *     }
		         * });
		         *
		         * @name        showWarnings
		         * @memberof    mixitup.Config.debug
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.showWarnings = true;

		        /**
		         * Used for server-side testing only.
		         *
		         * @private
		         * @name        fauxAsync
		         * @memberof    mixitup.Config.debug
		         * @instance
		         * @type        {boolean}
		         * @default     false
		         */

		        this.fauxAsync = false;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigDebug);

		    mixitup.ConfigDebug.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigDebug.prototype.constructor = mixitup.ConfigDebug;

		    /**
		     * A group of properties relating to the layout of the container.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        layout
		     * @namespace
		     * @public
		     * @since       3.0.0
		     */

		    mixitup.ConfigLayout = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A boolean dictating whether or not mixitup should query all descendants
		         * of the container for targets, or only immediate children.
		         *
		         * By default, mixitup will query all descendants matching the
		         * `selectors.target` selector when indexing targets upon instantiation.
		         * This allows for targets to be nested inside a sub-container which is
		         * useful when ring-fencing targets from locally scoped controls in your
		         * markup (see `controls.scope`).
		         *
		         * However, if you are building a more complex UI requiring the nesting
		         * of mixers within mixers, you will most likely want to limit targets to
		         * immediate children of the container by setting this property to `false`.
		         *
		         * @example <caption>Example: Restricting targets to immediate children</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     layout: {
		         *         allowNestedTargets: false
		         *     }
		         * });
		         *
		         * @name        allowNestedTargets
		         * @memberof    mixitup.Config.layout
		         * @instance
		         * @type        {boolean}
		         * @default     true
		         */

		        this.allowNestedTargets = true;

		        /**
		         * A string specifying an optional class name to apply to the container when in
		         * its default state.
		         *
		         * By changing this class name or adding a class name to the container via the
		         * `.changeLayout()` API method, the CSS layout of the container can be changed,
		         * and MixItUp will attemp to gracefully animate the container and its targets
		         * between states.
		         *
		         * @example <caption>Example 1: Specifying a container class name</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     layout: {
		         *         containerClassName: 'grid'
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Changing the default class name with `.changeLayout()`</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     layout: {
		         *         containerClassName: 'grid'
		         *     }
		         * });
		         *
		         * mixer.changeLayout('list')
		         *     .then(function(state) {
		         *          console.log(state.activeContainerClass); // "list"
		         *     });
		         *
		         * @name        containerClassName
		         * @memberof    mixitup.Config.layout
		         * @instance
		         * @type        {string}
		         * @default     ''
		         */

		        this.containerClassName = '';

		        /**
		         * A reference to a non-target sibling element after which to insert targets
		         * when there are no targets in the container.
		         *
		         * @example <caption>Example: Setting a `siblingBefore` reference element</caption>
		         *
		         * var addButton = containerEl.querySelector('button');
		         *
		         * var mixer = mixitup(containerEl, {
		         *     layout: {
		         *         siblingBefore: addButton
		         *     }
		         * });
		         *
		         * @name        siblingBefore
		         * @memberof    mixitup.Config.layout
		         * @instance
		         * @type        {HTMLElement}
		         * @default     null
		         */

		        this.siblingBefore = null;

		        /**
		         * A reference to a non-target sibling element before which to insert targets
		         * when there are no targets in the container.
		         *
		         * @example <caption>Example: Setting an `siblingAfter` reference element</caption>
		         *
		         * var gap = containerEl.querySelector('.gap');
		         *
		         * var mixer = mixitup(containerEl, {
		         *     layout: {
		         *         siblingAfter: gap
		         *     }
		         * });
		         *
		         * @name        siblingAfter
		         * @memberof    mixitup.Config.layout
		         * @instance
		         * @type        {HTMLElement}
		         * @default     null
		         */

		        this.siblingAfter = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigLayout);

		    mixitup.ConfigLayout.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigLayout.prototype.constructor = mixitup.ConfigLayout;

		    /**
		     * A group of properties defining the initial state of the mixer on load (instantiation).
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        load
		     * @namespace
		     * @public
		     * @since       2.0.0
		     */

		    mixitup.ConfigLoad = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A string defining any filtering to be statically applied to the mixer on load.
		         * As per the `.filter()` API, this can be any valid selector string, or the
		         * values `'all'` or `'none'`.
		         *
		         * @example <caption>Example 1: Defining an initial filter selector to be applied on load</caption>
		         *
		         * // The mixer will show only those targets matching '.category-a' on load.
		         *
		         * var mixer = mixitup(containerEl, {
		         *     load: {
		         *         filter: '.category-a'
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Hiding all targets on load</caption>
		         *
		         * // The mixer will show hide all targets on load.
		         *
		         * var mixer = mixitup(containerEl, {
		         *     load: {
		         *         filter: 'none'
		         *     }
		         * });
		         *
		         * @name        filter
		         * @memberof    mixitup.Config.load
		         * @instance
		         * @type        {string}
		         * @default     'all'
		         */

		        this.filter = 'all';

		        /**
		         * A string defining any sorting to be statically applied to the mixer on load.
		         * As per the `.sort()` API, this should be a valid "sort string" made up of
		         * an attribute to sort by (or `'default'`) followed by an optional sorting
		         * order, or the value `'random'`;
		         *
		         * @example <caption>Example: Defining sorting to be applied on load</caption>
		         *
		         * // The mixer will sort the container by the value of the `data-published-date`
		         * // attribute, in descending order.
		         *
		         * var mixer = mixitup(containerEl, {
		         *     load: {
		         *         sort: 'published-date:desc'
		         *     }
		         * });
		         *
		         * @name        sort
		         * @memberof    mixitup.Config.load
		         * @instance
		         * @type        {string}
		         * @default     'default:asc'
		         */

		        this.sort = 'default:asc';

		        /**
		         * An array of objects representing the underlying data of any pre-rendered targets,
		         * when using the `.dataset()` API.
		         *
		         * NB: If targets are pre-rendered when the mixer is instantiated, this must be set.
		         *
		         * @example <caption>Example: Defining the initial underyling dataset</caption>
		         *
		         * var myDataset = [
		         *     {
		         *         id: 0,
		         *         title: "Blog Post Title 0",
		         *         ...
		         *     },
		         *     {
		         *         id: 1,
		         *         title: "Blog Post Title 1",
		         *         ...
		         *     }
		         * ];
		         *
		         * var mixer = mixitup(containerEl, {
		         *     data: {
		         *         uidKey: 'id'
		         *     },
		         *     load: {
		         *         dataset: myDataset
		         *     }
		         * });
		         *
		         * @name        dataset
		         * @memberof    mixitup.Config.load
		         * @instance
		         * @type        {Array.<object>}
		         * @default     null
		         */

		        this.dataset = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigLoad);

		    mixitup.ConfigLoad.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigLoad.prototype.constructor = mixitup.ConfigLoad;

		    /**
		     * A group of properties defining the selectors used to query elements within a mixitup container.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        selectors
		     * @namespace
		     * @public
		     * @since       3.0.0
		     */

		    mixitup.ConfigSelectors = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A selector string used to query and index target elements within the container.
		         *
		         * By default, the class selector `'.mix'` is used, but this can be changed to an
		         * attribute or element selector to match the style of your project.
		         *
		         * @example <caption>Example 1: Changing the target selector</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     selectors: {
		         *         target: '.portfolio-item'
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Using an attribute selector as a target selector</caption>
		         *
		         * // The mixer will search for any children with the attribute `data-ref="mix"`
		         *
		         * var mixer = mixitup(containerEl, {
		         *     selectors: {
		         *         target: '[data-ref="mix"]'
		         *     }
		         * });
		         *
		         * @name        target
		         * @memberof    mixitup.Config.selectors
		         * @instance
		         * @type        {string}
		         * @default     '.mix'
		         */

		        this.target = '.mix';

		        /**
		         * A optional selector string used to add further specificity to the querying of control elements,
		         * in addition to their mandatory data attribute (e.g. `data-filter`, `data-toggle`, `data-sort`).
		         *
		         * This can be used if other elements in your document must contain the above attributes
		         * (e.g. for use in third-party scripts), and would otherwise interfere with MixItUp. Adding
		         * an additional `control` selector of your choice allows MixItUp to restrict event handling
		         * to only those elements matching the defined selector.
		         *
		         * @name        control
		         * @memberof    mixitup.Config.selectors
		         * @instance
		         * @type        {string}
		         * @default     ''
		         *
		         * @example <caption>Example 1: Adding a `selectors.control` selector</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     selectors: {
		         *         control: '.mixitup-control'
		         *     }
		         * });
		         *
		         * // Will not be handled:
		         * // <button data-filter=".category-a"></button>
		         *
		         * // Will be handled:
		         * // <button class="mixitup-control" data-filter=".category-a"></button>
		         */

		        this.control = '';

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigSelectors);

		    mixitup.ConfigSelectors.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigSelectors.prototype.constructor = mixitup.ConfigSelectors;

		    /**
		     * A group of optional render functions for creating and updating elements.
		     *
		     * All render functions receive a data object, and should return a valid HTML string.
		     *
		     * @constructor
		     * @memberof    mixitup.Config
		     * @name        render
		     * @namespace
		     * @public
		     * @since       3.0.0
		     */

		    mixitup.ConfigRender = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A function returning an HTML string representing a target element, or a reference to a
		         * single DOM element.
		         *
		         * The function is invoked as part of the `.dataset()` API, whenever a new item is added
		         * to the dataset, or an item in the dataset changes (if `dataset.dirtyCheck` is enabled).
		         *
		         * The function receives the relevant dataset item as its first parameter.
		         *
		         * @example <caption>Example 1: Using string concatenation</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     render: {
		         *         target: function(item) {
		         *             return (
		         *                 '&lt;div class="mix"&gt;' +
		         *                     '&lt;h2&gt;' + item.title + '&lt;/h2&gt;' +
		         *                 '&lt;/div&gt;'
		         *             );
		         *         }
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Using an ES2015 template literal</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     render: {
		         *         target: function(item) {
		         *             return (
		         *                 `&lt;div class="mix"&gt;
		         *                     &lt;h2&gt;${item.title}&lt;/h2&gt;
		         *                  &lt;/div&gt;`
		         *             );
		         *         }
		         *     }
		         * });
		         *
		         * @example <caption>Example 3: Using a Handlebars template</caption>
		         *
		         * var targetTemplate = Handlebars.compile('&lt;div class="mix"&gt;&lt;h2&gt;{{title}}&lt;/h2&gt;&lt;/div&gt;');
		         *
		         * var mixer = mixitup(containerEl, {
		         *     render: {
		         *         target: targetTemplate
		         *     }
		         * });
		         *
		         * @example <caption>Example 4: Returning a DOM element</caption>
		         *
		         * var mixer = mixitup(containerEl, {
		         *     render: {
		         *         target: function(item) {
		         *              // Create a single element using your framework's built-in renderer
		         *
		         *              var el = ...
		         *
		         *              return el;
		         *         }
		         *     }
		         * });
		         *
		         * @name        target
		         * @memberof    mixitup.Config.render
		         * @instance
		         * @type        {function}
		         * @default     'null'
		         */

		        this.target = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigRender);

		    mixitup.ConfigRender.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigRender.prototype.constructor = mixitup.ConfigRender;

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.ConfigTemplates = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ConfigTemplates);

		    mixitup.ConfigTemplates.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ConfigTemplates.prototype.constructor = mixitup.ConfigTemplates;

		    /**
		     * `mixitup.Config` is an interface used for customising the functionality of a
		     * mixer instance. It is organised into several semantically distinct sub-objects,
		     * each one pertaining to a particular aspect of MixItUp functionality.
		     *
		     * An object literal containing any or all of the available properies,
		     * known as the "configuration object", can be passed as the second parameter to
		     * the `mixitup` factory function when creating a mixer instance to customise its
		     * functionality as needed.
		     *
		     * If no configuration object is passed, the mixer instance will take on the default
		     * configuration values detailed below.
		     *
		     * @example <caption>Example 1: Creating and passing the configuration object</caption>
		     * // Create a configuration object with desired values
		     *
		     * var config = {
		     *     animation: {
		     *         enable: false
		     *     },
		     *     selectors: {
		     *         target: '.item'
		     *     }
		     * };
		     *
		     * // Pass the configuration object to the mixitup factory function
		     *
		     * var mixer = mixitup(containerEl, config);
		     *
		     * @example <caption>Example 2: Passing the configuration object inline</caption>
		     * // Typically, the configuration object is passed inline for brevity.
		     *
		     * var mixer = mixitup(containerEl, {
		     *     controls: {
		     *         live: true,
		     *         toggleLogic: 'and'
		     *     }
		     * });
		     *
		     *
		     * @constructor
		     * @memberof    mixitup
		     * @namespace
		     * @public
		     * @since       2.0.0
		     */

		    mixitup.Config = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.animation          = new mixitup.ConfigAnimation();
		        this.behavior           = new mixitup.ConfigBehavior();
		        this.callbacks          = new mixitup.ConfigCallbacks();
		        this.controls           = new mixitup.ConfigControls();
		        this.classNames         = new mixitup.ConfigClassNames();
		        this.data               = new mixitup.ConfigData();
		        this.debug              = new mixitup.ConfigDebug();
		        this.layout             = new mixitup.ConfigLayout();
		        this.load               = new mixitup.ConfigLoad();
		        this.selectors          = new mixitup.ConfigSelectors();
		        this.render             = new mixitup.ConfigRender();
		        this.templates          = new mixitup.ConfigTemplates();

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.Config);

		    mixitup.Config.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.Config.prototype.constructor = mixitup.Config;

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.MixerDom = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.document               = null;
		        this.body                   = null;
		        this.container              = null;
		        this.parent                 = null;
		        this.targets                = [];

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.MixerDom);

		    mixitup.MixerDom.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.MixerDom.prototype.constructor = mixitup.MixerDom;

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.UiClassNames = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.base       = '';
		        this.active     = '';
		        this.disabled   = '';

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.UiClassNames);

		    mixitup.UiClassNames.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.UiClassNames.prototype.constructor = mixitup.UiClassNames;

		    /**
		     * An object into which all arbitrary arguments sent to '.dataset()' are mapped.
		     *
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.CommandDataset = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.dataset = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.CommandDataset);

		    mixitup.CommandDataset.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.CommandDataset.prototype.constructor = mixitup.CommandDataset;

		    /**
		     * An object into which all arbitrary arguments sent to '.multimix()' are mapped.
		     *
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.CommandMultimix = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.filter       = null;
		        this.sort         = null;
		        this.insert       = null;
		        this.remove       = null;
		        this.changeLayout = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.CommandMultimix);

		    mixitup.CommandMultimix.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.CommandMultimix.prototype.constructor = mixitup.CommandMultimix;

		    /**
		     * An object into which all arbitrary arguments sent to '.filter()' are mapped.
		     *
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.CommandFilter = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.selector   = '';
		        this.collection = null;
		        this.action     = 'show'; // enum: ['show', 'hide']

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.CommandFilter);

		    mixitup.CommandFilter.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.CommandFilter.prototype.constructor = mixitup.CommandFilter;

		    /**
		     * An object into which all arbitrary arguments sent to '.sort()' are mapped.
		     *
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.CommandSort = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.sortString = '';
		        this.attribute  = '';
		        this.order      = 'asc';
		        this.collection = null;
		        this.next       = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.CommandSort);

		    mixitup.CommandSort.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.CommandSort.prototype.constructor = mixitup.CommandSort;

		    /**
		     * An object into which all arbitrary arguments sent to '.insert()' are mapped.
		     *
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.CommandInsert = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.index      = 0;
		        this.collection = [];
		        this.position   = 'before'; // enum: ['before', 'after']
		        this.sibling    = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.CommandInsert);

		    mixitup.CommandInsert.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.CommandInsert.prototype.constructor = mixitup.CommandInsert;

		    /**
		     * An object into which all arbitrary arguments sent to '.remove()' are mapped.
		     *
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.CommandRemove = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.targets    = [];
		        this.collection = [];

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.CommandRemove);

		    mixitup.CommandRemove.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.CommandRemove.prototype.constructor = mixitup.CommandRemove;

		    /**
		     * An object into which all arbitrary arguments sent to '.changeLayout()' are mapped.
		     *
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.CommandChangeLayout = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.containerClassName = '';

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.CommandChangeLayout);

		    mixitup.CommandChangeLayout.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.CommandChangeLayout.prototype.constructor = mixitup.CommandChangeLayout;

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     * @param       {string}        type
		     * @param       {string}        selector
		     * @param       {boolean}       [live]
		     * @param       {string}        [parent]
		     *     An optional string representing the name of the mixer.dom property containing a reference to a parent element.
		     */

		    mixitup.ControlDefinition = function(type, selector, live, parent) {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.type    = type;
		        this.selector  = selector;
		        this.live      = live || false;
		        this.parent    = parent || '';

		        this.callActions('afterConstruct');

		        h.freeze(this);
		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.ControlDefinition);

		    mixitup.ControlDefinition.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.ControlDefinition.prototype.constructor = mixitup.ControlDefinition;

		    mixitup.controlDefinitions = [];

		    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('multimix', '[data-filter][data-sort]'));
		    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('filter', '[data-filter]'));
		    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('sort', '[data-sort]'));
		    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('toggle', '[data-toggle]'));

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.Control = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.el         = null;
		        this.selector   = '';
		        this.bound      = [];
		        this.pending    = -1;
		        this.type       = '';
		        this.status     = 'inactive'; // enum: ['inactive', 'active', 'disabled', 'live']
		        this.filter     = '';
		        this.sort       = '';
		        this.canDisable = false;
		        this.handler    = null;
		        this.classNames = new mixitup.UiClassNames();

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.Control);

		    mixitup.Control.prototype = Object.create(mixitup.Base.prototype);

		    h.extend(mixitup.Control.prototype,
		    /** @lends mixitup.Control */
		    {
		        constructor: mixitup.Control,

		        /**
		         * @private
		         * @param {HTMLElement} el
		         * @param {string}      type
		         * @param {string}      selector
		         */

		        init: function(el, type, selector) {
		            var self = this;

		            this.callActions('beforeInit', arguments);

		            self.el         = el;
		            self.type       = type;
		            self.selector   = selector;

		            if (self.selector) {
		                self.status = 'live';
		            } else {
		                self.canDisable = typeof self.el.disable === 'boolean';

		                switch (self.type) {
		                    case 'filter':
		                        self.filter = self.el.getAttribute('data-filter');

		                        break;
		                    case 'toggle':
		                        self.filter = self.el.getAttribute('data-toggle');

		                        break;
		                    case 'sort':
		                        self.sort   = self.el.getAttribute('data-sort');

		                        break;
		                    case 'multimix':
		                        self.filter = self.el.getAttribute('data-filter');
		                        self.sort   = self.el.getAttribute('data-sort');

		                        break;
		                }
		            }

		            self.bindClick();

		            mixitup.controls.push(self);

		            this.callActions('afterInit', arguments);
		        },

		        /**
		         * @private
		         * @param  {mixitup.Mixer} mixer
		         * @return {boolean}
		         */

		        isBound: function(mixer) {
		            var self    = this,
		                isBound = false;

		            this.callActions('beforeIsBound', arguments);

		            isBound = self.bound.indexOf(mixer) > -1;

		            return self.callFilters('afterIsBound', isBound, arguments);
		        },

		        /**
		         * @private
		         * @param  {mixitup.Mixer} mixer
		         * @return {void}
		         */

		        addBinding: function(mixer) {
		            var self = this;

		            this.callActions('beforeAddBinding', arguments);

		            if (!self.isBound()) {
		                self.bound.push(mixer);
		            }

		            this.callActions('afterAddBinding', arguments);
		        },

		        /**
		         * @private
		         * @param  {mixitup.Mixer} mixer
		         * @return {void}
		         */

		        removeBinding: function(mixer) {
		            var self        = this,
		                removeIndex = -1;

		            this.callActions('beforeRemoveBinding', arguments);

		            if ((removeIndex = self.bound.indexOf(mixer)) > -1) {
		                self.bound.splice(removeIndex, 1);
		            }

		            if (self.bound.length < 1) {
		                // No bindings exist, unbind event click handlers

		                self.unbindClick();

		                // Remove from `mixitup.controls` list

		                removeIndex = mixitup.controls.indexOf(self);

		                mixitup.controls.splice(removeIndex, 1);

		                if (self.status === 'active') {
		                    self.renderStatus(self.el, 'inactive');
		                }
		            }

		            this.callActions('afterRemoveBinding', arguments);
		        },

		        /**
		         * @private
		         * @return {void}
		         */

		        bindClick: function() {
		            var self = this;

		            this.callActions('beforeBindClick', arguments);

		            self.handler = function(e) {
		                self.handleClick(e);
		            };

		            h.on(self.el, 'click', self.handler);

		            this.callActions('afterBindClick', arguments);
		        },

		        /**
		         * @private
		         * @return {void}
		         */

		        unbindClick: function() {
		            var self = this;

		            this.callActions('beforeUnbindClick', arguments);

		            h.off(self.el, 'click', self.handler);

		            self.handler = null;

		            this.callActions('afterUnbindClick', arguments);
		        },

		        /**
		         * @private
		         * @param   {MouseEvent} e
		         * @return  {void}
		         */

		        handleClick: function(e) {
		            var self        = this,
		                button      = null,
		                mixer       = null,
		                isActive    = false,
		                returnValue = void(0),
		                command     = {},
		                clone       = null,
		                commands    = [],
		                i           = -1;

		            this.callActions('beforeHandleClick', arguments);

		            this.pending = 0;

		            mixer = self.bound[0];

		            if (!self.selector) {
		                button = self.el;
		            } else {
		                button = h.closestParent(e.target, mixer.config.selectors.control + self.selector, true, mixer.dom.document);
		            }

		            if (!button) {
		                self.callActions('afterHandleClick', arguments);

		                return;
		            }

		            switch (self.type) {
		                case 'filter':
		                    command.filter = self.filter || button.getAttribute('data-filter');

		                    break;
		                case 'sort':
		                    command.sort = self.sort || button.getAttribute('data-sort');

		                    break;
		                case 'multimix':
		                    command.filter  = self.filter || button.getAttribute('data-filter');
		                    command.sort    = self.sort || button.getAttribute('data-sort');

		                    break;
		                case 'toggle':
		                    command.filter  = self.filter || button.getAttribute('data-toggle');

		                    if (self.status === 'live') {
		                        isActive = h.hasClass(button, self.classNames.active);
		                    } else {
		                        isActive = self.status === 'active';
		                    }

		                    break;
		            }

		            for (i = 0; i < self.bound.length; i++) {
		                // Create a clone of the command for each bound mixer instance

		                clone = new mixitup.CommandMultimix();

		                h.extend(clone, command);

		                commands.push(clone);
		            }

		            commands = self.callFilters('commandsHandleClick', commands, arguments);

		            self.pending = self.bound.length;

		            for (i = 0; mixer = self.bound[i]; i++) {
		                command = commands[i];

		                if (!command) {
		                    // An extension may set a command null to indicate that the click should not be handled

		                    continue;
		                }

		                if (!mixer.lastClicked) {
		                    mixer.lastClicked = button;
		                }

		                mixitup.events.fire('mixClick', mixer.dom.container, {
		                    state: mixer.state,
		                    instance: mixer,
		                    originalEvent: e,
		                    control: mixer.lastClicked
		                }, mixer.dom.document);

		                if (typeof mixer.config.callbacks.onMixClick === 'function') {
		                    returnValue = mixer.config.callbacks.onMixClick.call(mixer.lastClicked, mixer.state, e, mixer);

		                    if (returnValue === false) {
		                        // User has returned `false` from the callback, so do not handle click

		                        continue;
		                    }
		                }

		                if (self.type === 'toggle') {
		                    isActive ? mixer.toggleOff(command.filter) : mixer.toggleOn(command.filter);
		                } else {
		                    mixer.multimix(command);
		                }
		            }

		            this.callActions('afterHandleClick', arguments);
		        },

		        /**
		         * @param   {object}          command
		         * @param   {Array<string>}   toggleArray
		         * @return  {void}
		         */

		        update: function(command, toggleArray) {
		            var self    = this,
		                actions = new mixitup.CommandMultimix();

		            self.callActions('beforeUpdate', arguments);

		            self.pending--;

		            self.pending = Math.max(0, self.pending);

		            if (self.pending > 0) return;

		            if (self.status === 'live') {
		                // Live control (status unknown)

		                self.updateLive(command, toggleArray);
		            } else {
		                // Static control

		                actions.sort    = self.sort;
		                actions.filter  = self.filter;

		                self.callFilters('actionsUpdate', actions, arguments);

		                self.parseStatusChange(self.el, command, actions, toggleArray);
		            }

		            self.callActions('afterUpdate', arguments);
		        },

		        /**
		         * @param   {mixitup.CommandMultimix} command
		         * @param   {Array<string>}           toggleArray
		         * @return  {void}
		         */

		        updateLive: function(command, toggleArray) {
		            var self            = this,
		                controlButtons  = null,
		                actions         = null,
		                button          = null,
		                i               = -1;

		            self.callActions('beforeUpdateLive', arguments);

		            if (!self.el) return;

		            controlButtons = self.el.querySelectorAll(self.selector);

		            for (i = 0; button = controlButtons[i]; i++) {
		                actions = new mixitup.CommandMultimix();

		                switch (self.type) {
		                    case 'filter':
		                        actions.filter = button.getAttribute('data-filter');

		                        break;
		                    case 'sort':
		                        actions.sort = button.getAttribute('data-sort');

		                        break;
		                    case 'multimix':
		                        actions.filter  = button.getAttribute('data-filter');
		                        actions.sort    = button.getAttribute('data-sort');

		                        break;
		                    case 'toggle':
		                        actions.filter  = button.getAttribute('data-toggle');

		                        break;
		                }

		                actions = self.callFilters('actionsUpdateLive', actions, arguments);

		                self.parseStatusChange(button, command, actions, toggleArray);
		            }

		            self.callActions('afterUpdateLive', arguments);
		        },

		        /**
		         * @param   {HTMLElement}             button
		         * @param   {mixitup.CommandMultimix} command
		         * @param   {mixitup.CommandMultimix} actions
		         * @param   {Array<string>}           toggleArray
		         * @return  {void}
		         */

		        parseStatusChange: function(button, command, actions, toggleArray) {
		            var self    = this,
		                alias   = '',
		                toggle  = '',
		                i       = -1;

		            self.callActions('beforeParseStatusChange', arguments);

		            switch (self.type) {
		                case 'filter':
		                    if (command.filter === actions.filter) {
		                        self.renderStatus(button, 'active');
		                    } else {
		                        self.renderStatus(button, 'inactive');
		                    }

		                    break;
		                case 'multimix':
		                    if (command.sort === actions.sort && command.filter === actions.filter) {
		                        self.renderStatus(button, 'active');
		                    } else {
		                        self.renderStatus(button, 'inactive');
		                    }

		                    break;
		                case 'sort':
		                    if (command.sort.match(/:asc/g)) {
		                        alias = command.sort.replace(/:asc/g, '');
		                    }

		                    if (command.sort === actions.sort || alias === actions.sort) {
		                        self.renderStatus(button, 'active');
		                    } else {
		                        self.renderStatus(button, 'inactive');
		                    }

		                    break;
		                case 'toggle':
		                    if (toggleArray.length < 1) self.renderStatus(button, 'inactive');

		                    if (command.filter === actions.filter) {
		                        self.renderStatus(button, 'active');
		                    }

		                    for (i = 0; i < toggleArray.length; i++) {
		                        toggle = toggleArray[i];

		                        if (toggle === actions.filter) {
		                            // Button matches one active toggle

		                            self.renderStatus(button, 'active');

		                            break;
		                        }

		                        self.renderStatus(button, 'inactive');
		                    }

		                    break;
		            }

		            self.callActions('afterParseStatusChange', arguments);
		        },

		        /**
		         * @param   {HTMLElement}   button
		         * @param   {string}        status
		         * @return  {void}
		         */

		        renderStatus: function(button, status) {
		            var self = this;

		            self.callActions('beforeRenderStatus', arguments);

		            switch (status) {
		                case 'active':
		                    h.addClass(button, self.classNames.active);
		                    h.removeClass(button, self.classNames.disabled);

		                    if (self.canDisable) self.el.disabled = false;

		                    break;
		                case 'inactive':
		                    h.removeClass(button, self.classNames.active);
		                    h.removeClass(button, self.classNames.disabled);

		                    if (self.canDisable) self.el.disabled = false;

		                    break;
		                case 'disabled':
		                    if (self.canDisable) self.el.disabled = true;

		                    h.addClass(button, self.classNames.disabled);
		                    h.removeClass(button, self.classNames.active);

		                    break;
		            }

		            if (self.status !== 'live') {
		                // Update the control's status propery if not live

		                self.status = status;
		            }

		            self.callActions('afterRenderStatus', arguments);
		        }
		    });

		    mixitup.controls = [];

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.StyleData = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.x              = 0;
		        this.y              = 0;
		        this.top            = 0;
		        this.right          = 0;
		        this.bottom         = 0;
		        this.left           = 0;
		        this.width          = 0;
		        this.height         = 0;
		        this.marginRight    = 0;
		        this.marginBottom   = 0;
		        this.opacity        = 0;
		        this.scale          = new mixitup.TransformData();
		        this.translateX     = new mixitup.TransformData();
		        this.translateY     = new mixitup.TransformData();
		        this.translateZ     = new mixitup.TransformData();
		        this.rotateX        = new mixitup.TransformData();
		        this.rotateY        = new mixitup.TransformData();
		        this.rotateZ        = new mixitup.TransformData();

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.StyleData);

		    mixitup.StyleData.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.StyleData.prototype.constructor = mixitup.StyleData;

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.TransformData = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.value  = 0;
		        this.unit   = '';

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.TransformData);

		    mixitup.TransformData.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.TransformData.prototype.constructor = mixitup.TransformData;

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.TransformDefaults = function() {
		        mixitup.StyleData.apply(this);

		        this.callActions('beforeConstruct');

		        this.scale.value        = 0.01;
		        this.scale.unit         = '';

		        this.translateX.value   = 20;
		        this.translateX.unit    = 'px';

		        this.translateY.value   = 20;
		        this.translateY.unit    = 'px';

		        this.translateZ.value   = 20;
		        this.translateZ.unit    = 'px';

		        this.rotateX.value      = 90;
		        this.rotateX.unit       = 'deg';

		        this.rotateY.value      = 90;
		        this.rotateY.unit       = 'deg';

		        this.rotateX.value      = 90;
		        this.rotateX.unit       = 'deg';

		        this.rotateZ.value      = 180;
		        this.rotateZ.unit       = 'deg';

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.TransformDefaults);

		    mixitup.TransformDefaults.prototype = Object.create(mixitup.StyleData.prototype);

		    mixitup.TransformDefaults.prototype.constructor = mixitup.TransformDefaults;

		    /**
		     * @private
		     * @static
		     * @since   3.0.0
		     * @type    {mixitup.TransformDefaults}
		     */

		    mixitup.transformDefaults = new mixitup.TransformDefaults();

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.EventDetail = function() {
		        this.state          = null;
		        this.futureState    = null;
		        this.instance       = null;
		        this.originalEvent  = null;
		    };

		    /**
		     * The `mixitup.Events` class contains all custom events dispatched by MixItUp at various
		     * points within the lifecycle of a mixer operation.
		     *
		     * Each event is analogous to the callback function of the same name defined in
		     * the `callbacks` configuration object, and is triggered immediately before it.
		     *
		     * Events are always triggered from the container element on which MixItUp is instantiated
		     * upon.
		     *
		     * As with any event, registered event handlers receive the event object as a parameter
		     * which includes a `detail` property containting references to the current `state`,
		     * the `mixer` instance, and other event-specific properties described below.
		     *
		     * @constructor
		     * @namespace
		     * @memberof    mixitup
		     * @public
		     * @since       3.0.0
		     */

		    mixitup.Events = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * A custom event triggered immediately after any MixItUp operation is requested
		         * and before animations have begun.
		         *
		         * The `mixStart` event also exposes a `futureState` property via the
		         * `event.detail` object, which represents the final state of the mixer once
		         * the requested operation has completed.
		         *
		         * @name        mixStart
		         * @memberof    mixitup.Events
		         * @static
		         * @type        {CustomEvent}
		         */

		        this.mixStart = null;

		        /**
		         * A custom event triggered when a MixItUp operation is requested while another
		         * operation is in progress, and the animation queue is full, or queueing
		         * is disabled.
		         *
		         * @name        mixBusy
		         * @memberof    mixitup.Events
		         * @static
		         * @type        {CustomEvent}
		         */

		        this.mixBusy = null;

		        /**
		         * A custom event triggered after any MixItUp operation has completed, and the
		         * state has been updated.
		         *
		         * @name        mixEnd
		         * @memberof    mixitup.Events
		         * @static
		         * @type        {CustomEvent}
		         */

		        this.mixEnd = null;

		        /**
		         * A custom event triggered whenever a filter operation "fails", i.e. no targets
		         * could be found matching the requested filter.
		         *
		         * @name        mixFail
		         * @memberof    mixitup.Events
		         * @static
		         * @type        {CustomEvent}
		         */

		        this.mixFail = null;

		        /**
		         * A custom event triggered whenever a MixItUp control is clicked, and before its
		         * respective operation is requested.
		         *
		         * This event also exposes an `originalEvent` property via the `event.detail`
		         * object, which holds a reference to the original click event.
		         *
		         * @name        mixClick
		         * @memberof    mixitup.Events
		         * @static
		         * @type        {CustomEvent}
		         */

		        this.mixClick = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.Events);

		    mixitup.Events.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.Events.prototype.constructor = mixitup.Events;

		    /**
		     * @private
		     * @param   {string}      eventType
		     * @param   {Element}     el
		     * @param   {object}      detail
		     * @param   {Document}    [doc]
		     */

		    mixitup.Events.prototype.fire = function(eventType, el, detail, doc) {
		        var self        = this,
		            event       = null,
		            eventDetail = new mixitup.EventDetail();

		        self.callActions('beforeFire', arguments);

		        if (typeof self[eventType] === 'undefined') {
		            throw new Error('Event type "' + eventType + '" not found.');
		        }

		        eventDetail.state = new mixitup.State();

		        h.extend(eventDetail.state, detail.state);

		        if (detail.futureState) {
		            eventDetail.futureState = new mixitup.State();

		            h.extend(eventDetail.futureState, detail.futureState);
		        }

		        eventDetail.instance = detail.instance;

		        if (detail.originalEvent) {
		            eventDetail.originalEvent = detail.originalEvent;
		        }

		        event = h.getCustomEvent(eventType, eventDetail, doc);

		        self.callFilters('eventFire', event, arguments);

		        el.dispatchEvent(event);
		    };

		    // Asign a singleton instance to `mixitup.events`:

		    mixitup.events = new mixitup.Events();

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.QueueItem = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.args           = [];
		        this.instruction    = null;
		        this.triggerElement = null;
		        this.deferred       = null;
		        this.isToggling     = false;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.QueueItem);

		    mixitup.QueueItem.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.QueueItem.prototype.constructor = mixitup.QueueItem;

		    /**
		     * The `mixitup.Mixer` class is used to hold discreet, user-configured
		     * instances of MixItUp on a provided container element.
		     *
		     * Mixer instances are returned whenever the `mixitup()` factory function is called,
		     * which expose a range of methods enabling API-based filtering, sorting,
		     * insertion, removal and more.
		     *
		     * @constructor
		     * @namespace
		     * @memberof    mixitup
		     * @public
		     * @since       3.0.0
		     */

		    mixitup.Mixer = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.config            = new mixitup.Config();

		        this.id                = '';

		        this.isBusy            = false;
		        this.isToggling        = false;
		        this.incPadding        = true;

		        this.controls          = [];
		        this.targets           = [];
		        this.origOrder         = [];
		        this.cache             = {};

		        this.toggleArray       = [];

		        this.targetsMoved      = 0;
		        this.targetsImmovable  = 0;
		        this.targetsBound      = 0;
		        this.targetsDone       = 0;

		        this.staggerDuration   = 0;
		        this.effectsIn         = null;
		        this.effectsOut        = null;
		        this.transformIn       = [];
		        this.transformOut      = [];
		        this.queue             = [];

		        this.state             = null;
		        this.lastOperation     = null;
		        this.lastClicked       = null;
		        this.userCallback      = null;
		        this.userDeferred      = null;

		        this.dom               = new mixitup.MixerDom();

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.Mixer);

		    mixitup.Mixer.prototype = Object.create(mixitup.Base.prototype);

		    h.extend(mixitup.Mixer.prototype,
		    /** @lends mixitup.Mixer */
		    {
		        constructor: mixitup.Mixer,

		        /**
		         * @private
		         * @instance
		         * @since 3.0.0
		         * @param {HTMLElement} container
		         * @param {HTMLElement} document
		         * @param {string}      id
		         * @param {object}      [config]
		         */

		        attach: function(container, document, id, config) {
		            var self    = this,
		                target  = null,
		                i       = -1;

		            self.callActions('beforeAttach', arguments);

		            self.id = id;

		            if (config) {
		                h.extend(self.config, config, true, true);
		            }

		            self.sanitizeConfig();

		            self.cacheDom(container, document);

		            if (self.config.layout.containerClassName) {
		                h.addClass(self.dom.container, self.config.layout.containerClassName);
		            }

		            if (!mixitup.features.has.transitions) {
		                self.config.animation.enable = false;
		            }

		            if (typeof window.console === 'undefined') {
		                self.config.debug.showWarnings = false;
		            }

		            if (self.config.data.uidKey) {
		                // If the dataset API is in use, force disable controls

		                self.config.controls.enable = false;
		            }

		            self.indexTargets();

		            self.state = self.getInitialState();

		            for (i = 0; target = self.lastOperation.toHide[i]; i++) {
		                target.hide();
		            }

		            if (self.config.controls.enable) {
		                self.initControls();

		                self.buildToggleArray(null, self.state);

		                self.updateControls({
		                    filter: self.state.activeFilter,
		                    sort: self.state.activeSort
		                });
		            }

		            self.parseEffects();

		            self.callActions('afterAttach', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since 3.0.0
		         * @return {void}
		         */

		        sanitizeConfig: function() {
		            var self = this;

		            self.callActions('beforeSanitizeConfig', arguments);

		            // Sanitize enum/string config options

		            self.config.controls.scope          = self.config.controls.scope.toLowerCase().trim();
		            self.config.controls.toggleLogic    = self.config.controls.toggleLogic.toLowerCase().trim();
		            self.config.controls.toggleDefault  = self.config.controls.toggleDefault.toLowerCase().trim();

		            self.config.animation.effects       = self.config.animation.effects.trim();

		            self.callActions('afterSanitizeConfig', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @return  {mixitup.State}
		         */

		        getInitialState: function() {
		            var self        = this,
		                state       = new mixitup.State(),
		                operation   = new mixitup.Operation();

		            self.callActions('beforeGetInitialState', arguments);

		            // Map initial values into a mock state object in order to construct an operation

		            state.activeContainerClassName = self.config.layout.containerClassName;

		            if (self.config.load.dataset) {
		                // Dataset API

		                if (!self.config.data.uidKey || typeof self.config.data.uidKey !== 'string') {
		                    throw new TypeError(mixitup.messages.errorConfigDataUidKeyNotSet());
		                }

		                operation.startDataset = operation.newDataset = state.activeDataset = self.config.load.dataset.slice();
		                operation.startContainerClassName = operation.newContainerClassName = state.activeContainerClassName;
		                operation.show = self.targets.slice();

		                state = self.callFilters('stateGetInitialState', state, arguments);
		            } else {
		                // DOM API

		                state.activeFilter              = self.parseFilterArgs([self.config.load.filter]).command;
		                state.activeSort                = self.parseSortArgs([self.config.load.sort]).command;
		                state.totalTargets              = self.targets.length;

		                state = self.callFilters('stateGetInitialState', state, arguments);

		                if (
		                    state.activeSort.collection || state.activeSort.attribute ||
		                    state.activeSort.order === 'random' || state.activeSort.order === 'desc'
		                ) {
		                    // Sorting on load

		                    operation.newSort = state.activeSort;

		                    self.sortOperation(operation);

		                    self.printSort(false, operation);

		                    self.targets = operation.newOrder;
		                } else {
		                    operation.startOrder = operation.newOrder = self.targets;
		                }

		                operation.startFilter               = operation.newFilter               = state.activeFilter;
		                operation.startSort                 = operation.newSort                 = state.activeSort;
		                operation.startContainerClassName   = operation.newContainerClassName   = state.activeContainerClassName;

		                if (operation.newFilter.selector === 'all') {
		                    operation.newFilter.selector = self.config.selectors.target;
		                } else if (operation.newFilter.selector === 'none') {
		                    operation.newFilter.selector = '';
		                }
		            }

		            operation = self.callFilters('operationGetInitialState', operation, [state]);

		            self.lastOperation = operation;

		            if (operation.newFilter) {
		                self.filterOperation(operation);
		            }

		            state = self.buildState(operation);

		            return state;
		        },

		        /**
		         * Caches references of DOM elements neccessary for the mixer's functionality.
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {HTMLElement}       el
		         * @param   {HTMLHtmlElement}   document
		         * @return  {void}
		         */

		        cacheDom: function(el, document) {
		            var self    = this;

		            self.callActions('beforeCacheDom', arguments);

		            self.dom.document  = document;
		            self.dom.body      = self.dom.document.querySelector('body');
		            self.dom.container = el;
		            self.dom.parent    = el;

		            self.callActions('afterCacheDom', arguments);
		        },

		        /**
		         * Indexes all child elements of the mixer matching the `selectors.target`
		         * selector, instantiating a mixitup.Target for each one.
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @return  {void}
		         */

		        indexTargets: function() {
		            var self            = this,
		                target          = null,
		                el              = null,
		                dataset         = null,
		                i               = -1;

		            self.callActions('beforeIndexTargets', arguments);

		            self.dom.targets = self.config.layout.allowNestedTargets ?
		                self.dom.container.querySelectorAll(self.config.selectors.target) :
		                h.children(self.dom.container, self.config.selectors.target, self.dom.document);

		            self.dom.targets = h.arrayFromList(self.dom.targets);

		            self.targets = [];

		            if ((dataset = self.config.load.dataset) && dataset.length !== self.dom.targets.length) {
		                throw new Error(mixitup.messages.errorDatasetPrerenderedMismatch());
		            }

		            if (self.dom.targets.length) {
		                for (i = 0; el = self.dom.targets[i]; i++) {
		                    target = new mixitup.Target();

		                    target.init(el, self, dataset ? dataset[i] : void(0));

		                    target.isInDom = true;

		                    self.targets.push(target);
		                }

		                self.dom.parent = self.dom.targets[0].parentElement === self.dom.container ?
		                    self.dom.container :
		                    self.dom.targets[0].parentElement;
		            }

		            self.origOrder = self.targets;

		            self.callActions('afterIndexTargets', arguments);
		        },

		        initControls: function() {
		            var self                = this,
		                definition          = '',
		                controlElements     = null,
		                el                  = null,
		                parent              = null,
		                delagators          = null,
		                control             = null,
		                i                   = -1,
		                j                   = -1;

		            self.callActions('beforeInitControls', arguments);

		            switch (self.config.controls.scope) {
		                case 'local':
		                    parent = self.dom.container;

		                    break;
		                case 'global':
		                    parent = self.dom.document;

		                    break;
		                default:
		                    throw new Error(mixitup.messages.errorConfigInvalidControlsScope());
		            }

		            for (i = 0; definition = mixitup.controlDefinitions[i]; i++) {
		                if (self.config.controls.live || definition.live) {
		                    if (definition.parent) {
		                        delagators = self.dom[definition.parent];

		                        if (!delagators || delagators.length < 0) continue;

		                        if (typeof delagators.length !== 'number') {
		                            delagators = [delagators];
		                        }
		                    } else {
		                        delagators = [parent];
		                    }

		                    for (j = 0; (el = delagators[j]); j++) {
		                        control = self.getControl(el,  definition.type, definition.selector);

		                        self.controls.push(control);
		                    }
		                } else {
		                    controlElements = parent.querySelectorAll(self.config.selectors.control + definition.selector);

		                    for (j = 0; (el = controlElements[j]); j++) {
		                        control = self.getControl(el, definition.type, '');

		                        if (!control) continue;

		                        self.controls.push(control);
		                    }
		                }
		            }

		            self.callActions('afterInitControls', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {HTMLElement} el
		         * @param   {string}      type
		         * @param   {string}      selector
		         * @return  {mixitup.Control|null}
		         */

		        getControl: function(el, type, selector) {
		            var self    = this,
		                control = null,
		                i       = -1;

		            self.callActions('beforeGetControl', arguments);

		            if (!selector) {
		                // Static controls only

		                for (i = 0; control = mixitup.controls[i]; i++) {
		                    if (control.el === el && control.isBound(self)) {
		                        // Control already bound to this mixer (as another type).

		                        // NB: This prevents duplicate controls from being registered where a selector
		                        // might collide, eg: "[data-filter]" and "[data-filter][data-sort]"

		                        return self.callFilters('controlGetControl', null, arguments);
		                    } else if (control.el === el && control.type === type && control.selector === selector) {
		                        // Another mixer is already using this control, add this mixer as a binding

		                        control.addBinding(self);

		                        return self.callFilters('controlGetControl', control, arguments);
		                    }
		                }
		            }

		            // Create new control

		            control = new mixitup.Control();

		            control.init(el, type, selector);

		            control.classNames.base     = h.getClassname(self.config.classNames, type);
		            control.classNames.active   = h.getClassname(self.config.classNames, type, self.config.classNames.modifierActive);
		            control.classNames.disabled = h.getClassname(self.config.classNames, type, self.config.classNames.modifierDisabled);

		            // Add a reference to this mixer as a binding

		            control.addBinding(self);

		            return self.callFilters('controlGetControl', control, arguments);
		        },

		        /**
		         * Creates a compound selector by joining the `toggleArray` value as per the
		         * defined toggle logic.
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @return  {string}
		         */

		        getToggleSelector: function() {
		            var self            = this,
		                delineator      = self.config.controls.toggleLogic === 'or' ? ', ' : '',
		                toggleSelector  = '';

		            self.callActions('beforeGetToggleSelector', arguments);

		            self.toggleArray = h.clean(self.toggleArray);

		            toggleSelector = self.toggleArray.join(delineator);

		            if (toggleSelector === '') {
		                toggleSelector = self.config.controls.toggleDefault;
		            }

		            return self.callFilters('selectorGetToggleSelector', toggleSelector, arguments);
		        },

		        /**
		         * Breaks compound selector strings in an array of discreet selectors,
		         * as per the active `controls.toggleLogic` configuration option. Accepts
		         * either a dynamic command object, or a state object.
		         *
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {object}        [command]
		         * @param   {mixitup.State} [state]
		         * @return  {void}
		         */

		        buildToggleArray: function(command, state) {
		            var self                    = this,
		                activeFilterSelector    = '';

		            self.callActions('beforeBuildToggleArray', arguments);

		            if (command && command.filter) {
		                activeFilterSelector = command.filter.selector.replace(/\s/g, '');
		            } else if (state) {
		                activeFilterSelector = state.activeFilter.selector.replace(/\s/g, '');
		            } else {
		                return;
		            }

		            if (activeFilterSelector === self.config.selectors.target || activeFilterSelector === 'all') {
		                activeFilterSelector = '';
		            }

		            if (self.config.controls.toggleLogic === 'or') {
		                self.toggleArray = activeFilterSelector.split(',');
		            } else {
		                self.toggleArray = self.splitCompoundSelector(activeFilterSelector);
		            }

		            self.toggleArray = h.clean(self.toggleArray);

		            self.callActions('afterBuildToggleArray', arguments);
		        },

		        /**
		         * Takes a compound selector (e.g. `.cat-1.cat-2`, `[data-cat="1"][data-cat="2"]`)
		         * and breaks into its individual selectors.
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {string} compoundSelector
		         * @return  {string[]}
		         */

		        splitCompoundSelector: function(compoundSelector) {
		            // Break at a `.` or `[`, capturing the delineator

		            var partials    = compoundSelector.split(/([\.\[])/g),
		                toggleArray = [],
		                selector    = '',
		                i           = -1;

		            if (partials[0] === '') {
		                partials.shift();
		            }

		            for (i = 0; i < partials.length; i++) {
		                if (i % 2 === 0) {
		                    selector = '';
		                }

		                selector += partials[i];

		                if (i % 2 !== 0) {
		                    toggleArray.push(selector);
		                }
		            }

		            return toggleArray;
		        },

		        /**
		         * Updates controls to their active/inactive state based on the command or
		         * current state of the mixer.
		         *
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {object} command
		         * @return  {void}
		         */

		        updateControls: function(command) {
		            var self    = this,
		                control = null,
		                output  = new mixitup.CommandMultimix(),
		                i       = -1;

		            self.callActions('beforeUpdateControls', arguments);

		            // Sanitise to defaults

		            if (command.filter) {
		                output.filter = command.filter.selector;
		            } else {
		                output.filter = self.state.activeFilter.selector;
		            }

		            if (command.sort) {
		                output.sort = self.buildSortString(command.sort);
		            } else {
		                output.sort = self.buildSortString(self.state.activeSort);
		            }

		            if (output.filter === self.config.selectors.target) {
		                output.filter = 'all';
		            }

		            if (output.filter === '') {
		                output.filter = 'none';
		            }

		            h.freeze(output);

		            for (i = 0; control = self.controls[i]; i++) {
		                control.update(output, self.toggleArray);
		            }

		            self.callActions('afterUpdateControls', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {mixitup.CommandSort}   command
		         * @return  {string}
		         */

		        buildSortString: function(command) {
		            var self    = this;
		            var output  = '';

		            output += command.sortString;

		            if (command.next) {
		                output += ' ' + self.buildSortString(command.next);
		            }

		            return output;
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {object}        command
		         * @param   {Operation}     operation
		         * @return  {Promise.<mixitup.State>}
		         */

		        insertTargets: function(command, operation) {
		            var self            = this,
		                nextSibling     = null,
		                insertionIndex  = -1,
		                frag            = null,
		                target          = null,
		                el              = null,
		                i               = -1;

		            self.callActions('beforeInsertTargets', arguments);

		            if (typeof command.index === 'undefined') command.index = 0;

		            nextSibling = self.getNextSibling(command.index, command.sibling, command.position);
		            frag        = self.dom.document.createDocumentFragment();

		            if (nextSibling) {
		                insertionIndex = h.index(nextSibling, self.config.selectors.target);
		            } else {
		                insertionIndex = self.targets.length;
		            }

		            if (command.collection) {
		                for (i = 0; el = command.collection[i]; i++) {
		                    if (self.dom.targets.indexOf(el) > -1) {
		                        throw new Error(mixitup.messages.errorInsertPreexistingElement());
		                    }

		                    // Ensure elements are hidden when they are added to the DOM, so they can
		                    // be animated in gracefully

		                    el.style.display = 'none';

		                    frag.appendChild(el);
		                    frag.appendChild(self.dom.document.createTextNode(' '));

		                    if (!h.isElement(el, self.dom.document) || !el.matches(self.config.selectors.target)) continue;

		                    target = new mixitup.Target();

		                    target.init(el, self);

		                    target.isInDom = true;

		                    self.targets.splice(insertionIndex, 0, target);

		                    insertionIndex++;
		                }

		                self.dom.parent.insertBefore(frag, nextSibling);
		            }

		            // Since targets have been added, the original order must be updated

		            operation.startOrder = self.origOrder = self.targets;

		            self.callActions('afterInsertTargets', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {Number}      [index]
		         * @param   {Element}     [sibling]
		         * @param   {string}      [position]
		         * @return  {Element}
		         */

		        getNextSibling: function(index, sibling, position) {
		            var self    = this,
		                element = null;

		            index = Math.max(index, 0);

		            if (sibling && position === 'before') {
		                // Explicit sibling

		                element = sibling;
		            } else if (sibling && position === 'after') {
		                // Explicit sibling

		                element = sibling.nextElementSibling || null;
		            } else if (self.targets.length > 0 && typeof index !== 'undefined') {
		                // Index and targets exist

		                element = (index < self.targets.length || !self.targets.length) ?
		                    self.targets[index].dom.el :
		                    self.targets[self.targets.length - 1].dom.el.nextElementSibling;
		            } else if (self.targets.length === 0 && self.dom.parent.children.length > 0) {
		                // No targets but other siblings

		                if (self.config.layout.siblingAfter) {
		                    element = self.config.layout.siblingAfter;
		                } else if (self.config.layout.siblingBefore) {
		                    element = self.config.layout.siblingBefore.nextElementSibling;
		                } else {
		                    self.dom.parent.children[0];
		                }
		            } else ;

		            return self.callFilters('elementGetNextSibling', element, arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        filterOperation: function(operation) {
		            var self        = this,
		                testResult  = false,
		                index       = -1,
		                action      = '',
		                target      = null,
		                i           = -1;

		            self.callActions('beforeFilterOperation', arguments);

		            action = operation.newFilter.action;

		            for (i = 0; target = operation.newOrder[i]; i++) {
		                if (operation.newFilter.collection) {
		                    // show via collection

		                    testResult = operation.newFilter.collection.indexOf(target.dom.el) > -1;
		                } else {
		                    // show via selector

		                    if (operation.newFilter.selector === '') {
		                        testResult = false;
		                    } else {
		                        testResult = target.dom.el.matches(operation.newFilter.selector);
		                    }
		                }

		                self.evaluateHideShow(testResult, target, action, operation);
		            }

		            if (operation.toRemove.length) {
		                for (i = 0; target = operation.show[i]; i++) {
		                    if (operation.toRemove.indexOf(target) > -1) {
		                        // If any shown targets should be removed, move them into the toHide array

		                        operation.show.splice(i, 1);

		                        if ((index = operation.toShow.indexOf(target)) > -1) {
		                            operation.toShow.splice(index, 1);
		                        }

		                        operation.toHide.push(target);
		                        operation.hide.push(target);

		                        i--;
		                    }
		                }
		            }

		            operation.matching = operation.show.slice();

		            if (operation.show.length === 0 && operation.newFilter.selector !== '' && self.targets.length !== 0) {
		                operation.hasFailed = true;
		            }

		            self.callActions('afterFilterOperation', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {boolean}   testResult
		         * @param   {Element}   target
		         * @param   {string}    action
		         * @param   {Operation} operation
		         * @return  {void}
		         */

		        evaluateHideShow: function(testResult, target, action, operation) {
		            var self = this,
		                filteredTestResult = false,
		                args = Array.prototype.slice.call(arguments, 1);

		            filteredTestResult = self.callFilters('testResultEvaluateHideShow', testResult, args);

		            self.callActions('beforeEvaluateHideShow', arguments);

		            if (
		                filteredTestResult === true && action === 'show' ||
		                filteredTestResult === false && action === 'hide'
		            ) {
		                operation.show.push(target);

		                !target.isShown && operation.toShow.push(target);
		            } else {
		                operation.hide.push(target);

		                target.isShown && operation.toHide.push(target);
		            }

		            self.callActions('afterEvaluateHideShow', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        sortOperation: function(operation) {
		            var self     = this,
		                newOrder = [],
		                target   = null,
		                el       = null,
		                i        = -1;

		            self.callActions('beforeSortOperation', arguments);

		            operation.startOrder = self.targets;

		            if (operation.newSort.collection) {
		                // Sort by collection

		                newOrder = [];

		                for (i = 0; (el = operation.newSort.collection[i]); i++) {
		                    if (self.dom.targets.indexOf(el) < 0) {
		                        throw new Error(mixitup.messages.errorSortNonExistentElement());
		                    }

		                    target = new mixitup.Target();

		                    target.init(el, self);

		                    target.isInDom = true;

		                    newOrder.push(target);
		                }

		                operation.newOrder = newOrder;
		            } else if (operation.newSort.order === 'random') {
		                // Sort random

		                operation.newOrder = h.arrayShuffle(operation.startOrder);
		            } else if (operation.newSort.attribute === '') {
		                // Sort by default

		                operation.newOrder = self.origOrder.slice();

		                if (operation.newSort.order === 'desc') {
		                    operation.newOrder.reverse();
		                }
		            } else {
		                // Sort by attribute

		                operation.newOrder = operation.startOrder.slice();

		                operation.newOrder.sort(function(a, b) {
		                    return self.compare(a, b, operation.newSort);
		                });
		            }

		            if (h.isEqualArray(operation.newOrder, operation.startOrder)) {
		                operation.willSort = false;
		            }

		            self.callActions('afterSortOperation', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {mixitup.Target}        a
		         * @param   {mixitup.Target}        b
		         * @param   {mixitup.CommandSort}   command
		         * @return  {Number}
		         */

		        compare: function(a, b, command) {
		            var self        = this,
		                order       = command.order,
		                attrA       = self.getAttributeValue(a, command.attribute),
		                attrB       = self.getAttributeValue(b, command.attribute);

		            if (isNaN(attrA * 1) || isNaN(attrB * 1)) {
		                attrA = attrA.toLowerCase();
		                attrB = attrB.toLowerCase();
		            } else {
		                attrA = attrA * 1;
		                attrB = attrB * 1;
		            }

		            if (attrA < attrB) {
		                return order === 'asc' ? -1 : 1;
		            }

		            if (attrA > attrB) {
		                return order === 'asc' ? 1 : -1;
		            }

		            if (attrA === attrB && command.next) {
		                return self.compare(a, b, command.next);
		            }

		            return 0;
		        },

		        /**
		         * Reads the values of any data attributes present the provided target element
		         * which match the current sort command.
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {mixitup.Target}    target
		         * @param   {string}            [attribute]
		         * @return  {(String|Number)}
		         */

		        getAttributeValue: function(target, attribute) {
		            var self    = this,
		                value   = '';

		            value = target.dom.el.getAttribute('data-' + attribute);

		            if (value === null) {
		                if (self.config.debug.showWarnings) {
		                    // Encourage users to assign values to all targets to avoid erroneous sorting
		                    // when types are mixed

		                    console.warn(mixitup.messages.warningInconsistentSortingAttributes({
		                        attribute: 'data-' + attribute
		                    }));
		                }
		            }

		            // If an attribute is not present, return 0 as a safety value

		            return self.callFilters('valueGetAttributeValue', value || 0, arguments);
		        },

		        /**
		         * Inserts elements into the DOM in the appropriate
		         * order using a document fragment for minimal
		         * DOM thrashing
		         *
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {boolean}   isResetting
		         * @param   {Operation} operation
		         * @return  {void}
		         */

		        printSort: function(isResetting, operation) {
		            var self        = this,
		                startOrder  = isResetting ? operation.newOrder : operation.startOrder,
		                newOrder    = isResetting ? operation.startOrder : operation.newOrder,
		                nextSibling = startOrder.length ? startOrder[startOrder.length - 1].dom.el.nextElementSibling : null,
		                frag        = window.document.createDocumentFragment(),
		                whitespace  = null,
		                target      = null,
		                el          = null,
		                i           = -1;

		            self.callActions('beforePrintSort', arguments);

		            // Empty the container

		            for (i = 0; target = startOrder[i]; i++) {
		                el = target.dom.el;

		                if (el.style.position === 'absolute') continue;

		                h.removeWhitespace(el.previousSibling);

		                el.parentElement.removeChild(el);
		            }

		            whitespace = nextSibling ? nextSibling.previousSibling : self.dom.parent.lastChild;

		            if (whitespace && whitespace.nodeName === '#text') {
		                h.removeWhitespace(whitespace);
		            }

		            for (i = 0; target = newOrder[i]; i++) {
		                // Add targets into a document fragment

		                el = target.dom.el;

		                if (h.isElement(frag.lastChild)) {
		                    frag.appendChild(window.document.createTextNode(' '));
		                }

		                frag.appendChild(el);
		            }

		            // Insert the document fragment into the container
		            // before any other non-target elements

		            if (self.dom.parent.firstChild && self.dom.parent.firstChild !== nextSibling) {
		                frag.insertBefore(window.document.createTextNode(' '), frag.childNodes[0]);
		            }

		            if (nextSibling) {
		                frag.appendChild(window.document.createTextNode(' '));

		                self.dom.parent.insertBefore(frag, nextSibling);
		            } else {
		                self.dom.parent.appendChild(frag);
		            }

		            self.callActions('afterPrintSort', arguments);
		        },

		        /**
		         * Parses user-defined sort strings (i.e. `default:asc`) into sort commands objects.
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {string}                sortString
		         * @param   {mixitup.CommandSort}   command
		         * @return  {mixitup.CommandSort}
		         */

		        parseSortString: function(sortString, command) {
		            var self        = this,
		                rules       = sortString.split(' '),
		                current     = command,
		                rule        = [],
		                i           = -1;

		            // command.sortString = sortString;

		            for (i = 0; i < rules.length; i++) {
		                rule = rules[i].split(':');

		                current.sortString  = rules[i];
		                current.attribute   = h.dashCase(rule[0]);
		                current.order       = rule[1] || 'asc';

		                switch (current.attribute) {
		                    case 'default':
		                        // treat "default" as sorting by no attribute

		                        current.attribute = '';

		                        break;
		                    case 'random':
		                        // treat "random" as an order not an attribute

		                        current.attribute   = '';
		                        current.order       = 'random';

		                        break;
		                }

		                if (!current.attribute || current.order === 'random') break;

		                if (i < rules.length - 1) {
		                    // Embed reference to the next command

		                    current.next = new mixitup.CommandSort();

		                    h.freeze(current);

		                    current = current.next;
		                }
		            }

		            return self.callFilters('commandsParseSort', command, arguments);
		        },

		        /**
		         * Parses all effects out of the user-defined `animation.effects` string into
		         * their respective properties and units.
		         *
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @return  {void}
		         */

		        parseEffects: function() {
		            var self            = this,
		                transformName   = '',
		                effectsIn       = self.config.animation.effectsIn || self.config.animation.effects,
		                effectsOut      = self.config.animation.effectsOut || self.config.animation.effects;

		            self.callActions('beforeParseEffects', arguments);

		            self.effectsIn      = new mixitup.StyleData();
		            self.effectsOut     = new mixitup.StyleData();
		            self.transformIn    = [];
		            self.transformOut   = [];

		            self.effectsIn.opacity = self.effectsOut.opacity = 1;

		            self.parseEffect('fade', effectsIn, self.effectsIn, self.transformIn);
		            self.parseEffect('fade', effectsOut, self.effectsOut, self.transformOut, true);

		            for (transformName in mixitup.transformDefaults) {
		                if (!(mixitup.transformDefaults[transformName] instanceof mixitup.TransformData)) {
		                    continue;
		                }

		                self.parseEffect(transformName, effectsIn, self.effectsIn, self.transformIn);
		                self.parseEffect(transformName, effectsOut, self.effectsOut, self.transformOut, true);
		            }

		            self.parseEffect('stagger', effectsIn, self.effectsIn, self.transformIn);
		            self.parseEffect('stagger', effectsOut, self.effectsOut, self.transformOut, true);

		            self.callActions('afterParseEffects', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {string}    effectName
		         * @param   {string}    effectString
		         * @param   {StyleData} effects
		         * @param   {String[]}  transform
		         * @param   {boolean}   [isOut]
		         */

		        parseEffect: function(effectName, effectString, effects, transform, isOut) {
		            var self        = this,
		                re          = /\(([^)]+)\)/,
		                propIndex   = -1,
		                str         = '',
		                match       = [],
		                val         = '',
		                units       = ['%', 'px', 'em', 'rem', 'vh', 'vw', 'deg'],
		                unit        = '',
		                i           = -1;

		            self.callActions('beforeParseEffect', arguments);

		            if (typeof effectString !== 'string') {
		                throw new TypeError(mixitup.messages.errorConfigInvalidAnimationEffects());
		            }

		            if (effectString.indexOf(effectName) < 0) {
		                // The effect is not present in the effects string

		                if (effectName === 'stagger') {
		                    // Reset stagger to 0

		                    self.staggerDuration = 0;
		                }

		                return;
		            }

		            // The effect is present

		            propIndex = effectString.indexOf(effectName + '(');

		            if (propIndex > -1) {
		                // The effect has a user defined value in parentheses

		                // Extract from the first parenthesis to the end of string

		                str = effectString.substring(propIndex);

		                // Match any number of characters between "(" and ")"

		                match = re.exec(str);

		                val = match[1];
		            }

		            switch (effectName) {
		                case 'fade':
		                    effects.opacity = val ? parseFloat(val) : 0;

		                    break;
		                case 'stagger':
		                    self.staggerDuration = val ? parseFloat(val) : 100;

		                    // TODO: Currently stagger must be applied globally, but
		                    // if seperate values are specified for in/out, this should
		                    // be respected

		                    break;
		                default:
		                    // All other effects are transforms following the same structure

		                    if (isOut && self.config.animation.reverseOut && effectName !== 'scale') {
		                        effects[effectName].value =
		                            (val ? parseFloat(val) : mixitup.transformDefaults[effectName].value) * -1;
		                    } else {
		                        effects[effectName].value =
		                            (val ? parseFloat(val) : mixitup.transformDefaults[effectName].value);
		                    }

		                    if (val) {
		                        for (i = 0; unit = units[i]; i++) {
		                            if (val.indexOf(unit) > -1) {
		                                effects[effectName].unit = unit;

		                                break;
		                            }
		                        }
		                    } else {
		                        effects[effectName].unit = mixitup.transformDefaults[effectName].unit;
		                    }

		                    transform.push(
		                        effectName +
		                        '(' +
		                        effects[effectName].value +
		                        effects[effectName].unit +
		                        ')'
		                    );
		            }

		            self.callActions('afterParseEffect', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {State}
		         */

		        buildState: function(operation) {
		            var self        = this,
		                state       = new mixitup.State(),
		                target      = null,
		                i           = -1;

		            self.callActions('beforeBuildState', arguments);

		            // Map target elements into state arrays.
		            // the real target objects should never be exposed

		            for (i = 0; target = self.targets[i]; i++) {
		                if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
		                    state.targets.push(target.dom.el);
		                }
		            }

		            for (i = 0; target = operation.matching[i]; i++) {
		                state.matching.push(target.dom.el);
		            }

		            for (i = 0; target = operation.show[i]; i++) {
		                state.show.push(target.dom.el);
		            }

		            for (i = 0; target = operation.hide[i]; i++) {
		                if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
		                    state.hide.push(target.dom.el);
		                }
		            }

		            state.id                        = self.id;
		            state.container                 = self.dom.container;
		            state.activeFilter              = operation.newFilter;
		            state.activeSort                = operation.newSort;
		            state.activeDataset             = operation.newDataset;
		            state.activeContainerClassName  = operation.newContainerClassName;
		            state.hasFailed                 = operation.hasFailed;
		            state.totalTargets              = self.targets.length;
		            state.totalShow                 = operation.show.length;
		            state.totalHide                 = operation.hide.length;
		            state.totalMatching             = operation.matching.length;
		            state.triggerElement            = operation.triggerElement;

		            return self.callFilters('stateBuildState', state, arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {boolean}   shouldAnimate
		         * @param   {Operation} operation
		         * @return  {void}
		         */

		        goMix: function(shouldAnimate, operation) {
		            var self        = this,
		                deferred    = null;

		            self.callActions('beforeGoMix', arguments);

		            // If the animation duration is set to 0ms,
		            // or no effects specified,
		            // or the container is hidden
		            // then abort animation

		            if (
		                !self.config.animation.duration || !self.config.animation.effects || !h.isVisible(self.dom.container)
		            ) {
		                shouldAnimate = false;
		            }

		            if (
		                !operation.toShow.length &&
		                !operation.toHide.length &&
		                !operation.willSort &&
		                !operation.willChangeLayout
		            ) {
		                // If nothing to show or hide, and not sorting or
		                // changing layout

		                shouldAnimate = false;
		            }

		            if (
		                !operation.startState.show.length &&
		                !operation.show.length
		            ) {
		                // If nothing currently shown, nothing to show

		                shouldAnimate = false;
		            }

		            mixitup.events.fire('mixStart', self.dom.container, {
		                state: operation.startState,
		                futureState: operation.newState,
		                instance: self
		            }, self.dom.document);

		            if (typeof self.config.callbacks.onMixStart === 'function') {
		                self.config.callbacks.onMixStart.call(
		                    self.dom.container,
		                    operation.startState,
		                    operation.newState,
		                    self
		                );
		            }

		            h.removeClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));

		            if (!self.userDeferred) {
		                // Queue empty, no pending operations

		                deferred = self.userDeferred = h.defer(mixitup.libraries);
		            } else {
		                // Use existing deferred

		                deferred = self.userDeferred;
		            }

		            self.isBusy = true;

		            if (!shouldAnimate || !mixitup.features.has.transitions) {
		                // Abort

		                if (self.config.debug.fauxAsync) {
		                    setTimeout(function() {
		                        self.cleanUp(operation);
		                    }, self.config.animation.duration);
		                } else {
		                    self.cleanUp(operation);
		                }

		                return self.callFilters('promiseGoMix', deferred.promise, arguments);
		            }

		            // If we should animate and the platform supports transitions, go for it

		            if (window.pageYOffset !== operation.docState.scrollTop) {
		                window.scrollTo(operation.docState.scrollLeft, operation.docState.scrollTop);
		            }

		            if (self.config.animation.applyPerspective) {
		                self.dom.parent.style[mixitup.features.perspectiveProp] =
		                    self.config.animation.perspectiveDistance;

		                self.dom.parent.style[mixitup.features.perspectiveOriginProp] =
		                    self.config.animation.perspectiveOrigin;
		            }

		            if (
		                self.config.animation.animateResizeContainer &&
		                operation.startHeight !== operation.newHeight &&
		                operation.viewportDeltaY !== operation.startHeight - operation.newHeight
		            ) {
		                self.dom.parent.style.height = operation.startHeight + 'px';
		            }

		            if (
		                self.config.animation.animateResizeContainer &&
		                operation.startWidth !== operation.newWidth &&
		                operation.viewportDeltaX !== operation.startWidth - operation.newWidth
		            ) {
		                self.dom.parent.style.width = operation.startWidth + 'px';
		            }

		            if (operation.startHeight === operation.newHeight) {
		                self.dom.parent.style.height = operation.startHeight + 'px';
		            }

		            if (operation.startWidth === operation.newWidth) {
		                self.dom.parent.style.width = operation.startWidth + 'px';
		            }

		            if (operation.startHeight === operation.newHeight && operation.startWidth === operation.newWidth) {
		                self.dom.parent.style.overflow = 'hidden';
		            }

		            requestAnimationFrame(function() {
		                self.moveTargets(operation);
		            });

		            return self.callFilters('promiseGoMix', deferred.promise, arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        getStartMixData: function(operation) {
		            var self        = this,
		                parentStyle = window.getComputedStyle(self.dom.parent),
		                parentRect  = self.dom.parent.getBoundingClientRect(),
		                target      = null,
		                data        = {},
		                i           = -1,
		                boxSizing   = parentStyle[mixitup.features.boxSizingProp];

		            self.incPadding = (boxSizing === 'border-box');

		            self.callActions('beforeGetStartMixData', arguments);

		            for (i = 0; target = operation.show[i]; i++) {
		                data = target.getPosData();

		                operation.showPosData[i] = {
		                    startPosData: data
		                };
		            }

		            for (i = 0; target = operation.toHide[i]; i++) {
		                data = target.getPosData();

		                operation.toHidePosData[i] = {
		                    startPosData: data
		                };
		            }

		            operation.startX = parentRect.left;
		            operation.startY = parentRect.top;

		            operation.startHeight = self.incPadding ?
		                parentRect.height :
		                parentRect.height -
		                    parseFloat(parentStyle.paddingTop) -
		                    parseFloat(parentStyle.paddingBottom) -
		                    parseFloat(parentStyle.borderTop) -
		                    parseFloat(parentStyle.borderBottom);

		            operation.startWidth = self.incPadding ?
		                parentRect.width :
		                parentRect.width -
		                    parseFloat(parentStyle.paddingLeft) -
		                    parseFloat(parentStyle.paddingRight) -
		                    parseFloat(parentStyle.borderLeft) -
		                    parseFloat(parentStyle.borderRight);

		            self.callActions('afterGetStartMixData', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        setInter: function(operation) {
		            var self    = this,
		                target  = null,
		                i       = -1;

		            self.callActions('beforeSetInter', arguments);

		            // Prevent scrollbar flicker on non-inertial scroll platforms by clamping height/width

		            if (self.config.animation.clampHeight) {
		                self.dom.parent.style.height    = operation.startHeight + 'px';
		                self.dom.parent.style.overflow  = 'hidden';
		            }

		            if (self.config.animation.clampWidth) {
		                self.dom.parent.style.width     = operation.startWidth + 'px';
		                self.dom.parent.style.overflow  = 'hidden';
		            }

		            for (i = 0; target = operation.toShow[i]; i++) {
		                target.show();
		            }

		            if (operation.willChangeLayout) {
		                h.removeClass(self.dom.container, operation.startContainerClassName);
		                h.addClass(self.dom.container, operation.newContainerClassName);
		            }

		            self.callActions('afterSetInter', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        getInterMixData: function(operation) {
		            var self    = this,
		                target  = null,
		                i       = -1;

		            self.callActions('beforeGetInterMixData', arguments);

		            for (i = 0; target = operation.show[i]; i++) {
		                operation.showPosData[i].interPosData = target.getPosData();
		            }

		            for (i = 0; target = operation.toHide[i]; i++) {
		                operation.toHidePosData[i].interPosData = target.getPosData();
		            }

		            self.callActions('afterGetInterMixData', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        setFinal: function(operation) {
		            var self    = this,
		                target  = null,
		                i       = -1;

		            self.callActions('beforeSetFinal', arguments);

		            operation.willSort && self.printSort(false, operation);

		            for (i = 0; target = operation.toHide[i]; i++) {
		                target.hide();
		            }

		            self.callActions('afterSetFinal', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        getFinalMixData: function(operation) {
		            var self        = this,
		                parentStyle = null,
		                parentRect  = null,
		                target      = null,
		                i           = -1;

		            self.callActions('beforeGetFinalMixData', arguments);

		            for (i = 0; target = operation.show[i]; i++) {
		                operation.showPosData[i].finalPosData = target.getPosData();
		            }

		            for (i = 0; target = operation.toHide[i]; i++) {
		                operation.toHidePosData[i].finalPosData = target.getPosData();
		            }

		            // Remove clamping

		            if (self.config.animation.clampHeight || self.config.animation.clampWidth) {
		                self.dom.parent.style.height    =
		                self.dom.parent.style.width     =
		                self.dom.parent.style.overflow  = '';
		            }

		            if (!self.incPadding) {
		                parentStyle = window.getComputedStyle(self.dom.parent);
		            }

		            parentRect  = self.dom.parent.getBoundingClientRect();

		            operation.newX = parentRect.left;
		            operation.newY = parentRect.top;

		            operation.newHeight = self.incPadding ?
		                parentRect.height :
		                parentRect.height -
		                    parseFloat(parentStyle.paddingTop) -
		                    parseFloat(parentStyle.paddingBottom) -
		                    parseFloat(parentStyle.borderTop) -
		                    parseFloat(parentStyle.borderBottom);

		            operation.newWidth = self.incPadding ?
		                parentRect.width :
		                parentRect.width -
		                    parseFloat(parentStyle.paddingLeft) -
		                    parseFloat(parentStyle.paddingRight) -
		                    parseFloat(parentStyle.borderLeft) -
		                    parseFloat(parentStyle.borderRight);

		            operation.viewportDeltaX = operation.docState.viewportWidth - this.dom.document.documentElement.clientWidth;
		            operation.viewportDeltaY = operation.docState.viewportHeight - this.dom.document.documentElement.clientHeight;

		            if (operation.willSort) {
		                self.printSort(true, operation);
		            }

		            for (i = 0; target = operation.toShow[i]; i++) {
		                target.hide();
		            }

		            for (i = 0; target = operation.toHide[i]; i++) {
		                target.show();
		            }

		            if (operation.willChangeLayout) {
		                h.removeClass(self.dom.container, operation.newContainerClassName);
		                h.addClass(self.dom.container, self.config.layout.containerClassName);
		            }

		            self.callActions('afterGetFinalMixData', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since    3.0.0
		         * @param    {Operation}     operation
		         */

		        getTweenData: function(operation) {
		            var self            = this,
		                target          = null,
		                posData         = null,
		                effectNames     = Object.getOwnPropertyNames(self.effectsIn),
		                effectName      = '',
		                effect          = null,
		                widthChange     = -1,
		                heightChange    = -1,
		                i               = -1,
		                j               = -1;

		            self.callActions('beforeGetTweenData', arguments);

		            for (i = 0; target = operation.show[i]; i++) {
		                posData             = operation.showPosData[i];
		                posData.posIn       = new mixitup.StyleData();
		                posData.posOut      = new mixitup.StyleData();
		                posData.tweenData   = new mixitup.StyleData();

		                // Process x and y

		                if (target.isShown) {
		                    posData.posIn.x = posData.startPosData.x - posData.interPosData.x;
		                    posData.posIn.y = posData.startPosData.y - posData.interPosData.y;
		                } else {
		                    posData.posIn.x = posData.posIn.y = 0;
		                }

		                posData.posOut.x = posData.finalPosData.x - posData.interPosData.x;
		                posData.posOut.y = posData.finalPosData.y - posData.interPosData.y;

		                // Process opacity

		                posData.posIn.opacity       = target.isShown ? 1 : self.effectsIn.opacity;
		                posData.posOut.opacity      = 1;
		                posData.tweenData.opacity   = posData.posOut.opacity - posData.posIn.opacity;

		                // Adjust x and y if not nudging

		                if (!target.isShown && !self.config.animation.nudge) {
		                    posData.posIn.x = posData.posOut.x;
		                    posData.posIn.y = posData.posOut.y;
		                }

		                posData.tweenData.x = posData.posOut.x - posData.posIn.x;
		                posData.tweenData.y = posData.posOut.y - posData.posIn.y;

		                // Process width, height, and margins

		                if (self.config.animation.animateResizeTargets) {
		                    posData.posIn.width     = posData.startPosData.width;
		                    posData.posIn.height    = posData.startPosData.height;

		                    // "||" Prevents width/height change from including 0 width/height if hiding or showing

		                    widthChange = (posData.startPosData.width || posData.finalPosData.width) - posData.interPosData.width;

		                    posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

		                    heightChange = (posData.startPosData.height || posData.finalPosData.height) - posData.interPosData.height;

		                    posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;

		                    posData.posOut.width    = posData.finalPosData.width;
		                    posData.posOut.height   = posData.finalPosData.height;

		                    widthChange = (posData.finalPosData.width || posData.startPosData.width) - posData.interPosData.width;

		                    posData.posOut.marginRight = posData.finalPosData.marginRight - widthChange;

		                    heightChange = (posData.finalPosData.height || posData.startPosData.height) - posData.interPosData.height;

		                    posData.posOut.marginBottom = posData.finalPosData.marginBottom - heightChange;

		                    posData.tweenData.width         = posData.posOut.width - posData.posIn.width;
		                    posData.tweenData.height        = posData.posOut.height - posData.posIn.height;
		                    posData.tweenData.marginRight   = posData.posOut.marginRight - posData.posIn.marginRight;
		                    posData.tweenData.marginBottom  = posData.posOut.marginBottom - posData.posIn.marginBottom;
		                }

		                // Process transforms

		                for (j = 0; effectName = effectNames[j]; j++) {
		                    effect = self.effectsIn[effectName];

		                    if (!(effect instanceof mixitup.TransformData) || !effect.value) continue;

		                    posData.posIn[effectName].value     = effect.value;
		                    posData.posOut[effectName].value    = 0;

		                    posData.tweenData[effectName].value =
		                        posData.posOut[effectName].value - posData.posIn[effectName].value;

		                    posData.posIn[effectName].unit =
		                        posData.posOut[effectName].unit =
		                        posData.tweenData[effectName].unit =
		                        effect.unit;
		                }
		            }

		            for (i = 0; target = operation.toHide[i]; i++) {
		                posData             = operation.toHidePosData[i];
		                posData.posIn       = new mixitup.StyleData();
		                posData.posOut      = new mixitup.StyleData();
		                posData.tweenData   = new mixitup.StyleData();

		                // Process x and y

		                posData.posIn.x     = target.isShown ? posData.startPosData.x - posData.interPosData.x : 0;
		                posData.posIn.y     = target.isShown ? posData.startPosData.y - posData.interPosData.y : 0;
		                posData.posOut.x    = self.config.animation.nudge ? 0 : posData.posIn.x;
		                posData.posOut.y    = self.config.animation.nudge ? 0 : posData.posIn.y;
		                posData.tweenData.x = posData.posOut.x - posData.posIn.x;
		                posData.tweenData.y = posData.posOut.y - posData.posIn.y;

		                // Process width, height, and margins

		                if (self.config.animation.animateResizeTargets) {
		                    posData.posIn.width         = posData.startPosData.width;
		                    posData.posIn.height        = posData.startPosData.height;

		                    widthChange = posData.startPosData.width - posData.interPosData.width;

		                    posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

		                    heightChange = posData.startPosData.height - posData.interPosData.height;

		                    posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;
		                }

		                // Process opacity

		                posData.posIn.opacity       = 1;
		                posData.posOut.opacity      = self.effectsOut.opacity;
		                posData.tweenData.opacity   = posData.posOut.opacity - posData.posIn.opacity;

		                // Process transforms

		                for (j = 0; effectName = effectNames[j]; j++) {
		                    effect = self.effectsOut[effectName];

		                    if (!(effect instanceof mixitup.TransformData) || !effect.value) continue;

		                    posData.posIn[effectName].value     = 0;
		                    posData.posOut[effectName].value    = effect.value;

		                    posData.tweenData[effectName].value =
		                        posData.posOut[effectName].value - posData.posIn[effectName].value;

		                    posData.posIn[effectName].unit =
		                        posData.posOut[effectName].unit =
		                        posData.tweenData[effectName].unit =
		                        effect.unit;
		                }
		            }

		            self.callActions('afterGetTweenData', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        moveTargets: function(operation) {
		            var self            = this,
		                target          = null,
		                moveData        = null,
		                posData         = null,
		                statusChange    = '',
		                willTransition  = false,
		                staggerIndex    = -1,
		                i               = -1,
		                checkProgress   = self.checkProgress.bind(self);

		            self.callActions('beforeMoveTargets', arguments);

		            // TODO: this is an extra loop in addition to the calcs
		            // done in getOperation, could some of this be done there?

		            for (i = 0; target = operation.show[i]; i++) {
		                moveData    = new mixitup.IMoveData();
		                posData     = operation.showPosData[i];

		                statusChange = target.isShown ? 'none' : 'show';

		                willTransition = self.willTransition(
		                    statusChange,
		                    operation.hasEffect,
		                    posData.posIn,
		                    posData.posOut
		                );

		                if (willTransition) {
		                    // Prevent non-transitioning targets from incrementing the staggerIndex

		                    staggerIndex++;
		                }

		                target.show();

		                moveData.posIn          = posData.posIn;
		                moveData.posOut         = posData.posOut;
		                moveData.statusChange   = statusChange;
		                moveData.staggerIndex   = staggerIndex;
		                moveData.operation      = operation;
		                moveData.callback       = willTransition ? checkProgress : null;

		                target.move(moveData);
		            }

		            for (i = 0; target = operation.toHide[i]; i++) {
		                posData  = operation.toHidePosData[i];
		                moveData = new mixitup.IMoveData();

		                statusChange = 'hide';

		                willTransition = self.willTransition(statusChange, posData.posIn, posData.posOut);

		                moveData.posIn          = posData.posIn;
		                moveData.posOut         = posData.posOut;
		                moveData.statusChange   = statusChange;
		                moveData.staggerIndex   = i;
		                moveData.operation      = operation;
		                moveData.callback       = willTransition ? checkProgress : null;

		                target.move(moveData);
		            }

		            if (self.config.animation.animateResizeContainer) {
		                self.dom.parent.style[mixitup.features.transitionProp] =
		                    'height ' + self.config.animation.duration + 'ms ease, ' +
		                    'width ' + self.config.animation.duration + 'ms ease ';

		                requestAnimationFrame(function() {
		                    if (
		                        operation.startHeight !== operation.newHeight &&
		                        operation.viewportDeltaY !== operation.startHeight - operation.newHeight
		                    ) {
		                        self.dom.parent.style.height = operation.newHeight + 'px';
		                    }

		                    if (
		                        operation.startWidth !== operation.newWidth &&
		                        operation.viewportDeltaX !== operation.startWidth - operation.newWidth
		                    ) {
		                        self.dom.parent.style.width = operation.newWidth + 'px';
		                    }
		                });
		            }

		            if (operation.willChangeLayout) {
		                h.removeClass(self.dom.container, self.config.layout.ContainerClassName);
		                h.addClass(self.dom.container, operation.newContainerClassName);
		            }

		            self.callActions('afterMoveTargets', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @return  {boolean}
		         */

		        hasEffect: function() {
		            var self        = this,
		                EFFECTABLES = [
		                    'scale',
		                    'translateX', 'translateY', 'translateZ',
		                    'rotateX', 'rotateY', 'rotateZ'
		                ],
		                effectName  = '',
		                effect      = null,
		                result      = false,
		                value       = -1,
		                i           = -1;

		            if (self.effectsIn.opacity !== 1) {
		                return self.callFilters('resultHasEffect', true, arguments);
		            }

		            for (i = 0; effectName = EFFECTABLES[i]; i++) {
		                effect  = self.effectsIn[effectName];
		                value   = (typeof effect && effect.value !== 'undefined') ?
		                    effect.value : effect;

		                if (value !== 0) {
		                    result = true;

		                    break;
		                }
		            }

		            return self.callFilters('resultHasEffect', result, arguments);
		        },

		        /**
		         * Determines if a target element will transition in
		         * some fasion and therefore requires binding of
		         * transitionEnd
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {string}        statusChange
		         * @param   {boolean}       hasEffect
		         * @param   {StyleData}     posIn
		         * @param   {StyleData}     posOut
		         * @return  {boolean}
		         */

		        willTransition: function(statusChange, hasEffect, posIn, posOut) {
		            var self    = this,
		                result  = false;

		            if (!h.isVisible(self.dom.container)) {
		                // If the container is not visible, the transitionEnd
		                // event will not occur and MixItUp will hang

		                result = false;
		            } else if (
		                (statusChange !== 'none' && hasEffect) ||
		                posIn.x !== posOut.x ||
		                posIn.y !== posOut.y
		            ) {
		                // If opacity and/or translate will change

		                result = true;
		            } else if (self.config.animation.animateResizeTargets) {
		                // Check if width, height or margins will change

		                result = (
		                    posIn.width !== posOut.width ||
		                    posIn.height !== posOut.height ||
		                    posIn.marginRight !== posOut.marginRight ||
		                    posIn.marginTop !== posOut.marginTop
		                );
		            } else {
		                result = false;
		            }

		            return self.callFilters('resultWillTransition', result, arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        checkProgress: function(operation) {
		            var self = this;

		            self.targetsDone++;

		            if (self.targetsBound === self.targetsDone) {
		                self.cleanUp(operation);
		            }
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Operation}     operation
		         * @return  {void}
		         */

		        cleanUp: function(operation) {
		            var self                = this,
		                target              = null,
		                whitespaceBefore    = null,
		                whitespaceAfter     = null,
		                nextInQueue         = null,
		                i                   = -1;

		            self.callActions('beforeCleanUp', arguments);

		            self.targetsMoved          =
		                self.targetsImmovable  =
		                self.targetsBound      =
		                self.targetsDone       = 0;

		            for (i = 0; target = operation.show[i]; i++) {
		                target.cleanUp();

		                target.show();
		            }

		            for (i = 0; target = operation.toHide[i]; i++) {
		                target.cleanUp();

		                target.hide();
		            }

		            if (operation.willSort) {
		                self.printSort(false, operation);
		            }

		            // Remove any styles applied to the parent container

		            self.dom.parent.style[mixitup.features.transitionProp]             =
		                self.dom.parent.style.height                                   =
		                self.dom.parent.style.width                                    =
		                self.dom.parent.style.overflow                                 =
		                self.dom.parent.style[mixitup.features.perspectiveProp]        =
		                self.dom.parent.style[mixitup.features.perspectiveOriginProp]  = '';

		            if (operation.willChangeLayout) {
		                h.removeClass(self.dom.container, operation.startContainerClassName);
		                h.addClass(self.dom.container, operation.newContainerClassName);
		            }

		            if (operation.toRemove.length) {
		                for (i = 0; target = self.targets[i]; i++) {
		                    if (operation.toRemove.indexOf(target) > -1) {
		                        if (
		                            (whitespaceBefore = target.dom.el.previousSibling) && whitespaceBefore.nodeName === '#text' &&
		                            (whitespaceAfter = target.dom.el.nextSibling) && whitespaceAfter.nodeName === '#text'
		                        ) {
		                            h.removeWhitespace(whitespaceBefore);
		                        }

		                        if (!operation.willSort) {
		                            // NB: Sorting will remove targets as a bi-product of `printSort()`

		                            self.dom.parent.removeChild(target.dom.el);
		                        }

		                        self.targets.splice(i, 1);

		                        target.isInDom = false;

		                        i--;
		                    }
		                }

		                // Since targets have been removed, the original order must be updated

		                self.origOrder = self.targets;
		            }

		            if (operation.willSort) {
		                self.targets = operation.newOrder;
		            }

		            self.state = operation.newState;
		            self.lastOperation = operation;

		            self.dom.targets = self.state.targets;

		            // mixEnd

		            mixitup.events.fire('mixEnd', self.dom.container, {
		                state: self.state,
		                instance: self
		            }, self.dom.document);

		            if (typeof self.config.callbacks.onMixEnd === 'function') {
		                self.config.callbacks.onMixEnd.call(self.dom.container, self.state, self);
		            }

		            if (operation.hasFailed) {
		                // mixFail

		                mixitup.events.fire('mixFail', self.dom.container, {
		                    state: self.state,
		                    instance: self
		                }, self.dom.document);

		                if (typeof self.config.callbacks.onMixFail === 'function') {
		                    self.config.callbacks.onMixFail.call(self.dom.container, self.state, self);
		                }

		                h.addClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));
		            }

		            // User-defined callback function

		            if (typeof self.userCallback === 'function') {
		                self.userCallback.call(self.dom.container, self.state, self);
		            }

		            if (typeof self.userDeferred.resolve === 'function') {
		                self.userDeferred.resolve(self.state);
		            }

		            self.userCallback  = null;
		            self.userDeferred  = null;
		            self.lastClicked   = null;
		            self.isToggling    = false;
		            self.isBusy        = false;

		            if (self.queue.length) {
		                self.callActions('beforeReadQueueCleanUp', arguments);

		                nextInQueue = self.queue.shift();

		                // Update non-public API properties stored in queue

		                self.userDeferred  = nextInQueue.deferred;
		                self.isToggling    = nextInQueue.isToggling;
		                self.lastClicked   = nextInQueue.triggerElement;

		                if (nextInQueue.instruction.command instanceof mixitup.CommandMultimix) {
		                    self.multimix.apply(self, nextInQueue.args);
		                } else {
		                    self.dataset.apply(self, nextInQueue.args);
		                }
		            }

		            self.callActions('afterCleanUp', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Array<*>}  args
		         * @return  {mixitup.UserInstruction}
		         */

		        parseMultimixArgs: function(args) {
		            var self        = this,
		                instruction = new mixitup.UserInstruction(),
		                arg         = null,
		                i           = -1;

		            instruction.animate = self.config.animation.enable;
		            instruction.command = new mixitup.CommandMultimix();

		            for (i = 0; i < args.length; i++) {
		                arg = args[i];

		                if (arg === null) continue;

		                if (typeof arg === 'object') {
		                    h.extend(instruction.command, arg);
		                } else if (typeof arg === 'boolean') {
		                    instruction.animate = arg;
		                } else if (typeof arg === 'function') {
		                    instruction.callback = arg;
		                }
		            }

		            // Coerce arbitrary command arguments into typed command objects

		            if (instruction.command.insert && !(instruction.command.insert instanceof mixitup.CommandInsert)) {
		                instruction.command.insert = self.parseInsertArgs([instruction.command.insert]).command;
		            }

		            if (instruction.command.remove && !(instruction.command.remove instanceof mixitup.CommandRemove)) {
		                instruction.command.remove = self.parseRemoveArgs([instruction.command.remove]).command;
		            }

		            if (instruction.command.filter && !(instruction.command.filter instanceof mixitup.CommandFilter)) {
		                instruction.command.filter = self.parseFilterArgs([instruction.command.filter]).command;
		            }

		            if (instruction.command.sort && !(instruction.command.sort instanceof mixitup.CommandSort)) {
		                instruction.command.sort = self.parseSortArgs([instruction.command.sort]).command;
		            }

		            if (instruction.command.changeLayout && !(instruction.command.changeLayout instanceof mixitup.CommandChangeLayout)) {
		                instruction.command.changeLayout = self.parseChangeLayoutArgs([instruction.command.changeLayout]).command;
		            }

		            instruction = self.callFilters('instructionParseMultimixArgs', instruction, arguments);

		            h.freeze(instruction);

		            return instruction;
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Array<*>}  args
		         * @return  {mixitup.UserInstruction}
		         */

		        parseFilterArgs: function(args) {
		            var self        = this,
		                instruction = new mixitup.UserInstruction(),
		                arg         = null,
		                i           = -1;

		            instruction.animate = self.config.animation.enable;
		            instruction.command = new mixitup.CommandFilter();

		            for (i = 0; i < args.length; i++) {
		                arg = args[i];

		                if (typeof arg === 'string') {
		                    // Selector

		                    instruction.command.selector = arg;
		                } else if (arg === null) {
		                    instruction.command.collection = [];
		                } else if (typeof arg === 'object' && h.isElement(arg, self.dom.document)) {
		                    // Single element

		                    instruction.command.collection = [arg];
		                } else if (typeof arg === 'object' && typeof arg.length !== 'undefined') {
		                    // Multiple elements in array, NodeList or jQuery collection

		                    instruction.command.collection = h.arrayFromList(arg);
		                } else if (typeof arg === 'object') {
		                    // Filter command

		                    h.extend(instruction.command, arg);
		                } else if (typeof arg === 'boolean') {
		                    instruction.animate = arg;
		                } else if (typeof arg === 'function') {
		                    instruction.callback = arg;
		                }
		            }

		            if (instruction.command.selector && instruction.command.collection) {
		                throw new Error(mixitup.messages.errorFilterInvalidArguments());
		            }

		            instruction = self.callFilters('instructionParseFilterArgs', instruction, arguments);

		            h.freeze(instruction);

		            return instruction;
		        },

		        parseSortArgs: function(args) {
		            var self        = this,
		                instruction = new mixitup.UserInstruction(),
		                arg         = null,
		                sortString  = '',
		                i           = -1;

		            instruction.animate = self.config.animation.enable;
		            instruction.command = new mixitup.CommandSort();

		            for (i = 0; i < args.length; i++) {
		                arg = args[i];

		                if (arg === null) continue;

		                switch (typeof arg) {
		                    case 'string':
		                        // Sort string

		                        sortString = arg;

		                        break;
		                    case 'object':
		                        // Array of element references

		                        if (arg.length) {
		                            instruction.command.collection = h.arrayFromList(arg);
		                        }

		                        break;
		                    case 'boolean':
		                        instruction.animate = arg;

		                        break;
		                    case 'function':
		                        instruction.callback = arg;

		                        break;
		                }
		            }

		            if (sortString) {
		                instruction.command = self.parseSortString(sortString, instruction.command);
		            }

		            instruction = self.callFilters('instructionParseSortArgs', instruction, arguments);

		            h.freeze(instruction);

		            return instruction;
		        },

		        /**
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {Array<*>}  args
		         * @return  {mixitup.UserInstruction}
		         */

		        parseInsertArgs: function(args) {
		            var self        = this,
		                instruction = new mixitup.UserInstruction(),
		                arg         = null,
		                i           = -1;

		            instruction.animate = self.config.animation.enable;
		            instruction.command = new mixitup.CommandInsert();

		            for (i = 0; i < args.length; i++) {
		                arg = args[i];

		                if (arg === null) continue;

		                if (typeof arg === 'number') {
		                    // Insert index

		                    instruction.command.index = arg;
		                } else if (typeof arg === 'string' && ['before', 'after'].indexOf(arg) > -1) {
		                    // 'before'/'after'

		                    instruction.command.position = arg;
		                } else if (typeof arg === 'string') {
		                    // Markup

		                    instruction.command.collection =
		                        h.arrayFromList(h.createElement(arg).childNodes);
		                } else if (typeof arg === 'object' && h.isElement(arg, self.dom.document)) {
		                    // Single element

		                    !instruction.command.collection.length ?
		                        (instruction.command.collection = [arg]) :
		                        (instruction.command.sibling = arg);
		                } else if (typeof arg === 'object' && arg.length) {
		                    // Multiple elements in array or jQuery collection

		                    !instruction.command.collection.length ?
		                        (instruction.command.collection = arg) :
		                        instruction.command.sibling = arg[0];
		                } else if (typeof arg === 'object' && arg.childNodes && arg.childNodes.length) {
		                    // Document fragment

		                    !instruction.command.collection.length ?
		                        instruction.command.collection = h.arrayFromList(arg.childNodes) :
		                        instruction.command.sibling = arg.childNodes[0];
		                } else if (typeof arg === 'object') {
		                    // Insert command

		                    h.extend(instruction.command, arg);
		                } else if (typeof arg === 'boolean') {
		                    instruction.animate = arg;
		                } else if (typeof arg === 'function') {
		                    instruction.callback = arg;
		                }
		            }

		            if (instruction.command.index && instruction.command.sibling) {
		                throw new Error(mixitup.messages.errorInsertInvalidArguments());
		            }

		            if (!instruction.command.collection.length && self.config.debug.showWarnings) {
		                console.warn(mixitup.messages.warningInsertNoElements());
		            }

		            instruction = self.callFilters('instructionParseInsertArgs', instruction, arguments);

		            h.freeze(instruction);

		            return instruction;
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {Array<*>}  args
		         * @return  {mixitup.UserInstruction}
		         */

		        parseRemoveArgs: function(args) {
		            var self        = this,
		                instruction = new mixitup.UserInstruction(),
		                target      = null,
		                arg         = null,
		                i           = -1;

		            instruction.animate = self.config.animation.enable;
		            instruction.command = new mixitup.CommandRemove();

		            for (i = 0; i < args.length; i++) {
		                arg = args[i];

		                if (arg === null) continue;

		                switch (typeof arg) {
		                    case 'number':
		                        if (self.targets[arg]) {
		                            instruction.command.targets[0] = self.targets[arg];
		                        }

		                        break;
		                    case 'string':
		                        instruction.command.collection = h.arrayFromList(self.dom.parent.querySelectorAll(arg));

		                        break;
		                    case 'object':
		                        if (arg && arg.length) {
		                            instruction.command.collection = arg;
		                        } else if (h.isElement(arg, self.dom.document)) {
		                            instruction.command.collection = [arg];
		                        } else {
		                            // Remove command

		                            h.extend(instruction.command, arg);
		                        }

		                        break;
		                    case 'boolean':
		                        instruction.animate = arg;

		                        break;
		                    case 'function':
		                        instruction.callback = arg;

		                        break;
		                }
		            }

		            if (instruction.command.collection.length) {
		                for (i = 0; target = self.targets[i]; i++) {
		                    if (instruction.command.collection.indexOf(target.dom.el) > -1) {
		                        instruction.command.targets.push(target);
		                    }
		                }
		            }

		            if (!instruction.command.targets.length && self.config.debug.showWarnings) {
		                console.warn(mixitup.messages.warningRemoveNoElements());
		            }

		            h.freeze(instruction);

		            return instruction;
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {Array<*>}  args
		         * @return  {mixitup.UserInstruction}
		         */

		        parseDatasetArgs: function(args) {
		            var self        = this,
		                instruction = new mixitup.UserInstruction(),
		                arg         = null,
		                i           = -1;

		            instruction.animate = self.config.animation.enable;
		            instruction.command = new mixitup.CommandDataset();

		            for (i = 0; i < args.length; i++) {
		                arg = args[i];

		                if (arg === null) continue;

		                switch (typeof arg) {
		                    case 'object':
		                        if (Array.isArray(arg) || typeof arg.length === 'number') {
		                            instruction.command.dataset = arg;
		                        } else {
		                            // Change layout command

		                            h.extend(instruction.command, arg);
		                        }

		                        break;
		                    case 'boolean':
		                        instruction.animate = arg;

		                        break;
		                    case 'function':
		                        instruction.callback = arg;

		                        break;
		                }
		            }

		            h.freeze(instruction);

		            return instruction;
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {Array<*>}  args
		         * @return  {mixitup.UserInstruction}
		         */

		        parseChangeLayoutArgs: function(args) {
		            var self        = this,
		                instruction = new mixitup.UserInstruction(),
		                arg         = null,
		                i           = -1;

		            instruction.animate = self.config.animation.enable;
		            instruction.command = new mixitup.CommandChangeLayout();

		            for (i = 0; i < args.length; i++) {
		                arg = args[i];

		                if (arg === null) continue;

		                switch (typeof arg) {
		                    case 'string':
		                        instruction.command.containerClassName = arg;

		                        break;
		                    case 'object':
		                        // Change layout command

		                        h.extend(instruction.command, arg);

		                        break;
		                    case 'boolean':
		                        instruction.animate = arg;

		                        break;
		                    case 'function':
		                        instruction.callback = arg;

		                        break;
		                }
		            }

		            h.freeze(instruction);

		            return instruction;
		        },

		        /**
		         * @private
		         * @instance
		         * @since       3.0.0
		         * @param       {mixitup.QueueItem}         queueItem
		         * @return      {Promise.<mixitup.State>}
		         */

		        queueMix: function(queueItem) {
		            var self            = this,
		                deferred        = null,
		                toggleSelector  = '';

		            self.callActions('beforeQueueMix', arguments);

		            deferred = h.defer(mixitup.libraries);

		            if (self.config.animation.queue && self.queue.length < self.config.animation.queueLimit) {
		                queueItem.deferred = deferred;

		                self.queue.push(queueItem);

		                // Keep controls in sync with user interactions. Mixer will catch up as it drains the queue.

		                if (self.config.controls.enable) {
		                    if (self.isToggling) {
		                        self.buildToggleArray(queueItem.instruction.command);

		                        toggleSelector = self.getToggleSelector();

		                        self.updateControls({
		                            filter: {
		                                selector: toggleSelector
		                            }
		                        });
		                    } else {
		                        self.updateControls(queueItem.instruction.command);
		                    }
		                }
		            } else {
		                if (self.config.debug.showWarnings) {
		                    console.warn(mixitup.messages.warningMultimixInstanceQueueFull());
		                }

		                deferred.resolve(self.state);

		                mixitup.events.fire('mixBusy', self.dom.container, {
		                    state: self.state,
		                    instance: self
		                }, self.dom.document);

		                if (typeof self.config.callbacks.onMixBusy === 'function') {
		                    self.config.callbacks.onMixBusy.call(self.dom.container, self.state, self);
		                }
		            }

		            return self.callFilters('promiseQueueMix', deferred.promise, arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {Array.<object>}    newDataset
		         * @return  {Operation}
		         */

		        getDataOperation: function(newDataset) {
		            var self                = this,
		                operation           = new mixitup.Operation(),
		                startDataset        = [];

		            operation = self.callFilters('operationUnmappedGetDataOperation', operation, arguments);

		            if (self.dom.targets.length && !(startDataset = (self.state.activeDataset || [])).length) {
		                throw new Error(mixitup.messages.errorDatasetNotSet());
		            }

		            operation.id            = h.randomHex();
		            operation.startState    = self.state;
		            operation.startDataset  = startDataset;
		            operation.newDataset    = newDataset.slice();

		            self.diffDatasets(operation);

		            operation.startOrder = self.targets;
		            operation.newOrder = operation.show;

		            if (self.config.animation.enable) {
		                self.getStartMixData(operation);
		                self.setInter(operation);

		                operation.docState = h.getDocumentState(self.dom.document);

		                self.getInterMixData(operation);
		                self.setFinal(operation);
		                self.getFinalMixData(operation);

		                self.parseEffects();

		                operation.hasEffect = self.hasEffect();

		                self.getTweenData(operation);
		            }

		            self.targets = operation.show.slice();

		            operation.newState = self.buildState(operation);

		            // NB: Targets to be removed must be included in `self.targets` for removal during clean up,
		            // but are added after state is built so that state is accurate

		            Array.prototype.push.apply(self.targets, operation.toRemove);

		            operation = self.callFilters('operationMappedGetDataOperation', operation, arguments);

		            return operation;
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {mixitup.Operation} operation
		         * @return  {void}
		         */

		        diffDatasets: function(operation) {
		            var self                = this,
		                persistantStartIds  = [],
		                persistantNewIds    = [],
		                insertedTargets     = [],
		                data                = null,
		                target              = null,
		                el                  = null,
		                frag                = null,
		                nextEl              = null,
		                uids                = {},
		                id                  = '',
		                i                   = -1;

		            self.callActions('beforeDiffDatasets', arguments);

		            for (i = 0; data = operation.newDataset[i]; i++) {
		                if (typeof (id = data[self.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
		                    throw new TypeError(mixitup.messages.errorDatasetInvalidUidKey({
		                        uidKey: self.config.data.uidKey
		                    }));
		                }

		                if (!uids[id]) {
		                    uids[id] = true;
		                } else {
		                    throw new Error(mixitup.messages.errorDatasetDuplicateUid({
		                        uid: id
		                    }));
		                }

		                if ((target = self.cache[id]) instanceof mixitup.Target) {
		                    // Already in cache

		                    if (self.config.data.dirtyCheck && !h.deepEquals(data, target.data)) {
		                        // change detected

		                        el = target.render(data);

		                        target.data = data;

		                        if (el !== target.dom.el) {
		                            // Update target element reference

		                            if (target.isInDom) {
		                                target.unbindEvents();

		                                self.dom.parent.replaceChild(el, target.dom.el);
		                            }

		                            if (!target.isShown) {
		                                el.style.display = 'none';
		                            }

		                            target.dom.el = el;

		                            if (target.isInDom) {
		                                target.bindEvents();
		                            }
		                        }
		                    }

		                    el = target.dom.el;
		                } else {
		                    // New target

		                    target = new mixitup.Target();

		                    target.init(null, self, data);

		                    target.hide();
		                }

		                if (!target.isInDom) {
		                    // Adding to DOM

		                    if (!frag) {
		                        // Open frag

		                        frag = self.dom.document.createDocumentFragment();
		                    }

		                    if (frag.lastElementChild) {
		                        frag.appendChild(self.dom.document.createTextNode(' '));
		                    }

		                    frag.appendChild(target.dom.el);

		                    target.isInDom = true;

		                    target.unbindEvents();
		                    target.bindEvents();
		                    target.hide();

		                    operation.toShow.push(target);

		                    insertedTargets.push(target);
		                } else {
		                    // Already in DOM

		                    nextEl = target.dom.el.nextElementSibling;

		                    persistantNewIds.push(id);

		                    if (frag) {
		                        // Close and insert previously opened frag

		                        if (frag.lastElementChild) {
		                            frag.appendChild(self.dom.document.createTextNode(' '));
		                        }

		                        self.insertDatasetFrag(frag, target.dom.el, insertedTargets);

		                        frag = null;
		                    }
		                }

		                operation.show.push(target);
		            }

		            if (frag) {
		                // Unclosed frag remaining

		                nextEl = nextEl || self.config.layout.siblingAfter;

		                if (nextEl) {
		                    frag.appendChild(self.dom.document.createTextNode(' '));
		                }

		                self.insertDatasetFrag(frag, nextEl, insertedTargets);
		            }

		            for (i = 0; data = operation.startDataset[i]; i++) {
		                id = data[self.config.data.uidKey];

		                target = self.cache[id];

		                if (operation.show.indexOf(target) < 0) {
		                    // Previously shown but now absent

		                    operation.hide.push(target);
		                    operation.toHide.push(target);
		                    operation.toRemove.push(target);
		                } else {
		                    persistantStartIds.push(id);
		                }
		            }

		            if (!h.isEqualArray(persistantStartIds, persistantNewIds)) {
		                operation.willSort = true;
		            }

		            self.callActions('afterDiffDatasets', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.1.5
		         * @param   {DocumentFragment}          frag
		         * @param   {(HTMLElement|null)}        nextEl
		         * @param   {Array.<mixitup.Target>}    targets
		         * @return  {void}
		         */

		        insertDatasetFrag: function(frag, nextEl, targets) {
		            var self = this;
		            var insertAt = nextEl ? h.arrayFromList(self.dom.parent.children).indexOf(nextEl) : self.targets.length;

		            self.dom.parent.insertBefore(frag, nextEl);

		            while (targets.length) {
		                self.targets.splice(insertAt, 0, targets.shift());

		                insertAt++;
		            }
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {mixitup.CommandSort} sortCommandA
		         * @param   {mixitup.CommandSort} sortCommandB
		         * @return  {boolean}
		         */

		        willSort: function(sortCommandA, sortCommandB) {
		            var self    = this,
		                result  = false;

		            if (
		                self.config.behavior.liveSort ||
		                sortCommandA.order       === 'random' ||
		                sortCommandA.attribute   !== sortCommandB.attribute ||
		                sortCommandA.order       !== sortCommandB.order ||
		                sortCommandA.collection  !== sortCommandB.collection ||
		                (sortCommandA.next === null && sortCommandB.next) ||
		                (sortCommandA.next && sortCommandB.next === null)
		            ) {
		                result = true;
		            } else if (sortCommandA.next && sortCommandB.next) {
		                result = self.willSort(sortCommandA.next, sortCommandB.next);
		            } else {
		                result = false;
		            }

		            return self.callFilters('resultWillSort', result, arguments);
		        },

		        /**
		         * A shorthand method for `.filter('all')`. Shows all targets in the container.
		         *
		         * @example
		         *
		         * .show()
		         *
		         * @example <caption>Example: Showing all targets</caption>
		         *
		         * mixer.show()
		         *     .then(function(state) {
		         *         console.log(state.totalShow === state.totalTargets); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @return      {Promise.<mixitup.State>}
		         */

		        show: function() {
		            var self = this;

		            return self.filter('all');
		        },

		        /**
		         * A shorthand method for `.filter('none')`. Hides all targets in the container.
		         *
		         * @example
		         *
		         * .hide()
		         *
		         * @example <caption>Example: Hiding all targets</caption>
		         *
		         * mixer.hide()
		         *     .then(function(state) {
		         *         console.log(state.totalShow === 0); // true
		         *         console.log(state.totalHide === state.totalTargets); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @return      {Promise.<mixitup.State>}
		         */

		        hide: function() {
		            var self = this;

		            return self.filter('none');
		        },

		        /**
		         * Returns a boolean indicating whether or not a MixItUp operation is
		         * currently in progress.
		         *
		         * @example
		         *
		         * .isMixing()
		         *
		         * @example <caption>Example: Checking the status of a mixer</caption>
		         *
		         * mixer.sort('random', function() {
		         *     console.log(mixer.isMixing()) // false
		         * });
		         *
		         * console.log(mixer.isMixing()) // true
		         *
		         * @public
		         * @instance
		         * @since   2.0.0
		         * @return  {boolean}
		         */

		        isMixing: function() {
		            var self = this;

		            return self.isBusy;
		        },

		        /**
		         * Filters all targets in the container by a provided selector string, or the values `'all'`
		         * or `'none'`. Only targets matching the selector will be shown.
		         *
		         * @example
		         *
		         * .filter(selector [, animate] [, callback])
		         *
		         * @example <caption>Example 1: Filtering targets by a class selector</caption>
		         *
		         * mixer.filter('.category-a')
		         *     .then(function(state) {
		         *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a').length); // true
		         *     });
		         *
		         * @example <caption>Example 2: Filtering targets by an attribute selector</caption>
		         *
		         * mixer.filter('[data-category~="a"]')
		         *     .then(function(state) {
		         *         console.log(state.totalShow === containerEl.querySelectorAll('[data-category~="a"]').length); // true
		         *     });
		         *
		         * @example <caption>Example 3: Filtering targets by a compound selector</caption>
		         *
		         * // Show only those targets with the classes 'category-a' AND 'category-b'
		         *
		         * mixer.filter('.category-a.category-c')
		         *     .then(function(state) {
		         *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a.category-c').length); // true
		         *     });
		         *
		         * @example <caption>Example 4: Filtering via an element collection</caption>
		         *
		         * var collection = Array.from(container.querySelectorAll('.mix'));
		         *
		         * console.log(collection.length); // 34
		         *
		         * // Filter the collection manually using Array.prototype.filter
		         *
		         * var filtered = collection.filter(function(target) {
		         *    return parseInt(target.getAttribute('data-price')) > 10;
		         * });
		         *
		         * console.log(filtered.length); // 22
		         *
		         * // Pass the filtered collection to MixItUp
		         *
		         * mixer.filter(filtered)
		         *    .then(function(state) {
		         *        console.log(state.activeFilter.collection.length === 22); // true
		         *    });
		         *
		         * @public
		         * @instance
		         * @since       2.0.0
		         * @param       {(string|HTMLElement|Array.<HTMLElement>)} selector
		         *      Any valid CSS selector (i.e. `'.category-a'`), or the values `'all'` or `'none'`. The filter method also accepts a reference to single target element or a collection of target elements to show.
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        filter: function() {
		            var self        = this,
		                instruction = self.parseFilterArgs(arguments);

		            return self.multimix({
		                filter: instruction.command
		            }, instruction.animate, instruction.callback);
		        },

		        /**
		         * Adds an additional selector to the currently active filter selector, concatenating
		         * as per the logic defined in `controls.toggleLogic`.
		         *
		         * @example
		         *
		         * .toggleOn(selector [, animate] [, callback])
		         *
		         * @example <caption>Example: Toggling on a filter selector</caption>
		         *
		         * console.log(mixer.getState().activeFilter.selector); // '.category-a'
		         *
		         * mixer.toggleOn('.category-b')
		         *     .then(function(state) {
		         *         console.log(state.activeFilter.selector); // '.category-a, .category-b'
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {string}    selector
		         *      Any valid CSS selector (i.e. `'.category-a'`)
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        toggleOn: function() {
		            var self            = this,
		                instruction     = self.parseFilterArgs(arguments),
		                selector        = instruction.command.selector,
		                toggleSelector  = '';

		            self.isToggling = true;

		            if (self.toggleArray.indexOf(selector) < 0) {
		                self.toggleArray.push(selector);
		            }

		            toggleSelector = self.getToggleSelector();

		            return self.multimix({
		                filter: toggleSelector
		            }, instruction.animate, instruction.callback);
		        },

		        /**
		         * Removes a selector from the active filter selector.
		         *
		         * @example
		         *
		         * .toggleOff(selector [, animate] [, callback])
		         *
		         * @example <caption>Example: Toggling off a filter selector</caption>
		         *
		         * console.log(mixer.getState().activeFilter.selector); // '.category-a, .category-b'
		         *
		         * mixer.toggleOff('.category-b')
		         *     .then(function(state) {
		         *         console.log(state.activeFilter.selector); // '.category-a'
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {string}    selector
		         *      Any valid CSS selector (i.e. `'.category-a'`)
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        toggleOff: function() {
		            var self            = this,
		                instruction     = self.parseFilterArgs(arguments),
		                selector        = instruction.command.selector,
		                selectorIndex   = self.toggleArray.indexOf(selector),
		                toggleSelector  = '';

		            self.isToggling = true;

		            if (selectorIndex > -1) {
		                self.toggleArray.splice(selectorIndex, 1);
		            }

		            toggleSelector = self.getToggleSelector();

		            return self.multimix({
		                filter: toggleSelector
		            }, instruction.animate, instruction.callback);
		        },

		        /**
		         * Sorts all targets in the container according to a provided sort string.
		         *
		         * @example
		         *
		         * .sort(sortString [, animate] [, callback])
		         *
		         * @example <caption>Example 1: Sorting by the default DOM order</caption>
		         *
		         * // Reverse the default order of the targets
		         *
		         * mixer.sort('default:desc')
		         *     .then(function(state) {
		         *         console.log(state.activeSort.attribute === 'default'); // true
		         *         console.log(state.activeSort.order === 'desc'); // true
		         *     });
		         *
		         * @example <caption>Example 2: Sorting by a custom data-attribute</caption>
		         *
		         * // Sort the targets by the value of a `data-published-date` attribute
		         *
		         * mixer.sort('published-date:asc')
		         *     .then(function(state) {
		         *         console.log(state.activeSort.attribute === 'published-date'); // true
		         *         console.log(state.activeSort.order === 'asc'); // true
		         *     });
		         *
		         * @example <caption>Example 3: Sorting by multiple attributes</caption>
		         *
		         * // Sort the targets by the value of a `data-published-date` attribute, then by `data-title`
		         *
		         * mixer.sort('published-date:desc data-title:asc')
		         *     .then(function(state) {
		         *         console.log(state.activeSort.attribute === 'published-date'); // true
		         *         console.log(state.activeSort.order === 'desc'); // true
		         *
		         *         console.log(state.activeSort.next.attribute === 'title'); // true
		         *         console.log(state.activeSort.next.order === 'asc'); // true
		         *     });
		         *
		         * @example <caption>Example 4: Sorting by random</caption>
		         *
		         * mixer.sort('random')
		         *     .then(function(state) {
		         *         console.log(state.activeSort.order === 'random') // true
		         *     });
		         *
		         * @example <caption>Example 5: Sorting via an element collection</caption>
		         *
		         * var collection = Array.from(container.querySelectorAll('.mix'));
		         *
		         * // Swap the position of two elements in the collection:
		         *
		         * var temp = collection[1];
		         *
		         * collection[1] = collection[0];
		         * collection[0] = temp;
		         *
		         * // Pass the sorted collection to MixItUp
		         *
		         * mixer.sort(collection)
		         *     .then(function(state) {
		         *         console.log(state.targets[0] === collection[0]); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       2.0.0
		         * @param       {(string|Array.<HTMLElement>)}    sortString
		         *      A valid sort string (e.g. `'default'`, `'published-date:asc'`, or `'random'`). The sort method also accepts an array of all target elements in a user-defined order.
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        sort: function() {
		            var self        = this,
		                instruction = self.parseSortArgs(arguments);

		            return self.multimix({
		                sort: instruction.command
		            }, instruction.animate, instruction.callback);
		        },

		        /**
		         * Changes the layout of the container by adding, removing or updating a
		         * layout-specific class name. If `animation.animateResizetargets` is
		         * enabled, MixItUp will attempt to gracefully animate the width, height,
		         * and position of targets between layout states.
		         *
		         * @example
		         *
		         * .changeLayout(containerClassName [, animate] [, callback])
		         *
		         * @example <caption>Example 1: Adding a new class name to the container</caption>
		         *
		         * mixer.changeLayout('container-list')
		         *      .then(function(state) {
		         *          console.log(state.activeContainerClass === 'container-list'); // true
		         *      });
		         *
		         * @example <caption>Example 2: Removing a previously added class name from the container</caption>
		         *
		         * mixer.changeLayout('')
		         *      .then(function(state) {
		         *          console.log(state.activeContainerClass === ''); // true
		         *      });
		         *
		         * @public
		         * @instance
		         * @since       2.0.0
		         * @param       {string}    containerClassName
		         *      A layout-specific class name to add to the container.
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        changeLayout: function() {
		            var self        = this,
		                instruction = self.parseChangeLayoutArgs(arguments);

		            return self.multimix({
		                changeLayout: instruction.command
		            }, instruction.animate, instruction.callback);
		        },

		        /**
		         * Updates the contents and order of the container to reflect the provided dataset,
		         * if the dataset API is in use.
		         *
		         * The dataset API is designed for use in API-driven JavaScript applications, and
		         * can be used instead of DOM-based methods such as `.filter()`, `.sort()`,
		         * `.insert()`, etc. When used, insertion, removal, sorting and pagination can be
		         * achieved purely via changes to your data model, without the uglyness of having
		         * to interact with or query the DOM directly.
		         *
		         * @example
		         *
		         * .dataset(dataset [, animate] [, callback])
		         *
		         * @example <caption>Example 1: Rendering a dataset</caption>
		         *
		         * var myDataset = [
		         *     {id: 1, ...},
		         *     {id: 2, ...},
		         *     {id: 3, ...}
		         * ];
		         *
		         * mixer.dataset(myDataset)
		         *     .then(function(state) {
		         *         console.log(state.totalShow === 3); // true
		         *     });
		         *
		         * @example <caption>Example 2: Sorting a dataset</caption>
		         *
		         * // Create a new dataset in reverse order
		         *
		         * var newDataset = myDataset.slice().reverse();
		         *
		         * mixer.dataset(newDataset)
		         *     .then(function(state) {
		         *         console.log(state.activeDataset[0] === myDataset[2]); // true
		         *     });
		         *
		         * @example <caption>Example 3: Removing an item from the dataset</caption>
		         *
		         * console.log(myDataset.length); // 3
		         *
		         * // Create a new dataset with the last item removed.
		         *
		         * var newDataset = myDataset.slice().pop();
		         *
		         * mixer.dataset(newDataset)
		         *     .then(function(state) {
		         *         console.log(state.totalShow === 2); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {Array.<object>}    dataset
		         *      An array of objects, each one representing the underlying data model of a target to be rendered.
		         * @param       {boolean}           [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}          [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        dataset: function() {
		            var self        = this,
		                instruction = self.parseDatasetArgs(arguments),
		                operation   = null,
		                queueItem   = null,
		                animate     = false;

		            self.callActions('beforeDataset', arguments);

		            if (!self.isBusy) {
		                if (instruction.callback) self.userCallback = instruction.callback;

		                animate = (instruction.animate ^ self.config.animation.enable) ? instruction.animate : self.config.animation.enable;

		                operation = self.getDataOperation(instruction.command.dataset);

		                return self.goMix(animate, operation);
		            } else {
		                queueItem = new mixitup.QueueItem();

		                queueItem.args          = arguments;
		                queueItem.instruction   = instruction;

		                return self.queueMix(queueItem);
		            }
		        },

		        /**
		         * Performs simultaneous `filter`, `sort`, `insert`, `remove` and `changeLayout`
		         * operations as requested.
		         *
		         * @example
		         *
		         * .multimix(multimixCommand [, animate] [, callback])
		         *
		         * @example <caption>Example 1: Performing simultaneous filtering and sorting</caption>
		         *
		         * mixer.multimix({
		         *     filter: '.category-b',
		         *     sort: 'published-date:desc'
		         * })
		         *     .then(function(state) {
		         *         console.log(state.activeFilter.selector === '.category-b'); // true
		         *         console.log(state.activeSort.attribute === 'published-date'); // true
		         *     });
		         *
		         * @example <caption>Example 2: Performing simultaneous sorting, insertion, and removal</caption>
		         *
		         * console.log(mixer.getState().totalShow); // 6
		         *
		         * // NB: When inserting via `multimix()`, an object should be provided as the value
		         * // for the `insert` portion of the command, allowing for a collection of elements
		         * // and an insertion index to be specified.
		         *
		         * mixer.multimix({
		         *     sort: 'published-date:desc', // Sort the container, including any new elements
		         *     insert: {
		         *         collection: [newElementReferenceA, newElementReferenceB], // Add 2 new elements at index 5
		         *         index: 5
		         *     },
		         *     remove: existingElementReference // Remove 1 existing element
		         * })
		         *     .then(function(state) {
		         *         console.log(state.activeSort.attribute === 'published-date'); // true
		         *         console.log(state.totalShow === 7); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       2.0.0
		         * @param       {object}    multimixCommand
		         *      An object containing one or more things to do
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        multimix: function() {
		            var self        = this,
		                operation   = null,
		                animate     = false,
		                queueItem   = null,
		                instruction = self.parseMultimixArgs(arguments);

		            self.callActions('beforeMultimix', arguments);

		            if (!self.isBusy) {
		                operation = self.getOperation(instruction.command);

		                if (self.config.controls.enable) {
		                    // Update controls for API calls

		                    if (instruction.command.filter && !self.isToggling) {
		                        // As we are not toggling, reset the toggle array
		                        // so new filter overrides existing toggles

		                        self.toggleArray.length = 0;
		                        self.buildToggleArray(operation.command);
		                    }

		                    if (self.queue.length < 1) {
		                        self.updateControls(operation.command);
		                    }
		                }

		                if (instruction.callback) self.userCallback = instruction.callback;

		                // Always allow the instruction to override the instance setting

		                animate = (instruction.animate ^ self.config.animation.enable) ?
		                    instruction.animate :
		                    self.config.animation.enable;

		                self.callFilters('operationMultimix', operation, arguments);

		                return self.goMix(animate, operation);
		            } else {
		                queueItem = new mixitup.QueueItem();

		                queueItem.args           = arguments;
		                queueItem.instruction    = instruction;
		                queueItem.triggerElement = self.lastClicked;
		                queueItem.isToggling     = self.isToggling;

		                return self.queueMix(queueItem);
		            }
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {object}            multimixCommand
		         * @param   {boolean}           [isPreFetch]
		         *      An optional boolean indicating that the operation is being pre-fetched for execution at a later time.
		         * @return  {Operation|null}
		         */

		        getOperation: function(multimixCommand) {
		            var self                = this,
		                sortCommand         = multimixCommand.sort,
		                filterCommand       = multimixCommand.filter,
		                changeLayoutCommand = multimixCommand.changeLayout,
		                removeCommand       = multimixCommand.remove,
		                insertCommand       = multimixCommand.insert,
		                operation           = new mixitup.Operation();

		            operation = self.callFilters('operationUnmappedGetOperation', operation, arguments);

		            operation.id                = h.randomHex();
		            operation.command           = multimixCommand;
		            operation.startState        = self.state;
		            operation.triggerElement    = self.lastClicked;

		            if (self.isBusy) {
		                if (self.config.debug.showWarnings) {
		                    console.warn(mixitup.messages.warningGetOperationInstanceBusy());
		                }

		                return null;
		            }

		            if (insertCommand) {
		                self.insertTargets(insertCommand, operation);
		            }

		            if (removeCommand) {
		                operation.toRemove = removeCommand.targets;
		            }

		            operation.startSort = operation.newSort = operation.startState.activeSort;
		            operation.startOrder = operation.newOrder = self.targets;

		            if (sortCommand) {
		                operation.startSort = operation.startState.activeSort;
		                operation.newSort   = sortCommand;

		                operation.willSort = self.willSort(sortCommand, operation.startState.activeSort);

		                if (operation.willSort) {
		                    self.sortOperation(operation);
		                }
		            }

		            operation.startFilter = operation.startState.activeFilter;

		            if (filterCommand) {
		                operation.newFilter = filterCommand;
		            } else {
		                operation.newFilter = h.extend(new mixitup.CommandFilter(), operation.startFilter);
		            }

		            if (operation.newFilter.selector === 'all') {
		                operation.newFilter.selector = self.config.selectors.target;
		            } else if (operation.newFilter.selector === 'none') {
		                operation.newFilter.selector = '';
		            }

		            self.filterOperation(operation);

		            operation.startContainerClassName = operation.startState.activeContainerClassName;

		            if (changeLayoutCommand) {
		                operation.newContainerClassName = changeLayoutCommand.containerClassName;

		                if (operation.newContainerClassName !== operation.startContainerClassName) {
		                    operation.willChangeLayout = true;
		                }
		            } else {
		                operation.newContainerClassName = operation.startContainerClassName;
		            }

		            if (self.config.animation.enable) {
		                // Populate the operation's position data

		                self.getStartMixData(operation);
		                self.setInter(operation);

		                operation.docState = h.getDocumentState(self.dom.document);

		                self.getInterMixData(operation);
		                self.setFinal(operation);
		                self.getFinalMixData(operation);

		                self.parseEffects();

		                operation.hasEffect = self.hasEffect();

		                self.getTweenData(operation);
		            }

		            if (operation.willSort) {
		                self.targets = operation.newOrder;
		            }

		            operation.newState = self.buildState(operation);

		            return self.callFilters('operationMappedGetOperation', operation, arguments);
		        },

		        /**
		         * Renders a previously created operation at a specific point in its path, as
		         * determined by a multiplier between 0 and 1.
		         *
		         * @example
		         * .tween(operation, multiplier)
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {mixitup.Operation}     operation
		         *      An operation object created via the `getOperation` method
		         *
		         * @param   {Float}                 multiplier
		         *      Any number between 0 and 1 representing the percentage complete of the operation
		         * @return  {void}
		         */

		        tween: function(operation, multiplier) {
		            var target          = null,
		                posData         = null,
		                toHideIndex     = -1,
		                i               = -1;

		            multiplier = Math.min(multiplier, 1);
		            multiplier = Math.max(multiplier, 0);

		            for (i = 0; target = operation.show[i]; i++) {
		                posData = operation.showPosData[i];

		                target.applyTween(posData, multiplier);
		            }

		            for (i = 0; target = operation.hide[i]; i++) {
		                if (target.isShown) {
		                    target.hide();
		                }

		                if ((toHideIndex = operation.toHide.indexOf(target)) > -1) {
		                    posData = operation.toHidePosData[toHideIndex];

		                    if (!target.isShown) {
		                        target.show();
		                    }

		                    target.applyTween(posData, multiplier);
		                }
		            }
		        },

		        /**
		         * Inserts one or more new target elements into the container at a specified
		         * index.
		         *
		         * To be indexed as targets, new elements must match the `selectors.target`
		         * selector (`'.mix'` by default).
		         *
		         * @example
		         *
		         * .insert(newElements [, index] [, animate], [, callback])
		         *
		         * @example <caption>Example 1: Inserting a single element via reference</caption>
		         *
		         * console.log(mixer.getState().totalShow); // 0
		         *
		         * // Create a new element
		         *
		         * var newElement = document.createElement('div');
		         * newElement.classList.add('mix');
		         *
		         * mixer.insert(newElement)
		         *     .then(function(state) {
		         *         console.log(state.totalShow === 1); // true
		         *     });
		         *
		         * @example <caption>Example 2: Inserting a single element via HTML string</caption>
		         *
		         * console.log(mixer.getState().totalShow); // 1
		         *
		         * // Create a new element via reference
		         *
		         * var newElementHtml = '&lt;div class="mix"&gt;&lt;/div&gt;';
		         *
		         * // Create and insert the new element at index 1
		         *
		         * mixer.insert(newElementHtml, 1)
		         *     .then(function(state) {
		         *         console.log(state.totalShow === 2); // true
		         *         console.log(state.show[1].outerHTML === newElementHtml); // true
		         *     });
		         *
		         * @example <caption>Example 3: Inserting multiple elements via reference</caption>
		         *
		         * console.log(mixer.getState().totalShow); // 2
		         *
		         * // Create an array of new elements to insert.
		         *
		         * var newElement1 = document.createElement('div');
		         * var newElement2 = document.createElement('div');
		         *
		         * newElement1.classList.add('mix');
		         * newElement2.classList.add('mix');
		         *
		         * var newElementsCollection = [newElement1, newElement2];
		         *
		         * // Insert the new elements starting at index 1
		         *
		         * mixer.insert(newElementsCollection, 1)
		         *     .then(function(state) {
		         *         console.log(state.totalShow === 4); // true
		         *         console.log(state.show[1] === newElement1); // true
		         *         console.log(state.show[2] === newElement2); // true
		         *     });
		         *
		         * @example <caption>Example 4: Inserting a jQuery collection object containing one or more elements</caption>
		         *
		         * console.log(mixer.getState().totalShow); // 4
		         *
		         * var $newElement = $('&lt;div class="mix"&gt;&lt;/div&gt;');
		         *
		         * // Insert the new elements starting at index 3
		         *
		         * mixer.insert($newElement, 3)
		         *     .then(function(state) {
		         *         console.log(state.totalShow === 5); // true
		         *         console.log(state.show[3] === $newElement[0]); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       2.0.0
		         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
		         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
		         * @param       {number}    index=0
		         *      The index at which to insert the new element(s). `0` by default.
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        insert: function() {
		            var self = this,
		                args = self.parseInsertArgs(arguments);

		            return self.multimix({
		                insert: args.command
		            }, args.animate, args.callback);
		        },

		        /**
		         * Inserts one or more new elements before a provided reference element.
		         *
		         * @example
		         *
		         * .insertBefore(newElements, referenceElement [, animate] [, callback])
		         *
		         * @example <caption>Example: Inserting a new element before a reference element</caption>
		         *
		         * // An existing reference element is chosen at index 2
		         *
		         * var referenceElement = mixer.getState().show[2];
		         *
		         * // Create a new element
		         *
		         * var newElement = document.createElement('div');
		         * newElement.classList.add('mix');
		         *
		         * mixer.insertBefore(newElement, referenceElement)
		         *     .then(function(state) {
		         *         // The new element is inserted into the container at index 2, before the reference element
		         *
		         *         console.log(state.show[2] === newElement); // true
		         *
		         *         // The reference element is now at index 3
		         *
		         *         console.log(state.show[3] === referenceElement); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
		         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
		         * @param       {HTMLElement}    referenceElement
		         *      A reference to an existing element in the container to insert new elements before.
		         *@param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        insertBefore: function() {
		            var self = this,
		                args = self.parseInsertArgs(arguments);

		            return self.insert(args.command.collection, 'before', args.command.sibling, args.animate, args.callback);
		        },

		        /**
		         * Inserts one or more new elements after a provided reference element.
		         *
		         * @example
		         *
		         * .insertAfter(newElements, referenceElement [, animate] [, callback])
		         *
		         * @example <caption>Example: Inserting a new element after a reference element</caption>
		         *
		         * // An existing reference element is chosen at index 2
		         *
		         * var referenceElement = mixer.getState().show[2];
		         *
		         * // Create a new element
		         *
		         * var newElement = document.createElement('div');
		         * newElement.classList.add('mix');
		         *
		         * mixer.insertAfter(newElement, referenceElement)
		         *     .then(function(state) {
		         *         // The new element is inserted into the container at index 3, after the reference element
		         *
		         *         console.log(state.show[3] === newElement); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
		         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
		         * @param       {HTMLElement}    referenceElement
		         *      A reference to an existing element in the container to insert new elements after.
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        insertAfter: function() {
		            var self = this,
		                args = self.parseInsertArgs(arguments);

		            return self.insert(args.command.collection, 'after', args.command.sibling, args.animate, args.callback);
		        },

		        /**
		         * Inserts one or more new elements into the container before all existing targets.
		         *
		         * @example
		         *
		         * .prepend(newElements [,animate] [,callback])
		         *
		         * @example <caption>Example: Prepending a new element</caption>
		         *
		         * // Create a new element
		         *
		         * var newElement = document.createElement('div');
		         * newElement.classList.add('mix');
		         *
		         * // Insert the element into the container
		         *
		         * mixer.prepend(newElement)
		         *     .then(function(state) {
		         *         console.log(state.show[0] === newElement); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
		         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        prepend: function() {
		            var self = this,
		                args = self.parseInsertArgs(arguments);

		            return self.insert(0, args.command.collection, args.animate, args.callback);
		        },

		        /**
		         * Inserts one or more new elements into the container after all existing targets.
		         *
		         * @example
		         *
		         * .append(newElements [,animate] [,callback])
		         *
		         * @example <caption>Example: Appending a new element</caption>
		         *
		         * // Create a new element
		         *
		         * var newElement = document.createElement('div');
		         * newElement.classList.add('mix');
		         *
		         * // Insert the element into the container
		         *
		         * mixer.append(newElement)
		         *     .then(function(state) {
		         *         console.log(state.show[state.show.length - 1] === newElement); // true
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
		         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        append: function() {
		            var self = this,
		                args = self.parseInsertArgs(arguments);

		            return self.insert(self.state.totalTargets, args.command.collection, args.animate, args.callback);
		        },

		        /**
		         * Removes one or more existing target elements from the container.
		         *
		         * @example
		         *
		         * .remove(elements [, animate] [, callback])
		         *
		         * @example <caption>Example 1: Removing an element by reference</caption>
		         *
		         * var elementToRemove = containerEl.firstElementChild;
		         *
		         * mixer.remove(elementToRemove)
		         *      .then(function(state) {
		         *          console.log(state.targets.indexOf(elementToRemove) === -1); // true
		         *      });
		         *
		         * @example <caption>Example 2: Removing a collection of elements by reference</caption>
		         *
		         * var elementsToRemove = containerEl.querySelectorAll('.category-a');
		         *
		         * console.log(elementsToRemove.length) // 3
		         *
		         * mixer.remove(elementsToRemove)
		         *      .then(function() {
		         *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
		         *      });
		         *
		         * @example <caption>Example 3: Removing one or more elements by selector</caption>
		         *
		         * mixer.remove('.category-a')
		         *      .then(function() {
		         *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
		         *      });
		         *
		         * @example <caption>Example 4: Removing an element by index</caption>
		         *
		         * console.log(mixer.getState.totalShow); // 4
		         *
		         * // Remove the element at index 3
		         *
		         * mixer.remove(3)
		         *      .then(function(state) {
		         *          console.log(state.totalShow); // 3
		         *          console.log(state.show[3]); // undefined
		         *      });
		         *
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {(HTMLElement|Array.<HTMLElement>|string|number)}    elements
		         *      A reference to a single element to remove, an array-like collection of elements, a selector string, or the index of an element to remove.
		         * @param       {boolean}   [animate=true]
		         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		         * @param       {function}  [callback=null]
		         *      An optional callback function to be invoked after the operation has completed.
		         * @return      {Promise.<mixitup.State>}
		         *      A promise resolving with the current state object.
		         */

		        remove: function() {
		            var self = this,
		                args = self.parseRemoveArgs(arguments);

		            return self.multimix({
		                remove: args.command
		            }, args.animate, args.callback);
		        },

		        /**
		         * Retrieves the the value of any property or sub-object within the current
		         * mixitup configuration, or the whole configuration object.
		         *
		         * @example
		         *
		         * .getConfig([stringKey])
		         *
		         * @example <caption>Example 1: retrieve the entire configuration object</caption>
		         *
		         * var config = mixer.getConfig(); // Config { ... }
		         *
		         * @example <caption>Example 2: retrieve a named sub-object of configuration object</caption>
		         *
		         * var animation = mixer.getConfig('animation'); // ConfigAnimation { ... }
		         *
		         * @example <caption>Example 3: retrieve a value of configuration object via a dot-notation string key</caption>
		         *
		         * var effects = mixer.getConfig('animation.effects'); // 'fade scale'
		         *
		         * @public
		         * @instance
		         * @since       2.0.0
		         * @param       {string}    [stringKey]    A "dot-notation" string key
		         * @return      {*}
		         */

		        getConfig: function(stringKey) {
		            var self    = this,
		                value   = null;

		            if (!stringKey) {
		                value = self.config;
		            } else {
		                value = h.getProperty(self.config, stringKey);
		            }

		            return self.callFilters('valueGetConfig', value, arguments);
		        },

		        /**
		         * Updates the configuration of the mixer, after it has been instantiated.
		         *
		         * See the Configuration Object documentation for a full list of avilable
		         * configuration options.
		         *
		         * @example
		         *
		         * .configure(config)
		         *
		         * @example <caption>Example 1: Updating animation options</caption>
		         *
		         * mixer.configure({
		         *     animation: {
		         *         effects: 'fade translateX(-100%)',
		         *         duration: 300
		         *     }
		         * });
		         *
		         * @example <caption>Example 2: Removing a callback after it has been set</caption>
		         *
		         * var mixer;
		         *
		         * function handleMixEndOnce() {
		         *     // Do something ..
		         *
		         *     // Then nullify the callback
		         *
		         *     mixer.configure({
		         *         callbacks: {
		         *             onMixEnd: null
		         *         }
		         *     });
		         * };
		         *
		         * // Instantiate a mixer with a callback defined
		         *
		         * mixer = mixitup(containerEl, {
		         *     callbacks: {
		         *         onMixEnd: handleMixEndOnce
		         *     }
		         * });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {object}    config
		         *      An object containing one of more configuration options.
		         * @return      {void}
		         */

		        configure: function(config) {
		            var self = this;

		            self.callActions('beforeConfigure', arguments);

		            h.extend(self.config, config, true, true);

		            self.callActions('afterConfigure', arguments);
		        },

		        /**
		         * Returns an object containing information about the current state of the
		         * mixer. See the State Object documentation for more information.
		         *
		         * NB: State objects are immutable and should therefore be regenerated
		         * after any operation.
		         *
		         * @example
		         *
		         * .getState();
		         *
		         * @example <caption>Example: Retrieving a state object</caption>
		         *
		         * var state = mixer.getState();
		         *
		         * console.log(state.totalShow + 'targets are currently shown');
		         *
		         * @public
		         * @instance
		         * @since       2.0.0
		         * @return      {mixitup.State} An object reflecting the current state of the mixer.
		         */

		        getState: function() {
		            var self    = this,
		                state   = null;

		            state = new mixitup.State();

		            h.extend(state, self.state);

		            h.freeze(state);

		            return self.callFilters('stateGetState', state, arguments);
		        },

		        /**
		         * Forces the re-indexing all targets within the container.
		         *
		         * This should only be used if some other piece of code in your application
		         * has manipulated the contents of your container, which should be avoided.
		         *
		         * If you need to add or remove target elements from the container, use
		         * the built-in `.insert()` or `.remove()` methods, and MixItUp will keep
		         * itself up to date.
		         *
		         * @example
		         *
		         * .forceRefresh()
		         *
		         * @example <caption>Example: Force refreshing the mixer after external DOM manipulation</caption>
		         *
		         * console.log(mixer.getState().totalShow); // 3
		         *
		         * // An element is removed from the container via some external DOM manipulation code:
		         *
		         * containerEl.removeChild(containerEl.firstElementChild);
		         *
		         * // The mixer does not know that the number of targets has changed:
		         *
		         * console.log(mixer.getState().totalShow); // 3
		         *
		         * mixer.forceRefresh();
		         *
		         * // After forceRefresh, the mixer is in sync again:
		         *
		         * console.log(mixer.getState().totalShow); // 2
		         *
		         * @public
		         * @instance
		         * @since 2.1.2
		         * @return {void}
		         */

		        forceRefresh: function() {
		            var self = this;

		            self.indexTargets();
		        },

		        /**
		         * Forces the re-rendering of all targets when using the Dataset API.
		         *
		         * By default, targets are only re-rendered when `data.dirtyCheck` is
		         * enabled, and an item's data has changed when `dataset()` is called.
		         *
		         * The `forceRender()` method allows for the re-rendering of all targets
		         * in response to some arbitrary event, such as the changing of the target
		         * render function.
		         *
		         * Targets are rendered against their existing data.
		         *
		         * @example
		         *
		         * .forceRender()
		         *
		         * @example <caption>Example: Force render targets after changing the target render function</caption>
		         *
		         * console.log(container.innerHTML); // ... &lt;span class="mix"&gt;Foo&lt;/span&gt; ...
		         *
		         * mixer.configure({
		         *     render: {
		         *         target: (item) => `&lt;a href="/${item.slug}/" class="mix"&gt;${item.title}&lt;/a&gt;`
		         *     }
		         * });
		         *
		         * mixer.forceRender();
		         *
		         * console.log(container.innerHTML); // ... &lt;a href="/foo/" class="mix"&gt;Foo&lt;/a&gt; ...
		         *
		         * @public
		         * @instance
		         * @since 3.2.1
		         * @return {void}
		         */

		        forceRender: function() {
		            var self    = this,
		                target  = null,
		                el      = null,
		                id      = '';

		            for (id in self.cache) {
		                target = self.cache[id];

		                el = target.render(target.data);

		                if (el !== target.dom.el) {
		                    // Update target element reference

		                    if (target.isInDom) {
		                        target.unbindEvents();

		                        self.dom.parent.replaceChild(el, target.dom.el);
		                    }

		                    if (!target.isShown) {
		                        el.style.display = 'none';
		                    }

		                    target.dom.el = el;

		                    if (target.isInDom) {
		                        target.bindEvents();
		                    }
		                }
		            }

		            self.state = self.buildState(self.lastOperation);
		        },

		        /**
		         * Removes mixitup functionality from the container, unbinds all control
		         * event handlers, and deletes the mixer instance from MixItUp's internal
		         * cache.
		         *
		         * This should be performed whenever a mixer's container is removed from
		         * the DOM, such as during a page change in a single page application,
		         * or React's `componentWillUnmount()`.
		         *
		         * @example
		         *
		         * .destroy([cleanUp])
		         *
		         * @example <caption>Example: Destroying the mixer before removing its container element</caption>
		         *
		         * mixer.destroy();
		         *
		         * containerEl.parentElement.removeChild(containerEl);
		         *
		         * @public
		         * @instance
		         * @since   2.0.0
		         * @param   {boolean}   [cleanUp=false]
		         *     An optional boolean dictating whether or not to clean up any inline `display: none;` styling applied to hidden targets.
		         * @return  {void}
		         */

		        destroy: function(cleanUp) {
		            var self    = this,
		                control = null,
		                target  = null,
		                i       = 0;

		            self.callActions('beforeDestroy', arguments);

		            for (i = 0; control = self.controls[i]; i++) {
		                control.removeBinding(self);
		            }

		            for (i = 0; target = self.targets[i]; i++) {
		                if (cleanUp) {
		                    target.show();
		                }

		                target.unbindEvents();
		            }

		            if (self.dom.container.id.match(/^MixItUp/)) {
		                self.dom.container.removeAttribute('id');
		            }

		            delete mixitup.instances[self.id];

		            self.callActions('afterDestroy', arguments);
		        }
		    });

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.IMoveData = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.posIn          = null;
		        this.posOut         = null;
		        this.operation      = null;
		        this.callback       = null;
		        this.statusChange   = '';
		        this.duration       = -1;
		        this.staggerIndex   = -1;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.IMoveData);

		    mixitup.IMoveData.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.IMoveData.prototype.constructor = mixitup.IMoveData;

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.TargetDom = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.el = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.TargetDom);

		    mixitup.TargetDom.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.TargetDom.prototype.constructor = mixitup.TargetDom;

		    /**
		     * @constructor
		     * @namespace
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.Target = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.id         = '';
		        this.sortString = '';
		        this.mixer      = null;
		        this.callback   = null;
		        this.isShown    = false;
		        this.isBound    = false;
		        this.isExcluded = false;
		        this.isInDom    = false;
		        this.handler    = null;
		        this.operation  = null;
		        this.data       = null;
		        this.dom        = new mixitup.TargetDom();

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.Target);

		    mixitup.Target.prototype = Object.create(mixitup.Base.prototype);

		    h.extend(mixitup.Target.prototype, {
		        constructor: mixitup.Target,

		        /**
		         * Initialises a newly instantiated Target.
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {(Element|null)}    el
		         * @param   {object}            mixer
		         * @param   {object}            [data]
		         * @return  {void}
		         */

		        init: function(el, mixer, data) {
		            var self = this,
		                id   = '';

		            self.callActions('beforeInit', arguments);

		            self.mixer = mixer;

		            if (!el) {
		                // If no element is provided, render it

		                el = self.render(data);
		            }

		            self.cacheDom(el);

		            self.bindEvents();

		            if (self.dom.el.style.display !== 'none') {
		                self.isShown = true;
		            }

		            if (data && mixer.config.data.uidKey) {
		                if (typeof (id = data[mixer.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
		                    throw new TypeError(mixitup.messages.errorDatasetInvalidUidKey({
		                        uidKey: mixer.config.data.uidKey
		                    }));
		                }

		                self.id     = id;
		                self.data   = data;

		                mixer.cache[id] = self;
		            }

		            self.callActions('afterInit', arguments);
		        },

		        /**
		         * Renders the target element using a user-defined renderer function.
		         *
		         * @private
		         * @instance
		         * @since   3.1.4
		         * @param   {object} data
		         * @return  {void}
		         */

		        render: function(data) {
		            var self    = this,
		                render  = null,
		                el      = null,
		                temp    = null,
		                output  = '';

		            self.callActions('beforeRender', arguments);

		            render = self.callFilters('renderRender', self.mixer.config.render.target, arguments);

		            if (typeof render !== 'function') {
		                throw new TypeError(mixitup.messages.errorDatasetRendererNotSet());
		            }

		            output = render(data);

		            if (output && typeof output === 'object' && h.isElement(output)) {
		                el = output;
		            } else if (typeof output === 'string') {
		                temp = document.createElement('div');
		                temp.innerHTML = output;

		                el = temp.firstElementChild;
		            }

		            return self.callFilters('elRender', el, arguments);
		        },

		        /**
		         * Caches references of DOM elements neccessary for the target's functionality.
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {Element} el
		         * @return  {void}
		         */

		        cacheDom: function(el) {
		            var self = this;

		            self.callActions('beforeCacheDom', arguments);

		            self.dom.el = el;

		            self.callActions('afterCacheDom', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {string}    attributeName
		         * @return  {void}
		         */

		        getSortString: function(attributeName) {
		            var self    = this,
		                value   = self.dom.el.getAttribute('data-' + attributeName) || '';

		            self.callActions('beforeGetSortString', arguments);

		            value = isNaN(value * 1) ?
		                value.toLowerCase() :
		                value * 1;

		            self.sortString = value;

		            self.callActions('afterGetSortString', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @return  {void}
		         */

		        show: function() {
		            var self = this;

		            self.callActions('beforeShow', arguments);

		            if (!self.isShown) {
		                self.dom.el.style.display = '';

		                self.isShown = true;
		            }

		            self.callActions('afterShow', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @return  {void}
		         */

		        hide: function() {
		            var self = this;

		            self.callActions('beforeHide', arguments);

		            if (self.isShown) {
		                self.dom.el.style.display = 'none';

		                self.isShown = false;
		            }

		            self.callActions('afterHide', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {mixitup.IMoveData} moveData
		         * @return  {void}
		         */

		        move: function(moveData) {
		            var self = this;

		            self.callActions('beforeMove', arguments);

		            if (!self.isExcluded) {
		                self.mixer.targetsMoved++;
		            }

		            self.applyStylesIn(moveData);

		            requestAnimationFrame(function() {
		                self.applyStylesOut(moveData);
		            });

		            self.callActions('afterMove', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {object}    posData
		         * @param   {number}    multiplier
		         * @return  {void}
		         */

		        applyTween: function(posData, multiplier) {
		            var self                    = this,
		                propertyName            = '',
		                tweenData               = null,
		                posIn                   = posData.posIn,
		                currentTransformValues  = [],
		                currentValues           = new mixitup.StyleData(),
		                i                       = -1;

		            self.callActions('beforeApplyTween', arguments);

		            currentValues.x     = posIn.x;
		            currentValues.y     = posIn.y;

		            if (multiplier === 0) {
		                self.hide();
		            } else if (!self.isShown) {
		                self.show();
		            }

		            for (i = 0; propertyName = mixitup.features.TWEENABLE[i]; i++) {
		                tweenData = posData.tweenData[propertyName];

		                if (propertyName === 'x') {
		                    if (!tweenData) continue;

		                    currentValues.x = posIn.x + (tweenData * multiplier);
		                } else if (propertyName === 'y') {
		                    if (!tweenData) continue;

		                    currentValues.y = posIn.y + (tweenData * multiplier);
		                } else if (tweenData instanceof mixitup.TransformData) {
		                    if (!tweenData.value) continue;

		                    currentValues[propertyName].value =
		                        posIn[propertyName].value + (tweenData.value * multiplier);

		                    currentValues[propertyName].unit  = tweenData.unit;

		                    currentTransformValues.push(
		                        propertyName + '(' + currentValues[propertyName].value + tweenData.unit + ')'
		                    );
		                } else {
		                    if (!tweenData) continue;

		                    currentValues[propertyName] = posIn[propertyName] + (tweenData * multiplier);

		                    self.dom.el.style[propertyName] = currentValues[propertyName];
		                }
		            }

		            if (currentValues.x || currentValues.y) {
		                currentTransformValues.unshift('translate(' + currentValues.x + 'px, ' + currentValues.y + 'px)');
		            }

		            if (currentTransformValues.length) {
		                self.dom.el.style[mixitup.features.transformProp] = currentTransformValues.join(' ');
		            }

		            self.callActions('afterApplyTween', arguments);
		        },

		        /**
		         * Applies the initial styling to a target element before any transition
		         * is applied.
		         *
		         * @private
		         * @instance
		         * @param   {mixitup.IMoveData} moveData
		         * @return  {void}
		         */

		        applyStylesIn: function(moveData) {
		            var self            = this,
		                posIn           = moveData.posIn,
		                isFading        = self.mixer.effectsIn.opacity !== 1,
		                transformValues = [];

		            self.callActions('beforeApplyStylesIn', arguments);

		            transformValues.push('translate(' + posIn.x + 'px, ' + posIn.y + 'px)');

		            if (self.mixer.config.animation.animateResizeTargets) {
		                if (moveData.statusChange !== 'show') {
		                    // Don't apply posIn width or height or showing, as will be 0

		                    self.dom.el.style.width  = posIn.width + 'px';
		                    self.dom.el.style.height = posIn.height + 'px';
		                }

		                self.dom.el.style.marginRight  = posIn.marginRight + 'px';
		                self.dom.el.style.marginBottom = posIn.marginBottom + 'px';
		            }

		            isFading && (self.dom.el.style.opacity = posIn.opacity);

		            if (moveData.statusChange === 'show') {
		                transformValues = transformValues.concat(self.mixer.transformIn);
		            }

		            self.dom.el.style[mixitup.features.transformProp] = transformValues.join(' ');

		            self.callActions('afterApplyStylesIn', arguments);
		        },

		        /**
		         * Applies a transition followed by the final styles for the element to
		         * transition towards.
		         *
		         * @private
		         * @instance
		         * @param   {mixitup.IMoveData} moveData
		         * @return  {void}
		         */

		        applyStylesOut: function(moveData) {
		            var self            = this,
		                transitionRules = [],
		                transformValues = [],
		                isResizing      = self.mixer.config.animation.animateResizeTargets,
		                isFading        = typeof self.mixer.effectsIn.opacity !== 'undefined';

		            self.callActions('beforeApplyStylesOut', arguments);

		            // Build the transition rules

		            transitionRules.push(self.writeTransitionRule(
		                mixitup.features.transformRule,
		                moveData.staggerIndex
		            ));

		            if (moveData.statusChange !== 'none') {
		                transitionRules.push(self.writeTransitionRule(
		                    'opacity',
		                    moveData.staggerIndex,
		                    moveData.duration
		                ));
		            }

		            if (isResizing) {
		                transitionRules.push(self.writeTransitionRule(
		                    'width',
		                    moveData.staggerIndex,
		                    moveData.duration
		                ));

		                transitionRules.push(self.writeTransitionRule(
		                    'height',
		                    moveData.staggerIndex,
		                    moveData.duration
		                ));

		                transitionRules.push(self.writeTransitionRule(
		                    'margin',
		                    moveData.staggerIndex,
		                    moveData.duration
		                ));
		            }

		            // If no callback was provided, the element will
		            // not transition in any way so tag it as "immovable"

		            if (!moveData.callback) {
		                self.mixer.targetsImmovable++;

		                if (self.mixer.targetsMoved === self.mixer.targetsImmovable) {
		                    // If the total targets moved is equal to the
		                    // number of immovable targets, the operation
		                    // should be considered finished

		                    self.mixer.cleanUp(moveData.operation);
		                }

		                return;
		            }

		            // If the target will transition in some fasion,
		            // assign a callback function

		            self.operation = moveData.operation;
		            self.callback = moveData.callback;

		            // As long as the target is not excluded, increment
		            // the total number of targets bound

		            !self.isExcluded && self.mixer.targetsBound++;

		            // Tag the target as bound to differentiate from transitionEnd
		            // events that may come from stylesheet driven effects

		            self.isBound = true;

		            // Apply the transition

		            self.applyTransition(transitionRules);

		            // Apply width, height and margin negation

		            if (isResizing && moveData.posOut.width > 0 && moveData.posOut.height > 0) {
		                self.dom.el.style.width        = moveData.posOut.width + 'px';
		                self.dom.el.style.height       = moveData.posOut.height + 'px';
		                self.dom.el.style.marginRight  = moveData.posOut.marginRight + 'px';
		                self.dom.el.style.marginBottom = moveData.posOut.marginBottom + 'px';
		            }

		            if (!self.mixer.config.animation.nudge && moveData.statusChange === 'hide') {
		                // If we're not nudging, the translation should be
		                // applied before any other transforms to prevent
		                // lateral movement

		                transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
		            }

		            // Apply fade

		            switch (moveData.statusChange) {
		                case 'hide':
		                    isFading && (self.dom.el.style.opacity = self.mixer.effectsOut.opacity);

		                    transformValues = transformValues.concat(self.mixer.transformOut);

		                    break;
		                case 'show':
		                    isFading && (self.dom.el.style.opacity = 1);
		            }

		            if (
		                self.mixer.config.animation.nudge ||
		                (!self.mixer.config.animation.nudge && moveData.statusChange !== 'hide')
		            ) {
		                // Opposite of above - apply translate after
		                // other transform

		                transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
		            }

		            // Apply transforms

		            self.dom.el.style[mixitup.features.transformProp] = transformValues.join(' ');

		            self.callActions('afterApplyStylesOut', arguments);
		        },

		        /**
		         * Combines the name of a CSS property with the appropriate duration and delay
		         * values to created a valid transition rule.
		         *
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {string}    property
		         * @param   {number}    staggerIndex
		         * @param   {number}    duration
		         * @return  {string}
		         */

		        writeTransitionRule: function(property, staggerIndex, duration) {
		            var self  = this,
		                delay = self.getDelay(staggerIndex),
		                rule  = '';

		            rule = property + ' ' +
		                (duration > 0 ? duration : self.mixer.config.animation.duration) + 'ms ' +
		                delay + 'ms ' +
		                (property === 'opacity' ? 'linear' : self.mixer.config.animation.easing);

		            return self.callFilters('ruleWriteTransitionRule', rule, arguments);
		        },

		        /**
		         * Calculates the transition delay for each target element based on its index, if
		         * staggering is applied. If defined, A custom `animation.staggerSeqeuence`
		         * function can be used to manipulate the order of indices to produce custom
		         * stagger effects (e.g. for use in a grid with irregular row lengths).
		         *
		         * @private
		         * @instance
		         * @since   2.0.0
		         * @param   {number}    index
		         * @return  {number}
		         */

		        getDelay: function(index) {
		            var self    = this,
		                delay   = -1;

		            if (typeof self.mixer.config.animation.staggerSequence === 'function') {
		                index = self.mixer.config.animation.staggerSequence.call(self, index, self.state);
		            }

		            delay = !!self.mixer.staggerDuration ? index * self.mixer.staggerDuration : 0;

		            return self.callFilters('delayGetDelay', delay, arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {string[]}  rules
		         * @return  {void}
		         */

		        applyTransition: function(rules) {
		            var self                = this,
		                transitionString    = rules.join(', ');

		            self.callActions('beforeApplyTransition', arguments);

		            self.dom.el.style[mixitup.features.transitionProp] = transitionString;

		            self.callActions('afterApplyTransition', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {Event} e
		         * @return  {void}
		         */

		        handleTransitionEnd: function(e) {
		            var self        = this,
		                propName    = e.propertyName,
		                canResize   = self.mixer.config.animation.animateResizeTargets;

		            self.callActions('beforeHandleTransitionEnd', arguments);

		            if (
		                self.isBound &&
		                e.target.matches(self.mixer.config.selectors.target) &&
		                (
		                    propName.indexOf('transform') > -1 ||
		                    propName.indexOf('opacity') > -1 ||
		                    canResize && propName.indexOf('height') > -1 ||
		                    canResize && propName.indexOf('width') > -1 ||
		                    canResize && propName.indexOf('margin') > -1
		                )
		            ) {
		                self.callback.call(self, self.operation);

		                self.isBound = false;
		                self.callback = null;
		                self.operation = null;
		            }

		            self.callActions('afterHandleTransitionEnd', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {Event}     e
		         * @return  {void}
		         */

		        eventBus: function(e) {
		            var self = this;

		            self.callActions('beforeEventBus', arguments);

		            switch (e.type) {
		                case 'webkitTransitionEnd':
		                case 'transitionend':
		                    self.handleTransitionEnd(e);
		            }

		            self.callActions('afterEventBus', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @return  {void}
		         */

		        unbindEvents: function() {
		            var self = this;

		            self.callActions('beforeUnbindEvents', arguments);

		            h.off(self.dom.el, 'webkitTransitionEnd', self.handler);
		            h.off(self.dom.el, 'transitionend', self.handler);

		            self.callActions('afterUnbindEvents', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @return  {void}
		         */

		        bindEvents: function() {
		            var self                = this,
		                transitionEndEvent  = '';

		            self.callActions('beforeBindEvents', arguments);

		            transitionEndEvent = mixitup.features.transitionPrefix === 'webkit' ? 'webkitTransitionEnd' : 'transitionend';

		            self.handler = function(e) {
		                return self.eventBus(e);
		            };

		            h.on(self.dom.el, transitionEndEvent, self.handler);

		            self.callActions('afterBindEvents', arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since   3.0.0
		         * @param   {boolean}   [getBox]
		         * @return  {PosData}
		         */

		        getPosData: function(getBox) {
		            var self    = this,
		                styles  = {},
		                rect    = null,
		                posData = new mixitup.StyleData();

		            self.callActions('beforeGetPosData', arguments);

		            posData.x = self.dom.el.offsetLeft;
		            posData.y = self.dom.el.offsetTop;

		            if (self.mixer.config.animation.animateResizeTargets || getBox) {
		                rect = self.dom.el.getBoundingClientRect();

		                posData.top     = rect.top;
		                posData.right   = rect.right;
		                posData.bottom  = rect.bottom;
		                posData.left    = rect.left;

		                posData.width  = rect.width;
		                posData.height = rect.height;
		            }

		            if (self.mixer.config.animation.animateResizeTargets) {
		                styles = window.getComputedStyle(self.dom.el);

		                posData.marginBottom = parseFloat(styles.marginBottom);
		                posData.marginRight  = parseFloat(styles.marginRight);
		            }

		            return self.callFilters('posDataGetPosData', posData, arguments);
		        },

		        /**
		         * @private
		         * @instance
		         * @since       3.0.0
		         * @return      {void}
		         */

		        cleanUp: function() {
		            var self = this;

		            self.callActions('beforeCleanUp', arguments);

		            self.dom.el.style[mixitup.features.transformProp]  = '';
		            self.dom.el.style[mixitup.features.transitionProp] = '';
		            self.dom.el.style.opacity                          = '';

		            if (self.mixer.config.animation.animateResizeTargets) {
		                self.dom.el.style.width        = '';
		                self.dom.el.style.height       = '';
		                self.dom.el.style.marginRight  = '';
		                self.dom.el.style.marginBottom = '';
		            }

		            self.callActions('afterCleanUp', arguments);
		        }
		    });

		    /**
		     * A jQuery-collection-like wrapper around one or more `mixitup.Mixer` instances
		     * allowing simultaneous control of said instances similar to the MixItUp 2 API.
		     *
		     * @example
		     * new mixitup.Collection(instances)
		     *
		     * @constructor
		     * @namespace
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     * @param       {mixitup.Mixer[]}   instances
		     */

		    mixitup.Collection = function(instances) {
		        var instance    = null,
		            i           = -1;

		        this.callActions('beforeConstruct');

		        for (i = 0; instance = instances[i]; i++) {
		            this[i] = instance;
		        }

		        this.length = instances.length;

		        this.callActions('afterConstruct');

		        h.freeze(this);
		    };

		    mixitup.BaseStatic.call(mixitup.Collection);

		    mixitup.Collection.prototype = Object.create(mixitup.Base.prototype);

		    h.extend(mixitup.Collection.prototype,
		    /** @lends mixitup.Collection */
		    {
		        constructor: mixitup.Collection,

		        /**
		         * Calls a method on all instances in the collection by passing the method
		         * name as a string followed by any applicable parameters to be curried into
		         * to the method.
		         *
		         * @example
		         * .mixitup(methodName[,arg1][,arg2..]);
		         *
		         * @example
		         * var collection = new Collection([mixer1, mixer2]);
		         *
		         * return collection.mixitup('filter', '.category-a')
		         *     .then(function(states) {
		         *         state.forEach(function(state) {
		         *             console.log(state.activeFilter.selector); // .category-a
		         *         });
		         *     });
		         *
		         * @public
		         * @instance
		         * @since       3.0.0
		         * @param       {string}  methodName
		         * @return      {Promise<Array<mixitup.State>>}
		         */

		        mixitup: function(methodName) {
		            var self        = this,
		                instance    = null,
		                args        = Array.prototype.slice.call(arguments),
		                tasks       = [],
		                i           = -1;

		            this.callActions('beforeMixitup');

		            args.shift();

		            for (i = 0; instance = self[i]; i++) {
		                tasks.push(instance[methodName].apply(instance, args));
		            }

		            return self.callFilters('promiseMixitup', h.all(tasks, mixitup.libraries), arguments);
		        }
		    });

		    /**
		     * `mixitup.Operation` objects contain all data neccessary to describe the full
		     * lifecycle of any MixItUp operation. They can be used to compute and store an
		     * operation for use at a later time (e.g. programmatic tweening).
		     *
		     * @constructor
		     * @namespace
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.Operation = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.id                      = '';

		        this.args                    = [];
		        this.command                 = null;
		        this.showPosData             = [];
		        this.toHidePosData           = [];

		        this.startState              = null;
		        this.newState                = null;
		        this.docState                = null;

		        this.willSort                = false;
		        this.willChangeLayout        = false;
		        this.hasEffect               = false;
		        this.hasFailed               = false;

		        this.triggerElement          = null;

		        this.show                    = [];
		        this.hide                    = [];
		        this.matching                = [];
		        this.toShow                  = [];
		        this.toHide                  = [];
		        this.toMove                  = [];
		        this.toRemove                = [];
		        this.startOrder              = [];
		        this.newOrder                = [];
		        this.startSort               = null;
		        this.newSort                 = null;
		        this.startFilter             = null;
		        this.newFilter               = null;
		        this.startDataset            = null;
		        this.newDataset              = null;
		        this.viewportDeltaX          = 0;
		        this.viewportDeltaY          = 0;
		        this.startX                  = 0;
		        this.startY                  = 0;
		        this.startHeight             = 0;
		        this.startWidth              = 0;
		        this.newX                    = 0;
		        this.newY                    = 0;
		        this.newHeight               = 0;
		        this.newWidth                = 0;
		        this.startContainerClassName = '';
		        this.startDisplay            = '';
		        this.newContainerClassName   = '';
		        this.newDisplay              = '';

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.Operation);

		    mixitup.Operation.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.Operation.prototype.constructor = mixitup.Operation;

		    /**
		     * `mixitup.State` objects expose various pieces of data detailing the state of
		     * a MixItUp instance. They are provided at the start and end of any operation via
		     * callbacks and events, with the most recent state stored between operations
		     * for retrieval at any time via the API.
		     *
		     * @constructor
		     * @namespace
		     * @memberof    mixitup
		     * @public
		     * @since       3.0.0
		     */

		    mixitup.State = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /**
		         * The ID of the mixer instance.
		         *
		         * @name        id
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {string}
		         * @default     ''
		         */

		        this.id = '';

		        /**
		         * The currently active filter command as set by a control click or API call.
		         *
		         * @name        activeFilter
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {mixitup.CommandFilter}
		         * @default     null
		         */

		        this.activeFilter = null;

		        /**
		         * The currently active sort command as set by a control click or API call.
		         *
		         * @name        activeSort
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {mixitup.CommandSort}
		         * @default     null
		         */

		        this.activeSort = null;

		        /**
		         * The current layout-specific container class name, if applied.
		         *
		         * @name        activeContainerClassName
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {string}
		         * @default     ''
		         */

		        this.activeContainerClassName = '';

		        /**
		         * A reference to the container element that the mixer is instantiated on.
		         *
		         * @name        container
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {Element}
		         * @default     null
		         */

		        this.container = null;

		        /**
		         * An array of all target elements indexed by the mixer.
		         *
		         * @name        targets
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {Array.<Element>}
		         * @default     []
		         */

		        this.targets = [];

		        /**
		         * An array of all target elements not matching the current filter.
		         *
		         * @name        hide
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {Array.<Element>}
		         * @default     []
		         */

		        this.hide = [];

		        /**
		         * An array of all target elements matching the current filter and any additional
		         * limits applied such as pagination.
		         *
		         * @name        show
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {Array.<Element>}
		         * @default     []
		         */

		        this.show = [];

		        /**
		         * An array of all target elements matching the current filter irrespective of
		         * any additional limits applied such as pagination.
		         *
		         * @name        matching
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {Array.<Element>}
		         * @default     []
		         */

		        this.matching = [];

		        /**
		         * An integer representing the total number of target elements indexed by the
		         * mixer. Equivalent to `state.targets.length`.
		         *
		         * @name        totalTargets
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {number}
		         * @default     -1
		         */

		        this.totalTargets = -1;

		        /**
		         * An integer representing the total number of target elements matching the
		         * current filter and any additional limits applied such as pagination.
		         * Equivalent to `state.show.length`.
		         *
		         * @name        totalShow
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {number}
		         * @default     -1
		         */

		        this.totalShow = -1;

		        /**
		         * An integer representing the total number of target elements not matching
		         * the current filter. Equivalent to `state.hide.length`.
		         *
		         * @name        totalHide
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {number}
		         * @default     -1
		         */

		        this.totalHide = -1;

		        /**
		         * An integer representing the total number of target elements matching the
		         * current filter irrespective of any other limits applied such as pagination.
		         * Equivalent to `state.matching.length`.
		         *
		         * @name        totalMatching
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {number}
		         * @default     -1
		         */

		        this.totalMatching = -1;

		        /**
		         * A boolean indicating whether the last operation "failed", i.e. no targets
		         * could be found matching the filter.
		         *
		         * @name        hasFailed
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {boolean}
		         * @default     false
		         */

		        this.hasFailed = false;

		        /**
		         * The DOM element that was clicked if the last operation was triggered by the
		         * clicking of a control and not an API call.
		         *
		         * @name        triggerElement
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {Element|null}
		         * @default     null
		         */

		        this.triggerElement = null;

		        /**
		         * The currently active dataset underlying the rendered targets, if the
		         * dataset API is in use.
		         *
		         * @name        activeDataset
		         * @memberof    mixitup.State
		         * @instance
		         * @type        {Array.<object>}
		         * @default     null
		         */

		        this.activeDataset = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.State);

		    mixitup.State.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.State.prototype.constructor = mixitup.State;

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.UserInstruction = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        this.command    = {};
		        this.animate    = false;
		        this.callback   = null;

		        this.callActions('afterConstruct');

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.UserInstruction);

		    mixitup.UserInstruction.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.UserInstruction.prototype.constructor = mixitup.UserInstruction;

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     */

		    mixitup.Messages = function() {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct');

		        /* Errors
		        ----------------------------------------------------------------------------- */

		        this.ERROR_FACTORY_INVALID_CONTAINER =
		            '[MixItUp] An invalid selector or element reference was passed to the mixitup factory function';

		        this.ERROR_FACTORY_CONTAINER_NOT_FOUND =
		            '[MixItUp] The provided selector yielded no container element';

		        this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS =
		            '[MixItUp] Invalid value for `animation.effects`';

		        this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE =
		            '[MixItUp] Invalid value for `controls.scope`';

		        this.ERROR_CONFIG_INVALID_PROPERTY =
		            '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}';

		        this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION =
		            '. Did you mean "${probableMatch}"?';

		        this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET =
		            '[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`';

		        this.ERROR_DATASET_INVALID_UID_KEY =
		            '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items';

		        this.ERROR_DATASET_DUPLICATE_UID =
		            '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.';

		        this.ERROR_INSERT_INVALID_ARGUMENTS =
		            '[MixItUp] Please provider either an index or a sibling and position to insert, not both';

		        this.ERROR_INSERT_PREEXISTING_ELEMENT =
		            '[MixItUp] An element to be inserted already exists in the container';

		        this.ERROR_FILTER_INVALID_ARGUMENTS =
		            '[MixItUp] Please provide either a selector or collection `.filter()`, not both';

		        this.ERROR_DATASET_NOT_SET =
		            '[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`';

		        this.ERROR_DATASET_PRERENDERED_MISMATCH =
		            '[MixItUp] `load.dataset` does not match pre-rendered targets';

		        this.ERROR_DATASET_RENDERER_NOT_SET =
		            '[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`';

		        this.ERROR_SORT_NON_EXISTENT_ELEMENT =
		            '[MixItUp] An element to be sorted does not already exist in the container';

		        /* Warnings
		        ----------------------------------------------------------------------------- */

		        this.WARNING_FACTORY_PREEXISTING_INSTANCE =
		            '[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored.' +
		            ' If you wish to perform additional methods on this instance, please create a reference.';

		        this.WARNING_INSERT_NO_ELEMENTS =
		            '[MixItUp] WARNING: No valid elements were passed to `.insert()`';

		        this.WARNING_REMOVE_NO_ELEMENTS =
		            '[MixItUp] WARNING: No valid elements were passed to `.remove()`';

		        this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL =
		            '[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the ' +
		            'queue is full or queuing is disabled.';

		        this.WARNING_GET_OPERATION_INSTANCE_BUSY =
		            '[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.';

		        this.WARNING_NO_PROMISE_IMPLEMENTATION =
		            '[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install' +
		            ' an ES6 Promise polyfill.';

		        this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES =
		            '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements' +
		            ' which may product unexpected sort output';

		        this.callActions('afterConstruct');

		        this.compileTemplates();

		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.Messages);

		    mixitup.Messages.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.Messages.prototype.constructor = mixitup.Messages;

		    /**
		     * @return {void}
		     */

		    mixitup.Messages.prototype.compileTemplates = function() {
		        var errorKey        = '';
		        var errorMessage    = '';

		        for (errorKey in this) {
		            if (typeof (errorMessage = this[errorKey]) !== 'string') continue;

		            this[h.camelCase(errorKey)] = h.template(errorMessage);
		        }
		    };

		    mixitup.messages = new mixitup.Messages();

		    /**
		     * @constructor
		     * @memberof    mixitup
		     * @private
		     * @since       3.0.0
		     * @param       {mixitup.Mixer} mixer
		     */

		    mixitup.Facade = function Mixer(mixer) {
		        mixitup.Base.call(this);

		        this.callActions('beforeConstruct', arguments);

		        this.configure          = mixer.configure.bind(mixer);
		        this.show               = mixer.show.bind(mixer);
		        this.hide               = mixer.hide.bind(mixer);
		        this.filter             = mixer.filter.bind(mixer);
		        this.toggleOn           = mixer.toggleOn.bind(mixer);
		        this.toggleOff          = mixer.toggleOff.bind(mixer);
		        this.sort               = mixer.sort.bind(mixer);
		        this.changeLayout       = mixer.changeLayout.bind(mixer);
		        this.multimix           = mixer.multimix.bind(mixer);
		        this.dataset            = mixer.dataset.bind(mixer);
		        this.tween              = mixer.tween.bind(mixer);
		        this.insert             = mixer.insert.bind(mixer);
		        this.insertBefore       = mixer.insertBefore.bind(mixer);
		        this.insertAfter        = mixer.insertAfter.bind(mixer);
		        this.prepend            = mixer.prepend.bind(mixer);
		        this.append             = mixer.append.bind(mixer);
		        this.remove             = mixer.remove.bind(mixer);
		        this.destroy            = mixer.destroy.bind(mixer);
		        this.forceRefresh       = mixer.forceRefresh.bind(mixer);
		        this.forceRender        = mixer.forceRender.bind(mixer);
		        this.isMixing           = mixer.isMixing.bind(mixer);
		        this.getOperation       = mixer.getOperation.bind(mixer);
		        this.getConfig          = mixer.getConfig.bind(mixer);
		        this.getState           = mixer.getState.bind(mixer);

		        this.callActions('afterConstruct', arguments);

		        h.freeze(this);
		        h.seal(this);
		    };

		    mixitup.BaseStatic.call(mixitup.Facade);

		    mixitup.Facade.prototype = Object.create(mixitup.Base.prototype);

		    mixitup.Facade.prototype.constructor = mixitup.Facade;

		    {
		        module.exports = mixitup;
		    }
		    mixitup.BaseStatic.call(mixitup.constructor);

		    mixitup.NAME = 'mixitup';
		    mixitup.CORE_VERSION = '3.3.1';
		})(window); 
	} (mixitup$1));

	var mixitupExports = mixitup$1.exports;
	var mixitup = /*@__PURE__*/getDefaultExportFromCjs(mixitupExports);

	var mixitupMultifilter$1 = {exports: {}};

	/**!
	 * MixItUp MultiFilter v3.3.6
	 * A UI-builder for powerful multidimensional filtering
	 * Build 293e0dda-087e-4a76-aadf-e3e8b311b81f
	 *
	 * Requires mixitup.js >= v^3.1.2
	 *
	 * @copyright Copyright 2014-2020 KunkaLabs Limited.
	 * @author    KunkaLabs Limited.
	 * @link      https://www.kunkalabs.com/mixitup-multifilter/
	 *
	 * @license   Commercial use requires a commercial license.
	 *            https://www.kunkalabs.com/mixitup-multifilter/licenses/
	 *
	 *            Non-commercial use permitted under same terms as  license.
	 *            http://creativecommons.org/licenses/by-nc/3.0/
	 */

	(function (module, exports) {
		(function(window) {

		    var mixitupMultifilter = function(mixitup) {
		        var h = mixitup.h;
		        var diacriticsMap;

		        diacriticsMap = [
		            ['A', /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g],
		            ['AA', /[\uA732]/g],
		            ['AE', /[\u00C6\u01FC\u01E2]/g],
		            ['AO', /[\uA734]/g],
		            ['AU', /[\uA736]/g],
		            ['AV', /[\uA738\uA73A]/g],
		            ['AY', /[\uA73C]/g],
		            ['B', /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g],
		            ['C', /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g],
		            ['D', /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g],
		            ['DZ', /[\u01F1\u01C4]/g],
		            ['Dz', /[\u01F2\u01C5]/g],
		            ['E', /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g],
		            ['F', /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g],
		            ['G', /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g],
		            ['H', /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g],
		            ['I', /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g],
		            ['J', /[\u004A\u24BF\uFF2A\u0134\u0248]/g],
		            ['K', /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g],
		            ['L', /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g],
		            ['LJ', /[\u01C7]/g],
		            ['Lj', /[\u01C8]/g],
		            ['M', /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g],
		            ['N', /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g],
		            ['NJ', /[\u01CA]/g],
		            ['Nj', /[\u01CB]/g],
		            ['O', /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g],
		            ['OI', /[\u01A2]/g],
		            ['OO', /[\uA74E]/g],
		            ['OU', /[\u0222]/g],
		            ['P', /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g],
		            ['Q', /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g],
		            ['R', /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g],
		            ['S', /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g],
		            ['T', /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g],
		            ['TZ', /[\uA728]/g],
		            ['U', /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g],
		            ['V', /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g],
		            ['VY', /[\uA760]/g],
		            ['W', /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g],
		            ['X', /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g],
		            ['Y', /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g],
		            ['Z', /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g],
		            ['a', /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g],
		            ['aa', /[\uA733]/g],
		            ['ae', /[\u00E6\u01FD\u01E3]/g],
		            ['ao', /[\uA735]/g],
		            ['au', /[\uA737]/g],
		            ['av', /[\uA739\uA73B]/g],
		            ['ay', /[\uA73D]/g],
		            ['b', /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g],
		            ['c', /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g],
		            ['d', /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g],
		            ['dz', /[\u01F3\u01C6]/g],
		            ['e', /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g],
		            ['f', /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g],
		            ['g', /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g],
		            ['h', /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g],
		            ['hv', /[\u0195]/g],
		            ['i', /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g],
		            ['j', /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g],
		            ['k', /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g],
		            ['l', /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g],
		            ['lj', /[\u01C9]/g],
		            ['m', /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g],
		            ['n', /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g],
		            ['nj', /[\u01CC]/g],
		            ['o', /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g],
		            ['oi', /[\u01A3]/g],
		            ['ou', /[\u0223]/g],
		            ['oo', /[\uA74F]/g],
		            ['p', /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g],
		            ['q', /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g],
		            ['r', /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g],
		            ['s', /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g],
		            ['t', /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g],
		            ['tz', /[\uA729]/g],
		            ['u', /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g],
		            ['v', /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g],
		            ['vy', /[\uA761]/g],
		            ['w', /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g],
		            ['x', /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g],
		            ['y', /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g],
		            ['z', /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g]
		        ];

		        if (
		            !mixitup.CORE_VERSION ||
		            !h.compareVersions(mixitupMultifilter.REQUIRE_CORE_VERSION, mixitup.CORE_VERSION)
		        ) {
		            throw new Error(
		                '[MixItUp Multifilter] MixItUp Multifilter v' +
		                mixitupMultifilter.EXTENSION_VERSION +
		                ' requires at least MixItUp v' +
		                mixitupMultifilter.REQUIRE_CORE_VERSION
		            );
		        }

		        /**
		         * A group of optional callback functions to be invoked at various
		         * points within the lifecycle of a mixer operation.
		         *
		         * @constructor
		         * @memberof    mixitup.Config
		         * @name        callbacks
		         * @namespace
		         * @public
		         * @since       3.0.0
		         */

		        mixitup.ConfigCallbacks.registerAction('afterConstruct', 'multifilter', function() {
		            /**
		             * A callback function invoked whenever MultiFilter filter groups
		             * are parsed. This occurs whenever the user interacts with filter
		             * group UI, or when the `parseFilterGroups()` API method is called,
		             * but before the resulting filter operation has been triggered.
		             *
		             * By default, this generates the appropriate compound selector and
		             * filters the mixer using a `multimix()` API call internally. This
		             * callback can be used to transform the multimix command object sent
		             * to this API call.
		             *
		             * This is particularly useful when additional behavior such as sorting
		             * or pagination must be taken into account when using the MultiFilter API.
		             *
		             * The callback receives the generated multimix command object, and must
		             * also return a valid multimix command object.
		             *
		             * @example <caption>Example: Overriding the default filtering behavior with `onParseFilterGroups`</caption>
		             * var mixer = mixitup(containerEl, {
		             *     callbacks: {
		             *         onParseFilterGroups: function(command) {
		             *             command.paginate = 3;
		             *             command.sort = 'default:desc';
		             *
		             *             return command;
		             *         }
		             *     }
		             * });
		             *
		             * @name        onParseFilterGroups
		             * @memberof    mixitup.Config.callbacks
		             * @instance
		             * @type        {function}
		             * @default     null
		             */

		            this.onParseFilterGroups = null;
		        });

		        /**
		         * A group of properties defining the behavior of your multifilter UI.
		         *
		         * @constructor
		         * @memberof    mixitup.Config
		         * @name        multifilter
		         * @namespace
		         * @public
		         * @since       3.0.0
		         */

		        mixitup.ConfigMultifilter = function() {

		            /**
		             * A boolean dictating whether or not to enable multifilter functionality.
		             *
		             * If `true`, MixItUp will query the DOM for any elements with a
		             * `data-filter-group` attribute present on instantiation.
		             *
		             * @name        enable
		             * @memberof    mixitup.Config.multifilter
		             * @instance
		             * @type        {boolean}
		             * @default     false
		             */

		            this.enable = false;

		            /**
		             * A string dictating the logic to use when concatenating selectors within
		             * individual filter groups.
		             *
		             * If set to `'or'` (default), targets will be shown if they match any
		             * active filter in the group.
		             *
		             * If set to `'and'`, targets will be shown only if they match
		             * all active filters in the group.
		             *
		             * @name        logicWithinGroup
		             * @memberof    mixitup.Config.multifilter
		             * @instance
		             * @type        {string}
		             * @default     'or'
		             */

		            this.logicWithinGroup = 'or';

		            /**
		             * A string dictating the logic to use when concatenating each group's
		             * selectors into one single selector.
		             *
		             * If set to `'and'` (default), targets will be shown only if they match
		             * the combined active selectors of all groups.
		             *
		             * If set to `'or'`, targets will be shown if they match the active selectors
		             * of any individual group.
		             *
		             * @name        logicBetweenGroups
		             * @memberof    mixitup.Config.multifilter
		             * @instance
		             * @type        {string}
		             * @default     'and'
		             */

		            this.logicBetweenGroups = 'and';

		            /**
		             * An integer dictating the minimum number of characters at which the value
		             * of a text input will be included as a multifilter. This prevents short or
		             * incomplete words with many potential matches from triggering
		             * filter operations.
		             *
		             * @name        minSearchLength
		             * @memberof    mixitup.Config.multifilter
		             * @instance
		             * @type        {number}
		             * @default     3
		             */

		            this.minSearchLength = 3;

		            /**
		             * A string dictating when the parsing of filter groups should occur.
		             *
		             * If set to `'change'` (default), the mixer will be filtered whenever the
		             * filtering UI is interacted with. The mode provides real-time filtering with
		             * instant feedback.
		             *
		             * If set to `'submit'`, the mixer will only be filtered when a submit button is
		             * clicked (if using a `<form>` element as a parent). This enables the user to firstly
		             * make their selection, and then trigger filtering once they have
		             * finished making their selection.
		             *
		             * Alternatively, the `mixer.parseFilterGroups()` method can be called via the API at any
		             * time to trigger the parsing of filter groups and filter the mixer.
		             *
		             * @name        parseOn
		             * @memberof    mixitup.Config.multifilter
		             * @instance
		             * @type        {string}
		             * @default     'change'
		             */

		            this.parseOn = 'change';

		            /**
		             * An integer dictating the duration in ms that must elapse between keyup
		             * events in order to trigger a change.
		             *
		             * Setting a comfortable delay of ~350ms prevents the mixer from being
		             * thrashed while typing occurs.
		             *
		             * @name        keyupThrottleDuration
		             * @memberof    mixitup.Config.multifilter
		             * @instance
		             * @type        {number}
		             * @default     350
		             */

		            this.keyupThrottleDuration = 350;

		            h.seal(this);
		        };

		        /**
		         * The MixItUp configuration object is extended with properties relating to
		         * the MultiFilter extension.
		         *
		         * For the full list of configuration options, please refer to the MixItUp
		         * core documentation.
		         *
		         * @constructor
		         * @memberof    mixitup
		         * @name        Config
		         * @namespace
		         * @public
		         * @since       2.0.0
		         */

		        mixitup.Config.registerAction('beforeConstruct', 'multifilter', function() {
		            this.multifilter = new mixitup.ConfigMultifilter();
		        });

		        mixitup.MultifilterFormEventTracker = function() {
		            this.form           = null;
		            this.totalBound     = 0;
		            this.totalHandled   = 0;

		            h.seal(this);
		        };

		        mixitup.FilterGroupDom = function() {
		            this.el     = null;
		            this.form   = null;

		            h.seal(this);
		        };

		        mixitup.FilterGroup = function() {
		            this.name               = '';
		            this.dom                = new mixitup.FilterGroupDom();
		            this.activeSelectors    = [];
		            this.activeFilters      = [];
		            this.activeToggles      = [];
		            this.handler            = null;
		            this.mixer              = null;
		            this.logic              = 'or';
		            this.parseOn            = 'change';
		            this.keyupTimeout       = -1;

		            h.seal(this);
		        };

		        h.extend(mixitup.FilterGroup.prototype, {

		            /**
		             * @private
		             * @param {HTMLELement}     el
		             * @param {mixitup.Mixer}   mixer
		             * @return {void}
		             */

		            init: function(el, mixer) {
		                var self  = this,
		                    logic = el.getAttribute('data-logic');

		                self.dom.el = el;

		                this.name = self.dom.el.getAttribute('data-filter-group') || '';

		                self.cacheDom();

		                if (self.dom.form) {
		                    self.enableButtons();
		                }

		                self.mixer = mixer;

		                if ((logic && logic.toLowerCase() === 'and') || mixer.config.multifilter.logicWithinGroup === 'and') {
		                    // override default group logic

		                    self.logic = 'and';

		                }

		                self.bindEvents();
		            },

		            /**
		             * @private
		             * @return {void}
		             */

		            cacheDom: function() {
		                var self = this;

		                self.dom.form = h.closestParent(self.dom.el, 'form', true);
		            },

		            enableButtons: function() {
		                var self    = this,
		                    buttons = self.dom.form.querySelectorAll('button[type="submit"]:disabled'),
		                    button  = null,
		                    i       = -1;

		                for (i = 0; button = buttons[i]; i++) {
		                    if (button.disabled) {
		                        button.disabled = false;
		                    }
		                }
		            },

		            /**
		             * @private
		             * @return {void}
		             */

		            bindEvents: function() {
		                var self = this;

		                self.handler = function(e) {
		                    switch (e.type) {
		                        case 'reset':
		                        case 'submit':
		                            self.handleFormEvent(e);

		                            break;
		                        default:
		                            self['handle' + h.pascalCase(e.type)](e);
		                    }
		                };

		                h.on(self.dom.el, 'click', self.handler);
		                h.on(self.dom.el, 'change', self.handler);
		                h.on(self.dom.el, 'keyup', self.handler);

		                if (self.dom.form) {
		                    h.on(self.dom.form, 'reset', self.handler);
		                    h.on(self.dom.form, 'submit', self.handler);
		                }
		            },

		            /**
		             * @private
		             * @return {void}
		             */

		            unbindEvents: function() {
		                var self = this;

		                h.off(self.dom.el, 'click', self.handler);
		                h.off(self.dom.el, 'change', self.handler);
		                h.off(self.dom.el, 'keyup', self.handler);

		                if (self.dom.form) {
		                    h.off(self.dom.form, 'reset', self.handler);
		                    h.off(self.dom.form, 'submit', self.handler);
		                }

		                self.handler = null;
		            },

		            /**
		             * @private
		             * @param   {MouseEvent} e
		             * @return  {void}
		             */

		            handleClick: function(e) {
		                var self            = this,
		                    mixer           = self.mixer,
		                    returnValue     = null,
		                    controlEl       = h.closestParent(e.target, '[data-filter], [data-toggle]', true),
		                    controlSelector = '',
		                    index           = -1,
		                    selector        = '';

		                if (!controlEl) return;

		                if ((controlSelector = self.mixer.config.selectors.control) && !controlEl.matches(controlSelector)) {
		                    return;
		                }

		                e.stopPropagation();

		                if (!mixer.lastClicked) {
		                    mixer.lastClicked = controlEl;
		                }

		                if (typeof mixer.config.callbacks.onMixClick === 'function') {
		                    returnValue = mixer.config.callbacks.onMixClick.call(mixer.lastClicked, mixer.state, e, self);

		                    if (returnValue === false) {
		                        // User has returned `false` from the callback, so do not handle click

		                        return;
		                    }
		                }

		                if (controlEl.matches('[data-filter]')) {
		                    selector = controlEl.getAttribute('data-filter');

		                    self.activeToggles = [];
		                    self.activeSelectors = self.activeFilters = [selector];
		                } else if (controlEl.matches('[data-toggle]')) {
		                    selector = controlEl.getAttribute('data-toggle');

		                    self.activeFilters = [];

		                    if ((index = self.activeToggles.indexOf(selector)) > -1) {
		                        self.activeToggles.splice(index, 1);
		                    } else {
		                        self.activeToggles.push(selector);
		                    }

		                    if (self.logic === 'and') {
		                        // Compress into single node

		                        self.activeSelectors = [self.activeToggles];
		                    } else {
		                        self.activeSelectors = self.activeToggles;
		                    }
		                }

		                self.updateControls();

		                if (self.mixer.config.multifilter.parseOn === 'change') {
		                    self.mixer.parseFilterGroups();
		                }
		            },

		            /**
		             * @private
		             * @param   {Event} e
		             * @return  {void}
		             */

		            handleChange: function(e) {
		                var self    = this,
		                    input   = e.target;

		                e.stopPropagation();

		                switch(input.type) {
		                    case 'text':
		                    case 'search':
		                    case 'email':
		                    case 'select-one':
		                    case 'radio':
		                        self.getSingleValue(input);

		                        break;
		                    case 'checkbox':
		                    case 'select-multiple':
		                        self.getMultipleValues(input);

		                        break;
		                }

		                if (self.mixer.config.multifilter.parseOn === 'change') {
		                    self.mixer.parseFilterGroups();
		                }
		            },

		            handleKeyup: function(e) {
		                var self    = this,
		                    input   = e.target;

		                // NB: Selects can fire keyup events (e.g. multiselect, textual search)

		                if (['text', 'search', 'email'].indexOf(input.type) < 0) return;

		                if (self.mixer.config.multifilter.parseOn !== 'change') {
		                    self.mixer.getSingleValue(input);

		                    return;
		                }

		                clearTimeout(self.keyupTimeout);

		                self.keyupTimeout = setTimeout(function() {
		                    self.getSingleValue(input);
		                    self.mixer.parseFilterGroups();
		                }, self.mixer.config.multifilter.keyupThrottleDuration);
		            },

		            /**
		             * @private
		             * @param   {Event} e
		             * @return  {void}
		             */

		            handleFormEvent: function(e) {
		                var self            = this,
		                    tracker         = null,
		                    group           = null,
		                    i               = -1;

		                if (e.type === 'submit') {
		                    e.preventDefault();
		                }

		                if (e.type === 'reset') {
		                    self.activeFilters    =
		                    self.activeToggles   =
		                    self.activeSelectors = [];

		                    self.updateControls();
		                }

		                if (!self.mixer.multifilterFormEventTracker) {
		                    tracker = self.mixer.multifilterFormEventTracker = new mixitup.MultifilterFormEventTracker();

		                    tracker.form = e.target;

		                    for (i = 0; group = self.mixer.filterGroups[i]; i++) {
		                        if (group.dom.form !== e.target) continue;

		                        tracker.totalBound++;
		                    }
		                } else {
		                    tracker = self.mixer.multifilterFormEventTracker;
		                }

		                if (e.target === tracker.form) {
		                    tracker.totalHandled++;

		                    if (tracker.totalHandled === tracker.totalBound) {
		                        self.mixer.multifilterFormEventTracker = null;

		                        if (e.type === 'submit' || self.mixer.config.multifilter.parseOn === 'change') {
		                            self.mixer.parseFilterGroups();
		                        }
		                    }
		                }
		            },

		            /**
		             * @private
		             * @param   {HTMLELement} input
		             * @return  {void}
		             */

		            getSingleValue: function(input) {
		                var self            = this,
		                    diacriticMap    = null,
		                    attributeName   = '',
		                    selector        = '',
		                    value           = '',
		                    i               = -1;

		                if (input.type.match(/text|search|email/g)) {
		                    attributeName = input.getAttribute('data-search-attribute');

		                    if (!attributeName) {
		                        throw new Error('[MixItUp MultiFilter] A valid `data-search-attribute` must be present on text inputs');
		                    }

		                    if (input.value.length < self.mixer.config.multifilter.minSearchLength) {
		                        self.activeSelectors = self.activeFilters = self.activeToggles = [''];

		                        return;
		                    }

		                    // Lowercase and trim

		                    value = input.value.toLowerCase().trim();

		                    // Replace diacritics

		                    for (i = 0; (diacriticMap = diacriticsMap[i]); i++) {
		                        value = value.replace(diacriticMap[1], diacriticMap[0]);
		                    }

		                    // Strip non-word characters

		                    value = value.replace(/\W+/g, ' ');

		                    selector = '[' + attributeName + '*="' + value + '"]';
		                } else {
		                    selector = input.value;
		                }

		                if (typeof input.value === 'string') {
		                    self.activeSelectors =
		                    self.activeToggles =
		                    self.activeFilters =
		                            selector ? [selector] : [];
		                }
		            },

		            /**
		             * @private
		             * @param   {HTMLELement} input
		             * @return  {void}
		             */

		            getMultipleValues: function(input) {
		                var self            = this,
		                    activeToggles   = [],
		                    query           = '',
		                    item            = null,
		                    items           = null,
		                    i               = -1;

		                switch (input.type) {
		                    case 'checkbox':
		                        query = 'input[type="checkbox"]';

		                        break;
		                    case 'select-multiple':
		                        query = 'option';
		                }

		                items = self.dom.el.querySelectorAll(query);

		                for (i = 0; item = items[i]; i++) {
		                    if ((item.checked || item.selected) && item.value) {
		                        activeToggles.push(item.value);
		                    }
		                }

		                self.activeFilters = [];
		                self.activeToggles = activeToggles;

		                if (self.logic === 'and') {
		                    // Compress into single node

		                    self.activeSelectors = [activeToggles];
		                } else {
		                    self.activeSelectors = activeToggles;
		                }
		            },

		            /**
		             * @private
		             * @param   {Array.<HTMLELement>} [controlEls]
		             * @return  {void}
		             */

		            updateControls: function(controlEls) {
		                var self             = this,
		                    controlEl        = null,
		                    controlSelector  = '',
		                    controlsSelector = '',
		                    type             = '',
		                    i                = -1;

		                controlSelector = self.mixer.config.selectors.control.trim();

		                controlsSelector = [
		                    '[data-filter]' + controlSelector,
		                    '[data-toggle]' + controlSelector
		                ].join(', ');

		                controlEls = controlEls || self.dom.el.querySelectorAll(controlsSelector);

		                for (i = 0; controlEl = controlEls[i]; i++) {
		                    type = Boolean(controlEl.getAttribute('data-toggle')) ? 'toggle' : 'filter';

		                    self.updateControl(controlEl, type);
		                }
		            },

		            /**
		             * @private
		             * @param   {HTMLELement}   controlEl
		             * @param   {string}        type
		             * @return  {void}
		             */

		            updateControl: function(controlEl, type) {
		                var self            = this,
		                    selector        = controlEl.getAttribute('data-' + type),
		                    activeControls  = self.activeToggles.concat(self.activeFilters),
		                    activeClassName = '';

		                activeClassName = h.getClassname(self.mixer.config.classNames, type, self.mixer.config.classNames.modifierActive);

		                if (activeControls.indexOf(selector) > -1) {
		                    h.addClass(controlEl, activeClassName);
		                } else {
		                    h.removeClass(controlEl, activeClassName);
		                }
		            },

		            /**
		             * @private
		             */

		            updateUi: function() {
		                var self           = this,
		                    controlEls     = self.dom.el.querySelectorAll('[data-filter], [data-toggle]'),
		                    inputEls       = self.dom.el.querySelectorAll('input[type="radio"], input[type="checkbox"], option'),
		                    activeControls = self.activeToggles.concat(self.activeFilters),
		                    isActive       = false,
		                    inputEl        = null,
		                    i              = -1;

		                if (controlEls.length) {
		                    self.updateControls(controlEls, true);
		                }

		                for (i = 0; inputEl = inputEls[i]; i++) {
		                    isActive = activeControls.indexOf(inputEl.value) > -1;

		                    switch (inputEl.tagName.toLowerCase()) {
		                        case 'option':
		                            inputEl.selected = isActive;

		                            break;
		                        case 'input':
		                            inputEl.checked = isActive;

		                            break;
		                    }
		                }
		            }
		        });

		        mixitup.MixerDom.registerAction('afterConstruct', 'multifilter', function() {
		            this.filterGroups = [];
		        });

		        /**
		         * The `mixitup.Mixer` class is extended with API methods relating to
		         * the MultiFilter extension.
		         *
		         * For the full list of API methods, please refer to the MixItUp
		         * core documentation.
		         *
		         * @constructor
		         * @namespace
		         * @name        Mixer
		         * @memberof    mixitup
		         * @public
		         * @since       3.0.0
		         */

		        mixitup.Mixer.registerAction('afterConstruct', 'multifilter', function() {
		            this.filterGroups                   = [];
		            this.filterGroupsHash               = {};
		            this.multifilterFormEventTracker    = null;
		        });

		        mixitup.Mixer.registerAction('afterCacheDom', 'multifilter', function() {
		            var self    = this,
		                parent  = null;

		            if (!self.config.multifilter.enable) return;

		            switch (self.config.controls.scope) {
		                case 'local':
		                    parent = self.dom.container;

		                    break;
		                case 'global':
		                    parent = self.dom.document;

		                    break;
		                default:
		                    throw new Error(mixitup.messages.ERROR_CONFIG_INVALID_CONTROLS_SCOPE);
		            }

		            self.dom.filterGroups = parent.querySelectorAll('[data-filter-group]');
		        });

		        mixitup.Mixer.registerAction('beforeInitControls', 'multifilter', function() {
		            var self = this;

		            if (!self.config.multifilter.enable) return;

		            self.config.controls.live = true; // force live controls if multifilter is enabled
		        });

		        mixitup.Mixer.registerAction('afterSanitizeConfig', 'multifilter', function() {
		            var self = this;

		            self.config.multifilter.logicBetweenGroups = self.config.multifilter.logicBetweenGroups.toLowerCase().trim();
		            self.config.multifilter.logicWithinGroup = self.config.multifilter.logicWithinGroup.toLowerCase().trim();
		        });

		        mixitup.Mixer.registerAction('afterAttach', 'multifilter', function() {
		            var self = this;

		            if (self.dom.filterGroups.length) {
		                self.indexFilterGroups();
		            }
		        });

		        mixitup.Mixer.registerAction('afterUpdateControls', 'multifilter', function() {
		            var self    = this,
		                group   = null,
		                i       = -1;

		            for (i = 0; group = self.filterGroups[i]; i++) {
		                group.updateControls();
		            }
		        });

		        mixitup.Mixer.registerAction('beforeDestroy', 'multifilter', function() {
		            var self    = this,
		                group   = null,
		                i       = -1;

		            for (i = 0; group = self.filterGroups[i]; i++) {
		                group.unbindEvents();
		            }
		        });

		        mixitup.Mixer.extend(
		        /** @lends mixitup.Mixer */
		        {
		            /**
		             * @private
		             * @return {void}
		             */

		            indexFilterGroups: function() {
		                var self                = this,
		                    filterGroup         = null,
		                    el                  = null,
		                    i                   = -1;

		                for (i = 0; el = self.dom.filterGroups[i]; i++) {
		                    filterGroup = new mixitup.FilterGroup();

		                    filterGroup.init(el, self);

		                    self.filterGroups.push(filterGroup);

		                    if (filterGroup.name) {
		                        // If present, also index by name

		                        if (typeof self.filterGroupsHash[filterGroup.name] !== 'undefined') {
		                            throw new Error('[MixItUp MultiFilter] A filter group with name "' + filterGroup.name + '" already exists');
		                        }

		                        self.filterGroupsHash[filterGroup.name] = filterGroup;
		                    }
		                }
		            },

		            /**
		             * @private
		             * @instance
		             * @since   2.0.0
		             * @param   {Array<*>}  args
		             * @return  {mixitup.UserInstruction}
		             */

		            parseParseFilterGroupsArgs: function(args) {
		                var self        = this,
		                    instruction = new mixitup.UserInstruction(),
		                    arg         = null,
		                    i           = -1;

		                instruction.animate = self.config.animation.enable;
		                instruction.command = new mixitup.CommandFilter();

		                for (i = 0; i < args.length; i++) {
		                    arg = args[i];

		                    if (typeof arg === 'boolean') {
		                        instruction.animate = arg;
		                    } else if (typeof arg === 'function') {
		                        instruction.callback = arg;
		                    }
		                }

		                h.freeze(instruction);

		                return instruction;
		            },

		            /**
		             * Recursively builds up paths between all possible permutations
		             * of filter group nodes according to the defined logic.
		             *
		             * @private
		             * @return {Array.<Array.<string>>}
		             */

		            getFilterGroupPaths: function() {
		                var self       = this,
		                    buildPath  = null,
		                    crawl      = null,
		                    nodes      = null,
		                    matrix     = [],
		                    paths      = [],
		                    trackers   = [],
		                    i          = -1;

		                for (i = 0; i < self.filterGroups.length; i++) {
		                    // Filter out groups without any active filters

		                    if ((nodes = self.filterGroups[i].activeSelectors).length) {
		                        matrix.push(nodes);

		                        // Initialise tracker for each group

		                        trackers.push(0);
		                    }
		                }

		                buildPath = function() {
		                    var node = null,
		                        path = [],
		                        i    = -1;

		                    for (i = 0; i < matrix.length; i++) {
		                        node = matrix[i][trackers[i]];

		                        if (Array.isArray(node)) {
		                            // AND logic within group

		                            node = node.join('');
		                        }

		                        path.push(node);
		                    }

		                    path = h.clean(path);

		                    paths.push(path);
		                };

		                crawl = function(index) {
		                    index = index || 0;

		                    var nodes = matrix[index];

		                    while (trackers[index] < nodes.length) {
		                        if (index < matrix.length - 1) {
		                            // If not last, recurse

		                            crawl(index + 1);
		                        } else {
		                            // Last, build selector

		                            buildPath();
		                        }

		                        trackers[index]++;
		                    }

		                    trackers[index] = 0;
		                };

		                if (!matrix.length) return '';

		                crawl();

		                return paths;
		            },

		            /**
		             * Builds up a selector string from a provided paths array.
		             *
		             * @private
		             * @param  {Array.<Array.<string>>} paths
		             * @return {string}
		             */

		            buildSelectorFromPaths: function(paths) {
		                var self           = this,
		                    path           = null,
		                    output         = [],
		                    pathSelector   = '',
		                    nodeDelineator = '',
		                    i              = -1;

		                if (!paths.length) {
		                    return '';
		                }

		                if (self.config.multifilter.logicBetweenGroups === 'or') {
		                    nodeDelineator = ', ';
		                }

		                if (paths.length > 1) {
		                    for (i = 0; i < paths.length; i++) {
		                        path = paths[i];

		                        pathSelector = path.join(nodeDelineator);

		                        if (output.indexOf(pathSelector) < 0) {
		                            output.push(pathSelector);
		                        }
		                    }

		                    return output.join(', ');
		                } else {
		                    return paths[0].join(nodeDelineator);
		                }
		            },

		            /**
		             * Traverses the currently active filters in all groups, building up a
		             * compound selector string as per the defined logic. A filter operation
		             * is then called on the mixer using the resulting selector.
		             *
		             * This method can be used to programmatically trigger the parsing of
		             * filter groups after manipulations to a group's active selector(s) by
		             * the `.setFilterGroupSelectors()` API method.
		             *
		             * @example
		             *
		             * .parseFilterGroups([animate] [, callback])
		             *
		             * @example <caption>Example: Triggering parsing after programmatically changing the values of a filter group</caption>
		             *
		             * mixer.setFilterGroupSelectors('color', ['.green', '.blue']);
		             *
		             * mixer.parseFilterGroups();
		             *
		             * @public
		             * @since 3.0.0
		             * @param       {boolean}   [animate=true]
		             *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
		             * @param       {function}  [callback=null]
		             *      An optional callback function to be invoked after the operation has completed.
		             * @return      {Promise.<mixitup.State>}
		             *      A promise resolving with the current state object.
		             */

		            parseFilterGroups: function() {
		                var self        = this,
		                    instruction = self.parseFilterArgs(arguments),
		                    paths       = self.getFilterGroupPaths(),
		                    selector    = self.buildSelectorFromPaths(paths),
		                    callback    = null,
		                    command     = {};

		                if (selector === '') {
		                    selector = self.config.controls.toggleDefault;
		                }

		                instruction.command.selector = selector;

		                command.filter = instruction.command;

		                if (typeof (callback = self.config.callbacks.onParseFilterGroups) === 'function') {
		                    command = callback(command);
		                }

		                return self.multimix(command, instruction.animate, instruction.callback);
		            },

		            /**
		             * Programmatically sets one or more active selectors for a specific filter
		             * group and updates the group's UI.
		             *
		             * Because MixItUp has no way of knowing how to break down a provided
		             * compound selector into its component groups, we can not use the
		             * standard `.filter()` or `toggleOn()/toggleOff()` API methods when using
		             * the MultiFilter extension. Instead, this method allows us to perform
		             * multi-dimensional filtering via the API by setting the active selectors of
		             * individual groups and then triggering the `.parseFilterGroups()` method.
		             *
		             * If setting multiple active selectors, do not pass a compound selector.
		             * Instead, pass an array with each item containing a single selector
		             * string as in example 2.
		             *
		             * @example
		             *
		             * .setFilterGroupSelectors(groupName, selectors)
		             *
		             * @example <caption>Example 1: Setting a single active selector for a "color" group</caption>
		             *
		             * mixer.setFilterGroupSelectors('color', '.green');
		             *
		             * mixer.parseFilterGroups();
		             *
		             * @example <caption>Example 2: Setting multiple active selectors for a "size" group</caption>
		             *
		             * mixer.setFilterGroupSelectors('size', ['.small', '.large']);
		             *
		             * mixer.parseFilterGroups();
		             *
		             * @public
		             * @since   3.2.0
		             * @param   {string}                    groupName   The name of the filter group as defined in the markup via the `data-filter-group` attribute.
		             * @param   {(string|Array.<string>)}   selectors   A single selector string, or multiple selector strings as an array.
		             * @return  {void}
		             */

		            setFilterGroupSelectors: function(groupName, selectors) {
		                var self            = this,
		                    filterGroup     = null;

		                selectors = Array.isArray(selectors) ? selectors : [selectors];

		                if (typeof (filterGroup = self.filterGroupsHash[groupName]) === 'undefined') {
		                    throw new Error('[MixItUp MultiFilter] No filter group could be found with the name "' + groupName + '"');
		                }

		                filterGroup.activeToggles = selectors.slice();

		                if (filterGroup.logic === 'and') {
		                    // Compress into single node

		                    filterGroup.activeSelectors = [filterGroup.activeToggles];
		                } else {
		                    filterGroup.activeSelectors = filterGroup.activeToggles;
		                }

		                filterGroup.updateUi(filterGroup.activeToggles);
		            },

		            /**
		             * Returns an array of active selectors for a specific filter group.
		             *
		             * @example
		             *
		             * .getFilterGroupSelectors(groupName)
		             *
		             * @example <caption>Example: Retrieving the active selectors for a "size" group</caption>
		             *
		             * mixer.getFilterGroupSelectors('size'); // ['.small', '.large']
		             *
		             * @public
		             * @since   3.2.0
		             * @param   {string}    groupName   The name of the filter group as defined in the markup via the `data-filter-group` attribute.
		             * @return  {void}
		             */

		            getFilterGroupSelectors: function(groupName) {
		                var self        = this,
		                    filterGroup = null;

		                if (typeof (filterGroup = self.filterGroupsHash[groupName]) === 'undefined') {
		                    throw new Error('[MixItUp MultiFilter] No filter group could be found with the name "' + groupName + '"');
		                }

		                return filterGroup.activeSelectors.slice();
		            }
		        });

		        mixitup.Facade.registerAction('afterConstruct', 'multifilter', function(mixer) {
		            this.parseFilterGroups       = mixer.parseFilterGroups.bind(mixer);
		            this.setFilterGroupSelectors = mixer.setFilterGroupSelectors.bind(mixer);
		            this.getFilterGroupSelectors = mixer.getFilterGroupSelectors.bind(mixer);
		        });    };

		    mixitupMultifilter.TYPE                    = 'mixitup-extension';
		    mixitupMultifilter.NAME                    = 'mixitup-multifilter';
		    mixitupMultifilter.EXTENSION_VERSION       = '3.3.6';
		    mixitupMultifilter.REQUIRE_CORE_VERSION    = '^3.1.2';

		    {
		        module.exports = mixitupMultifilter;
		    }})(); 
	} (mixitupMultifilter$1));

	var mixitupMultifilterExports = mixitupMultifilter$1.exports;
	var mixitupMultifilter = /*@__PURE__*/getDefaultExportFromCjs(mixitupMultifilterExports);

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	/*!
	 * GSAP 3.12.1
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2023, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	/* eslint-disable */
	var _config = {
	  autoSleep: 120,
	  force3D: "auto",
	  nullTargetWarn: 1,
	  units: {
	    lineHeight: ""
	  }
	},
	    _defaults$1 = {
	  duration: .5,
	  overwrite: false,
	  delay: 0
	},
	    _suppressOverwrites$1,
	    _reverting$1,
	    _context$2,
	    _bigNum$1 = 1e8,
	    _tinyNum = 1 / _bigNum$1,
	    _2PI = Math.PI * 2,
	    _HALF_PI = _2PI / 4,
	    _gsID = 0,
	    _sqrt = Math.sqrt,
	    _cos = Math.cos,
	    _sin = Math.sin,
	    _isString$1 = function _isString(value) {
	  return typeof value === "string";
	},
	    _isFunction$1 = function _isFunction(value) {
	  return typeof value === "function";
	},
	    _isNumber$1 = function _isNumber(value) {
	  return typeof value === "number";
	},
	    _isUndefined = function _isUndefined(value) {
	  return typeof value === "undefined";
	},
	    _isObject$1 = function _isObject(value) {
	  return typeof value === "object";
	},
	    _isNotFalse = function _isNotFalse(value) {
	  return value !== false;
	},
	    _windowExists$2 = function _windowExists() {
	  return typeof window !== "undefined";
	},
	    _isFuncOrString = function _isFuncOrString(value) {
	  return _isFunction$1(value) || _isString$1(value);
	},
	    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
	    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
	_isArray = Array.isArray,
	    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
	    //only numbers (including negatives and decimals) but NOT relative values.
	_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
	    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
	_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
	    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
	    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
	_relExp = /[+-]=-?[.\d]+/,
	    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
	    // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
	_unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
	    _globalTimeline,
	    _win$3,
	    _coreInitted$2,
	    _doc$3,
	    _globals = {},
	    _installScope = {},
	    _coreReady,
	    _install = function _install(scope) {
	  return (_installScope = _merge(scope, _globals)) && gsap$2;
	},
	    _missingPlugin = function _missingPlugin(property, value) {
	  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
	},
	    _warn = function _warn(message, suppress) {
	  return !suppress && console.warn(message);
	},
	    _addGlobal = function _addGlobal(name, obj) {
	  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
	},
	    _emptyFunc = function _emptyFunc() {
	  return 0;
	},
	    _startAtRevertConfig = {
	  suppressEvents: true,
	  isStart: true,
	  kill: false
	},
	    _revertConfigNoKill = {
	  suppressEvents: true,
	  kill: false
	},
	    _revertConfig = {
	  suppressEvents: true
	},
	    _reservedProps = {},
	    _lazyTweens = [],
	    _lazyLookup = {},
	    _lastRenderedFrame,
	    _plugins = {},
	    _effects = {},
	    _nextGCFrame = 30,
	    _harnessPlugins = [],
	    _callbackNames = "",
	    _harness = function _harness(targets) {
	  var target = targets[0],
	      harnessPlugin,
	      i;
	  _isObject$1(target) || _isFunction$1(target) || (targets = [targets]);

	  if (!(harnessPlugin = (target._gsap || {}).harness)) {
	    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
	    i = _harnessPlugins.length;

	    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

	    harnessPlugin = _harnessPlugins[i];
	  }

	  i = targets.length;

	  while (i--) {
	    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
	  }

	  return targets;
	},
	    _getCache = function _getCache(target) {
	  return target._gsap || _harness(toArray(target))[0]._gsap;
	},
	    _getProperty = function _getProperty(target, property, v) {
	  return (v = target[property]) && _isFunction$1(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
	},
	    _forEachName = function _forEachName(names, func) {
	  return (names = names.split(",")).forEach(func) || names;
	},
	    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
	_round$1 = function _round(value) {
	  return Math.round(value * 100000) / 100000 || 0;
	},
	    _roundPrecise = function _roundPrecise(value) {
	  return Math.round(value * 10000000) / 10000000 || 0;
	},
	    // increased precision mostly for timing values.
	_parseRelative = function _parseRelative(start, value) {
	  var operator = value.charAt(0),
	      end = parseFloat(value.substr(2));
	  start = parseFloat(start);
	  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
	},
	    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
	  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
	  var l = toFind.length,
	      i = 0;

	  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

	  return i < l;
	},
	    _lazyRender = function _lazyRender() {
	  var l = _lazyTweens.length,
	      a = _lazyTweens.slice(0),
	      i,
	      tween;

	  _lazyLookup = {};
	  _lazyTweens.length = 0;

	  for (i = 0; i < l; i++) {
	    tween = a[i];
	    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
	  }
	},
	    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
	  _lazyTweens.length && !_reverting$1 && _lazyRender();
	  animation.render(time, suppressEvents, force || _reverting$1 && time < 0 && (animation._initted || animation._startAt));
	  _lazyTweens.length && !_reverting$1 && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
	},
	    _numericIfPossible = function _numericIfPossible(value) {
	  var n = parseFloat(value);
	  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString$1(value) ? value.trim() : value;
	},
	    _passThrough$1 = function _passThrough(p) {
	  return p;
	},
	    _setDefaults$1 = function _setDefaults(obj, defaults) {
	  for (var p in defaults) {
	    p in obj || (obj[p] = defaults[p]);
	  }

	  return obj;
	},
	    _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
	  return function (obj, defaults) {
	    for (var p in defaults) {
	      p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
	    }
	  };
	},
	    _merge = function _merge(base, toMerge) {
	  for (var p in toMerge) {
	    base[p] = toMerge[p];
	  }

	  return base;
	},
	    _mergeDeep = function _mergeDeep(base, toMerge) {
	  for (var p in toMerge) {
	    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject$1(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
	  }

	  return base;
	},
	    _copyExcluding = function _copyExcluding(obj, excluding) {
	  var copy = {},
	      p;

	  for (p in obj) {
	    p in excluding || (copy[p] = obj[p]);
	  }

	  return copy;
	},
	    _inheritDefaults = function _inheritDefaults(vars) {
	  var parent = vars.parent || _globalTimeline,
	      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults$1;

	  if (_isNotFalse(vars.inherit)) {
	    while (parent) {
	      func(vars, parent.vars.defaults);
	      parent = parent.parent || parent._dp;
	    }
	  }

	  return vars;
	},
	    _arraysMatch = function _arraysMatch(a1, a2) {
	  var i = a1.length,
	      match = i === a2.length;

	  while (match && i-- && a1[i] === a2[i]) {}

	  return i < 0;
	},
	    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
	  if (firstProp === void 0) {
	    firstProp = "_first";
	  }

	  if (lastProp === void 0) {
	    lastProp = "_last";
	  }

	  var prev = parent[lastProp],
	      t;

	  if (sortBy) {
	    t = child[sortBy];

	    while (prev && prev[sortBy] > t) {
	      prev = prev._prev;
	    }
	  }

	  if (prev) {
	    child._next = prev._next;
	    prev._next = child;
	  } else {
	    child._next = parent[firstProp];
	    parent[firstProp] = child;
	  }

	  if (child._next) {
	    child._next._prev = child;
	  } else {
	    parent[lastProp] = child;
	  }

	  child._prev = prev;
	  child.parent = child._dp = parent;
	  return child;
	},
	    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
	  if (firstProp === void 0) {
	    firstProp = "_first";
	  }

	  if (lastProp === void 0) {
	    lastProp = "_last";
	  }

	  var prev = child._prev,
	      next = child._next;

	  if (prev) {
	    prev._next = next;
	  } else if (parent[firstProp] === child) {
	    parent[firstProp] = next;
	  }

	  if (next) {
	    next._prev = prev;
	  } else if (parent[lastProp] === child) {
	    parent[lastProp] = prev;
	  }

	  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
	},
	    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
	  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
	  child._act = 0;
	},
	    _uncache = function _uncache(animation, child) {
	  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
	    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
	    var a = animation;

	    while (a) {
	      a._dirty = 1;
	      a = a.parent;
	    }
	  }

	  return animation;
	},
	    _recacheAncestors = function _recacheAncestors(animation) {
	  var parent = animation.parent;

	  while (parent && parent.parent) {
	    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
	    parent._dirty = 1;
	    parent.totalDuration();
	    parent = parent.parent;
	  }

	  return animation;
	},
	    _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
	  return tween._startAt && (_reverting$1 ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
	},
	    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
	  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
	},
	    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
	  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
	},
	    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
	_animationCycle = function _animationCycle(tTime, cycleDuration) {
	  var whole = Math.floor(tTime /= cycleDuration);
	  return tTime && whole === tTime ? whole - 1 : whole;
	},
	    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
	  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
	},
	    _setEnd = function _setEnd(animation) {
	  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
	},
	    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
	  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
	  var parent = animation._dp;

	  if (parent && parent.smoothChildTiming && animation._ts) {
	    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

	    _setEnd(animation);

	    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
	  }

	  return animation;
	},

	/*
	_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
		let cycleDuration = duration + repeatDelay,
			time = _round(clampedTotalTime % cycleDuration);
		if (time > duration) {
			time = duration;
		}
		return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
	},
	*/
	_postAddChecks = function _postAddChecks(timeline, child) {
	  var t;

	  if (child._time || child._initted && !child._dur) {
	    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
	    t = _parentToChildTotalTime(timeline.rawTime(), child);

	    if (!child._dur || _clamp$1(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
	      child.render(t, true);
	    }
	  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


	  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
	    //in case any of the ancestors had completed but should now be enabled...
	    if (timeline._dur < timeline.duration()) {
	      t = timeline;

	      while (t._dp) {
	        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

	        t = t._dp;
	      }
	    }

	    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
	  }
	},
	    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
	  child.parent && _removeFromParent(child);
	  child._start = _roundPrecise((_isNumber$1(position) ? position : position || timeline !== _globalTimeline ? _parsePosition$1(timeline, position, child) : timeline._time) + child._delay);
	  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

	  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

	  _isFromOrFromStart(child) || (timeline._recent = child);
	  skipChecks || _postAddChecks(timeline, child);
	  timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime); // if the timeline is reversed and the new child makes it longer, we may need to adjust the parent's _start (push it back)

	  return timeline;
	},
	    _scrollTrigger = function _scrollTrigger(animation, trigger) {
	  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
	},
	    _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
	  _initTween(tween, time, tTime);

	  if (!tween._initted) {
	    return 1;
	  }

	  if (!force && tween._pt && !_reverting$1 && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
	    _lazyTweens.push(tween);

	    tween._lazy = [tTime, suppressEvents];
	    return 1;
	  }
	},
	    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
	  var parent = _ref.parent;
	  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
	},
	    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
	_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
	  var data = _ref2.data;
	  return data === "isFromStart" || data === "isStart";
	},
	    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
	  var prevRatio = tween.ratio,
	      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
	      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
	  repeatDelay = tween._rDelay,
	      tTime = 0,
	      pt,
	      iteration,
	      prevIteration;

	  if (repeatDelay && tween._repeat) {
	    // in case there's a zero-duration tween that has a repeat with a repeatDelay
	    tTime = _clamp$1(0, tween._tDur, totalTime);
	    iteration = _animationCycle(tTime, repeatDelay);
	    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

	    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
	      // if iteration changed
	      prevRatio = 1 - ratio;
	      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
	    }
	  }

	  if (ratio !== prevRatio || _reverting$1 || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
	    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
	      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
	      return;
	    }

	    prevIteration = tween._zTime;
	    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

	    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

	    tween.ratio = ratio;
	    tween._from && (ratio = 1 - ratio);
	    tween._time = 0;
	    tween._tTime = tTime;
	    pt = tween._pt;

	    while (pt) {
	      pt.r(ratio, pt.d);
	      pt = pt._next;
	    }

	    totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
	    tween._onUpdate && !suppressEvents && _callback$1(tween, "onUpdate");
	    tTime && tween._repeat && !suppressEvents && tween.parent && _callback$1(tween, "onRepeat");

	    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
	      ratio && _removeFromParent(tween, 1);

	      if (!suppressEvents && !_reverting$1) {
	        _callback$1(tween, ratio ? "onComplete" : "onReverseComplete", true);

	        tween._prom && tween._prom();
	      }
	    }
	  } else if (!tween._zTime) {
	    tween._zTime = totalTime;
	  }
	},
	    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
	  var child;

	  if (time > prevTime) {
	    child = animation._first;

	    while (child && child._start <= time) {
	      if (child.data === "isPause" && child._start > prevTime) {
	        return child;
	      }

	      child = child._next;
	    }
	  } else {
	    child = animation._last;

	    while (child && child._start >= time) {
	      if (child.data === "isPause" && child._start < prevTime) {
	        return child;
	      }

	      child = child._prev;
	    }
	  }
	},
	    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
	  var repeat = animation._repeat,
	      dur = _roundPrecise(duration) || 0,
	      totalProgress = animation._tTime / animation._tDur;
	  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
	  animation._dur = dur;
	  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
	  totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
	  animation.parent && _setEnd(animation);
	  skipUncache || _uncache(animation.parent, animation);
	  return animation;
	},
	    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
	  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
	},
	    _zeroPosition = {
	  _start: 0,
	  endTime: _emptyFunc,
	  totalDuration: _emptyFunc
	},
	    _parsePosition$1 = function _parsePosition(animation, position, percentAnimation) {
	  var labels = animation.labels,
	      recent = animation._recent || _zeroPosition,
	      clippedDuration = animation.duration() >= _bigNum$1 ? recent.endTime(false) : animation._dur,
	      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
	  i,
	      offset,
	      isPercent;

	  if (_isString$1(position) && (isNaN(position) || position in labels)) {
	    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
	    offset = position.charAt(0);
	    isPercent = position.substr(-1) === "%";
	    i = position.indexOf("=");

	    if (offset === "<" || offset === ">") {
	      i >= 0 && (position = position.replace(/=/, ""));
	      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
	    }

	    if (i < 0) {
	      position in labels || (labels[position] = clippedDuration);
	      return labels[position];
	    }

	    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

	    if (isPercent && percentAnimation) {
	      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
	    }

	    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
	  }

	  return position == null ? clippedDuration : +position;
	},
	    _createTweenType = function _createTweenType(type, params, timeline) {
	  var isLegacy = _isNumber$1(params[1]),
	      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
	      vars = params[varsIndex],
	      irVars,
	      parent;

	  isLegacy && (vars.duration = params[1]);
	  vars.parent = timeline;

	  if (type) {
	    irVars = vars;
	    parent = timeline;

	    while (parent && !("immediateRender" in irVars)) {
	      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
	      irVars = parent.vars.defaults || {};
	      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
	    }

	    vars.immediateRender = _isNotFalse(irVars.immediateRender);
	    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
	  }

	  return new Tween(params[0], vars, params[varsIndex + 1]);
	},
	    _conditionalReturn = function _conditionalReturn(value, func) {
	  return value || value === 0 ? func(value) : func;
	},
	    _clamp$1 = function _clamp(min, max, value) {
	  return value < min ? min : value > max ? max : value;
	},
	    getUnit = function getUnit(value, v) {
	  return !_isString$1(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
	},
	    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
	clamp = function clamp(min, max, value) {
	  return _conditionalReturn(value, function (v) {
	    return _clamp$1(min, max, v);
	  });
	},
	    _slice = [].slice,
	    _isArrayLike = function _isArrayLike(value, nonEmpty) {
	  return value && _isObject$1(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject$1(value[0])) && !value.nodeType && value !== _win$3;
	},
	    _flatten = function _flatten(ar, leaveStrings, accumulator) {
	  if (accumulator === void 0) {
	    accumulator = [];
	  }

	  return ar.forEach(function (value) {
	    var _accumulator;

	    return _isString$1(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
	  }) || accumulator;
	},
	    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
	toArray = function toArray(value, scope, leaveStrings) {
	  return _context$2 && !scope && _context$2.selector ? _context$2.selector(value) : _isString$1(value) && !leaveStrings && (_coreInitted$2 || !_wake()) ? _slice.call((scope || _doc$3).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
	},
	    selector = function selector(value) {
	  value = toArray(value)[0] || _warn("Invalid scope") || {};
	  return function (v) {
	    var el = value.current || value.nativeElement || value;
	    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc$3.createElement("div") : value);
	  };
	},
	    shuffle = function shuffle(a) {
	  return a.sort(function () {
	    return .5 - Math.random();
	  });
	},
	    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
	//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
	distribute = function distribute(v) {
	  if (_isFunction$1(v)) {
	    return v;
	  }

	  var vars = _isObject$1(v) ? v : {
	    each: v
	  },
	      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
	  ease = _parseEase(vars.ease),
	      from = vars.from || 0,
	      base = parseFloat(vars.base) || 0,
	      cache = {},
	      isDecimal = from > 0 && from < 1,
	      ratios = isNaN(from) || isDecimal,
	      axis = vars.axis,
	      ratioX = from,
	      ratioY = from;

	  if (_isString$1(from)) {
	    ratioX = ratioY = {
	      center: .5,
	      edges: .5,
	      end: 1
	    }[from] || 0;
	  } else if (!isDecimal && ratios) {
	    ratioX = from[0];
	    ratioY = from[1];
	  }

	  return function (i, target, a) {
	    var l = (a || vars).length,
	        distances = cache[l],
	        originX,
	        originY,
	        x,
	        y,
	        d,
	        j,
	        max,
	        min,
	        wrapAt;

	    if (!distances) {
	      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum$1])[1];

	      if (!wrapAt) {
	        max = -_bigNum$1;

	        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

	        wrapAt--;
	      }

	      distances = cache[l] = [];
	      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
	      originY = wrapAt === _bigNum$1 ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
	      max = 0;
	      min = _bigNum$1;

	      for (j = 0; j < l; j++) {
	        x = j % wrapAt - originX;
	        y = originY - (j / wrapAt | 0);
	        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
	        d > max && (max = d);
	        d < min && (min = d);
	      }

	      from === "random" && shuffle(distances);
	      distances.max = max - min;
	      distances.min = min;
	      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
	      distances.b = l < 0 ? base - l : base;
	      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

	      ease = ease && l < 0 ? _invertEase(ease) : ease;
	    }

	    l = (distances[i] - distances.min) / distances.max || 0;
	    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
	  };
	},
	    _roundModifier = function _roundModifier(v) {
	  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
	  var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

	  return function (raw) {
	    var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);

	    return (n - n % 1) / p + (_isNumber$1(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
	  };
	},
	    snap = function snap(snapTo, value) {
	  var isArray = _isArray(snapTo),
	      radius,
	      is2D;

	  if (!isArray && _isObject$1(snapTo)) {
	    radius = isArray = snapTo.radius || _bigNum$1;

	    if (snapTo.values) {
	      snapTo = toArray(snapTo.values);

	      if (is2D = !_isNumber$1(snapTo[0])) {
	        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
	      }
	    } else {
	      snapTo = _roundModifier(snapTo.increment);
	    }
	  }

	  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction$1(snapTo) ? function (raw) {
	    is2D = snapTo(raw);
	    return Math.abs(is2D - raw) <= radius ? is2D : raw;
	  } : function (raw) {
	    var x = parseFloat(is2D ? raw.x : raw),
	        y = parseFloat(is2D ? raw.y : 0),
	        min = _bigNum$1,
	        closest = 0,
	        i = snapTo.length,
	        dx,
	        dy;

	    while (i--) {
	      if (is2D) {
	        dx = snapTo[i].x - x;
	        dy = snapTo[i].y - y;
	        dx = dx * dx + dy * dy;
	      } else {
	        dx = Math.abs(snapTo[i] - x);
	      }

	      if (dx < min) {
	        min = dx;
	        closest = i;
	      }
	    }

	    closest = !radius || min <= radius ? snapTo[closest] : raw;
	    return is2D || closest === raw || _isNumber$1(raw) ? closest : closest + getUnit(raw);
	  });
	},
	    random = function random(min, max, roundingIncrement, returnFunction) {
	  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
	    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
	  });
	},
	    pipe = function pipe() {
	  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
	    functions[_key] = arguments[_key];
	  }

	  return function (value) {
	    return functions.reduce(function (v, f) {
	      return f(v);
	    }, value);
	  };
	},
	    unitize = function unitize(func, unit) {
	  return function (value) {
	    return func(parseFloat(value)) + (unit || getUnit(value));
	  };
	},
	    normalize = function normalize(min, max, value) {
	  return mapRange(min, max, 0, 1, value);
	},
	    _wrapArray = function _wrapArray(a, wrapper, value) {
	  return _conditionalReturn(value, function (index) {
	    return a[~~wrapper(index)];
	  });
	},
	    wrap = function wrap(min, max, value) {
	  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
	  var range = max - min;
	  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
	    return (range + (value - min) % range) % range + min;
	  });
	},
	    wrapYoyo = function wrapYoyo(min, max, value) {
	  var range = max - min,
	      total = range * 2;
	  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
	    value = (total + (value - min) % total) % total || 0;
	    return min + (value > range ? total - value : value);
	  });
	},
	    _replaceRandom = function _replaceRandom(value) {
	  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
	  var prev = 0,
	      s = "",
	      i,
	      nums,
	      end,
	      isArray;

	  while (~(i = value.indexOf("random(", prev))) {
	    end = value.indexOf(")", i);
	    isArray = value.charAt(i + 7) === "[";
	    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
	    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
	    prev = end + 1;
	  }

	  return s + value.substr(prev, value.length - prev);
	},
	    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
	  var inRange = inMax - inMin,
	      outRange = outMax - outMin;
	  return _conditionalReturn(value, function (value) {
	    return outMin + ((value - inMin) / inRange * outRange || 0);
	  });
	},
	    interpolate = function interpolate(start, end, progress, mutate) {
	  var func = isNaN(start + end) ? 0 : function (p) {
	    return (1 - p) * start + p * end;
	  };

	  if (!func) {
	    var isString = _isString$1(start),
	        master = {},
	        p,
	        i,
	        interpolators,
	        l,
	        il;

	    progress === true && (mutate = 1) && (progress = null);

	    if (isString) {
	      start = {
	        p: start
	      };
	      end = {
	        p: end
	      };
	    } else if (_isArray(start) && !_isArray(end)) {
	      interpolators = [];
	      l = start.length;
	      il = l - 2;

	      for (i = 1; i < l; i++) {
	        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
	      }

	      l--;

	      func = function func(p) {
	        p *= l;
	        var i = Math.min(il, ~~p);
	        return interpolators[i](p - i);
	      };

	      progress = end;
	    } else if (!mutate) {
	      start = _merge(_isArray(start) ? [] : {}, start);
	    }

	    if (!interpolators) {
	      for (p in end) {
	        _addPropTween.call(master, start, p, "get", end[p]);
	      }

	      func = function func(p) {
	        return _renderPropTweens(p, master) || (isString ? start.p : start);
	      };
	    }
	  }

	  return _conditionalReturn(progress, func);
	},
	    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
	  //used for nextLabel() and previousLabel()
	  var labels = timeline.labels,
	      min = _bigNum$1,
	      p,
	      distance,
	      label;

	  for (p in labels) {
	    distance = labels[p] - fromTime;

	    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
	      label = p;
	      min = distance;
	    }
	  }

	  return label;
	},
	    _callback$1 = function _callback(animation, type, executeLazyFirst) {
	  var v = animation.vars,
	      callback = v[type],
	      prevContext = _context$2,
	      context = animation._ctx,
	      params,
	      scope,
	      result;

	  if (!callback) {
	    return;
	  }

	  params = v[type + "Params"];
	  scope = v.callbackScope || animation;
	  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

	  context && (_context$2 = context);
	  result = params ? callback.apply(scope, params) : callback.call(scope);
	  _context$2 = prevContext;
	  return result;
	},
	    _interrupt = function _interrupt(animation) {
	  _removeFromParent(animation);

	  animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting$1);
	  animation.progress() < 1 && _callback$1(animation, "onInterrupt");
	  return animation;
	},
	    _quickTween,
	    _registerPluginQueue = [],
	    _createPlugin = function _createPlugin(config) {
	  if (_windowExists$2() && config) {
	    // edge case: some build tools may pass in a null/undefined value
	    config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

	    var name = config.name,
	        isFunc = _isFunction$1(config),
	        Plugin = name && !isFunc && config.init ? function () {
	      this._props = [];
	    } : config,
	        //in case someone passes in an object that's not a plugin, like CustomEase
	    instanceDefaults = {
	      init: _emptyFunc,
	      render: _renderPropTweens,
	      add: _addPropTween,
	      kill: _killPropTweensOf,
	      modifier: _addPluginModifier,
	      rawVars: 0
	    },
	        statics = {
	      targetTest: 0,
	      get: 0,
	      getSetter: _getSetter,
	      aliases: {},
	      register: 0
	    };

	    _wake();

	    if (config !== Plugin) {
	      if (_plugins[name]) {
	        return;
	      }

	      _setDefaults$1(Plugin, _setDefaults$1(_copyExcluding(config, instanceDefaults), statics)); //static methods


	      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


	      _plugins[Plugin.prop = name] = Plugin;

	      if (config.targetTest) {
	        _harnessPlugins.push(Plugin);

	        _reservedProps[name] = 1;
	      }

	      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
	    }

	    _addGlobal(name, Plugin);

	    config.register && config.register(gsap$2, Plugin, PropTween);
	  } else {
	    config && _registerPluginQueue.push(config);
	  }
	},

	/*
	 * --------------------------------------------------------------------------------------
	 * COLORS
	 * --------------------------------------------------------------------------------------
	 */
	_255 = 255,
	    _colorLookup = {
	  aqua: [0, _255, _255],
	  lime: [0, _255, 0],
	  silver: [192, 192, 192],
	  black: [0, 0, 0],
	  maroon: [128, 0, 0],
	  teal: [0, 128, 128],
	  blue: [0, 0, _255],
	  navy: [0, 0, 128],
	  white: [_255, _255, _255],
	  olive: [128, 128, 0],
	  yellow: [_255, _255, 0],
	  orange: [_255, 165, 0],
	  gray: [128, 128, 128],
	  purple: [128, 0, 128],
	  green: [0, 128, 0],
	  red: [_255, 0, 0],
	  pink: [_255, 192, 203],
	  cyan: [0, _255, _255],
	  transparent: [_255, _255, _255, 0]
	},
	    // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
	// let ctx = _doc.createElement("canvas").getContext("2d");
	// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
	_hue = function _hue(h, m1, m2) {
	  h += h < 0 ? 1 : h > 1 ? -1 : 0;
	  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
	},
	    splitColor = function splitColor(v, toHSL, forceAlpha) {
	  var a = !v ? _colorLookup.black : _isNumber$1(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
	      r,
	      g,
	      b,
	      h,
	      s,
	      l,
	      max,
	      min,
	      d,
	      wasHSL;

	  if (!a) {
	    if (v.substr(-1) === ",") {
	      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
	      v = v.substr(0, v.length - 1);
	    }

	    if (_colorLookup[v]) {
	      a = _colorLookup[v];
	    } else if (v.charAt(0) === "#") {
	      if (v.length < 6) {
	        //for shorthand like #9F0 or #9F0F (could have alpha)
	        r = v.charAt(1);
	        g = v.charAt(2);
	        b = v.charAt(3);
	        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
	      }

	      if (v.length === 9) {
	        // hex with alpha, like #fd5e53ff
	        a = parseInt(v.substr(1, 6), 16);
	        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
	      }

	      v = parseInt(v.substr(1), 16);
	      a = [v >> 16, v >> 8 & _255, v & _255];
	    } else if (v.substr(0, 3) === "hsl") {
	      a = wasHSL = v.match(_strictNumExp);

	      if (!toHSL) {
	        h = +a[0] % 360 / 360;
	        s = +a[1] / 100;
	        l = +a[2] / 100;
	        g = l <= .5 ? l * (s + 1) : l + s - l * s;
	        r = l * 2 - g;
	        a.length > 3 && (a[3] *= 1); //cast as number

	        a[0] = _hue(h + 1 / 3, r, g);
	        a[1] = _hue(h, r, g);
	        a[2] = _hue(h - 1 / 3, r, g);
	      } else if (~v.indexOf("=")) {
	        //if relative values are found, just return the raw strings with the relative prefixes in place.
	        a = v.match(_numExp);
	        forceAlpha && a.length < 4 && (a[3] = 1);
	        return a;
	      }
	    } else {
	      a = v.match(_strictNumExp) || _colorLookup.transparent;
	    }

	    a = a.map(Number);
	  }

	  if (toHSL && !wasHSL) {
	    r = a[0] / _255;
	    g = a[1] / _255;
	    b = a[2] / _255;
	    max = Math.max(r, g, b);
	    min = Math.min(r, g, b);
	    l = (max + min) / 2;

	    if (max === min) {
	      h = s = 0;
	    } else {
	      d = max - min;
	      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
	      h *= 60;
	    }

	    a[0] = ~~(h + .5);
	    a[1] = ~~(s * 100 + .5);
	    a[2] = ~~(l * 100 + .5);
	  }

	  forceAlpha && a.length < 4 && (a[3] = 1);
	  return a;
	},
	    _colorOrderData = function _colorOrderData(v) {
	  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
	  var values = [],
	      c = [],
	      i = -1;
	  v.split(_colorExp).forEach(function (v) {
	    var a = v.match(_numWithUnitExp) || [];
	    values.push.apply(values, a);
	    c.push(i += a.length + 1);
	  });
	  values.c = c;
	  return values;
	},
	    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
	  var result = "",
	      colors = (s + result).match(_colorExp),
	      type = toHSL ? "hsla(" : "rgba(",
	      i = 0,
	      c,
	      shell,
	      d,
	      l;

	  if (!colors) {
	    return s;
	  }

	  colors = colors.map(function (color) {
	    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
	  });

	  if (orderMatchData) {
	    d = _colorOrderData(s);
	    c = orderMatchData.c;

	    if (c.join(result) !== d.c.join(result)) {
	      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
	      l = shell.length - 1;

	      for (; i < l; i++) {
	        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
	      }
	    }
	  }

	  if (!shell) {
	    shell = s.split(_colorExp);
	    l = shell.length - 1;

	    for (; i < l; i++) {
	      result += shell[i] + colors[i];
	    }
	  }

	  return result + shell[l];
	},
	    _colorExp = function () {
	  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
	      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
	  p;

	  for (p in _colorLookup) {
	    s += "|" + p + "\\b";
	  }

	  return new RegExp(s + ")", "gi");
	}(),
	    _hslExp = /hsl[a]?\(/,
	    _colorStringFilter = function _colorStringFilter(a) {
	  var combined = a.join(" "),
	      toHSL;
	  _colorExp.lastIndex = 0;

	  if (_colorExp.test(combined)) {
	    toHSL = _hslExp.test(combined);
	    a[1] = _formatColors(a[1], toHSL);
	    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

	    return true;
	  }
	},

	/*
	 * --------------------------------------------------------------------------------------
	 * TICKER
	 * --------------------------------------------------------------------------------------
	 */
	_tickerActive,
	    _ticker = function () {
	  var _getTime = Date.now,
	      _lagThreshold = 500,
	      _adjustedLag = 33,
	      _startTime = _getTime(),
	      _lastUpdate = _startTime,
	      _gap = 1000 / 240,
	      _nextTime = _gap,
	      _listeners = [],
	      _id,
	      _req,
	      _raf,
	      _self,
	      _delta,
	      _i,
	      _tick = function _tick(v) {
	    var elapsed = _getTime() - _lastUpdate,
	        manual = v === true,
	        overlap,
	        dispatch,
	        time,
	        frame;

	    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
	    _lastUpdate += elapsed;
	    time = _lastUpdate - _startTime;
	    overlap = time - _nextTime;

	    if (overlap > 0 || manual) {
	      frame = ++_self.frame;
	      _delta = time - _self.time * 1000;
	      _self.time = time = time / 1000;
	      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
	      dispatch = 1;
	    }

	    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

	    if (dispatch) {
	      for (_i = 0; _i < _listeners.length; _i++) {
	        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
	        _listeners[_i](time, _delta, frame, v);
	      }
	    }
	  };

	  _self = {
	    time: 0,
	    frame: 0,
	    tick: function tick() {
	      _tick(true);
	    },
	    deltaRatio: function deltaRatio(fps) {
	      return _delta / (1000 / (fps || 60));
	    },
	    wake: function wake() {
	      if (_coreReady) {
	        if (!_coreInitted$2 && _windowExists$2()) {
	          _win$3 = _coreInitted$2 = window;
	          _doc$3 = _win$3.document || {};
	          _globals.gsap = gsap$2;
	          (_win$3.gsapVersions || (_win$3.gsapVersions = [])).push(gsap$2.version);

	          _install(_installScope || _win$3.GreenSockGlobals || !_win$3.gsap && _win$3 || {});

	          _raf = _win$3.requestAnimationFrame;

	          _registerPluginQueue.forEach(_createPlugin);
	        }

	        _id && _self.sleep();

	        _req = _raf || function (f) {
	          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
	        };

	        _tickerActive = 1;

	        _tick(2);
	      }
	    },
	    sleep: function sleep() {
	      (_raf ? _win$3.cancelAnimationFrame : clearTimeout)(_id);
	      _tickerActive = 0;
	      _req = _emptyFunc;
	    },
	    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
	      _lagThreshold = threshold || Infinity; // zero should be interpreted as basically unlimited

	      _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
	    },
	    fps: function fps(_fps) {
	      _gap = 1000 / (_fps || 240);
	      _nextTime = _self.time * 1000 + _gap;
	    },
	    add: function add(callback, once, prioritize) {
	      var func = once ? function (t, d, f, v) {
	        callback(t, d, f, v);

	        _self.remove(func);
	      } : callback;

	      _self.remove(callback);

	      _listeners[prioritize ? "unshift" : "push"](func);

	      _wake();

	      return func;
	    },
	    remove: function remove(callback, i) {
	      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
	    },
	    _listeners: _listeners
	  };
	  return _self;
	}(),
	    _wake = function _wake() {
	  return !_tickerActive && _ticker.wake();
	},
	    //also ensures the core classes are initialized.

	/*
	* -------------------------------------------------
	* EASING
	* -------------------------------------------------
	*/
	_easeMap = {},
	    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
	    _quotesExp = /["']/g,
	    _parseObjectInString = function _parseObjectInString(value) {
	  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
	  var obj = {},
	      split = value.substr(1, value.length - 3).split(":"),
	      key = split[0],
	      i = 1,
	      l = split.length,
	      index,
	      val,
	      parsedVal;

	  for (; i < l; i++) {
	    val = split[i];
	    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
	    parsedVal = val.substr(0, index);
	    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
	    key = val.substr(index + 1).trim();
	  }

	  return obj;
	},
	    _valueInParentheses = function _valueInParentheses(value) {
	  var open = value.indexOf("(") + 1,
	      close = value.indexOf(")"),
	      nested = value.indexOf("(", open);
	  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
	},
	    _configEaseFromString = function _configEaseFromString(name) {
	  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
	  var split = (name + "").split("("),
	      ease = _easeMap[split[0]];
	  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
	},
	    _invertEase = function _invertEase(ease) {
	  return function (p) {
	    return 1 - ease(1 - p);
	  };
	},
	    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
	_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
	  var child = timeline._first,
	      ease;

	  while (child) {
	    if (child instanceof Timeline) {
	      _propagateYoyoEase(child, isYoyo);
	    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
	      if (child.timeline) {
	        _propagateYoyoEase(child.timeline, isYoyo);
	      } else {
	        ease = child._ease;
	        child._ease = child._yEase;
	        child._yEase = ease;
	        child._yoyo = isYoyo;
	      }
	    }

	    child = child._next;
	  }
	},
	    _parseEase = function _parseEase(ease, defaultEase) {
	  return !ease ? defaultEase : (_isFunction$1(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
	},
	    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
	  if (easeOut === void 0) {
	    easeOut = function easeOut(p) {
	      return 1 - easeIn(1 - p);
	    };
	  }

	  if (easeInOut === void 0) {
	    easeInOut = function easeInOut(p) {
	      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
	    };
	  }

	  var ease = {
	    easeIn: easeIn,
	    easeOut: easeOut,
	    easeInOut: easeInOut
	  },
	      lowercaseName;

	  _forEachName(names, function (name) {
	    _easeMap[name] = _globals[name] = ease;
	    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

	    for (var p in ease) {
	      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
	    }
	  });

	  return ease;
	},
	    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
	  return function (p) {
	    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
	  };
	},
	    _configElastic = function _configElastic(type, amplitude, period) {
	  var p1 = amplitude >= 1 ? amplitude : 1,
	      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
	  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
	      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
	      easeOut = function easeOut(p) {
	    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
	  },
	      ease = type === "out" ? easeOut : type === "in" ? function (p) {
	    return 1 - easeOut(1 - p);
	  } : _easeInOutFromOut(easeOut);

	  p2 = _2PI / p2; //precalculate to optimize

	  ease.config = function (amplitude, period) {
	    return _configElastic(type, amplitude, period);
	  };

	  return ease;
	},
	    _configBack = function _configBack(type, overshoot) {
	  if (overshoot === void 0) {
	    overshoot = 1.70158;
	  }

	  var easeOut = function easeOut(p) {
	    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
	  },
	      ease = type === "out" ? easeOut : type === "in" ? function (p) {
	    return 1 - easeOut(1 - p);
	  } : _easeInOutFromOut(easeOut);

	  ease.config = function (overshoot) {
	    return _configBack(type, overshoot);
	  };

	  return ease;
	}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEase = ratio => {
	// 	let y = 0.5 + ratio / 2;
	// 	return p => (2 * (1 - p) * p * y + p * p);
	// },
	// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEaseStrong = ratio => {
	// 	ratio = .5 + ratio / 2;
	// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
	// 		b = ratio - o,
	// 		c = ratio + o;
	// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
	// };


	_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
	  var power = i < 5 ? i + 1 : i;

	  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
	    return Math.pow(p, power);
	  } : function (p) {
	    return p;
	  }, function (p) {
	    return 1 - Math.pow(1 - p, power);
	  }, function (p) {
	    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
	  });
	});

	_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

	_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

	(function (n, c) {
	  var n1 = 1 / c,
	      n2 = 2 * n1,
	      n3 = 2.5 * n1,
	      easeOut = function easeOut(p) {
	    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
	  };

	  _insertEase("Bounce", function (p) {
	    return 1 - easeOut(1 - p);
	  }, easeOut);
	})(7.5625, 2.75);

	_insertEase("Expo", function (p) {
	  return p ? Math.pow(2, 10 * (p - 1)) : 0;
	});

	_insertEase("Circ", function (p) {
	  return -(_sqrt(1 - p * p) - 1);
	});

	_insertEase("Sine", function (p) {
	  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
	});

	_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

	_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
	  config: function config(steps, immediateStart) {
	    if (steps === void 0) {
	      steps = 1;
	    }

	    var p1 = 1 / steps,
	        p2 = steps + (immediateStart ? 0 : 1),
	        p3 = immediateStart ? 1 : 0,
	        max = 1 - _tinyNum;
	    return function (p) {
	      return ((p2 * _clamp$1(0, max, p) | 0) + p3) * p1;
	    };
	  }
	};
	_defaults$1.ease = _easeMap["quad.out"];

	_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
	  return _callbackNames += name + "," + name + "Params,";
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * CACHE
	 * --------------------------------------------------------------------------------------
	 */


	var GSCache = function GSCache(target, harness) {
	  this.id = _gsID++;
	  target._gsap = this;
	  this.target = target;
	  this.harness = harness;
	  this.get = harness ? harness.get : _getProperty;
	  this.set = harness ? harness.getSetter : _getSetter;
	};
	/*
	 * --------------------------------------------------------------------------------------
	 * ANIMATION
	 * --------------------------------------------------------------------------------------
	 */

	var Animation = /*#__PURE__*/function () {
	  function Animation(vars) {
	    this.vars = vars;
	    this._delay = +vars.delay || 0;

	    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
	      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
	      this._rDelay = vars.repeatDelay || 0;
	      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
	    }

	    this._ts = 1;

	    _setDuration(this, +vars.duration, 1, 1);

	    this.data = vars.data;

	    if (_context$2) {
	      this._ctx = _context$2;

	      _context$2.data.push(this);
	    }

	    _tickerActive || _ticker.wake();
	  }

	  var _proto = Animation.prototype;

	  _proto.delay = function delay(value) {
	    if (value || value === 0) {
	      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
	      this._delay = value;
	      return this;
	    }

	    return this._delay;
	  };

	  _proto.duration = function duration(value) {
	    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
	  };

	  _proto.totalDuration = function totalDuration(value) {
	    if (!arguments.length) {
	      return this._tDur;
	    }

	    this._dirty = 0;
	    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
	  };

	  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
	    _wake();

	    if (!arguments.length) {
	      return this._tTime;
	    }

	    var parent = this._dp;

	    if (parent && parent.smoothChildTiming && this._ts) {
	      _alignPlayhead(this, _totalTime);

	      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
	      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

	      while (parent && parent.parent) {
	        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
	          parent.totalTime(parent._tTime, true);
	        }

	        parent = parent.parent;
	      }

	      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
	        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
	        _addToTimeline(this._dp, this, this._start - this._delay);
	      }
	    }

	    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
	      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
	      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
	      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
	      //   this._lock = 1;

	      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
	      //}

	    }

	    return this;
	  };

	  _proto.time = function time(value, suppressEvents) {
	    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
	  };

	  _proto.totalProgress = function totalProgress(value, suppressEvents) {
	    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
	  };

	  _proto.progress = function progress(value, suppressEvents) {
	    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
	  };

	  _proto.iteration = function iteration(value, suppressEvents) {
	    var cycleDuration = this.duration() + this._rDelay;

	    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
	  } // potential future addition:
	  // isPlayingBackwards() {
	  // 	let animation = this,
	  // 		orientation = 1; // 1 = forward, -1 = backward
	  // 	while (animation) {
	  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
	  // 		animation = animation.parent;
	  // 	}
	  // 	return orientation < 0;
	  // }
	  ;

	  _proto.timeScale = function timeScale(value) {
	    if (!arguments.length) {
	      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
	    }

	    if (this._rts === value) {
	      return this;
	    }

	    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
	    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
	    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
	    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

	    this._rts = +value || 0;
	    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

	    this.totalTime(_clamp$1(-Math.abs(this._delay), this._tDur, tTime), true);

	    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.


	    return _recacheAncestors(this);
	  };

	  _proto.paused = function paused(value) {
	    if (!arguments.length) {
	      return this._ps;
	    }

	    if (this._ps !== value) {
	      this._ps = value;

	      if (value) {
	        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

	        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
	      } else {
	        _wake();

	        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

	        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
	      }
	    }

	    return this;
	  };

	  _proto.startTime = function startTime(value) {
	    if (arguments.length) {
	      this._start = value;
	      var parent = this.parent || this._dp;
	      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
	      return this;
	    }

	    return this._start;
	  };

	  _proto.endTime = function endTime(includeRepeats) {
	    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
	  };

	  _proto.rawTime = function rawTime(wrapRepeats) {
	    var parent = this.parent || this._dp; // _dp = detached parent

	    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
	  };

	  _proto.revert = function revert(config) {
	    if (config === void 0) {
	      config = _revertConfig;
	    }

	    var prevIsReverting = _reverting$1;
	    _reverting$1 = config;

	    if (this._initted || this._startAt) {
	      this.timeline && this.timeline.revert(config);
	      this.totalTime(-0.01, config.suppressEvents);
	    }

	    this.data !== "nested" && config.kill !== false && this.kill();
	    _reverting$1 = prevIsReverting;
	    return this;
	  };

	  _proto.globalTime = function globalTime(rawTime) {
	    var animation = this,
	        time = arguments.length ? rawTime : animation.rawTime();

	    while (animation) {
	      time = animation._start + time / (animation._ts || 1);
	      animation = animation._dp;
	    }

	    return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(rawTime) : time; // the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for context.revert()). "_sat" stands for _startAtTween, referring to the parent tween that created the _startAt. We must discern if that tween had immediateRender so that we can know whether or not to prioritize it in revert().
	  };

	  _proto.repeat = function repeat(value) {
	    if (arguments.length) {
	      this._repeat = value === Infinity ? -2 : value;
	      return _onUpdateTotalDuration(this);
	    }

	    return this._repeat === -2 ? Infinity : this._repeat;
	  };

	  _proto.repeatDelay = function repeatDelay(value) {
	    if (arguments.length) {
	      var time = this._time;
	      this._rDelay = value;

	      _onUpdateTotalDuration(this);

	      return time ? this.time(time) : this;
	    }

	    return this._rDelay;
	  };

	  _proto.yoyo = function yoyo(value) {
	    if (arguments.length) {
	      this._yoyo = value;
	      return this;
	    }

	    return this._yoyo;
	  };

	  _proto.seek = function seek(position, suppressEvents) {
	    return this.totalTime(_parsePosition$1(this, position), _isNotFalse(suppressEvents));
	  };

	  _proto.restart = function restart(includeDelay, suppressEvents) {
	    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
	  };

	  _proto.play = function play(from, suppressEvents) {
	    from != null && this.seek(from, suppressEvents);
	    return this.reversed(false).paused(false);
	  };

	  _proto.reverse = function reverse(from, suppressEvents) {
	    from != null && this.seek(from || this.totalDuration(), suppressEvents);
	    return this.reversed(true).paused(false);
	  };

	  _proto.pause = function pause(atTime, suppressEvents) {
	    atTime != null && this.seek(atTime, suppressEvents);
	    return this.paused(true);
	  };

	  _proto.resume = function resume() {
	    return this.paused(false);
	  };

	  _proto.reversed = function reversed(value) {
	    if (arguments.length) {
	      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

	      return this;
	    }

	    return this._rts < 0;
	  };

	  _proto.invalidate = function invalidate() {
	    this._initted = this._act = 0;
	    this._zTime = -_tinyNum;
	    return this;
	  };

	  _proto.isActive = function isActive() {
	    var parent = this.parent || this._dp,
	        start = this._start,
	        rawTime;
	    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
	  };

	  _proto.eventCallback = function eventCallback(type, callback, params) {
	    var vars = this.vars;

	    if (arguments.length > 1) {
	      if (!callback) {
	        delete vars[type];
	      } else {
	        vars[type] = callback;
	        params && (vars[type + "Params"] = params);
	        type === "onUpdate" && (this._onUpdate = callback);
	      }

	      return this;
	    }

	    return vars[type];
	  };

	  _proto.then = function then(onFulfilled) {
	    var self = this;
	    return new Promise(function (resolve) {
	      var f = _isFunction$1(onFulfilled) ? onFulfilled : _passThrough$1,
	          _resolve = function _resolve() {
	        var _then = self.then;
	        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

	        _isFunction$1(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
	        resolve(f);
	        self.then = _then;
	      };

	      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
	        _resolve();
	      } else {
	        self._prom = _resolve;
	      }
	    });
	  };

	  _proto.kill = function kill() {
	    _interrupt(this);
	  };

	  return Animation;
	}();

	_setDefaults$1(Animation.prototype, {
	  _time: 0,
	  _start: 0,
	  _end: 0,
	  _tTime: 0,
	  _tDur: 0,
	  _dirty: 0,
	  _repeat: 0,
	  _yoyo: false,
	  parent: null,
	  _initted: false,
	  _rDelay: 0,
	  _ts: 1,
	  _dp: 0,
	  ratio: 0,
	  _zTime: -_tinyNum,
	  _prom: 0,
	  _ps: false,
	  _rts: 1
	});
	/*
	 * -------------------------------------------------
	 * TIMELINE
	 * -------------------------------------------------
	 */


	var Timeline = /*#__PURE__*/function (_Animation) {
	  _inheritsLoose(Timeline, _Animation);

	  function Timeline(vars, position) {
	    var _this;

	    if (vars === void 0) {
	      vars = {};
	    }

	    _this = _Animation.call(this, vars) || this;
	    _this.labels = {};
	    _this.smoothChildTiming = !!vars.smoothChildTiming;
	    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
	    _this._sort = _isNotFalse(vars.sortChildren);
	    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
	    vars.reversed && _this.reverse();
	    vars.paused && _this.paused(true);
	    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
	    return _this;
	  }

	  var _proto2 = Timeline.prototype;

	  _proto2.to = function to(targets, vars, position) {
	    _createTweenType(0, arguments, this);

	    return this;
	  };

	  _proto2.from = function from(targets, vars, position) {
	    _createTweenType(1, arguments, this);

	    return this;
	  };

	  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
	    _createTweenType(2, arguments, this);

	    return this;
	  };

	  _proto2.set = function set(targets, vars, position) {
	    vars.duration = 0;
	    vars.parent = this;
	    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
	    vars.immediateRender = !!vars.immediateRender;
	    new Tween(targets, vars, _parsePosition$1(this, position), 1);
	    return this;
	  };

	  _proto2.call = function call(callback, params, position) {
	    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
	  } //ONLY for backward compatibility! Maybe delete?
	  ;

	  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    vars.duration = duration;
	    vars.stagger = vars.stagger || stagger;
	    vars.onComplete = onCompleteAll;
	    vars.onCompleteParams = onCompleteAllParams;
	    vars.parent = this;
	    new Tween(targets, vars, _parsePosition$1(this, position));
	    return this;
	  };

	  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    vars.runBackwards = 1;
	    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
	    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
	  };

	  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    toVars.startAt = fromVars;
	    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
	    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
	  };

	  _proto2.render = function render(totalTime, suppressEvents, force) {
	    var prevTime = this._time,
	        tDur = this._dirty ? this.totalDuration() : this._tDur,
	        dur = this._dur,
	        tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
	        // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
	    crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
	        time,
	        child,
	        next,
	        iteration,
	        cycleDuration,
	        prevPaused,
	        pauseTween,
	        timeScale,
	        prevStart,
	        prevIteration,
	        yoyo,
	        isYoyo;
	    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

	    if (tTime !== this._tTime || force || crossingStart) {
	      if (prevTime !== this._time && dur) {
	        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
	        tTime += this._time - prevTime;
	        totalTime += this._time - prevTime;
	      }

	      time = tTime;
	      prevStart = this._start;
	      timeScale = this._ts;
	      prevPaused = !timeScale;

	      if (crossingStart) {
	        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

	        (totalTime || !suppressEvents) && (this._zTime = totalTime);
	      }

	      if (this._repeat) {
	        //adjust the time for repeats and yoyos
	        yoyo = this._yoyo;
	        cycleDuration = dur + this._rDelay;

	        if (this._repeat < -1 && totalTime < 0) {
	          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
	        }

	        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

	        if (tTime === tDur) {
	          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
	          iteration = this._repeat;
	          time = dur;
	        } else {
	          iteration = ~~(tTime / cycleDuration);

	          if (iteration && iteration === tTime / cycleDuration) {
	            time = dur;
	            iteration--;
	          }

	          time > dur && (time = dur);
	        }

	        prevIteration = _animationCycle(this._tTime, cycleDuration);
	        !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005 also, this._tTime - prevIteration * cycleDuration - this._dur <= 0 just checks to make sure it wasn't previously in the "repeatDelay" portion

	        if (yoyo && iteration & 1) {
	          time = dur - time;
	          isYoyo = 1;
	        }
	        /*
	        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
	        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
	        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
	        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
	        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
	        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
	        */


	        if (iteration !== prevIteration && !this._lock) {
	          var rewinding = yoyo && prevIteration & 1,
	              doesWrap = rewinding === (yoyo && iteration & 1);
	          iteration < prevIteration && (rewinding = !rewinding);
	          prevTime = rewinding ? 0 : dur;
	          this._lock = 1;
	          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
	          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

	          !suppressEvents && this.parent && _callback$1(this, "onRepeat");
	          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

	          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
	            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
	            return this;
	          }

	          dur = this._dur; // in case the duration changed in the onRepeat

	          tDur = this._tDur;

	          if (doesWrap) {
	            this._lock = 2;
	            prevTime = rewinding ? dur : -0.0001;
	            this.render(prevTime, true);
	            this.vars.repeatRefresh && !isYoyo && this.invalidate();
	          }

	          this._lock = 0;

	          if (!this._ts && !prevPaused) {
	            return this;
	          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


	          _propagateYoyoEase(this, isYoyo);
	        }
	      }

	      if (this._hasPause && !this._forcing && this._lock < 2) {
	        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

	        if (pauseTween) {
	          tTime -= time - (time = pauseTween._start);
	        }
	      }

	      this._tTime = tTime;
	      this._time = time;
	      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

	      if (!this._initted) {
	        this._onUpdate = this.vars.onUpdate;
	        this._initted = 1;
	        this._zTime = totalTime;
	        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
	      }

	      if (!prevTime && time && !suppressEvents && !iteration) {
	        _callback$1(this, "onStart");

	        if (this._tTime !== tTime) {
	          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
	          return this;
	        }
	      }

	      if (time >= prevTime && totalTime >= 0) {
	        child = this._first;

	        while (child) {
	          next = child._next;

	          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
	            if (child.parent !== this) {
	              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
	              return this.render(totalTime, suppressEvents, force);
	            }

	            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

	            if (time !== this._time || !this._ts && !prevPaused) {
	              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
	              pauseTween = 0;
	              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

	              break;
	            }
	          }

	          child = next;
	        }
	      } else {
	        child = this._last;
	        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

	        while (child) {
	          next = child._prev;

	          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
	            if (child.parent !== this) {
	              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
	              return this.render(totalTime, suppressEvents, force);
	            }

	            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting$1 && (child._initted || child._startAt)); // if reverting, we should always force renders of initted tweens (but remember that .fromTo() or .from() may have a _startAt but not _initted yet). If, for example, a .fromTo() tween with a stagger (which creates an internal timeline) gets reverted BEFORE some of its child tweens render for the first time, it may not properly trigger them to revert.

	            if (time !== this._time || !this._ts && !prevPaused) {
	              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
	              pauseTween = 0;
	              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

	              break;
	            }
	          }

	          child = next;
	        }
	      }

	      if (pauseTween && !suppressEvents) {
	        this.pause();
	        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

	        if (this._ts) {
	          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
	          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

	          _setEnd(this);

	          return this.render(totalTime, suppressEvents, force);
	        }
	      }

	      this._onUpdate && !suppressEvents && _callback$1(this, "onUpdate", true);
	      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
	        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
	        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

	        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
	          _callback$1(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);

	          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
	        }
	      }
	    }

	    return this;
	  };

	  _proto2.add = function add(child, position) {
	    var _this2 = this;

	    _isNumber$1(position) || (position = _parsePosition$1(this, position, child));

	    if (!(child instanceof Animation)) {
	      if (_isArray(child)) {
	        child.forEach(function (obj) {
	          return _this2.add(obj, position);
	        });
	        return this;
	      }

	      if (_isString$1(child)) {
	        return this.addLabel(child, position);
	      }

	      if (_isFunction$1(child)) {
	        child = Tween.delayedCall(0, child);
	      } else {
	        return this;
	      }
	    }

	    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
	  };

	  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
	    if (nested === void 0) {
	      nested = true;
	    }

	    if (tweens === void 0) {
	      tweens = true;
	    }

	    if (timelines === void 0) {
	      timelines = true;
	    }

	    if (ignoreBeforeTime === void 0) {
	      ignoreBeforeTime = -_bigNum$1;
	    }

	    var a = [],
	        child = this._first;

	    while (child) {
	      if (child._start >= ignoreBeforeTime) {
	        if (child instanceof Tween) {
	          tweens && a.push(child);
	        } else {
	          timelines && a.push(child);
	          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
	        }
	      }

	      child = child._next;
	    }

	    return a;
	  };

	  _proto2.getById = function getById(id) {
	    var animations = this.getChildren(1, 1, 1),
	        i = animations.length;

	    while (i--) {
	      if (animations[i].vars.id === id) {
	        return animations[i];
	      }
	    }
	  };

	  _proto2.remove = function remove(child) {
	    if (_isString$1(child)) {
	      return this.removeLabel(child);
	    }

	    if (_isFunction$1(child)) {
	      return this.killTweensOf(child);
	    }

	    _removeLinkedListItem(this, child);

	    if (child === this._recent) {
	      this._recent = this._last;
	    }

	    return _uncache(this);
	  };

	  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
	    if (!arguments.length) {
	      return this._tTime;
	    }

	    this._forcing = 1;

	    if (!this._dp && this._ts) {
	      //special case for the global timeline (or any other that has no parent or detached parent).
	      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
	    }

	    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

	    this._forcing = 0;
	    return this;
	  };

	  _proto2.addLabel = function addLabel(label, position) {
	    this.labels[label] = _parsePosition$1(this, position);
	    return this;
	  };

	  _proto2.removeLabel = function removeLabel(label) {
	    delete this.labels[label];
	    return this;
	  };

	  _proto2.addPause = function addPause(position, callback, params) {
	    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
	    t.data = "isPause";
	    this._hasPause = 1;
	    return _addToTimeline(this, t, _parsePosition$1(this, position));
	  };

	  _proto2.removePause = function removePause(position) {
	    var child = this._first;
	    position = _parsePosition$1(this, position);

	    while (child) {
	      if (child._start === position && child.data === "isPause") {
	        _removeFromParent(child);
	      }

	      child = child._next;
	    }
	  };

	  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
	    var tweens = this.getTweensOf(targets, onlyActive),
	        i = tweens.length;

	    while (i--) {
	      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
	    }

	    return this;
	  };

	  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
	    var a = [],
	        parsedTargets = toArray(targets),
	        child = this._first,
	        isGlobalTime = _isNumber$1(onlyActive),
	        // a number is interpreted as a global time. If the animation spans
	    children;

	    while (child) {
	      if (child instanceof Tween) {
	        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
	          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
	          a.push(child);
	        }
	      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
	        a.push.apply(a, children);
	      }

	      child = child._next;
	    }

	    return a;
	  } // potential future feature - targets() on timelines
	  // targets() {
	  // 	let result = [];
	  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
	  // 	return result.filter((v, i) => result.indexOf(v) === i);
	  // }
	  ;

	  _proto2.tweenTo = function tweenTo(position, vars) {
	    vars = vars || {};

	    var tl = this,
	        endTime = _parsePosition$1(tl, position),
	        _vars = vars,
	        startAt = _vars.startAt,
	        _onStart = _vars.onStart,
	        onStartParams = _vars.onStartParams,
	        immediateRender = _vars.immediateRender,
	        initted,
	        tween = Tween.to(tl, _setDefaults$1({
	      ease: vars.ease || "none",
	      lazy: false,
	      immediateRender: false,
	      time: endTime,
	      overwrite: "auto",
	      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
	      onStart: function onStart() {
	        tl.pause();

	        if (!initted) {
	          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
	          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
	          initted = 1;
	        }

	        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
	      }
	    }, vars));

	    return immediateRender ? tween.render(0) : tween;
	  };

	  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
	    return this.tweenTo(toPosition, _setDefaults$1({
	      startAt: {
	        time: _parsePosition$1(this, fromPosition)
	      }
	    }, vars));
	  };

	  _proto2.recent = function recent() {
	    return this._recent;
	  };

	  _proto2.nextLabel = function nextLabel(afterTime) {
	    if (afterTime === void 0) {
	      afterTime = this._time;
	    }

	    return _getLabelInDirection(this, _parsePosition$1(this, afterTime));
	  };

	  _proto2.previousLabel = function previousLabel(beforeTime) {
	    if (beforeTime === void 0) {
	      beforeTime = this._time;
	    }

	    return _getLabelInDirection(this, _parsePosition$1(this, beforeTime), 1);
	  };

	  _proto2.currentLabel = function currentLabel(value) {
	    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
	  };

	  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
	    if (ignoreBeforeTime === void 0) {
	      ignoreBeforeTime = 0;
	    }

	    var child = this._first,
	        labels = this.labels,
	        p;

	    while (child) {
	      if (child._start >= ignoreBeforeTime) {
	        child._start += amount;
	        child._end += amount;
	      }

	      child = child._next;
	    }

	    if (adjustLabels) {
	      for (p in labels) {
	        if (labels[p] >= ignoreBeforeTime) {
	          labels[p] += amount;
	        }
	      }
	    }

	    return _uncache(this);
	  };

	  _proto2.invalidate = function invalidate(soft) {
	    var child = this._first;
	    this._lock = 0;

	    while (child) {
	      child.invalidate(soft);
	      child = child._next;
	    }

	    return _Animation.prototype.invalidate.call(this, soft);
	  };

	  _proto2.clear = function clear(includeLabels) {
	    if (includeLabels === void 0) {
	      includeLabels = true;
	    }

	    var child = this._first,
	        next;

	    while (child) {
	      next = child._next;
	      this.remove(child);
	      child = next;
	    }

	    this._dp && (this._time = this._tTime = this._pTime = 0);
	    includeLabels && (this.labels = {});
	    return _uncache(this);
	  };

	  _proto2.totalDuration = function totalDuration(value) {
	    var max = 0,
	        self = this,
	        child = self._last,
	        prevStart = _bigNum$1,
	        prev,
	        start,
	        parent;

	    if (arguments.length) {
	      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
	    }

	    if (self._dirty) {
	      parent = self.parent;

	      while (child) {
	        prev = child._prev; //record it here in case the tween changes position in the sequence...

	        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

	        start = child._start;

	        if (start > prevStart && self._sort && child._ts && !self._lock) {
	          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
	          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

	          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
	        } else {
	          prevStart = start;
	        }

	        if (start < 0 && child._ts) {
	          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
	          max -= start;

	          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
	            self._start += start / self._ts;
	            self._time -= start;
	            self._tTime -= start;
	          }

	          self.shiftChildren(-start, false, -1e999);
	          prevStart = 0;
	        }

	        child._end > max && child._ts && (max = child._end);
	        child = prev;
	      }

	      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

	      self._dirty = 0;
	    }

	    return self._tDur;
	  };

	  Timeline.updateRoot = function updateRoot(time) {
	    if (_globalTimeline._ts) {
	      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

	      _lastRenderedFrame = _ticker.frame;
	    }

	    if (_ticker.frame >= _nextGCFrame) {
	      _nextGCFrame += _config.autoSleep || 120;
	      var child = _globalTimeline._first;
	      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
	        while (child && !child._ts) {
	          child = child._next;
	        }

	        child || _ticker.sleep();
	      }
	    }
	  };

	  return Timeline;
	}(Animation);

	_setDefaults$1(Timeline.prototype, {
	  _lock: 0,
	  _hasPause: 0,
	  _forcing: 0
	});

	var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
	  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
	  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
	      index = 0,
	      matchIndex = 0,
	      result,
	      startNums,
	      color,
	      endNum,
	      chunk,
	      startNum,
	      hasRandom,
	      a;
	  pt.b = start;
	  pt.e = end;
	  start += ""; //ensure values are strings

	  end += "";

	  if (hasRandom = ~end.indexOf("random(")) {
	    end = _replaceRandom(end);
	  }

	  if (stringFilter) {
	    a = [start, end];
	    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

	    start = a[0];
	    end = a[1];
	  }

	  startNums = start.match(_complexStringNumExp) || [];

	  while (result = _complexStringNumExp.exec(end)) {
	    endNum = result[0];
	    chunk = end.substring(index, result.index);

	    if (color) {
	      color = (color + 1) % 5;
	    } else if (chunk.substr(-5) === "rgba(") {
	      color = 1;
	    }

	    if (endNum !== startNums[matchIndex++]) {
	      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

	      pt._pt = {
	        _next: pt._pt,
	        p: chunk || matchIndex === 1 ? chunk : ",",
	        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
	        s: startNum,
	        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
	        m: color && color < 4 ? Math.round : 0
	      };
	      index = _complexStringNumExp.lastIndex;
	    }
	  }

	  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

	  pt.fp = funcParam;

	  if (_relExp.test(end) || hasRandom) {
	    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
	  }

	  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

	  return pt;
	},
	    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
	  _isFunction$1(end) && (end = end(index || 0, target, targets));
	  var currentValue = target[prop],
	      parsedStart = start !== "get" ? start : !_isFunction$1(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction$1(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
	      setter = !_isFunction$1(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
	      pt;

	  if (_isString$1(end)) {
	    if (~end.indexOf("random(")) {
	      end = _replaceRandom(end);
	    }

	    if (end.charAt(1) === "=") {
	      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);

	      if (pt || pt === 0) {
	        // to avoid isNaN, like if someone passes in a value like "!= whatever"
	        end = pt;
	      }
	    }
	  }

	  if (!optional || parsedStart !== end || _forceAllPropTweens) {
	    if (!isNaN(parsedStart * end) && end !== "") {
	      // fun fact: any number multiplied by "" is evaluated as the number 0!
	      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
	      funcParam && (pt.fp = funcParam);
	      modifier && pt.modifier(modifier, this, target);
	      return this._pt = pt;
	    }

	    !currentValue && !(prop in target) && _missingPlugin(prop, end);
	    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
	  }
	},
	    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
	_processVars = function _processVars(vars, index, target, targets, tween) {
	  _isFunction$1(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

	  if (!_isObject$1(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
	    return _isString$1(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
	  }

	  var copy = {},
	      p;

	  for (p in vars) {
	    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
	  }

	  return copy;
	},
	    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
	  var plugin, pt, ptLookup, i;

	  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
	    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

	    if (tween !== _quickTween) {
	      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

	      i = plugin._props.length;

	      while (i--) {
	        ptLookup[plugin._props[i]] = pt;
	      }
	    }
	  }

	  return plugin;
	},
	    _overwritingTween,
	    //store a reference temporarily so we can avoid overwriting itself.
	_forceAllPropTweens,
	    _initTween = function _initTween(tween, time, tTime) {
	  var vars = tween.vars,
	      ease = vars.ease,
	      startAt = vars.startAt,
	      immediateRender = vars.immediateRender,
	      lazy = vars.lazy,
	      onUpdate = vars.onUpdate,
	      onUpdateParams = vars.onUpdateParams,
	      callbackScope = vars.callbackScope,
	      runBackwards = vars.runBackwards,
	      yoyoEase = vars.yoyoEase,
	      keyframes = vars.keyframes,
	      autoRevert = vars.autoRevert,
	      dur = tween._dur,
	      prevStartAt = tween._startAt,
	      targets = tween._targets,
	      parent = tween.parent,
	      fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets,
	      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites$1,
	      tl = tween.timeline,
	      cleanVars,
	      i,
	      p,
	      pt,
	      target,
	      hasPriority,
	      gsData,
	      harness,
	      plugin,
	      ptLookup,
	      index,
	      harnessVars,
	      overwritten;
	  tl && (!keyframes || !ease) && (ease = "none");
	  tween._ease = _parseEase(ease, _defaults$1.ease);
	  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults$1.ease)) : 0;

	  if (yoyoEase && tween._yoyo && !tween._repeat) {
	    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
	    yoyoEase = tween._yEase;
	    tween._yEase = tween._ease;
	    tween._ease = yoyoEase;
	  }

	  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

	  if (!tl || keyframes && !vars.stagger) {
	    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
	    harness = targets[0] ? _getCache(targets[0]).harness : 0;
	    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

	    cleanVars = _copyExcluding(vars, _reservedProps);

	    if (prevStartAt) {
	      prevStartAt._zTime < 0 && prevStartAt.progress(1); // in case it's a lazy startAt that hasn't rendered yet.

	      time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig); // if it's a "startAt" (not "from()" or runBackwards: true), we only need to do a shallow revert (keep transforms cached in CSSPlugin)
	      // don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.

	      prevStartAt._lazy = 0;
	    }

	    if (startAt) {
	      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults$1({
	        data: "isStart",
	        overwrite: false,
	        parent: parent,
	        immediateRender: true,
	        lazy: !prevStartAt && _isNotFalse(lazy),
	        startAt: null,
	        delay: 0,
	        onUpdate: onUpdate,
	        onUpdateParams: onUpdateParams,
	        callbackScope: callbackScope,
	        stagger: 0
	      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


	      tween._startAt._dp = 0; // don't allow it to get put back into root timeline! Like when revert() is called and totalTime() gets set.

	      tween._startAt._sat = tween; // used in globalTime(). _sat stands for _startAtTween

	      time < 0 && (_reverting$1 || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

	      if (immediateRender) {
	        if (dur && time <= 0 && tTime <= 0) {
	          // check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
	          time && (tween._zTime = time);
	          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
	        }
	      }
	    } else if (runBackwards && dur) {
	      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
	      if (!prevStartAt) {
	        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

	        p = _setDefaults$1({
	          overwrite: false,
	          data: "isFromStart",
	          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
	          lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
	          immediateRender: immediateRender,
	          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
	          stagger: 0,
	          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

	        }, cleanVars);
	        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

	        _removeFromParent(tween._startAt = Tween.set(targets, p));

	        tween._startAt._dp = 0; // don't allow it to get put back into root timeline!

	        tween._startAt._sat = tween; // used in globalTime()

	        time < 0 && (_reverting$1 ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
	        tween._zTime = time;

	        if (!immediateRender) {
	          _initTween(tween._startAt, _tinyNum, _tinyNum); //ensures that the initial values are recorded

	        } else if (!time) {
	          return;
	        }
	      }
	    }

	    tween._pt = tween._ptCache = 0;
	    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

	    for (i = 0; i < targets.length; i++) {
	      target = targets[i];
	      gsData = target._gsap || _harness(targets)[i]._gsap;
	      tween._ptLookup[i] = ptLookup = {};
	      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

	      index = fullTargets === targets ? i : fullTargets.indexOf(target);

	      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
	        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

	        plugin._props.forEach(function (name) {
	          ptLookup[name] = pt;
	        });

	        plugin.priority && (hasPriority = 1);
	      }

	      if (!harness || harnessVars) {
	        for (p in cleanVars) {
	          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
	            plugin.priority && (hasPriority = 1);
	          } else {
	            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
	          }
	        }
	      }

	      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

	      if (autoOverwrite && tween._pt) {
	        _overwritingTween = tween;

	        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!


	        overwritten = !tween.parent;
	        _overwritingTween = 0;
	      }

	      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
	    }

	    hasPriority && _sortPropTweensByPriority(tween);
	    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
	  }

	  tween._onUpdate = onUpdate;
	  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

	  keyframes && time <= 0 && tl.render(_bigNum$1, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
	},
	    _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
	  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
	      pt,
	      rootPT,
	      lookup,
	      i;

	  if (!ptCache) {
	    ptCache = tween._ptCache[property] = [];
	    lookup = tween._ptLookup;
	    i = tween._targets.length;

	    while (i--) {
	      pt = lookup[i][property];

	      if (pt && pt.d && pt.d._pt) {
	        // it's a plugin, so find the nested PropTween
	        pt = pt.d._pt;

	        while (pt && pt.p !== property && pt.fp !== property) {
	          // "fp" is functionParam for things like setting CSS variables which require .setProperty("--var-name", value)
	          pt = pt._next;
	        }
	      }

	      if (!pt) {
	        // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
	        // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
	        _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

	        tween.vars[property] = "+=0";

	        _initTween(tween, time);

	        _forceAllPropTweens = 0;
	        return 1;
	      }

	      ptCache.push(pt);
	    }
	  }

	  i = ptCache.length;

	  while (i--) {
	    rootPT = ptCache[i];
	    pt = rootPT._pt || rootPT; // complex values may have nested PropTweens. We only accommodate the FIRST value.

	    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
	    pt.c = value - pt.s;
	    rootPT.e && (rootPT.e = _round$1(value) + getUnit(rootPT.e)); // mainly for CSSPlugin (end value)

	    rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b)); // (beginning value)
	  }
	},
	    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
	  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
	      propertyAliases = harness && harness.aliases,
	      copy,
	      p,
	      i,
	      aliases;

	  if (!propertyAliases) {
	    return vars;
	  }

	  copy = _merge({}, vars);

	  for (p in propertyAliases) {
	    if (p in copy) {
	      aliases = propertyAliases[p].split(",");
	      i = aliases.length;

	      while (i--) {
	        copy[aliases[i]] = copy[p];
	      }
	    }
	  }

	  return copy;
	},
	    // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
	_parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
	  var ease = obj.ease || easeEach || "power1.inOut",
	      p,
	      a;

	  if (_isArray(obj)) {
	    a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

	    obj.forEach(function (value, i) {
	      return a.push({
	        t: i / (obj.length - 1) * 100,
	        v: value,
	        e: ease
	      });
	    });
	  } else {
	    for (p in obj) {
	      a = allProps[p] || (allProps[p] = []);
	      p === "ease" || a.push({
	        t: parseFloat(prop),
	        v: obj[p],
	        e: ease
	      });
	    }
	  }
	},
	    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
	  return _isFunction$1(value) ? value.call(tween, i, target, targets) : _isString$1(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
	},
	    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
	    _staggerPropsToSkip = {};

	_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
	  return _staggerPropsToSkip[name] = 1;
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * TWEEN
	 * --------------------------------------------------------------------------------------
	 */


	var Tween = /*#__PURE__*/function (_Animation2) {
	  _inheritsLoose(Tween, _Animation2);

	  function Tween(targets, vars, position, skipInherit) {
	    var _this3;

	    if (typeof vars === "number") {
	      position.duration = vars;
	      vars = position;
	      position = null;
	    }

	    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
	    var _this3$vars = _this3.vars,
	        duration = _this3$vars.duration,
	        delay = _this3$vars.delay,
	        immediateRender = _this3$vars.immediateRender,
	        stagger = _this3$vars.stagger,
	        overwrite = _this3$vars.overwrite,
	        keyframes = _this3$vars.keyframes,
	        defaults = _this3$vars.defaults,
	        scrollTrigger = _this3$vars.scrollTrigger,
	        yoyoEase = _this3$vars.yoyoEase,
	        parent = vars.parent || _globalTimeline,
	        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber$1(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
	        tl,
	        i,
	        copy,
	        l,
	        p,
	        curTarget,
	        staggerFunc,
	        staggerVarsToMerge;
	    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
	    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

	    _this3._overwrite = overwrite;

	    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
	      vars = _this3.vars;
	      tl = _this3.timeline = new Timeline({
	        data: "nested",
	        defaults: defaults || {},
	        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
	      }); // we need to store the targets because for staggers and keyframes, we end up creating an individual tween for each but function-based values need to know the index and the whole Array of targets.

	      tl.kill();
	      tl.parent = tl._dp = _assertThisInitialized(_this3);
	      tl._start = 0;

	      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
	        l = parsedTargets.length;
	        staggerFunc = stagger && distribute(stagger);

	        if (_isObject$1(stagger)) {
	          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
	          for (p in stagger) {
	            if (~_staggerTweenProps.indexOf(p)) {
	              staggerVarsToMerge || (staggerVarsToMerge = {});
	              staggerVarsToMerge[p] = stagger[p];
	            }
	          }
	        }

	        for (i = 0; i < l; i++) {
	          copy = _copyExcluding(vars, _staggerPropsToSkip);
	          copy.stagger = 0;
	          yoyoEase && (copy.yoyoEase = yoyoEase);
	          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
	          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

	          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
	          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

	          if (!stagger && l === 1 && copy.delay) {
	            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
	            _this3._delay = delay = copy.delay;
	            _this3._start += delay;
	            copy.delay = 0;
	          }

	          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
	          tl._ease = _easeMap.none;
	        }

	        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
	      } else if (keyframes) {
	        _inheritDefaults(_setDefaults$1(tl.vars.defaults, {
	          ease: "none"
	        }));

	        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
	        var time = 0,
	            a,
	            kf,
	            v;

	        if (_isArray(keyframes)) {
	          keyframes.forEach(function (frame) {
	            return tl.to(parsedTargets, frame, ">");
	          });
	          tl.duration(); // to ensure tl._dur is cached because we tap into it for performance purposes in the render() method.
	        } else {
	          copy = {};

	          for (p in keyframes) {
	            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
	          }

	          for (p in copy) {
	            a = copy[p].sort(function (a, b) {
	              return a.t - b.t;
	            });
	            time = 0;

	            for (i = 0; i < a.length; i++) {
	              kf = a[i];
	              v = {
	                ease: kf.e,
	                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
	              };
	              v[p] = kf.v;
	              tl.to(parsedTargets, v, time);
	              time += v.duration;
	            }
	          }

	          tl.duration() < duration && tl.to({}, {
	            duration: duration - tl.duration()
	          }); // in case keyframes didn't go to 100%
	        }
	      }

	      duration || _this3.duration(duration = tl.duration());
	    } else {
	      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
	    }

	    if (overwrite === true && !_suppressOverwrites$1) {
	      _overwritingTween = _assertThisInitialized(_this3);

	      _globalTimeline.killTweensOf(parsedTargets);

	      _overwritingTween = 0;
	    }

	    _addToTimeline(parent, _assertThisInitialized(_this3), position);

	    vars.reversed && _this3.reverse();
	    vars.paused && _this3.paused(true);

	    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
	      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

	      _this3.render(Math.max(0, -delay) || 0); //in case delay is negative

	    }

	    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
	    return _this3;
	  }

	  var _proto3 = Tween.prototype;

	  _proto3.render = function render(totalTime, suppressEvents, force) {
	    var prevTime = this._time,
	        tDur = this._tDur,
	        dur = this._dur,
	        isNegative = totalTime < 0,
	        tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime,
	        time,
	        pt,
	        iteration,
	        cycleDuration,
	        prevIteration,
	        isYoyo,
	        ratio,
	        timeline,
	        yoyoEase;

	    if (!dur) {
	      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
	    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
	      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
	      time = tTime;
	      timeline = this.timeline;

	      if (this._repeat) {
	        //adjust the time for repeats and yoyos
	        cycleDuration = dur + this._rDelay;

	        if (this._repeat < -1 && isNegative) {
	          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
	        }

	        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

	        if (tTime === tDur) {
	          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
	          iteration = this._repeat;
	          time = dur;
	        } else {
	          iteration = ~~(tTime / cycleDuration);

	          if (iteration && iteration === tTime / cycleDuration) {
	            time = dur;
	            iteration--;
	          }

	          time > dur && (time = dur);
	        }

	        isYoyo = this._yoyo && iteration & 1;

	        if (isYoyo) {
	          yoyoEase = this._yEase;
	          time = dur - time;
	        }

	        prevIteration = _animationCycle(this._tTime, cycleDuration);

	        if (time === prevTime && !force && this._initted) {
	          //could be during the repeatDelay part. No need to render and fire callbacks.
	          this._tTime = tTime;
	          return this;
	        }

	        if (iteration !== prevIteration) {
	          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

	          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
	            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

	            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
	          }
	        }
	      }

	      if (!this._initted) {
	        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
	          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

	          return this;
	        }

	        if (prevTime !== this._time) {
	          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
	          return this;
	        }

	        if (dur !== this._dur) {
	          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
	          return this.render(totalTime, suppressEvents, force);
	        }
	      }

	      this._tTime = tTime;
	      this._time = time;

	      if (!this._act && this._ts) {
	        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

	        this._lazy = 0;
	      }

	      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

	      if (this._from) {
	        this.ratio = ratio = 1 - ratio;
	      }

	      if (time && !prevTime && !suppressEvents && !iteration) {
	        _callback$1(this, "onStart");

	        if (this._tTime !== tTime) {
	          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
	          return this;
	        }
	      }

	      pt = this._pt;

	      while (pt) {
	        pt.r(ratio, pt.d);
	        pt = pt._next;
	      }

	      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);

	      if (this._onUpdate && !suppressEvents) {
	        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

	        _callback$1(this, "onUpdate");
	      }

	      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback$1(this, "onRepeat");

	      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
	        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
	        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

	        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
	          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
	          _callback$1(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

	          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
	        }
	      }
	    }

	    return this;
	  };

	  _proto3.targets = function targets() {
	    return this._targets;
	  };

	  _proto3.invalidate = function invalidate(soft) {
	    // "soft" gives us a way to clear out everything EXCEPT the recorded pre-"from" portion of from() tweens. Otherwise, for example, if you tween.progress(1).render(0, true true).invalidate(), the "from" values would persist and then on the next render, the from() tweens would initialize and the current value would match the "from" values, thus animate from the same value to the same value (no animation). We tap into this in ScrollTrigger's refresh() where we must push a tween to completion and then back again but honor its init state in case the tween is dependent on another tween further up on the page.
	    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
	    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
	    this._ptLookup = [];
	    this.timeline && this.timeline.invalidate(soft);
	    return _Animation2.prototype.invalidate.call(this, soft);
	  };

	  _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
	    _tickerActive || _ticker.wake();
	    this._ts || this.play();
	    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
	        ratio;
	    this._initted || _initTween(this, time);
	    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
	    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
	    // if (_isObject(property)) { // performance optimization
	    // 	for (p in property) {
	    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
	    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
	    // 		}
	    // 	}
	    // } else {

	    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
	      return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
	    } //}


	    _alignPlayhead(this, 0);

	    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
	    return this.render(0);
	  };

	  _proto3.kill = function kill(targets, vars) {
	    if (vars === void 0) {
	      vars = "all";
	    }

	    if (!targets && (!vars || vars === "all")) {
	      this._lazy = this._pt = 0;
	      return this.parent ? _interrupt(this) : this;
	    }

	    if (this.timeline) {
	      var tDur = this.timeline.totalDuration();
	      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

	      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

	      return this;
	    }

	    var parsedTargets = this._targets,
	        killingTargets = targets ? toArray(targets) : parsedTargets,
	        propTweenLookup = this._ptLookup,
	        firstPT = this._pt,
	        overwrittenProps,
	        curLookup,
	        curOverwriteProps,
	        props,
	        p,
	        pt,
	        i;

	    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
	      vars === "all" && (this._pt = 0);
	      return _interrupt(this);
	    }

	    overwrittenProps = this._op = this._op || [];

	    if (vars !== "all") {
	      //so people can pass in a comma-delimited list of property names
	      if (_isString$1(vars)) {
	        p = {};

	        _forEachName(vars, function (name) {
	          return p[name] = 1;
	        });

	        vars = p;
	      }

	      vars = _addAliasesToVars(parsedTargets, vars);
	    }

	    i = parsedTargets.length;

	    while (i--) {
	      if (~killingTargets.indexOf(parsedTargets[i])) {
	        curLookup = propTweenLookup[i];

	        if (vars === "all") {
	          overwrittenProps[i] = vars;
	          props = curLookup;
	          curOverwriteProps = {};
	        } else {
	          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
	          props = vars;
	        }

	        for (p in props) {
	          pt = curLookup && curLookup[p];

	          if (pt) {
	            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
	              _removeLinkedListItem(this, pt, "_pt");
	            }

	            delete curLookup[p];
	          }

	          if (curOverwriteProps !== "all") {
	            curOverwriteProps[p] = 1;
	          }
	        }
	      }
	    }

	    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

	    return this;
	  };

	  Tween.to = function to(targets, vars) {
	    return new Tween(targets, vars, arguments[2]);
	  };

	  Tween.from = function from(targets, vars) {
	    return _createTweenType(1, arguments);
	  };

	  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
	    return new Tween(callback, 0, {
	      immediateRender: false,
	      lazy: false,
	      overwrite: false,
	      delay: delay,
	      onComplete: callback,
	      onReverseComplete: callback,
	      onCompleteParams: params,
	      onReverseCompleteParams: params,
	      callbackScope: scope
	    }); // we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
	  };

	  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
	    return _createTweenType(2, arguments);
	  };

	  Tween.set = function set(targets, vars) {
	    vars.duration = 0;
	    vars.repeatDelay || (vars.repeat = 0);
	    return new Tween(targets, vars);
	  };

	  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
	    return _globalTimeline.killTweensOf(targets, props, onlyActive);
	  };

	  return Tween;
	}(Animation);

	_setDefaults$1(Tween.prototype, {
	  _targets: [],
	  _lazy: 0,
	  _startAt: 0,
	  _op: 0,
	  _onInit: 0
	}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
	// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
	// 	Tween.prototype[name] = function() {
	// 		let tl = new Timeline();
	// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
	// 	}
	// });
	//for backward compatibility. Leverage the timeline calls.


	_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
	  Tween[name] = function () {
	    var tl = new Timeline(),
	        params = _slice.call(arguments, 0);

	    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
	    return tl[name].apply(tl, params);
	  };
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * PROPTWEEN
	 * --------------------------------------------------------------------------------------
	 */


	var _setterPlain = function _setterPlain(target, property, value) {
	  return target[property] = value;
	},
	    _setterFunc = function _setterFunc(target, property, value) {
	  return target[property](value);
	},
	    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
	  return target[property](data.fp, value);
	},
	    _setterAttribute = function _setterAttribute(target, property, value) {
	  return target.setAttribute(property, value);
	},
	    _getSetter = function _getSetter(target, property) {
	  return _isFunction$1(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
	},
	    _renderPlain = function _renderPlain(ratio, data) {
	  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
	},
	    _renderBoolean = function _renderBoolean(ratio, data) {
	  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
	},
	    _renderComplexString = function _renderComplexString(ratio, data) {
	  var pt = data._pt,
	      s = "";

	  if (!ratio && data.b) {
	    //b = beginning string
	    s = data.b;
	  } else if (ratio === 1 && data.e) {
	    //e = ending string
	    s = data.e;
	  } else {
	    while (pt) {
	      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

	      pt = pt._next;
	    }

	    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
	  }

	  data.set(data.t, data.p, s, data);
	},
	    _renderPropTweens = function _renderPropTweens(ratio, data) {
	  var pt = data._pt;

	  while (pt) {
	    pt.r(ratio, pt.d);
	    pt = pt._next;
	  }
	},
	    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
	  var pt = this._pt,
	      next;

	  while (pt) {
	    next = pt._next;
	    pt.p === property && pt.modifier(modifier, tween, target);
	    pt = next;
	  }
	},
	    _killPropTweensOf = function _killPropTweensOf(property) {
	  var pt = this._pt,
	      hasNonDependentRemaining,
	      next;

	  while (pt) {
	    next = pt._next;

	    if (pt.p === property && !pt.op || pt.op === property) {
	      _removeLinkedListItem(this, pt, "_pt");
	    } else if (!pt.dep) {
	      hasNonDependentRemaining = 1;
	    }

	    pt = next;
	  }

	  return !hasNonDependentRemaining;
	},
	    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
	  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
	},
	    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
	  var pt = parent._pt,
	      next,
	      pt2,
	      first,
	      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

	  while (pt) {
	    next = pt._next;
	    pt2 = first;

	    while (pt2 && pt2.pr > pt.pr) {
	      pt2 = pt2._next;
	    }

	    if (pt._prev = pt2 ? pt2._prev : last) {
	      pt._prev._next = pt;
	    } else {
	      first = pt;
	    }

	    if (pt._next = pt2) {
	      pt2._prev = pt;
	    } else {
	      last = pt;
	    }

	    pt = next;
	  }

	  parent._pt = first;
	}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


	var PropTween = /*#__PURE__*/function () {
	  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
	    this.t = target;
	    this.s = start;
	    this.c = change;
	    this.p = prop;
	    this.r = renderer || _renderPlain;
	    this.d = data || this;
	    this.set = setter || _setterPlain;
	    this.pr = priority || 0;
	    this._next = next;

	    if (next) {
	      next._prev = this;
	    }
	  }

	  var _proto4 = PropTween.prototype;

	  _proto4.modifier = function modifier(func, tween, target) {
	    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

	    this.set = _setterWithModifier;
	    this.m = func;
	    this.mt = target; //modifier target

	    this.tween = tween;
	  };

	  return PropTween;
	}(); //Initialization tasks

	_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
	  return _reservedProps[name] = 1;
	});

	_globals.TweenMax = _globals.TweenLite = Tween;
	_globals.TimelineLite = _globals.TimelineMax = Timeline;
	_globalTimeline = new Timeline({
	  sortChildren: false,
	  defaults: _defaults$1,
	  autoRemoveChildren: true,
	  id: "root",
	  smoothChildTiming: true
	});
	_config.stringFilter = _colorStringFilter;

	var _media = [],
	    _listeners$1 = {},
	    _emptyArray$1 = [],
	    _lastMediaTime = 0,
	    _contextID = 0,
	    _dispatch$1 = function _dispatch(type) {
	  return (_listeners$1[type] || _emptyArray$1).map(function (f) {
	    return f();
	  });
	},
	    _onMediaChange = function _onMediaChange() {
	  var time = Date.now(),
	      matches = [];

	  if (time - _lastMediaTime > 2) {
	    _dispatch$1("matchMediaInit");

	    _media.forEach(function (c) {
	      var queries = c.queries,
	          conditions = c.conditions,
	          match,
	          p,
	          anyMatch,
	          toggled;

	      for (p in queries) {
	        match = _win$3.matchMedia(queries[p]).matches; // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.

	        match && (anyMatch = 1);

	        if (match !== conditions[p]) {
	          conditions[p] = match;
	          toggled = 1;
	        }
	      }

	      if (toggled) {
	        c.revert();
	        anyMatch && matches.push(c);
	      }
	    });

	    _dispatch$1("matchMediaRevert");

	    matches.forEach(function (c) {
	      return c.onMatch(c);
	    });
	    _lastMediaTime = time;

	    _dispatch$1("matchMedia");
	  }
	};

	var Context = /*#__PURE__*/function () {
	  function Context(func, scope) {
	    this.selector = scope && selector(scope);
	    this.data = [];
	    this._r = []; // returned/cleanup functions

	    this.isReverted = false;
	    this.id = _contextID++; // to work around issues that frameworks like Vue cause by making things into Proxies which make it impossible to do something like _media.indexOf(this) because "this" would no longer refer to the Context instance itself - it'd refer to a Proxy! We needed a way to identify the context uniquely

	    func && this.add(func);
	  }

	  var _proto5 = Context.prototype;

	  _proto5.add = function add(name, func, scope) {
	    // possible future addition if we need the ability to add() an animation to a context and for whatever reason cannot create that animation inside of a context.add(() => {...}) function.
	    // if (name && _isFunction(name.revert)) {
	    // 	this.data.push(name);
	    // 	return (name._ctx = this);
	    // }
	    if (_isFunction$1(name)) {
	      scope = func;
	      func = name;
	      name = _isFunction$1;
	    }

	    var self = this,
	        f = function f() {
	      var prev = _context$2,
	          prevSelector = self.selector,
	          result;
	      prev && prev !== self && prev.data.push(self);
	      scope && (self.selector = selector(scope));
	      _context$2 = self;
	      result = func.apply(self, arguments);
	      _isFunction$1(result) && self._r.push(result);
	      _context$2 = prev;
	      self.selector = prevSelector;
	      self.isReverted = false;
	      return result;
	    };

	    self.last = f;
	    return name === _isFunction$1 ? f(self) : name ? self[name] = f : f;
	  };

	  _proto5.ignore = function ignore(func) {
	    var prev = _context$2;
	    _context$2 = null;
	    func(this);
	    _context$2 = prev;
	  };

	  _proto5.getTweens = function getTweens() {
	    var a = [];
	    this.data.forEach(function (e) {
	      return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
	    });
	    return a;
	  };

	  _proto5.clear = function clear() {
	    this._r.length = this.data.length = 0;
	  };

	  _proto5.kill = function kill(revert, matchMedia) {
	    var _this4 = this;

	    if (revert) {
	      var tweens = this.getTweens();
	      this.data.forEach(function (t) {
	        // Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
	        if (t.data === "isFlip") {
	          t.revert();
	          t.getChildren(true, true, false).forEach(function (tween) {
	            return tweens.splice(tweens.indexOf(tween), 1);
	          });
	        }
	      }); // save as an object so that we can cache the globalTime for each tween to optimize performance during the sort

	      tweens.map(function (t) {
	        return {
	          g: t.globalTime(0),
	          t: t
	        };
	      }).sort(function (a, b) {
	        return b.g - a.g || -1;
	      }).forEach(function (o) {
	        return o.t.revert(revert);
	      }); // note: all of the _startAt tweens should be reverted in reverse order that they were created, and they'll all have the same globalTime (-1) so the " || -1" in the sort keeps the order properly.

	      this.data.forEach(function (e) {
	        return e instanceof Timeline ? e.data !== "nested" && e.kill() : !(e instanceof Tween) && e.revert && e.revert(revert);
	      });

	      this._r.forEach(function (f) {
	        return f(revert, _this4);
	      });

	      this.isReverted = true;
	    } else {
	      this.data.forEach(function (e) {
	        return e.kill && e.kill();
	      });
	    }

	    this.clear();

	    if (matchMedia) {
	      var i = _media.length;

	      while (i--) {
	        // previously, we checked _media.indexOf(this), but some frameworks like Vue enforce Proxy objects that make it impossible to get the proper result that way, so we must use a unique ID number instead.
	        _media[i].id === this.id && _media.splice(i, 1);
	      }
	    }
	  };

	  _proto5.revert = function revert(config) {
	    this.kill(config || {});
	  };

	  return Context;
	}();

	var MatchMedia = /*#__PURE__*/function () {
	  function MatchMedia(scope) {
	    this.contexts = [];
	    this.scope = scope;
	  }

	  var _proto6 = MatchMedia.prototype;

	  _proto6.add = function add(conditions, func, scope) {
	    _isObject$1(conditions) || (conditions = {
	      matches: conditions
	    });
	    var context = new Context(0, scope || this.scope),
	        cond = context.conditions = {},
	        mq,
	        p,
	        active;
	    _context$2 && !context.selector && (context.selector = _context$2.selector); // in case a context is created inside a context. Like a gsap.matchMedia() that's inside a scoped gsap.context()

	    this.contexts.push(context);
	    func = context.add("onMatch", func);
	    context.queries = conditions;

	    for (p in conditions) {
	      if (p === "all") {
	        active = 1;
	      } else {
	        mq = _win$3.matchMedia(conditions[p]);

	        if (mq) {
	          _media.indexOf(context) < 0 && _media.push(context);
	          (cond[p] = mq.matches) && (active = 1);
	          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
	        }
	      }
	    }

	    active && func(context);
	    return this;
	  } // refresh() {
	  // 	let time = _lastMediaTime,
	  // 		media = _media;
	  // 	_lastMediaTime = -1;
	  // 	_media = this.contexts;
	  // 	_onMediaChange();
	  // 	_lastMediaTime = time;
	  // 	_media = media;
	  // }
	  ;

	  _proto6.revert = function revert(config) {
	    this.kill(config || {});
	  };

	  _proto6.kill = function kill(revert) {
	    this.contexts.forEach(function (c) {
	      return c.kill(revert, true);
	    });
	  };

	  return MatchMedia;
	}();
	/*
	 * --------------------------------------------------------------------------------------
	 * GSAP
	 * --------------------------------------------------------------------------------------
	 */


	var _gsap = {
	  registerPlugin: function registerPlugin() {
	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    args.forEach(function (config) {
	      return _createPlugin(config);
	    });
	  },
	  timeline: function timeline(vars) {
	    return new Timeline(vars);
	  },
	  getTweensOf: function getTweensOf(targets, onlyActive) {
	    return _globalTimeline.getTweensOf(targets, onlyActive);
	  },
	  getProperty: function getProperty(target, property, unit, uncache) {
	    _isString$1(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

	    var getter = _getCache(target || {}).get,
	        format = unit ? _passThrough$1 : _numericIfPossible;

	    unit === "native" && (unit = "");
	    return !target ? target : !property ? function (property, unit, uncache) {
	      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
	    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
	  },
	  quickSetter: function quickSetter(target, property, unit) {
	    target = toArray(target);

	    if (target.length > 1) {
	      var setters = target.map(function (t) {
	        return gsap$2.quickSetter(t, property, unit);
	      }),
	          l = setters.length;
	      return function (value) {
	        var i = l;

	        while (i--) {
	          setters[i](value);
	        }
	      };
	    }

	    target = target[0] || {};

	    var Plugin = _plugins[property],
	        cache = _getCache(target),
	        p = cache.harness && (cache.harness.aliases || {})[property] || property,
	        // in case it's an alias, like "rotate" for "rotation".
	    setter = Plugin ? function (value) {
	      var p = new Plugin();
	      _quickTween._pt = 0;
	      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
	      p.render(1, p);
	      _quickTween._pt && _renderPropTweens(1, _quickTween);
	    } : cache.set(target, p);

	    return Plugin ? setter : function (value) {
	      return setter(target, p, unit ? value + unit : value, cache, 1);
	    };
	  },
	  quickTo: function quickTo(target, property, vars) {
	    var _merge2;

	    var tween = gsap$2.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
	        func = function func(value, start, startIsRelative) {
	      return tween.resetTo(property, value, start, startIsRelative);
	    };

	    func.tween = tween;
	    return func;
	  },
	  isTweening: function isTweening(targets) {
	    return _globalTimeline.getTweensOf(targets, true).length > 0;
	  },
	  defaults: function defaults(value) {
	    value && value.ease && (value.ease = _parseEase(value.ease, _defaults$1.ease));
	    return _mergeDeep(_defaults$1, value || {});
	  },
	  config: function config(value) {
	    return _mergeDeep(_config, value || {});
	  },
	  registerEffect: function registerEffect(_ref3) {
	    var name = _ref3.name,
	        effect = _ref3.effect,
	        plugins = _ref3.plugins,
	        defaults = _ref3.defaults,
	        extendTimeline = _ref3.extendTimeline;
	    (plugins || "").split(",").forEach(function (pluginName) {
	      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
	    });

	    _effects[name] = function (targets, vars, tl) {
	      return effect(toArray(targets), _setDefaults$1(vars || {}, defaults), tl);
	    };

	    if (extendTimeline) {
	      Timeline.prototype[name] = function (targets, vars, position) {
	        return this.add(_effects[name](targets, _isObject$1(vars) ? vars : (position = vars) && {}, this), position);
	      };
	    }
	  },
	  registerEase: function registerEase(name, ease) {
	    _easeMap[name] = _parseEase(ease);
	  },
	  parseEase: function parseEase(ease, defaultEase) {
	    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
	  },
	  getById: function getById(id) {
	    return _globalTimeline.getById(id);
	  },
	  exportRoot: function exportRoot(vars, includeDelayedCalls) {
	    if (vars === void 0) {
	      vars = {};
	    }

	    var tl = new Timeline(vars),
	        child,
	        next;
	    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

	    _globalTimeline.remove(tl);

	    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

	    tl._time = tl._tTime = _globalTimeline._time;
	    child = _globalTimeline._first;

	    while (child) {
	      next = child._next;

	      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
	        _addToTimeline(tl, child, child._start - child._delay);
	      }

	      child = next;
	    }

	    _addToTimeline(_globalTimeline, tl, 0);

	    return tl;
	  },
	  context: function context(func, scope) {
	    return func ? new Context(func, scope) : _context$2;
	  },
	  matchMedia: function matchMedia(scope) {
	    return new MatchMedia(scope);
	  },
	  matchMediaRefresh: function matchMediaRefresh() {
	    return _media.forEach(function (c) {
	      var cond = c.conditions,
	          found,
	          p;

	      for (p in cond) {
	        if (cond[p]) {
	          cond[p] = false;
	          found = 1;
	        }
	      }

	      found && c.revert();
	    }) || _onMediaChange();
	  },
	  addEventListener: function addEventListener(type, callback) {
	    var a = _listeners$1[type] || (_listeners$1[type] = []);
	    ~a.indexOf(callback) || a.push(callback);
	  },
	  removeEventListener: function removeEventListener(type, callback) {
	    var a = _listeners$1[type],
	        i = a && a.indexOf(callback);
	    i >= 0 && a.splice(i, 1);
	  },
	  utils: {
	    wrap: wrap,
	    wrapYoyo: wrapYoyo,
	    distribute: distribute,
	    random: random,
	    snap: snap,
	    normalize: normalize,
	    getUnit: getUnit,
	    clamp: clamp,
	    splitColor: splitColor,
	    toArray: toArray,
	    selector: selector,
	    mapRange: mapRange,
	    pipe: pipe,
	    unitize: unitize,
	    interpolate: interpolate,
	    shuffle: shuffle
	  },
	  install: _install,
	  effects: _effects,
	  ticker: _ticker,
	  updateRoot: Timeline.updateRoot,
	  plugins: _plugins,
	  globalTimeline: _globalTimeline,
	  core: {
	    PropTween: PropTween,
	    globals: _addGlobal,
	    Tween: Tween,
	    Timeline: Timeline,
	    Animation: Animation,
	    getCache: _getCache,
	    _removeLinkedListItem: _removeLinkedListItem,
	    reverting: function reverting() {
	      return _reverting$1;
	    },
	    context: function context(toAdd) {
	      if (toAdd && _context$2) {
	        _context$2.data.push(toAdd);

	        toAdd._ctx = _context$2;
	      }

	      return _context$2;
	    },
	    suppressOverwrites: function suppressOverwrites(value) {
	      return _suppressOverwrites$1 = value;
	    }
	  }
	};

	_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
	  return _gsap[name] = Tween[name];
	});

	_ticker.add(Timeline.updateRoot);

	_quickTween = _gsap.to({}, {
	  duration: 0
	}); // ---- EXTRA PLUGINS --------------------------------------------------------

	var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
	  var pt = plugin._pt;

	  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
	    pt = pt._next;
	  }

	  return pt;
	},
	    _addModifiers = function _addModifiers(tween, modifiers) {
	  var targets = tween._targets,
	      p,
	      i,
	      pt;

	  for (p in modifiers) {
	    i = targets.length;

	    while (i--) {
	      pt = tween._ptLookup[i][p];

	      if (pt && (pt = pt.d)) {
	        if (pt._pt) {
	          // is a plugin
	          pt = _getPluginPropTween(pt, p);
	        }

	        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
	      }
	    }
	  }
	},
	    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
	  return {
	    name: name,
	    rawVars: 1,
	    //don't pre-process function-based values or "random()" strings.
	    init: function init(target, vars, tween) {
	      tween._onInit = function (tween) {
	        var temp, p;

	        if (_isString$1(vars)) {
	          temp = {};

	          _forEachName(vars, function (name) {
	            return temp[name] = 1;
	          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


	          vars = temp;
	        }

	        if (modifier) {
	          temp = {};

	          for (p in vars) {
	            temp[p] = modifier(vars[p]);
	          }

	          vars = temp;
	        }

	        _addModifiers(tween, vars);
	      };
	    }
	  };
	}; //register core plugins


	var gsap$2 = _gsap.registerPlugin({
	  name: "attr",
	  init: function init(target, vars, tween, index, targets) {
	    var p, pt, v;
	    this.tween = tween;

	    for (p in vars) {
	      v = target.getAttribute(p) || "";
	      pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
	      pt.op = p;
	      pt.b = v; // record the beginning value so we can revert()

	      this._props.push(p);
	    }
	  },
	  render: function render(ratio, data) {
	    var pt = data._pt;

	    while (pt) {
	      _reverting$1 ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d); // if reverting, go back to the original (pt.b)

	      pt = pt._next;
	    }
	  }
	}, {
	  name: "endArray",
	  init: function init(target, value) {
	    var i = value.length;

	    while (i--) {
	      this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
	    }
	  }
	}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

	Tween.version = Timeline.version = gsap$2.version = "3.12.1";
	_coreReady = 1;
	_windowExists$2() && _wake();
	_easeMap.Power0;
	    _easeMap.Power1;
	    _easeMap.Power2;
	    _easeMap.Power3;
	    _easeMap.Power4;
	    _easeMap.Linear;
	    _easeMap.Quad;
	    _easeMap.Cubic;
	    _easeMap.Quart;
	    _easeMap.Quint;
	    _easeMap.Strong;
	    _easeMap.Elastic;
	    _easeMap.Back;
	    _easeMap.SteppedEase;
	    _easeMap.Bounce;
	    _easeMap.Sine;
	    _easeMap.Expo;
	    _easeMap.Circ;

	/*!
	 * CSSPlugin 3.12.1
	 * https://greensock.com
	 *
	 * Copyright 2008-2023, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	var _win$2,
	    _doc$2,
	    _docElement,
	    _pluginInitted,
	    _tempDiv,
	    _recentSetterPlugin,
	    _reverting,
	    _windowExists$1 = function _windowExists() {
	  return typeof window !== "undefined";
	},
	    _transformProps = {},
	    _RAD2DEG = 180 / Math.PI,
	    _DEG2RAD = Math.PI / 180,
	    _atan2 = Math.atan2,
	    _bigNum = 1e8,
	    _capsExp$1 = /([A-Z])/g,
	    _horizontalExp = /(left|right|width|margin|padding|x)/i,
	    _complexExp = /[\s,\(]\S/,
	    _propertyAliases = {
	  autoAlpha: "opacity,visibility",
	  scale: "scaleX,scaleY",
	  alpha: "opacity"
	},
	    _renderCSSProp = function _renderCSSProp(ratio, data) {
	  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
	},
	    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
	  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
	},
	    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
	  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
	},
	    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
	_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
	  var value = data.s + data.c * ratio;
	  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
	},
	    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
	  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
	},
	    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
	  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
	},
	    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
	  return target.style[property] = value;
	},
	    _setterCSSProp = function _setterCSSProp(target, property, value) {
	  return target.style.setProperty(property, value);
	},
	    _setterTransform = function _setterTransform(target, property, value) {
	  return target._gsap[property] = value;
	},
	    _setterScale = function _setterScale(target, property, value) {
	  return target._gsap.scaleX = target._gsap.scaleY = value;
	},
	    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
	  var cache = target._gsap;
	  cache.scaleX = cache.scaleY = value;
	  cache.renderTransform(ratio, cache);
	},
	    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
	  var cache = target._gsap;
	  cache[property] = value;
	  cache.renderTransform(ratio, cache);
	},
	    _transformProp$1 = "transform",
	    _transformOriginProp = _transformProp$1 + "Origin",
	    _saveStyle = function _saveStyle(property, isNotCSS) {
	  var _this = this;

	  var target = this.target,
	      style = target.style;

	  if (property in _transformProps && style) {
	    this.tfm = this.tfm || {};

	    if (property !== "transform") {
	      property = _propertyAliases[property] || property;
	      ~property.indexOf(",") ? property.split(",").forEach(function (a) {
	        return _this.tfm[a] = _get(target, a);
	      }) : this.tfm[property] = target._gsap.x ? target._gsap[property] : _get(target, property); // note: scale would map to "scaleX,scaleY", thus we loop and apply them both.
	    } else {
	      return _propertyAliases.transform.split(",").forEach(function (p) {
	        return _saveStyle.call(_this, p, isNotCSS);
	      });
	    }

	    if (this.props.indexOf(_transformProp$1) >= 0) {
	      return;
	    }

	    if (target._gsap.svg) {
	      this.svgo = target.getAttribute("data-svg-origin");
	      this.props.push(_transformOriginProp, isNotCSS, "");
	    }

	    property = _transformProp$1;
	  }

	  (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
	},
	    _removeIndependentTransforms = function _removeIndependentTransforms(style) {
	  if (style.translate) {
	    style.removeProperty("translate");
	    style.removeProperty("scale");
	    style.removeProperty("rotate");
	  }
	},
	    _revertStyle = function _revertStyle() {
	  var props = this.props,
	      target = this.target,
	      style = target.style,
	      cache = target._gsap,
	      i,
	      p;

	  for (i = 0; i < props.length; i += 3) {
	    // stored like this: property, isNotCSS, value
	    props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp$1, "-$1").toLowerCase());
	  }

	  if (this.tfm) {
	    for (p in this.tfm) {
	      cache[p] = this.tfm[p];
	    }

	    if (cache.svg) {
	      cache.renderTransform();
	      target.setAttribute("data-svg-origin", this.svgo || "");
	    }

	    i = _reverting();

	    if ((!i || !i.isStart) && !style[_transformProp$1]) {
	      _removeIndependentTransforms(style);

	      cache.uncache = 1; // if it's a startAt that's being reverted in the _initTween() of the core, we don't need to uncache transforms. This is purely a performance optimization.
	    }
	  }
	},
	    _getStyleSaver = function _getStyleSaver(target, properties) {
	  var saver = {
	    target: target,
	    props: [],
	    revert: _revertStyle,
	    save: _saveStyle
	  };
	  target._gsap || gsap$2.core.getCache(target); // just make sure there's a _gsap cache defined because we read from it in _saveStyle() and it's more efficient to just check it here once.

	  properties && properties.split(",").forEach(function (p) {
	    return saver.save(p);
	  });
	  return saver;
	},
	    _supports3D,
	    _createElement = function _createElement(type, ns) {
	  var e = _doc$2.createElementNS ? _doc$2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$2.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

	  return e.style ? e : _doc$2.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
	},
	    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
	  var cs = getComputedStyle(target);
	  return cs[property] || cs.getPropertyValue(property.replace(_capsExp$1, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
	},
	    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
	    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
	  var e = element || _tempDiv,
	      s = e.style,
	      i = 5;

	  if (property in s && !preferPrefix) {
	    return property;
	  }

	  property = property.charAt(0).toUpperCase() + property.substr(1);

	  while (i-- && !(_prefixes[i] + property in s)) {}

	  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
	},
	    _initCore$1 = function _initCore() {
	  if (_windowExists$1() && window.document) {
	    _win$2 = window;
	    _doc$2 = _win$2.document;
	    _docElement = _doc$2.documentElement;
	    _tempDiv = _createElement("div") || {
	      style: {}
	    };
	    _createElement("div");
	    _transformProp$1 = _checkPropPrefix(_transformProp$1);
	    _transformOriginProp = _transformProp$1 + "Origin";
	    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

	    _supports3D = !!_checkPropPrefix("perspective");
	    _reverting = gsap$2.core.reverting;
	    _pluginInitted = 1;
	  }
	},
	    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
	  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
	  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
	      oldParent = this.parentNode,
	      oldSibling = this.nextSibling,
	      oldCSS = this.style.cssText,
	      bbox;

	  _docElement.appendChild(svg);

	  svg.appendChild(this);
	  this.style.display = "block";

	  if (swapIfPossible) {
	    try {
	      bbox = this.getBBox();
	      this._gsapBBox = this.getBBox; //store the original

	      this.getBBox = _getBBoxHack;
	    } catch (e) {}
	  } else if (this._gsapBBox) {
	    bbox = this._gsapBBox();
	  }

	  if (oldParent) {
	    if (oldSibling) {
	      oldParent.insertBefore(this, oldSibling);
	    } else {
	      oldParent.appendChild(this);
	    }
	  }

	  _docElement.removeChild(svg);

	  this.style.cssText = oldCSS;
	  return bbox;
	},
	    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
	  var i = attributesArray.length;

	  while (i--) {
	    if (target.hasAttribute(attributesArray[i])) {
	      return target.getAttribute(attributesArray[i]);
	    }
	  }
	},
	    _getBBox = function _getBBox(target) {
	  var bounds;

	  try {
	    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
	  } catch (error) {
	    bounds = _getBBoxHack.call(target, true);
	  }

	  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

	  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
	    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
	    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
	    width: 0,
	    height: 0
	  } : bounds;
	},
	    _isSVG = function _isSVG(e) {
	  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
	},
	    //reports if the element is an SVG on which getBBox() actually works
	_removeProperty = function _removeProperty(target, property) {
	  if (property) {
	    var style = target.style;

	    if (property in _transformProps && property !== _transformOriginProp) {
	      property = _transformProp$1;
	    }

	    if (style.removeProperty) {
	      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
	        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
	        property = "-" + property;
	      }

	      style.removeProperty(property.replace(_capsExp$1, "-$1").toLowerCase());
	    } else {
	      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
	      style.removeAttribute(property);
	    }
	  }
	},
	    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
	  var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
	  plugin._pt = pt;
	  pt.b = beginning;
	  pt.e = end;

	  plugin._props.push(property);

	  return pt;
	},
	    _nonConvertibleUnits = {
	  deg: 1,
	  rad: 1,
	  turn: 1
	},
	    _nonStandardLayouts = {
	  grid: 1,
	  flex: 1
	},
	    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
	_convertToUnit = function _convertToUnit(target, property, value, unit) {
	  var curValue = parseFloat(value) || 0,
	      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
	      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
	  style = _tempDiv.style,
	      horizontal = _horizontalExp.test(property),
	      isRootSVG = target.tagName.toLowerCase() === "svg",
	      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
	      amount = 100,
	      toPixels = unit === "px",
	      toPercent = unit === "%",
	      px,
	      parent,
	      cache,
	      isSVG;

	  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
	    return curValue;
	  }

	  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
	  isSVG = target.getCTM && _isSVG(target);

	  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
	    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
	    return _round$1(toPercent ? curValue / px * amount : curValue / 100 * px);
	  }

	  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
	  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

	  if (isSVG) {
	    parent = (target.ownerSVGElement || {}).parentNode;
	  }

	  if (!parent || parent === _doc$2 || !parent.appendChild) {
	    parent = _doc$2.body;
	  }

	  cache = parent._gsap;

	  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
	    return _round$1(curValue / cache.width * amount);
	  } else {
	    (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
	    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

	    parent.appendChild(_tempDiv);
	    px = _tempDiv[measureProperty];
	    parent.removeChild(_tempDiv);
	    style.position = "absolute";

	    if (horizontal && toPercent) {
	      cache = _getCache(parent);
	      cache.time = _ticker.time;
	      cache.width = parent[measureProperty];
	    }
	  }

	  return _round$1(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
	},
	    _get = function _get(target, property, unit, uncache) {
	  var value;
	  _pluginInitted || _initCore$1();

	  if (property in _propertyAliases && property !== "transform") {
	    property = _propertyAliases[property];

	    if (~property.indexOf(",")) {
	      property = property.split(",")[0];
	    }
	  }

	  if (_transformProps[property] && property !== "transform") {
	    value = _parseTransform(target, uncache);
	    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
	  } else {
	    value = target.style[property];

	    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
	      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
	    }
	  }

	  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
	},
	    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
	  // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
	  if (!start || start === "none") {
	    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
	    var p = _checkPropPrefix(prop, target, 1),
	        s = p && _getComputedProperty(target, p, 1);

	    if (s && s !== start) {
	      prop = p;
	      start = s;
	    } else if (prop === "borderColor") {
	      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
	    }
	  }

	  var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
	      index = 0,
	      matchIndex = 0,
	      a,
	      result,
	      startValues,
	      startNum,
	      color,
	      startValue,
	      endValue,
	      endNum,
	      chunk,
	      endUnit,
	      startUnit,
	      endValues;
	  pt.b = start;
	  pt.e = end;
	  start += ""; // ensure values are strings

	  end += "";

	  if (end === "auto") {
	    target.style[prop] = end;
	    end = _getComputedProperty(target, prop) || end;
	    target.style[prop] = start;
	  }

	  a = [start, end];

	  _colorStringFilter(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


	  start = a[0];
	  end = a[1];
	  startValues = start.match(_numWithUnitExp) || [];
	  endValues = end.match(_numWithUnitExp) || [];

	  if (endValues.length) {
	    while (result = _numWithUnitExp.exec(end)) {
	      endValue = result[0];
	      chunk = end.substring(index, result.index);

	      if (color) {
	        color = (color + 1) % 5;
	      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
	        color = 1;
	      }

	      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
	        startNum = parseFloat(startValue) || 0;
	        startUnit = startValue.substr((startNum + "").length);
	        endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
	        endNum = parseFloat(endValue);
	        endUnit = endValue.substr((endNum + "").length);
	        index = _numWithUnitExp.lastIndex - endUnit.length;

	        if (!endUnit) {
	          //if something like "perspective:300" is passed in and we must add a unit to the end
	          endUnit = endUnit || _config.units[prop] || startUnit;

	          if (index === end.length) {
	            end += endUnit;
	            pt.e += endUnit;
	          }
	        }

	        if (startUnit !== endUnit) {
	          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
	        } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


	        pt._pt = {
	          _next: pt._pt,
	          p: chunk || matchIndex === 1 ? chunk : ",",
	          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
	          s: startNum,
	          c: endNum - startNum,
	          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
	        };
	      }
	    }

	    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
	  } else {
	    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
	  }

	  _relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

	  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

	  return pt;
	},
	    _keywordToPercent = {
	  top: "0%",
	  bottom: "100%",
	  left: "0%",
	  right: "100%",
	  center: "50%"
	},
	    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
	  var split = value.split(" "),
	      x = split[0],
	      y = split[1] || "50%";

	  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
	    //the user provided them in the wrong order, so flip them
	    value = x;
	    x = y;
	    y = value;
	  }

	  split[0] = _keywordToPercent[x] || x;
	  split[1] = _keywordToPercent[y] || y;
	  return split.join(" ");
	},
	    _renderClearProps = function _renderClearProps(ratio, data) {
	  if (data.tween && data.tween._time === data.tween._dur) {
	    var target = data.t,
	        style = target.style,
	        props = data.u,
	        cache = target._gsap,
	        prop,
	        clearTransforms,
	        i;

	    if (props === "all" || props === true) {
	      style.cssText = "";
	      clearTransforms = 1;
	    } else {
	      props = props.split(",");
	      i = props.length;

	      while (--i > -1) {
	        prop = props[i];

	        if (_transformProps[prop]) {
	          clearTransforms = 1;
	          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp$1;
	        }

	        _removeProperty(target, prop);
	      }
	    }

	    if (clearTransforms) {
	      _removeProperty(target, _transformProp$1);

	      if (cache) {
	        cache.svg && target.removeAttribute("transform");

	        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


	        cache.uncache = 1;

	        _removeIndependentTransforms(style);
	      }
	    }
	  }
	},
	    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
	_specialProps = {
	  clearProps: function clearProps(plugin, target, property, endValue, tween) {
	    if (tween.data !== "isFromStart") {
	      var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
	      pt.u = endValue;
	      pt.pr = -10;
	      pt.tween = tween;

	      plugin._props.push(property);

	      return 1;
	    }
	  }
	  /* className feature (about 0.4kb gzipped).
	  , className(plugin, target, property, endValue, tween) {
	  	let _renderClassName = (ratio, data) => {
	  			data.css.render(ratio, data.css);
	  			if (!ratio || ratio === 1) {
	  				let inline = data.rmv,
	  					target = data.t,
	  					p;
	  				target.setAttribute("class", ratio ? data.e : data.b);
	  				for (p in inline) {
	  					_removeProperty(target, p);
	  				}
	  			}
	  		},
	  		_getAllStyles = (target) => {
	  			let styles = {},
	  				computed = getComputedStyle(target),
	  				p;
	  			for (p in computed) {
	  				if (isNaN(p) && p !== "cssText" && p !== "length") {
	  					styles[p] = computed[p];
	  				}
	  			}
	  			_setDefaults(styles, _parseTransform(target, 1));
	  			return styles;
	  		},
	  		startClassList = target.getAttribute("class"),
	  		style = target.style,
	  		cssText = style.cssText,
	  		cache = target._gsap,
	  		classPT = cache.classPT,
	  		inlineToRemoveAtEnd = {},
	  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
	  		changingVars = {},
	  		startVars = _getAllStyles(target),
	  		transformRelated = /(transform|perspective)/i,
	  		endVars, p;
	  	if (classPT) {
	  		classPT.r(1, classPT.d);
	  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
	  	}
	  	target.setAttribute("class", data.e);
	  	endVars = _getAllStyles(target, true);
	  	target.setAttribute("class", startClassList);
	  	for (p in endVars) {
	  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
	  			changingVars[p] = endVars[p];
	  			if (!style[p] && style[p] !== "0") {
	  				inlineToRemoveAtEnd[p] = 1;
	  			}
	  		}
	  	}
	  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
	  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
	  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
	  	}
	  	_parseTransform(target, true); //to clear the caching of transforms
	  	data.css = new gsap.plugins.css();
	  	data.css.init(target, changingVars, tween);
	  	plugin._props.push(...data.css._props);
	  	return 1;
	  }
	  */

	},

	/*
	 * --------------------------------------------------------------------------------------
	 * TRANSFORMS
	 * --------------------------------------------------------------------------------------
	 */
	_identity2DMatrix = [1, 0, 0, 1, 0, 0],
	    _rotationalProperties = {},
	    _isNullTransform = function _isNullTransform(value) {
	  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
	},
	    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
	  var matrixString = _getComputedProperty(target, _transformProp$1);

	  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round$1);
	},
	    _getMatrix = function _getMatrix(target, force2D) {
	  var cache = target._gsap || _getCache(target),
	      style = target.style,
	      matrix = _getComputedTransformMatrixAsArray(target),
	      parent,
	      nextSibling,
	      temp,
	      addedToDOM;

	  if (cache.svg && target.getAttribute("transform")) {
	    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

	    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
	    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
	  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
	    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
	    temp = style.display;
	    style.display = "block";
	    parent = target.parentNode;

	    if (!parent || !target.offsetParent) {
	      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
	      addedToDOM = 1; //flag

	      nextSibling = target.nextElementSibling;

	      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

	    }

	    matrix = _getComputedTransformMatrixAsArray(target);
	    temp ? style.display = temp : _removeProperty(target, "display");

	    if (addedToDOM) {
	      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
	    }
	  }

	  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
	},
	    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
	  var cache = target._gsap,
	      matrix = matrixArray || _getMatrix(target, true),
	      xOriginOld = cache.xOrigin || 0,
	      yOriginOld = cache.yOrigin || 0,
	      xOffsetOld = cache.xOffset || 0,
	      yOffsetOld = cache.yOffset || 0,
	      a = matrix[0],
	      b = matrix[1],
	      c = matrix[2],
	      d = matrix[3],
	      tx = matrix[4],
	      ty = matrix[5],
	      originSplit = origin.split(" "),
	      xOrigin = parseFloat(originSplit[0]) || 0,
	      yOrigin = parseFloat(originSplit[1]) || 0,
	      bounds,
	      determinant,
	      x,
	      y;

	  if (!originIsAbsolute) {
	    bounds = _getBBox(target);
	    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
	    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
	  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
	    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
	    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
	    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
	    xOrigin = x;
	    yOrigin = y;
	  }

	  if (smooth || smooth !== false && cache.smooth) {
	    tx = xOrigin - xOriginOld;
	    ty = yOrigin - yOriginOld;
	    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
	    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
	  } else {
	    cache.xOffset = cache.yOffset = 0;
	  }

	  cache.xOrigin = xOrigin;
	  cache.yOrigin = yOrigin;
	  cache.smooth = !!smooth;
	  cache.origin = origin;
	  cache.originIsAbsolute = !!originIsAbsolute;
	  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

	  if (pluginToAddPropTweensTo) {
	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
	  }

	  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
	},
	    _parseTransform = function _parseTransform(target, uncache) {
	  var cache = target._gsap || new GSCache(target);

	  if ("x" in cache && !uncache && !cache.uncache) {
	    return cache;
	  }

	  var style = target.style,
	      invertedScaleX = cache.scaleX < 0,
	      px = "px",
	      deg = "deg",
	      cs = getComputedStyle(target),
	      origin = _getComputedProperty(target, _transformOriginProp) || "0",
	      x,
	      y,
	      z,
	      scaleX,
	      scaleY,
	      rotation,
	      rotationX,
	      rotationY,
	      skewX,
	      skewY,
	      perspective,
	      xOrigin,
	      yOrigin,
	      matrix,
	      angle,
	      cos,
	      sin,
	      a,
	      b,
	      c,
	      d,
	      a12,
	      a22,
	      t1,
	      t2,
	      t3,
	      a13,
	      a23,
	      a33,
	      a42,
	      a43,
	      a32;
	  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
	  scaleX = scaleY = 1;
	  cache.svg = !!(target.getCTM && _isSVG(target));

	  if (cs.translate) {
	    // accommodate independent transforms by combining them into normal ones.
	    if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
	      style[_transformProp$1] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp$1] !== "none" ? cs[_transformProp$1] : "");
	    }

	    style.scale = style.rotate = style.translate = "none";
	  }

	  matrix = _getMatrix(target, cache.svg);

	  if (cache.svg) {
	    if (cache.uncache) {
	      // if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
	      t2 = target.getBBox();
	      origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
	      t1 = "";
	    } else {
	      t1 = !uncache && target.getAttribute("data-svg-origin"); //  Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
	    }

	    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
	  }

	  xOrigin = cache.xOrigin || 0;
	  yOrigin = cache.yOrigin || 0;

	  if (matrix !== _identity2DMatrix) {
	    a = matrix[0]; //a11

	    b = matrix[1]; //a21

	    c = matrix[2]; //a31

	    d = matrix[3]; //a41

	    x = a12 = matrix[4];
	    y = a22 = matrix[5]; //2D matrix

	    if (matrix.length === 6) {
	      scaleX = Math.sqrt(a * a + b * b);
	      scaleY = Math.sqrt(d * d + c * c);
	      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

	      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
	      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

	      if (cache.svg) {
	        x -= xOrigin - (xOrigin * a + yOrigin * c);
	        y -= yOrigin - (xOrigin * b + yOrigin * d);
	      } //3D matrix

	    } else {
	      a32 = matrix[6];
	      a42 = matrix[7];
	      a13 = matrix[8];
	      a23 = matrix[9];
	      a33 = matrix[10];
	      a43 = matrix[11];
	      x = matrix[12];
	      y = matrix[13];
	      z = matrix[14];
	      angle = _atan2(a32, a33);
	      rotationX = angle * _RAD2DEG; //rotationX

	      if (angle) {
	        cos = Math.cos(-angle);
	        sin = Math.sin(-angle);
	        t1 = a12 * cos + a13 * sin;
	        t2 = a22 * cos + a23 * sin;
	        t3 = a32 * cos + a33 * sin;
	        a13 = a12 * -sin + a13 * cos;
	        a23 = a22 * -sin + a23 * cos;
	        a33 = a32 * -sin + a33 * cos;
	        a43 = a42 * -sin + a43 * cos;
	        a12 = t1;
	        a22 = t2;
	        a32 = t3;
	      } //rotationY


	      angle = _atan2(-c, a33);
	      rotationY = angle * _RAD2DEG;

	      if (angle) {
	        cos = Math.cos(-angle);
	        sin = Math.sin(-angle);
	        t1 = a * cos - a13 * sin;
	        t2 = b * cos - a23 * sin;
	        t3 = c * cos - a33 * sin;
	        a43 = d * sin + a43 * cos;
	        a = t1;
	        b = t2;
	        c = t3;
	      } //rotationZ


	      angle = _atan2(b, a);
	      rotation = angle * _RAD2DEG;

	      if (angle) {
	        cos = Math.cos(angle);
	        sin = Math.sin(angle);
	        t1 = a * cos + b * sin;
	        t2 = a12 * cos + a22 * sin;
	        b = b * cos - a * sin;
	        a22 = a22 * cos - a12 * sin;
	        a = t1;
	        a12 = t2;
	      }

	      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
	        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
	        rotationX = rotation = 0;
	        rotationY = 180 - rotationY;
	      }

	      scaleX = _round$1(Math.sqrt(a * a + b * b + c * c));
	      scaleY = _round$1(Math.sqrt(a22 * a22 + a32 * a32));
	      angle = _atan2(a12, a22);
	      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
	      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
	    }

	    if (cache.svg) {
	      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
	      t1 = target.getAttribute("transform");
	      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp$1));
	      t1 && target.setAttribute("transform", t1);
	    }
	  }

	  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
	    if (invertedScaleX) {
	      scaleX *= -1;
	      skewX += rotation <= 0 ? 180 : -180;
	      rotation += rotation <= 0 ? 180 : -180;
	    } else {
	      scaleY *= -1;
	      skewX += skewX <= 0 ? 180 : -180;
	    }
	  }

	  uncache = uncache || cache.uncache;
	  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
	  cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
	  cache.z = z + px;
	  cache.scaleX = _round$1(scaleX);
	  cache.scaleY = _round$1(scaleY);
	  cache.rotation = _round$1(rotation) + deg;
	  cache.rotationX = _round$1(rotationX) + deg;
	  cache.rotationY = _round$1(rotationY) + deg;
	  cache.skewX = skewX + deg;
	  cache.skewY = skewY + deg;
	  cache.transformPerspective = perspective + px;

	  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
	    style[_transformOriginProp] = _firstTwoOnly(origin);
	  }

	  cache.xOffset = cache.yOffset = 0;
	  cache.force3D = _config.force3D;
	  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
	  cache.uncache = 0;
	  return cache;
	},
	    _firstTwoOnly = function _firstTwoOnly(value) {
	  return (value = value.split(" "))[0] + " " + value[1];
	},
	    //for handling transformOrigin values, stripping out the 3rd dimension
	_addPxTranslate = function _addPxTranslate(target, start, value) {
	  var unit = getUnit(start);
	  return _round$1(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
	},
	    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
	  cache.z = "0px";
	  cache.rotationY = cache.rotationX = "0deg";
	  cache.force3D = 0;

	  _renderCSSTransforms(ratio, cache);
	},
	    _zeroDeg = "0deg",
	    _zeroPx = "0px",
	    _endParenthesis = ") ",
	    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
	  var _ref = cache || this,
	      xPercent = _ref.xPercent,
	      yPercent = _ref.yPercent,
	      x = _ref.x,
	      y = _ref.y,
	      z = _ref.z,
	      rotation = _ref.rotation,
	      rotationY = _ref.rotationY,
	      rotationX = _ref.rotationX,
	      skewX = _ref.skewX,
	      skewY = _ref.skewY,
	      scaleX = _ref.scaleX,
	      scaleY = _ref.scaleY,
	      transformPerspective = _ref.transformPerspective,
	      force3D = _ref.force3D,
	      target = _ref.target,
	      zOrigin = _ref.zOrigin,
	      transforms = "",
	      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


	  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
	    var angle = parseFloat(rotationY) * _DEG2RAD,
	        a13 = Math.sin(angle),
	        a33 = Math.cos(angle),
	        cos;

	    angle = parseFloat(rotationX) * _DEG2RAD;
	    cos = Math.cos(angle);
	    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
	    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
	    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
	  }

	  if (transformPerspective !== _zeroPx) {
	    transforms += "perspective(" + transformPerspective + _endParenthesis;
	  }

	  if (xPercent || yPercent) {
	    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
	  }

	  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
	    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
	  }

	  if (rotation !== _zeroDeg) {
	    transforms += "rotate(" + rotation + _endParenthesis;
	  }

	  if (rotationY !== _zeroDeg) {
	    transforms += "rotateY(" + rotationY + _endParenthesis;
	  }

	  if (rotationX !== _zeroDeg) {
	    transforms += "rotateX(" + rotationX + _endParenthesis;
	  }

	  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
	    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
	  }

	  if (scaleX !== 1 || scaleY !== 1) {
	    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
	  }

	  target.style[_transformProp$1] = transforms || "translate(0, 0)";
	},
	    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
	  var _ref2 = cache || this,
	      xPercent = _ref2.xPercent,
	      yPercent = _ref2.yPercent,
	      x = _ref2.x,
	      y = _ref2.y,
	      rotation = _ref2.rotation,
	      skewX = _ref2.skewX,
	      skewY = _ref2.skewY,
	      scaleX = _ref2.scaleX,
	      scaleY = _ref2.scaleY,
	      target = _ref2.target,
	      xOrigin = _ref2.xOrigin,
	      yOrigin = _ref2.yOrigin,
	      xOffset = _ref2.xOffset,
	      yOffset = _ref2.yOffset,
	      forceCSS = _ref2.forceCSS,
	      tx = parseFloat(x),
	      ty = parseFloat(y),
	      a11,
	      a21,
	      a12,
	      a22,
	      temp;

	  rotation = parseFloat(rotation);
	  skewX = parseFloat(skewX);
	  skewY = parseFloat(skewY);

	  if (skewY) {
	    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
	    skewY = parseFloat(skewY);
	    skewX += skewY;
	    rotation += skewY;
	  }

	  if (rotation || skewX) {
	    rotation *= _DEG2RAD;
	    skewX *= _DEG2RAD;
	    a11 = Math.cos(rotation) * scaleX;
	    a21 = Math.sin(rotation) * scaleX;
	    a12 = Math.sin(rotation - skewX) * -scaleY;
	    a22 = Math.cos(rotation - skewX) * scaleY;

	    if (skewX) {
	      skewY *= _DEG2RAD;
	      temp = Math.tan(skewX - skewY);
	      temp = Math.sqrt(1 + temp * temp);
	      a12 *= temp;
	      a22 *= temp;

	      if (skewY) {
	        temp = Math.tan(skewY);
	        temp = Math.sqrt(1 + temp * temp);
	        a11 *= temp;
	        a21 *= temp;
	      }
	    }

	    a11 = _round$1(a11);
	    a21 = _round$1(a21);
	    a12 = _round$1(a12);
	    a22 = _round$1(a22);
	  } else {
	    a11 = scaleX;
	    a22 = scaleY;
	    a21 = a12 = 0;
	  }

	  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
	    tx = _convertToUnit(target, "x", x, "px");
	    ty = _convertToUnit(target, "y", y, "px");
	  }

	  if (xOrigin || yOrigin || xOffset || yOffset) {
	    tx = _round$1(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
	    ty = _round$1(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
	  }

	  if (xPercent || yPercent) {
	    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
	    temp = target.getBBox();
	    tx = _round$1(tx + xPercent / 100 * temp.width);
	    ty = _round$1(ty + yPercent / 100 * temp.height);
	  }

	  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
	  target.setAttribute("transform", temp);
	  forceCSS && (target.style[_transformProp$1] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the transform attribute changes!)
	},
	    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
	  var cap = 360,
	      isString = _isString$1(endValue),
	      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
	      change = endNum - startNum,
	      finalValue = startNum + change + "deg",
	      direction,
	      pt;

	  if (isString) {
	    direction = endValue.split("_")[1];

	    if (direction === "short") {
	      change %= cap;

	      if (change !== change % (cap / 2)) {
	        change += change < 0 ? cap : -cap;
	      }
	    }

	    if (direction === "cw" && change < 0) {
	      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
	    } else if (direction === "ccw" && change > 0) {
	      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
	    }
	  }

	  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
	  pt.e = finalValue;
	  pt.u = "deg";

	  plugin._props.push(property);

	  return pt;
	},
	    _assign = function _assign(target, source) {
	  // Internet Explorer doesn't have Object.assign(), so we recreate it here.
	  for (var p in source) {
	    target[p] = source[p];
	  }

	  return target;
	},
	    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
	  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
	  var startCache = _assign({}, target._gsap),
	      exclude = "perspective,force3D,transformOrigin,svgOrigin",
	      style = target.style,
	      endCache,
	      p,
	      startValue,
	      endValue,
	      startNum,
	      endNum,
	      startUnit,
	      endUnit;

	  if (startCache.svg) {
	    startValue = target.getAttribute("transform");
	    target.setAttribute("transform", "");
	    style[_transformProp$1] = transforms;
	    endCache = _parseTransform(target, 1);

	    _removeProperty(target, _transformProp$1);

	    target.setAttribute("transform", startValue);
	  } else {
	    startValue = getComputedStyle(target)[_transformProp$1];
	    style[_transformProp$1] = transforms;
	    endCache = _parseTransform(target, 1);
	    style[_transformProp$1] = startValue;
	  }

	  for (p in _transformProps) {
	    startValue = startCache[p];
	    endValue = endCache[p];

	    if (startValue !== endValue && exclude.indexOf(p) < 0) {
	      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
	      startUnit = getUnit(startValue);
	      endUnit = getUnit(endValue);
	      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
	      endNum = parseFloat(endValue);
	      plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
	      plugin._pt.u = endUnit || 0;

	      plugin._props.push(p);
	    }
	  }

	  _assign(endCache, startCache);
	}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


	_forEachName("padding,margin,Width,Radius", function (name, index) {
	  var t = "Top",
	      r = "Right",
	      b = "Bottom",
	      l = "Left",
	      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
	    return index < 2 ? name + side : "border" + side + name;
	  });

	  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
	    var a, vars;

	    if (arguments.length < 4) {
	      // getter, passed target, property, and unit (from _get())
	      a = props.map(function (prop) {
	        return _get(plugin, prop, property);
	      });
	      vars = a.join(" ");
	      return vars.split(a[0]).length === 5 ? a[0] : vars;
	    }

	    a = (endValue + "").split(" ");
	    vars = {};
	    props.forEach(function (prop, i) {
	      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
	    });
	    plugin.init(target, vars, tween);
	  };
	});

	var CSSPlugin = {
	  name: "css",
	  register: _initCore$1,
	  targetTest: function targetTest(target) {
	    return target.style && target.nodeType;
	  },
	  init: function init(target, vars, tween, index, targets) {
	    var props = this._props,
	        style = target.style,
	        startAt = tween.vars.startAt,
	        startValue,
	        endValue,
	        endNum,
	        startNum,
	        type,
	        specialProp,
	        p,
	        startUnit,
	        endUnit,
	        relative,
	        isTransformRelated,
	        transformPropTween,
	        cache,
	        smooth,
	        hasPriority,
	        inlineProps;
	    _pluginInitted || _initCore$1(); // we may call init() multiple times on the same plugin instance, like when adding special properties, so make sure we don't overwrite the revert data or inlineProps

	    this.styles = this.styles || _getStyleSaver(target);
	    inlineProps = this.styles.props;
	    this.tween = tween;

	    for (p in vars) {
	      if (p === "autoRound") {
	        continue;
	      }

	      endValue = vars[p];

	      if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
	        // plugins
	        continue;
	      }

	      type = typeof endValue;
	      specialProp = _specialProps[p];

	      if (type === "function") {
	        endValue = endValue.call(tween, index, target, targets);
	        type = typeof endValue;
	      }

	      if (type === "string" && ~endValue.indexOf("random(")) {
	        endValue = _replaceRandom(endValue);
	      }

	      if (specialProp) {
	        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
	      } else if (p.substr(0, 2) === "--") {
	        //CSS variable
	        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
	        endValue += "";
	        _colorExp.lastIndex = 0;

	        if (!_colorExp.test(startValue)) {
	          // colors don't have units
	          startUnit = getUnit(startValue);
	          endUnit = getUnit(endValue);
	        }

	        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
	        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
	        props.push(p);
	        inlineProps.push(p, 0, style[p]);
	      } else if (type !== "undefined") {
	        if (startAt && p in startAt) {
	          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
	          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
	          _isString$1(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
	          getUnit(startValue + "") || (startValue += _config.units[p] || getUnit(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

	          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
	        } else {
	          startValue = _get(target, p);
	        }

	        startNum = parseFloat(startValue);
	        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
	        relative && (endValue = endValue.substr(2));
	        endNum = parseFloat(endValue);

	        if (p in _propertyAliases) {
	          if (p === "autoAlpha") {
	            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
	            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
	              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
	              startNum = 0;
	            }

	            inlineProps.push("visibility", 0, style.visibility);

	            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
	          }

	          if (p !== "scale" && p !== "transform") {
	            p = _propertyAliases[p];
	            ~p.indexOf(",") && (p = p.split(",")[0]);
	          }
	        }

	        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

	        if (isTransformRelated) {
	          this.styles.save(p);

	          if (!transformPropTween) {
	            cache = target._gsap;
	            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

	            smooth = vars.smoothOrigin !== false && cache.smooth;
	            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp$1, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

	            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
	          }

	          if (p === "scale") {
	            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
	            this._pt.u = 0;
	            props.push("scaleY", p);
	            p += "X";
	          } else if (p === "transformOrigin") {
	            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
	            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

	            if (cache.svg) {
	              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
	            } else {
	              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

	              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

	              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
	            }

	            continue;
	          } else if (p === "svgOrigin") {
	            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

	            continue;
	          } else if (p in _rotationalProperties) {
	            _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);

	            continue;
	          } else if (p === "smoothOrigin") {
	            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

	            continue;
	          } else if (p === "force3D") {
	            cache[p] = endValue;
	            continue;
	          } else if (p === "transform") {
	            _addRawTransformPTs(this, endValue, target);

	            continue;
	          }
	        } else if (!(p in style)) {
	          p = _checkPropPrefix(p) || p;
	        }

	        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
	          startUnit = (startValue + "").substr((startNum + "").length);
	          endNum || (endNum = 0); // protect against NaN

	          endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
	          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
	          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
	          this._pt.u = endUnit || 0;

	          if (startUnit !== endUnit && endUnit !== "%") {
	            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
	            this._pt.b = startValue;
	            this._pt.r = _renderCSSPropWithBeginning;
	          }
	        } else if (!(p in style)) {
	          if (p in target) {
	            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
	            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
	          } else if (p !== "parseTransform") {
	            _missingPlugin(p, endValue);

	            continue;
	          }
	        } else {
	          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
	        }

	        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
	        props.push(p);
	      }
	    }

	    hasPriority && _sortPropTweensByPriority(this);
	  },
	  render: function render(ratio, data) {
	    if (data.tween._time || !_reverting()) {
	      var pt = data._pt;

	      while (pt) {
	        pt.r(ratio, pt.d);
	        pt = pt._next;
	      }
	    } else {
	      data.styles.revert();
	    }
	  },
	  get: _get,
	  aliases: _propertyAliases,
	  getSetter: function getSetter(target, property, plugin) {
	    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
	    var p = _propertyAliases[property];
	    p && p.indexOf(",") < 0 && (property = p);
	    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
	  },
	  core: {
	    _removeProperty: _removeProperty,
	    _getMatrix: _getMatrix
	  }
	};
	gsap$2.utils.checkPrefix = _checkPropPrefix;
	gsap$2.core.getStyleSaver = _getStyleSaver;

	(function (positionAndScale, rotation, others, aliases) {
	  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
	    _transformProps[name] = 1;
	  });

	  _forEachName(rotation, function (name) {
	    _config.units[name] = "deg";
	    _rotationalProperties[name] = 1;
	  });

	  _propertyAliases[all[13]] = positionAndScale + "," + rotation;

	  _forEachName(aliases, function (name) {
	    var split = name.split(":");
	    _propertyAliases[split[1]] = all[split[0]];
	  });
	})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

	_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
	  _config.units[name] = "px";
	});

	gsap$2.registerPlugin(CSSPlugin);

	var gsapWithCSS = gsap$2.registerPlugin(CSSPlugin) || gsap$2;
	    // to protect from tree shaking
	gsapWithCSS.core.Tween;

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/*!
	 * Observer 3.12.1
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2023, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	/* eslint-disable */
	var gsap$1,
	    _coreInitted$1,
	    _win$1,
	    _doc$1,
	    _docEl$1,
	    _body$1,
	    _isTouch,
	    _pointerType,
	    ScrollTrigger$1,
	    _root$1,
	    _normalizer$1,
	    _eventTypes,
	    _context$1,
	    _getGSAP$1 = function _getGSAP() {
	  return gsap$1 || typeof window !== "undefined" && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1;
	},
	    _startup$1 = 1,
	    _observers = [],
	    _scrollers = [],
	    _proxies = [],
	    _getTime$1 = Date.now,
	    _bridge = function _bridge(name, value) {
	  return value;
	},
	    _integrate = function _integrate() {
	  var core = ScrollTrigger$1.core,
	      data = core.bridge || {},
	      scrollers = core._scrollers,
	      proxies = core._proxies;
	  scrollers.push.apply(scrollers, _scrollers);
	  proxies.push.apply(proxies, _proxies);
	  _scrollers = scrollers;
	  _proxies = proxies;

	  _bridge = function _bridge(name, value) {
	    return data[name](value);
	  };
	},
	    _getProxyProp = function _getProxyProp(element, property) {
	  return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
	},
	    _isViewport$1 = function _isViewport(el) {
	  return !!~_root$1.indexOf(el);
	},
	    _addListener$1 = function _addListener(element, type, func, nonPassive, capture) {
	  return element.addEventListener(type, func, {
	    passive: !nonPassive,
	    capture: !!capture
	  });
	},
	    _removeListener$1 = function _removeListener(element, type, func, capture) {
	  return element.removeEventListener(type, func, !!capture);
	},
	    _scrollLeft = "scrollLeft",
	    _scrollTop = "scrollTop",
	    _onScroll$1 = function _onScroll() {
	  return _normalizer$1 && _normalizer$1.isPressed || _scrollers.cache++;
	},
	    _scrollCacheFunc = function _scrollCacheFunc(f, doNotCache) {
	  var cachingFunc = function cachingFunc(value) {
	    // since reading the scrollTop/scrollLeft/pageOffsetY/pageOffsetX can trigger a layout, this function allows us to cache the value so it only gets read fresh after a "scroll" event fires (or while we're refreshing because that can lengthen the page and alter the scroll position). when "soft" is true, that means don't actually set the scroll, but cache the new value instead (useful in ScrollSmoother)
	    if (value || value === 0) {
	      _startup$1 && (_win$1.history.scrollRestoration = "manual"); // otherwise the new position will get overwritten by the browser onload.

	      var isNormalizing = _normalizer$1 && _normalizer$1.isPressed;
	      value = cachingFunc.v = Math.round(value) || (_normalizer$1 && _normalizer$1.iOS ? 1 : 0); //TODO: iOS Bug: if you allow it to go to 0, Safari can start to report super strange (wildly inaccurate) touch positions!

	      f(value);
	      cachingFunc.cacheID = _scrollers.cache;
	      isNormalizing && _bridge("ss", value); // set scroll (notify ScrollTrigger so it can dispatch a "scrollStart" event if necessary
	    } else if (doNotCache || _scrollers.cache !== cachingFunc.cacheID || _bridge("ref")) {
	      cachingFunc.cacheID = _scrollers.cache;
	      cachingFunc.v = f();
	    }

	    return cachingFunc.v + cachingFunc.offset;
	  };

	  cachingFunc.offset = 0;
	  return f && cachingFunc;
	},
	    _horizontal = {
	  s: _scrollLeft,
	  p: "left",
	  p2: "Left",
	  os: "right",
	  os2: "Right",
	  d: "width",
	  d2: "Width",
	  a: "x",
	  sc: _scrollCacheFunc(function (value) {
	    return arguments.length ? _win$1.scrollTo(value, _vertical.sc()) : _win$1.pageXOffset || _doc$1[_scrollLeft] || _docEl$1[_scrollLeft] || _body$1[_scrollLeft] || 0;
	  })
	},
	    _vertical = {
	  s: _scrollTop,
	  p: "top",
	  p2: "Top",
	  os: "bottom",
	  os2: "Bottom",
	  d: "height",
	  d2: "Height",
	  a: "y",
	  op: _horizontal,
	  sc: _scrollCacheFunc(function (value) {
	    return arguments.length ? _win$1.scrollTo(_horizontal.sc(), value) : _win$1.pageYOffset || _doc$1[_scrollTop] || _docEl$1[_scrollTop] || _body$1[_scrollTop] || 0;
	  })
	},
	    _getTarget = function _getTarget(t, self) {
	  return (self && self._ctx && self._ctx.selector || gsap$1.utils.toArray)(t)[0] || (typeof t === "string" && gsap$1.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
	},
	    _getScrollFunc = function _getScrollFunc(element, _ref) {
	  var s = _ref.s,
	      sc = _ref.sc;
	  // we store the scroller functions in an alternating sequenced Array like [element, verticalScrollFunc, horizontalScrollFunc, ...] so that we can minimize memory, maximize performance, and we also record the last position as a ".rec" property in order to revert to that after refreshing to ensure things don't shift around.
	  _isViewport$1(element) && (element = _doc$1.scrollingElement || _docEl$1);

	  var i = _scrollers.indexOf(element),
	      offset = sc === _vertical.sc ? 1 : 2;

	  !~i && (i = _scrollers.push(element) - 1);
	  _scrollers[i + offset] || element.addEventListener("scroll", _onScroll$1); // clear the cache when a scroll occurs

	  var prev = _scrollers[i + offset],
	      func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport$1(element) ? sc : _scrollCacheFunc(function (value) {
	    return arguments.length ? element[s] = value : element[s];
	  })));
	  func.target = element;
	  prev || (func.smooth = gsap$1.getProperty(element, "scrollBehavior") === "smooth"); // only set it the first time (don't reset every time a scrollFunc is requested because perhaps it happens during a refresh() when it's disabled in ScrollTrigger.

	  return func;
	},
	    _getVelocityProp = function _getVelocityProp(value, minTimeRefresh, useDelta) {
	  var v1 = value,
	      v2 = value,
	      t1 = _getTime$1(),
	      t2 = t1,
	      min = minTimeRefresh || 50,
	      dropToZeroTime = Math.max(500, min * 3),
	      update = function update(value, force) {
	    var t = _getTime$1();

	    if (force || t - t1 > min) {
	      v2 = v1;
	      v1 = value;
	      t2 = t1;
	      t1 = t;
	    } else if (useDelta) {
	      v1 += value;
	    } else {
	      // not totally necessary, but makes it a bit more accurate by adjusting the v1 value according to the new slope. This way we're not just ignoring the incoming data. Removing for now because it doesn't seem to make much practical difference and it's probably not worth the kb.
	      v1 = v2 + (value - v2) / (t - t2) * (t1 - t2);
	    }
	  },
	      reset = function reset() {
	    v2 = v1 = useDelta ? 0 : v1;
	    t2 = t1 = 0;
	  },
	      getVelocity = function getVelocity(latestValue) {
	    var tOld = t2,
	        vOld = v2,
	        t = _getTime$1();

	    (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
	    return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1000;
	  };

	  return {
	    update: update,
	    reset: reset,
	    getVelocity: getVelocity
	  };
	},
	    _getEvent = function _getEvent(e, preventDefault) {
	  preventDefault && !e._gsapAllow && e.preventDefault();
	  return e.changedTouches ? e.changedTouches[0] : e;
	},
	    _getAbsoluteMax = function _getAbsoluteMax(a) {
	  var max = Math.max.apply(Math, a),
	      min = Math.min.apply(Math, a);
	  return Math.abs(max) >= Math.abs(min) ? max : min;
	},
	    _setScrollTrigger = function _setScrollTrigger() {
	  ScrollTrigger$1 = gsap$1.core.globals().ScrollTrigger;
	  ScrollTrigger$1 && ScrollTrigger$1.core && _integrate();
	},
	    _initCore = function _initCore(core) {
	  gsap$1 = core || _getGSAP$1();

	  if (gsap$1 && typeof document !== "undefined" && document.body) {
	    _win$1 = window;
	    _doc$1 = document;
	    _docEl$1 = _doc$1.documentElement;
	    _body$1 = _doc$1.body;
	    _root$1 = [_win$1, _doc$1, _docEl$1, _body$1];
	    gsap$1.utils.clamp;

	    _context$1 = gsap$1.core.context || function () {};

	    _pointerType = "onpointerenter" in _body$1 ? "pointer" : "mouse"; // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

	    _isTouch = Observer.isTouch = _win$1.matchMedia && _win$1.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win$1 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
	    _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl$1 ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl$1) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
	    setTimeout(function () {
	      return _startup$1 = 0;
	    }, 500);

	    _setScrollTrigger();

	    _coreInitted$1 = 1;
	  }

	  return _coreInitted$1;
	};

	_horizontal.op = _vertical;
	_scrollers.cache = 0;
	var Observer = /*#__PURE__*/function () {
	  function Observer(vars) {
	    this.init(vars);
	  }

	  var _proto = Observer.prototype;

	  _proto.init = function init(vars) {
	    _coreInitted$1 || _initCore(gsap$1) || console.warn("Please gsap.registerPlugin(Observer)");
	    ScrollTrigger$1 || _setScrollTrigger();
	    var tolerance = vars.tolerance,
	        dragMinimum = vars.dragMinimum,
	        type = vars.type,
	        target = vars.target,
	        lineHeight = vars.lineHeight,
	        debounce = vars.debounce,
	        preventDefault = vars.preventDefault,
	        onStop = vars.onStop,
	        onStopDelay = vars.onStopDelay,
	        ignore = vars.ignore,
	        wheelSpeed = vars.wheelSpeed,
	        event = vars.event,
	        onDragStart = vars.onDragStart,
	        onDragEnd = vars.onDragEnd,
	        onDrag = vars.onDrag,
	        onPress = vars.onPress,
	        onRelease = vars.onRelease,
	        onRight = vars.onRight,
	        onLeft = vars.onLeft,
	        onUp = vars.onUp,
	        onDown = vars.onDown,
	        onChangeX = vars.onChangeX,
	        onChangeY = vars.onChangeY,
	        onChange = vars.onChange,
	        onToggleX = vars.onToggleX,
	        onToggleY = vars.onToggleY,
	        onHover = vars.onHover,
	        onHoverEnd = vars.onHoverEnd,
	        onMove = vars.onMove,
	        ignoreCheck = vars.ignoreCheck,
	        isNormalizer = vars.isNormalizer,
	        onGestureStart = vars.onGestureStart,
	        onGestureEnd = vars.onGestureEnd,
	        onWheel = vars.onWheel,
	        onEnable = vars.onEnable,
	        onDisable = vars.onDisable,
	        onClick = vars.onClick,
	        scrollSpeed = vars.scrollSpeed,
	        capture = vars.capture,
	        allowClicks = vars.allowClicks,
	        lockAxis = vars.lockAxis,
	        onLockAxis = vars.onLockAxis;
	    this.target = target = _getTarget(target) || _docEl$1;
	    this.vars = vars;
	    ignore && (ignore = gsap$1.utils.toArray(ignore));
	    tolerance = tolerance || 1e-9;
	    dragMinimum = dragMinimum || 0;
	    wheelSpeed = wheelSpeed || 1;
	    scrollSpeed = scrollSpeed || 1;
	    type = type || "wheel,touch,pointer";
	    debounce = debounce !== false;
	    lineHeight || (lineHeight = parseFloat(_win$1.getComputedStyle(_body$1).lineHeight) || 22); // note: browser may report "normal", so default to 22.

	    var id,
	        onStopDelayedCall,
	        dragged,
	        moved,
	        wheeled,
	        locked,
	        axis,
	        self = this,
	        prevDeltaX = 0,
	        prevDeltaY = 0,
	        scrollFuncX = _getScrollFunc(target, _horizontal),
	        scrollFuncY = _getScrollFunc(target, _vertical),
	        scrollX = scrollFuncX(),
	        scrollY = scrollFuncY(),
	        limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown",
	        // for devices that accommodate mouse events and touch events, we need to distinguish.
	    isViewport = _isViewport$1(target),
	        ownerDoc = target.ownerDocument || _doc$1,
	        deltaX = [0, 0, 0],
	        // wheel, scroll, pointer/touch
	    deltaY = [0, 0, 0],
	        onClickTime = 0,
	        clickCapture = function clickCapture() {
	      return onClickTime = _getTime$1();
	    },
	        _ignoreCheck = function _ignoreCheck(e, isPointerOrTouch) {
	      return (self.event = e) && ignore && ~ignore.indexOf(e.target) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
	    },
	        onStopFunc = function onStopFunc() {
	      self._vx.reset();

	      self._vy.reset();

	      onStopDelayedCall.pause();
	      onStop && onStop(self);
	    },
	        update = function update() {
	      var dx = self.deltaX = _getAbsoluteMax(deltaX),
	          dy = self.deltaY = _getAbsoluteMax(deltaY),
	          changedX = Math.abs(dx) >= tolerance,
	          changedY = Math.abs(dy) >= tolerance;

	      onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY); // in ScrollTrigger.normalizeScroll(), we need to know if it was touch/pointer so we need access to the deltaX/deltaY Arrays before we clear them out.

	      if (changedX) {
	        onRight && self.deltaX > 0 && onRight(self);
	        onLeft && self.deltaX < 0 && onLeft(self);
	        onChangeX && onChangeX(self);
	        onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
	        prevDeltaX = self.deltaX;
	        deltaX[0] = deltaX[1] = deltaX[2] = 0;
	      }

	      if (changedY) {
	        onDown && self.deltaY > 0 && onDown(self);
	        onUp && self.deltaY < 0 && onUp(self);
	        onChangeY && onChangeY(self);
	        onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
	        prevDeltaY = self.deltaY;
	        deltaY[0] = deltaY[1] = deltaY[2] = 0;
	      }

	      if (moved || dragged) {
	        onMove && onMove(self);

	        if (dragged) {
	          onDrag(self);
	          dragged = false;
	        }

	        moved = false;
	      }

	      locked && !(locked = false) && onLockAxis && onLockAxis(self);

	      if (wheeled) {
	        onWheel(self);
	        wheeled = false;
	      }

	      id = 0;
	    },
	        onDelta = function onDelta(x, y, index) {
	      deltaX[index] += x;
	      deltaY[index] += y;

	      self._vx.update(x);

	      self._vy.update(y);

	      debounce ? id || (id = requestAnimationFrame(update)) : update();
	    },
	        onTouchOrPointerDelta = function onTouchOrPointerDelta(x, y) {
	      if (lockAxis && !axis) {
	        self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
	        locked = true;
	      }

	      if (axis !== "y") {
	        deltaX[2] += x;

	        self._vx.update(x, true); // update the velocity as frequently as possible instead of in the debounced function so that very quick touch-scrolls (flicks) feel natural. If it's the mouse/touch/pointer, force it so that we get snappy/accurate momentum scroll.

	      }

	      if (axis !== "x") {
	        deltaY[2] += y;

	        self._vy.update(y, true);
	      }

	      debounce ? id || (id = requestAnimationFrame(update)) : update();
	    },
	        _onDrag = function _onDrag(e) {
	      if (_ignoreCheck(e, 1)) {
	        return;
	      }

	      e = _getEvent(e, preventDefault);
	      var x = e.clientX,
	          y = e.clientY,
	          dx = x - self.x,
	          dy = y - self.y,
	          isDragging = self.isDragging;
	      self.x = x;
	      self.y = y;

	      if (isDragging || Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum) {
	        onDrag && (dragged = true);
	        isDragging || (self.isDragging = true);
	        onTouchOrPointerDelta(dx, dy);
	        isDragging || onDragStart && onDragStart(self);
	      }
	    },
	        _onPress = self.onPress = function (e) {
	      if (_ignoreCheck(e, 1) || e && e.button) {
	        return;
	      }

	      self.axis = axis = null;
	      onStopDelayedCall.pause();
	      self.isPressed = true;
	      e = _getEvent(e); // note: may need to preventDefault(?) Won't side-scroll on iOS Safari if we do, though.

	      prevDeltaX = prevDeltaY = 0;
	      self.startX = self.x = e.clientX;
	      self.startY = self.y = e.clientY;

	      self._vx.reset(); // otherwise the t2 may be stale if the user touches and flicks super fast and releases in less than 2 requestAnimationFrame ticks, causing velocity to be 0.


	      self._vy.reset();

	      _addListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, preventDefault, true);

	      self.deltaX = self.deltaY = 0;
	      onPress && onPress(self);
	    },
	        _onRelease = self.onRelease = function (e) {
	      if (_ignoreCheck(e, 1)) {
	        return;
	      }

	      _removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);

	      var isTrackingDrag = !isNaN(self.y - self.startY),
	          wasDragging = self.isDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3),
	          // some touch devices need some wiggle room in terms of sensing clicks - the finger may move a few pixels.
	      eventData = _getEvent(e);

	      if (!wasDragging && isTrackingDrag) {
	        self._vx.reset();

	        self._vy.reset();

	        if (preventDefault && allowClicks) {
	          gsap$1.delayedCall(0.08, function () {
	            // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
	            if (_getTime$1() - onClickTime > 300 && !e.defaultPrevented) {
	              if (e.target.click) {
	                //some browsers (like mobile Safari) don't properly trigger the click event
	                e.target.click();
	              } else if (ownerDoc.createEvent) {
	                var syntheticEvent = ownerDoc.createEvent("MouseEvents");
	                syntheticEvent.initMouseEvent("click", true, true, _win$1, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
	                e.target.dispatchEvent(syntheticEvent);
	              }
	            }
	          });
	        }
	      }

	      self.isDragging = self.isGesturing = self.isPressed = false;
	      onStop && !isNormalizer && onStopDelayedCall.restart(true);
	      onDragEnd && wasDragging && onDragEnd(self);
	      onRelease && onRelease(self, wasDragging);
	    },
	        _onGestureStart = function _onGestureStart(e) {
	      return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
	    },
	        _onGestureEnd = function _onGestureEnd() {
	      return (self.isGesturing = false) || onGestureEnd(self);
	    },
	        onScroll = function onScroll(e) {
	      if (_ignoreCheck(e)) {
	        return;
	      }

	      var x = scrollFuncX(),
	          y = scrollFuncY();
	      onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
	      scrollX = x;
	      scrollY = y;
	      onStop && onStopDelayedCall.restart(true);
	    },
	        _onWheel = function _onWheel(e) {
	      if (_ignoreCheck(e)) {
	        return;
	      }

	      e = _getEvent(e, preventDefault);
	      onWheel && (wheeled = true);
	      var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win$1.innerHeight : 1) * wheelSpeed;
	      onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
	      onStop && !isNormalizer && onStopDelayedCall.restart(true);
	    },
	        _onMove = function _onMove(e) {
	      if (_ignoreCheck(e)) {
	        return;
	      }

	      var x = e.clientX,
	          y = e.clientY,
	          dx = x - self.x,
	          dy = y - self.y;
	      self.x = x;
	      self.y = y;
	      moved = true;
	      (dx || dy) && onTouchOrPointerDelta(dx, dy);
	    },
	        _onHover = function _onHover(e) {
	      self.event = e;
	      onHover(self);
	    },
	        _onHoverEnd = function _onHoverEnd(e) {
	      self.event = e;
	      onHoverEnd(self);
	    },
	        _onClick = function _onClick(e) {
	      return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
	    };

	    onStopDelayedCall = self._dc = gsap$1.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
	    self.deltaX = self.deltaY = 0;
	    self._vx = _getVelocityProp(0, 50, true);
	    self._vy = _getVelocityProp(0, 50, true);
	    self.scrollX = scrollFuncX;
	    self.scrollY = scrollFuncY;
	    self.isDragging = self.isGesturing = self.isPressed = false;

	    _context$1(this);

	    self.enable = function (e) {
	      if (!self.isEnabled) {
	        _addListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);

	        type.indexOf("scroll") >= 0 && _addListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, preventDefault, capture);
	        type.indexOf("wheel") >= 0 && _addListener$1(target, "wheel", _onWheel, preventDefault, capture);

	        if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
	          _addListener$1(target, _eventTypes[0], _onPress, preventDefault, capture);

	          _addListener$1(ownerDoc, _eventTypes[2], _onRelease);

	          _addListener$1(ownerDoc, _eventTypes[3], _onRelease);

	          allowClicks && _addListener$1(target, "click", clickCapture, false, true);
	          onClick && _addListener$1(target, "click", _onClick);
	          onGestureStart && _addListener$1(ownerDoc, "gesturestart", _onGestureStart);
	          onGestureEnd && _addListener$1(ownerDoc, "gestureend", _onGestureEnd);
	          onHover && _addListener$1(target, _pointerType + "enter", _onHover);
	          onHoverEnd && _addListener$1(target, _pointerType + "leave", _onHoverEnd);
	          onMove && _addListener$1(target, _pointerType + "move", _onMove);
	        }

	        self.isEnabled = true;
	        e && e.type && _onPress(e);
	        onEnable && onEnable(self);
	      }

	      return self;
	    };

	    self.disable = function () {
	      if (self.isEnabled) {
	        // only remove the _onScroll listener if there aren't any others that rely on the functionality.
	        _observers.filter(function (o) {
	          return o !== self && _isViewport$1(o.target);
	        }).length || _removeListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);

	        if (self.isPressed) {
	          self._vx.reset();

	          self._vy.reset();

	          _removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
	        }

	        _removeListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, capture);

	        _removeListener$1(target, "wheel", _onWheel, capture);

	        _removeListener$1(target, _eventTypes[0], _onPress, capture);

	        _removeListener$1(ownerDoc, _eventTypes[2], _onRelease);

	        _removeListener$1(ownerDoc, _eventTypes[3], _onRelease);

	        _removeListener$1(target, "click", clickCapture, true);

	        _removeListener$1(target, "click", _onClick);

	        _removeListener$1(ownerDoc, "gesturestart", _onGestureStart);

	        _removeListener$1(ownerDoc, "gestureend", _onGestureEnd);

	        _removeListener$1(target, _pointerType + "enter", _onHover);

	        _removeListener$1(target, _pointerType + "leave", _onHoverEnd);

	        _removeListener$1(target, _pointerType + "move", _onMove);

	        self.isEnabled = self.isPressed = self.isDragging = false;
	        onDisable && onDisable(self);
	      }
	    };

	    self.kill = self.revert = function () {
	      self.disable();

	      var i = _observers.indexOf(self);

	      i >= 0 && _observers.splice(i, 1);
	      _normalizer$1 === self && (_normalizer$1 = 0);
	    };

	    _observers.push(self);

	    isNormalizer && _isViewport$1(target) && (_normalizer$1 = self);
	    self.enable(event);
	  };

	  _createClass(Observer, [{
	    key: "velocityX",
	    get: function get() {
	      return this._vx.getVelocity();
	    }
	  }, {
	    key: "velocityY",
	    get: function get() {
	      return this._vy.getVelocity();
	    }
	  }]);

	  return Observer;
	}();
	Observer.version = "3.12.1";

	Observer.create = function (vars) {
	  return new Observer(vars);
	};

	Observer.register = _initCore;

	Observer.getAll = function () {
	  return _observers.slice();
	};

	Observer.getById = function (id) {
	  return _observers.filter(function (o) {
	    return o.vars.id === id;
	  })[0];
	};

	_getGSAP$1() && gsap$1.registerPlugin(Observer);

	/*!
	 * ScrollTrigger 3.12.1
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2023, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	var gsap,
	    _coreInitted,
	    _win,
	    _doc,
	    _docEl,
	    _body,
	    _root,
	    _resizeDelay,
	    _toArray,
	    _clamp,
	    _time2,
	    _syncInterval,
	    _refreshing,
	    _pointerIsDown,
	    _transformProp,
	    _i,
	    _prevWidth,
	    _prevHeight,
	    _autoRefresh,
	    _sort,
	    _suppressOverwrites,
	    _ignoreResize,
	    _normalizer,
	    _ignoreMobileResize,
	    _baseScreenHeight,
	    _baseScreenWidth,
	    _fixIOSBug,
	    _context,
	    _scrollRestoration,
	    _limitCallbacks,
	    // if true, we'll only trigger callbacks if the active state toggles, so if you scroll immediately past both the start and end positions of a ScrollTrigger (thus inactive to inactive), neither its onEnter nor onLeave will be called. This is useful during startup.
	_startup = 1,
	    _getTime = Date.now,
	    _time1 = _getTime(),
	    _lastScrollTime = 0,
	    _enabled = 0,
	    _parseClamp = function _parseClamp(value, type, self) {
	  var clamp = _isString(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
	  self["_" + type + "Clamp"] = clamp;
	  return clamp ? value.substr(6, value.length - 7) : value;
	},
	    _keepClamp = function _keepClamp(value, clamp) {
	  return clamp && (!_isString(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
	},
	    _rafBugFix = function _rafBugFix() {
	  return _enabled && requestAnimationFrame(_rafBugFix);
	},
	    // in some browsers (like Firefox), screen repaints weren't consistent unless we had SOMETHING queued up in requestAnimationFrame()! So this just creates a super simple loop to keep it alive and smooth out repaints.
	_pointerDownHandler = function _pointerDownHandler() {
	  return _pointerIsDown = 1;
	},
	    _pointerUpHandler = function _pointerUpHandler() {
	  return _pointerIsDown = 0;
	},
	    _passThrough = function _passThrough(v) {
	  return v;
	},
	    _round = function _round(value) {
	  return Math.round(value * 100000) / 100000 || 0;
	},
	    _windowExists = function _windowExists() {
	  return typeof window !== "undefined";
	},
	    _getGSAP = function _getGSAP() {
	  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
	},
	    _isViewport = function _isViewport(e) {
	  return !!~_root.indexOf(e);
	},
	    _getBoundsFunc = function _getBoundsFunc(element) {
	  return _getProxyProp(element, "getBoundingClientRect") || (_isViewport(element) ? function () {
	    _winOffsets.width = _win.innerWidth;
	    _winOffsets.height = _win.innerHeight;
	    return _winOffsets;
	  } : function () {
	    return _getBounds(element);
	  });
	},
	    _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref) {
	  var d = _ref.d,
	      d2 = _ref.d2,
	      a = _ref.a;
	  return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function () {
	    return a()[d];
	  } : function () {
	    return (isViewport ? _win["inner" + d2] : scroller["client" + d2]) || 0;
	  };
	},
	    _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
	  return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function () {
	    return _winOffsets;
	  };
	},
	    _maxScroll = function _maxScroll(element, _ref2) {
	  var s = _ref2.s,
	      d2 = _ref2.d2,
	      d = _ref2.d,
	      a = _ref2.a;
	  return Math.max(0, (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport(element) ? (_docEl[s] || _body[s]) - (_win["inner" + d2] || _docEl["client" + d2] || _body["client" + d2]) : element[s] - element["offset" + d2]);
	},
	    _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
	  for (var i = 0; i < _autoRefresh.length; i += 3) {
	    (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
	  }
	},
	    _isString = function _isString(value) {
	  return typeof value === "string";
	},
	    _isFunction = function _isFunction(value) {
	  return typeof value === "function";
	},
	    _isNumber = function _isNumber(value) {
	  return typeof value === "number";
	},
	    _isObject = function _isObject(value) {
	  return typeof value === "object";
	},
	    _endAnimation = function _endAnimation(animation, reversed, pause) {
	  return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
	},
	    _callback = function _callback(self, func) {
	  if (self.enabled) {
	    var result = func(self);
	    result && result.totalTime && (self.callbackAnimation = result);
	  }
	},
	    _abs = Math.abs,
	    _left = "left",
	    _top = "top",
	    _right = "right",
	    _bottom = "bottom",
	    _width = "width",
	    _height = "height",
	    _Right = "Right",
	    _Left = "Left",
	    _Top = "Top",
	    _Bottom = "Bottom",
	    _padding = "padding",
	    _margin = "margin",
	    _Width = "Width",
	    _Height = "Height",
	    _px = "px",
	    _getComputedStyle = function _getComputedStyle(element) {
	  return _win.getComputedStyle(element);
	},
	    _makePositionable = function _makePositionable(element) {
	  // if the element already has position: absolute or fixed, leave that, otherwise make it position: relative
	  var position = _getComputedStyle(element).position;

	  element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
	},
	    _setDefaults = function _setDefaults(obj, defaults) {
	  for (var p in defaults) {
	    p in obj || (obj[p] = defaults[p]);
	  }

	  return obj;
	},
	    _getBounds = function _getBounds(element, withoutTransforms) {
	  var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap.to(element, {
	    x: 0,
	    y: 0,
	    xPercent: 0,
	    yPercent: 0,
	    rotation: 0,
	    rotationX: 0,
	    rotationY: 0,
	    scale: 1,
	    skewX: 0,
	    skewY: 0
	  }).progress(1),
	      bounds = element.getBoundingClientRect();
	  tween && tween.progress(0).kill();
	  return bounds;
	},
	    _getSize = function _getSize(element, _ref3) {
	  var d2 = _ref3.d2;
	  return element["offset" + d2] || element["client" + d2] || 0;
	},
	    _getLabelRatioArray = function _getLabelRatioArray(timeline) {
	  var a = [],
	      labels = timeline.labels,
	      duration = timeline.duration(),
	      p;

	  for (p in labels) {
	    a.push(labels[p] / duration);
	  }

	  return a;
	},
	    _getClosestLabel = function _getClosestLabel(animation) {
	  return function (value) {
	    return gsap.utils.snap(_getLabelRatioArray(animation), value);
	  };
	},
	    _snapDirectional = function _snapDirectional(snapIncrementOrArray) {
	  var snap = gsap.utils.snap(snapIncrementOrArray),
	      a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function (a, b) {
	    return a - b;
	  });
	  return a ? function (value, direction, threshold) {
	    if (threshold === void 0) {
	      threshold = 1e-3;
	    }

	    var i;

	    if (!direction) {
	      return snap(value);
	    }

	    if (direction > 0) {
	      value -= threshold; // to avoid rounding errors. If we're too strict, it might snap forward, then immediately again, and again.

	      for (i = 0; i < a.length; i++) {
	        if (a[i] >= value) {
	          return a[i];
	        }
	      }

	      return a[i - 1];
	    } else {
	      i = a.length;
	      value += threshold;

	      while (i--) {
	        if (a[i] <= value) {
	          return a[i];
	        }
	      }
	    }

	    return a[0];
	  } : function (value, direction, threshold) {
	    if (threshold === void 0) {
	      threshold = 1e-3;
	    }

	    var snapped = snap(value);
	    return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
	  };
	},
	    _getLabelAtDirection = function _getLabelAtDirection(timeline) {
	  return function (value, st) {
	    return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
	  };
	},
	    _multiListener = function _multiListener(func, element, types, callback) {
	  return types.split(",").forEach(function (type) {
	    return func(element, type, callback);
	  });
	},
	    _addListener = function _addListener(element, type, func, nonPassive, capture) {
	  return element.addEventListener(type, func, {
	    passive: !nonPassive,
	    capture: !!capture
	  });
	},
	    _removeListener = function _removeListener(element, type, func, capture) {
	  return element.removeEventListener(type, func, !!capture);
	},
	    _wheelListener = function _wheelListener(func, el, scrollFunc) {
	  scrollFunc = scrollFunc && scrollFunc.wheelHandler;

	  if (scrollFunc) {
	    func(el, "wheel", scrollFunc);
	    func(el, "touchmove", scrollFunc);
	  }
	},
	    _markerDefaults = {
	  startColor: "green",
	  endColor: "red",
	  indent: 0,
	  fontSize: "16px",
	  fontWeight: "normal"
	},
	    _defaults = {
	  toggleActions: "play",
	  anticipatePin: 0
	},
	    _keywords = {
	  top: 0,
	  left: 0,
	  center: 0.5,
	  bottom: 1,
	  right: 1
	},
	    _offsetToPx = function _offsetToPx(value, size) {
	  if (_isString(value)) {
	    var eqIndex = value.indexOf("="),
	        relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;

	    if (~eqIndex) {
	      value.indexOf("%") > eqIndex && (relative *= size / 100);
	      value = value.substr(0, eqIndex - 1);
	    }

	    value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
	  }

	  return value;
	},
	    _createMarker = function _createMarker(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
	  var startColor = _ref4.startColor,
	      endColor = _ref4.endColor,
	      fontSize = _ref4.fontSize,
	      indent = _ref4.indent,
	      fontWeight = _ref4.fontWeight;

	  var e = _doc.createElement("div"),
	      useFixedPosition = _isViewport(container) || _getProxyProp(container, "pinType") === "fixed",
	      isScroller = type.indexOf("scroller") !== -1,
	      parent = useFixedPosition ? _body : container,
	      isStart = type.indexOf("start") !== -1,
	      color = isStart ? startColor : endColor,
	      css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";

	  css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
	  (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
	  matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
	  e._isStart = isStart;
	  e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
	  e.style.cssText = css;
	  e.innerText = name || name === 0 ? type + "-" + name : type;
	  parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
	  e._offset = e["offset" + direction.op.d2];

	  _positionMarker(e, 0, direction, isStart);

	  return e;
	},
	    _positionMarker = function _positionMarker(marker, start, direction, flipped) {
	  var vars = {
	    display: "block"
	  },
	      side = direction[flipped ? "os2" : "p2"],
	      oppositeSide = direction[flipped ? "p2" : "os2"];
	  marker._isFlipped = flipped;
	  vars[direction.a + "Percent"] = flipped ? -100 : 0;
	  vars[direction.a] = flipped ? "1px" : 0;
	  vars["border" + side + _Width] = 1;
	  vars["border" + oppositeSide + _Width] = 0;
	  vars[direction.p] = start + "px";
	  gsap.set(marker, vars);
	},
	    _triggers = [],
	    _ids = {},
	    _rafID,
	    _sync = function _sync() {
	  return _getTime() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
	},
	    _onScroll = function _onScroll() {
	  // previously, we tried to optimize performance by batching/deferring to the next requestAnimationFrame(), but discovered that Safari has a few bugs that make this unworkable (especially on iOS). See https://codepen.io/GreenSock/pen/16c435b12ef09c38125204818e7b45fc?editors=0010 and https://codepen.io/GreenSock/pen/JjOxYpQ/3dd65ccec5a60f1d862c355d84d14562?editors=0010 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503?editors=0010
	  if (!_normalizer || !_normalizer.isPressed || _normalizer.startX > _body.clientWidth) {
	    // if the user is dragging the scrollbar, allow it.
	    _scrollers.cache++;

	    if (_normalizer) {
	      _rafID || (_rafID = requestAnimationFrame(_updateAll));
	    } else {
	      _updateAll(); // Safari in particular (on desktop) NEEDS the immediate update rather than waiting for a requestAnimationFrame() whereas iOS seems to benefit from waiting for the requestAnimationFrame() tick, at least when normalizing. See https://codepen.io/GreenSock/pen/qBYozqO?editors=0110

	    }

	    _lastScrollTime || _dispatch("scrollStart");
	    _lastScrollTime = _getTime();
	  }
	},
	    _setBaseDimensions = function _setBaseDimensions() {
	  _baseScreenWidth = _win.innerWidth;
	  _baseScreenHeight = _win.innerHeight;
	},
	    _onResize = function _onResize() {
	  _scrollers.cache++;
	  !_refreshing && !_ignoreResize && !_doc.fullscreenElement && !_doc.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win.innerWidth || Math.abs(_win.innerHeight - _baseScreenHeight) > _win.innerHeight * 0.25) && _resizeDelay.restart(true);
	},
	    // ignore resizes triggered by refresh()
	_listeners = {},
	    _emptyArray = [],
	    _softRefresh = function _softRefresh() {
	  return _removeListener(ScrollTrigger, "scrollEnd", _softRefresh) || _refreshAll(true);
	},
	    _dispatch = function _dispatch(type) {
	  return _listeners[type] && _listeners[type].map(function (f) {
	    return f();
	  }) || _emptyArray;
	},
	    _savedStyles = [],
	    // when ScrollTrigger.saveStyles() is called, the inline styles are recorded in this Array in a sequential format like [element, cssText, gsCache, media]. This keeps it very memory-efficient and fast to iterate through.
	_revertRecorded = function _revertRecorded(media) {
	  for (var i = 0; i < _savedStyles.length; i += 5) {
	    if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
	      _savedStyles[i].style.cssText = _savedStyles[i + 1];
	      _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
	      _savedStyles[i + 3].uncache = 1;
	    }
	  }
	},
	    _revertAll = function _revertAll(kill, media) {
	  var trigger;

	  for (_i = 0; _i < _triggers.length; _i++) {
	    trigger = _triggers[_i];

	    if (trigger && (!media || trigger._ctx === media)) {
	      if (kill) {
	        trigger.kill(1);
	      } else {
	        trigger.revert(true, true);
	      }
	    }
	  }

	  media && _revertRecorded(media);
	  media || _dispatch("revert");
	},
	    _clearScrollMemory = function _clearScrollMemory(scrollRestoration, force) {
	  // zero-out all the recorded scroll positions. Don't use _triggers because if, for example, .matchMedia() is used to create some ScrollTriggers and then the user resizes and it removes ALL ScrollTriggers, and then go back to a size where there are ScrollTriggers, it would have kept the position(s) saved from the initial state.
	  _scrollers.cache++;
	  (force || !_refreshingAll) && _scrollers.forEach(function (obj) {
	    return _isFunction(obj) && obj.cacheID++ && (obj.rec = 0);
	  });
	  _isString(scrollRestoration) && (_win.history.scrollRestoration = _scrollRestoration = scrollRestoration);
	},
	    _refreshingAll,
	    _refreshID = 0,
	    _queueRefreshID,
	    _queueRefreshAll = function _queueRefreshAll() {
	  // we don't want to call _refreshAll() every time we create a new ScrollTrigger (for performance reasons) - it's better to batch them. Some frameworks dynamically load content and we can't rely on the window's "load" or "DOMContentLoaded" events to trigger it.
	  if (_queueRefreshID !== _refreshID) {
	    var id = _queueRefreshID = _refreshID;
	    requestAnimationFrame(function () {
	      return id === _refreshID && _refreshAll(true);
	    });
	  }
	},
	    _refreshAll = function _refreshAll(force, skipRevert) {
	  if (_lastScrollTime && !force) {
	    _addListener(ScrollTrigger, "scrollEnd", _softRefresh);

	    return;
	  }

	  _refreshingAll = ScrollTrigger.isRefreshing = true;

	  _scrollers.forEach(function (obj) {
	    return _isFunction(obj) && ++obj.cacheID && (obj.rec = obj());
	  }); // force the clearing of the cache because some browsers take a little while to dispatch the "scroll" event and the user may have changed the scroll position and then called ScrollTrigger.refresh() right away


	  var refreshInits = _dispatch("refreshInit");

	  _sort && ScrollTrigger.sort();
	  skipRevert || _revertAll();

	  _scrollers.forEach(function (obj) {
	    if (_isFunction(obj)) {
	      obj.smooth && (obj.target.style.scrollBehavior = "auto"); // smooth scrolling interferes

	      obj(0);
	    }
	  });

	  _triggers.slice(0).forEach(function (t) {
	    return t.refresh();
	  }); // don't loop with _i because during a refresh() someone could call ScrollTrigger.update() which would iterate through _i resulting in a skip.


	  _triggers.forEach(function (t, i) {
	    // nested pins (pinnedContainer) with pinSpacing may expand the container, so we must accommodate that here.
	    if (t._subPinOffset && t.pin) {
	      var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
	          original = t.pin[prop];
	      t.revert(true, 1);
	      t.adjustPinSpacing(t.pin[prop] - original);
	      t.refresh();
	    }
	  });

	  _triggers.forEach(function (t) {
	    // the scroller's max scroll position may change after all the ScrollTriggers refreshed (like pinning could push it down), so we need to loop back and correct any with end: "max". Same for anything with a clamped end
	    var max = _maxScroll(t.scroller, t._dir);

	    (t.vars.end === "max" || t._endClamp && t.end > max) && t.setPositions(t.start, Math.max(t.start + 1, max), true);
	  });

	  refreshInits.forEach(function (result) {
	    return result && result.render && result.render(-1);
	  }); // if the onRefreshInit() returns an animation (typically a gsap.set()), revert it. This makes it easy to put things in a certain spot before refreshing for measurement purposes, and then put things back.

	  _scrollers.forEach(function (obj) {
	    if (_isFunction(obj)) {
	      obj.smooth && requestAnimationFrame(function () {
	        return obj.target.style.scrollBehavior = "smooth";
	      });
	      obj.rec && obj(obj.rec);
	    }
	  });

	  _clearScrollMemory(_scrollRestoration, 1);

	  _resizeDelay.pause();

	  _refreshID++;
	  _refreshingAll = 2;

	  _updateAll(2);

	  _triggers.forEach(function (t) {
	    return _isFunction(t.vars.onRefresh) && t.vars.onRefresh(t);
	  });

	  _refreshingAll = ScrollTrigger.isRefreshing = false;

	  _dispatch("refresh");
	},
	    _lastScroll = 0,
	    _direction = 1,
	    _primary,
	    _updateAll = function _updateAll(force) {
	  if (!_refreshingAll || force === 2) {
	    ScrollTrigger.isUpdating = true;
	    _primary && _primary.update(0); // ScrollSmoother uses refreshPriority -9999 to become the primary that gets updated before all others because it affects the scroll position.

	    var l = _triggers.length,
	        time = _getTime(),
	        recordVelocity = time - _time1 >= 50,
	        scroll = l && _triggers[0].scroll();

	    _direction = _lastScroll > scroll ? -1 : 1;
	    _refreshingAll || (_lastScroll = scroll);

	    if (recordVelocity) {
	      if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
	        _lastScrollTime = 0;

	        _dispatch("scrollEnd");
	      }

	      _time2 = _time1;
	      _time1 = time;
	    }

	    if (_direction < 0) {
	      _i = l;

	      while (_i-- > 0) {
	        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
	      }

	      _direction = 1;
	    } else {
	      for (_i = 0; _i < l; _i++) {
	        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
	      }
	    }

	    ScrollTrigger.isUpdating = false;
	  }

	  _rafID = 0;
	},
	    _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
	    _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]),
	    _swapPinOut = function _swapPinOut(pin, spacer, state) {
	  _setState(state);

	  var cache = pin._gsap;

	  if (cache.spacerIsNative) {
	    _setState(cache.spacerState);
	  } else if (pin._gsap.swappedIn) {
	    var parent = spacer.parentNode;

	    if (parent) {
	      parent.insertBefore(pin, spacer);
	      parent.removeChild(spacer);
	    }
	  }

	  pin._gsap.swappedIn = false;
	},
	    _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
	  if (!pin._gsap.swappedIn) {
	    var i = _propNamesToCopy.length,
	        spacerStyle = spacer.style,
	        pinStyle = pin.style,
	        p;

	    while (i--) {
	      p = _propNamesToCopy[i];
	      spacerStyle[p] = cs[p];
	    }

	    spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
	    cs.display === "inline" && (spacerStyle.display = "inline-block");
	    pinStyle[_bottom] = pinStyle[_right] = "auto";
	    spacerStyle.flexBasis = cs.flexBasis || "auto";
	    spacerStyle.overflow = "visible";
	    spacerStyle.boxSizing = "border-box";
	    spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
	    spacerStyle[_height] = _getSize(pin, _vertical) + _px;
	    spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";

	    _setState(spacerState);

	    pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
	    pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
	    pinStyle[_padding] = cs[_padding];

	    if (pin.parentNode !== spacer) {
	      pin.parentNode.insertBefore(spacer, pin);
	      spacer.appendChild(pin);
	    }

	    pin._gsap.swappedIn = true;
	  }
	},
	    _capsExp = /([A-Z])/g,
	    _setState = function _setState(state) {
	  if (state) {
	    var style = state.t.style,
	        l = state.length,
	        i = 0,
	        p,
	        value;
	    (state.t._gsap || gsap.core.getCache(state.t)).uncache = 1; // otherwise transforms may be off

	    for (; i < l; i += 2) {
	      value = state[i + 1];
	      p = state[i];

	      if (value) {
	        style[p] = value;
	      } else if (style[p]) {
	        style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
	      }
	    }
	  }
	},
	    _getState = function _getState(element) {
	  // returns an Array with alternating values like [property, value, property, value] and a "t" property pointing to the target (element). Makes it fast and cheap.
	  var l = _stateProps.length,
	      style = element.style,
	      state = [],
	      i = 0;

	  for (; i < l; i++) {
	    state.push(_stateProps[i], style[_stateProps[i]]);
	  }

	  state.t = element;
	  return state;
	},
	    _copyState = function _copyState(state, override, omitOffsets) {
	  var result = [],
	      l = state.length,
	      i = omitOffsets ? 8 : 0,
	      // skip top, left, right, bottom if omitOffsets is true
	  p;

	  for (; i < l; i += 2) {
	    p = state[i];
	    result.push(p, p in override ? override[p] : state[i + 1]);
	  }

	  result.t = state.t;
	  return result;
	},
	    _winOffsets = {
	  left: 0,
	  top: 0
	},
	    // // potential future feature (?) Allow users to calculate where a trigger hits (scroll position) like getScrollPosition("#id", "top bottom")
	// _getScrollPosition = (trigger, position, {scroller, containerAnimation, horizontal}) => {
	// 	scroller = _getTarget(scroller || _win);
	// 	let direction = horizontal ? _horizontal : _vertical,
	// 		isViewport = _isViewport(scroller);
	// 	_getSizeFunc(scroller, isViewport, direction);
	// 	return _parsePosition(position, _getTarget(trigger), _getSizeFunc(scroller, isViewport, direction)(), direction, _getScrollFunc(scroller, direction)(), 0, 0, 0, _getOffsetsFunc(scroller, isViewport)(), isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, 0, containerAnimation ? containerAnimation.duration() : _maxScroll(scroller), containerAnimation);
	// },
	_parsePosition = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
	  _isFunction(value) && (value = value(self));

	  if (_isString(value) && value.substr(0, 3) === "max") {
	    value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
	  }

	  var time = containerAnimation ? containerAnimation.time() : 0,
	      p1,
	      p2,
	      element;
	  containerAnimation && containerAnimation.seek(0);
	  isNaN(value) || (value = +value); // convert a string number like "45" to an actual number

	  if (!_isNumber(value)) {
	    _isFunction(trigger) && (trigger = trigger(self));
	    var offsets = (value || "0").split(" "),
	        bounds,
	        localOffset,
	        globalOffset,
	        display;
	    element = _getTarget(trigger, self) || _body;
	    bounds = _getBounds(element) || {};

	    if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
	      // if display is "none", it won't report getBoundingClientRect() properly
	      display = element.style.display;
	      element.style.display = "block";
	      bounds = _getBounds(element);
	      display ? element.style.display = display : element.style.removeProperty("display");
	    }

	    localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
	    globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
	    value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
	    markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
	    scrollerSize -= scrollerSize - globalOffset; // adjust for the marker
	  } else {
	    containerAnimation && (value = gsap.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
	    markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
	  }

	  if (clampZeroProp) {
	    self[clampZeroProp] = value || -0.001;
	    value < 0 && (value = 0);
	  }

	  if (marker) {
	    var position = value + scrollerSize,
	        isStart = marker._isStart;
	    p1 = "scroll" + direction.d2;

	    _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body[p1], _docEl[p1]) : marker.parentNode[p1]) <= position + 1);

	    if (useFixedPosition) {
	      scrollerBounds = _getBounds(markerScroller);
	      useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
	    }
	  }

	  if (containerAnimation && element) {
	    p1 = _getBounds(element);
	    containerAnimation.seek(scrollerMax);
	    p2 = _getBounds(element);
	    containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
	    value = value / containerAnimation._caScrollDist * scrollerMax;
	  }

	  containerAnimation && containerAnimation.seek(time);
	  return containerAnimation ? value : Math.round(value);
	},
	    _prefixExp = /(webkit|moz|length|cssText|inset)/i,
	    _reparent = function _reparent(element, parent, top, left) {
	  if (element.parentNode !== parent) {
	    var style = element.style,
	        p,
	        cs;

	    if (parent === _body) {
	      element._stOrig = style.cssText; // record original inline styles so we can revert them later

	      cs = _getComputedStyle(element);

	      for (p in cs) {
	        // must copy all relevant styles to ensure that nothing changes visually when we reparent to the <body>. Skip the vendor prefixed ones.
	        if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
	          style[p] = cs[p];
	        }
	      }

	      style.top = top;
	      style.left = left;
	    } else {
	      style.cssText = element._stOrig;
	    }

	    gsap.core.getCache(element).uncache = 1;
	    parent.appendChild(element);
	  }
	},
	    _interruptionTracker = function _interruptionTracker(getValueFunc, initialValue, onInterrupt) {
	  var last1 = initialValue,
	      last2 = last1;
	  return function (value) {
	    var current = Math.round(getValueFunc()); // round because in some [very uncommon] Windows environments, scroll can get reported with decimals even though it was set without.

	    if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
	      // if the user scrolls, kill the tween. iOS Safari intermittently misreports the scroll position, it may be the most recently-set one or the one before that! When Safari is zoomed (CMD-+), it often misreports as 1 pixel off too! So if we set the scroll position to 125, for example, it'll actually report it as 124.
	      value = current;
	      onInterrupt && onInterrupt();
	    }

	    last2 = last1;
	    last1 = value;
	    return value;
	  };
	},
	    _shiftMarker = function _shiftMarker(marker, direction, value) {
	  var vars = {};
	  vars[direction.p] = "+=" + value;
	  gsap.set(marker, vars);
	},
	    // _mergeAnimations = animations => {
	// 	let tl = gsap.timeline({smoothChildTiming: true}).startTime(Math.min(...animations.map(a => a.globalTime(0))));
	// 	animations.forEach(a => {let time = a.totalTime(); tl.add(a); a.totalTime(time); });
	// 	tl.smoothChildTiming = false;
	// 	return tl;
	// },
	// returns a function that can be used to tween the scroll position in the direction provided, and when doing so it'll add a .tween property to the FUNCTION itself, and remove it when the tween completes or gets killed. This gives us a way to have multiple ScrollTriggers use a central function for any given scroller and see if there's a scroll tween running (which would affect if/how things get updated)
	_getTweenCreator = function _getTweenCreator(scroller, direction) {
	  var getScroll = _getScrollFunc(scroller, direction),
	      prop = "_scroll" + direction.p2,
	      // add a tweenable property to the scroller that's a getter/setter function, like _scrollTop or _scrollLeft. This way, if someone does gsap.killTweensOf(scroller) it'll kill the scroll tween.
	  getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
	    var tween = getTween.tween,
	        onComplete = vars.onComplete,
	        modifiers = {};
	    initialValue = initialValue || getScroll();

	    var checkForInterruption = _interruptionTracker(getScroll, initialValue, function () {
	      tween.kill();
	      getTween.tween = 0;
	    });

	    change2 = change1 && change2 || 0; // if change1 is 0, we set that to the difference and ignore change2. Otherwise, there would be a compound effect.

	    change1 = change1 || scrollTo - initialValue;
	    tween && tween.kill();
	    vars[prop] = scrollTo;
	    vars.modifiers = modifiers;

	    modifiers[prop] = function () {
	      return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
	    };

	    vars.onUpdate = function () {
	      _scrollers.cache++;

	      _updateAll();
	    };

	    vars.onComplete = function () {
	      getTween.tween = 0;
	      onComplete && onComplete.call(tween);
	    };

	    tween = getTween.tween = gsap.to(scroller, vars);
	    return tween;
	  };

	  scroller[prop] = getScroll;

	  getScroll.wheelHandler = function () {
	    return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
	  };

	  _addListener(scroller, "wheel", getScroll.wheelHandler); // Windows machines handle mousewheel scrolling in chunks (like "3 lines per scroll") meaning the typical strategy for cancelling the scroll isn't as sensitive. It's much more likely to match one of the previous 2 scroll event positions. So we kill any snapping as soon as there's a wheel event.


	  ScrollTrigger.isTouch && _addListener(scroller, "touchmove", getScroll.wheelHandler);
	  return getTween;
	};

	var ScrollTrigger = /*#__PURE__*/function () {
	  function ScrollTrigger(vars, animation) {
	    _coreInitted || ScrollTrigger.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");

	    _context(this);

	    this.init(vars, animation);
	  }

	  var _proto = ScrollTrigger.prototype;

	  _proto.init = function init(vars, animation) {
	    this.progress = this.start = 0;
	    this.vars && this.kill(true, true); // in case it's being initted again

	    if (!_enabled) {
	      this.update = this.refresh = this.kill = _passThrough;
	      return;
	    }

	    vars = _setDefaults(_isString(vars) || _isNumber(vars) || vars.nodeType ? {
	      trigger: vars
	    } : vars, _defaults);

	    var _vars = vars,
	        onUpdate = _vars.onUpdate,
	        toggleClass = _vars.toggleClass,
	        id = _vars.id,
	        onToggle = _vars.onToggle,
	        onRefresh = _vars.onRefresh,
	        scrub = _vars.scrub,
	        trigger = _vars.trigger,
	        pin = _vars.pin,
	        pinSpacing = _vars.pinSpacing,
	        invalidateOnRefresh = _vars.invalidateOnRefresh,
	        anticipatePin = _vars.anticipatePin,
	        onScrubComplete = _vars.onScrubComplete,
	        onSnapComplete = _vars.onSnapComplete,
	        once = _vars.once,
	        snap = _vars.snap,
	        pinReparent = _vars.pinReparent,
	        pinSpacer = _vars.pinSpacer,
	        containerAnimation = _vars.containerAnimation,
	        fastScrollEnd = _vars.fastScrollEnd,
	        preventOverlaps = _vars.preventOverlaps,
	        direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical,
	        isToggle = !scrub && scrub !== 0,
	        scroller = _getTarget(vars.scroller || _win),
	        scrollerCache = gsap.core.getCache(scroller),
	        isViewport = _isViewport(scroller),
	        useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed",
	        callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack],
	        toggleActions = isToggle && vars.toggleActions.split(" "),
	        markers = "markers" in vars ? vars.markers : _defaults.markers,
	        borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0,
	        self = this,
	        onRefreshInit = vars.onRefreshInit && function () {
	      return vars.onRefreshInit(self);
	    },
	        getScrollerSize = _getSizeFunc(scroller, isViewport, direction),
	        getScrollerOffsets = _getOffsetsFunc(scroller, isViewport),
	        lastSnap = 0,
	        lastRefresh = 0,
	        prevProgress = 0,
	        scrollFunc = _getScrollFunc(scroller, direction),
	        tweenTo,
	        pinCache,
	        snapFunc,
	        scroll1,
	        scroll2,
	        start,
	        end,
	        markerStart,
	        markerEnd,
	        markerStartTrigger,
	        markerEndTrigger,
	        markerVars,
	        executingOnRefresh,
	        change,
	        pinOriginalState,
	        pinActiveState,
	        pinState,
	        spacer,
	        offset,
	        pinGetter,
	        pinSetter,
	        pinStart,
	        pinChange,
	        spacingStart,
	        spacerState,
	        markerStartSetter,
	        pinMoves,
	        markerEndSetter,
	        cs,
	        snap1,
	        snap2,
	        scrubTween,
	        scrubSmooth,
	        snapDurClamp,
	        snapDelayedCall,
	        prevScroll,
	        prevAnimProgress,
	        caMarkerSetter,
	        customRevertReturn; // for the sake of efficiency, _startClamp/_endClamp serve like a truthy value indicating that clamping was enabled on the start/end, and ALSO store the actual pre-clamped numeric value. We tap into that in ScrollSmoother for speed effects. So for example, if start="clamp(top bottom)" results in a start of -100 naturally, it would get clamped to 0 but -100 would be stored in _startClamp.


	    self._startClamp = self._endClamp = false;
	    self._dir = direction;
	    anticipatePin *= 45;
	    self.scroller = scroller;
	    self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
	    scroll1 = scrollFunc();
	    self.vars = vars;
	    animation = animation || vars.animation;

	    if ("refreshPriority" in vars) {
	      _sort = 1;
	      vars.refreshPriority === -9999 && (_primary = self); // used by ScrollSmoother
	    }

	    scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
	      top: _getTweenCreator(scroller, _vertical),
	      left: _getTweenCreator(scroller, _horizontal)
	    };
	    self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];

	    self.scrubDuration = function (value) {
	      scrubSmooth = _isNumber(value) && value;

	      if (!scrubSmooth) {
	        scrubTween && scrubTween.progress(1).kill();
	        scrubTween = 0;
	      } else {
	        scrubTween ? scrubTween.duration(value) : scrubTween = gsap.to(animation, {
	          ease: "expo",
	          totalProgress: "+=0",
	          duration: scrubSmooth,
	          paused: true,
	          onComplete: function onComplete() {
	            return onScrubComplete && onScrubComplete(self);
	          }
	        });
	      }
	    };

	    if (animation) {
	      animation.vars.lazy = false;
	      animation._initted && !self.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true); // special case: if this ScrollTrigger gets re-initted, a from() tween with a stagger could get initted initially and then reverted on the re-init which means it'll need to get rendered again here to properly display things. Otherwise, See https://greensock.com/forums/topic/36777-scrollsmoother-splittext-nextjs/ and https://codepen.io/GreenSock/pen/eYPyPpd?editors=0010

	      self.animation = animation.pause();
	      animation.scrollTrigger = self;
	      self.scrubDuration(scrub);
	      snap1 = 0;
	      id || (id = animation.vars.id);
	    }

	    if (snap) {
	      // TODO: potential idea: use legitimate CSS scroll snapping by pushing invisible elements into the DOM that serve as snap positions, and toggle the document.scrollingElement.style.scrollSnapType onToggle. See https://codepen.io/GreenSock/pen/JjLrgWM for a quick proof of concept.
	      if (!_isObject(snap) || snap.push) {
	        snap = {
	          snapTo: snap
	        };
	      }

	      "scrollBehavior" in _body.style && gsap.set(isViewport ? [_body, _docEl] : scroller, {
	        scrollBehavior: "auto"
	      }); // smooth scrolling doesn't work with snap.

	      _scrollers.forEach(function (o) {
	        return _isFunction(o) && o.target === (isViewport ? _doc.scrollingElement || _docEl : scroller) && (o.smooth = false);
	      }); // note: set smooth to false on both the vertical and horizontal scroll getters/setters


	      snapFunc = _isFunction(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getClosestLabel(animation) : snap.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap.directional !== false ? function (value, st) {
	        return _snapDirectional(snap.snapTo)(value, _getTime() - lastRefresh < 500 ? 0 : st.direction);
	      } : gsap.utils.snap(snap.snapTo);
	      snapDurClamp = snap.duration || {
	        min: 0.1,
	        max: 2
	      };
	      snapDurClamp = _isObject(snapDurClamp) ? _clamp(snapDurClamp.min, snapDurClamp.max) : _clamp(snapDurClamp, snapDurClamp);
	      snapDelayedCall = gsap.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function () {
	        var scroll = scrollFunc(),
	            refreshedRecently = _getTime() - lastRefresh < 500,
	            tween = tweenTo.tween;

	        if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
	          var progress = (scroll - start) / change,
	              totalProgress = animation && !isToggle ? animation.totalProgress() : progress,
	              velocity = refreshedRecently ? 0 : (totalProgress - snap2) / (_getTime() - _time2) * 1000 || 0,
	              change1 = gsap.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185),
	              naturalEnd = progress + (snap.inertia === false ? 0 : change1),
	              endValue = _clamp(0, 1, snapFunc(naturalEnd, self)),
	              endScroll = Math.round(start + endValue * change),
	              _snap = snap,
	              onStart = _snap.onStart,
	              _onInterrupt = _snap.onInterrupt,
	              _onComplete = _snap.onComplete;

	          if (scroll <= end && scroll >= start && endScroll !== scroll) {
	            if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
	              // there's an overlapping snap! So we must figure out which one is closer and let that tween live.
	              return;
	            }

	            if (snap.inertia === false) {
	              change1 = endValue - progress;
	            }

	            tweenTo(endScroll, {
	              duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
	              ease: snap.ease || "power3",
	              data: _abs(endScroll - scroll),
	              // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
	              onInterrupt: function onInterrupt() {
	                return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
	              },
	              onComplete: function onComplete() {
	                self.update();
	                lastSnap = scrollFunc();
	                snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
	                onSnapComplete && onSnapComplete(self);
	                _onComplete && _onComplete(self);
	              }
	            }, scroll, change1 * change, endScroll - scroll - change1 * change);
	            onStart && onStart(self, tweenTo.tween);
	          }
	        } else if (self.isActive && lastSnap !== scroll) {
	          snapDelayedCall.restart(true);
	        }
	      }).pause();
	    }

	    id && (_ids[id] = self);
	    trigger = self.trigger = _getTarget(trigger || pin !== true && pin); // if a trigger has some kind of scroll-related effect applied that could contaminate the "y" or "x" position (like a ScrollSmoother effect), we needed a way to temporarily revert it, so we use the stRevert property of the gsCache. It can return another function that we'll call at the end so it can return to its normal state.

	    customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
	    customRevertReturn && (customRevertReturn = customRevertReturn(self));
	    pin = pin === true ? trigger : _getTarget(pin);
	    _isString(toggleClass) && (toggleClass = {
	      targets: trigger,
	      className: toggleClass
	    });

	    if (pin) {
	      pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding); // if the parent is display: flex, don't apply pinSpacing by default. We should check that pin.parentNode is an element (not shadow dom window)

	      self.pin = pin;
	      pinCache = gsap.core.getCache(pin);

	      if (!pinCache.spacer) {
	        // record the spacer and pinOriginalState on the cache in case someone tries pinning the same element with MULTIPLE ScrollTriggers - we don't want to have multiple spacers or record the "original" pin state after it has already been affected by another ScrollTrigger.
	        if (pinSpacer) {
	          pinSpacer = _getTarget(pinSpacer);
	          pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement); // for React & Angular

	          pinCache.spacerIsNative = !!pinSpacer;
	          pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
	        }

	        pinCache.spacer = spacer = pinSpacer || _doc.createElement("div");
	        spacer.classList.add("pin-spacer");
	        id && spacer.classList.add("pin-spacer-" + id);
	        pinCache.pinState = pinOriginalState = _getState(pin);
	      } else {
	        pinOriginalState = pinCache.pinState;
	      }

	      vars.force3D !== false && gsap.set(pin, {
	        force3D: true
	      });
	      self.spacer = spacer = pinCache.spacer;
	      cs = _getComputedStyle(pin);
	      spacingStart = cs[pinSpacing + direction.os2];
	      pinGetter = gsap.getProperty(pin);
	      pinSetter = gsap.quickSetter(pin, direction.a, _px); // pin.firstChild && !_maxScroll(pin, direction) && (pin.style.overflow = "hidden"); // protects from collapsing margins, but can have unintended consequences as demonstrated here: https://codepen.io/GreenSock/pen/1e42c7a73bfa409d2cf1e184e7a4248d so it was removed in favor of just telling people to set up their CSS to avoid the collapsing margins (overflow: hidden | auto is just one option. Another is border-top: 1px solid transparent).

	      _swapPinIn(pin, spacer, cs);

	      pinState = _getState(pin);
	    }

	    if (markers) {
	      markerVars = _isObject(markers) ? _setDefaults(markers, _markerDefaults) : _markerDefaults;
	      markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
	      markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
	      offset = markerStartTrigger["offset" + direction.op.d2];

	      var content = _getTarget(_getProxyProp(scroller, "content") || scroller);

	      markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
	      markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
	      containerAnimation && (caMarkerSetter = gsap.quickSetter([markerStart, markerEnd], direction.a, _px));

	      if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
	        _makePositionable(isViewport ? _body : scroller);

	        gsap.set([markerStartTrigger, markerEndTrigger], {
	          force3D: true
	        });
	        markerStartSetter = gsap.quickSetter(markerStartTrigger, direction.a, _px);
	        markerEndSetter = gsap.quickSetter(markerEndTrigger, direction.a, _px);
	      }
	    }

	    if (containerAnimation) {
	      var oldOnUpdate = containerAnimation.vars.onUpdate,
	          oldParams = containerAnimation.vars.onUpdateParams;
	      containerAnimation.eventCallback("onUpdate", function () {
	        self.update(0, 0, 1);
	        oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
	      });
	    }

	    self.previous = function () {
	      return _triggers[_triggers.indexOf(self) - 1];
	    };

	    self.next = function () {
	      return _triggers[_triggers.indexOf(self) + 1];
	    };

	    self.revert = function (revert, temp) {
	      if (!temp) {
	        return self.kill(true);
	      } // for compatibility with gsap.context() and gsap.matchMedia() which call revert()


	      var r = revert !== false || !self.enabled,
	          prevRefreshing = _refreshing;

	      if (r !== self.isReverted) {
	        if (r) {
	          prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0); // record the scroll so we can revert later (repositioning/pinning things can affect scroll position). In the static refresh() method, we first record all the scroll positions as a reference.

	          prevProgress = self.progress;
	          prevAnimProgress = animation && animation.progress();
	        }

	        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
	          return m.style.display = r ? "none" : "block";
	        });

	        if (r) {
	          _refreshing = self;
	          self.update(r); // make sure the pin is back in its original position so that all the measurements are correct. do this BEFORE swapping the pin out
	        }

	        if (pin && (!pinReparent || !self.isActive)) {
	          if (r) {
	            _swapPinOut(pin, spacer, pinOriginalState);
	          } else {
	            _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
	          }
	        }

	        r || self.update(r); // when we're restoring, the update should run AFTER swapping the pin into its pin-spacer.

	        _refreshing = prevRefreshing; // restore. We set it to true during the update() so that things fire properly in there.

	        self.isReverted = r;
	      }
	    };

	    self.refresh = function (soft, force, position, pinOffset) {
	      // position is typically only defined if it's coming from setPositions() - it's a way to skip the normal parsing. pinOffset is also only from setPositions() and is mostly related to fancy stuff we need to do in ScrollSmoother with effects
	      if ((_refreshing || !self.enabled) && !force) {
	        return;
	      }

	      if (pin && soft && _lastScrollTime) {
	        _addListener(ScrollTrigger, "scrollEnd", _softRefresh);

	        return;
	      }

	      !_refreshingAll && onRefreshInit && onRefreshInit(self);
	      _refreshing = self;

	      if (tweenTo.tween) {
	        tweenTo.tween.kill();
	        tweenTo.tween = 0;
	      }

	      scrubTween && scrubTween.pause();
	      invalidateOnRefresh && animation && animation.revert({
	        kill: false
	      }).invalidate();
	      self.isReverted || self.revert(true, true);
	      self._subPinOffset = false; // we'll set this to true in the sub-pins if we find any

	      var size = getScrollerSize(),
	          scrollerBounds = getScrollerOffsets(),
	          max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction),
	          isFirstRefresh = change <= 0.01,
	          offset = 0,
	          otherPinOffset = pinOffset || 0,
	          parsedEnd = _isObject(position) ? position.end : vars.end,
	          parsedEndTrigger = vars.endTrigger || trigger,
	          parsedStart = _isObject(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"),
	          pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self),
	          triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0,
	          i = triggerIndex,
	          cs,
	          bounds,
	          scroll,
	          isVertical,
	          override,
	          curTrigger,
	          curPin,
	          oppositeScroll,
	          initted,
	          revertedPins,
	          forcedOverflow,
	          markerStartOffset,
	          markerEndOffset;

	      if (markers && _isObject(position)) {
	        // if we alter the start/end positions with .setPositions(), it generally feeds in absolute NUMBERS which don't convey information about where to line up the markers, so to keep it intuitive, we record how far the trigger positions shift after applying the new numbers and then offset by that much in the opposite direction. We do the same to the associated trigger markers too of course.
	        markerStartOffset = gsap.getProperty(markerStartTrigger, direction.p);
	        markerEndOffset = gsap.getProperty(markerEndTrigger, direction.p);
	      }

	      while (i--) {
	        // user might try to pin the same element more than once, so we must find any prior triggers with the same pin, revert them, and determine how long they're pinning so that we can offset things appropriately. Make sure we revert from last to first so that things "rewind" properly.
	        curTrigger = _triggers[i];
	        curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self); // if it's a timeline-based trigger that hasn't been fully initialized yet because it's waiting for 1 tick, just force the refresh() here, otherwise if it contains a pin that's supposed to affect other ScrollTriggers further down the page, they won't be adjusted properly.

	        curPin = curTrigger.pin;

	        if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
	          revertedPins || (revertedPins = []);
	          revertedPins.unshift(curTrigger); // we'll revert from first to last to make sure things reach their end state properly

	          curTrigger.revert(true, true);
	        }

	        if (curTrigger !== _triggers[i]) {
	          // in case it got removed.
	          triggerIndex--;
	          i--;
	        }
	      }

	      _isFunction(parsedStart) && (parsedStart = parsedStart(self));
	      parsedStart = _parseClamp(parsedStart, "start", self);
	      start = _parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._startClamp && "_startClamp") || (pin ? -0.001 : 0);
	      _isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));

	      if (_isString(parsedEnd) && !parsedEnd.indexOf("+=")) {
	        if (~parsedEnd.indexOf(" ")) {
	          parsedEnd = (_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
	        } else {
	          offset = _offsetToPx(parsedEnd.substr(2), size);
	          parsedEnd = _isString(parsedStart) ? parsedStart : (containerAnimation ? gsap.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset; // _parsePosition won't factor in the offset if the start is a number, so do it here.

	          parsedEndTrigger = trigger;
	        }
	      }

	      parsedEnd = _parseClamp(parsedEnd, "end", self);
	      end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._endClamp && "_endClamp")) || -0.001;
	      offset = 0;
	      i = triggerIndex;

	      while (i--) {
	        curTrigger = _triggers[i];
	        curPin = curTrigger.pin;

	        if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
	          cs = curTrigger.end - (self._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);

	          if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) {
	            // numeric start values shouldn't be offset at all - treat them as absolute
	            offset += cs * (1 - curTrigger.progress);
	          }

	          curPin === pin && (otherPinOffset += cs);
	        }
	      }

	      start += offset;
	      end += offset;
	      self._startClamp && (self._startClamp += offset);

	      if (self._endClamp && !_refreshingAll) {
	        self._endClamp = end || -0.001;
	        end = Math.min(end, _maxScroll(scroller, direction));
	      }

	      change = end - start || (start -= 0.01) && 0.001;

	      if (isFirstRefresh) {
	        // on the very first refresh(), the prevProgress couldn't have been accurate yet because the start/end were never calculated, so we set it here. Before 3.11.5, it could lead to an inaccurate scroll position restoration with snapping.
	        prevProgress = gsap.utils.clamp(0, 1, gsap.utils.normalize(start, end, prevScroll));
	      }

	      self._pinPush = otherPinOffset;

	      if (markerStart && offset) {
	        // offset the markers if necessary
	        cs = {};
	        cs[direction.a] = "+=" + offset;
	        pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
	        gsap.set([markerStart, markerEnd], cs);
	      }

	      if (pin) {
	        cs = _getComputedStyle(pin);
	        isVertical = direction === _vertical;
	        scroll = scrollFunc(); // recalculate because the triggers can affect the scroll

	        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;

	        if (!max && end > 1) {
	          // makes sure the scroller has a scrollbar, otherwise if something has width: 100%, for example, it would be too big (exclude the scrollbar). See https://greensock.com/forums/topic/25182-scrolltrigger-width-of-page-increase-where-markers-are-set-to-false/
	          forcedOverflow = (isViewport ? _doc.scrollingElement || _docEl : scroller).style;
	          forcedOverflow = {
	            style: forcedOverflow,
	            value: forcedOverflow["overflow" + direction.a.toUpperCase()]
	          };

	          if (isViewport && _getComputedStyle(_body)["overflow" + direction.a.toUpperCase()] !== "scroll") {
	            // avoid an extra scrollbar if BOTH <html> and <body> have overflow set to "scroll"
	            forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
	          }
	        }

	        _swapPinIn(pin, spacer, cs);

	        pinState = _getState(pin); // transforms will interfere with the top/left/right/bottom placement, so remove them temporarily. getBoundingClientRect() factors in transforms.

	        bounds = _getBounds(pin, true);
	        oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();

	        if (pinSpacing) {
	          spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
	          spacerState.t = spacer;
	          i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
	          i && spacerState.push(direction.d, i + _px); // for box-sizing: border-box (must include padding).

	          _setState(spacerState);

	          if (pinnedContainer) {
	            // in ScrollTrigger.refresh(), we need to re-evaluate the pinContainer's size because this pinSpacing may stretch it out, but we can't just add the exact distance because depending on layout, it may not push things down or it may only do so partially.
	            _triggers.forEach(function (t) {
	              if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
	                t._subPinOffset = true;
	              }
	            });
	          }

	          useFixedPosition && scrollFunc(prevScroll);
	        }

	        if (useFixedPosition) {
	          override = {
	            top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
	            left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
	            boxSizing: "border-box",
	            position: "fixed"
	          };
	          override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
	          override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
	          override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
	          override[_padding] = cs[_padding];
	          override[_padding + _Top] = cs[_padding + _Top];
	          override[_padding + _Right] = cs[_padding + _Right];
	          override[_padding + _Bottom] = cs[_padding + _Bottom];
	          override[_padding + _Left] = cs[_padding + _Left];
	          pinActiveState = _copyState(pinOriginalState, override, pinReparent);
	          _refreshingAll && scrollFunc(0);
	        }

	        if (animation) {
	          // the animation might be affecting the transform, so we must jump to the end, check the value, and compensate accordingly. Otherwise, when it becomes unpinned, the pinSetter() will get set to a value that doesn't include whatever the animation did.
	          initted = animation._initted; // if not, we must invalidate() after this step, otherwise it could lock in starting values prematurely.

	          _suppressOverwrites(1);

	          animation.render(animation.duration(), true, true);
	          pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
	          pinMoves = Math.abs(change - pinChange) > 1;
	          useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2); // transform is the last property/value set in the state Array. Since the animation is controlling that, we should omit it.

	          animation.render(0, true, true);
	          initted || animation.invalidate(true);
	          animation.parent || animation.totalTime(animation.totalTime()); // if, for example, a toggleAction called play() and then refresh() happens and when we render(1) above, it would cause the animation to complete and get removed from its parent, so this makes sure it gets put back in.

	          _suppressOverwrites(0);
	        } else {
	          pinChange = change;
	        }

	        forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
	      } else if (trigger && scrollFunc() && !containerAnimation) {
	        // it may be INSIDE a pinned element, so walk up the tree and look for any elements with _pinOffset to compensate because anything with pinSpacing that's already scrolled would throw off the measurements in getBoundingClientRect()
	        bounds = trigger.parentNode;

	        while (bounds && bounds !== _body) {
	          if (bounds._pinOffset) {
	            start -= bounds._pinOffset;
	            end -= bounds._pinOffset;
	          }

	          bounds = bounds.parentNode;
	        }
	      }

	      revertedPins && revertedPins.forEach(function (t) {
	        return t.revert(false, true);
	      });
	      self.start = start;
	      self.end = end;
	      scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc(); // reset velocity

	      if (!containerAnimation && !_refreshingAll) {
	        scroll1 < prevScroll && scrollFunc(prevScroll);
	        self.scroll.rec = 0;
	      }

	      self.revert(false, true);
	      lastRefresh = _getTime();

	      if (snapDelayedCall) {
	        lastSnap = -1;
	        self.isActive && scrollFunc(start + change * prevProgress); // just so snapping gets re-enabled, clear out any recorded last value

	        snapDelayedCall.restart(true);
	      }

	      _refreshing = 0;
	      animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true); // must force a re-render because if saveStyles() was used on the target(s), the styles could have been wiped out during the refresh().

	      if (isFirstRefresh || prevProgress !== self.progress || containerAnimation) {
	        // ensures that the direction is set properly (when refreshing, progress is set back to 0 initially, then back again to wherever it needs to be) and that callbacks are triggered.
	        animation && !isToggle && animation.totalProgress(containerAnimation && start < -0.001 && !prevProgress ? gsap.utils.normalize(start, end, 0) : prevProgress, true); // to avoid issues where animation callbacks like onStart aren't triggered.

	        self.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
	      }

	      pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
	      scrubTween && scrubTween.invalidate();

	      if (!isNaN(markerStartOffset)) {
	        // numbers were passed in for the position which are absolute, so instead of just putting the markers at the very bottom of the viewport, we figure out how far they shifted down (it's safe to assume they were originally positioned in closer relation to the trigger element with values like "top", "center", a percentage or whatever, so we offset that much in the opposite direction to basically revert them to the relative position thy were at previously.
	        markerStartOffset -= gsap.getProperty(markerStartTrigger, direction.p);
	        markerEndOffset -= gsap.getProperty(markerEndTrigger, direction.p);

	        _shiftMarker(markerStartTrigger, direction, markerStartOffset);

	        _shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));

	        _shiftMarker(markerEndTrigger, direction, markerEndOffset);

	        _shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
	      }

	      isFirstRefresh && !_refreshingAll && self.update(); // edge case - when you reload a page when it's already scrolled down, some browsers fire a "scroll" event before DOMContentLoaded, triggering an updateAll(). If we don't update the self.progress as part of refresh(), then when it happens next, it may record prevProgress as 0 when it really shouldn't, potentially causing a callback in an animation to fire again.

	      if (onRefresh && !_refreshingAll && !executingOnRefresh) {
	        // when refreshing all, we do extra work to correct pinnedContainer sizes and ensure things don't exceed the maxScroll, so we should do all the refreshes at the end after all that work so that the start/end values are corrected.
	        executingOnRefresh = true;
	        onRefresh(self);
	        executingOnRefresh = false;
	      }
	    };

	    self.getVelocity = function () {
	      return (scrollFunc() - scroll2) / (_getTime() - _time2) * 1000 || 0;
	    };

	    self.endAnimation = function () {
	      _endAnimation(self.callbackAnimation);

	      if (animation) {
	        scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
	      }
	    };

	    self.labelToScroll = function (label) {
	      return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
	    };

	    self.getTrailing = function (name) {
	      var i = _triggers.indexOf(self),
	          a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);

	      return (_isString(name) ? a.filter(function (t) {
	        return t.vars.preventOverlaps === name;
	      }) : a).filter(function (t) {
	        return self.direction > 0 ? t.end <= start : t.start >= end;
	      });
	    };

	    self.update = function (reset, recordVelocity, forceFake) {
	      if (containerAnimation && !forceFake && !reset) {
	        return;
	      }

	      var scroll = _refreshingAll === true ? prevScroll : self.scroll(),
	          p = reset ? 0 : (scroll - start) / change,
	          clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0,
	          prevProgress = self.progress,
	          isActive,
	          wasActive,
	          toggleState,
	          action,
	          stateChanged,
	          toggled,
	          isAtMax,
	          isTakingAction;

	      if (recordVelocity) {
	        scroll2 = scroll1;
	        scroll1 = containerAnimation ? scrollFunc() : scroll;

	        if (snap) {
	          snap2 = snap1;
	          snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
	        }
	      } // anticipate the pinning a few ticks ahead of time based on velocity to avoid a visual glitch due to the fact that most browsers do scrolling on a separate thread (not synced with requestAnimationFrame).


	      anticipatePin && !clipped && pin && !_refreshing && !_startup && _lastScrollTime && start < scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin && (clipped = 0.0001);

	      if (clipped !== prevProgress && self.enabled) {
	        isActive = self.isActive = !!clipped && clipped < 1;
	        wasActive = !!prevProgress && prevProgress < 1;
	        toggled = isActive !== wasActive;
	        stateChanged = toggled || !!clipped !== !!prevProgress; // could go from start all the way to end, thus it didn't toggle but it did change state in a sense (may need to fire a callback)

	        self.direction = clipped > prevProgress ? 1 : -1;
	        self.progress = clipped;

	        if (stateChanged && !_refreshing) {
	          toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3; // 0 = enter, 1 = leave, 2 = enterBack, 3 = leaveBack (we prioritize the FIRST encounter, thus if you scroll really fast past the onEnter and onLeave in one tick, it'd prioritize onEnter.

	          if (isToggle) {
	            action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState]; // if it didn't toggle, that means it shot right past and since we prioritize the "enter" action, we should switch to the "leave" in this case (but only if one is defined)

	            isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
	          }
	        }

	        preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function (t) {
	          return t.endAnimation();
	        }));

	        if (!isToggle) {
	          if (scrubTween && !_refreshing && !_startup) {
	            scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start); // if there's a scrub on both the container animation and this one (or a ScrollSmoother), the update order would cause this one not to have rendered yet, so it wouldn't make any progress before we .restart() it heading toward the new progress so it'd appear stuck thus we force a render here.

	            if (scrubTween.resetTo) {
	              scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
	            } else {
	              // legacy support (courtesy), before 3.10.0
	              scrubTween.vars.totalProgress = clipped;
	              scrubTween.invalidate().restart();
	            }
	          } else if (animation) {
	            animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
	          }
	        }

	        if (pin) {
	          reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);

	          if (!useFixedPosition) {
	            pinSetter(_round(pinStart + pinChange * clipped));
	          } else if (stateChanged) {
	            isAtMax = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction); // if it's at the VERY end of the page, don't switch away from position: fixed because it's pointless and it could cause a brief flash when the user scrolls back up (when it gets pinned again)

	            if (pinReparent) {
	              if (!reset && (isActive || isAtMax)) {
	                var bounds = _getBounds(pin, true),
	                    _offset = scroll - start;

	                _reparent(pin, _body, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
	              } else {
	                _reparent(pin, spacer);
	              }
	            }

	            _setState(isActive || isAtMax ? pinActiveState : pinState);

	            pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
	          }
	        }

	        snap && !tweenTo.tween && !_refreshing && !_startup && snapDelayedCall.restart(true);
	        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function (el) {
	          return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
	        }); // classes could affect positioning, so do it even if reset or refreshing is true.

	        onUpdate && !isToggle && !reset && onUpdate(self);

	        if (stateChanged && !_refreshing) {
	          if (isToggle) {
	            if (isTakingAction) {
	              if (action === "complete") {
	                animation.pause().totalProgress(1);
	              } else if (action === "reset") {
	                animation.restart(true).pause();
	              } else if (action === "restart") {
	                animation.restart(true);
	              } else {
	                animation[action]();
	              }
	            }

	            onUpdate && onUpdate(self);
	          }

	          if (toggled || !_limitCallbacks) {
	            // on startup, the page could be scrolled and we don't want to fire callbacks that didn't toggle. For example onEnter shouldn't fire if the ScrollTrigger isn't actually entered.
	            onToggle && toggled && _callback(self, onToggle);
	            callbacks[toggleState] && _callback(self, callbacks[toggleState]);
	            once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0); // a callback shouldn't be called again if once is true.

	            if (!toggled) {
	              // it's possible to go completely past, like from before the start to after the end (or vice-versa) in which case BOTH callbacks should be fired in that order
	              toggleState = clipped === 1 ? 1 : 3;
	              callbacks[toggleState] && _callback(self, callbacks[toggleState]);
	            }
	          }

	          if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber(fastScrollEnd) ? fastScrollEnd : 2500)) {
	            _endAnimation(self.callbackAnimation);

	            scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
	          }
	        } else if (isToggle && onUpdate && !_refreshing) {
	          onUpdate(self);
	        }
	      } // update absolutely-positioned markers (only if the scroller isn't the viewport)


	      if (markerEndSetter) {
	        var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
	        markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
	        markerEndSetter(n);
	      }

	      caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
	    };

	    self.enable = function (reset, refresh) {
	      if (!self.enabled) {
	        self.enabled = true;

	        _addListener(scroller, "resize", _onResize);

	        _addListener(isViewport ? _doc : scroller, "scroll", _onScroll);

	        onRefreshInit && _addListener(ScrollTrigger, "refreshInit", onRefreshInit);

	        if (reset !== false) {
	          self.progress = prevProgress = 0;
	          scroll1 = scroll2 = lastSnap = scrollFunc();
	        }

	        refresh !== false && self.refresh();
	      }
	    };

	    self.getTween = function (snap) {
	      return snap && tweenTo ? tweenTo.tween : scrubTween;
	    };

	    self.setPositions = function (newStart, newEnd, keepClamp, pinOffset) {
	      // doesn't persist after refresh()! Intended to be a way to override values that were set during refresh(), like you could set it in onRefresh()
	      if (containerAnimation) {
	        // convert ratios into scroll positions. Remember, start/end values on ScrollTriggers that have a containerAnimation refer to the time (in seconds), NOT scroll positions.
	        var st = containerAnimation.scrollTrigger,
	            duration = containerAnimation.duration(),
	            _change = st.end - st.start;

	        newStart = st.start + _change * newStart / duration;
	        newEnd = st.start + _change * newEnd / duration;
	      }

	      self.refresh(false, false, {
	        start: _keepClamp(newStart, keepClamp && !!self._startClamp),
	        end: _keepClamp(newEnd, keepClamp && !!self._endClamp)
	      }, pinOffset);
	      self.update();
	    };

	    self.adjustPinSpacing = function (amount) {
	      if (spacerState && amount) {
	        var i = spacerState.indexOf(direction.d) + 1;
	        spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
	        spacerState[1] = parseFloat(spacerState[1]) + amount + _px;

	        _setState(spacerState);
	      }
	    };

	    self.disable = function (reset, allowAnimation) {
	      if (self.enabled) {
	        reset !== false && self.revert(true, true);
	        self.enabled = self.isActive = false;
	        allowAnimation || scrubTween && scrubTween.pause();
	        prevScroll = 0;
	        pinCache && (pinCache.uncache = 1);
	        onRefreshInit && _removeListener(ScrollTrigger, "refreshInit", onRefreshInit);

	        if (snapDelayedCall) {
	          snapDelayedCall.pause();
	          tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
	        }

	        if (!isViewport) {
	          var i = _triggers.length;

	          while (i--) {
	            if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
	              return; //don't remove the listeners if there are still other triggers referencing it.
	            }
	          }

	          _removeListener(scroller, "resize", _onResize);

	          _removeListener(scroller, "scroll", _onScroll);
	        }
	      }
	    };

	    self.kill = function (revert, allowAnimation) {
	      self.disable(revert, allowAnimation);
	      scrubTween && !allowAnimation && scrubTween.kill();
	      id && delete _ids[id];

	      var i = _triggers.indexOf(self);

	      i >= 0 && _triggers.splice(i, 1);
	      i === _i && _direction > 0 && _i--; // if we're in the middle of a refresh() or update(), splicing would cause skips in the index, so adjust...
	      // if no other ScrollTrigger instances of the same scroller are found, wipe out any recorded scroll position. Otherwise, in a single page application, for example, it could maintain scroll position when it really shouldn't.

	      i = 0;

	      _triggers.forEach(function (t) {
	        return t.scroller === self.scroller && (i = 1);
	      });

	      i || _refreshingAll || (self.scroll.rec = 0);

	      if (animation) {
	        animation.scrollTrigger = null;
	        revert && animation.revert({
	          kill: false
	        });
	        allowAnimation || animation.kill();
	      }

	      markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
	        return m.parentNode && m.parentNode.removeChild(m);
	      });
	      _primary === self && (_primary = 0);

	      if (pin) {
	        pinCache && (pinCache.uncache = 1);
	        i = 0;

	        _triggers.forEach(function (t) {
	          return t.pin === pin && i++;
	        });

	        i || (pinCache.spacer = 0); // if there aren't any more ScrollTriggers with the same pin, remove the spacer, otherwise it could be contaminated with old/stale values if the user re-creates a ScrollTrigger for the same element.
	      }

	      vars.onKill && vars.onKill(self);
	    };

	    _triggers.push(self);

	    self.enable(false, false);
	    customRevertReturn && customRevertReturn(self);

	    if (animation && animation.add && !change) {
	      // if the animation is a timeline, it may not have been populated yet, so it wouldn't render at the proper place on the first refresh(), thus we should schedule one for the next tick. If "change" is defined, we know it must be re-enabling, thus we can refresh() right away.
	      var updateFunc = self.update; // some browsers may fire a scroll event BEFORE a tick elapses and/or the DOMContentLoaded fires. So there's a chance update() will be called BEFORE a refresh() has happened on a Timeline-attached ScrollTrigger which means the start/end won't be calculated yet. We don't want to add conditional logic inside the update() method (like check to see if end is defined and if not, force a refresh()) because that's a function that gets hit a LOT (performance). So we swap out the real update() method for this one that'll re-attach it the first time it gets called and of course forces a refresh().

	      self.update = function () {
	        self.update = updateFunc;
	        start || end || self.refresh();
	      };

	      gsap.delayedCall(0.01, self.update);
	      change = 0.01;
	      start = end = 0;
	    } else {
	      self.refresh();
	    }

	    pin && _queueRefreshAll(); // pinning could affect the positions of other things, so make sure we queue a full refresh()
	  };

	  ScrollTrigger.register = function register(core) {
	    if (!_coreInitted) {
	      gsap = core || _getGSAP();
	      _windowExists() && window.document && ScrollTrigger.enable();
	      _coreInitted = _enabled;
	    }

	    return _coreInitted;
	  };

	  ScrollTrigger.defaults = function defaults(config) {
	    if (config) {
	      for (var p in config) {
	        _defaults[p] = config[p];
	      }
	    }

	    return _defaults;
	  };

	  ScrollTrigger.disable = function disable(reset, kill) {
	    _enabled = 0;

	    _triggers.forEach(function (trigger) {
	      return trigger[kill ? "kill" : "disable"](reset);
	    });

	    _removeListener(_win, "wheel", _onScroll);

	    _removeListener(_doc, "scroll", _onScroll);

	    clearInterval(_syncInterval);

	    _removeListener(_doc, "touchcancel", _passThrough);

	    _removeListener(_body, "touchstart", _passThrough);

	    _multiListener(_removeListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);

	    _multiListener(_removeListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);

	    _resizeDelay.kill();

	    _iterateAutoRefresh(_removeListener);

	    for (var i = 0; i < _scrollers.length; i += 3) {
	      _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 1]);

	      _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 2]);
	    }
	  };

	  ScrollTrigger.enable = function enable() {
	    _win = window;
	    _doc = document;
	    _docEl = _doc.documentElement;
	    _body = _doc.body;

	    if (gsap) {
	      _toArray = gsap.utils.toArray;
	      _clamp = gsap.utils.clamp;
	      _context = gsap.core.context || _passThrough;
	      _suppressOverwrites = gsap.core.suppressOverwrites || _passThrough;
	      _scrollRestoration = _win.history.scrollRestoration || "auto";
	      _lastScroll = _win.pageYOffset;
	      gsap.core.globals("ScrollTrigger", ScrollTrigger); // must register the global manually because in Internet Explorer, functions (classes) don't have a "name" property.

	      if (_body) {
	        _enabled = 1;

	        _rafBugFix();

	        Observer.register(gsap); // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

	        ScrollTrigger.isTouch = Observer.isTouch;
	        _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent); // since 2017, iOS has had a bug that causes event.clientX/Y to be inaccurate when a scroll occurs, thus we must alternate ignoring every other touchmove event to work around it. See https://bugs.webkit.org/show_bug.cgi?id=181954 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503

	        _addListener(_win, "wheel", _onScroll); // mostly for 3rd party smooth scrolling libraries.


	        _root = [_win, _doc, _docEl, _body];

	        if (gsap.matchMedia) {
	          ScrollTrigger.matchMedia = function (vars) {
	            var mm = gsap.matchMedia(),
	                p;

	            for (p in vars) {
	              mm.add(p, vars[p]);
	            }

	            return mm;
	          };

	          gsap.addEventListener("matchMediaInit", function () {
	            return _revertAll();
	          });
	          gsap.addEventListener("matchMediaRevert", function () {
	            return _revertRecorded();
	          });
	          gsap.addEventListener("matchMedia", function () {
	            _refreshAll(0, 1);

	            _dispatch("matchMedia");
	          });
	          gsap.matchMedia("(orientation: portrait)", function () {
	            // when orientation changes, we should take new base measurements for the ignoreMobileResize feature.
	            _setBaseDimensions();

	            return _setBaseDimensions;
	          });
	        } else {
	          console.warn("Requires GSAP 3.11.0 or later");
	        }

	        _setBaseDimensions();

	        _addListener(_doc, "scroll", _onScroll); // some browsers (like Chrome), the window stops dispatching scroll events on the window if you scroll really fast, but it's consistent on the document!


	        var bodyStyle = _body.style,
	            border = bodyStyle.borderTopStyle,
	            AnimationProto = gsap.core.Animation.prototype,
	            bounds,
	            i;
	        AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
	          value: function value() {
	            return this.time(-0.01, true);
	          }
	        }); // only for backwards compatibility (Animation.revert() was added after 3.10.4)

	        bodyStyle.borderTopStyle = "solid"; // works around an issue where a margin of a child element could throw off the bounds of the _body, making it seem like there's a margin when there actually isn't. The border ensures that the bounds are accurate.

	        bounds = _getBounds(_body);
	        _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0; // accommodate the offset of the <body> caused by margins and/or padding

	        _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
	        border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style"); // TODO: (?) maybe move to leveraging the velocity mechanism in Observer and skip intervals.

	        _syncInterval = setInterval(_sync, 250);
	        gsap.delayedCall(0.5, function () {
	          return _startup = 0;
	        });

	        _addListener(_doc, "touchcancel", _passThrough); // some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document.


	        _addListener(_body, "touchstart", _passThrough); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/


	        _multiListener(_addListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);

	        _multiListener(_addListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);

	        _transformProp = gsap.utils.checkPrefix("transform");

	        _stateProps.push(_transformProp);

	        _coreInitted = _getTime();
	        _resizeDelay = gsap.delayedCall(0.2, _refreshAll).pause();
	        _autoRefresh = [_doc, "visibilitychange", function () {
	          var w = _win.innerWidth,
	              h = _win.innerHeight;

	          if (_doc.hidden) {
	            _prevWidth = w;
	            _prevHeight = h;
	          } else if (_prevWidth !== w || _prevHeight !== h) {
	            _onResize();
	          }
	        }, _doc, "DOMContentLoaded", _refreshAll, _win, "load", _refreshAll, _win, "resize", _onResize];

	        _iterateAutoRefresh(_addListener);

	        _triggers.forEach(function (trigger) {
	          return trigger.enable(0, 1);
	        });

	        for (i = 0; i < _scrollers.length; i += 3) {
	          _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 1]);

	          _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 2]);
	        }
	      }
	    }
	  };

	  ScrollTrigger.config = function config(vars) {
	    "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
	    var ms = vars.syncInterval;
	    ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
	    "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger.isTouch === 1 && vars.ignoreMobileResize);

	    if ("autoRefreshEvents" in vars) {
	      _iterateAutoRefresh(_removeListener) || _iterateAutoRefresh(_addListener, vars.autoRefreshEvents || "none");
	      _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
	    }
	  };

	  ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
	    var t = _getTarget(target),
	        i = _scrollers.indexOf(t),
	        isViewport = _isViewport(t);

	    if (~i) {
	      _scrollers.splice(i, isViewport ? 6 : 2);
	    }

	    if (vars) {
	      isViewport ? _proxies.unshift(_win, vars, _body, vars, _docEl, vars) : _proxies.unshift(t, vars);
	    }
	  };

	  ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
	    _triggers.forEach(function (t) {
	      return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
	    });
	  };

	  ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
	    var bounds = (_isString(element) ? _getTarget(element) : element).getBoundingClientRect(),
	        offset = bounds[horizontal ? _width : _height] * ratio || 0;
	    return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win.innerHeight;
	  };

	  ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
	    _isString(element) && (element = _getTarget(element));
	    var bounds = element.getBoundingClientRect(),
	        size = bounds[horizontal ? _width : _height],
	        offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
	    return horizontal ? (bounds.left + offset) / _win.innerWidth : (bounds.top + offset) / _win.innerHeight;
	  };

	  ScrollTrigger.killAll = function killAll(allowListeners) {
	    _triggers.slice(0).forEach(function (t) {
	      return t.vars.id !== "ScrollSmoother" && t.kill();
	    });

	    if (allowListeners !== true) {
	      var listeners = _listeners.killAll || [];
	      _listeners = {};
	      listeners.forEach(function (f) {
	        return f();
	      });
	    }
	  };

	  return ScrollTrigger;
	}();
	ScrollTrigger.version = "3.12.1";

	ScrollTrigger.saveStyles = function (targets) {
	  return targets ? _toArray(targets).forEach(function (target) {
	    // saved styles are recorded in a consecutive alternating Array, like [element, cssText, transform attribute, cache, matchMedia, ...]
	    if (target && target.style) {
	      var i = _savedStyles.indexOf(target);

	      i >= 0 && _savedStyles.splice(i, 5);

	      _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap.core.getCache(target), _context());
	    }
	  }) : _savedStyles;
	};

	ScrollTrigger.revert = function (soft, media) {
	  return _revertAll(!soft, media);
	};

	ScrollTrigger.create = function (vars, animation) {
	  return new ScrollTrigger(vars, animation);
	};

	ScrollTrigger.refresh = function (safe) {
	  return safe ? _onResize() : (_coreInitted || ScrollTrigger.register()) && _refreshAll(true);
	};

	ScrollTrigger.update = function (force) {
	  return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
	};

	ScrollTrigger.clearScrollMemory = _clearScrollMemory;

	ScrollTrigger.maxScroll = function (element, horizontal) {
	  return _maxScroll(element, horizontal ? _horizontal : _vertical);
	};

	ScrollTrigger.getScrollFunc = function (element, horizontal) {
	  return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
	};

	ScrollTrigger.getById = function (id) {
	  return _ids[id];
	};

	ScrollTrigger.getAll = function () {
	  return _triggers.filter(function (t) {
	    return t.vars.id !== "ScrollSmoother";
	  });
	}; // it's common for people to ScrollTrigger.getAll(t => t.kill()) on page routes, for example, and we don't want it to ruin smooth scrolling by killing the main ScrollSmoother one.


	ScrollTrigger.isScrolling = function () {
	  return !!_lastScrollTime;
	};

	ScrollTrigger.snapDirectional = _snapDirectional;

	ScrollTrigger.addEventListener = function (type, callback) {
	  var a = _listeners[type] || (_listeners[type] = []);
	  ~a.indexOf(callback) || a.push(callback);
	};

	ScrollTrigger.removeEventListener = function (type, callback) {
	  var a = _listeners[type],
	      i = a && a.indexOf(callback);
	  i >= 0 && a.splice(i, 1);
	};

	ScrollTrigger.batch = function (targets, vars) {
	  var result = [],
	      varsCopy = {},
	      interval = vars.interval || 0.016,
	      batchMax = vars.batchMax || 1e9,
	      proxyCallback = function proxyCallback(type, callback) {
	    var elements = [],
	        triggers = [],
	        delay = gsap.delayedCall(interval, function () {
	      callback(elements, triggers);
	      elements = [];
	      triggers = [];
	    }).pause();
	    return function (self) {
	      elements.length || delay.restart(true);
	      elements.push(self.trigger);
	      triggers.push(self);
	      batchMax <= elements.length && delay.progress(1);
	    };
	  },
	      p;

	  for (p in vars) {
	    varsCopy[p] = p.substr(0, 2) === "on" && _isFunction(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
	  }

	  if (_isFunction(batchMax)) {
	    batchMax = batchMax();

	    _addListener(ScrollTrigger, "refresh", function () {
	      return batchMax = vars.batchMax();
	    });
	  }

	  _toArray(targets).forEach(function (target) {
	    var config = {};

	    for (p in varsCopy) {
	      config[p] = varsCopy[p];
	    }

	    config.trigger = target;
	    result.push(ScrollTrigger.create(config));
	  });

	  return result;
	}; // to reduce file size. clamps the scroll and also returns a duration multiplier so that if the scroll gets chopped shorter, the duration gets curtailed as well (otherwise if you're very close to the top of the page, for example, and swipe up really fast, it'll suddenly slow down and take a long time to reach the top).


	var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier(scrollFunc, current, end, max) {
	  current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
	  return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
	},
	    _allowNativePanning = function _allowNativePanning(target, direction) {
	  if (direction === true) {
	    target.style.removeProperty("touch-action");
	  } else {
	    target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none"; // note: Firefox doesn't support it pinch-zoom properly, at least in addition to a pan-x or pan-y.
	  }

	  target === _docEl && _allowNativePanning(_body, direction);
	},
	    _overflow = {
	  auto: 1,
	  scroll: 1
	},
	    _nestedScroll = function _nestedScroll(_ref5) {
	  var event = _ref5.event,
	      target = _ref5.target,
	      axis = _ref5.axis;

	  var node = (event.changedTouches ? event.changedTouches[0] : event).target,
	      cache = node._gsap || gsap.core.getCache(node),
	      time = _getTime(),
	      cs;

	  if (!cache._isScrollT || time - cache._isScrollT > 2000) {
	    // cache for 2 seconds to improve performance.
	    while (node && node !== _body && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
	      node = node.parentNode;
	    }

	    cache._isScroll = node && node !== target && !_isViewport(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
	    cache._isScrollT = time;
	  }

	  if (cache._isScroll || axis === "x") {
	    event.stopPropagation();
	    event._gsapAllow = true;
	  }
	},
	    // capture events on scrollable elements INSIDE the <body> and allow those by calling stopPropagation() when we find a scrollable ancestor
	_inputObserver = function _inputObserver(target, type, inputs, nested) {
	  return Observer.create({
	    target: target,
	    capture: true,
	    debounce: false,
	    lockAxis: true,
	    type: type,
	    onWheel: nested = nested && _nestedScroll,
	    onPress: nested,
	    onDrag: nested,
	    onScroll: nested,
	    onEnable: function onEnable() {
	      return inputs && _addListener(_doc, Observer.eventTypes[0], _captureInputs, false, true);
	    },
	    onDisable: function onDisable() {
	      return _removeListener(_doc, Observer.eventTypes[0], _captureInputs, true);
	    }
	  });
	},
	    _inputExp = /(input|label|select|textarea)/i,
	    _inputIsFocused,
	    _captureInputs = function _captureInputs(e) {
	  var isInput = _inputExp.test(e.target.tagName);

	  if (isInput || _inputIsFocused) {
	    e._gsapAllow = true;
	    _inputIsFocused = isInput;
	  }
	},
	    _getScrollNormalizer = function _getScrollNormalizer(vars) {
	  _isObject(vars) || (vars = {});
	  vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
	  vars.type || (vars.type = "wheel,touch");
	  vars.debounce = !!vars.debounce;
	  vars.id = vars.id || "normalizer";

	  var _vars2 = vars,
	      normalizeScrollX = _vars2.normalizeScrollX,
	      momentum = _vars2.momentum,
	      allowNestedScroll = _vars2.allowNestedScroll,
	      onRelease = _vars2.onRelease,
	      self,
	      maxY,
	      target = _getTarget(vars.target) || _docEl,
	      smoother = gsap.core.globals().ScrollSmoother,
	      smootherInstance = smoother && smoother.get(),
	      content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()),
	      scrollFuncY = _getScrollFunc(target, _vertical),
	      scrollFuncX = _getScrollFunc(target, _horizontal),
	      scale = 1,
	      initialScale = (Observer.isTouch && _win.visualViewport ? _win.visualViewport.scale * _win.visualViewport.width : _win.outerWidth) / _win.innerWidth,
	      wheelRefresh = 0,
	      resolveMomentumDuration = _isFunction(momentum) ? function () {
	    return momentum(self);
	  } : function () {
	    return momentum || 2.8;
	  },
	      lastRefreshID,
	      skipTouchMove,
	      inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll),
	      resumeTouchMove = function resumeTouchMove() {
	    return skipTouchMove = false;
	  },
	      scrollClampX = _passThrough,
	      scrollClampY = _passThrough,
	      updateClamps = function updateClamps() {
	    maxY = _maxScroll(target, _vertical);
	    scrollClampY = _clamp(_fixIOSBug ? 1 : 0, maxY);
	    normalizeScrollX && (scrollClampX = _clamp(0, _maxScroll(target, _horizontal)));
	    lastRefreshID = _refreshID;
	  },
	      removeContentOffset = function removeContentOffset() {
	    content._gsap.y = _round(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
	    content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
	    scrollFuncY.offset = scrollFuncY.cacheID = 0;
	  },
	      ignoreDrag = function ignoreDrag() {
	    if (skipTouchMove) {
	      requestAnimationFrame(resumeTouchMove);

	      var offset = _round(self.deltaY / 2),
	          scroll = scrollClampY(scrollFuncY.v - offset);

	      if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
	        scrollFuncY.offset = scroll - scrollFuncY.v;

	        var y = _round((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);

	        content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
	        content._gsap.y = y + "px";
	        scrollFuncY.cacheID = _scrollers.cache;

	        _updateAll();
	      }

	      return true;
	    }

	    scrollFuncY.offset && removeContentOffset();
	    skipTouchMove = true;
	  },
	      tween,
	      startScrollX,
	      startScrollY,
	      onStopDelayedCall,
	      onResize = function onResize() {
	    // if the window resizes, like on an iPhone which Apple FORCES the address bar to show/hide even if we event.preventDefault(), it may be scrolling too far now that the address bar is showing, so we must dynamically adjust the momentum tween.
	    updateClamps();

	    if (tween.isActive() && tween.vars.scrollY > maxY) {
	      scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
	    }
	  };

	  content && gsap.set(content, {
	    y: "+=0"
	  }); // to ensure there's a cache (element._gsap)

	  vars.ignoreCheck = function (e) {
	    return _fixIOSBug && e.type === "touchmove" && ignoreDrag() || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
	  };

	  vars.onPress = function () {
	    skipTouchMove = false;
	    var prevScale = scale;
	    scale = _round((_win.visualViewport && _win.visualViewport.scale || 1) / initialScale);
	    tween.pause();
	    prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
	    startScrollX = scrollFuncX();
	    startScrollY = scrollFuncY();
	    updateClamps();
	    lastRefreshID = _refreshID;
	  };

	  vars.onRelease = vars.onGestureStart = function (self, wasDragging) {
	    scrollFuncY.offset && removeContentOffset();

	    if (!wasDragging) {
	      onStopDelayedCall.restart(true);
	    } else {
	      _scrollers.cache++; // make sure we're pulling the non-cached value
	      // alternate algorithm: durX = Math.min(6, Math.abs(self.velocityX / 800)),	dur = Math.max(durX, Math.min(6, Math.abs(self.velocityY / 800))); dur = dur * (0.4 + (1 - _power4In(dur / 6)) * 0.6)) * (momentumSpeed || 1)

	      var dur = resolveMomentumDuration(),
	          currentScroll,
	          endScroll;

	      if (normalizeScrollX) {
	        currentScroll = scrollFuncX();
	        endScroll = currentScroll + dur * 0.05 * -self.velocityX / 0.227; // the constant .227 is from power4(0.05). velocity is inverted because scrolling goes in the opposite direction.

	        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
	        tween.vars.scrollX = scrollClampX(endScroll);
	      }

	      currentScroll = scrollFuncY();
	      endScroll = currentScroll + dur * 0.05 * -self.velocityY / 0.227; // the constant .227 is from power4(0.05)

	      dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
	      tween.vars.scrollY = scrollClampY(endScroll);
	      tween.invalidate().duration(dur).play(0.01);

	      if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
	        // iOS bug: it'll show the address bar but NOT fire the window "resize" event until the animation is done but we must protect against overshoot so we leverage an onUpdate to do so.
	        gsap.to({}, {
	          onUpdate: onResize,
	          duration: dur
	        });
	      }
	    }

	    onRelease && onRelease(self);
	  };

	  vars.onWheel = function () {
	    tween._ts && tween.pause();

	    if (_getTime() - wheelRefresh > 1000) {
	      // after 1 second, refresh the clamps otherwise that'll only happen when ScrollTrigger.refresh() is called or for touch-scrolling.
	      lastRefreshID = 0;
	      wheelRefresh = _getTime();
	    }
	  };

	  vars.onChange = function (self, dx, dy, xArray, yArray) {
	    _refreshID !== lastRefreshID && updateClamps();
	    dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self.startX - self.x) : scrollFuncX() + dx - xArray[1])); // for more precision, we track pointer/touch movement from the start, otherwise it'll drift.

	    if (dy) {
	      scrollFuncY.offset && removeContentOffset();
	      var isTouch = yArray[2] === dy,
	          y = isTouch ? startScrollY + self.startY - self.y : scrollFuncY() + dy - yArray[1],
	          yClamped = scrollClampY(y);
	      isTouch && y !== yClamped && (startScrollY += yClamped - y);
	      scrollFuncY(yClamped);
	    }

	    (dy || dx) && _updateAll();
	  };

	  vars.onEnable = function () {
	    _allowNativePanning(target, normalizeScrollX ? false : "x");

	    ScrollTrigger.addEventListener("refresh", onResize);

	    _addListener(_win, "resize", onResize);

	    if (scrollFuncY.smooth) {
	      scrollFuncY.target.style.scrollBehavior = "auto";
	      scrollFuncY.smooth = scrollFuncX.smooth = false;
	    }

	    inputObserver.enable();
	  };

	  vars.onDisable = function () {
	    _allowNativePanning(target, true);

	    _removeListener(_win, "resize", onResize);

	    ScrollTrigger.removeEventListener("refresh", onResize);
	    inputObserver.kill();
	  };

	  vars.lockAxis = vars.lockAxis !== false;
	  self = new Observer(vars);
	  self.iOS = _fixIOSBug; // used in the Observer getCachedScroll() function to work around an iOS bug that wreaks havoc with TouchEvent.clientY if we allow scroll to go all the way back to 0.

	  _fixIOSBug && !scrollFuncY() && scrollFuncY(1); // iOS bug causes event.clientY values to freak out (wildly inaccurate) if the scroll position is exactly 0.

	  _fixIOSBug && gsap.ticker.add(_passThrough); // prevent the ticker from sleeping

	  onStopDelayedCall = self._dc;
	  tween = gsap.to(self, {
	    ease: "power4",
	    paused: true,
	    scrollX: normalizeScrollX ? "+=0.1" : "+=0",
	    scrollY: "+=0.1",
	    modifiers: {
	      scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function () {
	        return tween.pause();
	      })
	    },
	    onUpdate: _updateAll,
	    onComplete: onStopDelayedCall.vars.onComplete
	  }); // we need the modifier to sense if the scroll position is altered outside of the momentum tween (like with a scrollTo tween) so we can pause() it to prevent conflicts.

	  return self;
	};

	ScrollTrigger.sort = function (func) {
	  return _triggers.sort(func || function (a, b) {
	    return (a.vars.refreshPriority || 0) * -1e6 + a.start - (b.start + (b.vars.refreshPriority || 0) * -1e6);
	  });
	};

	ScrollTrigger.observe = function (vars) {
	  return new Observer(vars);
	};

	ScrollTrigger.normalizeScroll = function (vars) {
	  if (typeof vars === "undefined") {
	    return _normalizer;
	  }

	  if (vars === true && _normalizer) {
	    return _normalizer.enable();
	  }

	  if (vars === false) {
	    return _normalizer && _normalizer.kill();
	  }

	  var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
	  _normalizer && _normalizer.target === normalizer.target && _normalizer.kill();
	  _isViewport(normalizer.target) && (_normalizer = normalizer);
	  return normalizer;
	};

	ScrollTrigger.core = {
	  // smaller file size way to leverage in ScrollSmoother and Observer
	  _getVelocityProp: _getVelocityProp,
	  _inputObserver: _inputObserver,
	  _scrollers: _scrollers,
	  _proxies: _proxies,
	  bridge: {
	    // when normalizeScroll sets the scroll position (ss = setScroll)
	    ss: function ss() {
	      _lastScrollTime || _dispatch("scrollStart");
	      _lastScrollTime = _getTime();
	    },
	    // a way to get the _refreshing value in Observer
	    ref: function ref() {
	      return _refreshing;
	    }
	  }
	};
	_getGSAP() && gsap.registerPlugin(ScrollTrigger);

	//JS Support check and touch screen check
	var html = document.querySelector("html");
	  html.classList.remove("no-js");
	  html.classList.add("js");

	function is_touch_device() {
	  return !!('ontouchstart' in window);
	}

	  if(is_touch_device()) {
	    html.classList.add("touch");
	  }
	  else {
	    html.classList.remove("touch");
	  }


	//Scroll & Parallax Function
	window.addEventListener('scroll', function(e) {

	  const target = document.querySelector('.parallax');

	  var scrolled = window.pageYOffset;
	  var rate = scrolled * .35;

	    if (target){
	      target.style.transform = 'translate3D(0px, '+rate+'px, 0px)';
	    }

	});

	//Fade in when in view Function
	const inViewport = (entries) => {
	  entries.forEach(entry => {
	    entry.target.classList.toggle("is_inview", entry.isIntersecting);
	  });
	};

	const Obs = new IntersectionObserver(inViewport);
	const obsOptions = {
	  threshold: 1
	};

	// Attach observer to every [data-inview] element:
	const ELs_inViewport = document.querySelectorAll('[data]');
	ELs_inViewport.forEach(EL => {
	  Obs.observe(EL, obsOptions);
	});


	//Custom Cursor
	const cursor = document.querySelector(".c-cursor"),
	      cursorDot = document.querySelector(".c-cursor__dot"),
	      links = document.querySelectorAll("a,.menu-toggle,.fltrs li");
	      document.querySelector(".frnt_prjcts");
	      const nvrtd = document.querySelectorAll(".c-nvrtd");
	      document.querySelectorAll(".ttl").innerHTML;
	      const prjcts = document.querySelectorAll(".prjct"),
	      msg = document.querySelector(".c-cursor__msg"),
	      drag = document.querySelectorAll(".swiper-slide");

	window.addEventListener('mousemove', e => {
	  cursor.setAttribute("style", "transform: matrix(1, 0, 0, 1, "+e.clientX+", "+e.clientY+")");
	  });
	    if (links.length)
	      for (var n = 0; n < links.length; n++)
	          (links[n].onmouseenter = function () {
	            cursor.classList.add("c-cursor__hovering");
	          }),
	            (links[n].onmouseleave = function () {
	              cursor.classList.remove("c-cursor__hovering");
	            });

	    if (nvrtd.length)
	      for (var n = 0; n < nvrtd.length; n++)
	          (nvrtd[n].onmouseenter = function () {
	            cursorDot.classList.add("c-cursor__inverted");
	          }),
	            (nvrtd[n].onmouseleave = function () {
	              cursorDot.classList.remove("c-cursor__inverted");
	            });

	    if (drag.length)
	      for (var n = 0; n < drag.length; n++)
	          (drag[n].onmouseenter = function () {
	            cursor.classList.add("c-cursor__drag");
	          }),
	            (drag[n].onmouseleave = function () {
	              cursor.classList.remove("c-cursor__drag");
	            });

	    prjcts.forEach(prjct => {
	      prjct.addEventListener('mouseover', function () {
	        msg.classList.add("visible");
	        msg.innerHTML = prjct.querySelector('.ttl').innerHTML;
	      });
	      prjct.addEventListener('mouseout', function () {
	        msg.classList.remove("visible");
	      });
	    });

	mixitup.use(mixitupMultifilter);

	var containerEl = document.querySelector('.prjcts');

	if (containerEl) {
	  mixitup('.prjcts', {
	    classNames: {
	      block: 'prjcts',
	      elementFilter: 'fltr',
	      elementContainer: 'prjcts'
	      },
	    animation: {
	        effects: 'fade scale(0.7)',
	        easing: 'ease-in-out'
	    },
	    multifilter: {
	        enable: true
	      },
	    controls: {
	      toggleLogic: 'and'
	    }
	  });
	}

	const digiAll = document.querySelectorAll(".digital").length;
	const postsAll = document.querySelectorAll(".prjct").length;
	const interiorAll = document.querySelectorAll(".interior").length;
	const identityAll = document.querySelectorAll(".identity").length;
	const communicationyAll = document.querySelectorAll(".communication").length;

	const allSpan = document.getElementById('all-prjcts');
	const digiSpan = document.getElementById('dgtl-prjcts');
	const interiorSpan = document.getElementById('ntrr-prjcts');
	const identitySpan = document.getElementById('dntty-prjcts');
	const communicationSpan = document.getElementById('cmmnctn-prjcts');

	if(allSpan) {
	  allSpan.textContent = postsAll;
	}
	if(digiSpan) {
	  digiSpan.textContent = digiAll;
	}
	if(interiorSpan) {
	  interiorSpan.textContent = interiorAll;
	}
	if(identitySpan) {
	  identitySpan.textContent = identityAll;
	}
	if(communicationSpan) {
	  communicationSpan.textContent = communicationyAll;
	}

	gsapWithCSS.registerPlugin(ScrollTrigger);

	//gsap outofview imdb list items
	const oov = gsapWithCSS.utils.toArray('.oov');
	oov.forEach(oov => {
	  gsapWithCSS.from(oov, {
	  y: 150,
	  opacity: 0,
	    scrollTrigger: {
	      trigger: oov,
	      marker: true,
	      scrub: 2,
	      end: "bottom 90%"
	    }
	  });
	});

})();
