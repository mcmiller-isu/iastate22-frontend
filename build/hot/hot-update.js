webpackHotUpdate("main", {
  /***/ "./src/js/components/calendar.ts":
    /*!***************************************!*\
  !*** ./src/js/components/calendar.ts ***!
  \***************************************/
    /*! no static exports found */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      eval(
        '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.EventCalendar = void 0;\nvar core_1 = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/index.js");\nvar daygrid_1 = __importDefault(__webpack_require__(/*! @fullcalendar/daygrid */ "./node_modules/@fullcalendar/daygrid/index.js"));\nvar timegrid_1 = __importDefault(__webpack_require__(/*! @fullcalendar/timegrid */ "./node_modules/@fullcalendar/timegrid/index.js"));\nvar list_1 = __importDefault(__webpack_require__(/*! @fullcalendar/list */ "./node_modules/@fullcalendar/list/index.js"));\nvar core_2 = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/index.js");\nvar mobileMQ = window.matchMedia("(max-width: 990px)");\nvar EventCalendar = /** @class */ (function () {\n    function EventCalendar(element) {\n        if (!!element) {\n            this.element = element;\n            this.eventCalendar = this.element.querySelector(".calendar__wrap");\n            this.calendarHeader = this.element.querySelector(".calendar__header");\n            this.listButton = this.calendarHeader.querySelector(".calendar__views #list-btn");\n            this.monthButton = this.calendarHeader.querySelector(".calendar__views #month-btn");\n            this.desktopView = "dayGridMonth";\n            this.calendarSearch = this.element.querySelector(".calendar__search form #event-search");\n            this.calendarCategories = this.element.querySelector(".calendar__categories #event-categories");\n            this.calendarSearchButton = this.element.querySelector(".calendar__search form button[type=submit]");\n            this.featuredCheck = this.element.querySelector(".calendar__categories-toggle #featured-events");\n            this.searchTerms = ["", ""];\n            this.currentPage = 1;\n            this.searchReset = this.element.querySelector(".calendar-reset");\n            this.init();\n        }\n    }\n    EventCalendar.prototype.init = function () {\n        var _this = this;\n        this.calendar = new core_1.Calendar(this.eventCalendar, {\n            plugins: [daygrid_1.default, timegrid_1.default, list_1.default],\n            initialView: "dayGridMonth",\n            eventTimeFormat: {\n                hour: "numeric",\n                minute: "2-digit",\n                meridiem: "short",\n            },\n            headerToolbar: {\n                left: "prev,next today",\n                center: "title",\n                right: "",\n            },\n            nextDayThreshold: "00:00:00",\n            eventMouseEnter: function (nfo) {\n                if (nfo.view.type === "dayGridMonth") {\n                    nfo.el.classList.add("event-active");\n                    var moreInfo_1 = nfo.el.querySelector(".event-listing");\n                    moreInfo_1.classList.add("on");\n                    setTimeout(function () {\n                        moreInfo_1.classList.add("active");\n                    }, 50);\n                }\n            },\n            eventMouseLeave: function (nfo) {\n                if (nfo.view.type === "dayGridMonth") {\n                    nfo.el.classList.remove("event-active");\n                    var moreInfo_2 = nfo.el.querySelector(".event-listing");\n                    moreInfo_2.classList.remove("active");\n                    setTimeout(function () {\n                        moreInfo_2.classList.remove("on");\n                    }, 300);\n                }\n            },\n            eventDidMount: function (nfo) {\n                _this.fixHeaders(nfo.view.type);\n            },\n            eventContent: function (arg) {\n                var arrayOfDomNodes = [_this.buildEventDOM(arg)];\n                return { domNodes: arrayOfDomNodes };\n            },\n            viewDidMount: function (arg) { },\n        });\n        this.calendar.render();\n        // console.log(MYSCRIPT);\n        // Api Settings\n        this.apiRoot = "wp/v2/";\n        // Forces the API location to look for the lando site if editing in Fractal\n        if (window.location.host.startsWith("localhost")) {\n            this.pageUrl = window.location.protocol + "//isu-wp-composer.lndo.site/wp-json/";\n        }\n        else {\n            this.pageUrl = MYSCRIPT.rootURL;\n        }\n        console.log(this.pageUrl);\n        fetch(this.pageUrl + this.apiRoot + "events?filter[posts_per_page]=-1")\n            .then(function (response) { return _this.initCalendar(response, null); })\n            .catch(function (err) { return console.log(err); });\n        this.listButton.addEventListener("click", function (e) {\n            _this.changeCalendar(e.target, "listWeek");\n        });\n        this.monthButton.addEventListener("click", function (e) {\n            _this.changeCalendar(e.target, "dayGridMonth");\n        });\n        this.calendarSearchButton.addEventListener("click", function (e) {\n            _this.runSearch(e);\n        });\n        this.calendarCategories.addEventListener("change", function (e) {\n            _this.runSearch(e);\n        });\n        this.featuredCheck.addEventListener("change", function (e) {\n            _this.runSearch(e);\n        });\n        this.searchReset.addEventListener("click", function (e) {\n            _this.resetSearch(e);\n        });\n        window.addEventListener("resize", function () {\n            _this.breakpointCheck();\n        });\n        this.breakpointCheck();\n    };\n    EventCalendar.prototype.initCalendar = function (dta, sstr) {\n        var _this = this;\n        this.totalCount = dta.headers.get("X-WP-Total");\n        this.totalPages = dta.headers.get("X-WP-TotalPages");\n        // Tag check from URL Parameter\n        var qString = window.location.search;\n        var urlParams = new URLSearchParams(qString);\n        var paramCount = 0;\n        urlParams.forEach(function (el, i) {\n            if (paramCount === 0 && sstr === null) {\n                sstr = "?" + i + "=" + el;\n            }\n            else {\n                sstr += "&" + i + "=" + el;\n            }\n        });\n        for (var p = 1; p <= this.totalPages; p++) {\n            if (sstr !== null) {\n                fetch(this.pageUrl + this.apiRoot + "events" + sstr + "&page=" + p + "")\n                    .then(function (response) { return response.json(); })\n                    .then(function (json) { return _this.tallyItems(json); });\n            }\n            else {\n                fetch(this.pageUrl + this.apiRoot + "events?page=" + p + "")\n                    .then(function (response) { return response.json(); })\n                    .then(function (json) { return _this.tallyItems(json); });\n            }\n        }\n    };\n    EventCalendar.prototype.tallyItems = function (json) {\n        var _this = this;\n        json.forEach(function (el, i) {\n            if (_this.featuredCheck.checked === true) {\n                if (el.acf.featured === true) {\n                    _this.addItem(el);\n                }\n            }\n            else {\n                _this.addItem(el);\n            }\n        });\n    };\n    EventCalendar.prototype.addItem = function (item) {\n        var _this = this;\n        // Media Check\n        if (item.featured_media) {\n            fetch(this.pageUrl + this.apiRoot + "media/" + item.featured_media)\n                .then(function (response) { return response.json(); })\n                .then(function (json) { return _this.addLocationCheck(item, json); })\n                .catch(function (err) { return console.log(err); });\n        }\n        else {\n            this.addLocationCheck(item, "");\n        }\n    };\n    EventCalendar.prototype.addLocationCheck = function (item, featureImg) {\n        if (item.acf.location.length > 0) {\n            this.aggregateEntry(item, item.acf.location, featureImg);\n        }\n        else {\n            this.aggregateEntry(item, "", featureImg);\n        }\n    };\n    EventCalendar.prototype.aggregateEntry = function (item, loc, fImg) {\n        var _this = this;\n        var imgUrl = fImg !== "" ? fImg.media_details.sizes.medium.source_url : undefined, eventStartTime = item.acf.event_start_date.start_time !== null\n            ? item.acf.event_start_date.start_date + " " + item.acf.event_start_date.start_time\n            : item.acf.event_start_date.start_date, eventEndTime = item.acf.event_end_date.end_time !== null\n            ? item.acf.event_end_date.end_date + " " + item.acf.event_end_date.end_time\n            : item.acf.event_end_date.end_date, fullDay = item.acf.event_start_date.full_day, evtTags = [];\n        if (item.event_tags.length > 0) {\n            item.event_tags.forEach(function (el, i) {\n                fetch(_this.pageUrl + _this.apiRoot + "event_tags/" + el)\n                    .then(function (response) { return response.json(); })\n                    .then(function (json) { return evtTags.push(json); });\n            });\n        }\n        this.calendar.addEvent({\n            title: item.title.rendered,\n            start: eventStartTime,\n            end: eventEndTime,\n            resourceId: item.id,\n            description: item.excerpt.rendered,\n            location: loc,\n            interactive: true,\n            url: item.link,\n            thumbnail: imgUrl,\n            allDay: fullDay,\n            eventTags: evtTags,\n            overlap: true,\n        });\n    };\n    EventCalendar.prototype.runSearch = function (e) {\n        var _this = this;\n        e.preventDefault();\n        var searchString = "";\n        this.searchTerms[0] = this.calendarSearch.value;\n        this.searchTerms[1] = this.calendarCategories.value;\n        // This feels dirty\n        if (this.searchTerms[1] !== "") {\n            if (this.searchTerms[0] !== "") {\n                searchString += "?search=" + this.searchTerms[0];\n                searchString += "&event_tags=" + this.searchTerms[1];\n            }\n            else {\n                searchString += "?event_tags=" + this.searchTerms[1];\n            }\n        }\n        else if (this.searchTerms[0] !== "") {\n            searchString += "?search=" + this.searchTerms[0];\n        }\n        this.calendar.removeAllEvents();\n        if (searchString.length > 0) {\n            fetch(this.pageUrl + this.apiRoot + "events" + searchString + "&filter[posts_per_page]=-1")\n                .then(function (response) { return _this.initCalendar(response, searchString); })\n                .catch(function (err) { return console.log(err); });\n        }\n        else {\n            fetch(this.pageUrl + this.apiRoot + "events?filter[posts_per_page]=-1")\n                .then(function (response) { return _this.initCalendar(response, null); })\n                .catch(function (err) { return console.log(err); });\n        }\n        this.listButton.addEventListener("click", function (e) {\n            _this.changeCalendar(e.target, "listWeek");\n        });\n    };\n    EventCalendar.prototype.breakpointCheck = function () {\n        if (mobileMQ.matches) {\n            this.calendar.changeView("listWeek");\n            // this.calendar.destroy();\n            // this.calendar.render();\n            // The above code works! But isn\'t necessary at the moment.\n        }\n        else {\n            this.calendar.dayMaxEventRows = true;\n            this.calendar.changeView(this.desktopView);\n        }\n    };\n    EventCalendar.prototype.changeCalendar = function (btn, view) {\n        this.calendar.changeView(view);\n        var titls = this.eventCalendar.querySelectorAll(".event-listing__title");\n        var rent = btn.parentElement, activ = rent.querySelector("button[aria-pressed=true]");\n        this.desktopView = view;\n        if (activ) {\n            activ.setAttribute("aria-pressed", "false");\n        }\n        btn.setAttribute("aria-pressed", "true");\n    };\n    EventCalendar.prototype.fixHeaders = function (view) {\n        var titls = this.eventCalendar.querySelectorAll(".event-listing__title");\n        if (view === "listWeek") {\n            titls.forEach(function (el, i) {\n                if (el.querySelector("span") !== null) {\n                    var titleLink = el.querySelector("span").getAttribute("data-href");\n                    var titl = el.textContent;\n                    el.innerHTML =\n                        "<a href=\'" +\n                            titleLink +\n                            "\'>" +\n                            titl +\n                            "<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'13.338\' height=\'12.273\' viewBox=\'0 0 13.338 12.273\'><g id=\'CTA_Secondary_Arrow\' transform=\'translate(0 0.707)\'><path id=\'Path_52\' data-name=\'Path 52\' d=\'M-13572.044-6709.884l-1.414-1.414,4.723-4.723-4.723-4.722,1.414-1.414,6.137,6.136Z\' transform=\'translate(13579.245 6721.45)\' fill=\'#7c2529\'/><path id=\'Path_1510\' data-name=\'Path 1510\' d=\'M-15709.244-3614.516h-11.514v-2h11.514Z\' transform=\'translate(15720.758 3620.946)\' fill=\'#732b2c\'/></g></svg></a>";\n                }\n            });\n        }\n        else {\n            var titls_1 = this.eventCalendar.querySelectorAll(".event-listing__title");\n            titls_1.forEach(function (el, i) {\n                if (el.querySelector("a") !== null) {\n                    var titleLink = el.querySelector("a").getAttribute("href");\n                    var titl = el.textContent;\n                    el.innerHTML =\n                        "<span data-href=\'" +\n                            titleLink +\n                            ">" +\n                            titl +\n                            "<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'13.338\' height=\'12.273\' viewBox=\'0 0 13.338 12.273\'><g id=\'CTA_Secondary_Arrow\' transform=\'translate(0 0.707)\'><path id=\'Path_52\' data-name=\'Path 52\' d=\'M-13572.044-6709.884l-1.414-1.414,4.723-4.723-4.723-4.722,1.414-1.414,6.137,6.136Z\' transform=\'translate(13579.245 6721.45)\' fill=\'#7c2529\'/><path id=\'Path_1510\' data-name=\'Path 1510\' d=\'M-15709.244-3614.516h-11.514v-2h11.514Z\' transform=\'translate(15720.758 3620.946)\' fill=\'#732b2c\'/></g></svg></span>";\n                }\n            });\n        }\n    };\n    EventCalendar.prototype.buildEventDOM = function (arg) {\n        var contentArea = document.createElement("div"), ct = document.createElement("div");\n        ct.classList.add("event-wrap");\n        contentArea.classList.add("event-listing");\n        if (arg.event.extendedProps.thumbnail !== undefined) {\n            contentArea.innerHTML +=\n                "<div class=\'event-listing__image\'><img src=\'" +\n                    arg.event.extendedProps.thumbnail +\n                    "\' alt=\'" +\n                    "alt" +\n                    "\'/></div>";\n        }\n        contentArea.innerHTML += "<div class=\'event-listing__content\'></div>";\n        var contentBlock = contentArea.querySelector(".event-listing__content");\n        if (arg.event.url) {\n            contentBlock.innerHTML +=\n                "<h4 class=\'event-listing__title\'><span data-href=\'" +\n                    arg.event.url +\n                    "\'>" +\n                    arg.event.title +\n                    "<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'13.338\' height=\'12.273\' viewBox=\'0 0 13.338 12.273\'><g id=\'CTA_Secondary_Arrow\' transform=\'translate(0 0.707)\'><path id=\'Path_52\' data-name=\'Path 52\' d=\'M-13572.044-6709.884l-1.414-1.414,4.723-4.723-4.723-4.722,1.414-1.414,6.137,6.136Z\' transform=\'translate(13579.245 6721.45)\' fill=\'#7c2529\'/><path id=\'Path_1510\' data-name=\'Path 1510\' d=\'M-15709.244-3614.516h-11.514v-2h11.514Z\' transform=\'translate(15720.758 3620.946)\' fill=\'#732b2c\'/></g></svg></span></h4>";\n        }\n        else {\n            contentBlock.innerHTML += "<h4 class=\'event-listing__title\'>" + arg.event.title + "</h4>";\n        }\n        contentBlock.innerHTML +=\n            "<time datetime =\'" +\n                arg.event.startStr +\n                "\' class=\'event-listing__date\'><div class=\'event-listing__full-date\'>" +\n                this.buildDate(arg.event.startStr) +\n                "</div>";\n        if (arg.event.allDay !== true) {\n            var timeString = void 0;\n            if (arg.event.endStr !== "") {\n                timeString = this.buildTime(arg.event.startStr) + " to " + this.buildTime(arg.event.endStr);\n            }\n            else {\n                timeString = this.buildTime(arg.event.startStr);\n            }\n            contentBlock.querySelector("time").innerHTML +=\n                "<div class=\'event-listing__time\'>" + timeString + "</div></time>";\n        }\n        contentBlock.innerHTML += "</time>";\n        if (arg.event.extendedProps.location) {\n            contentBlock.innerHTML += "<div class=\'event-listing__location\'>" + arg.event.extendedProps.location + "</div>";\n        }\n        // Event Link Markup:\n        var contentLink = document.createElement("div"), endDate = arg.event.endStr.substring(0, 10).replace(/[^0-9]+/g, ""), startDate = arg.event.startStr.substring(0, 10).replace(/[^0-9]+/g, "");\n        contentLink.classList.add("event-link");\n        if (arg.event.allDay !== true && endDate > startDate !== true) {\n            contentLink.innerHTML += "<div class=\'fc-event-time\'>" + this.buildTime(arg.event.startStr) + "</div>";\n        }\n        contentLink.innerHTML += "<div class=\'fc-event-title\'>" + arg.event.title + "</div>";\n        if (arg.event.extendedProps.eventTags && arg.view.type === "listWeek") {\n            contentBlock.innerHTML += "<div class=\'event-listing__tags\'></div>";\n            var tagBlock_1 = contentBlock.querySelector(".event-listing__tags");\n            arg.event.extendedProps.eventTags.forEach(function (el, i) {\n                tagBlock_1.innerHTML += "<span>" + el.name + "</span>";\n            });\n        }\n        if (arg.event.extendedProps.description) {\n            contentBlock.innerHTML += "<div class=\'event-listing__desc\'>" + arg.event.extendedProps.description + "</div>";\n        }\n        ct.appendChild(contentArea);\n        ct.appendChild(contentLink);\n        return ct;\n    };\n    EventCalendar.prototype.buildDate = function (dte) {\n        var formattedDate = core_2.formatDate(dte, {\n            month: "long",\n            year: "numeric",\n            day: "numeric",\n            hour12: true,\n        });\n        return formattedDate;\n    };\n    EventCalendar.prototype.buildTime = function (dte) {\n        var formattedTime = core_2.formatDate(dte, {\n            hour12: true,\n            hour: "numeric",\n            minute: "2-digit",\n        });\n        return formattedTime;\n    };\n    EventCalendar.prototype.resetSearch = function (e) {\n        this.calendarSearch.value = "";\n        this.calendarCategories.value = "";\n        this.runSearch(e);\n    };\n    return EventCalendar;\n}());\nexports.EventCalendar = EventCalendar;\nfunction calendarInit() {\n    var calendars = document.querySelectorAll(".calendar");\n    for (var i = 0; i < calendars.length; i++) {\n        new EventCalendar(calendars[i]);\n    }\n}\nexports.default = calendarInit;\n\n\n//# sourceURL=webpack:///./src/js/components/calendar.ts?'
      );

      /***/
    },

  /***/ "./src/js/index.ts":
    /*!*************************!*\
  !*** ./src/js/index.ts ***!
  \*************************/
    /*! no static exports found */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      eval(
        '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", { value: true });\n__webpack_require__(/*! core-js/stable */ "./node_modules/core-js/stable/index.js");\n/**\n * Modules\n */\nvar focus_within_1 = __importDefault(__webpack_require__(/*! focus-within */ "./node_modules/focus-within/index.mjs"));\nvar object_fit_images_1 = __importDefault(__webpack_require__(/*! object-fit-images */ "./node_modules/object-fit-images/dist/ofi.common-js.js"));\nvar silc_core_1 = __webpack_require__(/*! silc-core */ "./node_modules/silc-core/dist/index.js");\nvar silc_accordion_1 = __webpack_require__(/*! silc-accordion */ "./node_modules/silc-accordion/dist/index.js");\nvar modal_1 = __importDefault(__webpack_require__(/*! ./components/modal */ "./src/js/components/modal.ts"));\nvar site_header_1 = __importDefault(__webpack_require__(/*! ./components/site-header */ "./src/js/components/site-header.ts"));\nvar card_1 = __importDefault(__webpack_require__(/*! ./components/card */ "./src/js/components/card.ts"));\nvar subnav_1 = __importDefault(__webpack_require__(/*! ./components/subnav */ "./src/js/components/subnav.ts"));\nvar sortable_table_1 = __importDefault(__webpack_require__(/*! ./components/sortable-table */ "./src/js/components/sortable-table.ts"));\nvar privacy_consent_1 = __importDefault(__webpack_require__(/*! ../components/privacy-consent/privacy-consent */ "./src/components/privacy-consent/privacy-consent.ts"));\nvar accordion_1 = __importDefault(__webpack_require__(/*! ./components/accordion */ "./src/js/components/accordion.ts"));\nvar video_embed_1 = __importDefault(__webpack_require__(/*! ./components/video-embed */ "./src/js/components/video-embed.ts"));\nvar ecosystem_home_hero_1 = __importDefault(__webpack_require__(/*! ./components/ecosystem-home-hero */ "./src/js/components/ecosystem-home-hero.ts"));\nvar carousel_1 = __importDefault(__webpack_require__(/*! ./components/carousel */ "./src/js/components/carousel.ts"));\nvar home_1 = __importDefault(__webpack_require__(/*! ./pages/home */ "./src/js/pages/home.ts"));\nvar college_template_1 = __importDefault(__webpack_require__(/*! ./pages/college-template */ "./src/js/pages/college-template.ts"));\nvar accessibility_1 = __importDefault(__webpack_require__(/*! ./utilities/accessibility */ "./src/js/utilities/accessibility.ts"));\nvar scroll_padding_top_1 = __importDefault(__webpack_require__(/*! ./utilities/scroll-padding-top */ "./src/js/utilities/scroll-padding-top.ts"));\nvar calendar_1 = __importDefault(__webpack_require__(/*! ./components/calendar */ "./src/js/components/calendar.ts"));\nvar search_1 = __importDefault(__webpack_require__(/*! ./components/search */ "./src/js/components/search.ts"));\n/**\n * Init\n */\nfocus_within_1.default(document);\nobject_fit_images_1.default();\naccessibility_1.default.init();\nsilc_core_1.silcCoreInit();\nsilc_accordion_1.silcAccordionInit();\nsite_header_1.default();\nmodal_1.default();\ncard_1.default();\nprivacy_consent_1.default();\naccordion_1.default();\nsubnav_1.default();\nvideo_embed_1.default();\necosystem_home_hero_1.default();\nhome_1.default();\ncollege_template_1.default();\ncarousel_1.default();\nscroll_padding_top_1.default();\nsortable_table_1.default();\ncalendar_1.default();\nsearch_1.default();\n\n\n//# sourceURL=webpack:///./src/js/index.ts?'
      );

      /***/
    },
});
