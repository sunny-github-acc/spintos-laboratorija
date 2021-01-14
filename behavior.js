'use strict';

    let newsletter = document.body.querySelector("#newsletter"),
        menuBtn = document.body.querySelector("#menu-btn"),
        nav = document.body.querySelector(".nav-container"),
        footerMore = document.body.querySelectorAll(".footer-more");
        
    document.addEventListener("scroll", handleIsNav);
    document.addEventListener("scroll", handleIsImg);
    window.addEventListener("load", handleWindowLoad);
    window.addEventListener("resize", handleNav);
    window.addEventListener("resize", handleFooter);
    footerMore[0].parentElement.addEventListener("click", handleFooterMore);
    newsletter.addEventListener("mouseenter", handleShowNewsletter);
    newsletter.addEventListener("mouseleave", handleHideNewsletter);

    function handleIsNav(e) {
        if (this.oldScroll < window.scrollY) {
            nav.style.top = 0;
        } else {
            nav.style.top = 60 + "px";
        }
        this.oldScroll = window.scrollY;
    }

    function handleIsImg() {
        let images = document.body.querySelectorAll(".not-loaded");
        if (images === "") return;
        
        for (let i of images) isVisible(i) ? setSrc(i) : null;

        function isVisible(img) {
            let coords = img.getBoundingClientRect(),
                windowHeight = document.documentElement.clientHeight,
                topVisible = coords.top >= 0 && coords.top <= windowHeight,
                bottomVisible = coords.bottom <= windowHeight && coords.bottom >= 0;
                return topVisible || bottomVisible;
        }
        
        function setSrc(img) {
            let src = img.dataset.src,
                image = document.createElement("img"),
                temp = document.createElement("img");
                
            temp.setAttribute("src", "https://svgshare.com/i/SeQ.svg");
            img.replaceWith(temp);
            img.style.opacity = 0;

            image.onload = function(e) {
                temp.replaceWith(img);
                img.style.transition = "opacity 1s";
                img.setAttribute("src", src); 
                img.classList.remove("not-loaded");
                setTimeout(() => img.style.opacity = 1);
            }
            
            image.src = src;
        }
    }

    function handleWindowLoad() {
        handleIsImg();
        handleNav();
        handleFooter();
    }
    
    function handleNav() {
        if (window.innerWidth > 768) {
            nav.classList.remove("passive");
            menuBtn.classList.add("passive");
            newsletter.classList.remove("passive");
        }
        if (window.innerWidth < 768) {
            nav.classList.add("passive");
            newsletter.classList.add("passive");
            menuBtn.classList.remove("passive");
        }
    }

    function handleFooter() {
        if (window.innerWidth < 768) {
            for (let i of footerMore) {
            let up = i.querySelector(".up"),
                down = i.querySelector(".down"),
                list = i.querySelector(".footer-more-list");
                up.hidden = true;
                down.hidden = false;
                list.hidden = true;
            }
        } else {
            for (let i of footerMore) {
                let up = i.querySelector(".up"),
                    down = i.querySelector(".down"),
                    list = i.querySelector(".footer-more-list");
                    up.hidden = true;
                    down.hidden = true;
                    list.hidden = false;
            }
        }
    }

    function handleFooterMore(e) {
        let elem = e.target.closest("a");
        if (elem === null) return;
        let up = elem.querySelector(".up"),
            down = elem.querySelector(".down"),
            list = elem.parentNode.parentNode.querySelector(".footer-more-list");
            up.hidden = !up.hidden;
            down.hidden = !down.hidden;
            list.hidden = !list.hidden;
        window.scrollBy(0, 300);
    }

    function handleShowNewsletter() {
        let tooltip = document.createElement("div");
        tooltip.setAttribute("id", "tooltip");
        tooltip.innerHTML = `
        <div class="newsletter-tooltip-container">
            <div class="" id="newsletter-tooltip-title">Užsiregistruokite Mūsų Naujienlaiškiui</div>
            <div class="input-container">
                <form>
                    <input type="email" id="tooltip-email-input" placeholder=" Jūsų el. pašto adresas">
                    <input type="submit" id="tooltip-email-submit" value="Registruotis">
                </form>
            </div>
        </div>`;
        tooltip.addEventListener("mouseenter", handleTooltipMouseOver);
        tooltip.addEventListener("mouseleave", handleTooltipMouseOut);

        document.body.append(tooltip);

        let submit = document.body.querySelector("#tooltip-email-submit").parentElement;
        submit.addEventListener("submit", handleSubmit);

        
        tooltip.style.position = "fixed";
        tooltip.style.top = 55 + "px";
        tooltip.style.left = window.innerWidth - tooltip.offsetWidth - 25 + "px";

        function handleTooltipMouseOver() {
            clearTimeout(handleHideNewsletter.timer);
        }

        function handleTooltipMouseOut() {
            handleHideNewsletter("", 1000);
        }
        
        function handleSubmit(e) {
            e.preventDefault();
            console.log('e.target.querySelector("#tooltip-email-input")', 
            e.target.querySelector("#tooltip-email-input").value)
            if (e.target.querySelector("#tooltip-email-input").value === "") return;
            tooltip.innerHTML = `<div class="newsletter-tooltip-container">
            <div class="" id="newsletter-tooltip-title">Jūs sėkmingai užsiregistravote šiuo adresu: ${this.querySelector("#tooltip-email-input").value}</div>`;
            
        }
    }

    function handleHideNewsletter(e, time = 500) {
        if (document.body.querySelector("#tooltip")) {
            handleHideNewsletter.timer = setTimeout(() => document.body.querySelector("#tooltip").remove(), time);
        }
    }

    function handleNavBtn() {
        let div = document.createElement("div"),
            stilius = document.querySelector("#stilius").cloneNode(true),
            kultura = document.querySelector("#kultura"),
            spinta = document.querySelector("#spinta"),
            dovanu_idejos = document.querySelector("#dovanu_idejos");
            console.log('dovanu_idejos', dovanu_idejos)
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.position = "fixed";
        div.style.marginTop = document.body.querySelector(".title-container").getBoundingClientRect().bottom + 20;
        div.style.backgroundColor = "white";
        div.style.top = -window.innerHeight + "px";
        div.style.transition = "top 0s";
        setTimeout(() => div.style.top = 0 + "px");
        div.append(stilius);
        div.append(kultura);
        div.append(spinta);
        div.append(dovanu_idejos);
        document.body.append(div);

        function styler(elem) {
            return `<div class="nav-container">` + elem + `</div>`;
        }
    }